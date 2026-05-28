import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// ─── Dev mode ────────────────────────────────────────────────────────
// Set VITE_DEV_MODE=true in .env.local to bypass auth entirely and
// always show the onboarding quiz on every load (original behaviour).
export const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(!DEV_MODE)

  useEffect(() => {
    if (DEV_MODE) return   // skip all Supabase calls in dev

    // Restore existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // React to login / logout / token refresh in real time
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => setUser(session?.user ?? null)
    )
    return () => subscription.unsubscribe()
  }, [])

  // ── Sign up with email + password ────────────────────────────────
  async function signUp(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },   // stored in auth.users.raw_user_meta_data
    })
    return { data, error }
  }

  // ── Sign in ───────────────────────────────────────────────────────
  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  // ── Sign out ──────────────────────────────────────────────────────
  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
