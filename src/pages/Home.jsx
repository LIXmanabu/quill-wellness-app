import { useUser } from '../context/UserContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import DailyTipCard from '../components/DailyTipCard.jsx'
import Marquee from '../components/interactive/Marquee.jsx'
import SplitText from '../components/interactive/SplitText.jsx'
import Reveal from '../components/interactive/Reveal.jsx'
import AnimatedCounter from '../components/interactive/AnimatedCounter.jsx'
import MagneticButton from '../components/interactive/MagneticButton.jsx'
import SpotlightCard from '../components/interactive/SpotlightCard.jsx'

const sections = [
  { num: '01', key: 'body', label: 'Body Map', kicker: 'Atlas', desc: 'Thirteen regions, mapped from the inside out — head to toe, with the wisdom of how they relate.', bg: 'card-bone', accent: 'text-clay' },
  { num: '02', key: 'sport', label: 'Movement', kicker: 'Practice', desc: 'Beginner-safe routines for legs, core, glutes, arms — no gym, no shame.', bg: 'card-sage', accent: 'text-sage-dark' },
  { num: '03', key: 'skincare', label: 'Skin Care', kicker: 'Ritual', desc: 'Morning, evening, and skin-type routines. Less is more — consistency beats complication.', bg: 'card-blush', accent: 'text-rust' },
  { num: '04', key: 'wellness', label: 'Wellness', kicker: 'Rest', desc: 'Stress, sleep, cramps, hydration — gentle, evidence-informed self-care for the whole self.', bg: 'card-sage', accent: 'text-sage-dark' },
  { num: '05', key: 'diet', label: 'Diet', kicker: 'Fuel', desc: 'Six evidence-based ways to eat, by goal — plus a pH self check-in and the ideal plate.', bg: 'card-clay', accent: 'text-clay-dark' },
  { num: '06', key: 'tips', label: 'Daily Tips', kicker: 'Almanac', desc: 'Sixty bite-sized habits across hydration, sleep, mood, movement, mindset and more.', bg: 'card-gold', accent: 'text-gold-dark' },
]

const goalGreeting = {
  glow: { line: 'A little extra glow today. You are in the right place.', primary: 'skincare', primaryLabel: 'Today\'s Skin Ritual' },
  fitness: { line: 'Ready to move? Let\'s find something that feels good.', primary: 'sport', primaryLabel: 'Today\'s Movement' },
  calm: { line: 'Take a breath. Let\'s find your calm.', primary: 'wellness', primaryLabel: 'Stress Relief' },
  body: { line: 'Your body is the only one you get. Let\'s understand it.', primary: 'body', primaryLabel: 'Open the Atlas' },
  eat: { line: 'Fuel that fits the goal you actually have.', primary: 'diet', primaryLabel: 'See the Diets' },
}

const stats = [
  { num: 13, label: 'Body regions', suffix: '' },
  { num: 60, label: 'Daily tips', suffix: '+' },
  { num: 6, label: 'Diet protocols', suffix: '' },
  { num: 7, label: 'Wellness areas', suffix: '' },
]

