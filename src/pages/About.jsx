const principles = [
  {
    icon: '💜',
    title: 'Body-positive & inclusive',
    text: 'Quill uses only positive, supportive language. No body shaming, no unrealistic ideals — just genuine care.',
  },
  {
    icon: '🔒',
    title: 'Privacy-first',
    text: 'No accounts, no tracking, no data collection. Everything stays on your device.',
  },
  {
    icon: '🌱',
    title: 'Evidence-informed',
    text: 'Content is built on general wellness knowledge and beginner-safe guidance — not trends or harmful myths.',
  },
  {
    icon: '🩺',
    title: 'Medically responsible',
    text: 'We never diagnose, never promise cures, and always encourage speaking with a professional for real concerns.',
  },
]

export default function About() {
  return (
    <div className="page-section max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-12 animate-fade-up">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blush to-lavender text-4xl mb-6 shadow-soft">
          🌸
        </div>
        <h1 className="section-heading text-3xl sm:text-4xl">About Quill</h1>
        <p className="text-neutral-500 text-base leading-relaxed max-w-lg mx-auto">
          A simple, beautiful, and trustworthy wellness companion — built for teenage girls and young women who deserve better self-care tools.
        </p>
      </div>

      {/* What Quill is */}
      <div className="card-solid p-6 mb-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
        <h2 className="font-semibold text-neutral-800 text-lg mb-3">What is Quill?</h2>
        <div className="prose prose-sm text-neutral-600 max-w-none">
          <p className="leading-relaxed mb-3">
            Quill is an educational self-care and wellness prototype — a digital guide to help young women explore
            fitness routines, skincare basics, body wellness, and everyday self-care practices in a calm, supportive, and non-judgemental space.
          </p>
          <p className="leading-relaxed">
            It was designed with care to be beginner-friendly, free from toxic beauty standards, and grounded in
            general wellness knowledge. Every piece of content encourages you to listen to your body, be kind to yourself, and seek
            professional help when you need it.
          </p>
        </div>
      </div>

      {/* What Quill is NOT */}
      <div className="card-solid p-6 mb-6 border-l-4 border-amber-300 animate-fade-up" style={{ animationDelay: '140ms' }}>
        <h2 className="font-semibold text-neutral-800 text-lg mb-4">What Quill is NOT</h2>
        <ul className="space-y-3">
          {[
            'A medical diagnosis tool — Quill cannot diagnose any condition',
            'A replacement for professional medical, dermatological, or mental health advice',
            'A guarantee of results — wellness is personal and individual',
            'A fitness or diet prescriptions platform — there are no weight-loss goals here',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-xs text-amber-700 flex-shrink-0 mt-0.5">✕</span>
              <p className="text-sm text-neutral-600 leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Principles */}
      <h2 className="font-semibold text-neutral-800 text-lg mb-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
        Our principles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {principles.map((p, i) => (
          <div
            key={p.title}
            className="card-solid p-5 animate-fade-up"
            style={{ animationDelay: `${220 + i * 60}ms` }}
          >
            <span className="text-2xl mb-3 block">{p.icon}</span>
            <p className="font-semibold text-neutral-800 text-sm mb-1">{p.title}</p>
            <p className="text-xs text-neutral-500 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>

      {/* Main disclaimer box */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-blush/30 to-lavender/30 border border-blush/50 animate-fade-up" style={{ animationDelay: '480ms' }}>
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl flex-shrink-0">📋</span>
          <h2 className="font-semibold text-neutral-800 text-base">Important Disclaimer</h2>
        </div>
        <div className="prose prose-sm text-neutral-600 max-w-none space-y-3">
          <p className="leading-relaxed">
            This app provides <strong>general wellness and self-care information</strong> and does not replace medical advice.
            The content within Quill is intended for general informational and educational purposes only.
          </p>
          <p className="leading-relaxed">
            For severe symptoms, ongoing concerns, sudden changes in your health, or any situation that worries you —
            please talk to a <strong>doctor, dermatologist, parent, guardian, or trusted adult</strong>.
          </p>
          <p className="leading-relaxed">
            If you are ever in distress or need urgent support, please reach out for help. You are not alone,
            and you deserve proper care.
          </p>
        </div>
      </div>

      {/* Version note */}
      <p className="text-center text-xs text-neutral-400 mt-8 animate-fade-up" style={{ animationDelay: '540ms' }}>
        Quill v0.1 — Educational prototype · Built with React & Tailwind CSS
      </p>
    </div>
  )
}
