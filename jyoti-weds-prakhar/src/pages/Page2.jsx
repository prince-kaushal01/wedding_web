import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import bg from '../assets/page2-bg.png'
import top from '../assets/page2-top.png'
import topAbove from '../assets/page2-topabove.png'
import topRight from '../assets/page2-topright.png'
import left from '../assets/page2-left.png'
import right from '../assets/page2-right.png'
import bottom from '../assets/page2-bottom.png'
import bottomLeft from '../assets/page2-bottomleft.png'
import bottomLeft2 from '../assets/page2-bottomleft2.png'
import leftCurtain from '../assets/left_curtain.png'
import rightCurtain from '../assets/right_curtain.png'
import couple from '../assets/page2-couple-crop.png'
import text1 from '../assets/page2-text1.png'
import text2 from '../assets/page2-text2.png'
import text3 from '../assets/page2-text3.png'
import text4 from '../assets/page2-text4.png'
import text5 from '../assets/page2-text5.png'
import text6 from '../assets/page2-text6.png'
import text7 from '../assets/page2-text7.png'

gsap.registerPlugin(ScrollTrigger)

const Page2 = () => {
  // Scroll animation: everything moves only as much as the user scrolls (scrub).
  // Order: the big curtains start opening, and when they are 70% open the page's own animations start.
  useGSAP(() => {
    // ---------- The page's own animations ----------
    // A timeline with no scroll settings of its own: it is placed inside the main timeline below.
    // The number at the end of each line is the position on this timeline (0 = start, 10 = end).
    // Elements that are placed with a Tailwind translate class sit inside a full-screen wrapper div,
    // and GSAP moves the wrapper. (If GSAP moved those images directly it would break their translate.)
    // For the wrappers, xPercent / yPercent are a % of the screen: -50 = half a screen up or left.
    const page = gsap.timeline()

    // 1. Top elements come down from the top
    page.from('.p2-sparkle', { yPercent: -100, duration: 3, ease: 'none' }, 1)
    page.from('.p2-top', { yPercent: -50, duration: 3, ease: 'none' }, 1)
    page.from('.p2-topright', { yPercent: -50, duration: 3, ease: 'none' }, 1)

    // 2. Side curtains come in from the left and the right
    page.from('.p2-left', { xPercent: -60, duration: 2, ease: 'none' }, 1)
    page.from('.p2-right', { xPercent: 60, duration: 2, ease: 'none' }, 1)

    // 3. Texts come down from above, one by one
    page.from('.p2-text', { opacity: 0, y: -50, duration: 1, stagger: 0.5, ease: 'none' }, 4)

    // 4. Bottom elements come in
    page.from('.p2-mirror', { xPercent: -50, duration: 3, ease: 'none' }, 6.5)
    page.from('.p2-piano', { xPercent: -150, duration: 2.5, ease: 'none' }, 7)
    page.from('.p2-lights', { yPercent: 20, duration: 1.5, ease: 'none' }, 8.5)

    // 5. Couple grows from 0 to full size. transformOrigin is the couple's feet
    page.from('.p2-couple',  { xPercent: 120, duration: 3, ease: 'none' }, 7)

    // ---------- Main timeline: big curtains first, then the page ----------
    // It starts when the top of Page2 is 70% down the screen and ends when the extra height is used up.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page2-stage',
        start: 'top 70%',
        end: 'bottom bottom',
        scrub: true, // tie the animation to the scroll position
      },
    })

    // The big curtains open during positions 0 to 10
    tl.to('.p2-curtain-left', { xPercent: -100, duration: 10, ease: 'none' }, 0) // goes out to the left
    tl.to('.p2-curtain-right', { xPercent: 100, duration: 10, ease: 'none' }, 0) // goes out to the right

    // The page's animations start at position 7 = when the curtains are 70% open
    tl.add(page, 7)
  })

  return (
    // Stage: 200svh tall = one screen for Page2 + 100svh of extra scrolling for the curtains and the animations.
    // Page2 stays stuck on the screen during that extra scrolling. (No overflow-hidden here, it would break sticky)
    // Make the 200svh bigger for a slower opening, smaller for a faster one.
    <div className="page2-stage relative h-[200svh] w-full bg-[#0a0f24]">
      {/* The page itself: one screen tall. All sizes follow the screen height (svh) */}
      <div className="page2 sticky top-0 h-svh w-full overflow-hidden bg-[#0a0f24]">
        {/* Background: night sky and floor */}
        <img
          src={bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />

        {/* Gold sparkles at the top */}
        <img
          src={topAbove}
          alt=""
          className="p2-sparkle absolute -top-16 left-0 h-[33svh] w-full object-cover z-50"
        />

        {/* Left and right curtains: full height, partly outside the screen */}
        <div className="p2-left pointer-events-none absolute inset-0">
          <img
            src={left}
            alt=""
            className="absolute top-0 left-0 h-svh w-auto max-w-none translate-x-[-52%]"
          />
        </div>
        <div className="p2-right pointer-events-none absolute inset-0">
          <img
            src={right}
            alt=""
            className="absolute top-0 right-0 h-svh w-auto max-w-none translate-x-[52%]"
          />
        </div>

        {/* Chandeliers and roses at the top */}
        <div className="p2-top pointer-events-none absolute inset-0 z-10">
          <img
            src={top}
            alt=""
            className="absolute -top-20 left-1/2 h-[50svh] w-auto max-w-none -translate-x-1/2"
          />
        </div>

        {/* Curtain swag in the top right corner */}
        <div className="p2-topright pointer-events-none absolute inset-0 z-20">
          <img
            src={topRight}
            alt=""
            className="absolute -top-4 right-14 h-[50svh] w-auto max-w-none translate-x-[35%]"
          />
        </div>

        {/* Texts, stacked in the middle */}
        <div className="relative flex h-full flex-col items-center pt-[25.5svh]">
          {/* Welcome Dinner */}
          <img
            src={text1}
            alt="Welcome Dinner"
            className="p2-text h-[clamp(1.1rem,3svh,2rem)] w-auto max-w-none"
          />

          {/* Sunday */}
          <img
            src={text2}
            alt="Sunday"
            className="p2-text mt-[clamp(0.6rem,2svh,1.4rem)] h-[clamp(0.75rem,2.1svh,1.4rem)] w-auto max-w-none"
          />

          {/* 29th */}
          <img
            src={text3}
            alt="29th"
            className="p2-text mt-[clamp(0.15rem,0.6svh,0.4rem)] h-[clamp(2.1rem,5.9svh,3.9rem)] w-auto max-w-none"
          />

          {/* November 2026 */}
          <img
            src={text4}
            alt="November 2026"
            className="p2-text mt-[clamp(0.4rem,1.4svh,1rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
          />

          {/* 8:30 PM Onwards */}
          <img
            src={text5}
            alt="8:30 PM Onwards"
            className="p2-text mt-[clamp(0.75rem,2.4svh,1.6rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
          />

          {/* At - The Grand Ballroom */}
          <img
            src={text6}
            alt="At - The Grand Ballroom"
            className="p2-text mt-[clamp(0.7rem,2.2svh,1.5rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
          />

          {/* Attire - Retro Vibe */}
          <img
            src={text7}
            alt="Attire - Retro Vibe"
            className="p2-text mt-[clamp(0.8rem,2.6svh,1.7rem)] h-[clamp(0.5rem,1.4svh,0.95rem)] w-auto max-w-none"
          />
        </div>

        {/* Piano and gramophone */}
        <img
          src={bottomLeft2}
          alt=""
          className="absolute bottom-[10svh] left-[22%] h-[29svh] w-auto max-w-none"
        />

        {/* Mirror in the bottom left corner */}
        <div className="p2-mirror pointer-events-none absolute inset-0">
          <img
            src={bottomLeft}
            alt=""
            className="absolute bottom-[-3svh] left-0 h-[42svh] w-auto max-w-none translate-x-[-12%]"
          />
        </div>

        {/* Couple. Uses page2-couple-crop.png: the same picture as page2-couple.png with the huge empty space
            cut away (the full 6980px-wide image made scrolling freeze on phones). The image is 28.6svh wide,
            so this left value puts the couple's centre at 78% of the screen width */}
        <img
          src={couple}
          alt="Jyoti and Prakhar"
          className="p2-couple absolute bottom-0 left-[calc(78%-14.3svh)] h-[44svh] w-auto max-w-none"
        />

        {/* Candle lights along the bottom */}
        <div className="p2-lights pointer-events-none absolute inset-0">
          <img
            src={bottom}
            alt=""
            className="absolute bottom-0 left-1/2 h-[16svh] w-auto max-w-none -translate-x-1/2"
          />
        </div>

        {/* Big curtains: cover the whole page (z-20, above everything) and slide open while scrolling.
            Each one is a little wider than half the screen so there is no gap in the middle */}
        <div className="p2-curtain-left pointer-events-none absolute inset-y-0 left-0 z-20 w-[51%]">
          <img src={leftCurtain} alt="" className="h-full w-full" />
        </div>
        <div className="p2-curtain-right pointer-events-none absolute inset-y-0 right-0 z-20 w-[51%]">
          <img src={rightCurtain} alt="" className="h-full w-full" />
        </div>
      </div>
    </div>
  )
}

export default Page2