export default function Home({ onNavigate }) {
  const { profile } = useUser()
  const { isPro } = usePro()
  const isReturning = profile.dismissedOnboarding && (profile.name || profile.goal)
  const greeting = goalGreeting[profile.goal]

  return (
    <div className="bg-cream">
      {/* ════════════════════════════════════════ HERO ════════════════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:pb-20">
        {/* Top kicker */}
        <div className="flex items-center justify-between border-b border-ink/15 pb-3 mb-10 sm:mb-14">
          <span className="editorial-label">
            {isReturning ? `Welcome back${profile.name ? `, ${profile.name}` : ''}` : 'A wellness companion'}
          </span>
          <span className="editorial-label hidden sm:inline">
            Vol. 01 · Spring Edition
          </span>
        </div>

        {/* Asymmetric two-column hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Headline column */}
          <div className="lg:col-span-8">
            <h1 className="font-display text-[15vw] sm:text-[12vw] lg:text-[9.5vw] xl:text-[8.5vw] text-ink leading-[0.92] tracking-tight">
              <SplitText byChar stagger={28}>Feel good,</SplitText>
              <br />
              <span className="display-italic text-clay">
                <SplitText byChar stagger={28} startDelay={400}>from the inside</SplitText>
              </span>
              <br />
              <SplitText byChar stagger={28} startDelay={900}>out.</SplitText>
            </h1>
            <Reveal delay={1400} className="mt-8 max-w-md">
              <p className="text-lg text-ink-soft leading-relaxed">
                {isReturning && greeting
                  ? greeting.line
                  : 'A quiet, beginner-safe guide for fitness, skin, body, and the small things that build a whole self.'}
              </p>
            </Reveal>
            <Reveal delay={1600} className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton onClick={() => onNavigate(greeting?.primary || 'body')} className="btn-ink">
                {greeting?.primaryLabel || 'Open the Atlas'} <span className="display-italic">→</span>
              </MagneticButton>
              <button
                onClick={() => onNavigate(isPro ? 'tips' : 'wellness')}
                className="btn-ghost link-underline"
              >
                Or, browse {isPro ? 'today\'s tips' : 'wellness'}
              </button>
            </Reveal>
          </div>

          {/* Right column: Index */}
          <Reveal delay={400} direction="right" className="lg:col-span-4 lg:pt-4">
            <div className="border-l border-ink/15 pl-6">
              <p className="editorial-label mb-4">In this issue</p>
              <ol className="space-y-2.5">
                {sections.map((s) => (
                  <li key={s.key}>
                    <button
                      onClick={() => onNavigate(s.key)}
                      className="group flex items-baseline gap-3 text-left hover:text-clay transition-colors"
                    >
                      <span className="text-xs num-display text-ink-softer w-6 flex-shrink-0">
                        {s.num}
                      </span>
                      <span className="font-display text-xl text-ink group-hover:text-clay transition-colors">
                        {s.label}
                      </span>
                      <span className="display-italic text-sm text-ink-softer ml-auto group-hover:text-clay transition-colors">
                        {s.kicker}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════ MARQUEE BAND ════════════════════════════════════════ */}
      <section className="bg-ink text-cream py-4 sm:py-5 border-y border-ink overflow-hidden">
        <Marquee
          items={['Calm', 'Confident', 'Rooted', 'Curious', 'Soft strength', 'Body-positive', 'Slow over fast', 'Evidence over hype', 'No login', 'No tracking', 'No shame']}
          speed="slow"
          separator="✺"
          itemClassName="font-display text-2xl sm:text-3xl"
          separatorClassName="text-clay text-xl"
        />
      </section>

      {/* ════════════════════════════════════════ STATS STRIP ════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/15 border border-ink/15">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="bg-cream p-6 sm:p-8">
              <div className="flex items-baseline gap-1">
                <AnimatedCounter to={s.num} className="text-5xl sm:text-6xl text-ink" />
                <span className="text-2xl num-display text-clay">{s.suffix}</span>
              </div>
              <p className="editorial-label mt-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ DAILY TIP — featured ════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-6">
          <Reveal className="lg:col-span-7">
            <span className="editorial-label">Today, in your almanac</span>
            <h2 className="font-display text-5xl sm:text-6xl text-ink mt-2 leading-none">
              Tip of the <span className="display-italic text-clay">day</span>
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5 text-right">
            <button onClick={() => onNavigate('tips')} className="btn-ghost link-underline">
              Browse all 60 tips →
            </button>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <DailyTipCard onNavigateLibrary={() => onNavigate('tips')} />
        </Reveal>
      </section>

      {/* ════════════════════════════════════════ INDEX — bento grid ════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 pb-4 border-b border-ink/15">
            <div>
              <span className="editorial-label">The index</span>
              <h2 className="font-display text-5xl sm:text-6xl text-ink mt-2 leading-none">
                Six chapters,<br/>
                <span className="display-italic text-clay">one quiet life.</span>
              </h2>
            </div>
            <p className="text-sm text-ink-soft max-w-xs sm:text-right">
              Each chapter is self-contained. Read them in any order — Quill follows you, not the other way around.
            </p>
          </div>
        </Reveal>

        {/* Bento grid — varied sizes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
          {sections.map((s, i) => {
            // Layout pattern: featured tall + small + small | wide | normal × 3
            const layoutClasses = [
              'md:col-span-7 md:row-span-2',  // 01 Body — large featured
              'md:col-span-5',                 // 02 Movement
              'md:col-span-5',                 // 03 Skin
              'md:col-span-4',                 // 04 Wellness
              'md:col-span-4',                 // 05 Diet
              'md:col-span-4',                 // 06 Tips
            ]
            const isFeatured = i === 0
            const isRecommended = profile.goal && (
              (profile.goal === 'body' && s.key === 'body') ||
              (profile.goal === 'fitness' && s.key === 'sport') ||
              (profile.goal === 'glow' && s.key === 'skincare') ||
              (profile.goal === 'calm' && s.key === 'wellness') ||
              (profile.goal === 'eat' && s.key === 'diet')
            )
            return (
              <Reveal key={s.key} delay={i * 80} className={layoutClasses[i]}>
                <SpotlightCard
                  as="button"
                  onClick={() => onNavigate(s.key)}
                  className={`group relative w-full h-full text-left p-6 sm:p-8 ${s.bg} border border-ink/10 hover:border-ink transition-all duration-500 hover:-translate-y-1 ${isFeatured ? 'min-h-[420px]' : 'min-h-[200px]'}`}
                >
                  {isRecommended && (
                    <span className="absolute top-4 right-4 chip chip-ink text-[9px]">
                      For you
                    </span>
                  )}
                  <div className="flex items-start justify-between mb-6">
                    <span className="editorial-num text-3xl sm:text-4xl text-ink/30 group-hover:text-clay transition-colors">
                      {s.num}
                    </span>
                    <span className="editorial-label">{s.kicker}</span>
                  </div>
                  <h3 className={`font-display text-ink leading-none ${isFeatured ? 'text-6xl sm:text-7xl' : 'text-4xl sm:text-5xl'}`}>
                    {s.label}
                  </h3>
                  <p className={`mt-4 text-ink-soft leading-relaxed ${isFeatured ? 'text-lg max-w-md' : 'text-sm'}`}>
                    {s.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-ink group-hover:text-clay transition-colors">
                    <span className="link-underline">Read chapter</span>
                    <span className="display-italic transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════ EDITORIAL PULL QUOTE ════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <Reveal>
          <p className="display-italic text-3xl sm:text-5xl text-ink leading-tight text-balance">
            "Self-care isn't a luxury.<br/>
            It's how you stay in the same body for eighty years."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-ink/30" />
            <span className="editorial-label">A Quill principle</span>
            <span className="w-12 h-px bg-ink/30" />
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════ PRO UPSELL ════════════════════════════════════════ */}
      {!isPro && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Reveal>
            <SpotlightCard className="pro-card p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="editorial-label text-gold-dark">Quill, Pro Edition</span>
                <h3 className="font-display text-4xl sm:text-5xl text-ink mt-2 leading-tight">
                  Want the <span className="display-italic text-clay">unabridged</span> version?
                </h3>
                <p className="text-ink-soft mt-4 max-w-lg">
                  Sixty tips uncapped. Ingredient deep-dives. Three-week progression plans. Guided breathing. Seven-day meal templates. Unlimited favorites. All the depth a real practice needs.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <MagneticButton onClick={() => onNavigate('pro')} className="btn-ink">
                  See Pro — free preview <span className="display-italic">→</span>
                </MagneticButton>
              </div>
            </SpotlightCard>
          </Reveal>
        </section>
      )}

      {/* ════════════════════════════════════════ COLOPHON ════════════════════════════════════════ */}
      <section className="border-t border-ink/15 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="editorial-label mb-3">Colophon</p>
              <p className="font-display text-2xl text-ink leading-tight">Quill — Wellness, <span className="display-italic">quietly.</span></p>
              <p className="text-sm text-ink-soft mt-3 leading-relaxed">
                A wellness companion for the practice of being human. Built with care. Hand-set in Fraunces & Instrument Serif. No login. No tracking.
              </p>
            </div>
            <div>
              <p className="editorial-label mb-3">Not medical advice</p>
              <p className="text-sm text-ink-soft leading-relaxed">
                Quill provides general self-care information. For health concerns, talk to a doctor, dermatologist, or trusted adult. You deserve real care.
              </p>
            </div>
            <div>
              <p className="editorial-label mb-3">Principles</p>
              <ul className="space-y-1.5 text-sm text-ink-soft">
                <li>· Body-positive, always</li>
                <li>· Evidence over hype</li>
                <li>· Slow over fast</li>
                <li>· No shame, ever</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] num-display text-ink-softer uppercase tracking-[0.25em]">
            <span>Quill · Vol. 01 · 2026</span>
            <span>Made with attention, not algorithms</span>
          </div>
        </div>
      </section>
    </div>
  )
}
