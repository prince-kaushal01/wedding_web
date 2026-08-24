import { useEffect, useRef, useState } from 'react'
import { useLenis } from './hooks/useLenis'
import LoadingScreen from './components/LoadingScreen'
import Envelope from './pages/Envelope'
import song from './assets/song.mp3'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import Page7 from './pages/Page7'
import Page8 from './pages/Page8'
import Page9 from './pages/Page9'
import Page10 from './pages/Page10'

const App = () => {
  const lenisRef = useLenis()
  const audioRef = useRef(null)
  const [envelopeOpen, setEnvelopeOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  // Called once the envelope has fully faded away and Page1 is visible.  ──
  // Starting playback here (still within the same call chain the seal    ──
  // click kicked off) keeps it inside the user-gesture window browsers    ──
  // require for audio autoplay — a delayed useEffect with no gesture      ──
  // behind it would get silently blocked. currentTime is reset to 0      ──
  // first so a fresh page load/refresh always starts the song from the   ──
  // beginning, never resuming mid-track.                                 ──
  const handleEnvelopeOpened = () => {
    setEnvelopeOpen(false)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  // On every page load/reload, always land on Page1 — browsers otherwise ──
  // try to restore whatever scroll position you were at before refreshing, ──
  // which we don't want here. `scrollRestoration = 'manual'` stops the    ──
  // browser from doing that restore in the first place; the scrollTo      ──
  // calls are a belt-and-suspenders reset for the very first paint.       ──
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [lenisRef])

  // Whenever the envelope is showing, snap the viewport to the very top   ──
  // (Page1) and block scrolling everywhere else — the reveal should       ──
  // always happen right there, and nothing behind it should be           ──
  // scrollable until it's opened. Lenis.stop() blocks its own wheel/     ──
  // touch handling; the body overflow lock is a fallback for anything    ──
  // Lenis doesn't intercept (scrollbar drag, keyboard, etc).             ──
  useEffect(() => {
    if (envelopeOpen) {
      lenisRef.current?.scrollTo(0, { immediate: true })
      lenisRef.current?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenisRef.current?.start()
      document.body.style.overflow = ''
    }
  }, [envelopeOpen, lenisRef])

  return (
    <div>
      <Page1 startAnimation={!envelopeOpen} />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
      <Page7 />
      <Page8 />
      <Page9 />
      <Page10 />
      {/* Envelope sits on top as a fixed overlay until opened, then       */}
      {/* unmounts (already faded to opacity 0) to reveal Page1 beneath.   */}
      {envelopeOpen && <Envelope onOpen={handleEnvelopeOpened} />}
      {/* preload="none" — the song is a large file (~5.5MB, bigger than    */}
      {/* every page image combined); "auto" would make the browser start   */}
      {/* downloading all of it immediately on page load, competing for     */}
      {/* bandwidth with the images while the loading screen is up. It only */}
      {/* needs to start fetching once the envelope actually opens.         */}
      <audio ref={audioRef} src={song} preload="none" />
      {/* Loading screen sits above everything, including the envelope,   */}
      {/* until its preloaded assets are ready (or the fallback timeout   */}
      {/* fires) — then it fades out and unmounts.                        */}
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
    </div>
  )
}

export default App
