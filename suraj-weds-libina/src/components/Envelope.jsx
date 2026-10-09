import { useRef, useEffect } from 'react'
import gsap from 'gsap'

// ── Mobile assets ────────────────────────────────────────────────────────────
import envBg        from '../assets/env-bg.jpeg'
import envLogo      from '../assets/env-logo.png'
import envBottom    from '../assets/env-bottom.png'
import envBottomTop from '../assets/env-bottomtop.png'
import envButton    from '../assets/env-button.png'
import envText      from '../assets/env-text.png'

// ── Desktop assets ───────────────────────────────────────────────────────────
import envDBg        from '../assets/env-d-bg.jpg'
import envDLogo      from '../assets/env-d-logo.png'
import envDBottom    from '../assets/env-d-bottom.webp'
import envDBottomTop from '../assets/env-d-bottomtop.png'
import envDButton    from '../assets/env-d-button.png'
import envDText      from '../assets/env-d-text.png'

const Envelope = ({ onOpen }) => {

  // ── Mobile refs ──────────────────────────────────────────────────────────
  const containerRef  = useRef(null)
  const bgRef         = useRef(null)
  const logoRef       = useRef(null)
  const bottomRef     = useRef(null)
  const bottomTopRef  = useRef(null)
  const flapRef       = useRef(null)
  const buttonRef     = useRef(null)
  const textRef       = useRef(null)

  // ── Desktop refs ─────────────────────────────────────────────────────────
  const dContainerRef  = useRef(null)
  const dBgRef         = useRef(null)
  const dLogoRef       = useRef(null)
  const dBottomRef     = useRef(null)
  const dBottomTopRef  = useRef(null)
  const dButtonRef     = useRef(null)
  const dTextRef       = useRef(null)

  // ── Entry animation — mobile ─────────────────────────────────────────────
  useEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { scale: 0.93, opacity: 0 })
      gsap.to(containerRef.current, { scale: 1, opacity: 1, duration: 1.3, ease: 'power3.out', delay: 0.1 })
    }
  }, [])

  // ── Entry animation — desktop ────────────────────────────────────────────
  useEffect(() => {
    if (dContainerRef.current) {
      gsap.set(dContainerRef.current, { scale: 0.93, opacity: 0 })
      gsap.to(dContainerRef.current, { scale: 1, opacity: 1, duration: 1.3, ease: 'power3.out', delay: 0.1 })
    }
  }, [])

  // ── Open animation — mobile ──────────────────────────────────────────────
  const handleOpen = () => {
    gsap.set([textRef.current, bottomTopRef.current, bottomRef.current], { willChange: 'transform' })
    const tl = gsap.timeline()
    tl.to(buttonRef.current, { scale: 1.2, opacity: 0, duration: 0.5, ease: 'power2.out' })
    tl.to([textRef.current, bottomTopRef.current], { y: '120vh', duration: 2, ease: 'power1.inOut' }, '-=0.1')
    tl.to(bottomRef.current, { y: '120vh', duration: 1.8, ease: 'power1.inOut' }, '-=1.7')
    tl.to([bgRef.current, logoRef.current], {
      scale: 1.05,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: onOpen,
    }, '-=0.90')
  }

  // ── Open animation — desktop ─────────────────────────────────────────────
  const handleDOpen = () => {
    gsap.set([dTextRef.current, dBottomTopRef.current, dBottomRef.current], { willChange: 'transform' })
    const tl = gsap.timeline()
    tl.to(dButtonRef.current, { scale: 1.2, opacity: 0, duration: 0.5, ease: 'power2.out' })
    tl.to([dTextRef.current, dBottomTopRef.current], { y: '120vh', duration: 2, ease: 'power1.inOut' }, '-=0.1')
    tl.to(dBottomRef.current, { y: '120vh', duration: 1.8, ease: 'power1.inOut' }, '-=1.7')
    tl.to([dBgRef.current, dLogoRef.current], {
      scale: 1.05,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: onOpen,
    }, '-=0.90')
  }

  return (
    <>
      {/* ════════════════════════════════════════════════
          MOBILE  (hidden on md+)
      ════════════════════════════════════════════════ */}
      <div ref={containerRef} className="block md:hidden relative w-full h-screen overflow-hidden">

        <img ref={bgRef} src={envBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />

        <img
          ref={logoRef}
          src={envLogo}
          alt=""
          className="absolute top-[22%] left-1/2 -translate-x-1/2 z-10 w-26"
        />

        <img ref={bottomRef}    src={envBottom}    alt="" className="absolute bottom-0 left-0 w-full z-10" />
        <img ref={bottomTopRef} src={envBottomTop} alt="" className="absolute bottom-0 left-0 w-full z-20" />

        <div ref={flapRef} className="absolute bottom-[24%] left-[40%] w-20 z-20 flex flex-col items-center">
          <img
            ref={buttonRef}
            src={envButton}
            alt="Open invitation"
            onClick={handleOpen}
            className="cursor-pointer select-none"
          />
        </div>

        <img ref={textRef} src={envText} alt="" className="absolute bottom-[10%] left-[36%] w-28 z-30" />

      </div>

      {/* ════════════════════════════════════════════════
          DESKTOP  (hidden below md)
      ════════════════════════════════════════════════ */}
      <div ref={dContainerRef} className="hidden md:block relative w-full h-screen overflow-hidden">

        <img ref={dBgRef} src={envDBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />

        <img
          ref={dLogoRef}
          src={envDLogo}
          alt=""
          className="absolute top-[20%] left-1/2 -translate-x-1/2 z-10 w-32"
        />

        <img ref={dBottomRef}    src={envDBottom}    alt="" className="absolute -bottom-[30%] left-0 w-full z-10" />
        <img ref={dBottomTopRef} src={envDBottomTop} alt="" className="absolute -bottom-[8%] left-0 w-full z-20" />

        <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-26 z-20 flex flex-col items-center">
          <img
            ref={dButtonRef}
            src={envDButton}
            alt="Open invitation"
            onClick={handleDOpen}
            className="cursor-pointer select-none"
          />
        </div>

        <img ref={dTextRef} src={envDText} alt="" className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-40 z-30" />

      </div>
    </>
  )
}

export default Envelope
