import { useEffect, useRef, useState } from 'react'

import envBg from '../assets/env-bg.webp'

// Preload EVERY image in src/assets — every page's images plus the        ──
// envelope's — via Vite's import.meta.glob, so nothing further down the    ──
// site can pop in unloaded later, and the loading screen only disappears   ──
// once the whole site's images are actually ready. `eager: true` resolves  ──
// them all synchronously at build time (no extra async import step), and   ──
// this automatically covers any new asset dropped into the folder later.   ──
// Covers both .webp (every page/envelope image) and .svg (Page10's pin/    ──
// directions icons) — anything less than that and those two icons could    ──
// still pop in after the loading screen has already gone.                  ──
const assetModules = import.meta.glob('../assets/*.{webp,svg}', { eager: true, import: 'default' })
const ASSETS_TO_PRELOAD = Object.values(assetModules)

const MAX_WAIT_MS = 12000
const MIN_SHOW_MS = 900

const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving]   = useState(false)
  const startedAt = useRef(null)

  useEffect(() => {
    startedAt.current = Date.now()
    let loaded = 0
    let settled = false
    const total = ASSETS_TO_PRELOAD.length

    const finish = () => {
      if (settled) return
      settled = true
      const elapsed = Date.now() - startedAt.current
      const remaining = Math.max(0, MIN_SHOW_MS - elapsed)
      setProgress(100)
      setTimeout(() => setLeaving(true), remaining)
    }

    const bump = () => {
      loaded += 1
      setProgress(Math.round((loaded / total) * 100))
      if (loaded >= total) finish()
    }

    ASSETS_TO_PRELOAD.forEach((src) => {
      const img = new Image()
      img.onload = bump
      img.onerror = bump
      img.src = src
    })

    const fallback = setTimeout(finish, MAX_WAIT_MS)
    return () => clearTimeout(fallback)
  }, [])

  // Once the leave-transition finishes, tell the parent to unmount us.
  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(() => onDone?.(), 600)
    return () => clearTimeout(t)
  }, [leaving, onDone])

  return (
    <div
      className="fixed inset-0 w-full h-dvh overflow-hidden z-100 flex items-center justify-center transition-opacity duration-600 ease-out"
      style={{ opacity: leaving ? 0 : 1, pointerEvents: leaving ? 'none' : 'auto', backgroundColor: '#e7bd88' }}
    >
      <img
        src={envBg}
        alt=""
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/10 z-0" />

      <div
        className="relative z-10 flex flex-col items-center transition-transform duration-600 ease-out"
        style={{ transform: leaving ? 'scale(0.96)' : 'scale(1)' }}
      >
        {/* Modern dual-ring spinner — slow faint outer ring, fast gold  */}
        {/* arc inner ring. Tweak the sizes/colors/speeds below.         */}
        <div className="relative" style={{ width: 'clamp(64px, 16vw, 88px)', height: 'clamp(64px, 16vw, 88px)' }}>
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              borderWidth: '3px',
              borderStyle: 'solid',
              borderColor: 'rgba(20, 83, 79, 0.15)',
              borderTopColor: 'rgba(20, 83, 79, 0.15)',
              animationDuration: '3s',
            }}
          />
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              borderWidth: '3px',
              borderStyle: 'solid',
              borderColor: 'transparent',
              borderTopColor: '#c9a24b',
              borderRightColor: '#c9a24b',
              animationDuration: '1.1s',
            }}
          />
        </div>

        <p
          className="mt-6 tracking-[0.25em] uppercase"
          style={{ fontFamily: 'Georgia, serif', color: '#14534f', fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)' }}
        >
          Ashu &amp; Erica
        </p>

        {/* Slim progress bar — reflects real asset-load progress.       */}
        <div className="mt-3 h-0.75 rounded-full overflow-hidden" style={{ width: 'clamp(120px, 30vw, 160px)', backgroundColor: 'rgba(20, 83, 79, 0.15)' }}>
          <div
            className="h-full rounded-full transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%`, backgroundColor: '#c9a24b' }}
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
