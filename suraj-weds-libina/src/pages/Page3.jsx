import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Mobile assets ─────────────────────────────────────────────────────────────
import page3Bg           from '../assets/page3-bg.jpeg'
import page3Topleft      from '../assets/page3-topleft.png'
import page3Bottomright  from '../assets/page3-bottomright.png'
import page3Toptext      from '../assets/page3-toptext.png'
import page3Center       from '../assets/page3-center.png'
import page3Text         from '../assets/page3-text.png'
import page3Letter       from '../assets/page3-letter.png'
import page3Letterdesign from '../assets/page3-letterdesign.png'

// ── Desktop assets ────────────────────────────────────────────────────────────
import page3DBg           from '../assets/page3-d-bg.jpeg'
import page3DTopleft      from '../assets/page3-d-topleft.png'
import page3DBottomright  from '../assets/page3-d-bottomright.png'
import page3DToptext      from '../assets/page3-d-toptext.png'
import page3DCenter       from '../assets/page3-d-center.png'
import page3DText         from '../assets/page3-d-text.png'
import page3DLetter       from '../assets/page3-d-letter.png'
import page3DLetterdesign from '../assets/page3-d-letterdesign.png'

// ─── Carousel ─────────────────────────────────────────────────────────────────
// slideImg     — the image repeated 5 times as slides
// textOverlay  — image shown at bottom of each slide
// slideWidth   — tailwind width class e.g. "w-64" or "w-80"
// btnSpacing   — tailwind gap class e.g. "gap-2" or "gap-12"
const Carousel = ({ slideImg, textOverlay, slideWidth = 'w-64', btnSpacing = 'gap-2', textWidth = 'w-36' }) => {
  const SLIDES = [slideImg, slideImg, slideImg, slideImg, slideImg]
  const [current, setCurrent] = useState(0)
  const slideRef = useRef(null)

  const goTo = (next) => {
    gsap.to(slideRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(next)
        gsap.to(slideRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      },
    })
  }

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length)
  const next = () => goTo((current + 1) % SLIDES.length)

  return (
    <div className="flex flex-col items-center mt-6">

      <div className={`flex items-center ${btnSpacing}`}>

        {/* Left arrow */}
        <button
          onClick={prev}
          className="w-10 h-10 pb-3 rounded-full bg-[#DBCEBD] flex items-center justify-center text-4xl font-light text-center hover:bg-white/80 transition-colors flex-shrink-0"
          style={{ color: '#303D53' }}
        >
          ‹
        </button>

        {/* Slide image with text overlay */}
        <div className={`relative overflow-hidden ${slideWidth}`}>
          <img ref={slideRef} src={SLIDES[current]} alt="" className={`${slideWidth} block`} />
          <img src={textOverlay} alt="" className={`absolute bottom-[4%] left-[55%] -translate-x-1/2 ${textWidth} pointer-events-none`} />
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="w-10 h-10 pb-3 rounded-full bg-[#DBCEBD] flex items-center justify-center text-4xl font-light text-center hover:bg-white/80 transition-colors flex-shrink-0"
          style={{ color: '#303D53' }}
        >
          ›
        </button>

      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="w-1.5 h-1.5 rounded-full transition-colors"
            style={{ backgroundColor: i === current ? '#303D53' : '#303D5355' }}
          />
        ))}
      </div>

    </div>
  )
}

