import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import bg from '../assets/page3-bg.webp'
import top from '../assets/page3-top.webp'
import left from '../assets/page3-left.webp'
import right from '../assets/page3-right.webp'
import bottom from '../assets/page3-bottom.webp'
import text1 from '../assets/page3-text1.webp'
import text2 from '../assets/page3-text2.webp'
import text3 from '../assets/page3-text3.webp'
import text4 from '../assets/page3-text4.webp'
import text5 from '../assets/page3-text5.webp'
import text6 from '../assets/page3-text6.webp'
import petal from '../assets/pattle.webp'

gsap.registerPlugin(ScrollTrigger)

// How many petals fall
const petals = Array.from({ length: 28 }, (_, index) => index)

const Page3 = () => {
  // Scroll animation: plays as Page3 scrolls into view (scrub = tied to the scroll position)
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page3',
        start: 'top bottom',
        end: 'top top',
        scrub: 0.8, // 0.8s glide behind the scroll; true = no glide
      },
    })

    // Last number on each line = position on the timeline (0 to 10).
    // Images with a Tailwind translate class sit in a wrapper div and GSAP moves the wrapper,
    // because moving those images directly would break their translate

    // 1. Flower garlands come down from the top
    tl.from('.p3-top', { yPercent: -30, duration: 3, ease: 'none' }, 1)

    // 2. Texts come down from above, one by one
    tl.from('.p3-text', { opacity: 0, y: -50, duration: 1, stagger: 0.5, ease: 'none' }, 4)

    // 3. Pots and plants come in from the left and the right
    tl.from('.p3-left', { xPercent: -50, duration: 3, ease: 'none' }, 5.5)
    tl.from('.p3-right', { xPercent: 50, duration: 3, ease: 'none' }, 5.5)

    // 4. Flower platters come up from the bottom
    tl.from('.p3-bottom', { yPercent: 30, duration: 2.5, ease: 'none' }, 7.5)

    // Falling petals: not tied to the scroll. Once started they never stop
    const petalTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page3',
        start: 'top 90%',
        toggleActions: 'play none none none', // play once, never pause
      },
    })

    gsap.utils.toArray('.p3-petal').forEach((petal) => {
      gsap.set(petal, {
        left: gsap.utils.random(5, 92) + '%',
        scale: gsap.utils.random(0.6, 1.3),
      })

      // Falls with y (a transform), not top: transforms are much lighter for the phone
      petalTl.fromTo(
        petal,
        { y: 0, rotation: gsap.utils.random(-90, 90) },
        {
          y: () => document.querySelector('.page3').offsetHeight * 1.1,
          x: gsap.utils.random(-50, 50),
          rotation: gsap.utils.random(180, 540),
          duration: gsap.utils.random(7, 12), // seconds for one fall: bigger = slower
          ease: 'none',
          repeat: -1,
        },
        gsap.utils.random(0, 8), // each petal starts at a different moment
      )
    })
  })

  return (
    <div className="page3 relative h-lvh w-full overflow-hidden bg-[#f7e7d3]">
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

      <div className="relative flex h-full flex-col items-center pt-[25.5svh]">
        <img
          src={text1}
          alt="Oli Ceremony"
          className="p3-text h-[clamp(2.6rem,7.4svh,4.9rem)] w-auto max-w-none"
        />

        <img
          src={text2}
          alt="Sunday"
          className="p3-text mt-[clamp(0.3rem,1svh,0.7rem)] h-[clamp(0.75rem,2.1svh,1.4rem)] w-auto max-w-none"
        />

        <img
          src={text3}
          alt="29th"
          className="p3-text mt-[clamp(0.1rem,0.3svh,0.25rem)] h-[clamp(2.1rem,5.9svh,3.9rem)] w-auto max-w-none"
        />

        <img
          src={text4}
          alt="November 2026"
          className="p3-text mt-[clamp(0.25rem,0.8svh,0.6rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        <img
          src={text5}
          alt="4:30 PM Onwards"
          className="p3-text mt-[clamp(0.7rem,2.2svh,1.5rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

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

      {/* Falling petals */}
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
