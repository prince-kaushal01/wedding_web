import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

import page3Bg        from '../assets/page3-bg.webp'
import page3Topflower from '../assets/page3-topflower-trim.webp'
import page3Text1     from '../assets/page3-text1-trim.webp'
import page3Box       from '../assets/page3-box.webp'
import page3Img       from '../assets/page3-img-trim.webp'
import page3Line      from '../assets/page3-line-trim.webp'
import page3Text2     from '../assets/page3-text2-trim.webp'

// Shared starting state for the four scroll-animated elements — opacity  ──
// 0, offset up. Set inline (not via JS) so the browser paints them        ──
// already-hidden from the first frame; no flash before the scroll-        ──
// triggered animation takes over.                                         ──
const hidden = { opacity: 0, transform: 'translateY(-40px)' }

// ─── Countdown target ───────────────────────────────────────────────────────
const WEDDING = new Date('2026-10-15T00:00:00')

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

// ─── Single Digit — flips up from below when its value changes ────────────
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
    <div ref={wrapRef} className="relative overflow-hidden" style={{ width: '0.62em', height: '1.15em' }}>
      <span className="absolute inset-0 flex items-center justify-center" style={{ color: '#8C1034' }}>
        {digit}
      </span>
      <span className="absolute inset-0 flex items-center justify-center" style={{ color: '#8C1034', transform: 'translateY(100%)' }}>
        {digit}
      </span>
    </div>
  )
}

