import { useEffect, useRef, useState } from 'react'

import bg          from '../assets/page5_bg.jpeg'
import imgTop      from '../assets/page5_top.png'
import imgDrape    from '../assets/page5_drape.png'
import imgHorse    from '../assets/page5_horse.png'
import imgFloor    from '../assets/page5_floor.png'
import imgLeftBush from '../assets/page5_leftbush.png'
import imgObject   from '../assets/page5_object.png'
import imgRightBush from '../assets/page5_rightbush.png'

const DIRECTIONS_URL="https://maps.app.goo.gl/TjQKUxntSjC35pFr6"
  
const AnandKaraj = () => {
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
  const fromTop    = (d = 0) => ({ transform: inView ? 'translateY(0)' : 'translateY(-115%)', transition: `transform .9s ease ${d}s` })
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

      {/* Top strip — from above ↓ */}
      <div className="absolute inset-x-0 top-0 z-[11]" style={fromTop(0)}>
        <img src={imgTop} alt="" draggable={false}
          className="w-full block pointer-events-none select-none" />
      </div>

      {/* Drape — full height, left side, from left → */}
      <div className="absolute top-0 left-0 h-full z-[10]" style={fromLeft(0.05)}>
        <img src={imgDrape} alt="" draggable={false}
          className="h-full w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* Floor — bottom strip, from below ↑ */}
      <div className="absolute inset-x-0 bottom-0 z-[8]" style={fromBottom(0)}>
        <img src={imgFloor} alt="" draggable={false}
          className="w-full block pointer-events-none select-none" />
      </div>

      {/* Left bush — bottom-left, from left → */}
      <div className="absolute -bottom-6 -left-10 z-[12]" style={fromLeft(0.08)}>
        <img src={imgLeftBush} alt="" draggable={false}
          className="h-[32vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* Horse — left side, from left → */}
      <div className="absolute bottom-16 left-0 z-[9]" style={fromLeft(0.12)}>
        <img src={imgHorse} alt="" draggable={false}
          className="h-[52vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* Object — right side, from right ← */}
      <div className="absolute bottom-[10%] right-0 z-[14]" style={fromRight(0.05)}>
        <img src={imgObject} alt="" draggable={false}
          className="h-[460px] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* Right bush — bottom-right, from right ← */}
      <div className="absolute bottom-[22%] -right-4 z-[7]" style={fromRight(0.10)}>
        <img src={imgRightBush} alt="" draggable={false}
          className="h-[32vh] w-auto object-contain pointer-events-none select-none" />
      </div>

      {/* ── Text — centred, 60 % wide × 40 % tall ── */}
      <div className="absolute top-[21%] left-1/2 -translate-x-1/2 w-[60%] h-[68%] z-30 flex flex-col items-center text-center text-[#B91C36]">

        {/* Heading */}
        <h1
          style={{ ...txt(0.08), fontFamily: "'Great Vibes', cursive" }}
          className="text-[#B91C36] text-[2.5rem] leading-none font-normal m-0 mb-1"
        >
          Anand Karaj
        </h1>

        {/* Description */}
        <p
          style={{ ...txt(0.20), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[0.60rem] leading-[1.35] tracking-[0.02em] m-0 mb-1 text-[#805600]"
        >
          A divine union as the couple takes their vows
          <br />
          before Guru Granth Sahib Ji.
        </p>

        {/* Day */}
        <p
          style={{ ...txt(0.34), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[0.9rem] tracking-[0.05em] leading-none m-0 mb-[2px]"
        >
          Wednesday
        </p>

        {/* Date block — JULY · 02 · 2026 · 7:00 PM */}
        <div
          style={{ ...txt(0.42), fontFamily: "'Cormorant Garamond', serif" }}
          className="flex items-center justify-center gap-0 text-[#805600] mb-1"
        >
          {/* Month */}
          <span className="text-[0.75rem] tracking-[0.1em] mb-2">JULY</span>

          {/* Big date + time stacked */}
          <div className="flex flex-col items-center leading-none">
            <span className="text-[1.8rem] leading-none">01</span>
            <span className="text-[0.7rem] tracking-[0.1em] whitespace-nowrap mt-[2px] text-[#B91C36]">10:00 AM</span>
          </div>

          {/* Year */}
          <span className="text-[0.75rem] tracking-[0.08em] mb-2">2026</span>
        </div>

        {/* Venue + Address */}
        <p
          style={{ ...txt(0.56), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[0.6rem] tracking-[0.03em] leading-[1.5] m-0 text-[#805600] w-44"
        >
            18691 Westminster Hwy, Richmond, BC V6V 1B1, Canada
        </p>

        {/* Get Directions button — glassmorphism */}
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...txt(0.64),
            fontFamily: "'Cormorant Garamond', serif",
            marginTop: '5px',
            padding: '2px 22px',
            fontSize: '0.70rem',
            letterSpacing: '0.06em',
            color: '#B91C36',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
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

export default AnandKaraj
