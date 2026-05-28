import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

// ─── Auth modal ───────────────────────────────────────────────────────
// Shown to users who are not logged in (production only).
// Three views: welcome → sign-up or sign-in.
// "Continue as guest" is always available — it uses localStorage only.
export default function AuthModal({ onGuest }) {
  const { signIn, signUp } = useAuth()

  const [view,     setView]     = useState('welcome')   // 'welcome' | 'signin' | 'signup'
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [busy,     setBusy]     = useState(false)
  const [error,    setError]    = useState('')
  const [sent,     setSent]     = useState(false)       // true after signup email sent

  function reset() { setError(''); setSent(false) }

  async function handleSignIn(e) {
    e.preventDefault(); setBusy(true); reset()
    const { error } = await signIn(email, password)
    if (error) setError(error.message)
    setBusy(false)
  }

  async function handleSignUp(e) {
    e.preventDefault(); setBusy(true); reset()
    const { error } = await signUp(email, password, name)
    if (error) setError(error.message)
    else setSent(true)
    setBusy(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cream/95 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-cream-light border border-ink/15 p-8 sm:p-10">

        {/* ── Welcome ───────────────────────────────────────── */}
        {view === 'welcome' && (
          <>
            <p className="editorial-label text-clay mb-2">Quill</p>
            <h2 className="font-display text-4xl text-ink leading-tight mb-3">
              Your wellness,<br />
              <span className="display-italic text-clay">saved forever.</span>
            </h2>
            <p className="text-sm text-ink-soft mb-8 leading-relaxed max-w-xs">
              Create a free account and everything — your routine, favorites, and progress — follows you across every device.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => { reset(); setView('signup') }}
                className="btn-ink w-full"
              >
                Create free account
              </button>
              <button
                onClick={() => { reset(); setView('signin') }}
                className="w-full border border-ink/20 px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink hover:bg-cream-dark transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={onGuest}
                className="w-full text-sm text-ink-softer hover:text-ink-soft transition-colors py-2 underline underline-offset-4 decoration-ink/20"
              >
                Continue as guest
              </button>
            </div>

            <p className="text-[10px] text-ink-softer mt-6 leading-relaxed">
              Guest mode saves data on this device only. You can create an account later from My Quill.
            </p>
          </>
        )}

        {/* ── Sign in ───────────────────────────────────────── */}
        {view === 'signin' && (
          <form onSubmit={handleSignIn}>
            <button
              type="button"
              onClick={() => setView('welcome')}
              className="text-xs text-ink-soft mb-6 flex items-center gap-1 hover:text-ink transition-colors"
            >
              ← Back
            </button>

            <h2 className="font-display text-3xl text-ink mb-6">Sign in</h2>

            {error && (
              <p className="text-xs text-clay-dark mb-4 bg-clay/10 px-3 py-2 border border-clay/20">
                {error}
              </p>
            )}

            <div className="space-y-3 mb-6">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-ink/20 bg-cream px-4 py-2.5 text-sm font-sans text-ink placeholder:text-ink-softer outline-none focus:border-ink transition-colors"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-ink/20 bg-cream px-4 py-2.5 text-sm font-sans text-ink placeholder:text-ink-softer outline-none focus:border-ink transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="btn-ink w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </button>

            <p className="text-xs text-ink-softer mt-4 text-center">
              No account?{' '}
              <button
                type="button"
                onClick={() => { reset(); setView('signup') }}
                className="underline underline-offset-2 hover:text-ink transition-colors"
              >
                Create one
              </button>
            </p>
          </form>
        )}

        {/* ── Sign up ───────────────────────────────────────── */}
        {view === 'signup' && (
          <form onSubmit={handleSignUp}>
            <button
              type="button"
              onClick={() => setView('welcome')}
              className="text-xs text-ink-soft mb-6 flex items-center gap-1 hover:text-ink transition-colors"
            >
              ← Back
            </button>

            <h2 className="font-display text-3xl text-ink mb-6">Create account</h2>

            {error && (
              <p className="text-xs text-clay-dark mb-4 bg-clay/10 px-3 py-2 border border-clay/20">
                {error}
              </p>
            )}

            {sent ? (
              <div className="bg-sage/10 border border-sage/30 px-4 py-5 text-center">
                <p className="font-display text-xl text-ink mb-2">Check your email</p>
                <p className="text-sm text-ink-soft leading-relaxed">
                  We sent a confirmation link to <strong>{email}</strong>.
                  Click it and you're in.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-ink/20 bg-cream px-4 py-2.5 text-sm font-sans text-ink placeholder:text-ink-softer outline-none focus:border-ink transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-ink/20 bg-cream px-4 py-2.5 text-sm font-sans text-ink placeholder:text-ink-softer outline-none focus:border-ink transition-colors"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password — at least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-ink/20 bg-cream px-4 py-2.5 text-sm font-sans text-ink placeholder:text-ink-softer outline-none focus:border-ink transition-colors"
                    required
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={busy}
                  className="btn-ink w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {busy ? 'Creating account…' : 'Create free account'}
                </button>

                <p className="text-xs text-ink-softer mt-4 text-center">
                  Already have one?{' '}
                  <button
                    type="button"
                    onClick={() => { reset(); setView('signin') }}
                    className="underline underline-offset-2 hover:text-ink transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </>
            )}
          </form>
        )}

      </div>
    </div>
  )
}
