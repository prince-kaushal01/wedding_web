import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import bg from '../assets/page4-bg.webp'
import top from '../assets/page4-top.webp'
import left from '../assets/page4-left.webp'
import right from '../assets/page4-right.webp'
import bottomLeft from '../assets/page4-bottomleft.webp'
import bottomRight from '../assets/page4-bottomright.webp'
import couple from '../assets/page4-couple.webp'
import text1 from '../assets/page4-text1.webp'
import text2 from '../assets/page4-text2.webp'
import text3 from '../assets/page4-text3.webp'
import text4 from '../assets/page4-text4.webp'
import text5 from '../assets/page4-text5.webp'
import text6 from '../assets/page4-text6.webp'
import text7 from '../assets/page4-text7.webp'

gsap.registerPlugin(ScrollTrigger)

const Page4 = () => {
  // Scroll animation: plays as Page4 scrolls into view (scrub = tied to the scroll position)
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page4',
        start: 'top bottom',
        end: 'top top',
        scrub: 0.8, // 0.8s glide behind the scroll; true = no glide
      },
    })

    // Last number on each line = position on the timeline (0 to 10).
    // Images with a Tailwind translate class sit in a wrapper div and GSAP moves the wrapper,
    // because moving those images directly would break their translate

    // 1. Flowers come down from the top
    tl.from('.p4-top', { yPercent: -25, duration: 2.5, ease: 'none' }, 0.5)

    // 2. Side flowers and the tree branch come in from the left and the right
    tl.from('.p4-left', { xPercent: -30, duration: 3, ease: 'none' }, 1)
    tl.from('.p4-right', { xPercent: 60, duration: 3, ease: 'none' }, 1)

    // 3. Texts come down from above, one by one
    tl.from('.p4-text', { opacity: 0, y: -50, duration: 1, stagger: 0.5, ease: 'none' }, 2.5)

    // 4. Bottom corner flowers come in from the left and the right
    tl.from('.p4-bottomleft', { xPercent: -100, duration: 2, ease: 'none' }, 8)
    tl.from('.p4-bottomright', { xPercent: 100, duration: 2, ease: 'none' }, 8)

    // 5. Couple: not tied to the scroll. It grows once Page4 is far enough on screen, then keeps zooming gently

    const zoom = gsap.to('.p4-couple', {
      scale: 1.05,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      paused: true,
    })

    const grow = gsap.from('.p4-couple', {
      scale: 0,
      transformOrigin: '50% 95%',
      duration: 3.2,
      ease: 'back.out(1.4)',
      paused: true,
      onComplete: () => zoom.restart(),
    })

    ScrollTrigger.create({
      trigger: '.page4',
      start: 'top 20%', // where the couple appears
      onEnter: () => grow.timeScale(1).play(),
      onLeaveBack: () => {
        // scrolling back up: stop the zoom and shrink back to 0, 3 times faster than the grow
        zoom.pause()
        grow.timeScale(3).reverse()
      },
    })
  })

  return (
    <div className="page4 relative h-lvh w-full overflow-hidden bg-[#f6d9c8]">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Flowers along the top */}
      <div className="p4-top pointer-events-none absolute inset-0">
        <img
          src={top}
          alt=""
          className="absolute top-0 left-1/2 h-[17.8svh] w-auto max-w-none -translate-x-1/2"
        />
      </div>

      {/* Flowers on the left edge, partly outside the screen */}
      <div className="p4-left pointer-events-none absolute inset-0">
        <img
          src={left}
          alt=""
          className="absolute top-[15svh] left-0 h-[33.7svh] w-auto max-w-none translate-x-[-40%]"
        />
      </div>

      {/* Tree branch and flowers on the right edge */}
      <div className="p4-right pointer-events-none absolute inset-0">
        <img
          src={right}
          alt=""
          className="absolute top-0 right-0 h-[48.4svh] w-auto max-w-none translate-x-[18%]"
        />
      </div>

      <div className="relative flex h-full flex-col items-center pt-[12.5svh]">
        <img
          src={text1}
          alt="Engagement"
          className="p4-text h-[clamp(2.6rem,7.3svh,4.8rem)] w-auto max-w-none"
        />

        <img
          src={text2}
          alt="Monday"
          className="p4-text mt-[clamp(0.7rem,2.2svh,1.5rem)] h-[clamp(0.75rem,2.1svh,1.4rem)] w-auto max-w-none"
        />

        {/* 30 and a text "th" beside it. Both have the page's text class, so the th drops in right after the 30 */}
        <div className="mt-[clamp(0.15rem,0.6svh,0.4rem)] flex items-start">
          <img
            src={text3}
            alt="30"
            className="p4-text h-[clamp(1.9rem,5.4svh,3.6rem)] w-auto max-w-none"
          />
          {/* "th": text size is the text-[clamp(...)] class, colour is the text-[#...] class */}
          <span className="p4-text ml-[0.15em] font-serif text-[clamp(0.75rem,2.2svh,1.45rem)] leading-none text-[#120270]">
            th
          </span>
        </div>

        <img
          src={text4}
          alt="November 2026"
          className="p4-text mt-[clamp(0.3rem,0.9svh,0.6rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        <img
          src={text5}
          alt="5:00 PM Onwards"
          className="p4-text mt-[clamp(0.75rem,2.3svh,1.55rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        <img
          src={text6}
          alt="At - North Central Lawns"
          className="p4-text mt-[clamp(0.75rem,2.3svh,1.55rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        <img
          src={text7}
          alt="Attire - Soft Hues, Neutrals, Pastels Indo Western Indian"
          className="p4-text mt-[clamp(0.75rem,2.3svh,1.55rem)] h-[clamp(2.8rem,7.9svh,5.2rem)] w-auto max-w-none"
        />
      </div>

      {/* Couple: max-w keeps it inside the screen on narrow phones */}
      <div className="p4-couple pointer-events-none absolute inset-0">
        <img
          src={couple}
          alt="Jyoti and Prakhar"
          className="absolute bottom-[4.5svh] left-1/2 h-[43svh] max-w-[96%] -translate-x-1/2 object-contain object-bottom"
        />
      </div>

      {/* Flowers in the bottom corners, in front of the couple */}
      <img
        src={bottomLeft}
        alt=""
        className="p4-bottomleft absolute bottom-0 left-0 h-[24.7svh] w-auto max-w-none"
      />
      <img
        src={bottomRight}
        alt=""
        className="p4-bottomright absolute right-0 bottom-0 h-[24.4svh] w-auto max-w-none"
      />
    </div>
  )
}

export default Page4