// ─── Page 3 ───────────────────────────────────────────────────────────────────
const Page3 = () => {

  // ── Mobile refs ──────────────────────────────────────────────────────────
  const sectionRef     = useRef(null)
  const topleftRef     = useRef(null)
  const bottomrightRef = useRef(null)
  const toptextRef     = useRef(null)
  const carouselRef    = useRef(null)
  const letterRef      = useRef(null)

  // ── Desktop refs ─────────────────────────────────────────────────────────
  const dSectionRef     = useRef(null)
  const dTopleftRef     = useRef(null)
  const dBottomrightRef = useRef(null)
  const dToptextRef     = useRef(null)
  const dCarouselRef    = useRef(null)
  const dLetterRef      = useRef(null)

  // ── Animation — mobile ────────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(topleftRef.current,     { x: '-120%', opacity: 0 })
    gsap.set(bottomrightRef.current, { x: '120%',  opacity: 0 })
    gsap.set(toptextRef.current,     { y: -40,     opacity: 0 })
    gsap.set(carouselRef.current,    { y: 40,      opacity: 0 })
    gsap.set(letterRef.current,      { y: 40,      opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%',    // ← animation fires when section top hits 30% from viewport top
        end:   'bottom 20%',
        toggleActions: 'play reverse play reverse', // replays on scroll-back
      }
    })

    tl.to(topleftRef.current,     { x: 0, opacity: 1, duration: 1.4, ease: 'expo.out' }, 0   )
      .to(bottomrightRef.current, { x: 0, opacity: 1, duration: 1.4, ease: 'expo.out' }, 0   )
      .to(toptextRef.current,     { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }, 0.15)
      .to(carouselRef.current,    { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out' }, 0.3 )
      .to(letterRef.current,      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }, 0.45)
  }, [])

  // ── Animation — desktop ───────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(dTopleftRef.current,     { x: '-120%', opacity: 0 })
    gsap.set(dBottomrightRef.current, { x: '120%',  opacity: 0 })
    gsap.set(dToptextRef.current,     { y: -40,     opacity: 0 })
    gsap.set(dCarouselRef.current,    { y: 40,      opacity: 0 })
    gsap.set(dLetterRef.current,      { y: 40,      opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: dSectionRef.current,
        start: 'top 30%',    // ← animation fires when section top hits 30% from viewport top
        end:   'bottom 20%',
        toggleActions: 'play reverse play reverse', // replays on scroll-back
      }
    })

    tl.to(dTopleftRef.current,     { x: 0, opacity: 1, duration: 1.5, ease: 'expo.out' }, 0   )
      .to(dBottomrightRef.current, { x: 0, opacity: 1, duration: 1.5, ease: 'expo.out' }, 0   )
      .to(dToptextRef.current,     { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out' }, 0.15)
      .to(dCarouselRef.current,    { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out' }, 0.3 )
      .to(dLetterRef.current,      { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out' }, 0.45)
  }, [])

  return (
    <>
      {/* ══════════════════════════════════════════════════
          MOBILE  (hidden on md+)
      ══════════════════════════════════════════════════ */}
      <section ref={sectionRef} className="block md:hidden relative w-full h-screen overflow-hidden">

        <img src={page3Bg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

        <img ref={topleftRef}     src={page3Topleft}     alt="" className="absolute -left-2 top-0 w-42 z-10 pointer-events-none" />
        <img ref={bottomrightRef} src={page3Bottomright} alt="" className="absolute right-0 bottom-0 z-30 pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center text-center px-8 pt-[10vh] pb-16">

          <img ref={toptextRef} src={page3Toptext} alt="" className="w-48 max-w-xs" />

          <div ref={carouselRef}>
            <Carousel slideImg={page3Center} textOverlay={page3Text} slideWidth="w-76 mt-5" btnSpacing="gap-1" />
          </div>

          <div ref={letterRef} className="relative mt-10 w-full max-w-xs overflow-hidden flex items-center justify-center z-10">
            <img src={page3Letter}       alt="" className="w-48" />
            <img src={page3Letterdesign} alt="" className="absolute left-[40%] w-20 h-20 object-contain pointer-events-none" />
            <p className="absolute mt-6 text-[15px] top-[13%]" style={{ fontFamily: 'Great Vibes', color: '#303D53' }}>
              Some moments. Some peoples.
            </p>
            <p className="absolute mt-6 top-[33%] text-[9px] tracking-widest uppercase" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
              One beautiful story
            </p>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DESKTOP  (hidden below md)
      ══════════════════════════════════════════════════ */}
      <section ref={dSectionRef} className="hidden md:flex relative w-full h-screen overflow-hidden">

        <img src={page3DBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

        {/* Topleft — slides in from left */}
        <img ref={dTopleftRef} src={page3DTopleft} alt="" className="absolute -left-7 top-0 h-full z-10 pointer-events-none" />

        {/* Bottomright — slides in from right */}
        <img ref={dBottomrightRef} src={page3DBottomright} alt="" className="absolute right-0 bottom-0 h-full z-10 pointer-events-none" />

        {/* Toptext — pinned to very top center */}
        <img ref={dToptextRef} src={page3DToptext} alt="" className="absolute top-12 left-1/2 -translate-x-1/2 z-20 w-56 pointer-events-none" />

        {/* Main content — centered */}
        <div className="relative z-20 flex flex-col items-center justify-center gap-14 w-full px-40 mt-10">

          {/* Carousel */}
          <div ref={dCarouselRef} className="flex flex-col items-center mt-20">
            <Carousel slideImg={page3DCenter} textOverlay={page3DText} slideWidth="w-72" btnSpacing="gap-60" textWidth="w-56" />
          </div>

          {/* Letter */}
          <div ref={dLetterRef} className="relative overflow-hidden flex items-center justify-center">
            <img src={page3DLetter}       alt="" className="w-56" />
            <img src={page3DLetterdesign} alt="" className="absolute left-[30%] w-20 h-20 object-contain pointer-events-none" />
            <p className="absolute mt-6 text-[18px] top-[13%]" style={{ fontFamily: 'Great Vibes', color: '#303D53' }}>
              Some moments. Some people.
            </p>
            <p className="absolute mt-7 top-[32%] text-[10px] tracking-widest uppercase" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
              One beautiful story
            </p>
          </div>

        </div>
      </section>
    </>
  )
}

export default Page3
