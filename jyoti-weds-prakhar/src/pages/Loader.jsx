import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// The Google fonts the site uses. The loading screen waits for each of them
const FONTS = ['Pinyon Script', 'Great Vibes', 'Google Sans']

// Loading screen: sits on top of everything (above the envelope) until every image and font on the site
// is downloaded and ready to draw. Only then it fades out and the envelope is visible.
const Loader = () => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let cancelled = false

    // Stop the page behind the loading screen from being scrolled while it loads
    document.documentElement.classList.add('overflow-hidden')

    // Every <img> on the site: envelope, Page1, Page2 ... all pages are already in the document
    const images = Array.from(document.images)
    let loaded = 0

    // the bar starts empty and grows from the left
    gsap.set('.loader-bar', { scaleX: 0, transformOrigin: 'left center' })

    // Runs each time one image is ready: update the number and the bar
    const oneImageReady = () => {
      if (cancelled) return
      loaded++
      const progress = loaded / images.length
      setPercent(Math.round(progress * 100))
      gsap.to('.loader-bar', { scaleX: progress, duration: 0.3 })
    }

    // img.decode() finishes when that image is fully downloaded and ready to draw.
    // If an image fails (for example the network dropped) it is asked for one more time.
    // If it fails again we still count it, so the loading screen can never get stuck forever.
    const waitForImage = (img) =>
      img
        .decode()
        .catch(() => {
          const address = img.src
          img.src = address // setting the same address again makes the browser ask for the image again
          return img.decode().catch(() => {})
        })
        .then(oneImageReady)

    // Ask for every font by name. (Just waiting for 'the fonts' is not enough, because a font
    // that no text has needed yet, like the one on the scratch card, would not be waited for.)
    const fontsReady = FONTS.map((font) => document.fonts.load(`16px "${font}"`).catch(() => {}))

    // The browser's own 'everything on the page has loaded' signal, as one more check
    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', resolve, { once: true })
    })

    // Wait for ALL of it, and only then fade the loading screen out
    Promise.all([...images.map(waitForImage), ...fontsReady, pageLoaded]).then(() => {
      if (cancelled) return

      // Everything has its final size now: go to the top, let scrolling work again,
      // and let GSAP measure the pages again so every scroll animation starts at the right place.
      // (The loading screen still covers the page, so nobody sees any of this.)
      window.scrollTo(0, 0)
      document.documentElement.classList.remove('overflow-hidden')
      ScrollTrigger.refresh()

      gsap.to('.loader', {
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        onComplete: () => gsap.set('.loader', { display: 'none' }),
      })
    })

    return () => {
      cancelled = true
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <div className="loader fixed inset-0 z-60 flex flex-col items-center justify-center bg-[#d3e4ec]">
      {/* Names */}
      <p className="font-['Pinyon_Script'] text-[clamp(2rem,6svh,3.5rem)] text-[#8a1c2b]">
        Jyoti &amp; Prakhar
      </p>

      {/* Progress bar: the gold part grows as images finish loading */}
      <div className="mt-[clamp(1rem,3svh,2rem)] h-1 w-[min(60%,16rem)] overflow-hidden rounded-full bg-white/70">
        <div className="loader-bar h-full w-full rounded-full bg-[#b8892f]" />
      </div>

      {/* Percentage */}
      <p className="mt-[clamp(0.5rem,1.5svh,1rem)] text-[clamp(0.7rem,1.6svh,0.9rem)] tracking-[0.25em] text-[#5b6b75] uppercase">
        Loading {percent}%
      </p>
    </div>
  )
}

export default Loader
