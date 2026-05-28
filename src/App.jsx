import { useState, useEffect, lazy, Suspense } from 'react'
import { flushSync } from 'react-dom'
import Navbar from './components/Navbar.jsx'
import OnboardingQuiz from './components/OnboardingQuiz.jsx'
import AuthModal from './components/AuthModal.jsx'
import CustomCursor from './components/interactive/CustomCursor.jsx'
import NoiseOverlay from './components/interactive/NoiseOverlay.jsx'
import Home from './pages/Home.jsx'
import { ProProvider } from './context/ProContext.jsx'
import { UserProvider, useUser } from './context/UserContext.jsx'
import { AuthProvider, useAuth, DEV_MODE } from './context/AuthContext.jsx'
import { usePro } from './context/ProContext.jsx'

// Code-split: each route ships as its own chunk, loaded on demand.
// Home stays eagerly imported so first paint is instant.
const Sport = lazy(() => import('./pages/Sport.jsx'))
const Body = lazy(() => import('./pages/Body.jsx'))
const SkinCare = lazy(() => import('./pages/SkinCare.jsx'))
const Wellness = lazy(() => import('./pages/Wellness.jsx'))
const Diet = lazy(() => import('./pages/Diet.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const MyQuill = lazy(() => import('./pages/MyQuill.jsx'))
const Pro = lazy(() => import('./pages/Pro.jsx'))
const TipLibrary = lazy(() => import('./pages/TipLibrary.jsx'))

const PAGE_LABELS = {
  sport: 'Movement',
  body: 'Body Atlas',
  skincare: 'Skin ritual',
  wellness: 'Wellness',
  diet: 'Nourishment',
  tips: 'Daily tips',
  about: 'About Quill',
  myquill: 'Your Quill',
  pro: 'Pro edition',
  home: 'Home',
}

function PageLoader({ page }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <p className="num-display text-5xl text-clay animate-pulse-soft">◐</p>
        <p className="editorial-label text-ink-soft mt-3">{PAGE_LABELS[page] || 'Opening'}</p>
      </div>
    </div>
  )
}

function AppShell() {
  const [activePage, setActivePage] = useState('home')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showAuth,       setShowAuth]       = useState(false)
  const [guestMode,      setGuestMode]      = useState(() =>
    Boolean(localStorage.getItem('quill.guestMode'))
  )
  const { profile } = useUser()
  const { tier, isMax, setTier } = usePro()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (DEV_MODE) {
      // ── Developer mode: always show onboarding on every load ──
      const t = setTimeout(() => setShowOnboarding(true), 600)
      return () => clearTimeout(t)
    }

    if (authLoading) return

    if (!user && !guestMode) {
      // Not logged in and not a guest → show auth modal
      setShowAuth(true)
    } else if (!profile.dismissedOnboarding) {
      // Logged-in first-timer OR guest who hasn't done onboarding
      setShowOnboarding(true)
    }
  }, [user, authLoading, guestMode, profile.dismissedOnboarding])

  function handleContinueAsGuest() {
    localStorage.setItem('quill.guestMode', '1')
    setGuestMode(true)
    setShowAuth(false)
    // Show onboarding for first-time guests too
    if (!profile.dismissedOnboarding) setShowOnboarding(true)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activePage])

  function handleNavigate(key) {
    if (key === activePage) return

    if (!document.startViewTransition) {
      setActivePage(key)
      return
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setActivePage(key)
      })
    })
  }

  const pageMap = {
    home: <Home onNavigate={handleNavigate} />,
    sport: <Sport onNavigate={handleNavigate} />,
    body: <Body onNavigate={handleNavigate} />,
    skincare: <SkinCare onNavigate={handleNavigate} />,
    wellness: <Wellness onNavigate={handleNavigate} />,
    diet: <Diet onNavigate={handleNavigate} />,
    about: <About />,
    myquill: <MyQuill onNavigate={handleNavigate} />,
    pro: <Pro onNavigate={handleNavigate} />,
    tips: <TipLibrary onNavigate={handleNavigate} />,
  }

  return (
    <div className={`min-h-screen font-sans bg-cream text-ink ${isMax ? 'max-mode' : ''}`}>
      {isMax && (
        <>
          <div className="max-rainbow-bar max-rainbow-bar--top" aria-hidden="true" />
          <div className="max-rainbow-bar max-rainbow-bar--bottom" aria-hidden="true" />
        </>
      )}
      <NoiseOverlay />
      <CustomCursor />
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <main className="pt-20 md:pt-28 relative">
        <div key={activePage} className="animate-page-in">
          <Suspense fallback={<PageLoader page={activePage} />}>
            {pageMap[activePage] ?? <Home onNavigate={handleNavigate} />}
          </Suspense>
        </div>
      </main>

      {showAuth       && <AuthModal onGuest={handleContinueAsGuest} />}
      {showOnboarding && <OnboardingQuiz onClose={() => setShowOnboarding(false)} />}

      {/* Always-visible "exit upgraded tier" button — bottom-right, every page. */}
      {tier !== 'free' && (
        <button
          onClick={() => setTier('free')}
          className={`fixed right-4 z-50 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] shadow-soft-lg transition-all border-2 ${
            isMax
              ? 'bottom-6 bg-cream text-ink border-gold hover:bg-gold hover:text-ink'
              : 'bottom-4 bg-ink text-cream border-ink hover:bg-clay hover:border-clay'
          }`}
          aria-label="Switch back to Free mode"
          data-cursor-label="back to free"
        >
          <span className="display-italic text-base mr-1">←</span> Back to Free
        </button>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ProProvider>
        <UserProvider>
          <AppShell />
        </UserProvider>
      </ProProvider>
    </AuthProvider>
  )
}
