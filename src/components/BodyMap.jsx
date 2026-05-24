/* Interactive SVG body silhouette with clickable regions.
   Uses event delegation — one onClick on the <svg> element reads data-region from the clicked element.
   ViewBox: 0 0 200 520 (portrait human figure). Front and back views share the same structure. */

const FRONT_REGIONS = [
  // Head ellipse
  {
    id: 'head',
    label: 'Head',
    type: 'ellipse',
    attrs: { cx: 100, cy: 42, rx: 28, ry: 34 },
  },
  // Face — smaller ellipse layered on top of head
  {
    id: 'face',
    label: 'Face',
    type: 'ellipse',
    attrs: { cx: 100, cy: 38, rx: 18, ry: 22 },
  },
  // Neck
  {
    id: 'neck',
    label: 'Neck',
    type: 'rect',
    attrs: { x: 88, y: 76, width: 24, height: 18, rx: 6 },
  },
  // Left shoulder
  {
    id: 'shoulders',
    label: 'Shoulders',
    type: 'path',
    d: 'M 64,94 Q 50,90 44,104 Q 42,114 50,118 Q 62,120 72,112 Z M 136,94 Q 150,90 156,104 Q 158,114 150,118 Q 138,120 128,112 Z',
  },
  // Left arm
  {
    id: 'arms',
    label: 'Arms',
    type: 'path',
    d: 'M 44,118 Q 38,150 36,196 Q 40,202 50,200 Q 56,150 58,118 Z M 156,118 Q 162,150 164,196 Q 160,202 150,200 Q 144,150 142,118 Z',
  },
  // Left hand
  {
    id: 'hands',
    label: 'Hands',
    type: 'path',
    d: 'M 36,196 Q 30,208 32,220 Q 40,226 52,222 Q 58,210 50,200 Z M 164,196 Q 170,208 168,220 Q 160,226 148,222 Q 142,210 150,200 Z',
  },
  // Chest / torso
  {
    id: 'chest',
    label: 'Chest',
    type: 'path',
    d: 'M 72,112 Q 68,130 70,154 L 130,154 Q 132,130 128,112 Q 114,94 100,94 Q 86,94 72,112 Z',
  },
  // Stomach
  {
    id: 'stomach',
    label: 'Stomach',
    type: 'rect',
    attrs: { x: 70, y: 154, width: 60, height: 60, rx: 10 },
  },
  // Hips
  {
    id: 'hips',
    label: 'Hips',
    type: 'path',
    d: 'M 68,214 Q 60,228 62,250 Q 76,264 100,264 Q 124,264 138,250 Q 140,228 132,214 Z',
  },
  // Legs (both together for easier clicking)
  {
    id: 'legs',
    label: 'Legs',
    type: 'path',
    d: 'M 65,264 Q 60,300 62,360 Q 68,380 78,380 Q 88,380 90,360 Q 92,300 90,264 Z M 110,264 Q 108,300 110,360 Q 112,380 122,380 Q 132,380 138,360 Q 140,300 135,264 Z',
  },
  // Knees
  {
    id: 'knees',
    label: 'Knees',
    type: 'path',
    d: 'M 62,360 Q 58,372 60,384 Q 68,390 80,388 Q 90,382 90,370 Q 90,360 78,360 Z M 110,360 Q 108,372 110,384 Q 118,390 130,388 Q 140,382 138,370 Q 138,360 120,360 Z',
  },
  // Feet
  {
    id: 'feet',
    label: 'Feet',
    type: 'path',
    d: 'M 56,386 Q 50,400 52,418 Q 62,426 82,424 Q 94,418 92,404 Q 88,390 76,388 Z M 108,386 Q 104,398 106,416 Q 116,424 138,422 Q 150,416 148,402 Q 144,390 130,388 Z',
  },
]

const BACK_REGIONS = [
  {
    id: 'head',
    label: 'Head',
    type: 'ellipse',
    attrs: { cx: 100, cy: 42, rx: 28, ry: 34 },
  },
  {
    id: 'neck',
    label: 'Neck',
    type: 'rect',
    attrs: { x: 88, y: 76, width: 24, height: 18, rx: 6 },
  },
  {
    id: 'shoulders',
    label: 'Shoulders',
    type: 'path',
    d: 'M 64,94 Q 50,90 44,104 Q 42,114 50,118 Q 62,120 72,112 Z M 136,94 Q 150,90 156,104 Q 158,114 150,118 Q 138,120 128,112 Z',
  },
  {
    id: 'arms',
    label: 'Arms',
    type: 'path',
    d: 'M 44,118 Q 38,150 36,196 Q 40,202 50,200 Q 56,150 58,118 Z M 156,118 Q 162,150 164,196 Q 160,202 150,200 Q 144,150 142,118 Z',
  },
  {
    id: 'hands',
    label: 'Hands',
    type: 'path',
    d: 'M 36,196 Q 30,208 32,220 Q 40,226 52,222 Q 58,210 50,200 Z M 164,196 Q 170,208 168,220 Q 160,226 148,222 Q 142,210 150,200 Z',
  },
  // Upper back
  {
    id: 'back',
    label: 'Back',
    type: 'path',
    d: 'M 72,112 Q 68,140 70,214 L 130,214 Q 132,140 128,112 Q 114,94 100,94 Q 86,94 72,112 Z',
  },
  // Hips / glutes
  {
    id: 'hips',
    label: 'Hips',
    type: 'path',
    d: 'M 68,214 Q 60,228 62,260 Q 76,274 100,274 Q 124,274 138,260 Q 140,228 132,214 Z',
  },
  {
    id: 'legs',
    label: 'Legs',
    type: 'path',
    d: 'M 65,274 Q 60,310 62,370 Q 68,390 78,390 Q 88,390 90,370 Q 92,310 90,274 Z M 110,274 Q 108,310 110,370 Q 112,390 122,390 Q 132,390 138,370 Q 140,310 135,274 Z',
  },
  {
    id: 'knees',
    label: 'Knees',
    type: 'path',
    d: 'M 62,370 Q 58,382 60,394 Q 68,400 80,398 Q 90,392 90,380 Q 90,370 78,370 Z M 110,370 Q 108,382 110,394 Q 118,400 130,398 Q 140,392 138,380 Q 138,370 120,370 Z',
  },
  {
    id: 'feet',
    label: 'Feet',
    type: 'path',
    d: 'M 56,396 Q 50,408 52,426 Q 62,434 82,432 Q 94,426 92,412 Q 88,398 76,396 Z M 108,396 Q 104,406 106,424 Q 116,432 138,430 Q 150,424 148,410 Q 144,398 130,396 Z',
  },
]

