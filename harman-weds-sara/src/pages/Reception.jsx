import { useEffect, useRef, useState } from 'react'

import bg           from '../assets/page6_bg.jpeg'
import imgTop       from '../assets/page6_top.png'
import imgBottom    from '../assets/page6_bottom.jpeg'
import imgPiano     from '../assets/page6_rightpiano.png'
import imgFlower    from '../assets/page6_leftflower.png'
import imgCandles   from '../assets/page6_candles.png'
import grass       from '../assets/page6_grass.png'

const DIRECTIONS_URL="https://maps.app.goo.gl/FmVXA4t3pSRhRHWv5"

const Reception = () => {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

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

  // ── Slide helpers (only transform + transition are dynamic) ──────
  const fromTop    = (d = 0) => ({ transform: inView ? 'translateY(0)' : 'translateY(-150%)', transition: `transform .9s ease ${d}s` })
  const fromBottom = (d = 0) => ({ transform: inView ? 'translateY(0)' : 'translateY(115%)',  transition: `transform .9s ease ${d}s` })
  const fromLeft   = (d = 0) => ({ transform: inView ? 'translateX(0)' : 'translateX(-115%)', transition: `transform .9s ease ${d}s` })
  const fromRight  = (d = 0) => ({ transform: inView ? 'translateX(0)' : 'translateX(115%)',  transition: `transform .9s ease ${d}s` })

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

      {/* Overlay — softens bg and makes foreground images pop clearly */}
      <div className="absolute inset-0 z-[2] bg-black/30 pointer-events-none" />

      {/* Top banner — full width, from above ↓ */}
      <div className="absolute inset-x-0 top-0 z-[5]" style={fromTop(0)}>
        <img src={imgTop} alt="" draggable={false}
          className="w-full block pointer-events-none select-none" />
      </div>      

      {/* Bottom floor — full width, from below ↑ */}
      <div className="absolute inset-x-0 bottom-0 z-[10]" style={fromBottom(0)}>
        <img src={imgBottom} alt="" draggable={false}
          className="w-full block pointer-events-none select-none" />
      </div>

      {/* Left flower — left edge, from left → */}
      <div className="absolute bottom-6 left-0 z-[11]" style={fromLeft(0.08)}>
        <img src={imgFlower} alt="" draggable={false}
          className="h-[38vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* Right piano — right edge, from right ← */}
      <div className="absolute bottom-16 right-0 z-[13]" style={fromRight(0.08)}>
        <img src={imgPiano} alt="" draggable={false}
          className="h-[46vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* Candles — bottom centre, from below ↑ */}
      <div className="absolute -bottom-14 z-[14]" style={fromBottom(0.12)}>
        <img src={imgCandles} alt="" draggable={false}
          className="h-[46vh] w-auto object-contain pointer-events-none select-none" />
      </div>
      <div className="absolute -bottom-4 -right-8 z-[20]" style={fromRight(0.08)}>
        <img src={grass} alt="" draggable={false}
          className="h-[24vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* ── Text — centred, 60 % wide × 40 % tall ── */}
      <div className="absolute top-[27%] left-1/2 -translate-x-1/2 w-[60%] h-[68%] z-30 flex flex-col items-center text-center text-[#F0E4CB]">

        {/* Heading */}
        <h1
          style={{ ...txt(0.08), fontFamily: "'Great Vibes', cursive" }}
          className="text-white text-[2.4rem] leading-none font-normal m-0 mb-1"
        >
          Reception
        </h1>

        {/* Description */}
        <p
          style={{ ...txt(0.20), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[0.60rem] leading-[1.35] tracking-[0.02em] m-0 mb-1"
        >
          A grand evening of celebration, joy, and togetherness
          <br />
          with family and friends.
        </p>

        {/* Day */}
        <p
          style={{ ...txt(0.34), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[0.9rem] tracking-[0.05em] leading-none m-0 mb-[2px]"
        >
          Thursday
        </p>

        {/* Date block — JULY · 02 · 2026 · 7:00 PM */}
        <div
          style={{ ...txt(0.42), fontFamily: "'Cormorant Garamond', serif" }}
          className="flex items-center justify-center gap-0 text-[#F0E4CB]"
        >
          {/* Month */}
          <span className="text-[0.75rem] tracking-[0.1em] mb-2">JULY</span>

          {/* Big date + time stacked */}
          <div className="flex flex-col items-center leading-none">
            <span className="text-[1.8rem] leading-none">02</span>
            <span className="text-[0.7rem] tracking-[0.1em] whitespace-nowrap mt-[2px]">7:00 PM</span>
          </div>

          {/* Year */}
          <span className="text-[0.75rem] tracking-[0.08em] mb-2">2026</span>
        </div>

        {/* Venue + Address */}
        <p
          style={{ ...txt(0.56), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[0.6rem] tracking-[0.03em] leading-[1.5] mt-2"
        >
          8166 128 St #230, Surrey, BC V3W 1R1, Canada
        </p>

        {/* Get Directions button */}
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...txt(0.64),
            fontFamily: "'Cormorant Garamond', serif",
            marginTop: '8px',
            padding: '4px 22px',
            fontSize: '0.70rem',
            letterSpacing: '0.06em',
            color: 'white',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.4)',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Get Direction
        </a>

      </div>

    </section>
  )
}

export default Reception
