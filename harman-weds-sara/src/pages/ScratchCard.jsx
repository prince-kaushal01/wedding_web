import { useCallback, useEffect, useRef, useState } from 'react'

import bg     from '../assets/page2_bg.png'
import center from '../assets/page2_center.png'

/* ─────────────────────────────────────────────────────────────────
   SCRATCH CANVAS
   Golden canvas overlay — erased by touch/mouse.
   Lines drawn between consecutive points keep scratching smooth.
───────────────────────────────────────────────────────────────── */
const ScratchCanvas = () => {
  const wrapRef   = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef    = useRef(null)
  const lastPt    = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const wrap   = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    canvas.width  = wrap.offsetWidth
    canvas.height = wrap.offsetHeight

    const { width: w, height: h } = canvas

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    ctxRef.current = ctx

    /* ───────── GOLD TEXTURED BACKGROUND ───────── */

    // Base golden gradient
    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, '#E8CF74')
    grad.addColorStop(0.25, '#D9B44D')
    grad.addColorStop(0.5, '#F0DA8A')
    grad.addColorStop(0.75, '#C99A2E')
    grad.addColorStop(1, '#E5C86B')

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    // Subtle texture pattern
    for (let i = 0; i < 1400; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`
      ctx.fillRect(
        Math.random() * w,
        Math.random() * h,
        1,
        1
      )
    }

    // Soft shine overlay
    const shine = ctx.createLinearGradient(0, 0, w, 0)
    shine.addColorStop(0, 'rgba(255,255,255,0.10)')
    shine.addColorStop(0.5, 'rgba(255,255,255,0.02)')
    shine.addColorStop(1, 'rgba(255,255,255,0.10)')

    ctx.fillStyle = shine
    ctx.fillRect(0, 0, w, h)

    // Rounded glossy border
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'
    ctx.lineWidth = 1.2
    ctx.strokeRect(0.6, 0.6, w - 1.2, h - 1.2)

    /* ───────── TEXT ───────── */

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#4B2A00'
    ctx.font = '500 13px Cormorant Garamond, Georgia, serif'
    ctx.letterSpacing = '0.08em'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillText('SCRATCH TO REVEAL', w / 2, h / 2)
  }, [])

  const getPos = (e) => {
    const r   = canvasRef.current.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return { x: src.clientX - r.left, y: src.clientY - r.top }
  }

  const scratchAt = useCallback((x, y) => {
    const ctx    = ctxRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas || revealed) return

    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth  = 52
    ctx.lineCap    = 'round'
    ctx.lineJoin   = 'round'
    ctx.beginPath()
    lastPt.current
      ? (ctx.moveTo(lastPt.current.x, lastPt.current.y), ctx.lineTo(x, y))
      : ctx.arc(x, y, 26, 0, Math.PI * 2)
    ctx.stroke()
    lastPt.current = { x, y }

    // Reveal check — every 4th pixel for speed
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let cleared = 0, total = 0
    for (let i = 3; i < data.length; i += 16) { if (data[i] < 128) cleared++; total++ }
    if (cleared / total > 0.45) setRevealed(true)
  }, [revealed])

  const onStart = (e) => { e.preventDefault(); lastPt.current = null; const p = getPos(e); scratchAt(p.x, p.y) }
  const onMove  = (e) => { e.preventDefault(); if (e.type === 'mousemove' && e.buttons !== 1) return; const p = getPos(e); scratchAt(p.x, p.y) }
  const onEnd   = ()  => { lastPt.current = null }

  return (
    // Outer wrapper — sets dimensions and clips canvas
    <div
      ref={wrapRef}
      className="relative w-[76vw] max-w-[290px] h-[52px] rounded-[10px] overflow-hidden"
    >
      {/* Date revealed underneath */}
      <div className="absolute inset-0 flex items-center justify-center z-0" >
        <span
          className="text-[#8C1034] text-[1.25rem] font-bold tracking-[0.04em]"
          style={{ fontFamily: "'Georgia','Palatino',serif" }}
        >
          1st July, 2026
        </span>
      </div>

      {/* Golden canvas — fades out when revealed */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full rounded-[10px] z-[1] touch-none cursor-crosshair transition-opacity duration-700
                    ${revealed ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
        onMouseDown={onStart}  onMouseMove={onMove}  onMouseUp={onEnd}  onMouseLeave={onEnd}
        onTouchStart={onStart} onTouchMove={onMove}  onTouchEnd={onEnd}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   COUNTDOWN — live, updates every second
───────────────────────────────────────────────────────────────── */
const getTimeLeft = () => {
  const diff = Math.max(0, new Date('2026-07-01T00:00:00') - new Date())
  return {
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000)  / 60000),
    secs:  Math.floor((diff % 60000)    / 1000),
  }
}

const Box = ({ val, label }) => (
  <div
    className="flex flex-col items-center justify-center bg-white min-w-[50px] h-[60px] px-[10px] rounded-lg border-[1.5px] border-[#C99333]"
    style={{ boxShadow: '0 1px 6px rgba(180,130,0,0.18)' }}
  >
    <span
      className="text-[#8C1034] text-[1.05rem] font-bold leading-tight"
      style={{ fontFamily: "'Georgia','Palatino',serif" }}
    >
      {String(val).padStart(2, '0')}
    </span>
    <span className="text-[#C99333] text-[0.58rem] font-semibold uppercase tracking-[0.06em] mt-[3px]">
      {label}
    </span>
  </div>
)

const Countdown = () => {
  const [t, setT] = useState(getTimeLeft)
  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-row gap-4">
      <Box val={t.days}  label="Days"  />
      <Box val={t.hours} label="Hour" />
      <Box val={t.mins}  label="Mins"  />
      <Box val={t.secs}  label="Secs"  />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
   IntersectionObserver at 0.2 — in at 20%, out below 20%
   Image: hidden → entering (1.5s scale-up) → pulsing (zoom loop)
───────────────────────────────────────────────────────────────── */
const ScratchCardPage = () => {
  const sectionRef = useRef(null)
  const pulseTimer = useRef(null)

  const [inView,     setInView]     = useState(false)
  const [imageState, setImageState] = useState('hidden') // hidden | entering | pulsing

  // Observe section
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Image state machine
  useEffect(() => {
    clearTimeout(pulseTimer.current)
    if (inView) {
      setImageState('entering')
      pulseTimer.current = setTimeout(() => setImageState('pulsing'), 1500)
    } else {
      setImageState('hidden')
    }
    return () => clearTimeout(pulseTimer.current)
  }, [inView])

  // Text drop-in — only opacity + transform are dynamic
  const tx = (delay) => ({
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'translateY(0)' : 'translateY(-28px)',
    transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s`,
  })

  // Image animation — object lookup replaces switch
  const imgAnim = {
    hidden:   { transform: 'scale(0)',    transition: 'transform 0.4s ease' },
    entering: { transform: 'scale(1)',    transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' },
    pulsing:  { animation:  'pulseZoom 2.8s ease-in-out infinite' },
  }[imageState]

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh overflow-hidden flex flex-col items-center justify-between py-14 pb-[3vh] "
    >
      {/* Background */}
      <img src={bg} alt="" draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />

      {/* "with immense joy and love" */}
      <p style={{ ...tx(0.08), fontFamily: "'Georgia','Palatino',cursive,serif" }}
        className="relative z-10 text-[#8C1034] text-[0.99rem] italic text-center">
        With immense joy and love
      </p>

      {/* "Harman & Sara" */}
      <p style={{ ...tx(0.18), fontFamily: 'great vibes, cursive, serif' }}
        className="relative z-10 text-[#8C1034] text-[2.7rem] font-normal text-center mb-4">
        Harman &amp; Sara
      </p>

      {/* Scratch card */}
      <div style={tx(0.30)} className="relative z-10 mb-6">
        <ScratchCanvas />
      </div>

      {/* Center image */}
      <div className="relative z-10 leading-none mb-10">
        <img src={center} alt="" draggable={false}
          className="h-[32vh] w-auto object-contain block select-none"
          style={imgAnim} />
      </div>

      {/* "Our countdown to forever begins.." */}
      <p style={{ ...tx(0.40), fontFamily: 'great vibes, cursive, serif' }}
        className="relative z-10 text-[#8C1034] text-[1.5rem] text-center mb-4">
        Our countdown to forever begins..
      </p>

      {/* Countdown boxes */}
      <div style={tx(0.50)} className="relative z-10 mb-4">
        <Countdown />
      </div>

      {/* "Save the date for the wedding festivities" */}
      <p style={{ ...tx(0.60), fontFamily: 'great vibes, cursive, serif' }}
        className="relative z-10 text-[#8C1034] text-[1.5rem] text-center mb-6">
        Save the date for the wedding festivities
      </p>

    </section>
  )
}

export default ScratchCardPage
