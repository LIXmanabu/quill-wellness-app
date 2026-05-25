import { useUser } from '../context/UserContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import { dailyTips, categoryMeta } from '../data/dailyTips.js'
import { skincareData } from '../data/skincareData.js'
import { sportData } from '../data/sportData.js'
import { wellnessData } from '../data/wellnessData.js'
import FavoriteButton from '../components/FavoriteButton.jsx'

const skinTypeLabels = {
  dry: '🌵 Dry skin',
  oily: '✨ Oily skin',
  combo: '🌗 Combination skin',
  sensitive: '🌸 Sensitive skin',
  normal: '🌼 Normal skin',
  unsure: '🤔 Still figuring it out',
}

const goalLabels = {
  glow: '✨ Glow & confidence',
  fitness: '⚡ Move & feel strong',
  calm: '🌿 Stress less, sleep better',
  body: '🌸 Understand my body',
  eat: '🥗 Eat smarter',
}

function resolveFavorite(id) {
  const [type, key] = id.split(':')
  if (type === 'tip') {
    const tip = dailyTips.find((t) => t.id === key)
    if (!tip) return null
    return { type, icon: tip.icon, title: tip.title, sub: categoryMeta[tip.category].label, body: tip.body }
  }
  if (type === 'routine') {
    const r = skincareData.find((x) => x.id === key)
    if (!r) return null
    return { type, icon: r.icon, title: r.title, sub: 'Skincare routine', body: r.description }
  }
  if (type === 'exercise') {
    const e = sportData.find((x) => x.id === key)
    if (!e) return null
    return { type, icon: e.icon, title: e.title, sub: `${e.duration} · ${e.difficulty}`, body: e.description }
  }
  if (type === 'wellness') {
    const w = wellnessData.find((x) => x.id === key)
    if (!w) return null
    return { type, icon: w.icon, title: w.title, sub: 'Wellness', body: w.shortDescription }
  }
  return { type, icon: '💖', title: key, sub: type, body: '' }
}

export default function MyQuill({ onNavigate }) {
  const { profile, resetProfile } = useUser()
  const { isPro } = usePro()

  const resolved = profile.favorites.map((id) => ({ id, ...resolveFavorite(id) })).filter((f) => f && f.title)
  const groups = resolved.reduce((acc, f) => {
    (acc[f.type] = acc[f.type] || []).push(f)
    return acc
  }, {})

  const greeting = profile.name ? `Hey ${profile.name} 💖` : 'Your Quill 💖'

  return (
    <div className="page-section">
      {/* Hero */}
      <div className="mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-pink-200">
          💖 Your space
        </div>
        <h1 className="section-heading">{greeting}</h1>
        <p className="section-sub max-w-xl">
          Your saved tips, your profile, and what Quill recommends for you — all in one place.
        </p>
      </div>

      {/* Profile card */}
      <div className={`mb-8 p-6 rounded-3xl ${isPro ? 'pro-card' : 'card-solid'} animate-fade-up`} style={{ animationDelay: '60ms' }}>
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">Your profile</p>
            <h2 className="text-lg font-bold text-neutral-800">
              {profile.name || 'Anonymous explorer'} {isPro && <span className="pro-badge ml-2">Pro</span>}
            </h2>
          </div>
          <button
            onClick={() => { if (confirm('Reset your profile and favorites?')) resetProfile() }}
            className="text-xs text-neutral-400 hover:text-pink-600 underline"
          >
            Reset profile
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <ProfileChip label="Skin type" value={skinTypeLabels[profile.skinType] || 'Not set'} />
          <ProfileChip label="Goal" value={goalLabels[profile.goal] || 'Not set'} />
          <ProfileChip label="Time/day" value={profile.timePerDay ? `${profile.timePerDay} min` : 'Not set'} />
        </div>
      </div>

      {/* Favorites */}
      <div className="mb-8 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-800">
            Favorites <span className="text-sm font-normal text-neutral-400">({resolved.length})</span>
          </h2>
          {!isPro && (
            <span className="text-xs text-neutral-400">Free: 3 max</span>
          )}
        </div>

        {resolved.length === 0 ? (
          <div className="card-solid p-8 text-center">
            <div className="text-4xl mb-3">🤍</div>
            <p className="font-semibold text-neutral-700 mb-1">No favorites yet</p>
            <p className="text-sm text-neutral-500 mb-5 max-w-sm mx-auto leading-relaxed">
              Tap the heart on any tip, routine, or exercise to save it here for quick access.
            </p>
            <button
              onClick={() => onNavigate?.('tips')}
              className="px-5 py-2.5 rounded-2xl bg-blush text-pink-700 font-semibold text-sm hover:bg-blush-dark transition-colors"
            >
              Browse tips →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resolved.map((f, i) => (
              <div
                key={f.id}
                className="card-solid p-5 relative hover:shadow-soft-hover hover:-translate-y-0.5 transition-all duration-200 animate-fade-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="absolute top-3 right-3">
                  <FavoriteButton id={f.id} label={f.title} size="sm" />
                </div>
                <div className="text-3xl mb-2">{f.icon}</div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">{f.sub}</p>
                <h3 className="font-semibold text-neutral-800 text-sm leading-tight pr-8 mb-1.5">{f.title}</h3>
                {f.body && <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">{f.body}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pro upsell */}
      {!isPro && (
        <div className="mt-12 pro-card p-6 sm:p-8 rounded-3xl animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="text-5xl animate-float">👑</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-neutral-800 mb-1">
                Want unlimited favorites + deeper content?
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Quill Pro unlocks the full tip library, expanded routines, ingredient deep-dives, and personalized plans.
              </p>
            </div>
            <button
              onClick={() => onNavigate?.('pro')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 text-white font-semibold text-sm shadow-soft-lg hover:shadow-soft-hover transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              See Pro →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ProfileChip({ label, value }) {
  return (
    <div className="p-3 rounded-2xl bg-blush/20 border border-blush/40">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-neutral-800 truncate">{value}</p>
    </div>
  )
}
