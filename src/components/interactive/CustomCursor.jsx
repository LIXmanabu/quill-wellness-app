import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const [clicked, setClicked] = useState(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const rafRef = useRef(null)
  const targetPos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
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
      if (interactive) {
        const cursorLabel = interactive.getAttribute('data-cursor-label')
        setLabel(cursorLabel || '')
      } else {
        setLabel('')
      }
    }

    function onDown() { setClicked(true) }
    function onUp() { setClicked(false) }

    function animate() {
      // Inner dot — fast follow
      const dx = targetPos.current.x - dotPos.current.x
      const dy = targetPos.current.y - dotPos.current.y
      dotPos.current.x += dx * 0.35
      dotPos.current.y += dy * 0.35

      // Outer ring — slower, trailing follow
      const rdx = targetPos.current.x - ringPos.current.x
      const rdy = targetPos.current.y - ringPos.current.y
      ringPos.current.x += rdx * 0.14
      ringPos.current.y += rdy * 0.14

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(16px, 16px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? 'is-hover' : ''} ${clicked ? 'is-clicked' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`cursor-dot ${hovering ? 'is-hover' : ''} ${clicked ? 'is-clicked' : ''}`}
        aria-hidden="true"
      />
      {label && (
        <div ref={labelRef} className="cursor-label" aria-hidden="true">
          {label}
        </div>
      )}
    </>
  )
}
