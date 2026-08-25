import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      // syncTouch: true — on touch devices, Lenis syncs its internal      ──
      // scroll position directly to native touch scroll in real-time,     ──
      // with no 1.2s easing lag. Without this, Lenis applies its smooth   ──
      // easing to touch events, which means there's a 1.2s delay between  ──
      // the user's finger and what ScrollTrigger reads — animations appear ──
      // to lag or freeze completely. With syncTouch, touch feels native    ──
      // while mouse-wheel still gets the smooth easing via smoothWheel.   ──
      syncTouch: true,
      touchMultiplier: 1,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // lagSmoothing(500, 33) — restores GSAP's default protection against  ──
    // frame-drop catch-up jumps. lagSmoothing(0) disables this entirely:  ──
    // when the mobile browser pauses for GC or heavy paint, GSAP would    ──
    // try to "catch up" by jumping the animation forward all at once,     ──
    // which looks exactly like the screen cut/freeze the user sees.       ──
    // The defaults (500ms threshold, 33ms minimum frame) prevent that.    ──
    gsap.ticker.lagSmoothing(500, 33)

    // Refresh ScrollTrigger positions after viewport changes (mobile URL  ──
    // bar shows/hides). Without this, the cached start/end pixel values   ──
    // become stale and animations fire at wrong positions or appear frozen ──
    // because the trigger zone no longer matches the visible viewport.    ──
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200)
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
