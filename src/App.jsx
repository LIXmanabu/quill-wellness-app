import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import OnboardingQuiz from './components/OnboardingQuiz.jsx'
import CustomCursor from './components/interactive/CustomCursor.jsx'
import NoiseOverlay from './components/interactive/NoiseOverlay.jsx'
import PageTransition from './components/interactive/PageTransition.jsx'
import Home from './pages/Home.jsx'
import Sport from './pages/Sport.jsx'
import Body from './pages/Body.jsx'
import SkinCare from './pages/SkinCare.jsx'
import Wellness from './pages/Wellness.jsx'
import Diet from './pages/Diet.jsx'
import About from './pages/About.jsx'
import MyQuill from './pages/MyQuill.jsx'
import Pro from './pages/Pro.jsx'
import TipLibrary from './pages/TipLibrary.jsx'
import { ProProvider } from './context/ProContext.jsx'
import { UserProvider, useUser } from './context/UserContext.jsx'

function AppShell() {
  const [activePage, setActivePage] = useState('home')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)
  const { profile } = useUser()

  // Trigger onboarding on first visit
  useEffect(() => {
    if (!profile.dismissedOnboarding) {
      const t = setTimeout(() => setShowOnboarding(true), 800)
      return () => clearTimeout(t)
    }
  }, [profile.dismissedOnboarding])

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activePage])

  function handleNavigate(key) {
    if (key === activePage) return
    setTransitionKey((k) => k + 1)
    // Defer the actual page swap until the curtain has covered the screen
    setTimeout(() => setActivePage(key), 380)
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
    <div className="min-h-screen font-sans bg-cream text-ink">
      <NoiseOverlay />
      <CustomCursor />
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <main className="pt-20 md:pt-28 relative">
        <div key={activePage} className="animate-page-in">
          {pageMap[activePage] ?? <Home onNavigate={handleNavigate} />}
        </div>
      </main>

      <PageTransition triggerKey={transitionKey} />

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
