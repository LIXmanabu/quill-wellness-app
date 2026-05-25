import { useState, useEffect, useRef, useLayoutEffect } from 'react'
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
  const [hoverKey, setHoverKey] = useState(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })
  const { isPro } = usePro()
  const { profile } = useUser()
  const favCount = profile.favorites.length

  const navRef = useRef(null)
  const tabRefs = useRef({})

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Position the sliding indicator under the hovered or active tab
  useLayoutEffect(() => {
    const target = hoverKey || activePage
    const el = tabRefs.current[target]
    const nav = navRef.current
    if (!el || !nav) {
      setIndicator((s) => ({ ...s, opacity: 0 }))
      return
    }
    const navRect = nav.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setIndicator({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    })
  }, [hoverKey, activePage])

  // Recompute on resize
  useEffect(() => {
    function onResize() {
      const target = hoverKey || activePage
      const el = tabRefs.current[target]
      const nav = navRef.current
      if (!el || !nav) return
      const navRect = nav.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      setIndicator({ left: elRect.left - navRect.left, width: elRect.width, opacity: 1 })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [hoverKey, activePage])

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

          {/* Desktop tabs with sliding indicator */}
          <nav
            ref={navRef}
            className="hidden lg:flex relative items-center gap-5 xl:gap-7"
            onMouseLeave={() => setHoverKey(null)}
          >
            {/* Sliding active/hover indicator — a single bar tracking the focused tab */}
            <span
              className="absolute -bottom-1 h-px bg-ink pointer-events-none"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
                transition: 'left 0.5s cubic-bezier(0.22, 1, 0.36, 1), width 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease',
              }}
              aria-hidden="true"
            />
            {/* Soft moving background pill for hover */}
            <span
              className="absolute -inset-y-1.5 bg-bone pointer-events-none"
              style={{
                left: indicator.left - 10,
                width: indicator.width + 20,
                opacity: hoverKey && hoverKey !== activePage ? 0.6 : 0,
                transition: 'left 0.5s cubic-bezier(0.22, 1, 0.36, 1), width 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease',
                zIndex: -1,
              }}
              aria-hidden="true"
            />

            {tabs.map((tab, i) => {
              const isActive = activePage === tab.key
              return (
                <button
                  key={tab.key}
                  ref={(el) => (tabRefs.current[tab.key] = el)}
                  onClick={() => handleNav(tab.key)}
                  onMouseEnter={() => setHoverKey(tab.key)}
                  className={`relative text-sm tracking-wide font-medium transition-all duration-300 py-1 ${
                    isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className={`text-[10px] num-display transition-colors duration-300 ${isActive || hoverKey === tab.key ? 'text-clay' : 'text-ink-softer'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`inline-block transition-transform duration-500 ${isActive ? '-translate-y-px' : ''}`}>
                      {tab.label}
                    </span>
                    {tab.key === 'myquill' && favCount > 0 && (
                      <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-[9px] num-display bg-clay text-cream rounded-full animate-pop-in">
                        {favCount}
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
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
