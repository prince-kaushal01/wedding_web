import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import page3Bg          from '../assets/page3-bg.png'
import page3TopRight    from '../assets/page3-topright.png'
import page3Left        from '../assets/page3-left.png'
import page3Center      from '../assets/page3-center.png'
import page3Center2     from '../assets/page3-center2.png'
import page3Counter     from '../assets/page3-counter.png'
import page3Text1       from '../assets/page3-text1.png'
import page3Text2       from '../assets/page3-text2.png'
import page3TextBottom  from '../assets/page3-textbottom.png'
import page3BottomLeft  from '../assets/page3-bottomleft.png'
import page3BottomRight from '../assets/page3-bottomright.png'
import SCRATCH_IMAGE    from '../assets/page3-scratchex.png'

// ─── Scratch Card ─────────────────────────────────────────────────────────────
const ScratchCard = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const W      = canvas.width
    const H      = canvas.height
    let painting = false
    let isDone   = false
    let lastX    = 0
    let lastY    = 0

    // Draw scratch surface
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, W, H)
      ctx.fillStyle    = 'rgba(74, 37, 0, 0.85)'
      ctx.font         = '300 32px Libre Baskerville, serif'
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('SCRATCH TO REVEAL', W / 2, H / 2)
    }
    img.src = SCRATCH_IMAGE

    // Scale offsetX/Y (CSS pixels relative to element) → canvas pixels
    const scaleX = () => W / canvas.offsetWidth
    const scaleY = () => H / canvas.offsetHeight

    // For touch: convert clientX/Y to canvas coords via fresh rect
    const touchPos = (touch) => {
      const rect = canvas.getBoundingClientRect()
      return {
        x: (touch.clientX - rect.left) * scaleX(),
        y: (touch.clientY - rect.top)  * scaleY(),
      }
    }

    const checkReveal = () => {
      if (isDone) return
      const data = ctx.getImageData(0, 0, W, H).data
      let cleared = 0
      for (let i = 3; i < data.length; i += 4) if (data[i] < 128) cleared++
      if (cleared / (data.length / 4) > 0.5) {
        isDone                  = true
        canvas.style.transition = 'opacity 0.5s ease'
        canvas.style.opacity    = '0'
        setTimeout(() => { canvas.style.display = 'none' }, 520)
      }
    }

    const erase = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth  = 100
      ctx.lineCap    = 'round'
      ctx.lineJoin   = 'round'
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(x, y)
      ctx.stroke()
      // also stamp a circle so single clicks show immediately
      ctx.beginPath()
      ctx.arc(x, y, 50, 0, Math.PI * 2)
      ctx.fill()
      lastX = x
      lastY = y
      checkReveal()
    }

    // ── Mouse (desktop) ──
    // offsetX/Y are always relative to the canvas element — no rect needed
    const onMouseDown = (e) => {
      if (isDone) return
      painting = true
      lastX = e.offsetX * scaleX()
      lastY = e.offsetY * scaleY()
      erase(lastX, lastY)
    }
    const onMouseMove = (e) => {
      if (!painting || isDone) return
      erase(e.offsetX * scaleX(), e.offsetY * scaleY())
    }
    const onMouseUp = () => { painting = false }

    canvas.addEventListener('mousedown',  onMouseDown)
    canvas.addEventListener('mousemove',  onMouseMove)
    canvas.addEventListener('mouseup',    onMouseUp)
    canvas.addEventListener('mouseleave', onMouseUp)

    // ── Touch (mobile) — non-passive so we can preventDefault ──
    const onTouchStart = (e) => {
      e.preventDefault()
      if (isDone) return
      painting = true
      const pos = touchPos(e.touches[0])
      lastX = pos.x
      lastY = pos.y
      erase(lastX, lastY)
    }
    const onTouchMove = (e) => {
      e.preventDefault()
      if (!painting || isDone) return
      const pos = touchPos(e.touches[0])
      erase(pos.x, pos.y)
    }
    const onTouchEnd = () => { painting = false }

    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false })
    canvas.addEventListener('touchend',   onTouchEnd)

    return () => {
      canvas.removeEventListener('mousedown',  onMouseDown)
      canvas.removeEventListener('mousemove',  onMouseMove)
      canvas.removeEventListener('mouseup',    onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseUp)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove',  onTouchMove)
      canvas.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])

  return (
    <div style={{
      position: 'relative', width: '90%', maxWidth: '480px',
      height: '52px', borderRadius: '10px', overflow: 'hidden', margin: '0 auto',
    }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Bodoni Moda', fontSize: '18px', fontWeight: 600, color: '#8C1034', letterSpacing: '0.6px', userSelect: 'none' }}>
          23 October 2026
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={600} height={104}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none', borderRadius: '10px' }}
      />
    </div>
  )
}

