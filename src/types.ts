// ============================================================
// ASSORTIR — TypeScript Types
// ============================================================

// ─── Auth ────────────────────────────────────────────────────

export interface AuthUser {
  id: string
  email: string
}

// ─── Profile ─────────────────────────────────────────────────

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  gender: 'male' | 'female' | 'non_binary' | null
  region: string | null
  is_profile_complete: boolean
  created_at: string
}

// ─── Skin Profile ─────────────────────────────────────────────

export interface SkinProfile {
  id: string
  user_id: string
  skin_tone: string | null
  undertone: 'warm' | 'cool' | 'neutral' | null
  value_depth: 'light' | 'medium' | 'deep' | null
  chroma: 'bright' | 'soft' | 'muted' | null
  season: 'spring' | 'summer' | 'autumn' | 'winter' | null
}

// ─── Style Profile ────────────────────────────────────────────

export interface StyleProfile {
  id: string
  user_id: string
  preferred_fit: 'slim' | 'relaxed' | 'oversized' | 'regular' | null
  preferred_style_vibe: string | null
  primary_occasion: string | null
  allow_relaxed_relaxed: boolean
  allow_oversized_oversized: boolean
  color_rule: string | null
}

// ─── Material Preferences ─────────────────────────────────────

export interface MaterialPreferences {
  id: string
  user_id: string
  blacklisted_materials: string[]
  preferred_materials: string[]
  material_reason: string | null
}

// ─── Cosmetic Profile ─────────────────────────────────────────

export interface CosmeticProfile {
  id: string
  user_id: string
  skin_type: 'oily' | 'dry' | 'combination' | 'normal' | 'sensitive' | null
  foundation_shade: string | null
  preferred_coverage: 'light' | 'medium' | 'full' | null
  preferred_finish: 'matte' | 'satin' | 'dewy' | 'natural' | null
  preferred_lip_finish: 'matte' | 'glossy' | 'satin' | 'no_preference' | null
  cosmetic_budget: 'drugstore' | 'medium' | 'premium' | 'luxury' | null
  avoided_brands: string[]
  is_setup_complete: boolean
}

// ─── Plan & Subscription ──────────────────────────────────────

export interface Plan {
  id: string
  name: 'free' | 'pro'
  monthly_query_limit: number | null
  price_inr: number
  price_usd: number
  billing_cycle: string
  can_access_history: boolean
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: 'active' | 'cancelled' | 'expired' | 'past_due'
  current_period_end: string | null
  plans: Plan
}

// ─── Usage ────────────────────────────────────────────────────

export interface Usage {
  user_id: string
  month: string
  query_count: number
}

// ─── Query / Recommendation ───────────────────────────────────

export type Intent =
  | 'outfit_only'
  | 'outfit_accessories'
  | 'outfit_cosmetics'
  | 'everything'

export interface QueryItem {
  item_type: string
  item_color: string
  item_material: string
  item_fit: string
  item_notes?: string
}

export interface RecommendationItem {
  rank: number
  type: string
  color: string
  material: string
  fit: string
  why_it_works: string
  skin_tone_note: string
  myntra_search_query: string
  style_vibe: string
}

export interface Accessories {
  shoes: {
    type: string
    color: string
    why: string
    myntra_search_query: string
  }
  belt: {
    type: string
    color: string
    why: string
  }
  watch: {
    strap: string
    metal_tone: string
    why: string
  }
  avoid: string
}

export interface Cosmetics {
  context: string
  foundation: {
    shade_profile: string
    finish: string
    avoid: string
  }
  lip: {
    color_family: string
    finish: string
    avoid: string
  }
  blush: {
    color_family: string
    avoid: string
  }
  eye: {
    color_family: string
    avoid: string
  }
  myntra_search_query: string
}

export interface RecommendationOutput {
  profile_summary: string
  item_analysis: string
  recommendations: RecommendationItem[]
  accessories?: Accessories
  cosmetics?: Cosmetics
  avoid: string[]
}

export interface Query {
  id: string
  user_id: string
  item_type: string
  item_color: string
  item_material: string
  item_fit: string
  item_notes: string | null
  intent: Intent
  output_json: RecommendationOutput
  was_helpful: boolean | null
  created_at: string
}

// ─── Edge Function Response ───────────────────────────────────

export interface StyleResponse {
  success: boolean
  query_id?: string
  intent?: Intent
  queries_used?: number
  queries_remaining?: number | null
  is_pro?: boolean
  latency_ms?: number
  data?: RecommendationOutput
  error?: string
}


// ─── Full User State ──────────────────────────────────────────

export interface UserState {
  profile: Profile | null
  skinProfile: SkinProfile | null
  styleProfile: StyleProfile | null
  materialPreferences: MaterialPreferences | null
  cosmeticProfile: CosmeticProfile | null
  subscription: Subscription | null
  usage: Usage | null
  isPro: boolean
  queriesRemaining: number
}