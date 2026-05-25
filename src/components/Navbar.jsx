import { useState, useEffect } from 'react'
import ProToggle from './ProToggle.jsx'
import { usePro } from '../context/ProContext.jsx'
import { useUser } from '../context/UserContext.jsx'

const tabs = [
  { key: 'home', label: 'Home' },
  { key: 'body', label: 'Body' },
  { key: 'sport', label: 'Movement' },
  { key: 'skincare', label: 'Skin' },
  { key: 'wellness', label: 'Wellness' },
  { key: 'diet', label: 'Diet' },
  { key: 'tips', label: 'Tips' },
  { key: 'myquill', label: 'My Quill' },
  { key: 'about', label: 'About' },
]

export default function Navbar({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isPro } = usePro()
  const { profile } = useUser()
  const favCount = profile.favorites.length

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNav(key) {
    onNavigate(key)
    setMenuOpen(false)
  }

  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream/95 backdrop-blur-md border-b border-ink/15 shadow-soft' : 'bg-cream border-b border-ink/10'}`}>
      {/* Editorial top strip */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="masthead">
          <span>Quill — Wellness Quarterly</span>
          <span>Issue 01 · {date}</span>
          <span>{isPro ? 'Pro Edition' : 'Free Edition'}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16 gap-3">
          {/* Logo — Magazine masthead style */}
          <button
            onClick={() => handleNav('home')}
            className="group flex items-baseline gap-2"
          >
            <span className="font-display text-3xl md:text-4xl text-ink leading-none tracking-tight">Quill</span>
            <span className="display-italic text-xs text-ink-soft hidden sm:inline">— since '26</span>
          </button>

          {/* Desktop tabs */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {tabs.map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => handleNav(tab.key)}
                className={`group relative text-sm tracking-wide font-medium transition-colors duration-300 ${
                  activePage === tab.key ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className={`text-[10px] num-display ${activePage === tab.key ? 'text-clay' : 'text-ink-softer'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {tab.label}
                  {tab.key === 'myquill' && favCount > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-[9px] num-display bg-clay text-cream rounded-full">
                      {favCount}
                    </span>
                  )}
                </span>
                <span className={`absolute -bottom-1 left-0 right-0 h-px bg-ink origin-left transition-transform duration-400 ${activePage === tab.key ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            ))}
          </nav>

          {/* Right side: Pro toggle + mobile menu */}
          <div className="flex items-center gap-3">
            <ProToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-ink/10 bg-cream-light animate-fade-up max-h-[80vh] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
            {tabs.map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => handleNav(tab.key)}
                className={`flex items-baseline gap-3 px-3 py-3 border-b border-ink/5 text-left transition-colors ${
                  activePage === tab.key ? 'text-ink' : 'text-ink-soft hover:text-ink hover:bg-cream'
                }`}
              >
                <span className="text-[10px] num-display text-clay w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-xl">{tab.label}</span>
                {tab.key === 'myquill' && favCount > 0 && (
                  <span className="ml-auto text-xs num-display text-clay">({favCount})</span>
                )}
              </button>
            ))}
            <button
              onClick={() => handleNav('pro')}
              className="mt-4 flex items-center justify-between px-4 py-4 bg-ink text-cream text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <span className="display-italic text-base">{isPro ? 'Manage' : 'Try'} Pro</span>
              </span>
              <span>→</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
