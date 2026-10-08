import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// The Google fonts the site uses. The loading screen waits for each of them
const FONTS = ['Pinyon Script', 'Great Vibes', 'Google Sans']

// Loading screen: covers the site until every image and font is ready
const Loader = () => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let cancelled = false

    // Stop the page behind the loading screen from being scrolled while it loads
    document.documentElement.classList.add('overflow-hidden')

    // Every <img> on the site
    const images = Array.from(document.images)
    let loaded = 0

    gsap.set('.loader-bar', { scaleX: 0, transformOrigin: 'left center' })

    const oneImageReady = () => {
      if (cancelled) return
      loaded++
      const progress = loaded / images.length
      setPercent(Math.round(progress * 100))
      gsap.to('.loader-bar', { scaleX: progress, duration: 0.3 })
    }

    // decode() resolves when the image is ready to draw. A failed image is retried once, then counted anyway
    const waitForImage = (img) =>
      img
        .decode()
        .catch(() => {
          const address = img.src
          img.src = address // setting the same address again reloads the image
          return img.decode().catch(() => {})
        })
        .then(oneImageReady)

    // document.fonts.ready alone misses fonts no text has used yet, so load each one by name
    const fontsReady = FONTS.map((font) => document.fonts.load(`16px "${font}"`).catch(() => {}))

    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', resolve, { once: true })
    })

    Promise.all([...images.map(waitForImage), ...fontsReady, pageLoaded]).then(() => {
      if (cancelled) return

      // Re-measure the pages for ScrollTrigger while the loader still covers them
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
      <p className="font-['Pinyon_Script'] text-[clamp(2rem,6svh,3.5rem)] text-[#8a1c2b]">
        Jyoti &amp; Prakhar
      </p>

      <div className="mt-[clamp(1rem,3svh,2rem)] h-1 w-[min(60%,16rem)] overflow-hidden rounded-full bg-white/70">
        <div className="loader-bar h-full w-full rounded-full bg-[#b8892f]" />
      </div>

      <p className="mt-[clamp(0.5rem,1.5svh,1rem)] text-[clamp(0.7rem,1.6svh,0.9rem)] tracking-[0.25em] text-[#5b6b75] uppercase">
        Loading {percent}%
      </p>
    </div>
  )
}

export default Loader
