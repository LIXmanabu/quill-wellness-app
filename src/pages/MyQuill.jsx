import { useUser } from '../context/UserContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import { dailyTips, categoryMeta } from '../data/dailyTips.js'
import { skincareData } from '../data/skincareData.js'
import { sportData } from '../data/sportData.js'
import { wellnessData } from '../data/wellnessData.js'
import FavoriteButton from '../components/FavoriteButton.jsx'
import SplitText from '../components/interactive/SplitText.jsx'
import Reveal from '../components/interactive/Reveal.jsx'
import SpotlightCard from '../components/interactive/SpotlightCard.jsx'
import MagneticButton from '../components/interactive/MagneticButton.jsx'

const skinTypeLabels = {
  dry: 'Dry skin',
  oily: 'Oily skin',
  combo: 'Combination skin',
  sensitive: 'Sensitive skin',
  normal: 'Normal skin',
  unsure: 'Still figuring it out',
}

const goalLabels = {
  glow: 'Glow & confidence',
  fitness: 'Move & feel strong',
  calm: 'Stress less, sleep better',
  body: 'Understand my body',
  eat: 'Eat smarter',
}

function resolveFavorite(id) {
  const [type, key] = id.split(':')
  if (type === 'tip') {
    const tip = dailyTips.find((t) => t.id === key)
    if (!tip) return null
    return { type, kicker: categoryMeta[tip.category].label, title: tip.title, body: tip.body }
  }
  if (type === 'routine') {
    const r = skincareData.find((x) => x.id === key)
    if (!r) return null
    return { type, kicker: 'Skincare routine', title: r.title, body: r.description }
  }
  if (type === 'exercise') {
    const e = sportData.find((x) => x.id === key)
    if (!e) return null
    return { type, kicker: `${e.duration} · ${e.difficulty}`, title: e.title, body: e.description }
  }
  if (type === 'wellness') {
    const w = wellnessData.find((x) => x.id === key)
    if (!w) return null
    return { type, kicker: 'Wellness', title: w.title, body: w.shortDescription }
  }
  if (type === 'diet') {
    return { type, kicker: 'Diet protocol', title: key.charAt(0).toUpperCase() + key.slice(1), body: '' }
  }
  return { type, kicker: type, title: key, body: '' }
}

export default function MyQuill({ onNavigate }) {
  const { profile, resetProfile } = useUser()
  const { isPro } = usePro()

  const resolved = profile.favorites.map((id) => ({ id, ...resolveFavorite(id) })).filter((f) => f && f.title)
  const greeting = profile.name ? `Hello, ${profile.name}` : 'Your Quill'

  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12">
        <div className="border-b border-ink/15 pb-3 mb-10 flex items-center justify-between">
          <span className="editorial-label">Your space · Personal</span>
          <span className="editorial-label">{resolved.length} saved</span>
        </div>
        <h1 className="font-display text-[14vw] sm:text-[10vw] lg:text-[8vw] text-ink leading-[0.9] tracking-tight">
          <SplitText byChar stagger={28}>{greeting},</SplitText>
          <br />
          <span className="display-italic text-clay"><SplitText byChar stagger={28} startDelay={500}>here you are.</SplitText></span>
        </h1>
        <Reveal delay={1200} className="mt-8 max-w-md">
          <p className="text-lg text-ink-soft leading-relaxed">
            Your saved tips, your profile, and the rituals you keep coming back to.
          </p>
        </Reveal>
      </section>

      {/* Profile card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal>
          <div className={`${isPro ? 'pro-card' : 'card-paper'} p-8 sm:p-10`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-ink/15">
              <div>
                <span className="editorial-label">Your profile {isPro && <span className="pro-badge ml-2">Pro</span>}</span>
                <h2 className="font-display text-4xl sm:text-5xl text-ink mt-1 leading-tight">
                  {profile.name || 'Anonymous reader'}
                </h2>
              </div>
              <button
                onClick={() => { if (confirm('Reset your profile and favorites?')) resetProfile() }}
                className="btn-ghost link-underline self-start text-xs"
              >
                Reset profile
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
              <ProfileChip num="01" label="Skin type" value={skinTypeLabels[profile.skinType] || 'Not set'} />
              <ProfileChip num="02" label="Goal" value={goalLabels[profile.goal] || 'Not set'} />
              <ProfileChip num="03" label="Time / day" value={profile.timePerDay ? `${profile.timePerDay} min` : 'Not set'} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Favorites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal>
          <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-ink/15">
            <div>
              <span className="editorial-label">Your collection</span>
              <h2 className="font-display text-5xl sm:text-6xl text-ink mt-2 leading-none">
                Favorites <span className="display-italic text-clay">({resolved.length})</span>
              </h2>
            </div>
            {!isPro && <span className="editorial-label">Free · 3 max</span>}
          </div>
        </Reveal>

        {resolved.length === 0 ? (
          <Reveal>
            <div className="card-paper p-12 text-center">
              <p className="font-display text-5xl text-ink-softer">∅</p>
              <p className="font-display text-2xl text-ink mt-4">No favorites yet</p>
              <p className="text-sm text-ink-soft mt-2 max-w-sm mx-auto leading-relaxed">
                Tap the heart on any tip, routine, or exercise to save it here for quick access.
              </p>
              <button onClick={() => onNavigate?.('tips')} className="btn-ink mt-6">
                Browse tips <span className="display-italic">→</span>
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resolved.map((f, i) => (
              <Reveal key={f.id} delay={i * 40} className="h-full">
                <SpotlightCard className="card-paper card-paper-hover p-6 h-full relative group">
                  <div className="absolute top-4 right-4">
                    <FavoriteButton id={f.id} label={f.title} size="sm" />
                  </div>
                  <span className="editorial-num text-2xl text-ink-softer group-hover:text-clay transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="editorial-label mt-1">{f.kicker}</p>
                  <h3 className="font-display text-2xl text-ink mt-2 leading-tight pr-8">{f.title}</h3>
                  {f.body && <p className="text-sm text-ink-soft mt-3 leading-relaxed line-clamp-3">{f.body}</p>}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Pro upsell */}
      {!isPro && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Reveal>
            <SpotlightCard className="pro-card p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-9">
                <span className="editorial-label text-gold-dark">Pro Edition</span>
                <h3 className="font-display text-3xl sm:text-4xl text-ink mt-2 leading-tight">
                  Want unlimited <span className="display-italic text-clay">favorites?</span>
                </h3>
                <p className="text-ink-soft mt-3 leading-relaxed text-sm max-w-lg">
                  Quill Pro unlocks the full tip library, expanded routines, ingredient deep-dives, and personalized plans.
                </p>
              </div>
              <div className="lg:col-span-3 lg:text-right">
                <MagneticButton onClick={() => onNavigate?.('pro')} className="btn-ink">
                  See Pro <span className="display-italic">→</span>
                </MagneticButton>
              </div>
            </SpotlightCard>
          </Reveal>
        </section>
      )}
    </div>
  )
}

function ProfileChip({ num, label, value }) {
  return (
    <div className="bg-cream-light p-5">
      <div className="flex items-baseline justify-between">
        <span className="editorial-num text-2xl text-clay">{num}</span>
        <span className="editorial-label">{label}</span>
      </div>
      <p className="font-display text-xl text-ink mt-3 leading-tight">{value}</p>
    </div>
  )
}
