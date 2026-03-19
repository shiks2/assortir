import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../supabase'
import type { Profile, SkinProfile, StyleProfile, MaterialPreferences, Subscription, Usage } from '../types'

// ─── Types ────────────────────────────────────────────────────

interface AuthContextType {
  // Auth state
  session: Session | null
  user: User | null
  loading: boolean

  // User data
  profile: Profile | null
  skinProfile: SkinProfile | null
  styleProfile: StyleProfile | null
  materialPreferences: MaterialPreferences | null
  subscription: Subscription | null
  usage: Usage | null

  // Computed
  isPro: boolean
  queriesRemaining: number
  isProfileComplete: boolean
  needsOnboarding: boolean

  // Actions
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshUserData: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<{ error: string | null }>
}

// ─── Context ──────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null)

// ─── Provider ─────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [profile, setProfile] = useState<Profile | null>(null)
  const [skinProfile, setSkinProfile] = useState<SkinProfile | null>(null)
  const [styleProfile, setStyleProfile] = useState<StyleProfile | null>(null)
  const [materialPreferences, setMaterialPreferences] = useState<MaterialPreferences | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [usage, setUsage] = useState<Usage | null>(null)

  // Use refs to prevent concurrent and redundant fetch operations
  const fetchingRef = useRef(false)
  const lastFetchedUserRef = useRef<string | null>(null)

  // ─── Helper for query timeouts ───────────────────────────────

  async function withTimeout<T>(promise: Promise<T>, ms: number = 8000): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), ms)
    )
    return Promise.race([promise, timeout]) as Promise<T>
  }

  // ─── Fetch all user data in parallel ─────────────────────────

  async function fetchUserData(userId: string, force?: boolean) {
    // 1. Guard against concurrent or redundant fetches
    if (fetchingRef.current) {
      console.log('Auth: Concurrent fetch prevented.')
      return
    }

    if (!force && lastFetchedUserRef.current === userId) {
      console.log('Auth: Data already loaded for this session. Skipping.')
      return
    }

    fetchingRef.current = true
    const currentMonth = new Date().toISOString().slice(0, 7)

    try {
      console.log(`Auth: Commencing fetch for [${userId}] (force: ${!!force})...`)

      // Phase 1: Critical (Profiles + Subscriptions) - Longer 20s timeout, No retry
      console.log('Auth: Fetching Phase 1 (Critical)...')
      const [profileRes, subscriptionRes] = await Promise.allSettled([
        withTimeout(Promise.resolve(supabase.from('profiles').select('*').eq('id', userId).maybeSingle()), 20000),
        withTimeout(
          Promise.resolve(
            supabase
              .from('subscriptions')
              .select('*, plans(*)')
              .eq('user_id', userId)
              .eq('status', 'active')
              .maybeSingle()
          ),
          20000
        )
      ])

      const profVal = profileRes.status === 'fulfilled' ? (profileRes.value as any) : null
      const subVal = subscriptionRes.status === 'fulfilled' ? (subscriptionRes.value as any) : null

      if (profVal && !profVal.error && profVal.data) {
        setProfile(profVal.data)
      } else if (profVal?.error) {
        console.error('Auth: Profile fetch error:', profVal.error.message)
      }

      if (subVal && !subVal.error && subVal.data) {
        setSubscription(subVal.data as any)
      } else if (subVal?.error) {
        console.error('Auth: Subscription fetch error:', subVal.error.message)
      }

      // If profile loaded successfully, we mark the user as fetched to stop redundant loops
      if (profVal && !profVal.error && profVal.data) {
        lastFetchedUserRef.current = userId
      }

      // Phase 2: Secondary Data - Always run regardless of Phase 1 success
      console.log('Auth: Fetching Phase 2 (Secondary)...')
      const [skinRes, styleRes, materialsRes, usageRes] = await Promise.allSettled([
        withTimeout(Promise.resolve(supabase.from('skin_profiles').select('*').eq('user_id', userId).maybeSingle())),
        withTimeout(Promise.resolve(supabase.from('style_profiles').select('*').eq('user_id', userId).maybeSingle())),
        withTimeout(Promise.resolve(supabase.from('material_preferences').select('*').eq('user_id', userId).maybeSingle())),
        withTimeout(
          Promise.resolve(
            supabase
              .from('usage')
              .select('*')
              .eq('user_id', userId)
              .eq('month', currentMonth)
              .maybeSingle()
          )
        )
      ])

      if (skinRes.status === 'fulfilled') {
        const val = skinRes.value as any
        if (val && !val.error && val.data) setSkinProfile(val.data)
      }
      if (styleRes.status === 'fulfilled') {
        const val = styleRes.value as any
        if (val && !val.error && val.data) setStyleProfile(val.data)
      }
      if (materialsRes.status === 'fulfilled') {
        const val = materialsRes.value as any
        if (val && !val.error && val.data) setMaterialPreferences(val.data)
      }
      if (usageRes.status === 'fulfilled') {
        const val = usageRes.value as any
        if (val && !val.error && val.data) setUsage(val.data)
      }

      console.log('Auth: Successfully fetched all user data phases.')
    } catch (err: any) {
      console.error('Auth: Fatal error during data fetch:', err.message)
    } finally {
      fetchingRef.current = false
    }
  }




  // ─── Auth state listener ──────────────────────────────────────

  useEffect(() => {
    let isMounted = true

    const hangTimeout = setTimeout(() => {
      if (isMounted && loading) {
        console.warn('Auth: Initialization is taking unusually long. Continuing...')
        setLoading(false)
      }
    }, 15000)

    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return

        console.log('Auth event (state change):', event)
        const currentUser = session?.user ?? null

        // 1. Update basic auth session state immediately for ALL events
        setSession(session)
        setUser(currentUser)

        // 2. Handle specific events
        if (event === 'SIGNED_OUT') {
          console.log('Auth: User signed out. Clearing session.')
          clearTimeout(hangTimeout)
          lastFetchedUserRef.current = null
          setProfile(null)
          setSkinProfile(null)
          setStyleProfile(null)
          setMaterialPreferences(null)
          setSubscription(null)
          setUsage(null)
          setLoading(false)
          return
        }

        if (event === 'TOKEN_REFRESHED') {
          // Token refreshed events should NEVER trigger data fetching
          console.log('Auth: Token refreshed (session maintained).')
          return
        }

        if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
          clearTimeout(hangTimeout)
          
          if (currentUser) {
            // Only fetch if this is a genuinely new user or data isn't loaded yet
            if (currentUser.id !== lastFetchedUserRef.current) {
              await fetchUserData(currentUser.id)
            }
          }
          
          if (isMounted) setLoading(false)
        }
      }
    )

    return () => {
      isMounted = false
      clearTimeout(hangTimeout)
      authSub.unsubscribe()
    }
  }, [])


  // ─── Auth actions ─────────────────────────────────────────────

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  async function signUp(email: string, password: string) {
    const { error } = await supabase.auth.signUp({ email, password })
    return { error: error?.message ?? null }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  async function refreshUserData() {
    if (user) await fetchUserData(user.id, true)
  }

  async function updateProfile(data: Partial<Profile>) {
    if (!user) return { error: 'Not logged in' }
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id)
    if (!error) await fetchUserData(user.id, true)
    return { error: error?.message ?? null }
  }

  // ─── Computed values ──────────────────────────────────────────

  const isPro = (subscription as any)?.plans?.name === 'pro'
  const monthlyLimit = (subscription as any)?.plans?.monthly_query_limit ?? 3
  const queriesUsed = usage?.query_count ?? 0
  const queriesRemaining = isPro ? Infinity : Math.max(0, monthlyLimit - queriesUsed)
  const isProfileComplete = profile?.is_profile_complete ?? false

  // Refined onboarding logic: Only redirect if ALL core profiles are missing
  const needsOnboarding = 
    profile?.is_profile_complete === false && 
    !skinProfile?.undertone && 
    !styleProfile?.preferred_fit

  // ─── Context value ────────────────────────────────────────────

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        profile,
        skinProfile,
        styleProfile,
        materialPreferences,
        subscription,
        usage,
        isPro,
        queriesRemaining,
        isProfileComplete,
        needsOnboarding,
        signIn,
        signUp,
        signOut,
        refreshUserData,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}