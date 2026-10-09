import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LoadingScreen = ({ onDone, imagesToPreload = [] }) => {
  const screenRef = useRef(null)
  const heartRef  = useRef(null)

  useEffect(() => {
    let cancelled = false

    // Pulse the heart while loading
    const pulse = gsap.to(heartRef.current, {
      scale: 1.3,
      duration: 0.6,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    })

    const hide = () => {
      if (cancelled) return
      pulse.kill()
      gsap.to(screenRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: onDone,
      })
    }

    // Preload every critical image; resolve even on error so we never hang
    const preloadPromises = imagesToPreload.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = resolve
          img.src = src
        })
    )

    // Wait for ALL images to be in cache, then hide the screen
    Promise.all(preloadPromises).then(hide)

    return () => {
      cancelled = true
      pulse.kill()
    }
  }, [onDone])

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
      style={{ background: '#ECC2AD' }}
    >
      {/* Heart */}
      <div ref={heartRef} style={{ fontSize: '52px', lineHeight: 1, marginBottom: '16px' }}>
        ❤️
      </div>

      {/* Loading text */}
      <p style={{
        fontFamily: 'Great Vibes, cursive',
        fontSize: '32px',
        color: '#7a4a35',
        letterSpacing: '0.05em',
      }}>
        Loading...
      </p>
    </div>
  )
}

export default LoadingScreen
