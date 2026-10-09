import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Mobile assets ─────────────────────────────────────────────────────────────
import page5Bg         from '../assets/page5-bg.jpg'
import page5Top        from '../assets/page5-top.png'
import page5Bottom     from '../assets/page5-bottom.png'
import page5Toptext    from '../assets/page5-toptext.png'
import page5Center     from '../assets/page5-center.png'
import page5Bottomtext from '../assets/page5-bottomtext.png'

// ── Desktop assets ────────────────────────────────────────────────────────────
import page5DBg          from '../assets/page5-d-bg.jpg'
import page5DTop         from '../assets/page5-d-top.webp'
import page5DBottom      from '../assets/page5-d-bottom.webp'
import page5DBottomAbove from '../assets/page5-d-bottomabove.png'
import page5DToptext     from '../assets/page5-d-toptext.png'
import page5DCenter      from '../assets/page5-d-center.png'
import page5DBottomtext  from '../assets/page5-d-bottomtext.png'

// ─── Page 5 ───────────────────────────────────────────────────────────────────
const Page5 = () => {

  // ── Mobile refs ──────────────────────────────────────────────────────────
  const sectionRef    = useRef(null)
  const topRef        = useRef(null)
  const bottomRef     = useRef(null)
  const toptextRef    = useRef(null)
  const centerRef     = useRef(null)
  const bottomtextRef = useRef(null)

  // ── Desktop refs ─────────────────────────────────────────────────────────
  const dSectionRef     = useRef(null)
  const dTopRef         = useRef(null)
  const dBottomRef      = useRef(null)
  const dBottomAboveRef = useRef(null)
  const dToptextRef     = useRef(null)
  const dCenterRef      = useRef(null)
  const dBottomtextRef  = useRef(null)

  // ── Animation — mobile ────────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(topRef.current,        { y: '-100%', opacity: 0 })
    gsap.set(bottomRef.current,     { y: '100%',  opacity: 0 })
    gsap.set(toptextRef.current,    { y: -40,     opacity: 0 })
    gsap.set(centerRef.current,     { scale: 0.8, opacity: 0 })
    gsap.set(bottomtextRef.current, { y: 40,      opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%',    // ← animation fires when section top hits 30% from viewport top
        end:   'bottom 20%',
        toggleActions: 'play reverse play reverse', // replays on scroll-back
      }
    })

    tl.to(topRef.current,        { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out'           }, 0   )
      .to(bottomRef.current,     { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out'           }, 0   )
      .to(toptextRef.current,    { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'           }, 0.15)
      .to(centerRef.current,     { scale: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.2)' }, 0.3 )
      .to(bottomtextRef.current, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'           }, 0.45)
  }, [])

  // ── Animation — desktop ───────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(dTopRef.current,         { y: '-100%', opacity: 0 })
    gsap.set(dBottomRef.current,      { y: '100%',  opacity: 0 })
    gsap.set(dBottomAboveRef.current, { y: '100%',  opacity: 0 })
    gsap.set(dToptextRef.current,     { y: -40,     opacity: 0 })
    gsap.set(dCenterRef.current,      { scale: 0.8, opacity: 0 })
    gsap.set(dBottomtextRef.current,  { y: 40,      opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: dSectionRef.current,
        start: 'top 30%',    // ← animation fires when section top hits 30% from viewport top
        end:   'bottom 20%',
        toggleActions: 'play reverse play reverse', // replays on scroll-back
      }
    })

    tl.to(dTopRef.current,         { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out'           }, 0   )
      .to(dBottomAboveRef.current, { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out'           }, 0.1 )
      .to(dBottomRef.current,      { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out'           }, 0.2 )
      .to(dToptextRef.current,     { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out'           }, 0.25)
      .to(dCenterRef.current,      { scale: 1, opacity: 1, duration: 1.4, ease: 'back.out(1.2)' }, 0.35)
      .to(dBottomtextRef.current,  { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out'           }, 0.5 )
  }, [])

  return (
    <>
      {/* ══════════════════════════════════════════════════
          MOBILE  (hidden on md+)
      ══════════════════════════════════════════════════ */}
      <section ref={sectionRef} className="block md:hidden relative w-full h-screen overflow-hidden">

        <img src={page5Bg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

        <img ref={topRef}     src={page5Top}     alt="" className="absolute -top-2 left-0 w-full z-10 pointer-events-none" />
        <img ref={toptextRef} src={page5Toptext} alt="" className="absolute top-[15%] left-1/2 -translate-x-1/2 z-20 pointer-events-none w-52" />

        <div ref={centerRef} className="absolute top-[33%] left-[30%] z-30 w-38">
          <img src={page5Center} alt="" className="w-full pointer-events-none" />
          <p className="absolute top-[5%] left-[13%] text-[13px] font-medium tracking-widest" style={{ fontFamily: 'Bodoni Moda', color: '#303D53' }}>
            9th January 2027
          </p>
          <p className="absolute bottom-[6%] left-[30%] text-[16px] tracking-widest" style={{ fontFamily: 'Bodoni Moda', color: '#303D53' }}>
            3:00 PM
          </p>
        </div>

        <p className="absolute bottom-[31%] left-[0%] text-[10px] tracking-[0.19em] leading-3.5 text-center w-full font-medium" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
          St. Joseph's Church Pushpagiri<br />Kottayam
        </p>

        <img ref={bottomRef}     src={page5Bottom}     alt="" className="absolute bottom-0 left-0 w-full z-10 pointer-events-none" />
        <img ref={bottomtextRef} src={page5Bottomtext} alt="" className="absolute bottom-[8%] left-[28vw] z-20 pointer-events-none w-40" />

      </section>

      {/* ══════════════════════════════════════════════════
          DESKTOP  (hidden below md)
      ══════════════════════════════════════════════════ */}
      <section ref={dSectionRef} className="hidden md:block relative w-full h-screen overflow-hidden">

        {/* Background — full cover */}
        <img src={page5DBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

        {/* page5-d-top — slides down from above, z-10 */}
        <img ref={dTopRef} src={page5DTop} alt="" className="absolute -top-8 right-0 w-full z-10 pointer-events-none" />

        {/* page5-d-toptext — above top image, z-20 */}
        <img ref={dToptextRef} src={page5DToptext} alt="" className="absolute top-[6%] left-1/2 -translate-x-1/2 z-20 pointer-events-none w-72" />

        {/* page5-d-center — center, scales up, z-30 */}
        <div ref={dCenterRef} className="absolute top-[30%] left-[45vw] z-30 w-56">
          <img src={page5DCenter} alt="" className="w-38 pointer-events-none" />
          <p className="absolute top-[4%] left-[3%] text-[16px] font-medium tracking-widest" style={{ fontFamily: 'Bodoni Moda', color: '#303D53' }}>
            9Th January 2027
          </p>
          <p className="absolute bottom-[5%] left-[19%] text-[17px] tracking-widest" style={{ fontFamily: 'Bodoni Moda', color: '#303D53' }}>
            3:00 PM
          </p>
        </div>

        
        <p className="absolute bottom-[30%] left-3 text-[12px] tracking-[0.19em] leading-4 text-center w-full font-semibold z-30" style={{ fontFamily: 'Playfair Display', color: '#303D53' }}>
          St. Joseph's Church Pushpagiri<br />Kottayam
        </p>

        {/* page5-d-bottomabove — z-[5], BEHIND page5-d-bottom */}
        <img ref={dBottomAboveRef} src={page5DBottomAbove} alt="" className="absolute -bottom-4 left-0 w-full z-[5] pointer-events-none" />

        {/* page5-d-bottom — z-10, ON TOP of bottomabove */}
        <img ref={dBottomRef} src={page5DBottom} alt="" className="absolute -bottom-24 left-0 w-full h-[80vh] z-10 pointer-events-none" />

        {/* page5-d-bottomtext — above bottom, z-20 */}
        <img ref={dBottomtextRef} src={page5DBottomtext} alt="" className="absolute bottom-[12%] left-[42vw] z-20 pointer-events-none w-52" />

      </section>
    </>
  )
}

export default Page5
