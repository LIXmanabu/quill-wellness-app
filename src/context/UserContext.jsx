import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'quill.user'

const defaultProfile = {
  name: '',
  skinType: '',
  goal: '',
  timePerDay: '',
  favorites: [],
  dismissedOnboarding: false,
}

const UserContext = createContext({
  profile: defaultProfile,
  updateProfile: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
  completeOnboarding: () => {},
  resetProfile: () => {},
})

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return { ...defaultProfile, ...JSON.parse(saved) }
    } catch {}
    return defaultProfile
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {}
  }, [profile])

  const updateProfile = useCallback((patch) => {
    setProfile((p) => ({ ...p, ...patch }))
  }, [])

  const toggleFavorite = useCallback((id) => {
    setProfile((p) => {
      const has = p.favorites.includes(id)
      return {
        ...p,
        favorites: has ? p.favorites.filter((f) => f !== id) : [...p.favorites, id],
      }
    })
  }, [])

  const isFavorite = useCallback((id) => profile.favorites.includes(id), [profile.favorites])

  const completeOnboarding = useCallback((data) => {
    setProfile((p) => ({ ...p, ...data, dismissedOnboarding: true }))
  }, [])

  const resetProfile = useCallback(() => setProfile(defaultProfile), [])

  return (
    <UserContext.Provider
      value={{ profile, updateProfile, toggleFavorite, isFavorite, completeOnboarding, resetProfile }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
