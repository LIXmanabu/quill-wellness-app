import { usePro } from '../context/ProContext.jsx'
import SplitText from '../components/interactive/SplitText.jsx'
import Reveal from '../components/interactive/Reveal.jsx'
import Marquee from '../components/interactive/Marquee.jsx'
import AnimatedCounter from '../components/interactive/AnimatedCounter.jsx'
import MagneticButton from '../components/interactive/MagneticButton.jsx'
import SpotlightCard from '../components/interactive/SpotlightCard.jsx'

const features = [
  { num: '01', icon: '∞', title: 'Unlimited favorites', free: 'Three', pro: 'Unlimited', proOnly: false },
  { num: '02', icon: '☉', title: 'Full tip library', free: '~5 per category', pro: 'All 60+', proOnly: false },
  { num: '03', icon: '✺', title: 'Personalized home', free: 'Generic', pro: 'Goal-tailored', proOnly: false },
  { num: '04', icon: '♆', title: 'Ingredient deep-dives', free: '—', pro: 'Included', proOnly: true },
  { num: '05', icon: '☽', title: 'Weekly skincare planner', free: '—', pro: 'AM / PM / Weekly', proOnly: true },
  { num: '06', icon: '☄', title: 'Progression plans', free: 'Single routine', pro: '3-week cycles', proOnly: true },
  { num: '07', icon: '⊕', title: 'Guided breathing', free: '—', pro: 'Box · 4-7-8 · Coherent', proOnly: true },
  { num: '08', icon: '✾', title: 'Meal plan templates', free: 'Diet overview', pro: '7-day per goal', proOnly: true },
  { num: '09', icon: '⚘', title: 'Body Map cross-refs', free: 'Single region', pro: 'Related areas', proOnly: true },
  { num: '10', icon: '✶', title: 'Premium visuals', free: '—', pro: 'Editorial UI', proOnly: true },
]

const testimonials = [
  { name: 'Maya, 17', role: 'Student', quote: 'I actually open Quill every morning now. The daily tip + my saved routines are everything I want from a wellness app.' },
  { name: 'Anya, 21', role: 'Designer', quote: 'The pH check-in helped me notice I was massively underdrinking water. Genuinely changed my afternoons.' },
  { name: 'Lila, 19', role: 'Athlete', quote: 'Love that it doesn\'t shame me. Other wellness apps feel like punishment — this one feels like a friend with good books.' },
]

const proValue = [
  { num: 60, label: 'Daily tips, uncapped' },
  { num: 13, label: 'Body regions, cross-referenced' },
  { num: 6, label: 'Diet protocols, with meal plans' },
  { num: 3, label: 'Breathing techniques, guided' },
]

