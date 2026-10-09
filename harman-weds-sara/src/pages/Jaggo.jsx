import { useEffect, useRef, useState } from 'react'

import bg            from '../assets/page4_bg.jpeg'
import imgBottom     from '../assets/page4_bottom.jpeg'
import imgGate       from '../assets/page4_gate.png'
import imgLeftUmb    from '../assets/page4_leftumbrella.png'
import imgRightUmb   from '../assets/page4_rigtumbrella.png'
import imgDrum       from '../assets/page4_drum.png'
import imgCycle      from '../assets/page4_cycle.png'
import img2Cart      from '../assets/page4_2cart.png'
import imgCart       from '../assets/page4_cart.png'

const Jaggo = () => {
  const sectionRef = useRef(null)
  const drumTimer  = useRef(null)

  const [inView,     setInView]     = useState(false)
  const [drumState,  setDrumState]  = useState('hidden') // hidden | entering | looping

  // IntersectionObserver — animate in at 20 %, out below 20 %
  useEffect(() => {
    const el  = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Drum state machine — appears, then loops a very subtle zoom
  useEffect(() => {
    clearTimeout(drumTimer.current)
    if (inView) {
      setDrumState('entering')
      drumTimer.current = setTimeout(() => setDrumState('looping'), 1100)
    } else {
      setDrumState('hidden')
    }
    return () => clearTimeout(drumTimer.current)
  }, [inView])

  // ── Slide helpers (only transform + transition are dynamic) ──────
  const fromTop    = (d = 0) => ({ transform: inView ? 'translateY(0)' : 'translateY(-115%)', transition: `transform .9s ease ${d}s` })
  const fromBottom = (d = 0) => ({ transform: inView ? 'translateY(0)' : 'translateY(115%)',  transition: `transform .9s ease ${d}s` })
  const fromLeft   = (d = 0) => ({ transform: inView ? 'translateX(0)' : 'translateX(-115%)', transition: `transform .9s ease ${d}s` })
  const fromRight  = (d = 0) => ({ transform: inView ? 'translateX(0)' : 'translateX(115%)',  transition: `transform .9s ease ${d}s` })

  // Drum — scale from 0 → 1, then subtle zoom loop
  const drumAnim = {
    hidden:   { transform: 'scale(0)', transition: 'transform .35s ease' },
    entering: { transform: 'scale(1)', transition: 'transform .9s ease' },
    looping:  { animation: 'drumZoom 2.8s ease-in-out infinite' },
  }[drumState]

  // Text drop-in — staggered by delay (seconds)
  const txt = (d) => ({
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(-26px)',
    transition: `opacity .5s ease ${d}s, transform .5s ease ${d}s`,
  })

  return (
    <section ref={sectionRef} className="relative w-full h-dvh overflow-hidden">

      {/* Background */}
      <img src={bg} alt="" draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />

      {/* Gate — full screen, from top ↓ */}
      <div className="absolute inset-0 z-[15]" style={fromTop(0)}>
        <img src={imgGate} alt="" draggable={false}
          className="w-full h-full object-cover pointer-events-none select-none" />
      </div>

      {/* Bottom strip — from below ↑ */}
      <div className="absolute inset-x-0 bottom-0 z-[10]" style={fromBottom(0)}>
        <img src={imgBottom} alt="" draggable={false}
          className="w-full block pointer-events-none select-none" />
      </div>

      {/* Cart — behind cycle, from right ← */}
      <div className="absolute bottom-[10%] right-[5%] z-[11]" style={fromRight(0.1)}>
        <img src={imgCart} alt="" draggable={false}
          className="h-[30vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* Drum — stays at origin, subtle zoom loop */}
      <div className="absolute bottom-[0%] left-[0%] z-[17]" style={drumAnim}>
        <img src={imgDrum} alt="" draggable={false}
          className="h-[38vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* Cycle — right of drum, from right ← */}
      <div className="absolute bottom-0 left-[32%] z-[16]" style={fromRight(0.15)}>
        <img src={imgCycle} alt="" draggable={false}
          className="h-[40vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* Left umbrella — centre-left, from left → */}
      <div className="absolute bottom-[24%] left-0 z-[17]" style={fromLeft(0.05)}>
        <img src={imgLeftUmb} alt="" draggable={false}
          className="h-[38vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* Right umbrella — centre-right, from right ← */}
      <div className="absolute top-[30%] -right-4 z-[17]" style={fromRight(0.05)}>
        <img src={imgRightUmb} alt="" draggable={false}
          className="h-[30vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* 2 Cart — right side, from right ← */}
      <div className="absolute bottom-[0%] right-0 z-[17]" style={fromRight(0.2)}>
        <img src={img2Cart} alt="" draggable={false}
          className="h-[40vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* ── Text — centred, 60 % wide × 40 % tall ── */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] z-30 flex flex-col items-center text-center text-[#b5164c]">

        {/* Heading */}
        <h1
          style={{ ...txt(0.08), fontFamily: "'Great Vibes', cursive" }}
          className="text-[2.5rem] leading-none font-normal m-0 mb-3"
        >
          Jaggo
        </h1>

        {/* Description */}
        <p
          style={{ ...txt(0.20), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[0.60rem] leading-[1.35] tracking-[0.02em] m-0 mb-1"
        >
          An evening of music, dance, and vibrant celebrations
          <br />
          as we rejoice together.
        </p>

        {/* Day */}
        <p
          style={{ ...txt(0.34), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[0.9rem] tracking-[0.05em] leading-none m-0 mb-[2px]"
        >
          Tuesday
        </p>

        {/* Date block — JUNE · 30 · 2026 · 7:00 AM */}
        <div
          style={{ ...txt(0.42), fontFamily: "'Cormorant Garamond', serif" }}
          className="flex items-center justify-center text-[#805600] mb-1"
        >
          <span className="text-[0.75rem] tracking-[0.1em] mb-2">JUNE</span>

          <div className="flex flex-col items-center leading-none">
            <span className="text-[1.8rem] leading-none">30</span>
            <span className="text-[0.7rem] tracking-[0.1em] whitespace-nowrap mt-[2px] text-[#b5164c]">7:00 PM</span>
          </div>

          <span className="text-[0.75rem] tracking-[0.08em] mb-2">2026</span>
        </div>      
      </div>

    </section>
  )
}

export default Jaggo
