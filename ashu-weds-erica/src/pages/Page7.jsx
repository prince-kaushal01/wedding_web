import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import page7Bg         from '../assets/page7-bg.webp'
import page7Couple     from '../assets/page7-couple.webp'
import page7Leftlight  from '../assets/page7-leftlight.webp'
import page7Rightlight from '../assets/page7-rightlight.webp'
import page7Leftitems  from '../assets/page7-leftitems.webp'
import page7Rightitems from '../assets/page7-rightitems.webp'
import page7Text1      from '../assets/page7-text1.webp'
import page7Text2      from '../assets/page7-text2.webp'
import page7Text3      from '../assets/page7-text3.webp'
import page7Text4      from '../assets/page7-text4.webp'

const Page7 = () => {
  const stackRef          = useRef(null)
  const leftLightRef      = useRef(null)
  const rightLightRef     = useRef(null)
  const leftItemsRef      = useRef(null)
  const rightItemsRef     = useRef(null)
  const coupleEntranceRef = useRef(null)
  const coupleBreatheRef  = useRef(null)

  // ── Two scroll-scrubbed groups, both reversible with scroll direction: ──
  // (1) text stack ONLY — start 'top 80%' end 'top 40%'.                  ──
  // (2) every other element (both lanterns, the couple's scale-up          ──
  // entrance, and the left/right floor decor items) — start 'top 60%'      ──
  // end '+=500'. Lights/items slide in from their own side (left ones      ──
  // from the left, right ones from the right). Couple's continuous         ──
  // breathing zoom is a separate infinite loop, unrelated to scroll, on    ──
  // its own inner element so it never fights the scroll-tied scale         ──
  // entrance for control of the same transform.                            ──
  useEffect(() => {
    const textItems = gsap.utils.toArray(stackRef.current.children)

    // Drops will-change once a scrub range comes to rest at either end      ──
    // (progress 0 = fully hidden, 1 = fully revealed) — never mid-scrub,    ──
    // so the compositor hint stays available for as long as the element     ──
    // could still be actively moving. Tried doing this via the timeline's   ──
    // own onComplete instead, but under scrub that callback can get         ──
    // silently skipped if a ScrollTrigger.refresh() (e.g. Page10's, once    ──
    // its async map iframes load) resyncs progress to 1 without a normal    ──
    // forward render pass. scrollTrigger's own onUpdate isn't subject to    ──
    // that — it fires on every scroll-position update regardless.          ──
    const clearWCOnSettle = (targets) => (self) => {
      if (self.progress === 0 || self.progress === 1) gsap.set(targets, { clearProps: 'willChange' })
    }

    const group1 = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 0.5,
        onUpdate: clearWCOnSettle(textItems),
      },
    })
    group1.to(textItems, { opacity: 1, y: 0, ease: 'power2.out', stagger: 0.3, force3D: true }, 0)

    const group2 = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 50%',
        end: '+=500',
        scrub: 0.5,
        onUpdate: clearWCOnSettle([leftLightRef.current, rightLightRef.current, coupleEntranceRef.current, leftItemsRef.current, rightItemsRef.current]),
      },
    })
    group2
      .to(leftLightRef.current,      { opacity: 1, x: 0, ease: 'power2.out' }, 0)
      .to(rightLightRef.current,     { opacity: 1, x: 0, ease: 'power2.out' }, 0)
      .to(coupleEntranceRef.current, { opacity: 1, scale: 1, ease: 'power2.out' }, 0.15)
      .to(leftItemsRef.current,      { opacity: 1, x: 0, ease: 'power2.out' }, 0.1)
      .to(rightItemsRef.current,     { opacity: 1, x: 0, ease: 'power2.out' }, 0.25)

    const breathe = gsap.to(coupleBreatheRef.current, {
      scale: 1.035,
      duration: 1.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => {
      group1.scrollTrigger?.kill()
      group1.kill()
      group2.scrollTrigger?.kill()
      group2.kill()
      breathe.kill()
    }
  }, [])

  return (
    <div className="relative w-full h-dvh overflow-hidden">

      {/* ── Background — Afghan-inspired lounge ─────────────── */}
      <img
        src={page7Bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Hanging lanterns — upper-left corner ─────────────── */}
      {/* top — stays at 20% (same as before) on short screens (≤700px      */}
      {/* tall); on long-height screens it moves down, capped at 24%. Tweak */}
      {/* the 700px baseline, the 0.02 rate, or the 24% cap below.          */}
      {/* width — stays at 38% (same as before) on short screens, grows on  */}
      {/* long-height screens, capped at 46%. Tweak baseline/rate/cap.      */}
      <img
        ref={leftLightRef}
        src={page7Leftlight}
        alt=""
        className="absolute left-0 z-10"
        style={{
          opacity: 0, transform: 'translateX(-100px)', willChange: 'transform, opacity',
          top: 'clamp(29%, calc(29% + (100dvh - 700px) * 0.90), 30%)',
          width: 'clamp(28%, calc(35% + (100dvh - 700px) * 0.1), 44%)',
        }}
      />

      {/* ── String-light garland — draped across the top ─────── */}
      {/* top — stays at 24% (same as before) on short screens, moves down  */}
      {/* on long-height screens, capped at 28%. Tweak baseline/rate/cap.   */}
      {/* width — stays at 68% (same as before) on short screens, grows on  */}
      {/* long-height screens, capped at 76%. Tweak baseline/rate/cap.      */}
      <img
        ref={rightLightRef}
        src={page7Rightlight}
        alt=""
        className="absolute right-0 z-10"
        style={{
          opacity: 0, transform: 'translateX(100px)', willChange: 'transform, opacity',
          top: 'clamp(36%, calc(36% + (100dvh - 700px) * 0.12), 38%)',
          width: 'clamp(64%, calc(66% + (100dvh - 700px) * 0.58), 60%)',
        }}
      />

      {/* ── Left floor decor — vases, lantern, candle trail ──── */}
      {/* bottom — stays at 8% (short screens, ≤700px tall) growing to 12%  */}
      {/* on long screens. left — stays flush at 0% growing inward to 3%.   */}
      {/* width — stays at 40% growing to 50%. Tweak baseline/rate/caps.    */}
      <img
        ref={leftItemsRef}
        src={page7Leftitems}
        alt=""
        className="absolute z-10"
        style={{
          opacity: 0, transform: 'translateX(-100px)', willChange: 'transform, opacity',
          bottom: 'clamp(6%, calc(6% + (100dvh - 700px) * 0.02), 12%)',
          left: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.015), 3%)',
          width: 'clamp(44%, calc(44% + (100dvh - 700px) * 0.2), 50%)',
        }}
      />

      {/* ── Right side-table decor — vases and candles ────────── */}
      {/* bottom — stays at 10% growing to 14% on long screens. right —    */}
      {/* stays flush at 0% growing inward to 3%. width — stays at 38%     */}
      {/* growing to 48%. Tweak baseline/rate/caps.                        */}
      <img
        ref={rightItemsRef}
        src={page7Rightitems}
        alt=""
        className="absolute z-10"
        style={{
          opacity: 0, transform: 'translateX(100px)', willChange: 'transform, opacity',
          bottom: 'clamp(14.5%, calc(14.5% + (100dvh - 700px) * 0.02), 14%)',
          right: 'clamp(0%, calc(0% + (100dvh - 700px) * 1.02), 0%)',
          width: 'clamp(60%, calc(60% + (100dvh - 700px) * 0.8), 65%)',
        }}
      />

      {/* ── Text stack — every text image lives here, in order ── */}
      {/* top — stays at 6% (same as before) on short screens (≤700px tall);  */}
      {/* on taller screens it moves down, capped at 10%. Tweak the 700px      */}
      {/* baseline, the 0.02 rate, or the 10% cap below.                       */}
      {/* gap — stays at 0.75rem (same as before) on short screens, grows on   */}
      {/* taller screens, capped at 1.75rem. Tweak the rate/cap below.         */}
      {/* Each image below has its own width clamp (grows on tall screens,    */}
      {/* capped) and its own extra marginBottom clamp (on top of any mt-*    */}
      {/* class already on it) — tune the baseline/rate/cap on each           */}
      {/* independently.                                                       */}
      <div
        ref={stackRef}
        className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-20"
        style={{
          top: 'clamp(8%, calc(8% + (100dvh - 700px) * 0.08), 20%)',
          gap: 'clamp(0.4rem, calc(0.4rem + (100dvh - 700px) * 0.005), 1.75rem)',
        }}
      >

        {/* Text 1 — A Night of Afghan Elegance */}
        <img
          src={page7Text1}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(55%, calc(55% + (100dvh - 700px) * 0.58), 68%)',
            marginBottom: 'clamp(0.3rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 2 — Join us for a cocktail evening ... */}
        <img
          src={page7Text2}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(74%, calc(72% + (100dvh - 700px) * 0.28), 80%)',
            marginBottom: 'clamp(0.2rem, calc(0.2rem + (100dvh - 700px) * 0.55), 1.25rem)',
          }}
        />

        {/* Text 3 — Wednesday, 14th October 2026 */}
        <img
          src={page7Text3}
          alt=""
          className="mt-3"
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(45%, calc(45% + (100dvh - 700px) * 0.68), 53%)',
            marginBottom: 'clamp(0.2rem, calc(0rem + (100dvh - 700px) * 0.5), 1rem)',
          }}
        />

        {/* Text 4 — 7:00 pm onwards / NTB Hall, Tivoli, Chattarpur */}
        <img
          src={page7Text4}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(22%, calc(22% + (100dvh - 700px) * 0.28), 30%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

      </div>

      {/* ── Couple — bottom-anchored, standing on the rug ────── */}
      {/* width — stays at 50% (same as before) on short screens (≤700px    */}
      {/* tall), grows on long-height screens, capped at 58%. Tweak         */}
      {/* baseline/rate/cap.                                                 */}
      {/* left — stays at 24% (same as before) on short screens, shifts     */}
      {/* right on long-height screens, capped at 28%. Tweak baseline/rate/ */}
      {/* cap.                                                               */}
      {/* This outer div owns the existing position (left/width clamps) —   */}
      {/* untouched by GSAP. coupleEntranceRef (scroll-tied scale-up) and    */}
      {/* coupleBreatheRef (infinite breathing zoom) are separate nested     */}
      {/* elements so neither transform clobbers the other.                  */}
      <div
        className="absolute bottom-[4%] z-20"
        style={{
          width: 'clamp(45%, calc(45% + (100dvh - 700px) * 0.48), 58%)',
          left: 'clamp(29%, calc(29% + (100dvh - 700px) * 0.02), 30%)',
        }}
      >
        <div ref={coupleEntranceRef} style={{ opacity: 0, transform: 'scale(0.85)', willChange: 'transform, opacity' }}>
          <img ref={coupleBreatheRef} src={page7Couple} alt="Couple" className="w-full block" style={{ willChange: 'transform' }} />
        </div>
      </div>
      {/* ↑ Adjust the width/left clamps to resize/reposition      */}

    </div>
  )
}

export default Page7