// ─── Single Digit ─────────────────────────────────────────────────────────────
const SingleDigit = ({ digit }) => {
  const wrapRef   = useRef(null)
  const prevDigit = useRef(digit)

  useEffect(() => {
    if (!wrapRef.current || prevDigit.current === digit) return
    const [current, next] = wrapRef.current.querySelectorAll('span')
    next.textContent = digit
    gsap.killTweensOf([current, next])
    gsap.fromTo(current, { y: 0 }, { y: '-100%', duration: 0.28, ease: 'power2.in' })
    gsap.fromTo(next, { y: '100%' }, {
      y: '0%', duration: 0.28, ease: 'power2.out',
      onComplete: () => {
        current.textContent = digit
        gsap.set(current, { y: 0 })
        gsap.set(next, { y: '100%' })
      },
    })
    prevDigit.current = digit
  }, [digit])

  return (
    // ─ Adjust w-5 to make each digit slot wider/narrower ─
    <div ref={wrapRef} className="relative w-3 h-10 overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center text-[#8A7A0C] text-lg font-medium"
        style={{ fontFamily: 'Sans Serif' }}>
        {digit}
      </span>
      <span className="absolute inset-0 flex items-center justify-center text-[#8A7A0C] text-lg font-medium"
        style={{ fontFamily: 'Sans Serif', transform: 'translateY(100%)' }}>
        {digit}
      </span>
    </div>
  )
}

// ─── FlipUnit — accepts an absolute-position style ────────────────────────────
//
//  left  — horizontal center of the box in the counter image (tweak per box)
//  top   — vertical center inside the counter image (usually ~40%)
//
const FlipUnit = ({ value, label, style }) => {
  const digits = String(value).padStart(value >= 100 ? 3 : 2, '0').split('')
  return (
    <div
      style={{
        position:  'absolute',
        transform: 'translate(-50%, -50%)',
        display:   'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        ...style,   // ← left / top injected here
      }}
    >
      {/* Digit row */}
      <div style={{ display: 'flex' }}>
        {digits.map((d, i) => <SingleDigit key={i} digit={d} />)}
      </div>
      {/* Label */}
      <span style={{
        fontSize:      '10px',
        color:         'black',
        letterSpacing: '0.12em',
        marginTop:     '1px',
        fontFamily:    'Georgia, serif',
      }}>
        {label}
      </span>
    </div>
  )
}

// ─── Countdown ────────────────────────────────────────────────────────────────
//
//  Each FlipUnit has its own left/top so you can nudge it
//  independently to sit perfectly over each box in page3-counter.png.
//
//  ┌──────────────────────────────────────────────────────────┐
//  │  BOX 1 (DAYS)   BOX 2 (HRS)   BOX 3 (MIN)   BOX 4 (SEC)│
//  │  left ~13%      left ~38%      left ~63%      left ~88%  │
//  └──────────────────────────────────────────────────────────┘
//
//  Adjust left/top percentages until each number sits in its box.
//
const WEDDING = new Date('2026-10-23T00:00:00')

const getTimeLeft = () => {
  const diff = WEDDING - new Date()
  if (diff <= 0) return { days: 0, hours: 0, min: 0, sec: 0 }
  return {
    days:  Math.floor(diff / 864e5),
    hours: Math.floor(diff / 36e5) % 24,
    min:   Math.floor(diff / 6e4)  % 60,
    sec:   Math.floor(diff / 1e3)  % 60,
  }
}

const Countdown = () => {
  const [t, setT] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-[75%] mx-auto">
      <img src={page3Counter} alt="counter frame" className="w-full" />

      {/* Overlay container — matches the image exactly */}
      <div className="absolute inset-0">

        {/* ── DAYS — box 1 ───────────────────────── tweak left/top */}
        <FlipUnit
          value={t.days}
          label="DAYS"
          style={{ left: '10%', top: '45%' }}
        />

        {/* ── HRS — box 2 ────────────────────────── tweak left/top */}
        <FlipUnit
          value={t.hours}
          label="HRS"
          style={{ left: '37%', top: '44%' }}
        />

        {/* ── MIN — box 3 ────────────────────────── tweak left/top */}
        <FlipUnit
          value={t.min}
          label="MIN"
          style={{ left: '64%', top: '44%' }}
        />

        {/* ── SEC — box 4 ────────────────────────── tweak left/top */}
        <FlipUnit
          value={t.sec}
          label="SEC"
          style={{ left: '90%', top: '44%' }}
        />

      </div>
    </div>
  )
}

