import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import bg from '../assets/page3-bg.png'
import top from '../assets/page3-top.png'
import left from '../assets/page3-left.png'
import right from '../assets/page3-right.png'
import bottom from '../assets/page3-bottom.png'
import text1 from '../assets/page3-text1.png'
import text2 from '../assets/page3-text2.png'
import text3 from '../assets/page3-text3.png'
import text4 from '../assets/page3-text4.png'
import text5 from '../assets/page3-text5.png'
import text6 from '../assets/page3-text6.png'
import petal from '../assets/pattle.png'

gsap.registerPlugin(ScrollTrigger)

// How many petals fall. GSAP gives each one its own position, size and timing (see the useGSAP block)
const petals = Array.from({ length: 28 }, (_, index) => index)

const Page3 = () => {
  // Scroll animation: plays while Page3 scrolls up into the screen, and every element moves only
  // as much as the user scrolls (scrub). The page is not stuck, it scrolls normally.
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page3',
        start: 'top bottom', // begins when the top of Page3 enters from the bottom of the screen
        end: 'top top', // finishes when Page3 fills the screen
        scrub: true, // tie the animation to the scroll position
      },
    })

    // The number at the end of each line is the position on the timeline (0 = start, 10 = end).
    // The page comes into view from its top first, so top elements animate first and bottom elements last.
    // Elements that are placed with a Tailwind translate class sit inside a full-screen wrapper div,
    // and GSAP moves the wrapper. (If GSAP moved those images directly it would break their translate.)
    // For the wrappers, xPercent / yPercent are a % of the screen: -50 = half a screen up or left.

    // 1. Flower garlands come down from the top
    tl.from('.p3-top', { yPercent: -30, duration: 3, ease: 'none' }, 1)

    // 2. Texts come down from above, one by one
    tl.from('.p3-text', { opacity: 0, y: -50, duration: 1, stagger: 0.5, ease: 'none' }, 4)

    // 3. Pots and plants come in from the left and the right
    tl.from('.p3-left', { xPercent: -50, duration: 3, ease: 'none' }, 5.5)
    tl.from('.p3-right', { xPercent: 50, duration: 3, ease: 'none' }, 5.5)

    // 4. Flower platters come up from the bottom
    tl.from('.p3-bottom', { yPercent: 30, duration: 2.5, ease: 'none' }, 7.5)

    // ---------- Falling petals ----------
    // NOT tied to the scroll: the petals fall slowly by themselves, again and again.
    // Once they start they never stop, even when Page3 is not on screen.
    const petalTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page3',
        start: 'top 90%', // start falling when the top of Page3 is 70% down the screen
        toggleActions: 'play none none none', // play once it starts, and do nothing after that (never pause)
      },
    })

    gsap.utils.toArray('.p3-petal').forEach((petal) => {
      // each petal gets a random place across the page and a random size
      gsap.set(petal, {
        left: gsap.utils.random(5, 92) + '%',
        scale: gsap.utils.random(0.6, 1.3),
      })

      // it falls from just above the page to just below it, drifting sideways and spinning, then repeats.
      // Page3 hides anything outside itself, so the petals are never seen outside Page3.
      // It moves with y (a transform) and not with top, because transforms are much lighter for the phone
      petalTl.fromTo(
        petal,
        { y: 0, rotation: gsap.utils.random(-90, 90) },
        {
          y: () => document.querySelector('.page3').offsetHeight * 1.1, // a little more than the page height
          x: gsap.utils.random(-50, 50),
          rotation: gsap.utils.random(180, 540),
          duration: gsap.utils.random(7, 12), // seconds for one fall: bigger = slower
          ease: 'none',
          repeat: -1, // fall again forever
        },
        gsap.utils.random(0, 8), // each petal starts at a different moment
      )
    })
  })

  return (
    // One screen tall, scrolls normally. All sizes follow the screen height (svh) so it looks the same on short and long screens
    <div className="page3 relative h-svh w-full overflow-hidden bg-[#f7e7d3]">
      {/* Background: arch, sky and floor */}
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Flower garlands hanging from the top */}
      <div className="p3-top pointer-events-none absolute inset-0">
        <img
          src={top}
          alt=""
          className="absolute top-0 left-1/2 h-[23.2svh] w-auto max-w-none -translate-x-1/2"
        />
      </div>

      {/* Texts, stacked in the middle */}
      <div className="relative flex h-full flex-col items-center pt-[25.5svh]">
        {/* Oli Ceremony */}
        <img
          src={text1}
          alt="Oli Ceremony"
          className="p3-text h-[clamp(2.6rem,7.4svh,4.9rem)] w-auto max-w-none"
        />

        {/* Sunday */}
        <img
          src={text2}
          alt="Sunday"
          className="p3-text mt-[clamp(0.3rem,1svh,0.7rem)] h-[clamp(0.75rem,2.1svh,1.4rem)] w-auto max-w-none"
        />

        {/* 29th */}
        <img
          src={text3}
          alt="29th"
          className="p3-text mt-[clamp(0.1rem,0.3svh,0.25rem)] h-[clamp(2.1rem,5.9svh,3.9rem)] w-auto max-w-none"
        />

        {/* November 2026 */}
        <img
          src={text4}
          alt="November 2026"
          className="p3-text mt-[clamp(0.25rem,0.8svh,0.6rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        {/* 4:30 PM Onwards */}
        <img
          src={text5}
          alt="4:30 PM Onwards"
          className="p3-text mt-[clamp(0.7rem,2.2svh,1.5rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        {/* Attire - Traditional */}
        <img
          src={text6}
          alt="Attire - Traditional"
          className="p3-text mt-[clamp(1.5rem,5svh,3.3rem)] h-[clamp(0.5rem,1.35svh,0.9rem)] w-auto max-w-none"
        />
      </div>

      {/* Pots and plants in the bottom right corner, partly outside the screen */}
      <div className="p3-right pointer-events-none absolute inset-0">
        <img
          src={right}
          alt=""
          className="absolute right-0 bottom-[6svh] h-[36.6svh] w-auto max-w-none translate-x-[32%]"
        />
      </div>

      {/* Pots and plants in the bottom left corner, partly outside the screen */}
      <div className="p3-left pointer-events-none absolute inset-0">
        <img
          src={left}
          alt=""
          className="absolute bottom-0 left-0 h-[36.6svh] w-auto max-w-none translate-x-[-53%]"
        />
      </div>

      {/* Flower platters and pots at the bottom, in front of everything */}
      <div className="p3-bottom pointer-events-none absolute inset-0">
        <img
          src={bottom}
          alt=""
          className="absolute bottom-[-1svh] left-[48%] h-[23svh] w-auto max-w-none -translate-x-1/2"
        />
      </div>

      {/* Falling petals: a layer on top of everything in Page3. GSAP places and moves each petal */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {petals.map((index) => (
          <img
            key={index}
            src={petal}
            alt=""
            className="p3-petal absolute top-[-6%] h-[clamp(0.8rem,2.2svh,1.4rem)] w-auto max-w-none"
          />
        ))}
      </div>
    </div>
  )
}

export default Page3