function RegionShape({ region, isSelected }) {
  const base = `cursor-pointer transition-all duration-200 outline-none`
  const selectedClass = 'opacity-90'
  const hoverClass = 'hover:opacity-80'

  const fill = isSelected ? '#f9a8d4' : '#fbcfe8'
  const stroke = isSelected ? '#ec4899' : '#f9a8d4'
  const strokeWidth = isSelected ? 2.5 : 1.5

  const sharedProps = {
    'data-region': region.id,
    className: `${base} ${isSelected ? selectedClass : hoverClass}`,
    fill,
    stroke,
    strokeWidth,
  }

  if (region.type === 'ellipse') {
    return <ellipse {...sharedProps} {...region.attrs} />
  }
  if (region.type === 'rect') {
    return <rect {...sharedProps} {...region.attrs} />
  }
  if (region.type === 'path') {
    return <path {...sharedProps} d={region.d} />
  }
  return null
}

export default function BodyMap({ view, selectedRegion, onRegionClick }) {
  const regions = view === 'front' ? FRONT_REGIONS : BACK_REGIONS

  function handleClick(e) {
    const el = e.target.closest('[data-region]')
    if (el) onRegionClick(el.dataset.region)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* SVG body silhouette */}
      <svg
        viewBox="0 0 200 450"
        className="w-full max-w-[220px] sm:max-w-[260px] drop-shadow-sm"
        onClick={handleClick}
        style={{ cursor: 'default' }}
        role="img"
        aria-label="Interactive body map — tap a body area to learn more"
      >
        {/* Body outline background — subtle skin-tone fill */}
        <ellipse cx="100" cy="42" rx="30" ry="36" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
        <rect x="86" y="76" width="28" height="20" rx="8" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
        {view === 'front' ? (
          <>
            <path d="M 70,110 Q 68,130 70,270 L 130,270 Q 132,130 130,110 Q 114,92 100,92 Q 86,92 70,110 Z" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
            <path d="M 40,116 Q 34,150 32,220 L 56,224 Q 56,150 58,116 Z" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
            <path d="M 160,116 Q 166,150 168,220 L 144,224 Q 144,150 142,116 Z" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
            <path d="M 62,270 Q 58,340 60,430 L 94,430 Q 92,340 90,270 Z" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
            <path d="M 108,270 Q 108,340 110,430 L 140,430 Q 142,340 138,270 Z" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
          </>
        ) : (
          <>
            <path d="M 70,110 Q 68,130 70,280 L 130,280 Q 132,130 130,110 Q 114,92 100,92 Q 86,92 70,110 Z" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
            <path d="M 40,116 Q 34,150 32,220 L 56,224 Q 56,150 58,116 Z" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
            <path d="M 160,116 Q 166,150 168,220 L 144,224 Q 144,150 142,116 Z" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
            <path d="M 62,280 Q 58,350 60,440 L 94,440 Q 92,350 90,280 Z" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
            <path d="M 108,280 Q 108,350 110,440 L 140,440 Q 142,350 138,280 Z" fill="#fde8f3" stroke="#f9a8d4" strokeWidth="1" />
          </>
        )}

        {/* Clickable region overlays */}
        {regions.map((region) => (
          <RegionShape
            key={region.id}
            region={region}
            isSelected={selectedRegion === region.id}
          />
        ))}

        {/* Region labels (small text for desktop) */}
        {regions.map((region) => {
          if (region.type === 'ellipse') {
            return (
              <text
                key={`label-${region.id}`}
                x={region.attrs.cx}
                y={region.attrs.cy + 4}
                textAnchor="middle"
                fontSize="7"
                fill={selectedRegion === region.id ? '#9d174d' : '#be185d'}
                className="pointer-events-none select-none font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {region.label}
              </text>
            )
          }
          return null
        })}
      </svg>

      {/* Instruction hint */}
      <p className="text-xs text-neutral-400 text-center max-w-[200px]">
        Tap any highlighted area to explore wellness tips
      </p>
    </div>
  )
}
