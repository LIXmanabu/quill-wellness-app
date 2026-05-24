import { useState } from 'react'
import BodyMap from '../components/BodyMap.jsx'
import ConcernPanel from '../components/ConcernPanel.jsx'
import { bodyData } from '../data/bodyData.js'

const regionList = [
  { id: 'face', label: 'Face', icon: '✨' },
  { id: 'head', label: 'Head', icon: '🧠' },
  { id: 'neck', label: 'Neck', icon: '🧣' },
  { id: 'shoulders', label: 'Shoulders', icon: '💪' },
  { id: 'arms', label: 'Arms', icon: '🦾' },
  { id: 'hands', label: 'Hands', icon: '🤲' },
  { id: 'chest', label: 'Chest', icon: '🫀' },
  { id: 'stomach', label: 'Stomach', icon: '🌀' },
  { id: 'back', label: 'Back', icon: '🧘' },
  { id: 'hips', label: 'Hips', icon: '🌸' },
  { id: 'legs', label: 'Legs', icon: '🦵' },
  { id: 'knees', label: 'Knees', icon: '🦿' },
  { id: 'feet', label: 'Feet', icon: '🦶' },
]

export default function Body() {
  const [view, setView] = useState('front')
  const [selectedRegion, setSelectedRegion] = useState(null)

  function closePanel() {
    setSelectedRegion(null)
  }

  return (
    <div className="page-section">
      {/* Page header */}
      <div className="mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-blush/60 text-pink-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-blush-dark/30">
          🌸 Interactive Body Map
        </div>
        <h1 className="section-heading">Your body, your guide</h1>
        <p className="section-sub max-w-xl">
          Tap any area on the body map to explore wellness tips, self-care suggestions, and gentle guidance for that part of your body.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column: body map */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <div className="card-solid p-6 sticky top-20">
            {/* Front / Back toggle */}
            <div className="flex items-center justify-center mb-5">
              <div className="inline-flex bg-blush/30 rounded-2xl p-1 gap-1">
                <button
                  onClick={() => setView('front')}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    view === 'front'
                      ? 'bg-white text-pink-700 shadow-soft'
                      : 'text-neutral-500 hover:text-pink-600'
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setView('back')}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    view === 'back'
                      ? 'bg-white text-pink-700 shadow-soft'
                      : 'text-neutral-500 hover:text-pink-600'
                  }`}
                >
                  Back
                </button>
              </div>
            </div>

            {/* SVG body map */}
            <BodyMap
              view={view}
              selectedRegion={selectedRegion}
              onRegionClick={(region) => setSelectedRegion(region === selectedRegion ? null : region)}
            />

            {/* Selected region indicator */}
            {selectedRegion && (
              <div className="mt-4 p-3 rounded-2xl bg-blush/30 border border-blush text-center">
                <p className="text-sm font-medium text-pink-700">
                  {bodyData[selectedRegion]?.icon} {bodyData[selectedRegion]?.label} selected
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">See panel on the right ↗</p>
              </div>
            )}
          </div>
        </div>

        {/* Right column: region quick links or placeholder */}
        <div className="flex-1 min-w-0">
          {selectedRegion ? (
            /* Inline panel for desktop — not a fixed overlay */
            <div className="card-solid overflow-hidden animate-fade-up">
              {/* Panel header */}
              <div className={`flex items-center justify-between px-5 py-4 border-b border-blush/30 ${bodyData[selectedRegion]?.color || 'bg-blush/20'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{bodyData[selectedRegion]?.icon}</span>
                  <div>
                    <h2 className="font-semibold text-neutral-800 text-lg">{bodyData[selectedRegion]?.label}</h2>
                    <p className="text-xs text-neutral-500">Wellness & self-care tips</p>
                  </div>
                </div>
                <button
                  onClick={closePanel}
                  className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-blush/50 transition-colors text-neutral-400"
                >
                  ✕
                </button>
              </div>

              {/* Concerns accordion */}
              <div className="p-5 space-y-3">
                {bodyData[selectedRegion]?.concerns.map((concern, i) => (
                  <ConcernAccordionItem key={i} concern={concern} defaultOpen={i === 0} />
                ))}

                {/* Disclaimer */}
                <div className="pt-3 border-t border-blush/30">
                  <p className="text-xs text-neutral-400 italic leading-relaxed">
                    {bodyData[selectedRegion]?.generalDisclaimer}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* No region selected — show clickable region list */
            <div className="animate-fade-up">
              <p className="text-sm text-neutral-500 mb-5">
                Or tap a body area below to jump straight to its wellness tips:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {regionList.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegion(r.id)}
                    className="card-solid p-4 flex flex-col items-center gap-2 hover:shadow-soft-hover hover:-translate-y-0.5 transition-all duration-200 text-center"
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <span className="text-xs font-medium text-neutral-700">{r.label}</span>
                  </button>
                ))}
              </div>

              {/* Medical disclaimer */}
              <div className="mt-8 p-5 rounded-3xl bg-blush/20 border border-blush/40">
                <p className="text-xs text-neutral-500 leading-relaxed">
                  <span className="font-semibold text-neutral-700">Important:</span> This body map provides general wellness and self-care suggestions only.
                  It does not diagnose conditions or replace medical advice. If you experience severe, sudden, persistent, or worsening symptoms, please seek medical attention.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile slide-in panel (overlay) — only on small screens */}
      {selectedRegion && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm animate-fade-in"
            onClick={closePanel}
          />
          <ConcernPanel
            region={selectedRegion}
            data={bodyData[selectedRegion]}
            onClose={closePanel}
          />
        </div>
      )}
    </div>
  )
}

/* Accordion item for each concern within a body region */
function ConcernAccordionItem({ concern, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-2xl border border-blush/30 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-blush/20 hover:bg-blush/30 transition-colors text-left"
      >
        <span className="font-medium text-neutral-800 text-sm">{concern.title}</span>
        <span className="text-neutral-400 text-xs ml-2 flex-shrink-0">{open ? '↑' : '↓'}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-3 animate-fade-up">
          <ul className="space-y-2.5 mb-3">
            {concern.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blush-dark flex-shrink-0" />
                <p className="text-sm text-neutral-600 leading-relaxed">{s}</p>
              </li>
            ))}
          </ul>
          {concern.safetyNote && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs text-amber-700 leading-relaxed">⚠️ {concern.safetyNote}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
