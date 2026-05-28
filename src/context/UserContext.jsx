import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { DEV_MODE } from './AuthContext'

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

// ─── Helpers ─────────────────────────────────────────────────────────

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...defaultProfile, ...JSON.parse(saved) }
  } catch {}
  return defaultProfile
}

function saveToStorage(profile) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)) } catch {}
}

// Map camelCase profile fields ↔ Supabase snake_case column names
function toRow(profile) {
  return {
    name:                  profile.name,
    skin_type:             profile.skinType,
    goal:                  profile.goal,
    time_per_day:          profile.timePerDay,
    favorites:             profile.favorites,
    dismissed_onboarding:  profile.dismissedOnboarding,
  }
}

function fromRow(row) {
  return {
    name:                 row.name                  ?? '',
    skinType:             row.skin_type             ?? '',
    goal:                 row.goal                  ?? '',
    timePerDay:           row.time_per_day          ?? '',
    favorites:            row.favorites             ?? [],
    dismissedOnboarding:  row.dismissed_onboarding  ?? false,
  }
}

// ─── Provider ─────────────────────────────────────────────────────────
export function UserProvider({ children }) {
  const [profile, setProfile] = useState(loadFromStorage)
  const syncedRef = useRef(false)   // guard against double-loading on mount

  // ── Save to localStorage on every change (guest + dev mode baseline) ──
  useEffect(() => {
    saveToStorage(profile)
  }, [profile])

  // ── If a real user is logged in, load their profile from Supabase ──
  useEffect(() => {
    if (DEV_MODE) return

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          // Wipe local state on logout
          setProfile(defaultProfile)
          syncedRef.current = false
          return
        }

        const userId = session?.user?.id
        if (!userId || syncedRef.current) return
        syncedRef.current = true

        // Try to load existing profile row
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (!error && data) {
          // Merge server data with any local changes made before login
          setProfile((local) => ({ ...local, ...fromRow(data) }))
        }
        // If no row yet the database trigger will create one on signup
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // ── Write changes back to Supabase (debounced 1 s) ────────────────
  const saveTimer = useRef(null)

  useEffect(() => {
    if (DEV_MODE) return

    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user?.id) return
      await supabase
        .from('profiles')
        .upsert({ id: session.user.id, ...toRow(profile) })
    }, 1000)

    return () => clearTimeout(saveTimer.current)
  }, [profile])

  // ── Actions ───────────────────────────────────────────────────────
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

  const resetProfile = useCallback(() => {
    setProfile(defaultProfile)
    syncedRef.current = false
  }, [])

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
