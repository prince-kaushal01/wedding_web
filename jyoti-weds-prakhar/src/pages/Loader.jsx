import { useEffect, useState } from 'react'
import gsap from 'gsap'

// Loading screen: sits on top of everything (above the envelope) until every image on the site
// is downloaded and ready to draw. Then it fades out and the envelope is visible.
const Loader = () => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let cancelled = false

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
    // If an image is broken we still count it, so the loader can never get stuck.
    const imagesReady = images.map((img) =>
      img
        .decode()
        .catch(() => {})
        .then(oneImageReady),
    )

    // Wait for all images and the Google fonts, then fade the loading screen out
    Promise.all([...imagesReady, document.fonts.ready]).then(() => {
      if (cancelled) return

      // Everything is loaded and has its final height now: make sure we are at the top
      // before the loading screen fades (it still covers the page, so nobody sees a jump)
      window.scrollTo(0, 0)

      gsap.to('.loader', {
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        onComplete: () => gsap.set('.loader', { display: 'none' }),
      })
    })

    return () => {
      cancelled = true
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
