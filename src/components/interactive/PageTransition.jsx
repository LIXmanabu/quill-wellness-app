import { useEffect, useState } from 'react'

/**
 * Three-panel curtain sweep that crosses the viewport on every page change.
 * Each panel is staggered slightly for an editorial fan-out feel.
 */
export default function PageTransition({ triggerKey }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (triggerKey === 0) return
    setActive(true)
    const t = setTimeout(() => setActive(false), 900)
    return () => clearTimeout(t)
  }, [triggerKey])

  const panels = [
    { bg: '#1A1410', delay: '0ms' },
    { bg: '#C8654A', delay: '60ms' },
    { bg: '#E8B4B8', delay: '120ms' },
  ]

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[60] flex flex-col"
      aria-hidden="true"
    >
      {panels.map((p, i) => (
        <span
          key={i}
          className={`flex-1 origin-left ${active ? 'curtain-sweep' : ''}`}
          style={{
            background: p.bg,
            transform: active ? undefined : 'scaleX(0)',
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
