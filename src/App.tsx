import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { AuthProvider, useAuth } from './context/AuthContext'
import { GlobalStyles } from './styles/GlobalStyles'

// Pages — we'll build these one by one
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Result from './pages/Result'
import History from './pages/History'
import Settings from './pages/Settings'
import Landing from './pages/Landing'
import Legal from './pages/Legal'
import About from './pages/About'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'

// ─── Route Guards ─────────────────────────────────────────────

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <FullPageLoader />
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, needsOnboarding } = useAuth()

  // 1. Show loader while data is still loading
  if (loading) {
    return <FullPageLoader />
  }

  // 2. Redirect to login if no user
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // 3. Only then check if onboarding is needed
  if (needsOnboarding) {
    return <Navigate to="/onboarding" replace />
  }

  return <>{children}</>
}



function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <FullPageLoader />
  if (user) return <Navigate to="/home" replace />
  return <>{children}</>
}

// ─── Full Page Loader ─────────────────────────────────────────

function FullPageLoader() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
    }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ width: 132, maxWidth: '48vw', display: 'block' }}
      >
        <source src="/src/assets/rang_animated.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

// ─── Router ───────────────────────────────────────────────────

function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/" element={<Landing />} />
      <Route path="/legal/:doc" element={<Legal />} />
      <Route path="/legal" element={<Navigate to="/legal/privacy" replace />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />

      {/* Onboarding — auth required, but no profile check */}
      <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />

      {/* Protected — auth + profile required */}
      <Route path="/home" element={<OnboardingGuard><Home /></OnboardingGuard>} />
      <Route path="/result/:queryId" element={<OnboardingGuard><Result /></OnboardingGuard>} />
      <Route path="/history" element={<OnboardingGuard><History /></OnboardingGuard>} />
      <Route path="/settings" element={<OnboardingGuard><Settings /></OnboardingGuard>} />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

// ─── App ──────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <GlobalStyles />
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}