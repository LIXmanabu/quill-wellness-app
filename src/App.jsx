import { useState, useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import OnboardingQuiz from './components/OnboardingQuiz.jsx'
import CustomCursor from './components/interactive/CustomCursor.jsx'
import NoiseOverlay from './components/interactive/NoiseOverlay.jsx'
import Home from './pages/Home.jsx'
import { ProProvider } from './context/ProContext.jsx'
import { UserProvider, useUser } from './context/UserContext.jsx'
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

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <p className="num-display text-5xl text-clay animate-pulse-soft">◐</p>
        <p className="editorial-label text-ink-soft mt-3">Loading</p>
      </div>
    </div>
  )
}

function AppShell() {
  const [activePage, setActivePage] = useState('home')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const { profile } = useUser()
  const { isMax } = usePro()

  // Always show onboarding on load (testing mode — comment out the setShowOnboarding
  // call to disable). Profile data is pre-filled from saved values.
  useEffect(() => {
    const t = setTimeout(() => setShowOnboarding(true), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activePage])

  function handleNavigate(key) {
    if (key === activePage) return
    setActivePage(key)
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
          <Suspense fallback={<PageLoader />}>
            {pageMap[activePage] ?? <Home onNavigate={handleNavigate} />}
          </Suspense>
        </div>
      </main>

      {showOnboarding && <OnboardingQuiz onClose={() => setShowOnboarding(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <ProProvider>
      <UserProvider>
        <AppShell />
      </UserProvider>
    </ProProvider>
  )
}
