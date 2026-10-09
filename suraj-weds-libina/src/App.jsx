import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import LoadingScreen from './components/LoadingScreen'
import Envelope from './components/Envelope'
import Page1    from './pages/Page1'
import Page2    from './pages/Page2'
import Page3    from './pages/Page3'
import Page4    from './pages/Page4'
import Page5    from './pages/Page5'
import Page6    from './pages/Page6'
import Page7    from './pages/Page7'
import { SECONDARY_ASSETS } from './preloadAssets'

const App = () => {
  // showContent — envelope is allowed to render (set when critical images are ready)
  // loadingGone — loading screen element is removed from DOM (set after its fade completes)
  // envelopeOpen — user clicked open; switch to main page scroll
  const [showContent,  setShowContent]  = useState(false)
  const [loadingGone,  setLoadingGone]  = useState(false)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)

  const envelopeWrapRef = useRef(null)
  const mainRef         = useRef(null)

  // Stable callbacks for LoadingScreen — prevents the preload effect re-running
  const handleReady = useCallback(() => setShowContent(true), [])
  const handleHide  = useCallback(() => setLoadingGone(true), [])

  // ── Background preload: pages 2-7 ─────────────────────────────────────────
  // Fires the moment the loading screen reveals the envelope.
  // The user spends ~3-5 s on the envelope, giving the browser time to cache
  // all secondary images before they scroll past page 1.
  useEffect(() => {
    if (!showContent) return
    SECONDARY_ASSETS.forEach(src => {
      const img = new Image()
      img.src   = src
    })
  }, [showContent])

  // ── Called by Envelope when its open animation finishes ───────────────────
  const handleOpen = () => {
    gsap.to(envelopeWrapRef.current, {
      opacity:    0,
      duration:   0.8,
      ease:       'power2.inOut',
      onComplete: () => setEnvelopeOpen(true),
    })
  }

  // ── Fade main page in after it mounts ─────────────────────────────────────
  useEffect(() => {
    if (!envelopeOpen || !mainRef.current) return
    gsap.fromTo(
      mainRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    )
  }, [envelopeOpen])

  return (
    <>
      {/* Loading screen — stays mounted until its fade-out finishes */}
      {!loadingGone && (
        <LoadingScreen onReady={handleReady} onHide={handleHide} freeze={false} />
      )}

      {/* Envelope — mounts the instant loading screen starts fading (overlap) */}
      {showContent && !envelopeOpen && (
        <div ref={envelopeWrapRef}>
          <Envelope onOpen={handleOpen} />
        </div>
      )}

      {/* Main scroll page — faded in after envelope open animation */}
      {envelopeOpen && (
        <main ref={mainRef} style={{ opacity: 0 }}>
          <Page1 />
          <Page2 />
          <Page3 />
          <Page4 />
          <Page5 />
          <Page6 />
          <Page7 />
        </main>
      )}
    </>
  )
}

export default App
