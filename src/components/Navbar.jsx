import { useState } from 'react'

const tabs = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'sport', label: 'Sport', icon: '⚡' },
  { key: 'body', label: 'Body', icon: '🌸' },
  { key: 'skincare', label: 'Skin Care', icon: '✨' },
  { key: 'wellness', label: 'Wellness', icon: '🌿' },
  { key: 'about', label: 'About', icon: '💜' },
]

export default function Navbar({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNav(key) {
    onNavigate(key)
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blush/40 shadow-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl">🌸</span>
            <span className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Quill
            </span>
          </button>

          {/* Desktop tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleNav(tab.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activePage === tab.key
                    ? 'bg-blush text-pink-700 shadow-soft'
                    : 'text-neutral-600 hover:bg-blush/40 hover:text-pink-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-blush/40 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-neutral-600 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-neutral-600 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-neutral-600 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-blush/40 bg-white/95 backdrop-blur-md animate-fade-up">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {tabs.map((tab) => (
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
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
