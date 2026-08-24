import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import page5Bg    from '../assets/page5-bg.webp'
import page5Text1 from '../assets/page5-text1.webp'
import page5Text2 from '../assets/page5-text2.webp'
import page5Text3 from '../assets/page5-text3.webp'
import page5Text4 from '../assets/page5-text4.webp'
import page5Text5 from '../assets/page5-text5.webp'

const Page5 = () => {
  const stackRef = useRef(null)

  // ── Scroll-linked reveal — same scrub approach as the other pages:  ──
  // progress is tied directly to scroll position within the trigger    ──
  // range, so scrolling down plays it forward and scrolling back up    ──
  // reverses it. Every text image drops in from above, one after       ──
  // another. Tune `start`/`end`/`stagger` below to adjust feel/pace.   ──
  useEffect(() => {
    const items = gsap.utils.toArray(stackRef.current.children)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 90%',
        end: 'top 30%',
        scrub: 0.5,
        // See Page2 for why this uses scrollTrigger's onUpdate rather   ──
        // than the timeline's onComplete to release will-change.        ──
        onUpdate: (self) => {
          if (self.progress === 0 || self.progress === 1) gsap.set(items, { clearProps: 'willChange' })
        },
      },
    })

    tl.to(items, {
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      stagger: 0.3,
      force3D: true,
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div className="relative w-full h-dvh overflow-hidden">

      {/* ── Background — mandap hall ────────────────────────── */}
      <img
        src={page5Bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Text stack — every text image lives here, in order ── */}
      {/* top = starting y position. Stays at 29% (same as before) on short     */}
      {/* screens (≤700px tall); on taller screens it shifts down, capped at    */}
      {/* 38%. Tweak the 700px baseline, the 0.02 rate (use a negative rate to  */}
      {/* shift up instead), or the 38% cap below.                              */}
      {/* gap = spacing between text images. Stays at 1rem (same as before) on   */}
      {/* short screens (≤600px tall) and grows on taller screens, capped at     */}
      {/* 2.5rem. Tweak the 600px baseline, the 0.05 growth rate, or the 2.5rem  */}
      {/* cap below to adjust.                                                   */}
      <div
        ref={stackRef}
        className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-10"
        style={{
          top: 'clamp(30%, calc(30% + (100dvh - 700px) * 0.08), 25%)',
          gap: 'clamp(0.70rem, calc(0.70rem + (100dvh - 700px) * 0.05), 2.5rem)',
        }}
      >

        {/* Text 1 — Blessings Begin */}
        {/* width — same as before (35%) on short screens (≤700px tall), grows up to 43% on tall screens */}
        <img
          src={page5Text1}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(30%, calc(30% + (100dvh - 700px) * 0.9), 43%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 2 — Join us for a beautiful morning of blessings ... */}
        <img
          src={page5Text2}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(42%, calc(42% + (100dvh - 700px) * 0.39), 58%)',
            marginBottom: 'clamp(0.3rem, calc(0.3rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 3 — Wednesday, 14th October 2026 */}
        <img
          src={page5Text3}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(47%, calc(47% + (100dvh - 700px) * 0.30), 60%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 4 — Assembly - 8:00 am onwards / Blue Grotto (Breakfast Area) */}
        <img
          src={page5Text4}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(30%, calc(30% + (100dvh - 700px) * 0.19), 45%)',
          }}
        />

        {/* Text 5 — Guru Nanak Darbar, Manohar Nagar */}
        <img
          src={page5Text5}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(24%, calc(24% + (100dvh - 700px) * 0.17), 36%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

      </div>

    </div>
  )
}

export default Page5
