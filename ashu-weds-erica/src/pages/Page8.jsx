import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import page8Bg          from '../assets/page8-bg.webp'
import page8Couple      from '../assets/page8-couple.webp'
import page8Left        from '../assets/page8-left.webp'
import page8Right       from '../assets/page8-right.webp'
import page8Flower      from '../assets/page8-flower.webp'
import page8Leftflower  from '../assets/page8-leftright.webp'
import page8Rightflower from '../assets/page8-rightflower.webp'
import page8Leftitem    from '../assets/page8-leftitem.webp'
import page8Rightitem   from '../assets/page8-rightitem.webp'
import page8Text1  from '../assets/page8-text1.webp'
import page8Text2  from '../assets/page8-text2.webp'
import page8Text3  from '../assets/page8-text3.webp'
import page8Text4  from '../assets/page8-text4.webp'

const Page8 = () => {
  const stackRef          = useRef(null)
  const text1Ref          = useRef(null)
  const text2Ref          = useRef(null)
  const text3Ref          = useRef(null)
  const text4Ref          = useRef(null)
  const flowerRef         = useRef(null)
  const leftRef           = useRef(null)
  const rightRef          = useRef(null)
  const leftflowerRef     = useRef(null)
  const rightflowerRef    = useRef(null)
  const leftitemRef       = useRef(null)
  const rightitemRef      = useRef(null)
  const coupleEntranceRef = useRef(null)
  const coupleBreatheRef  = useRef(null)

  // ── Two scroll-scrubbed groups, both reversible with scroll direction: ──
  // (1) every text image + page8Flower — start 'top 80%' end 'top 30%',    ──
  // all drop in from above, one after another.                             ──
  // (2) everything else — start 'top 60%' end '+=600'. Each slides in      ──
  // from its own named side (left-* from the left, right-* from the        ──
  // right), except: the pendant lights (page8Left/page8Right) drop in      ──
  // from ABOVE instead, and the couple slides in from BELOW.               ──
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
        end: 'top 30%',
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: clearWCOnSettle([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current, flowerRef.current]),
      },
    })
    group1
      .to(text1Ref.current,  { opacity: 1, y: 0, ease: 'power2.out' }, 0)
      .to(text2Ref.current,  { opacity: 1, y: 0, ease: 'power2.out' }, 0.1)
      .to(text3Ref.current,  { opacity: 1, y: 0, ease: 'power2.out' }, 0.2)
      .to(text4Ref.current,  { opacity: 1, y: 0, ease: 'power2.out' }, 0.3)
      .to(flowerRef.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.4)

    const group2 = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 60%',
        end: '+=500',
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: clearWCOnSettle([leftRef.current, rightRef.current, leftflowerRef.current, rightflowerRef.current, leftitemRef.current, rightitemRef.current, coupleEntranceRef.current]),
      },
    })
    group2
      .to(leftRef.current,           { opacity: 1, y: 0, ease: 'power2.out' }, 0)
      .to(rightRef.current,          { opacity: 1, y: 0, ease: 'power2.out' }, 0)
      .to(leftflowerRef.current,     { opacity: 1, x: 0, ease: 'power2.out' }, 0.1)
      .to(rightflowerRef.current,    { opacity: 1, x: 0, ease: 'power2.out' }, 0.1)
      .to(leftitemRef.current,       { opacity: 1, x: 0, ease: 'power2.out' }, 0.2)
      .to(rightitemRef.current,      { opacity: 1, x: 0, ease: 'power2.out' }, 0.2)
      .to(coupleEntranceRef.current, { opacity: 1, y: 0, ease: 'power2.out' }, 0.3)

    // Couple's continuous subtle breathing zoom in/out, in place — an     ──
    // independent infinite loop (not scroll-linked), running on a         ──
    // separate inner element so it never fights the scroll-tied slide-up  ──
    // entrance above for control of the same transform.                   ──
    const breathe = gsap.to(coupleBreatheRef.current, {
      scale: 1.035,
      duration: 1.5,
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

      {/* ── Background — mandap, curtains & flowers ─────────── */}
      <img
        src={page8Bg}
        alt=""
        className="absolute inset-0 w-full h-full object-center z-0"
      />

      {/* ── Couple — standalone, bottom-anchored (no longer pixel-  */}
      {/* locked to the bg's mandap art). width — stays at 90% (short */}
      {/* screens, ≤700px tall) growing to 100% on long screens.     */}
      {/* bottom — stays at 0% growing to 4%. Tweak baseline/rate/caps. */}
      {/* Outer div owns the existing centering transform; coupleEntranceRef */}
      {/* (scroll-tied slide-up-from-below) is a separate nested element so  */}
      {/* the two transforms never clobber each other.                      */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-15"
        style={{
          width: 'clamp(92%, calc(92% + (100dvh - 700px) * 0.08), 100%)',
          bottom: 'clamp(2%, calc(2% + (100dvh - 700px) * 0.0), 2%)',
        }}
      >
        <div
          ref={coupleEntranceRef}
          style={{ opacity: 0, transform: 'translateY(60px)' }}
        >
          <img
            ref={coupleBreatheRef}
            src={page8Couple}
            alt="Couple"
            className="w-full block"
          />
        </div>
      </div>

      {/* ── Hanging pendant lights — left & right edges ──────── */}
      {/* left/right — stay at 0% (same as before) on short screens (≤700px  */}
      {/* tall); on long-height screens they move inward, capped at 4%.      */}
      {/* Tweak the 700px baseline, the 0.02 rate, or the 4% cap below.      */}
      <img
        ref={leftRef}
        src={page8Left}
        alt=""
        className="absolute top-0 w-[14%] z-20"
        style={{
          opacity: 0, transform: 'translateY(-60px)',
          left: 'clamp(0%, calc(60% + (100dvh - 700px) * 0.02), 4%)',
        }}
      />
      <img
        ref={rightRef}
        src={page8Right}
        alt=""
        className="absolute top-0 w-[14%] z-20"
        style={{
          opacity: 0, transform: 'translateY(-60px)',
          right: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.02), 4%)',
        }}
      />

      {/* ── Curtain flower vines — left & right edges, top-to-bottom ── */}
      {/* left/right — stay flush at 0% growing inward to 3% on long       */}
      {/* screens. height — stays at 92% growing to 100% (width follows    */}
      {/* automatically via the 208/923 aspect ratio). Tweak baseline/     */}
      {/* rate/caps below.                                                  */}
      <img
        ref={leftflowerRef}
        src={page8Leftflower}
        alt=""
        className="absolute top-0 z-10"
        style={{
          opacity: 0, transform: 'translateX(-100px)',
          left: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.015), 3%)',
          height: 'clamp(50%, calc(50% + (100dvh - 700px) * 0.02), 100%)',
          aspectRatio: '208 / 923',
        }}
      />
      <img
        ref={rightflowerRef}
        src={page8Rightflower}
        alt=""
        className="absolute top-0 z-10"
        style={{
          opacity: 0, transform: 'translateX(100px)',
          right: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.015), 3%)',
          height: 'clamp(50%, calc(50% + (100dvh - 700px) * 0.02), 100%)',
          aspectRatio: '208 / 923',
        }}
      />

      {/* ── Floor vases & candles — bottom-left & bottom-right ──────── */}
      {/* bottom — stays at 2% growing to 6% on long screens. left/right — */}
      {/* stay flush at 0% growing inward to 3%. width — stays at 20%      */}
      {/* growing to 28%. Tweak baseline/rate/caps below.                  */}
      <img
        ref={leftitemRef}
        src={page8Leftitem}
        alt=""
        className="absolute z-10"
        style={{
          opacity: 0, transform: 'translateX(-100px)',
          bottom: 'clamp(5%, calc(5% + (100dvh - 700px) * 0.02), 6%)',
          left: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.015), 3%)',
          width: 'clamp(21%, calc(21% + (100dvh - 700px) * 0.08), 28%)',
        }}
      />
      <img
        ref={rightitemRef}
        src={page8Rightitem}
        alt=""
        className="absolute z-10"
        style={{
          opacity: 0, transform: 'translateX(100px)',
          bottom: 'clamp(5%, calc(5% + (100dvh - 700px) * 0.02), 6%)',
          right: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.015), 3%)',
          width: 'clamp(21%, calc(21% + (100dvh - 700px) * 0.08), 28%)',
        }}
      />

      {/* ── Text stack — every text image lives here, in order ── */}
      {/* top — stays at 4% (same as before) on short screens (≤700px tall);  */}
      {/* on taller screens it moves down, capped at 8%. Tweak the 700px       */}
      {/* baseline, the 0.02 rate, or the 8% cap below.                        */}
      {/* gap — stays at 0.75rem (same as before) on short screens, grows on   */}
      {/* taller screens, capped at 1.75rem. Tweak the rate/cap below.         */}
      {/* Each image below has its own width clamp (grows on tall screens,    */}
      {/* capped) and its own extra marginBottom clamp (on top of any mt-*    */}
      {/* class already on it) — tune the baseline/rate/cap on each           */}
      {/* independently.                                                       */}
      <div
        ref={stackRef}
        className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-30"
        style={{
          top: 'clamp(11%, calc(8% + (100dvh - 700px) * 0.02), 8%)',
          gap: 'clamp(0.75rem, calc(0.75rem + (100dvh - 700px) * 0.005), 1.75rem)',
        }}
      >

        {/* Text 1 — The Wedding Day */}
        <img
          ref={text1Ref}
          src={page8Text1}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(40%, calc(40% + (100dvh - 700px) * 0.58), 57%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 2 — Join us as Ashu and Erica begin their forever */}
        <img
          ref={text2Ref}
          src={page8Text2}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(50%, calc(47% + (100dvh - 700px) * 0.58), 62%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 3 — Thursday, 15th October 2026 */}
        <img
          ref={text3Ref}
          src={page8Text3}
          alt=""
          className="mt-2 "
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(43%, calc(43% + (100dvh - 700px) * 0.38), 55%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 4 — full schedule block, with the flower ornament ── */}
        {/* dropped into its built-in blank gap                     */}
        <div
          ref={text4Ref}
          className="relative mt-2 "
          style={{
            opacity: 0, transform: 'translateY(-40px)',
            width: 'clamp(35%, calc(33% + (100dvh - 700px) * 0.23), 43%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        >
          <img src={page8Text4} alt="" className="w-full" />
          {/* Outer span owns the existing centering transform; flowerRef  */}
          {/* (scroll-tied slide-down-from-above) is separate so the two   */}
          {/* transforms never clobber each other.                        */}
          <span className="absolute top-[52%] left-1/2 -translate-x-1/2 w-[21%] block">
            <img
              ref={flowerRef}
              src={page8Flower}
              alt=""
              className="w-full block"
              style={{ opacity: 0, transform: 'translateY(-40px)' }}
            />
          </span>
          {/* ↑ top-[50%] targets the gap baked into text4 — nudge if it drifts */}
        </div>

      </div>

    </div>
  )
}

export default Page8
