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
import skyBg from './assets/rsvp.webp'

gsap.registerPlugin(ScrollTrigger)

// Ignore the phone address-bar resize, otherwise scrolling freezes
ScrollTrigger.config({ ignoreMobileResize: true })

// Don't restore the scroll position after a refresh
ScrollTrigger.clearScrollMemory('manual')

const App = () => {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)

  // Lenis smooths the mouse wheel only; phones keep their native scrolling
  useEffect(() => {
    const lenis = new Lenis({
      wheelMultiplier: 1, // mouse wheel scroll speed: 1 = normal
      lerp: 0.1, // wheel smoothness: lower = smoother, higher = snappier
    })

    // Run Lenis on GSAP's loop so the scroll animations stay in step
    lenis.on('scroll', ScrollTrigger.update)
    const runLenis = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(runLenis)
    gsap.ticker.lagSmoothing(0)

    lenis.scrollTo(0, { immediate: true, force: true })

    return () => {
      gsap.ticker.remove(runLenis)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Loader />

      <Envelope onOpened={() => setEnvelopeOpened(true)} />
      <Page1 start={envelopeOpened} />
      <Page3 />
      <Page2 />
      <Page5 />
      <Page4 />

      {/* One sky image behind blessings, RSVP and footer, so there is no seam */}
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
