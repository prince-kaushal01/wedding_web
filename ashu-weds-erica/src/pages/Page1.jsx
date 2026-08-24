import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import page1Bg     from '../assets/page1-bg.webp'
import page1Couple from '../assets/page1-couple.webp'
import page1Logo   from '../assets/page1-logo.webp'
import page1Text1  from '../assets/page1-text1.webp'
import page1Text2  from '../assets/page1-text2.webp'
import page1Text3  from '../assets/page1-text3.webp'

const Page1 = ({ startAnimation }) => {
  const coupleRef = useRef(null)
  const logoRef   = useRef(null)
  const text1Ref  = useRef(null)
  const text2Ref  = useRef(null)
  const text3Ref  = useRef(null)
  const hasPlayed = useRef(false)

  // ── Entrance animation — plays once, only after `startAnimation` goes  ──
  // true (the parent flips this once the envelope has fully opened, so   ──
  // this never fires while Page1 is still hidden behind it). Every        ──
  // animated element starts invisible/offset via its own inline `style`  ──
  // below (not via JS) — that's what prevents the flash-then-snap: the    ──
  // browser paints them already-hidden from the very first frame, so      ──
  // there's nothing to "jump" when the effect kicks in. This effect only  ──
  // animates them TO their final resting state. Logo/text drop in from    ──
  // above with a fade, staggered one after another, slowly enough to be   ──
  // clearly visible; the couple photo slides in from the left while       ──
  // settling from a slightly larger scale down to 1. Pure transform/      ──
  // opacity — no layout properties touched — so it stays smooth.          ──
  useEffect(() => {
    if (!startAnimation || hasPlayed.current) return
    hasPlayed.current = true

    const tl = gsap.timeline({ defaults: { ease: 'power2.out', force3D: true } })

    tl.to(coupleRef.current, {
      opacity: 1, x: 0, scale: 1, duration: 1.4,
      // Once the slide-in finishes, settle into a slow, subtle breathing  ──
      // zoom in/out, in place, forever — a separate infinite tween so it   ──
      // doesn't extend this (finite) timeline's own duration.              ──
      onComplete: () => {
        gsap.to(coupleRef.current, {
          scale: 1.035,
          duration: 1.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      },
    }, 0)
      .to(logoRef.current,   { opacity: 1, y: 0, duration: 0.9 }, 0.2)
      .to(text1Ref.current,  { opacity: 1, y: 0, duration: 0.8 }, 0.6)
      .to(text2Ref.current,  { opacity: 1, y: 0, duration: 0.8 }, 1.0)
      .to(text3Ref.current,  { opacity: 1, y: 0, duration: 0.8 }, 1.4)
      // These four are done moving once the timeline completes — the      ──
      // couple photo keeps its will-change (its breathing loop above      ──
      // runs forever), but logo/text1-3 never animate again, so their     ──
      // compositor layer hint gets dropped once it's no longer earning    ──
      // its keep.                                                         ──
      .eventCallback('onComplete', () => {
        gsap.set([logoRef.current, text1Ref.current, text2Ref.current, text3Ref.current], { clearProps: 'willChange' })
      })
  }, [startAnimation])

  return (
    <div className="relative w-full h-dvh overflow-hidden">

      {/* ── Background — covers the full page ───────────────── */}
      <img
        src={page1Bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Couple — same 1080×1920 canvas as the bg, so it gets  */}
      {/* the exact same sizing treatment to stay pixel-aligned   */}
      {/* with the wall/ledge in the background on every screen.  */}
      {/* objectPosition x — stays centered (50%, same as before) on  */}
      {/* short screens (≤700px tall); on long-height mobile screens  */}
      {/* it shifts right, capped at 70%. Tweak the 700px baseline,   */}
      {/* the 0.08 shift rate, or the 70% cap below.                  */}
      <img
        ref={coupleRef}
        src={page1Couple}
        alt="Couple"
        className="absolute inset-0 w-full h-full object-cover z-10"
        style={{ opacity: 0, transform: 'translateX(-80px) scale(1.06)', willChange: 'transform, opacity' }}
      />

      {/* ── Logo ─────────────────────────────────────────────── */}
      {/* Outer div owns the centering transform (-translate-x-1/2);   */}
      {/* GSAP animates only the inner img, so it never clobbers that. */}
      <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[30%] z-20">
        <img
          ref={logoRef}
          src={page1Logo}
          alt="Logo"
          className="w-full block"
          style={{ opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity' }}
        />
      </div>
      {/* ↑ Change w-[30%] to resize the logo, top-[3%] to move it */}

      {/* ── Text images — staggered to match the reference ────── */}
      <img
        ref={text1Ref}
        src={page1Text1}
        alt="Ashu"
        className="absolute top-[31%] left-[22%] w-[25%] z-20"
        style={{ opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity' }}
      />
      <img
        ref={text2Ref}
        src={page1Text2}
        alt="weds"
        className="absolute top-[37%] left-[44%] w-[13%] z-20"
        style={{ opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity' }}
      />
      <img
        ref={text3Ref}
        src={page1Text3}
        alt="Erica"
        className="absolute top-[40%] left-[55%] w-[25%] z-20"
        style={{ opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity' }}
      />
      {/* ↑ Adjust top-[%]/left-[%] to move, w-[%] to resize        */}

    </div>
  )
}

export default Page1
