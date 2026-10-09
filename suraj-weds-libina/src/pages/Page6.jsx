import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Mobile assets ─────────────────────────────────────────────────────────────
import page6Bg          from '../assets/page6-bg.jpg'
import page6Bottom      from '../assets/page6-bottom.png'
import page6Bottomright from '../assets/page6-bottomright.png'
import page6Center      from '../assets/page6-center.png'
import page6Centerabove from '../assets/page6-centerabove.png'
import page6Toptext     from '../assets/page6-toptext.png'

// ── Desktop assets ────────────────────────────────────────────────────────────
import page6DBg          from '../assets/page6-d-bg.jpg'
import page6DTopleft     from '../assets/page6-d-topleft.png'
import page6DBottomright from '../assets/page6-d-bottomright.webp'
import page6DCenter      from '../assets/page6-d-center.png'
import page6DCenterabove from '../assets/page6-d-centerabove.png'
import page6DToptext     from '../assets/page6-d-toptext.png'

// ─── Page 6 ───────────────────────────────────────────────────────────────────
const Page6 = () => {

  // ── Mobile refs ──────────────────────────────────────────────────────────
  const sectionRef     = useRef(null)
  const bottomRef      = useRef(null)
  const bottomrightRef = useRef(null)
  const toptextRef     = useRef(null)
  const centerRef      = useRef(null)
  const centeraboveRef = useRef(null)
  const dateRef        = useRef(null)
  const timeRef        = useRef(null)
  const venueRef       = useRef(null)

  // ── Desktop refs ─────────────────────────────────────────────────────────
  const dSectionRef     = useRef(null)
  const dTopleftRef     = useRef(null)
  const dBottomrightRef = useRef(null)
  const dToptextRef     = useRef(null)
  const dCenterRef      = useRef(null)
  const dCenteraboveRef = useRef(null)
  const dDateRef        = useRef(null)
  const dTimeRef        = useRef(null)
  const dVenueRef       = useRef(null)

  // ── Animation — mobile ────────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(bottomRef.current,      { y: '100%',  opacity: 0 })
    gsap.set(bottomrightRef.current, { x: '120%',  opacity: 0 })
    gsap.set(toptextRef.current,     { y: -40,     opacity: 0 })
    gsap.set(centerRef.current,      { scale: 0.9, opacity: 0 })
    gsap.set(centeraboveRef.current, { y: -30,     opacity: 0 })
    gsap.set(dateRef.current,        { y: -30,     opacity: 0 })
    gsap.set(timeRef.current,        { y: -30,     opacity: 0 })
    gsap.set(venueRef.current,       { y: 30,      opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%',    // ← animation fires when section top hits 30% from viewport top
        end:   'bottom 20%',
        toggleActions: 'play reverse play reverse', // replays on scroll-back
      }
    })

    tl.to(bottomRef.current,      { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out'           }, 0   )
      .to(bottomrightRef.current, { x: 0, opacity: 1, duration: 1.4, ease: 'expo.out'           }, 0   )
      .to(toptextRef.current,     { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'           }, 0.15)
      .to(centerRef.current,      { scale: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.2)' }, 0.3 )
      .to(centeraboveRef.current, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out'           }, 0.45)
      .to(dateRef.current,        { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out'           }, 0.5 )
      .to(timeRef.current,        { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out'           }, 0.6 )
      .to(venueRef.current,       { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out'           }, 0.7 )
  }, [])

  // ── Animation — desktop ───────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(dTopleftRef.current,     { x: '-120%', opacity: 0 })
    gsap.set(dBottomrightRef.current, { x: '120%',  opacity: 0 })
    gsap.set(dToptextRef.current,     { y: -40,     opacity: 0 })
    gsap.set(dCenterRef.current,      { scale: 0.9, opacity: 0 })
    gsap.set(dCenteraboveRef.current, { y: -30,     opacity: 0 })
    gsap.set(dDateRef.current,        { y: -30,     opacity: 0 })
    gsap.set(dTimeRef.current,        { y: -30,     opacity: 0 })
    gsap.set(dVenueRef.current,       { y: 30,      opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: dSectionRef.current,
        start: 'top 30%',    // ← animation fires when section top hits 30% from viewport top
        end:   'bottom 20%',
        toggleActions: 'play reverse play reverse', // replays on scroll-back
      }
    })

    tl.to(dTopleftRef.current,     { x: 0, opacity: 1, duration: 1.5, ease: 'expo.out'           }, 0   )
      .to(dBottomrightRef.current, { x: 0, opacity: 1, duration: 1.5, ease: 'expo.out'           }, 0   )
      .to(dToptextRef.current,     { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out'           }, 0.15)
      .to(dCenterRef.current,      { scale: 1, opacity: 1, duration: 1.4, ease: 'back.out(1.2)' }, 0.3 )
      .to(dCenteraboveRef.current, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'           }, 0.45)
      .to(dDateRef.current,        { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out'           }, 0.5 )
      .to(dTimeRef.current,        { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out'           }, 0.6 )
      .to(dVenueRef.current,       { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out'           }, 0.7 )
  }, [])

  return (
    <>
      {/* ══════════════════════════════════════════════════
          MOBILE  (hidden on md+)
      ══════════════════════════════════════════════════ */}
      <section ref={sectionRef} className="block md:hidden relative w-full h-screen overflow-hidden">

        <img src={page6Bg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
        <img ref={bottomRef} src={page6Bottom} alt="" className="absolute bottom-0 left-0 w-full z-10 pointer-events-none" />

        <img ref={bottomrightRef} src={page6Bottomright} alt="" className="absolute right-0 bottom-0 z-50 pointer-events-none w-auto" />

        <img ref={toptextRef} src={page6Toptext} alt="" className="absolute top-[26%] left-[20%] z-20 pointer-events-none w-56" />

        <div ref={centerRef} className="relative top-[42%] z-30 w-full flex items-center justify-center">
          <img src={page6Center} alt="" className="w-72 pointer-events-none relative z-10" />
          <img ref={centeraboveRef} src={page6Centerabove} alt="" className="absolute inset-0 w-28 left-[36%] top-[14%] pointer-events-none z-20" />
          <p ref={dateRef}  className="absolute top-[6%] left-[35%] z-30 text-[14px] font-medium tracking-widest" style={{ fontFamily: 'Sans Serif', color: '#303D53' }}>9th January 2027</p>
          <p ref={timeRef}  className="absolute top-[67%] left-[42%] z-30 text-[15px] tracking-widest" style={{ fontFamily: 'Sans Serif', color: '#303D53' }}>7:30 PM</p>
          <p ref={venueRef} className="absolute bottom-[14%] left-[29%] z-30 text-[11px] tracking-wide leading-4" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>Backwaters Ripples, Kumarakom</p>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════
          DESKTOP  (hidden below md)
      ══════════════════════════════════════════════════ */}
      <section ref={dSectionRef} className="hidden md:block relative w-full h-screen overflow-hidden">

        {/* Background — fully fits screen */}
        <img src={page6DBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

        {/* page6-d-toptext — very top center */}
        <img ref={dToptextRef} src={page6DToptext} alt="" className="absolute top-[5%] left-[40vw] z-20 pointer-events-none w-72" />

        {/* page6-d-topleft — slides in from left */}
        <img ref={dTopleftRef} src={page6DTopleft} alt="" className="absolute left-0 top-0 z-10 pointer-events-none w-[50vw]" />

        {/* page6-d-center — static, center of page, no animation */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="relative">

            <img ref={dCenterRef} src={page6DCenter} alt="" className="w-[26vw] mt-28 pointer-events-none relative z-10" />

            {/* page6-d-centerabove — slides down from above */}
            <img
              ref={dCenteraboveRef}
              src={page6DCenterabove}
              alt=""
              className="absolute inset-0 w-[10vw] left-[29%] top-[32%] pointer-events-none z-20"
            />

            {/* Date */}
            <p
              ref={dDateRef}
              className="absolute top-[26%] left-[28%] z-30 text-[20px] font-medium tracking-widest"
              style={{ fontFamily: 'Bodoni Moda', color: '#303D53' }}
            >
              9th January 2027
            </p>

            {/* Time */}
            <p
              ref={dTimeRef}
              className="absolute top-[73.5%] left-[39%] z-30 text-[18px] font-semibold tracking-widest"
              style={{ fontFamily: 'Bodoni Moda', color: '#303D53' }}
            >
              7:30 PM
            </p>

            {/* Venue */}
            <p
              ref={dVenueRef}
              className="absolute bottom-[13%] left-[18%] z-30 text-[17px] tracking-wide leading-4"
              style={{ fontFamily: 'Playfair Display', color: '#303D53' }}
            >
              Backwaters Ripples, Kumarakom
            </p>

          </div>
        </div>

        {/* page6-d-bottomright — slides in from right, last in DOM to paint on top */}
        <img ref={dBottomrightRef} src={page6DBottomright} alt="" className="absolute -right-4 bottom-0 z-[999] pointer-events-none h-full w-auto" />

      </section>
    </>
  )
}

export default Page6