export default function Pro({ onNavigate }) {
  const { isPro, togglePro } = usePro()

  return (
    <div className="bg-cream">
      {/* ════════════════════════════════════════ HERO ════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16">
        <div className="border-b border-ink/15 pb-3 mb-12 flex items-center justify-between">
          <span className="editorial-label">Pro Edition · Issue 01</span>
          <span className="editorial-label">A subscription mockup</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8">
            <h1 className="font-display text-[14vw] sm:text-[11vw] lg:text-[9vw] text-ink leading-[0.9] tracking-tight">
              <SplitText byChar stagger={30}>Quill,</SplitText>
              <br />
              <span className="display-italic">
                <SplitText byChar stagger={30} startDelay={400}>unabridged.</SplitText>
              </span>
            </h1>
            <Reveal delay={1200} className="mt-8 max-w-md">
              <p className="text-lg text-ink-soft leading-relaxed">
                The depth, the personalization, the patience to follow you through seasons — for the practice of being well, on your terms.
              </p>
            </Reveal>
            <Reveal delay={1400} className="mt-8 flex flex-wrap items-center gap-3">
              {isPro ? (
                <>
                  <div className="btn-ink pointer-events-none opacity-75">
                    ✓ Pro is active
                  </div>
                  <button onClick={togglePro} className="btn-ghost link-underline">
                    Switch back to Free
                  </button>
                </>
              ) : (
                <>
                  <MagneticButton onClick={togglePro} className="btn-ink">
                    Try Pro — free preview <span className="display-italic">→</span>
                  </MagneticButton>
                  <button onClick={() => onNavigate?.('home')} className="btn-ghost link-underline">
                    Or, stay on Free
                  </button>
                </>
              )}
            </Reveal>
            <p className="text-xs text-ink-softer mt-3">
              Prototype mockup. Toggle anytime, no billing, no signup.
            </p>
          </div>

          <Reveal direction="right" delay={300} className="lg:col-span-4 lg:pt-4">
            <div className="border-l border-ink/15 pl-6 space-y-5">
              <p className="editorial-label">Pro, in numbers</p>
              {proValue.map((p, i) => (
                <div key={p.label} className="border-b border-ink/10 pb-4 last:border-b-0">
                  <AnimatedCounter to={p.num} className="text-5xl text-ink" />
                  <p className="editorial-label mt-1 text-ink-soft">{p.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════ MARQUEE ════════════════════════════════════════ */}
      <section className="bg-ink text-cream py-4 sm:py-5 border-y border-ink overflow-hidden">
        <Marquee
          items={features.map((f) => f.title)}
          separator="✺"
          speed="slow"
          itemClassName="font-display text-2xl sm:text-3xl"
          separatorClassName="text-gold text-xl"
        />
      </section>

      {/* ════════════════════════════════════════ PRICING ════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-10 pb-4 border-b border-ink/15">
            <h2 className="font-display text-5xl sm:text-6xl text-ink leading-none">
              The two <span className="display-italic text-clay">editions</span>
            </h2>
            <p className="editorial-label">No tier games. Just two choices.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-ink/15 border border-ink/15">
          {/* Free */}
          <Reveal direction="left">
            <div className="bg-cream-light p-8 sm:p-10 h-full">
              <div className="flex items-baseline justify-between mb-6">
                <p className="editorial-label">Edition I — Free</p>
                <span className="editorial-num text-2xl text-ink-softer">01</span>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-7xl text-ink leading-none">£0</span>
                <span className="text-sm text-ink-softer ml-2">forever</span>
              </div>
              <p className="text-ink-soft text-sm mb-8 leading-relaxed">
                The essentials, generously. Body map, core routines, daily skincare, the diet & pH guide.
              </p>
              <div className="space-y-3 border-t border-ink/15 pt-6">
                {['Body map — all thirteen regions', 'Core sport routines', 'Daily skincare basics', 'Three saved favorites', 'Five tips per category', 'Full diet & pH guide'].map((item) => (
                  <div key={item} className="flex items-baseline gap-3 text-sm text-ink">
                    <span className="text-clay">+</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Pro */}
          <Reveal direction="right" delay={150}>
            <SpotlightCard className="bg-ink text-cream p-8 sm:p-10 h-full relative">
              <div className="flex items-baseline justify-between mb-6">
                <p className="editorial-label text-gold">Edition II — Pro</p>
                <span className="editorial-num text-2xl text-cream/40">02</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-7xl text-cream leading-none">£4.99</span>
                <span className="text-sm text-cream/50 ml-2">per month</span>
              </div>
              <p className="text-cream/60 text-xs mb-2 line-through">Or £39 / year — save 35%</p>
              <p className="text-cream/80 text-sm mb-8 leading-relaxed">
                Everything in Free, plus the depth that turns wellness from a moment into a practice.
              </p>
              <div className="space-y-3 border-t border-cream/20 pt-6">
                {['Unlimited favorites + collections', 'All sixty wellness tips', 'Ingredient & science deep-dives', 'Three-week progression cycles', 'Guided breathing techniques', 'Seven-day meal templates', 'Editorial premium UI'].map((item) => (
                  <div key={item} className="flex items-baseline gap-3 text-sm">
                    <span className="text-gold">✦</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              {!isPro && (
                <div className="mt-8">
                  <MagneticButton onClick={togglePro} className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-ink text-sm font-medium hover:bg-gold-light transition-colors">
                    Enable Pro <span className="display-italic">→</span>
                  </MagneticButton>
                </div>
              )}
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════ FEATURE COMPARISON ════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <Reveal>
          <div className="mb-8 pb-4 border-b border-ink/15">
            <span className="editorial-label">Specifications</span>
            <h2 className="font-display text-5xl sm:text-6xl text-ink mt-2 leading-none">
              The <span className="display-italic text-clay">complete list.</span>
            </h2>
          </div>
        </Reveal>

        <div className="border border-ink/15">
          {/* Header */}
          <div className="hidden sm:grid sm:grid-cols-[80px_1fr_140px_180px] gap-4 px-6 py-3 bg-ink text-cream editorial-label">
            <div>№</div>
            <div>Feature</div>
            <div className="text-center">Free</div>
            <div className="text-center">Pro</div>
          </div>
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 30}>
              <div className={`grid grid-cols-[60px_1fr_100px_120px] sm:grid-cols-[80px_1fr_140px_180px] gap-4 px-4 sm:px-6 py-4 border-t border-ink/10 first:border-t-0 text-sm items-center ${f.proOnly ? 'bg-gold-paler' : 'bg-cream-light'}`}>
                <div className="num-display text-xl text-ink-softer">{f.num}</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-lg text-clay">{f.icon}</span>
                  <span className="font-medium text-ink">{f.title}</span>
                </div>
                <div className="text-center text-ink-softer text-xs sm:text-sm">{f.free}</div>
                <div className="text-center text-ink font-medium text-xs sm:text-sm">{f.pro}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ TESTIMONIALS ════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <Reveal>
          <div className="mb-10 pb-4 border-b border-ink/15">
            <span className="editorial-label">Letters from readers</span>
            <h2 className="font-display text-5xl sm:text-6xl text-ink mt-2 leading-none">
              What they're <span className="display-italic text-clay">saying.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="bg-cream-light p-8 h-full flex flex-col">
                <p className="display-italic text-xl text-ink leading-relaxed flex-1">
                  "{t.quote}"
                </p>
                <figcaption className="mt-6 pt-6 border-t border-ink/15 flex items-baseline justify-between">
                  <span className="font-medium text-ink">{t.name}</span>
                  <span className="editorial-label">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ FAQ ════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <Reveal>
          <div className="mb-10 pb-4 border-b border-ink/15">
            <span className="editorial-label">Frequently asked</span>
            <h2 className="font-display text-5xl sm:text-6xl text-ink mt-2 leading-none">
              Honest <span className="display-italic text-clay">answers.</span>
            </h2>
          </div>
        </Reveal>
        <div className="border-b border-ink/15">
          {[
            { q: 'Is this a real subscription?', a: 'No — Quill is a prototype. The toggle is a UX mockup so you can experience what a Pro experience would feel like.' },
            { q: 'Do you store my data?', a: 'Everything stays in your browser via localStorage. No account, no servers, no tracking.' },
            { q: 'Can I cancel anytime?', a: 'In the real product, yes — monthly with no commitment. Here, just flip the toggle in the navbar.' },
            { q: 'Is Pro content medically reviewed?', a: 'All content is general wellness guidance, evidence-informed but not medical advice. Always speak to a professional for specific concerns.' },
          ].map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details className="group border-t border-ink/15 first:border-t-0">
                <summary className="cursor-pointer py-6 flex items-center justify-between gap-4 list-none hover:text-clay transition-colors">
                  <span className="font-display text-2xl text-ink group-hover:text-clay transition-colors">
                    {item.q}
                  </span>
                  <span className="text-2xl text-ink-soft group-open:rotate-45 transition-transform display-italic">+</span>
                </summary>
                <p className="pb-6 pr-8 text-ink-soft leading-relaxed">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════ FINAL CTA ════════════════════════════════════════ */}
      <section className="bg-ink text-cream py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="editorial-label text-gold mb-6">A closing note</p>
            <h3 className="font-display text-5xl sm:text-7xl leading-tight text-balance">
              Ready to feel <span className="display-italic text-gold">the difference?</span>
            </h3>
            <p className="text-cream/70 max-w-md mx-auto mt-6 mb-10 leading-relaxed">
              Try Pro for a session — no signup, no card, no commitment. Toggle back the moment you want to.
            </p>
            {!isPro && (
              <MagneticButton onClick={togglePro} className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-ink text-sm font-medium hover:bg-gold-light transition-colors">
                ✦ Enable Pro now <span className="display-italic">→</span>
              </MagneticButton>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
