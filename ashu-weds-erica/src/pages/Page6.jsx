import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import page6Bg        from '../assets/page6-bg.webp'
import page6Bottom    from '../assets/page6-bottom.webp'
import page6Lefttree  from '../assets/page6-lefttree.webp'
import page6Righttree from '../assets/page6-righttree.webp'
import page6Text1 from '../assets/page6-text1.webp'
import page6Text2 from '../assets/page6-text2.webp'
import page6Text3 from '../assets/page6-text3.webp'
import page6Text4 from '../assets/page6-text4.webp'
import page6Text5 from '../assets/page6-text5.webp'

const Page6 = () => {
  const stackRef      = useRef(null)
  const leftTreeRef   = useRef(null)
  const rightTreeRef  = useRef(null)

  // ── Text stack — scroll-scrubbed reveal, same as the other pages:    ──
  // progress tied directly to scroll position, drops in from above one  ──
  // at a time. Trees get a SEPARATE, differently-configured scrub       ──
  // (scale-up from smaller + fade, own start/end range) instead of the  ──
  // text's translate — a distinct effect, not just a copy. Tune         ──
  // `start`/`end`/`stagger` below to adjust feel/pace on either.        ──
  useEffect(() => {
    const textItems = gsap.utils.toArray(stackRef.current.children)

    // See Page2/Page7 for why this uses scrollTrigger's onUpdate rather   ──
    // than the timeline's onComplete to release will-change.              ──
    const clearWCOnSettle = (targets) => (self) => {
      if (self.progress === 0 || self.progress === 1) gsap.set(targets, { clearProps: 'willChange' })
    }

    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 0.5,
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

    const treesTl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 60%',
        end: 'top 10%',
        scrub: 0.4,
        onUpdate: clearWCOnSettle([leftTreeRef.current, rightTreeRef.current]),
      },
    })
    treesTl
      .to(leftTreeRef.current,  { opacity: 1, x: 0, scale: 1, ease: 'power2.out' }, 0)
      .to(rightTreeRef.current, { opacity: 1, x: 0, scale: 1, ease: 'power2.out' }, 0.15)

    return () => {
      textTl.scrollTrigger?.kill()
      textTl.kill()
      treesTl.scrollTrigger?.kill()
      treesTl.kill()
    }
  }, [])

  return (
    <div className="relative w-full h-dvh overflow-hidden">

      {/* ── Background — sky ─────────────────────────────────── */}
      <img
        src={page6Bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Bottom — pool deck & cabanas, same canvas as the bg, ── */}
      {/* so it's full width/height and stays pixel-aligned.        */}
      <img
        src={page6Bottom}
        alt=""
        className="absolute inset-0 w-full h-full object-center z-30"
      />

      {/* ── Left palm tree — top-left corner ──────────────────── */}
      {/* top — stays at 0% growing to 3% on long screens. left —  */}
      {/* stays flush at 0% growing inward to 3%. width — stays at */}
      {/* 30% growing to 38%. Tweak baseline/rate/caps below.      */}
      <img
        ref={leftTreeRef}
        src={page6Righttree}
        alt=""
        className="absolute z-5"
        style={{
          opacity: 0, transform: 'translateX(-120px) scale(0.6)', willChange: 'transform, opacity',
          top: 'clamp(36%, calc(36% + (100dvh - 700px) * 0.15), 39%)',
          left: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.015), 3%)',
          width: 'clamp(60%, calc(60% + (100dvh - 700px) * 0.08), 38%)',
        }}
      />

      {/* ── Right palm trees — top-right corner ───────────────── */}
      {/* top — stays at 0% growing to 3% on long screens. right — */}
      {/* stays flush at 0% growing inward to 3%. width — stays at */}
      {/* 38% growing to 46%. Tweak baseline/rate/caps below.      */}
      <img
        ref={rightTreeRef}
        src={page6Lefttree}
        alt=""
        className="absolute z-5"
        style={{
          opacity: 0, transform: 'translateX(120px) scale(0.6)', willChange: 'transform, opacity',
          top: 'clamp(18%, calc(18% + (100dvh - 700px) * 0.015), 3%)',
          right: 'clamp(0%, calc(0% + (100dvh - 700px) * 0.015), 3%)',
          width: 'clamp(25%, calc(25% + (100dvh - 700px) * 0.08), 46%)',
        }}
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
        className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-10"
        style={{
          top: 'clamp(3%, calc(7% + (100dvh - 700px) * 0.02), 9%)',
          gap: 'clamp(0.2rem, calc(0.8rem + (100dvh - 700px) * 0.005), 2rem)',
        }}
      >

        {/* Text 1 — Sip, Splash & Celebrate */}
        <img
          src={page6Text1}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(58%, calc(65% + (100dvh - 700px) * 0.29), 70%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 2 — Making waves, raising glasses, and celebrating love */}
        <img
          src={page6Text2}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(64%, calc(64% + (100dvh - 700px) * 0.08), 68%)',
            marginBottom: 'clamp(1rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 3 — Wednesday, 14th October 2026 */}
        <img
          src={page6Text3}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(46%, calc(48% + (100dvh - 700px) * 0.19), 54%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 4 — 1:00 pm onwards */}
        <img
          src={page6Text4}
          alt=""
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(21%, calc(25% + (100dvh - 700px) * 0.08), 29%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.13), 1.25rem)',
          }}
        />

        {/* Text 5 — Aria, Tivoli, Chattarpur */}
        <img
          src={page6Text5}
          alt=""
          className="mt-2"
          style={{
            opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity',
            width: 'clamp(23%, calc(23% + (100dvh - 700px) * 0.08), 31%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

      </div>

    </div>
  )
}

export default Page6
