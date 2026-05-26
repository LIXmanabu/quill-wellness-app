import { createContext, useContext, useEffect, useState, useMemo } from 'react'

const STORAGE_KEY = 'quill.tier'
const DEV_STORAGE_KEY = 'quill.devUnlocked'
const TIERS = ['free', 'pro', 'max']

export const DEV_CODE = 'I know Felix'

const ProContext = createContext({
  tier: 'free',
  isPro: false,
  isMax: false,
  devUnlocked: false,
  setTier: () => {},
  togglePro: () => {},
  setDevUnlocked: () => {},
})

export function ProProvider({ children }) {
  const [tier, setTierState] = useState(() => {
    try {
      const legacy = localStorage.getItem('quill.isPro')
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && TIERS.includes(saved)) return saved
      if (legacy === 'true') return 'pro'
    } catch {}
    return 'free'
  })

  const [devUnlocked, setDevUnlockedState] = useState(() => {
    try { return localStorage.getItem(DEV_STORAGE_KEY) === 'true' } catch { return false }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, tier) } catch {}
  }, [tier])

  useEffect(() => {
    try { localStorage.setItem(DEV_STORAGE_KEY, String(devUnlocked)) } catch {}
  }, [devUnlocked])

  function setTier(next) {
    if (TIERS.includes(next)) setTierState(next)
  }

  function togglePro() {
    setTierState((t) => (t === 'free' ? 'pro' : 'free'))
  }

  function setDevUnlocked(v) {
    setDevUnlockedState(!!v)
  }

  const value = useMemo(() => ({
    tier,
    isPro: tier === 'pro' || tier === 'max',
    isMax: tier === 'max',
    devUnlocked,
    setTier,
    togglePro,
    setDevUnlocked,
  }), [tier, devUnlocked])

  return (
    <ProContext.Provider value={value}>
      {children}
    </ProContext.Provider>
  )
}

export function usePro() {
  return useContext(ProContext)
}
