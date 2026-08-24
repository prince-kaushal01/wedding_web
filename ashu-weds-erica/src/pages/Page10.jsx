import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import page10Bg       from '../assets/page10-bg.webp'
import page10LogoTrim from '../assets/page10-logo-trim.webp'
import page10Text1    from '../assets/page10-text1.webp'
import page10Text2    from '../assets/page10-text2.webp'
import page10Text3Trim from '../assets/page10-text3-trim.webp'
import page10Text4    from '../assets/page10-text4.webp'
import page10Text5    from '../assets/page10-text5.webp'
import page10Text6Trim from '../assets/page10-text6-trim.webp'
import page10Text7    from '../assets/page10-text7.webp'
import page10Text8    from '../assets/page10-text8.webp'
import page10Location from '../assets/location.svg'
import page10Location2 from '../assets/location2.svg'

// ── Dummy placeholder locations/links — swap these for the real ones, ──
// then the embeds/buttons below update automatically.                  ──
const HOTEL_WEBSITE_URL = 'https://thetivolihotels.com/hotel/the-tivoli/'
const VENUE_1 = 'Tivoli, Chattarpur, New Delhi'
const VENUE_2 = 'https://maps.app.goo.gl/rtekhPRCX67AEHhu7'
// Map 2's real embed src (Gurudwara Sri Guru Nanak Sahib Ji) — provided   ──
// directly as a full Google Maps embed URL, since a share link like      ──
// VENUE_2 above can't be plugged into the `q=` query embed format below. ──
const VENUE_2_EMBED_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.583544018941!2d77.08089957528948!3d28.642241175659404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04924c9bc0cf%3A0x5751daf9147836a7!2sGurudwara%20Sri%20Guru%20Nanak%20Sahib%20Ji!5e0!3m2!1sen!2sin!4v1787564503949!5m2!1sen!2sin'
const mapEmbedUrl = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`
const mapDirectionsUrl = (q) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`

// Shared starting state for every scroll-animated element — opacity 0,  ──
// offset up. Set inline (not via JS) so the browser paints them          ──
// already-hidden from the first frame; no flash before the scroll-       ──
// triggered animation takes over. Only ever applied to an element with   ──
// no other transform of its own (the parent flex column owns the        ──
// centering transform, so GSAP never clobbers it).                      ──
const hidden = { opacity: 0, transform: 'translateY(-40px)', willChange: 'transform, opacity' }

