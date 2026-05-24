import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Sport from './pages/Sport.jsx'
import Body from './pages/Body.jsx'
import SkinCare from './pages/SkinCare.jsx'
import Wellness from './pages/Wellness.jsx'
import About from './pages/About.jsx'

export default function App() {
  const [activePage, setActivePage] = useState('home')

  const pageMap = {
    home: <Home onNavigate={setActivePage} />,
    sport: <Sport />,
    body: <Body />,
    skincare: <SkinCare />,
    wellness: <Wellness />,
    about: <About />,
  }

  return (
    <div className="min-h-screen bg-cream font-sans">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      {/* pt-16 offsets the fixed navbar height */}
      <main className="pt-16">
        {pageMap[activePage] ?? <Home onNavigate={setActivePage} />}
      </main>
    </div>
  )
}
