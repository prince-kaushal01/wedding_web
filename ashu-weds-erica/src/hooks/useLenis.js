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
      // touchMultiplier — even with syncTouch left at its default (false, ──
      // so native touch scrolling is what you actually see), Lenis still  ──
      // scales every touch-move delta by this before feeding it into its  ──
      // own internally-tracked, smoothly-animated (1.2s) scroll position, ──
      // which ScrollTrigger reads from. At 2x, a normal swipe fed Lenis a ──
      // target twice as far as intended, and rapid successive swipes      ──
      // (totally normal on mobile) compounded into large jumps — reading  ──
      // as "skipped pages" while scrolling. Reverted to Lenis's own       ──
      // default of 1.                                                     ──
      touchMultiplier: 1,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
