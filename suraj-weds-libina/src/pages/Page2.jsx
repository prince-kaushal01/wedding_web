import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Mobile assets ─────────────────────────────────────────────────────────────
import page2Bg         from '../assets/page2-bg.jpg'
import page2Above      from '../assets/page2-above.png'
import page2Toptext    from '../assets/page2-toptext.png'
import page2Logo       from '../assets/page2-logo.png'
import page2Bottomtext from '../assets/page2-bottomtext.png'
import page2Lefttext   from '../assets/page2-lefttext.png'
import page2Righttext  from '../assets/page2-righttext.png'

// ── Desktop assets ────────────────────────────────────────────────────────────
import page2DBg         from '../assets/page2-d-bg.jpg'
import page2DAbove      from '../assets/page2-d-above.webp'
import page2DToptext    from '../assets/page2-d-toptext.png'
import page2DLogo       from '../assets/page2-d-logo.png'
import page2DBottomtext from '../assets/page2-d-bottomtext.png'
import page2DLefttext   from '../assets/page2-d-lefttext.png'
import page2DRighttext  from '../assets/page2-d-righttext.png'

const Page2 = () => {

  // ── Mobile refs ──────────────────────────────────────────────────────────
  const sectionRef    = useRef(null)
  const aboveRef      = useRef(null)
  const toptextRef    = useRef(null)
  const lefttextRef   = useRef(null)
  const logoRef       = useRef(null)
  const righttextRef  = useRef(null)
  const bottomtextRef = useRef(null)

  // ── Desktop refs ─────────────────────────────────────────────────────────
  const dSectionRef    = useRef(null)
  const dAboveRef      = useRef(null)
  const dToptextRef    = useRef(null)
  const dLefttextRef   = useRef(null)
  const dLogoRef       = useRef(null)
  const dRighttextRef  = useRef(null)
  const dBottomtextRef = useRef(null)

  // ── Animation — mobile ────────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(aboveRef.current,      { y: -60,     opacity: 0 })
    gsap.set(toptextRef.current,    { y: -40,     opacity: 0 })
    gsap.set(lefttextRef.current,   { y: -60,     opacity: 0 })
    gsap.set(logoRef.current,       { scale: 0.8, opacity: 0 })
    gsap.set(righttextRef.current,  { y: -60,     opacity: 0 })
    gsap.set(bottomtextRef.current, { y: 40,      opacity: 0 })

    // Single timeline with one scrollTrigger — avoids delay+toggleActions conflict
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%',    // ← animation fires when section top hits 30% from viewport top
        end:   'bottom 20%',
        toggleActions: 'play reverse play reverse', // replays on scroll-back
      }
    })

    // Numbers are absolute start positions (seconds) inside the timeline
    tl.to(aboveRef.current,      { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out'        }, 0   )
      .to(toptextRef.current,    { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'        }, 0.1 )
      .to(lefttextRef.current,   { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out'        }, 0.2 )
      .to(righttextRef.current,  { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out'        }, 0.2 )
      .to(logoRef.current,       { scale: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.4)' }, 0.3 )
      .to(bottomtextRef.current, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'        }, 0.4 )
  }, [])

  // ── Animation — desktop ───────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(dAboveRef.current,      { y: -60,     opacity: 0 })
    gsap.set(dToptextRef.current,    { y: -40,     opacity: 0 })
    gsap.set(dLefttextRef.current,   { y: -60,     opacity: 0 })
    gsap.set(dLogoRef.current,       { scale: 0.8, opacity: 0 })
    gsap.set(dRighttextRef.current,  { y: -60,     opacity: 0 })
    gsap.set(dBottomtextRef.current, { y: 40,      opacity: 0 })

    // Single timeline with one scrollTrigger — avoids delay+toggleActions conflict
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: dSectionRef.current,
        start: 'top 30%',    // ← animation fires when section top hits 30% from viewport top
        end:   'bottom 20%',
        toggleActions: 'play reverse play reverse', // replays on scroll-back
      }
    })

    // Numbers are absolute start positions (seconds) inside the timeline
    tl.to(dAboveRef.current,      { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out'           }, 0   )
      .to(dToptextRef.current,    { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out'           }, 0.15)
      .to(dLefttextRef.current,   { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out'           }, 0.25)
      .to(dRighttextRef.current,  { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out'           }, 0.25)
      .to(dLogoRef.current,       { scale: 1, opacity: 1, duration: 1.4, ease: 'back.out(1.4)' }, 0.35)
      .to(dBottomtextRef.current, { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out'           }, 0.5 )
  }, [])

  return (
    <>
      {/* ══════════════════════════════════════════════════
          MOBILE  (hidden on md+)
      ══════════════════════════════════════════════════ */}
      <section ref={sectionRef} className="block md:hidden relative w-full min-h-screen overflow-hidden">

        <img src={page2Bg}    alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
        <img ref={aboveRef} src={page2Above} alt="" className="absolute top-0 left-0 h-screen w-full z-10 pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pb-36 min-h-screen">
          <img ref={toptextRef}    src={page2Toptext}    alt="" className="w-32 max-w-sm mt-[8%]" />
          <div className="flex items-center justify-center gap-6 mt-6 w-[84px]">
            <img ref={lefttextRef}  src={page2Lefttext}  alt="" />
            <img ref={logoRef}      src={page2Logo}       alt="" />
            <img ref={righttextRef} src={page2Righttext}  alt="" />
          </div>
          <img ref={bottomtextRef} src={page2Bottomtext} alt="" className="mt-4 w-28 max-w-sm" />
        </div>

      </section>

      {/* ══════════════════════════════════════════════════
          DESKTOP  (hidden below md)
      ══════════════════════════════════════════════════ */}
      <section ref={dSectionRef} className="hidden md:block relative w-full min-h-screen overflow-hidden">

        <img src={page2DBg}    alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
        <img ref={dAboveRef} src={page2DAbove} alt="" className="absolute inset-0 w-full h-full object-center ml-[1px] z-10 pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pb-36 min-h-screen">

          {/* Top text */}
          <img ref={dToptextRef} src={page2DToptext} alt="" className="w-40 max-w-lg" />

          {/* Center row: left text — logo — right text */}
          <div className="flex items-center justify-center gap-10 mt-6">
            <div className="relative">
              <span className="absolute left-[18px] top-[74.6%] text-[7px] font-semibold tracking-widest" style={{ color: '#303D53', fontFamily: 'Playfair Display' }}>Dr.</span>
              <img ref={dLefttextRef} src={page2DLefttext} alt="" className="w-auto max-h-44" />
            </div>
            <img ref={dLogoRef}      src={page2DLogo}       alt="" className="w-auto max-h-52" />
            <img ref={dRighttextRef} src={page2DRighttext}  alt="" className="w-auto max-h-44" />
          </div>

          {/* Bottom text */}
          <img ref={dBottomtextRef} src={page2DBottomtext} alt="" className="mt-12 w-28 max-w-lg" />

        </div>

      </section>
    </>
  )
}

export default Page2
