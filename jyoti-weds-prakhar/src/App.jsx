import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Envelope from './pages/Envelope'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'

const App = () => {
  // Lenis: smooth and slower scrolling for the whole site
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true, // Lenis runs its own animation loop
      syncTouch: true, // also control finger scrolling on phones (needed to slow it down)
      touchMultiplier: 0.6, // finger scroll speed: 1 = normal, lower = slower
      wheelMultiplier: 0.6, // mouse wheel scroll speed: 1 = normal, lower = slower
      lerp: 0.07, // smoothness: lower = smoother and slower to settle
    })

    return () => lenis.destroy()
  }, [])

  return (
    <>
      {/* Envelope covers the screen first, the pages sit behind it */}
      <Envelope />
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
    </>
  )
}

export default App
