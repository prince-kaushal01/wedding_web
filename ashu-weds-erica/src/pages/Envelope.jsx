import { useRef } from 'react'
import gsap from 'gsap'

import envBg     from '../assets/env-bg.webp'
import envBottom from '../assets/env-bottom.webp'
import envTop    from '../assets/env-top.webp'
import envSeal   from '../assets/env-seal.webp'
import envText   from '../assets/env-text.webp'

const Envelope = ({ onOpen }) => {
  const rootRef      = useRef(null)
  const flapRef      = useRef(null)
  const bottomRef    = useRef(null)
  const textRef      = useRef(null)
  const sealRef      = useRef(null)
  const isAnimating  = useRef(false)

  // ── Open animation ──────────────────────────────────────────────
  // Flap slides up, body slides down (both pure transforms — no layout
  // properties touched — so this stays smooth/GPU-composited even on
  // low-end phones), then the whole envelope fades out to reveal
  // whatever's mounted behind it (Page1). ~1.6s total, inside the
  // 1-2s target. Tune the durations/positions below to adjust pacing.
  const handleOpen = () => {
    if (isAnimating.current) return
    isAnimating.current = true

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut', force3D: true },
      onComplete: () => onOpen?.(),
    })

    tl.to(flapRef.current,   { y: '-130%', duration: 1.3 }, 0)
      .to(bottomRef.current, { y: '130%',  duration: 1.3 }, 0)
      .to([textRef.current, sealRef.current], { opacity: 0, duration: 0.35, ease: 'power1.out' }, 0)
      .to(rootRef.current,   { opacity: 0, duration: 0.5, ease: 'power1.out' }, 1.3)
  }

  return (
    <div ref={rootRef} className="fixed inset-0 w-full h-dvh overflow-hidden z-50">

      {/* ── Background — covers the full page ───────────────── */}
      <img
        src={envBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Wedding text — sits at the very top of the page ─── */}
      {/* top-16 gives clear breathing room above the flap, matching  */}
      {/* the reference's top gap. Tweak top-16/w-[60%] to adjust.    */}
      <img
        ref={textRef}
        src={envText}
        alt="Wedding text"
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[50%] z-40"
      />

      {/* ── Envelope body — front face, bottom-anchored ──────── */}
      {/* bottom — stays at 0% (short screens, ≤700px tall) growing to  */}
      {/* 3% on long screens. width — stays at 95% growing to 100%.     */}
      {/* Tweak the 700px baseline, rates, or caps below.                */}
      <img
        ref={bottomRef}
        src={envBottom}
        alt="Envelope"
        className="absolute -left-10 z-10"
        style={{
          bottom: 'clamp(5%, calc(5% + (100dvh - 700px) * 0.015), 3%)',
          width: 'clamp(122%, calc(122% + (100dvh - 700px) * 0.02), 142%)',
          maxWidth: 'none',
          willChange: 'transform',
        }}
      />

      {/* ── Flap + seal — grouped so the seal always sits at the  */}
      {/* flap's own bottom-center, wherever the flap is placed.   */}
      {/* z-20 keeps the flap ABOVE the envelope body (z-10), so    */}
      {/* it tucks over the body like a real envelope flap.         */}
      {/* bottom — stays at 62% (short screens, ≤700px tall) growing   */}
      {/* to 66% on long screens (tucks the flap further down as the   */}
      {/* screen gets taller). width — stays at 92% growing to 100%.   */}
      {/* Tweak the 700px baseline, rates, or caps below.               */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20"
        style={{
          top: 'clamp(15%, calc(15% + (100dvh - 700px) * 0.008), 66%)',
          width: 'clamp(162%, calc(162% + (100dvh - 700px) * 0.02), 152%)',
        }}
      >
        {/* GSAP animates ONLY this inner wrapper's transform. The outer  */}
        {/* div above owns the centering transform (-translate-x-1/2) —  */}
        {/* keeping them separate means GSAP never overwrites/clobbers   */}
        {/* the centering when it writes the slide-up transform.          */}
        <div ref={flapRef} style={{ willChange: 'transform' }}>
          <img src={envTop} alt="Invitation flap" className="w-full block" />

          {/* Seal — sits at the flap's bottom-center, straddling the   */}
          {/* flap/body seam. width — stays at 16% growing to 20%.       */}
          {/* translateY — stays at 50% (straddling the seam evenly)     */}
          {/* growing to 60% (sinks further into the body) on long        */}
          {/* screens. Tap/click it to open the envelope.                 */}
          <img
            ref={sealRef}
            src={envSeal}
            alt="Tap to open"
            role="button"
            tabIndex={0}
            onClick={handleOpen}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
            className="absolute bottom-6 left-1/2 z-30 cursor-pointer"
            style={{
              width: 'clamp(22%, calc(22% + (100dvh - 700px) * 0.01), 20%)',
              transform: 'translate(-50%, clamp(50%, calc(50% + (100dvh - 700px) * 0.02), 60%))',
            }}
          />
        </div>
      </div>

    </div>
  )
}

export default Envelope
