import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// ── Loading screen visuals ────────────────────────────────────────────────────
import bgImg   from '../assets/page5-d-bg.jpg'
import logoImg from '../assets/env-logo.png'

// ── Critical images: ALL envelope + page1 assets ──────────────────────────────
// Loading screen stays visible until every one of these is ready.
// Envelope (mobile)
import envBg         from '../assets/env-bg.jpeg'
import envLogo       from '../assets/env-logo.png'
import envBottom     from '../assets/env-bottom.png'
import envBottomTop  from '../assets/env-bottomtop.png'
import envButton     from '../assets/env-button.png'
import envText       from '../assets/env-text.png'
// Envelope (desktop)
import envDBg        from '../assets/env-d-bg.jpg'
import envDLogo      from '../assets/env-d-logo.png'
import envDBottom    from '../assets/env-d-bottom.webp'
import envDBottomTop from '../assets/env-d-bottomtop.png'
import envDButton    from '../assets/env-d-button.png'
import envDText      from '../assets/env-d-text.png'
// Page 1 (mobile)
import page1Bg       from '../assets/page1-bg.jpeg'
import page1Above    from '../assets/page1-abovee.png'
import page1Logo     from '../assets/page1-logo.png'
import page1Design   from '../assets/pae1-design.png'
import page1Counter  from '../assets/page1-counter.png'
// Page 1 (desktop)
import page1DBg      from '../assets/page1-d-bg.jpg'
import page1DAbove   from '../assets/page1-d-above.webp'
import page1DLogo    from '../assets/page1-d-logo.png'
import page1DTopText  from '../assets/page1-d-toptext.png'
import page1DTopText2 from '../assets/page1-d-toptext2.png'
import page1DCounter  from '../assets/page1-d-counter.png'

const PRELOAD = [
  // Envelope
  envBg, envLogo, envBottom, envBottomTop, envButton, envText,
  envDBg, envDLogo, envDBottom, envDBottomTop, envDButton, envDText,
  // Page 1
  page1Bg, page1Above, page1Logo, page1Design, page1Counter,
  page1DBg, page1DAbove, page1DLogo, page1DTopText, page1DTopText2, page1DCounter,
]

// ─── LoadingScreen ────────────────────────────────────────────────────────────
// onReady — called when all critical images are loaded; starts the fade-out and
//           signals App.jsx to mount the envelope so both animate simultaneously.
// onHide  — called after the fade-out completes so App.jsx can unmount this.
// freeze  — set true to preview the screen without it ever hiding.
const LoadingScreen = ({ onReady, onHide, freeze = false }) => {

  const wrapRef     = useRef(null)
  const logoRef     = useRef(null)
  const progressRef = useRef(null)

  // ── Logo pulse — always running ───────────────────────────────────────────
  useEffect(() => {
    gsap.to(logoRef.current, {
      scale: 1.08, duration: 1.2, ease: 'power1.inOut', yoyo: true, repeat: -1,
    })

    if (freeze) {
      gsap.fromTo(
        progressRef.current,
        { width: '0%' },
        { width: '100%', duration: 2, ease: 'power1.inOut', yoyo: true, repeat: -1 }
      )
    }
  }, [freeze])

  // ── Preload + progress bar ────────────────────────────────────────────────
  useEffect(() => {
    if (freeze) return

    let loaded   = 0
    let finished = false
    const total  = PRELOAD.length

    // Fade out, simultaneously mount envelope, then signal unmount when done
    const finish = () => {
      if (finished) return
      finished = true
      if (wrapRef.current) wrapRef.current.style.pointerEvents = 'none'
      onReady()   // ← envelope mounts NOW, its animation overlaps our fade-out
      gsap.to(wrapRef.current, {
        opacity:    0,
        duration:   0.8,
        ease:       'power1.inOut',
        onComplete: onHide,  // ← safe to remove from DOM
      })
    }

    // Advance progress bar; trigger finish when last image is done
    const advanceBar = () => {
      loaded += 1
      const pct    = (loaded / total) * 100
      const isLast = loaded >= total
      gsap.to(progressRef.current, {
        width:      `${pct}%`,
        duration:   0.4,
        ease:       'power1.out',
        onComplete: isLast ? finish : undefined,
      })
    }

    PRELOAD.forEach(src => {
      const img   = new Image()
      img.onload  = advanceBar
      img.onerror = advanceBar   // still advance on 404 so we never get stuck
      img.src     = src
    })

    // Safety net — hide after 8 s no matter what (covers slow connections)
    const safety = setTimeout(finish, 8000)
    return () => clearTimeout(safety)
  }, [onReady, onHide])

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
    >
      {/* Background */}
      <img
        src={bgImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-0">

        <img
          ref={logoRef}
          src={logoImg}
          alt="logo"
          className="w-28 lg:w-42"
        />

        <p
          className="mb-3 mt-7 text-2xl lg:text-4xl font-light lg:mb-4 text-[black]"
          style={{ fontFamily: 'Great Vibes' }}
        >
          Loading...
        </p>

        {/* Progress bar track */}
        <div className="w-32 lg:w-42 h-[4px] bg-white/30 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-white rounded-full"
            style={{ width: '0%' }}
          />
        </div>

      </div>
    </div>
  )
}

export default LoadingScreen
