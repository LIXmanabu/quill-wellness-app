import { createContext, useContext, useEffect, useState, useMemo } from 'react'

const STORAGE_KEY = 'quill.tier'
const TIERS = ['free', 'pro', 'max']

const ProContext = createContext({
  tier: 'free',
  isPro: false,
  isMax: false,
  setTier: () => {},
  togglePro: () => {},
})

export function ProProvider({ children }) {
  const [tier, setTierState] = useState(() => {
    try {
      // Back-compat: read old boolean flag
      const legacy = localStorage.getItem('quill.isPro')
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && TIERS.includes(saved)) return saved
      if (legacy === 'true') return 'pro'
    } catch {}
    return 'free'
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, tier) } catch {}
  }, [tier])

  function setTier(next) {
    if (TIERS.includes(next)) setTierState(next)
  }

  function togglePro() {
    setTierState((t) => (t === 'free' ? 'pro' : 'free'))
  }

  const value = useMemo(() => ({
    tier,
    isPro: tier === 'pro' || tier === 'max',
    isMax: tier === 'max',
    setTier,
    togglePro,
  }), [tier])

  return (
    <ProContext.Provider value={value}>
      {children}
    </ProContext.Provider>
  )
}

export function usePro() {
  return useContext(ProContext)
}
