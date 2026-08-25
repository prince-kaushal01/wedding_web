import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import page2Bg    from '../assets/page2-bg.webp'
import page2Text1 from '../assets/page2-text1.webp'
import page2Text2 from '../assets/page2-text2.webp'
import page2Text3 from '../assets/page2-text3.webp'
import page2Text4 from '../assets/page2-text4.webp'
import page2Text5 from '../assets/page2-text5.webp'
import page2Text6 from '../assets/page2-text6.webp'
import page2Text7 from '../assets/page2-text7.webp'
import page2Text8 from '../assets/page2-text8.webp'
import page2Text9 from '../assets/page2-text9.webp'

// Shared starting state for every text image — opacity 0, offset up.  ──
// Set inline (not via JS) so the browser paints them already-hidden    ──
// from the first frame; no flash of visible content before the         ──
// scroll-triggered animation takes over.                               ──
const hidden = { opacity: 0, transform: 'translateY(-40px)' }

const Page2 = () => {
  const stackRef = useRef(null)

  // ── Scroll-linked reveal — progress is tied directly to how far the ──
  // user has scrolled through the trigger range (scrub), not a one-shot ──
  // timed animation. Scroll further down → more text images drop in;    ──
  // scroll back up → they reverse right along with you. Pure transform/ ──
  // opacity, so it stays smooth. Tune `start`/`end` (the scroll distance ──
  // the whole reveal is spread across) or `stagger` below to adjust     ──
  // feel/pace.                                                          ──
  useEffect(() => {
    const items = gsap.utils.toArray(stackRef.current.children)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackRef.current,
        start: 'top 85%',
        end: '+=600',
        scrub: 0.5,
        // Recompute start/end pixel positions when ScrollTrigger.refresh  ──
        // fires (e.g. after mobile URL bar shows/hides or Page10's async  ──
        // iframes load). Without this, stale positions mean the trigger   ──
        // zone no longer matches the visible viewport — animations appear  ──
        // frozen or fire at the wrong scroll depth.                       ──
        invalidateOnRefresh: true,
      },
    })

    tl.to(items, {
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      stagger: 0.4,
      force3D: true,
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div className="relative w-full h-dvh overflow-hidden">

      {/* ── Background ──────────────────────────────────────── */}
      <img
        src={page2Bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Text stack — every text image lives here, in order ── */}
      {/* top — stays at 4% (same as before) on short screens (≤700px tall);  */}
      {/* on taller screens it moves down, capped at 8%. Tweak the 700px       */}
      {/* baseline, the 0.02 rate, or the 8% cap below.                        */}
      {/* Each image below has its own width clamp (grows on tall screens,    */}
      {/* capped) and its own extra marginBottom clamp (on top of the gap-4.5 */}
      {/* base spacing) — tune the baseline/rate/cap on each independently.   */}
      <div
        ref={stackRef}
        className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-10"
        style={{
          top: 'clamp(4%, calc(3% + (100dvh - 700px) * 0.25), 8%)',
          gap: 'clamp(1rem, calc(1rem + (100dvh - 700px) * 0.007), 2rem)',
        }}
      >

        {/* Text 1 — With the blessings of ... */}
        <img
          src={page2Text1}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(60%, calc(70% + (100dvh - 700px) * 0.28), 83%)',
            marginBottom: 'clamp(0.5rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 2 — Mrs. Manjit Kaur Chitkara & Mr. Tarlok Singh Chitkara ... */}
        <img
          src={page2Text2}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(60%, calc(70% + (100dvh - 700px) * 0.28), 88%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 3 — Jaswinder Singh Chitkara (Ashu) */}
        <img
          src={page2Text3}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(50%, calc(50% + (100dvh - 700px) * 0.69), 68%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 4 — Brother of ... */}
        <img
          src={page2Text4}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(58%, calc(58% + (100dvh - 700px) * 0.28), 86%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 5 — and */}
        <img
          src={page2Text5}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(3%, calc(3% + (100dvh - 700px) * 0.18), 6%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 6 — Erica Kaur Arora */}
        <img
          src={page2Text6}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(27%, calc(27% + (100dvh - 700px) * 0.9), 39%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 7 — Granddaughter of ... */}
        <img
          src={page2Text7}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(62%, calc(62% + (100dvh - 700px) * 0.18), 72%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 8 — Daughter of ... */}
        <img
          src={page2Text8}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(65%, calc(65% + (100dvh - 700px) * 0.18), 72%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 9 — Sister of Trishna Kaur Arora */}
        <img
          src={page2Text9}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(23%, calc(23% + (100dvh - 700px) * 0), 31%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

      </div>

    </div>
  )
}

export default Page2
