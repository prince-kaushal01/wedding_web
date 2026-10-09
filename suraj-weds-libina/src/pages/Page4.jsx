import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Mobile assets ─────────────────────────────────────────────────────────────
import page4Bg          from '../assets/page4-bg.jpg'
import page4Topleft     from '../assets/page4-topleft.png'
import page4Bottomright from '../assets/page4-bottomright.png'
import page4Toptext     from '../assets/page4-toptext.png'
import page4Center      from '../assets/page4-center.png'
import page4Centerabove from '../assets/page4-centerabove.png'

// ── Desktop assets ────────────────────────────────────────────────────────────
import page4DBg          from '../assets/page4-d-bg.jpg'
import page4DTopleft     from '../assets/page4-d-topleft.png'
import page4DBottomright from '../assets/page4-d-bottomright.png'
import page4DToptext     from '../assets/page4-d-toptext.png'
import page4DCenter      from '../assets/page4-d-center.png'
import page4DCenterabove from '../assets/page4-d-centerabove.png'

// ─── Page 4 ───────────────────────────────────────────────────────────────────
const Page4 = () => {

  // ── Mobile refs ──────────────────────────────────────────────────────────
  const sectionRef     = useRef(null)
  const topleftRef     = useRef(null)
  const bottomrightRef = useRef(null)
  const toptextRef     = useRef(null)
  const centerGroupRef = useRef(null)
  const centeraboveRef = useRef(null)

  // ── Desktop refs ─────────────────────────────────────────────────────────
  const dSectionRef     = useRef(null)
  const dTopleftRef     = useRef(null)
  const dBottomrightRef = useRef(null)
  const dToptextRef     = useRef(null)
  const dCenterGroupRef = useRef(null)
  const dCenteraboveRef = useRef(null)

  // ── Animation — mobile ────────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(topleftRef.current,     { x: '-120%', opacity: 0 })
    gsap.set(bottomrightRef.current, { x: '120%',  opacity: 0 })
    gsap.set(toptextRef.current,     { y: -40,     opacity: 0 })
    gsap.set(centerGroupRef.current, { y: 40,      opacity: 0 })
    gsap.set(centeraboveRef.current, { y: -30,     opacity: 0 })

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
      .to(centerGroupRef.current, { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out' }, 0.3 )
      .to(centeraboveRef.current, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }, 0.45)
  }, [])

  // ── Animation — desktop ───────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(dTopleftRef.current,     { x: '-120%', opacity: 0 })
    gsap.set(dBottomrightRef.current, { x: '120%',  opacity: 0 })
    gsap.set(dToptextRef.current,     { y: -40,     opacity: 0 })
    gsap.set(dCenterGroupRef.current, { y: 40,      opacity: 0 })
    gsap.set(dCenteraboveRef.current, { y: -30,     opacity: 0 })

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
      .to(dCenterGroupRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out' }, 0.3 )
      .to(dCenteraboveRef.current, { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out' }, 0.45)
  }, [])

  return (
    <>
      {/* ══════════════════════════════════════════════════
          MOBILE  (hidden on md+)
      ══════════════════════════════════════════════════ */}
      <section ref={sectionRef} className="block md:hidden relative w-full h-screen overflow-hidden">

        <img src={page4Bg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

        <img ref={topleftRef}     src={page4Topleft}     alt="" className="absolute left-0 top-0 z-10 pointer-events-none w-38" />
        <img ref={bottomrightRef} src={page4Bottomright} alt="" className="absolute right-0 bottom-0 z-50 pointer-events-none w-76" />

        <div className="relative z-20 flex flex-col items-center text-center px-8 pt-[10vh]">

          <img ref={toptextRef} src={page4Toptext} alt="" className="w-46 mb-4" />

          <div ref={centerGroupRef} className="relative w-68 z-10 top-16">
            <img src={page4Center} alt="" className="w-full z-10 relative" />
            <img ref={centeraboveRef} src={page4Centerabove} alt="" className="absolute top-5 -left-4 inset-0 w-80 h-78 object-contain z-20 pointer-events-none" />

            <div className="absolute z-30 left-[42%] top-[30%] text-left w-full">
              <p className="-ml-4 text-[13px] font-light tracking-widest uppercase leading-5" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
                Church Blessing
              </p>
              <p className="-ml-4 text-[12px] tracking-wider leading-4 mb-2" style={{ fontFamily: 'Sans serif', color: '#AA8E6D' }}>
                4:00 PM IST
              </p>
              <p className="text-[8px] tracking-wide leading-4 ml-1" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
                St. Mary's Metropolitan Cathedral,<br /> Changanassery
              </p>
            </div>

            <div className="absolute z-30 left-[42%] top-[60%] text-left w-full">
              <p className="-ml-4 text-[13px] font-light tracking-widest uppercase leading-5" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
                Reception
              </p>
              <p className="-ml-4 text-[12px] tracking-wider leading-4 mb-2" style={{ fontFamily: 'Sans serif', color: '#AA8E6D' }}>
                6:00 PM IST
              </p>
              <p className="text-[8px] tracking-wide leading-4 ml-1" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
                Contour Backwaters & Resort,<br /> Changanassery
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DESKTOP  (hidden below md)
      ══════════════════════════════════════════════════ */}
      <section ref={dSectionRef} className="hidden md:block relative w-full h-screen overflow-hidden">

        <img src={page4DBg} alt="" className="absolute inset-0 w-full h-screen object-center z-0 pointer-events-none" />

        {/* Topleft — slides in from left, pinned to very top */}
        <img ref={dTopleftRef} src={page4DTopleft} alt="" className="absolute left-0 top-0 z-10 pointer-events-none w-7xl" />

        {/* All animated content */}
        <div className="relative flex flex-col items-center text-center px-8 pt-[6vh]">

          {/* Top text */}
          <img ref={dToptextRef} src={page4DToptext} alt="" className="w-64 mb-6" />

          {/* Center section — center image with above overlay and text blocks */}
          <div ref={dCenterGroupRef} className="relative w-[28vw] mt-8 z-0">

            {/* Base center image */}
            <img src={page4DCenter} alt="" className="w-full z-10 relative" />

            {/* Centerabove — sits on top of center image */}
            <img
              ref={dCenteraboveRef}
              src={page4DCenterabove}
              alt=""
              className="absolute top-1 left-[17%] inset-0 w-60 h-full object-contain z-20 pointer-events-none"
            />

            {/* Church Blessing text */}
            <div className="absolute z-30 left-[43%] top-[37%] text-left w-full">
              <p className="-ml-4 text-[17px] font-light tracking-widest uppercase leading-5 mb-2" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
                Church Blessing
              </p>
              <p className="-ml-3 text-[16px] tracking-wider leading-4 mb-2" style={{ fontFamily: 'Bodoni Moda', color: '#AA8E6D' }}>
                4:00 PM IST
              </p>
              <p className="text-[10px] font-medium tracking-wide leading-4 ml-1" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
                St. Mary's Metropolitan Cathedral,<br /> Changanassery
              </p>
            </div>

            {/* Reception text */}
            <div className="absolute z-30 left-[43%] top-[67%] text-left w-full">
              <p className="-ml-4 text-[18px] font-light tracking-widest uppercase leading-5 mb-2" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
                Reception
              </p>
              <p className="-ml-3 text-[16px] tracking-wider leading-4 mb-1" style={{ fontFamily: 'Bodoni Moda', color: '#AA8E6D' }}>
                6:00 PM IST
              </p>
              <p className="text-[10px] font-medium tracking-wide leading-4 ml-1" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
                Contour Backwaters & Resort,<br /> Changanassery
              </p>
            </div>

          </div>
        </div>

        {/* Bottomright — placed AFTER content in DOM so it always paints on top */}
        <img ref={dBottomrightRef} src={page4DBottomright} alt="" className="absolute right-0 bottom-0 z-50 pointer-events-none w-[45vw]" />
      </section>
    </>
  )
}

export default Page4
