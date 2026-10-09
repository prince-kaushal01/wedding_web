import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Mobile assets ─────────────────────────────────────────────────────────────
import page1Bg      from '../assets/page1-bg.jpeg'
import page1Above   from '../assets/page1-abovee.png'
import page1Logo    from '../assets/page1-logo.png'
import page1Design  from '../assets/pae1-design.png'
import page1Counter from '../assets/page1-counter.png'

// ── Desktop assets ────────────────────────────────────────────────────────────
import page1DBg      from '../assets/page1-d-bg.jpg'
import page1DAbove   from '../assets/page1-d-above.webp'
import page1DLogo    from '../assets/page1-d-logo.png'
import page1DTopText  from '../assets/page1-d-toptext.png'
import page1DTopText2 from '../assets/page1-d-toptext2.png'
import page1DCounter  from '../assets/page1-d-counter.png'

// ─── Single flipping digit ────────────────────────────────────────────────────
const FlipDigit = ({ digit }) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const prevVal = useRef(digit)

  useLayoutEffect(() => {
    gsap.set(nextRef.current, { y: '100%' })
    if (prevVal.current === digit) return
    gsap.set(prevRef.current, { y: '0%', opacity: 1 })
    gsap.to(prevRef.current, { y: '-110%', duration: 0.35, ease: 'power2.in' })
    gsap.to(nextRef.current, {
      y: '0%',
      duration: 0.35,
      ease: 'power2.out',
      delay: 0.12,
      onComplete: () => {
        gsap.set(prevRef.current, { y: '0%', opacity: 0 })
        prevVal.current = digit
      },
    })
  }, [digit])

  return (
    <div className="relative overflow-hidden w-3 h-7">
      <div ref={prevRef} className="absolute inset-0 flex items-center justify-center font-medium text-xl text-[#303D53]" style={{ fontFamily: 'Bodoni Moda' }}>
        {prevVal.current}
      </div>
      <div ref={nextRef} className="absolute inset-0 flex items-center justify-center font-medium text-xl text-[#303D53]" style={{ fontFamily: 'Bodoni Moda' }}>
        {digit}
      </div>
    </div>
  )
}

// ─── One time unit ────────────────────────────────────────────────────────────
const CounterUnit = ({ value, pad }) => {
  const digits = String(value).padStart(pad, '0').split('')
  return (
    <div className="flex">
      {digits.map((d, i) => <FlipDigit key={i} digit={d} />)}
    </div>
  )
}

// ─── Time remaining ───────────────────────────────────────────────────────────
const getTimeLeft = () => {
  const wedding = new Date('2027-01-09T00:00:00')
  const diff    = Math.max(wedding - Date.now(), 0)
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  }
}