const Page10 = () => {
  const stackRef = useRef(null)

  // ── Scroll-linked reveal — same scrub approach as the other pages,   ──
  // but each child gets its OWN trigger (same start/end as before:       ──
  // 'top 90%' / '+=600') instead of one shared trigger on the whole      ──
  // container. This page is ~1600px tall, so a single 600px-wide range   ──
  // for every item meant most of the later ones finished animating       ──
  // while still off-screen below the fold — they'd already be fully      ──
  // revealed by the time you scrolled to them, so nothing visibly        ──
  // moved. Per-element triggers mean each one animates exactly as IT     ──
  // scrolls into view, no matter how far down the page it sits.          ──
  // `end` is a FUNCTION here rather than a flat '+=600': the page height ──
  // is fixed at exactly 200dvh, so for items near the very bottom (the   ──
  // last map/button) a flat +600px can fall past the actual end of the   ──
  // document — there's nowhere left to scroll to, so that trigger could  ──
  // never reach 100% progress and would get stuck partway revealed. The  ──
  // function caps each one at whichever is smaller: start+600, or the    ──
  // page's actual max scroll — so every item still gets the full 600px   ──
  // of reveal distance when there's room, and just uses whatever's left  ──
  // for the ones that don't, without needing any extra page height.      ──
  useEffect(() => {
    const container = stackRef.current
    if (!container) return

    const items = gsap.utils.toArray(container.children)
    const timelines = items.map((el) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: (self) => Math.min(self.start + 600, ScrollTrigger.maxScroll(window)),
          scrub: 0.5,
          // Drops will-change once this item's range settles at either   ──
          // end (0 = fully hidden, 1 = fully revealed). Uses              ──
          // scrollTrigger's own onUpdate rather than the timeline's       ──
          // onComplete — under scrub, onComplete can get silently         ──
          // skipped if the ScrollTrigger.refresh() below (once this       ──
          // page's async map iframes load) resyncs progress to 1          ──
          // without a normal forward render pass.                         ──
          onUpdate: (self) => {
            if (self.progress === 0 || self.progress === 1) gsap.set(el, { clearProps: 'willChange' })
          },
        },
      })
      tl.to(el, { opacity: 1, y: 0, ease: 'power2.out', force3D: true })
      return tl
    })

    // Two map iframes + several text images inside this stack load          ──
    // asynchronously, and ScrollTrigger measures the container's layout     ──
    // geometry synchronously above — before those finish loading/decoding.  ──
    // Without a refresh once they've settled, the start/end pixel           ──
    // positions it cached are wrong, so the tail end of the stagger         ──
    // (the button, in particular) can end up never fully revealing. Wait    ──
    // for every image/iframe to load (capped by a fallback timeout), then   ──
    // recompute.                                                             ──
    const media = [...container.querySelectorAll('img, iframe')]
    let pending = media.filter((el) => el.tagName === 'IFRAME' || !el.complete).length
    let refreshed = false
    const refresh = () => {
      if (refreshed) return
      refreshed = true
      ScrollTrigger.refresh()
    }
    if (pending === 0) {
      refresh()
    } else {
      media.forEach((el) => {
        if (el.tagName === 'IFRAME' || !el.complete) {
          el.addEventListener('load', () => {
            pending -= 1
            if (pending <= 0) refresh()
          }, { once: true })
        }
      })
    }
    const fallback = setTimeout(refresh, 2500)

    return () => {
      clearTimeout(fallback)
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill()
        tl.kill()
      })
    }
  }, [])

  return (
    // ── h-[200dvh] — this page is a long, scrollable closing card. ──
    <div className="relative w-full h-[200dvh] overflow-hidden bg-blue-500">

      {/* ── Background — floral pattern, full canvas ────────── */}
      <img
        src={page10Bg}
        alt=""
        className="absolute inset-0 w-full h-full object-center z-0"
      />

      {/* ── Everything below lives in one flex column, one after ── */}
      {/* another. top — starting y position. gap — spacing         */}
      {/* between items. Tune baseline/rate/caps below.              */}
      <div
        ref={stackRef}
        className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center z-20 "
        style={{
          top: 'clamp(4%, calc(4% + (100dvh - 700px) * 0.51), 10%)',
          gap: 'clamp(0.5rem, calc(0.5rem + (100dvh - 700px) * 0.008), 1.5rem)',
        }}
      >
        {/* Text 1 — WITH COMPLIMENTS FROM */}
        <img
          src={page10Text1}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(55%, calc(55% + (100dvh - 700px) * 0.48), 62%)',
            marginBottom: 'clamp(1.2rem, calc(1.2rem + (100dvh - 700px) * 0.5), 0.8rem)',
          }}
        />

        {/* Text 2 — Chitkara & Arora Families */}
        <img
          src={page10Text2}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(42%, calc(42% + (100dvh - 700px) * 0.08), 45%)',
            marginBottom: 'clamp(2.5rem, calc(2.5rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Divider */}
        <img
          src={page10Text3Trim}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(45%, calc(45% + (100dvh - 700px) * 0.08), 50%)',
            marginBottom: 'clamp(1rem, calc(1rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Text 4 — Looking forward to celebrating with you! */}
        <img
          src={page10Text4}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(65%, calc(65% + (100dvh - 700px) * 0.08), 69%)',
            marginBottom: 'clamp(1.5rem, calc(1.5rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        />

        {/* Hotel Website — plain script-text image with no link baked   */}
        {/* in, wrapped in a real <a>. Dummy href for now; swap for the   */}
        {/* real hotel site URL later.                                    */}
        <a
          href={HOTEL_WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          style={{
            ...hidden,
            width: 'clamp(38%, calc(38% + (100dvh - 700px) * 0.08), 34%)',
            marginBottom: 'clamp(0rem, calc(0rem + (100dvh - 700px) * 0.005), 0.6rem)',
          }}
        >
          <img src={page10Text5} alt="Hotel Website" className="w-full block" />
        </a>

        {/* Random placeholder link text — swap HOTEL_WEBSITE_URL above  */}
        {/* (and this label) for the real one later.                     */}
        <a
          href={HOTEL_WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...hidden,
            color: '#8a6a3a',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.9rem, 2.4vw, 1rem)',
            textAlign: 'center',
            marginBottom: 'clamp(1rem, calc(1rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        >
          {HOTEL_WEBSITE_URL}
        </a>

        {/* E&A monogram */}
        <img
          src={page10LogoTrim}
          alt="E&A"
          style={{
            ...hidden,
            width: 'clamp(35%, calc(35% + (100dvh - 700px) * 0.18), 50%)',
            marginBottom: 'clamp(1.5rem, calc(1.5rem + (100dvh - 700px) * 0.005), 1.7rem)',
          }}
        />

        {/* Pin/location icon — sits right above "Where we celebrate!"  */}
        <img
          src={page10Location}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(2.1rem, calc(2.1rem + (100dvh - 700px) * 0.001), 1.4rem)',
            marginBottom: 'clamp(-0.5rem, calc(-0.5rem + (100dvh - 700px) * 0.002), 0.4rem)',
          }}
        />

        {/* Where we celebrate! */}
        <img
          src={page10Text6Trim}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(42%, calc(42% + (100dvh - 700px) * 0.20), 50%)',
            marginBottom: 'clamp(0.8rem, calc(0.8rem + (100dvh - 700px) * 0.005), 1rem)',
          }}
        />

        {/* TIVOLI, CHATTARPUR */}
        <img
          src={page10Text7}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(45%, calc(45% + (100dvh - 700px) * 0.18), 50%)',
            marginBottom: 'clamp(0.8rem, calc(0.8rem + (100dvh - 700px) * 0.9), 1rem)',
          }}
        />

        {/* Map 1 — dummy placeholder location; swap VENUE_1 above  */}
        {/* for the real venue. width/height sized to match the      */}
        {/* reference's map box proportions.                          */}
        <div
          className="rounded-lg overflow-hidden border"
          style={{
            ...hidden,
            width: 'clamp(55%, calc(55% + (100dvh - 700px) * 0.04), 84%)',
            height: 'clamp(40dvh, calc(40dvh + (100dvh - 700px) * 0.01), 18dvh)',
            borderColor: 'rgba(20, 83, 79, 0.25)',
            marginBottom: 'clamp(0.8rem, calc(0.8rem + (100dvh - 700px) * 0.9), 1.5rem)',
          }}
        >
          <iframe
            title="Map — Tivoli, Chattarpur"
            src={mapEmbedUrl(VENUE_1)}
            className="w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* GURUNANAK DARBAAR, MANOHAR NAGAR */}
        <img
          src={page10Text8}
          alt=""
          style={{
            ...hidden,
            width: 'clamp(78%, calc(78% + (100dvh - 700px) * 0.08), 86%)',
            marginBottom: 'clamp(0.8rem, calc(0.8rem + (100dvh - 700px) * 0.9), 1.2rem)',
          }}
        />

        {/* Map 2 — dummy placeholder location; swap VENUE_2 above  */}
        {/* for the real venue.                                       */}
        <div
          className="rounded-lg overflow-hidden border"
          style={{
            ...hidden,
            width: 'clamp(55%, calc(55% + (100dvh - 700px) * 0.04), 84%)',
            height: 'clamp(40dvh, calc(40dvh + (100dvh - 700px) * 0.01), 18dvh)',
            borderColor: 'rgba(20, 83, 79, 0.25)',
            marginBottom: 'clamp(0.6rem, calc(0.6rem + (100dvh - 700px) * 0.005), 1.25rem)',
          }}
        >
          <iframe
            title="Map — Gurunanak Darbar, Manohar Nagar"
            src={VENUE_2_EMBED_SRC}
            className="w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Get Directions — dummy destination for now; points at   */}
        {/* VENUE_2 (swap the destination arg above once real).      */}
        <a
          href="https://maps.app.goo.gl/4XwX5h5UgCd7PCV6A"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-full"
          style={{
            ...hidden,
            padding: '0.6em 2.6em',
            backgroundColor: '#cdae74',
            border: '1px solid #BC8C50',
            color: 'white',
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.95rem, 3vw, 0.95rem)',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 6px rgba(74, 52, 24, 0.2)',
          }}
        >
          Get Directions <img src={page10Location2} alt="" style={{ width: '1em', height: '1em' }} />
        </a>
      </div>

    </div>
  )
}

export default Page10