// ─── Page 3 ───────────────────────────────────────────────────────────────────
const Page3 = () => {
  const containerRef   = useRef(null)
  // corner decorations
  const topRightRef    = useRef(null)
  const leftRef        = useRef(null)
  const bottomLeftRef  = useRef(null)
  const bottomRightRef = useRef(null)
  // content
  const iconRef        = useRef(null)
  const text1Ref       = useRef(null)
  const scratchRef     = useRef(null)
  const centerRef      = useRef(null)
  const center2Ref     = useRef(null)
  const text2Ref       = useRef(null)
  const countdownRef   = useRef(null)
  const textBottomRef  = useRef(null)

  useGSAP(() => {
    const trigger = {
      trigger: containerRef.current,
      start: 'top 70%',
      end: 'top 80%',
      toggleActions: 'play none none reverse',
    }

    const tl = gsap.timeline({ scrollTrigger: trigger })

    // Corner images slide in from their sides (all at position 0 — together)
    tl.fromTo(topRightRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0
    )
    tl.fromTo(leftRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0
    )
    tl.fromTo(bottomLeftRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0
    )
    tl.fromTo(bottomRightRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0
    )

    // Content drops in one by one from above
    const items = [
      iconRef, text1Ref, scratchRef,
      text2Ref, countdownRef, textBottomRef,
    ]
    items.forEach((ref, i) => {
      tl.fromTo(ref.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        i * 0.25
      )
    })

    // Center images drop in then loop zoom
    tl.fromTo(centerRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      2 * 0.15
    )
    tl.fromTo(center2Ref.current,
      { y: -40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        onComplete: () => {
          gsap.to([centerRef.current, center2Ref.current], {
            scale: 1.05, duration: 2.5,
            ease: 'sine.inOut', yoyo: true, repeat: -1,
          })
        },
      },
      2 * 0.15
    )
  }, [])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>

      {/* BG — no animation */}
      <img src={page3Bg} alt="bg" className="absolute inset-0 w-full h-full object-cover" />

      {/* Decorative corners — slide in from sides */}
      <img ref={topRightRef}    src={page3TopRight}    alt="" className="absolute top-0 -right-[38%] w-[55%] z-10 pointer-events-none" style={{ opacity: 0 }} />
      <img ref={leftRef}        src={page3Left}        alt="" className="absolute top-[26%] -left-[35%] w-[55%] z-10 pointer-events-none" style={{ opacity: 0 }} />
      <img ref={bottomLeftRef}  src={page3BottomLeft}  alt="" className="absolute -bottom-[16%] -left-[24%] w-[42%] z-10 pointer-events-none" style={{ opacity: 0 }} />
      <img ref={bottomRightRef} src={page3BottomRight} alt="" className="absolute -bottom-[16%] -right-[24%] w-[42%] z-10 pointer-events-none" style={{ opacity: 0 }} />

      <div className="relative z-20 h-full flex flex-col items-center justify-between pt-5 px-4">

        {/* Icon + text1 */}
        <div className="absolute top-[4%] flex flex-col items-center mb-10 z-20">
          <svg ref={iconRef} className="w-7 h-7 mb-4 mt-2" viewBox="0 0 24 24" fill="#8B4513" style={{ opacity: 0 }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
          </svg>
          <img ref={text1Ref} src={page3Text1} alt="text1" className="w-[50%]" style={{ opacity: 0 }} />
        <div ref={scratchRef} className="w-[80vw] mt-8" style={{ opacity: 0 }}>
          <ScratchCard />
        </div>
        </div>        

        {/* Center image stack */}
        <div className="absolute top-[40%] w-[80%] h-[260px] -mt-30 mb-10 ml-8 z-10">
          <img ref={centerRef}  src={page3Center}  alt="center"  className="relative w-[70vw] z-20" style={{ opacity: 0 }} />
          <img ref={center2Ref} src={page3Center2} alt="center2" className="absolute -bottom-2 left-0 w-[72vw] z-10" style={{ opacity: 0 }} />
        </div>

        <div className="absolute bottom-0 flex flex-col items-center justify-between mb-10">
        <img ref={text2Ref}      src={page3Text2}      alt="text2"      className="w-[85%] mb-7"  style={{ opacity: 0 }} />
        <div ref={countdownRef} className="w-full mb-10" style={{ opacity: 0 }}>
          <Countdown />
        </div>
        <img ref={textBottomRef} src={page3TextBottom} alt="bottom text" className="w-[78%] mb-2" style={{ opacity: 0 }} />
</div>
      </div>
    </div>
  )
}

export default Page3