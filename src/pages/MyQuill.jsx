import { useUser } from '../context/UserContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import { dailyTips, categoryMeta } from '../data/dailyTips.js'
import { skincareData } from '../data/skincareData.js'
import { sportData } from '../data/sportData.js'
import { wellnessData } from '../data/wellnessData.js'
import { getRoutine, getComplementaryRoutine, getAdvice, getRecommendations, isPersonalized } from '../data/personalization.js'
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
  const personalized = isPersonalized(profile)

  const routine = personalized ? getRoutine(profile) : null
  const complement = personalized ? getComplementaryRoutine(profile) : null
  const advice = personalized ? getAdvice(profile) : []
  const recs = personalized ? getRecommendations(profile) : []

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
        <Reveal delay={400} className="mt-8 max-w-md">
          <p className="text-lg text-ink-soft leading-relaxed">
            {personalized
              ? `Tailored to your goal — ${goalLabels[profile.goal] || 'understand your body'} — and the time you have for it.`
              : 'Take the quick quiz to get a routine made for you.'}
          </p>
        </Reveal>
      </section>

      {/* Profile card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      {/* PERSONALIZED ROUTINE */}
      {routine && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Reveal>
            <div className="mb-10 pb-4 border-b border-ink/15">
              <span className="editorial-label">Section 01 · Your routine</span>
              <h2 className="font-display text-5xl sm:text-6xl text-ink mt-2 leading-none">
                A day, <span className="display-italic text-clay">your way.</span>
              </h2>
              <p className="text-sm text-ink-soft mt-3 max-w-xl">
                Built around your goal ({routine.label.toLowerCase()}) and your {routine.minutes}-minute window. Adapt it; don't worship it.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/15 border border-ink/15">
            <Reveal>
              <RoutineColumn time="Morning" kicker="Start the day" steps={routine.morning} accent="#D4A744" />
            </Reveal>
            <Reveal delay={80}>
              <RoutineColumn time="Evening" kicker="Wind it down" steps={routine.evening} accent="#5A6B5D" />
            </Reveal>
          </div>

          {routine.skinAddons && (
            <Reveal delay={120}>
              <div className="mt-px border-x border-b border-ink/15 bg-bone p-6">
                <span className="editorial-label">For your {skinTypeLabels[profile.skinType]?.toLowerCase()}</span>
                <ul className="mt-3 space-y-1.5">
                  {routine.skinAddons.map((a, i) => (
                    <li key={i} className="text-sm text-ink-soft leading-relaxed flex gap-2">
                      <span className="text-clay">·</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          <Reveal delay={150}>
            <p className="display-italic text-2xl text-ink-soft mt-6 text-center">"{routine.quote}"</p>
          </Reveal>
        </section>
      )}

      {/* COMPLEMENTARY ROUTINE — the thing that supports your main thing */}
      {complement && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Reveal>
            <div className="mb-10 pb-4 border-b border-ink/15 flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="editorial-label">Section 02 · The other routine</span>
                <h2 className="font-display text-5xl sm:text-6xl text-ink mt-2 leading-none">
                  What <span className="display-italic text-clay">protects it.</span>
                </h2>
                <p className="text-sm text-ink-soft mt-3 max-w-xl">
                  {complement.why}
                </p>
              </div>
              <span className="editorial-label text-clay">↳ {complement.sourceLabel}</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/15 border border-ink/15">
            <Reveal>
              <RoutineColumn time="Morning" kicker="Supporting AM" steps={complement.morning} accent="#C8654A" />
            </Reveal>
            <Reveal delay={80}>
              <RoutineColumn time="Evening" kicker="Supporting PM" steps={complement.evening} accent="#8FA694" />
            </Reveal>
          </div>

          <Reveal delay={150}>
            <p className="display-italic text-2xl text-ink-soft mt-6 text-center">"{complement.quote}"</p>
          </Reveal>
        </section>
      )}

      {/* PERSONALIZED ADVICE */}
      {advice.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Reveal>
            <div className="mb-10 pb-4 border-b border-ink/15">
              <span className="editorial-label">Section 03 · Advice</span>
              <h2 className="font-display text-5xl sm:text-6xl text-ink mt-2 leading-none">
                The four <span className="display-italic text-clay">that matter most.</span>
              </h2>
              <p className="text-sm text-ink-soft mt-3 max-w-xl">
                If you only took four things from Quill — based on what you're working toward — these would be them.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/15 border border-ink/15">
            {advice.map((a, i) => (
              <Reveal key={i} delay={i * 50}>
                <SpotlightCard className="bg-cream-light p-6 sm:p-8 h-full group">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="editorial-num text-3xl text-clay">{String(i + 1).padStart(2, '0')}</span>
                    <span className="editorial-label">Advice</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink leading-tight">{a.title}</h3>
                  <p className="text-sm text-ink-soft mt-3 leading-relaxed">{a.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* RECOMMENDED CONTENT */}
      {recs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Reveal>
            <div className="mb-8 pb-4 border-b border-ink/15">
              <span className="editorial-label">Section 04 · Read next</span>
              <h2 className="font-display text-4xl sm:text-5xl text-ink mt-2 leading-none">
                Made for <span className="display-italic text-clay">your day.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recs.map((r, i) => (
              <Reveal key={r.key} delay={i * 60}>
                <button
                  onClick={() => onNavigate?.(r.key)}
                  className="w-full text-left card-paper card-paper-hover p-6 sm:p-7 flex items-center justify-between group"
                >
                  <div>
                    <span className="editorial-label text-clay">Recommended</span>
                    <p className="font-display text-2xl text-ink mt-1">{r.label}</p>
                    <p className="display-italic text-sm text-ink-soft mt-1">— {r.why}</p>
                  </div>
                  <span className="display-italic text-3xl text-ink-softer group-hover:text-clay group-hover:translate-x-1 transition-all">→</span>
                </button>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Favorites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Reveal>
          <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-ink/15">
            <div>
              <span className="editorial-label">Section {personalized ? '05' : '01'} · Your collection</span>
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
                  Quill Pro unlocks the full tip library, expanded routines, ingredient deep-dives, and the live diet tracker.
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

function RoutineColumn({ time, kicker, steps, accent }) {
  return (
    <div className="bg-cream-light p-6 sm:p-8 h-full">
      <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-ink/10">
        <div>
          <span className="editorial-label">{kicker}</span>
          <p className="font-display text-3xl text-ink mt-1 leading-none">{time}</p>
        </div>
        <span className="num-display text-5xl leading-none" style={{ color: accent }}>
          {time === 'Morning' ? '☀' : '☾'}
        </span>
      </div>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-baseline gap-4">
            <span className="num-display text-base flex-shrink-0 w-7" style={{ color: accent }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-sm text-ink leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
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