// ─── Page 1 ───────────────────────────────────────────────────────────────────
const Page1 = () => {
  const [time, setTime] = useState(getTimeLeft)

  // ── Mobile refs ──────────────────────────────────────────────────────────
  const pageRef          = useRef(null)
  const contentRef       = useRef(null)
  const bottomSectionRef = useRef(null)

  // ── Desktop refs ─────────────────────────────────────────────────────────
  const dPageRef          = useRef(null)
  const dContentRef       = useRef(null)
  const dBottomSectionRef = useRef(null)

  // ── Hide before paint — mobile ────────────────────────────────────────────
  useLayoutEffect(() => {
    gsap.set(pageRef.current, { scale: 0.95, opacity: 0 })
  }, [])

  // ── Hide before paint — desktop ───────────────────────────────────────────
  useLayoutEffect(() => {
    gsap.set(dPageRef.current, { scale: 0.95, opacity: 0 })
  }, [])

  // ── Animations — mobile ───────────────────────────────────────────────────
  useEffect(() => {
    const contentEls = Array.from(contentRef.current.children)
    const bottomEls  = Array.from(bottomSectionRef.current.children)
    const allEls     = [...contentEls, ...bottomEls]

    gsap.set(allEls, { y: -30, opacity: 0 })

    // delay: 1.2 waits for App.jsx homepage fade-in to finish before starting
    // total animation time: ~2–2.5 s after the page becomes fully visible
    const entranceTl = gsap.timeline({ delay: 1.2 })  // ← change delay to match App.jsx fade-in duration
    entranceTl
      .to(pageRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
      .to(allEls, { y: 0, opacity: 1, stagger: 0.15, duration: 1.0, ease: 'expo.out' }, '-=0.1')
  }, [])

  // ── Animations — desktop ──────────────────────────────────────────────────
  useEffect(() => {
    const contentEls = Array.from(dContentRef.current.children)
    const bottomEls  = Array.from(dBottomSectionRef.current.children)
    const allEls     = [...contentEls, ...bottomEls]

    gsap.set(allEls, { y: -30, opacity: 0 })

    // delay: 1.2 waits for App.jsx homepage fade-in to finish before starting
    // total animation time: ~2–2.5 s after the page becomes fully visible
    const entranceTl = gsap.timeline({ delay: 1.2 })  // ← change delay to match App.jsx fade-in duration
    entranceTl
      .to(dPageRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
      .to(allEls, { y: 0, opacity: 1, stagger: 0.18, duration: 1.1, ease: 'expo.out' }, '-=0.1')
  }, [])

  // ── Countdown tick ────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* ══════════════════════════════════════════════════
          MOBILE  (hidden on md+)
      ══════════════════════════════════════════════════ */}
      <div ref={pageRef} className="block md:hidden relative w-full min-h-screen">

        <img src={page1Bg}    alt="" className="absolute top-0 fixed inset-0 w-full h-full object-cover z-0 pointer-events-none" />
        <img src={page1Above} alt="" className="fixed h-screen left-0 top-0 w-full z-10 pointer-events-none" />

        <div ref={contentRef} className="relative z-20 flex flex-col items-center text-center px-4 pt-18 pb-48">
          <img src={page1Logo} alt="" className="w-24 -mb-8" />
          <div className="mt-6" style={{ fontFamily: 'Great Vibes' }}>
            <span className="text-[40px]" style={{ color: '#303D53' }}>Suraj</span>
            <span className="text-2xl mx-3" style={{ color: '#AD8548' }}>weds</span>
            <span className="text-[40px]" style={{ color: '#303D53' }}>Libina</span>
          </div>
          <img src={page1Design} alt="" className="mt-1 w-[25vw] max-w-xs" />
          <p className="mt-3 text-xs tracking-[0.20em] font-semibold leading-4" style={{ color: '#303D53', fontFamily: 'Playfair Display' }}>
            WE ARE GETTING MARRIED
          </p>
          <img src={page1Design} alt="" className="mt-2 w-[15vw] max-w-xs" />
          <div className="relative w-[70vw] mt-4">
            <img src={page1Counter} alt="" className="w-full object-contain" />
            <div className="absolute inset-0 flex items-center justify-around px-[3%] mb-8">
              <CounterUnit value={time.days}    pad={3} />
              <CounterUnit value={time.hours}   pad={2} />
              <CounterUnit value={time.minutes} pad={2} />
              <CounterUnit value={time.seconds} pad={2} />
            </div>
          </div>
        </div>

        <div ref={bottomSectionRef} className="absolute bottom-[1%] left-0 w-full z-20 flex flex-col items-center text-center px-4 pb-2">
          <img src={page1Design} alt="" className="w-[25vw] max-w-xs" />
          <p className="mt-1 text-[8px] font-semibold tracking-[0.10em]" style={{ color: '#303D53' }}>
            Thank you for being a part of our special day
          </p>
          <img src={page1Design} alt="" className="mt-1 w-[20vw] max-w-xs" />
        </div>

      </div>

      {/* ══════════════════════════════════════════════════
          DESKTOP  (hidden below md)
      ══════════════════════════════════════════════════ */}
      <div ref={dPageRef} className="hidden md:block relative w-full min-h-screen">

        <img src={page1DBg}    alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
        <img src={page1DAbove} alt="" className="fixed inset-0 w-full h-screen object-fill z-10 pointer-events-none" />

        <div ref={dContentRef} className="relative z-20 flex flex-col items-center text-center px-4 pt-6">
          <img src={page1DLogo}     alt="" className="w-28" />
          <img src={page1DTopText}  alt="" className="mt-4 w-[22vw] max-w-lg" />
          <img src={page1DTopText2} alt="" className="mt-3 w-[18vw] max-w-md" />
          <div className="relative w-[24vw] mt-4">
            <img src={page1DCounter} alt="" className="w-full object-contain" />
            <div className="absolute inset-0 flex items-center justify-around px-[3%] mb-8">
              <CounterUnit value={time.days}    pad={3} />
              <CounterUnit value={time.hours}   pad={2} />
              <CounterUnit value={time.minutes} pad={2} />
              <CounterUnit value={time.seconds} pad={2} />
            </div>
          </div>
        </div>

        <div ref={dBottomSectionRef} className="absolute bottom-0 left-0 w-full z-20 flex flex-col items-center text-center px-4 pb-2">
          <img src={page1Design} alt="" className="w-[9vw] max-w-xs" />
          <p className="mt-1 text-[12px] font-semibold tracking-[0.10em]" style={{ color: '#303D53', fontFamily: 'Playfair Display' }}>
            Thank you for being a part of our special day
          </p>
          <img src={page1Design} alt="" className="mt-1 w-[6vw] max-w-xs" />
        </div>

      </div>
    </>
  )
}

export default Page1
