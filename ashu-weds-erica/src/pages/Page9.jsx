import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import page9Bg        from '../assets/page9-bg.webp'
import page9Couple    from '../assets/page9-couple.webp'
import page9Lefttable from '../assets/page9-lefttable.webp'
import page9Text1  from '../assets/page9-text1.webp'
import page9Text2  from '../assets/page9-text2.webp'
import page9Text3  from '../assets/page9-text3.webp'
import page9Text4  from '../assets/page9-text4.webp'
import page9Text5  from '../assets/page9-text5.webp'

const Page9 = () => {
  const stackRef          = useRef(null)
  const text1Ref          = useRef(null)
  const text2Ref          = useRef(null)
  const text3Ref          = useRef(null)
  const text4Ref          = useRef(null)
  const text5Ref          = useRef(null)
  const tableRef          = useRef(null)
  const coupleEntranceRef = useRef(null)
  const coupleBreatheRef  = useRef(null)

  // ── Two scroll-scrubbed groups, both reversible with scroll direction, ──
  // sharing the SAME start/end range: (1) every text image, dropping in   ──
  // from above one after another; (2) the table (slides in from the       ──
  // left) and the couple (scales up + fades in). Couple's continuous      ──
  // breathing zoom is a separate infinite loop, unrelated to scroll, on   ──
  // its own inner element so it never fights the scroll-tied scale        ──
  // entrance for control of the same transform.                          ──
  useEffect(() => {
    // See Page2/Page7 for why this uses scrollTrigger's onUpdate rather   ──
    // than the timeline's onComplete to release will-change.              ──
    const clearWCOnSettle = (targets) => (self) => {
      if (self.progress === 0 || self.progress === 1) gsap.set(targets, { clearProps: 'willChange' })
    }

    const group1 = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: clearWCOnSettle([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current, text5Ref.current]),
      },
    })
    group1
      .to(text1Ref.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0)
      .to(text2Ref.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.1)
      .to(text3Ref.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.2)
      .to(text4Ref.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.3)
      .to(text5Ref.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.4)

    const group2 = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 40%',
        end: 'top 0%',
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: clearWCOnSettle([tableRef.current, coupleEntranceRef.current]),
      },
    })
    group2
      .to(tableRef.current,          { opacity: 1, x: 0, ease: 'power2.out' }, 0)
      .to(coupleEntranceRef.current, { opacity: 1, scale: 1, ease: 'power2.out' }, 0.1)

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

      {/* ── Background — floral aisle ────────────────────────── */}
      <img
        src={page9Bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Left table — vases & candles, bottom-left corner ──── */}
      {/* bottom — stays at 0% (short screens, ≤700px tall) growing to 4%  */}
      {/* on long screens. left — stays flush at 0% growing inward to 3%.  */}
      {/* width — stays at 38% growing to 46%. Tweak baseline/rate/caps.   */}
      <img
        ref={tableRef}
        src={page9Lefttable}
        alt=""
        className="absolute z-30"
        style={{
          opacity: 0, transform: 'translateX(-100px)',
          bottom: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.02), 4%)',
          left: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.015), 3%)',
          width: 'clamp(46%, calc(48% + (100dvh - 700px) * 0.08), 46%)',
        }}
      />

      {/* ── Couple — bottom-anchored, positioned from the right   */}
      {/* (not centered) to sit clear of the left table above.    */}
      {/* width — stays at 50% growing to 60% on long screens.    */}
      {/* bottom — stays at 5% growing to 9%. right — stays at 8%  */}
      {/* growing to 12%. Tweak baseline/rate/caps below.          */}
      {/* Outer div owns the existing position (bottom/right/width) —      */}
      {/* untouched by GSAP. coupleEntranceRef (scroll-tied scale-up) and   */}
      {/* coupleBreatheRef (infinite breathing zoom) are separate nested    */}
      {/* elements so neither transform clobbers the other.                */}
      <div
        className="absolute z-20"
        style={{
          width: 'clamp(48%, calc(48% + (100dvh - 700px) * 0.18), 60%)',
          bottom: 'clamp(15%, calc(15% + (100dvh - 700px) * 0.02), 9%)',
          right: 'clamp(15%, calc(15% + (100dvh - 700px) * 0.02), 12%)',
        }}
      >
        <div ref={coupleEntranceRef} style={{ opacity: 0, transform: 'scale(0.85)' }}>
          <img ref={coupleBreatheRef} src={page9Couple} alt="Couple" className="w-full block" />
        </div>
      </div>

      {/* ── Text stack — sits right below "Reception" ───────── */}
      {/* top — stays at 11% (same as before) on short screens (≤700px      */}
      {/* tall); on taller screens it moves down, capped at 15%. Tweak the   */}
      {/* 700px baseline, the 0.02 rate, or the 15% cap below.               */}
      {/* gap — stays at 0.75rem (same as before) on short screens, grows    */}
      {/* on taller screens, capped at 1.75rem. Tweak the rate/cap below.    */}
      {/* Each image below has its own width clamp (grows on tall screens,  */}
      {/* capped) and its own extra marginBottom clamp (on top of any mt-*  */}
      {/* class already on it) — tune the baseline/rate/cap on each         */}
      {/* independently.                                                     */}
      <div
        ref={stackRef}
        className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-30 "
        style={{
          top: 'clamp(4%, calc(4% + (100dvh - 700px) * 0.52), 4%)',
          gap: 'clamp(0.4rem, calc(0.4rem + (100dvh - 700px) * 0.005), 1.75rem)',
        }}
      >
        <img
          ref={text1Ref}
          src={page9Text1}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(25%, calc(25% + (100dvh - 700px) * 0.28), 28%)',
            marginBottom: 'clamp(0.2rem, calc(0.2rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 2 — The Happily Ever After */}
        <img
          ref={text2Ref}
          src={page9Text2}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(47%, calc(47% + (100dvh - 700px) * 0.28), 56%)',
            marginBottom: 'clamp(0.3rem, calc(0.3rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 3 — Join us for an evening of celebration ... */}
        <img
          ref={text3Ref}
          src={page9Text3}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(72%, calc(72% + (100dvh - 700px) * 0.28), 80%)',
            marginBottom: 'clamp(0.4rem, calc(0.4rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 4 — Thursday, 15th October 2026 */}
        <img
          ref={text4Ref}
          src={page9Text4}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(50%, calc(50% + (100dvh - 700px) * 0.08), 54%)',
            marginBottom: 'clamp(0.3rem, calc(0.3rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 5 — 8:00 pm onwards / Oyester Greens / Tivoli, Chattarpur */}
        <img
          ref={text5Ref}
          src={page9Text5}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(21%, calc(21% + (100dvh - 700px) * 0.08), 29%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

      </div>

    </div>
  )
}

export default Page9
