import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const dotRef = useRef(null)
  const rafRef = useRef(null)
  const targetPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    function onMove(e) {
      targetPos.current = { x: e.clientX, y: e.clientY }
    }

    function onOver(e) {
      const target = e.target
      if (!target) return
      const interactive = target.closest('a, button, [role="button"], input, label, [data-cursor-hover]')
      setHovering(!!interactive)
    }

    function animate() {
      // Linear interpolation for smooth follow
      const dx = targetPos.current.x - currentPos.current.x
      const dy = targetPos.current.y - currentPos.current.y
      currentPos.current.x += dx * 0.2
      currentPos.current.y += dy * 0.2
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <div ref={dotRef} className={`cursor-dot ${hovering ? 'is-hover' : ''}`} aria-hidden="true" />
}
