import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'
import Loader from './pages/Loader'
import Envelope from './pages/Envelope'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Blessings from './pages/Blessings'
import Rsvp from './pages/Rsvp'
import Footer from './pages/Footer'
import skyBg from './assets/rsvp.png'

gsap.registerPlugin(ScrollTrigger)

// On phones the address bar hides and shows while scrolling, which changes the screen height a little.
// Without this, ScrollTrigger recalculates every animation each time that happens, and scrolling freezes.
ScrollTrigger.config({ ignoreMobileResize: true })

// ScrollTrigger also remembers the scroll position and puts it back after a refresh.
// This turns that off, so a refresh always starts from the top (envelope, then Page1).
ScrollTrigger.clearScrollMemory('manual')

const App = () => {
  // false while the envelope is on screen, true once it has opened and gone
  const [envelopeOpened, setEnvelopeOpened] = useState(false)

  // Lenis: smooth scrolling at normal speed.
  // On phones the finger scrolling is left to the browser (normal, native scrolling), because letting
  // Lenis control touch scrolling made it slow and made it freeze. Lenis only smooths the mouse wheel.
  useEffect(() => {
    const lenis = new Lenis({
      wheelMultiplier: 1, // mouse wheel scroll speed: 1 = normal
      lerp: 0.1, // wheel smoothness: lower = smoother, higher = snappier
    })

    // Keep Lenis and the GSAP scroll animations in step: both run on GSAP's one animation loop,
    // and ScrollTrigger is told every time Lenis moves the page
    lenis.on('scroll', ScrollTrigger.update)
    const runLenis = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(runLenis)
    gsap.ticker.lagSmoothing(0)

    // Always start from the top (Page1) when the site loads or is refreshed
    lenis.scrollTo(0, { immediate: true, force: true })

    return () => {
      gsap.ticker.remove(runLenis)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* Loading screen: on top of everything until all images are ready */}
      <Loader />

      {/* Envelope covers the screen first, the pages sit behind it */}
      <Envelope onOpened={() => setEnvelopeOpened(true)} />
      <Page1 start={envelopeOpened} />
      <Page3 />
      <Page2 />
      <Page5 />
      <Page4 />

      {/* The ending: blessings, RSVP and footer share ONE sunset-sky picture behind all three,
          so the sky runs through them without a break */}
      <div className="relative overflow-hidden bg-[#a9cdf5]">
        <img src={skyBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <Blessings />
        <Rsvp />
        <Footer />
      </div>
    </>
  )
}

export default App
