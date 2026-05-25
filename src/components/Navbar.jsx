import { useState } from 'react'
import ProToggle from './ProToggle.jsx'
import { usePro } from '../context/ProContext.jsx'
import { useUser } from '../context/UserContext.jsx'

const baseTabs = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'sport', label: 'Sport', icon: '⚡' },
  { key: 'body', label: 'Body', icon: '🌸' },
  { key: 'skincare', label: 'Skin Care', icon: '✨' },
  { key: 'wellness', label: 'Wellness', icon: '🌿' },
  { key: 'diet', label: 'Diet', icon: '🥗' },
  { key: 'tips', label: 'Tips', icon: '💡' },
  { key: 'myquill', label: 'My Quill', icon: '💖' },
  { key: 'about', label: 'About', icon: '💜' },
]

export default function Navbar({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isPro } = usePro()
  const { profile } = useUser()
  const favCount = profile.favorites.length

  function handleNav(key) {
    onNavigate(key)
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-500 ${
        isPro
          ? 'bg-white/85 border-amber-200/60 shadow-[0_4px_24px_rgba(252,211,77,0.18)]'
          : 'bg-white/80 border-blush/40 shadow-soft'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-2 group flex-shrink-0">
            <span className={`text-2xl transition-transform group-hover:rotate-12 ${isPro ? 'animate-pulse-soft' : ''}`}>
              🌸
            </span>
            <span
              className={`text-lg font-semibold ${
                isPro
                  ? 'text-gradient-pro'
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent'
              }`}
            >
              Quill
            </span>
            {isPro && <span className="pro-badge">Pro</span>}
          </button>

          {/* Desktop tabs */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {baseTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleNav(tab.key)}
                className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activePage === tab.key
                    ? isPro
                      ? 'bg-gradient-to-r from-amber-100 to-pink-100 text-amber-800 shadow-soft'
                      : 'bg-blush text-pink-700 shadow-soft'
                    : 'text-neutral-600 hover:bg-blush/40 hover:text-pink-600'
                }`}
              >
                {tab.label}
                {tab.key === 'myquill' && favCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center px-1 animate-pop-in">
                    {favCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right side: Pro toggle + mobile menu */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ProToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-blush/40 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-neutral-600 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-neutral-600 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-neutral-600 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-blush/40 bg-white/95 backdrop-blur-md animate-fade-up max-h-[80vh] overflow-y-auto">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {baseTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleNav(tab.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 text-left ${
                  activePage === tab.key
                    ? 'bg-blush text-pink-700'
                    : 'text-neutral-600 hover:bg-blush/40 hover:text-pink-600'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
                {tab.key === 'myquill' && favCount > 0 && (
                  <span className="ml-auto min-w-[20px] h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center px-1.5">
                    {favCount}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => handleNav('pro')}
              className="mt-2 flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 text-left bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100 text-amber-800 border border-amber-200"
            >
              <span className="text-lg">👑</span>
              {isPro ? 'Manage Pro' : 'Upgrade to Pro'}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