// ─── FlipUnit — digit pair + label, absolutely placed over one box ────────
const FlipUnit = ({ value, label, style }) => {
  const digits = String(value).padStart(2, '0').split('')
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ transform: 'translate(-50%, -50%)', ...style }}
    >
      {/* Digits — tweak fontSize (clamp: min, preferred, max) and fontFamily here */}
      <div
        className="flex"
        style={{ fontSize: 'clamp(1rem, 4.2vw, 1.5rem)', fontFamily: 'Georgia, serif', fontWeight: 600, lineHeight: 1 }}
      >
        {digits.map((d, i) => <SingleDigit key={i} digit={d} />)}
      </div>
      {/* Label ("DAYS"/"HRS"/etc.) — marginTop controls the gap below the digits, */}
      {/* fontSize/fontFamily control the label's own size and typeface */}
      <span
        style={{
          fontSize:      'clamp(0.75rem, 1.7vw, 0.6rem)',
          color:         '#8C1034',
          letterSpacing: '0.14em',
          marginTop:     '6px',   // ← gap between digits and label, increase to push label further down
          fontFamily:    'Georgia, serif',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Countdown — one FlipUnit per box, positioned as % of the box row ─────
// Box centers were measured directly from page3-box.png (865×195px):
//   box1 center 10.2%, box2 36.7%, box3 63.2%, box4 89.7% — vertical center 50%
const Countdown = () => {
  const [t, setT] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 z-10">
      <FlipUnit value={t.days}  label="DAYS" style={{ left: '10.2%', top: '50%' }} />
      <FlipUnit value={t.hours} label="HRS"  style={{ left: '36.7%', top: '50%' }} />
      <FlipUnit value={t.min}   label="MIN"  style={{ left: '63.2%', top: '50%' }} />
      <FlipUnit value={t.sec}   label="SEC"  style={{ left: '89.7%', top: '50%' }} />
    </div>
  )
}

const Page3 = () => {
  const stackRef  = useRef(null)
  const flowerRef = useRef(null)
  const text1Ref  = useRef(null)
  const boxRef    = useRef(null)
  const imgRef    = useRef(null)
  const lineRef   = useRef(null)
  const text2Ref  = useRef(null)

  // ── Scroll-linked reveal — same approach as Page2: progress is tied  ──
  // directly to how far the user has scrolled through the trigger       ──
  // range (scrub), not a one-shot timed animation. Every element here    ──
  // (flower, text1, countdown box, couple photo, line, text2) animates — ──
  // the countdown's own live digit updates are untouched since that's    ──
  // a separate component re-rendering itself, not this wrapper's style.  ──
  // Pure transform/opacity, so it stays smooth. Tune `start`/`end` (the  ──
  // scroll distance the reveal is spread across) or `stagger` below to   ──
  // adjust feel/pace.                                                    ──
  useEffect(() => {
    const items = [
      flowerRef.current,
      text1Ref.current,
      boxRef.current,
      imgRef.current,
      lineRef.current,
      text2Ref.current,
    ]

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 90%',
        end: '+=500',
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    })

    tl.to(items, {
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      stagger: 0.4,
      force3D: true,
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div className="relative w-full h-dvh overflow-hidden">

      {/* ── Background — floral card border, full bleed ─────── */}
      <img
        src={page3Bg}
        alt=""
        className="absolute inset-0 w-full h-full object-center z-0"
      />

      {/* ── Everything below lives in one flex column ── */}
      {/* top — stays at 4% (short screens, ≤700px tall) growing to 8% on   */}
      {/* long screens. gap — stays at 0.75rem growing to 1.75rem. Tweak    */}
      {/* the 700px baseline, rates, or caps below.                         */}
      {/* Each image has its own width clamp (grows on tall screens,       */}
      {/* capped) and, where noted, its own extra marginBottom clamp —     */}
      {/* tune the baseline/rate/cap on each independently.                 */}
      <div
        ref={stackRef}
        className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center justify-between z-10 overflow-hidden"
        style={{
          top: 'clamp(6%, calc(6% + (100dvh - 700px) * 0.52), 7%)',
          bottom: '8%',
          paddingTop: 'clamp(0.25rem, 1dvh, 0.75rem)',
          paddingBottom: 'clamp(0.45rem, 1dvh, 0.75rem)',
        }}
      >

        {/* ── Sub-div 1: flower + text1 + countdown box ── */}
        <div className="flex flex-col items-center w-full" style={{ gap: 'clamp(0.4rem, calc(0.5rem + (100dvh - 700px) * 0.15), 2rem)' }}>

          {/* Top flower ornament */}
          <img
            ref={flowerRef}
            src={page3Topflower}
            alt=""
            style={{
              ...hidden,
              width: 'clamp(12%, calc(12% + (100dvh - 700px) * 0.08), 22%)',
              marginBottom: 'clamp(0.55rem, calc(0.55rem + (100dvh - 700px) * 0.005), 0.75rem)',
            }}
          />

          {/* "Our Countdown to Forever Begins…" */}
          <img
            ref={text1Ref}
            src={page3Text1}
            alt=""
            style={{
              ...hidden,
              width: 'clamp(80%, calc(80% + (100dvh - 700px) * 0.08), 85%)',
              marginBottom: 'clamp(0.85rem, calc(0.85rem + (100dvh - 700px) * 0.5), 0.75rem)',
            }}
          />

          {/* Countdown boxes — the digits (Countdown) are centered on each  */}
          {/* box via the % positions measured on page3-box.png (see comment */}
          {/* above the Countdown component) — they stay correct as long as  */}
          {/* this container's aspect ratio (865/195) is unchanged.          */}
          <div
            ref={boxRef}
            className="relative"
            style={{
              ...hidden,
              width: 'clamp(78%, calc(78% + (100dvh - 700px) * 0.08), 92%)',
              aspectRatio: '865 / 195',
              marginBottom: 'clamp(0.25rem, calc(0.25rem + (100dvh - 700px) * 0.005), 0.75rem)',
            }}
          >
            <img src={page3Box} alt="" className="w-full h-full" />
            <Countdown />
          </div>

        </div>

        {/* ── Sub-div 2: couple photo ── */}
        <div className="flex flex-col items-center w-full">

          {/* Couple photo */}
          <img
            ref={imgRef}
            src={page3Img}
            alt="Couple"
            style={{
              ...hidden,
              width: 'clamp(50%, calc(50% + (100dvh - 700px) * 0.48), 60%)',
            }}
          />

        </div>

        {/* ── Sub-div 3: decorative line + bottom text ── */}
        <div className="flex flex-col items-center w-full" style={{ gap: 'clamp(0.8rem, calc(0.8rem + (100dvh - 700px) * 0.15), 1.2rem)' }}>

          {/* Decorative line */}
          <img
            ref={lineRef}
            src={page3Line}
            alt=""
            style={{
              ...hidden,
              width: 'clamp(20%, calc(20% + (100dvh - 700px) * 0.28), 38%)',
            }}
          />

          {/* Bottom text — "Your presence will make our day…" */}
          <img
            ref={text2Ref}
            src={page3Text2}
            alt=""
            style={{
              ...hidden,
              width: 'clamp(60%, calc(60% + (100dvh - 700px) * 0.08), 84%)',
            }}
          />

        </div>

      </div>
    </div>
  )
}

export default Page3
