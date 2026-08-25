import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import page4Bg          from '../assets/page4-bg.webp'
import page4Couple      from '../assets/page4-couple.webp'
import page4Peacock     from '../assets/page4-peacock.webp'
import page4Leftflower  from '../assets/page4-leftflower.webp'
import page4Rightflower from '../assets/page4-rightflower.webp'
import page4Text1  from '../assets/page4-text1.webp'
import page4Text2  from '../assets/page4-text2.webp'
import page4Text3  from '../assets/page4-text3.webp'
import page4Text4  from '../assets/page4-text4.webp'
import page4Text5  from '../assets/page4-text5.webp'
import page4Text6  from '../assets/page4-text6.webp'

const Page4 = () => {
  const stackRef        = useRef(null)
  const peacockRef       = useRef(null)
  const leftflowerRef    = useRef(null)
  const rightflowerRef   = useRef(null)
  const coupleEntranceRef = useRef(null)
  const coupleBreatheRef  = useRef(null)

  // ── Scroll-linked reveal — same scrub approach as Page2/Page3: progress ──
  // is tied directly to scroll position within the trigger range, so       ──
  // scrolling down plays it forward and scrolling back up reverses it.     ──
  // Text images drop in from above, one after another. Separately: the     ──
  // peacock slides in from the right, both flowers rise in from below,     ──
  // and the couple scales up from slightly smaller — all in the same       ──
  // reversible scroll range. Tune `start`/`end`/`stagger` below to adjust  ──
  // feel/pace.                                                              ──
  useEffect(() => {
    const textItems = gsap.utils.toArray(stackRef.current.children)

    // Drops will-change once a scrub range settles at either end (0 =      ──
    // fully hidden, 1 = fully revealed) — via scrollTrigger's own          ──
    // onUpdate rather than the timeline's onComplete, since under scrub    ──
    // that callback can get silently skipped if a later                   ──
    // ScrollTrigger.refresh() elsewhere on the page (e.g. Page10's, once   ──
    // its async map iframes load) resyncs progress to 1 without a normal   ──
    // forward render pass.                                                 ──
    const clearWCOnSettle = (targets) => (self) => {
      if (self.progress === 0 || self.progress === 1) gsap.set(targets, { clearProps: 'willChange' })
    }

    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 90%',
        end: 'top 30%',
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: clearWCOnSettle(textItems),
      },
    })
    textTl.to(textItems, {
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      stagger: 0.3,
      force3D: true,
    })

    // Same scrub approach as the text stack — progress tied directly to    ──
    // scroll position within the trigger range, starting later (40% down   ──
    // the viewport instead of 90%).                                        ──
    const elementsTl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 60%',
        end: '+=600',
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: clearWCOnSettle([peacockRef.current, leftflowerRef.current, rightflowerRef.current, coupleEntranceRef.current]),
      },
    })
    elementsTl
      .to(peacockRef.current,        { opacity: 1, x: 0, ease: 'power2.out' }, 0)
      .to(leftflowerRef.current,     { opacity: 1, y: 0, ease: 'power2.out' }, 0.1)
      .to(rightflowerRef.current,    { opacity: 1, y: 0, ease: 'power2.out' }, 0.2)
      .to(coupleEntranceRef.current, { opacity: 1, scale: 1, ease: 'power2.out' }, 0.15)

    // Couple's continuous subtle breathing zoom in/out, in place — an     ──
    // independent infinite loop (not scroll-linked), running on a         ──
    // separate inner element so it never fights the scroll-tied scale     ──
    // entrance above for control of the same transform.                   ──
    const breathe = gsap.to(coupleBreatheRef.current, {
      scale: 1.035,
      duration: 1.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => {
      textTl.scrollTrigger?.kill()
      textTl.kill()
      elementsTl.scrollTrigger?.kill()
      elementsTl.kill()
      breathe.kill()
    }
  }, [])

  return (
    <div className="relative w-full h-dvh overflow-hidden">

      {/* ── Background — garden scene ───────────────────────── */}
      <img
        src={page4Bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Text stack — every text image lives here, in order ── */}
      {/* top — stays at 5% (same as before) on short screens (≤700px tall);  */}
      {/* on taller screens it moves down, capped at 9%. Tweak the 700px       */}
      {/* baseline, the 0.02 rate, or the 9% cap below.                        */}
      {/* gap — stays at 1rem (same as before) on short screens, grows on      */}
      {/* taller screens, capped at 2rem. Tweak the rate/cap below.            */}
      {/* Each image below has its own width clamp (grows on tall screens,    */}
      {/* capped) and its own extra marginBottom clamp (on top of any mt-*    */}
      {/* class already on it) — tune the baseline/rate/cap on each           */}
      {/* independently.                                                       */}
      <div
        ref={stackRef}
        className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-20 "
        style={{
          top: 'clamp(3%, calc(3% + (100dvh - 700px) * 0.12), 9%)',
          gap: 'clamp(0.2rem, calc(0.5rem + (100dvh - 700px) * 0.004), 2rem)',
        }}
      >

        {/* Text 1 — Mehndi & Sangeet Soirée */}
        <img
          src={page4Text1}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(52%, calc(60% + (100dvh - 700px) * 0.38), 67%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 2 — An afternoon & evening of music, mehndi, dance & celebration */}
        <img
          src={page4Text2}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(65%, calc(72% + (100dvh - 700px) * 0.08), 77%)',
            marginBottom: 'clamp(0.5rem, calc(0rem + (100dvh - 700px) * 0.115), 1.25rem)',
          }}
        />

        {/* Text 3 — Tuesday, 13th October 2026 */}
        <img
          src={page4Text3}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(45%, calc(45% + (100dvh - 700px) * 0.08), 49%)',
            marginBottom: 'clamp(0.5rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 4 — 3:00 pm onwards */}
        <img
          src={page4Text4}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(19%, calc(27% + (100dvh - 700px) * 0.28), 27%)',
            marginBottom: 'clamp(0.3rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 5 — Aria, Tivoli, Chattarpur */}
        <img
          src={page4Text5}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(25%, calc(25% + (100dvh - 700px) * 0.08), 29%)',
            marginBottom: 'clamp(0.2rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 6 — A joint celebration, lovingly hosted by both families */}
        <img
          src={page4Text6}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(41%, calc(48% + (100dvh - 700px) * 0.18), 49%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

      </div>

      {/* ── Couple — bottom-anchored, not a full-canvas asset ── */}
      {/* width — stays at 75% (same as before) on short screens (≤700px    */}
      {/* tall); on long-height screens it grows, capped at 85%. Tweak the  */}
      {/* 700px baseline, the 0.08 rate, or the 85% cap below.               */}
      {/* horizontal shift — stays centered (0px, same as before) on short  */}
      {/* screens (≤700px tall); on long-height screens it shifts right,    */}
      {/* capped at 60px. Tweak the 700px baseline, the 0.3 rate, or the    */}
      {/* 60px cap below.                                                    */}
      {/* This outer div owns the existing position shift (the clamp-based  */}
      {/* translateX below) — untouched by GSAP. coupleEntranceRef (scroll- */}
      {/* tied scale-up) and coupleBreatheRef (infinite breathing zoom) are */}
      {/* separate nested elements so none of the three transforms clobber  */}
      {/* each other.                                                       */}
      <div
        className="absolute bottom-2 left-1/2 z-10"
        style={{
          width: 'clamp(75%, calc(75% + (100dvh - 700px) * 0.58), 85%)',
          transform: 'translateX(calc(-40% + clamp(-40%, (100dvh - 700px) * 0.3, -10%)))',
        }}
      >
        <div ref={coupleEntranceRef} style={{ opacity: 0, transform: 'scale(0.85)' }}>
          <img ref={coupleBreatheRef} src={page4Couple} alt="Couple" className="w-full block" />
        </div>
      </div>
      {/* ↑ Adjust the width clamp to resize, bottom-4 to move up/down    */}

      {/* ── Peacock — top-right corner ────────────────────────── */}
      {/* top — stays at 26% (short screens, ≤700px tall) growing to 30%   */}
      {/* on long screens. right — stays at -2% on short screens, and on   */}
      {/* long screens goes further negative (pushed further off-edge),    */}
      {/* capped at -5%. Tweak the 700px baseline, rate, or cap below.     */}
      <img
        ref={peacockRef}
        src={page4Peacock}
        alt=""
        className="absolute z-20"
        style={{
          opacity: 0, transform: 'translateX(80px)',
          top: 'clamp(34%, calc(34% + (100dvh - 700px) * 0.02), 30%)',
          right: 'clamp(-2%, calc(-5% - (100dvh - 700px) * 0.81), -10%)',
          width: 'clamp(30%, calc(30% + (100dvh - 700px) * 0.28), 42%)',
        }}
      />

      {/* ── Left flower bouquet — bottom-left corner ──────────── */}
      {/* left — stays flush at 0% growing inward to 3% on long screens.   */}
      {/* width — stays at 40% growing to 48%. Tweak baseline/rate/caps.   */}
      <img
        ref={leftflowerRef}
        src={page4Leftflower}
        alt=""
        className="absolute bottom-0 z-20"
        style={{
          opacity: 0, transform: 'translateY(60px)',
          left: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.005), 3%)',
          width: 'clamp(40%, calc(40% + (100dvh - 700px) * 0.48), 54%)',
        }}
      />

      {/* ── Right flower accent — bottom-right corner ─────────── */}
      {/* right — stays flush at 0% growing inward to 3% on long screens.  */}
      {/* width — stays at 26% growing to 34%. Tweak baseline/rate/caps.   */}
      <img
        ref={rightflowerRef}
        src={page4Rightflower}
        alt=""
        className="absolute bottom-0 z-20"
        style={{
          opacity: 0, transform: 'translateY(60px)',
          right: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.015), 3%)',
          width: 'clamp(22%, calc(22% + (100dvh - 700px) * 0.02), 27%)',
        }}
      />

    </div>
  )
}

export default Page4
