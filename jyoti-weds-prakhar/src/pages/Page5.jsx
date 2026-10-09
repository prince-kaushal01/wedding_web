import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import bg from '../assets/page5-bg.webp'
import top from '../assets/page5-top.webp'
import left from '../assets/page5-left.webp'
import right from '../assets/page5-right.webp'
import centerRight from '../assets/page5-centerright.webp'
import bottomLeft from '../assets/page5-bottomleft.webp'
import bottomRight from '../assets/page5-bottomright.webp'
import couple from '../assets/page5-couple.webp'
import text1 from '../assets/page5-text1.webp'
import text2 from '../assets/page5-text2.webp'
import text3 from '../assets/page5-text3.webp'
import text4 from '../assets/page5-text4.webp'
import text5 from '../assets/page5-text5.webp'
import text6 from '../assets/page5-text6.webp'
import text7 from '../assets/page5-text7.webp'

gsap.registerPlugin(ScrollTrigger)

const Page5 = () => {
  // Scroll animation: plays as Page5 scrolls into view (scrub = tied to the scroll position)
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page5',
        start: 'top bottom',
        end: 'top top',
        scrub: 0.8, // 0.8s glide behind the scroll; true = no glide
      },
    })

    // Last number on each line = position on the timeline (0 to 10).
    // Images with a Tailwind translate class sit in a wrapper div and GSAP moves the wrapper,
    // because moving those images directly would break their translate

    // 1. Peach drapes come down from the top
    tl.from('.p5-top', { yPercent: -15, duration: 2.5, ease: 'none' }, 0.5)

    // 2. Blue drapes come in from the left and the right
    tl.from('.p5-left', { xPercent: -70, duration: 3, ease: 'none' }, 1)
    tl.from('.p5-right', { xPercent: 70, duration: 3, ease: 'none' }, 1)

    // 3. Texts come down from above, one by one
    tl.from('.p5-text', { opacity: 0, y: -50, duration: 1, stagger: 0.5, ease: 'none' }, 2.5)

    // 4. Island comes in from the right
    tl.from('.p5-island', { xPercent: 100, duration: 3, ease: 'none' }, 5)

    // 5. Disco balls and flowers in the bottom corners come in from the left and the right
    tl.from('.p5-bottomleft', { xPercent: -60, duration: 2, ease: 'none' }, 8)
    tl.from('.p5-bottomright', { xPercent: 60, duration: 2, ease: 'none' }, 8)

    // 6. Couple: not tied to the scroll. It grows once Page5 is far enough on screen, then keeps zooming gently

    const zoom = gsap.to('.p5-couple', {
      scale: 1.05,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      paused: true,
    })

    const grow = gsap.from('.p5-couple', {
      scale: 0,
      transformOrigin: '56% 91%',
      duration: 3.2,
      ease: 'back.out(1.4)',
      paused: true,
      onComplete: () => zoom.restart(),
    })

    ScrollTrigger.create({
      trigger: '.page5',
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
    <div className="page5 relative h-lvh w-full overflow-hidden bg-[#a9cdea]">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />

      {/* Island. The max() in bottom keeps it on the background's horizon on every screen shape */}
      <div className="p5-island pointer-events-none absolute inset-0">
        <img
          src={centerRight}
          alt=""
          className="absolute right-0 bottom-[max(28.5svh,61.1vw)] h-[13.2svh] w-auto max-w-none translate-x-[16%]"
        />
      </div>

      {/* Blue drapes in the top left and top right corners */}
      <div className="p5-left pointer-events-none absolute inset-0">
        <img
          src={left}
          alt=""
          className="absolute top-[-3svh] left-0 h-[51.7svh] w-auto max-w-none translate-x-[-10%]"
        />
      </div>
      <div className="p5-right pointer-events-none absolute inset-0">
        <img
          src={right}
          alt=""
          className="absolute top-[-3svh] right-0 h-[51.7svh] w-auto max-w-none translate-x-[10%]"
        />
      </div>

      {/* Peach drapes and lights along the top */}
      <div className="p5-top pointer-events-none absolute inset-0">
        <img
          src={top}
          alt=""
          className="absolute top-0 left-1/2 h-[10.4svh] w-auto max-w-none -translate-x-1/2"
        />
      </div>

      <div className="relative flex h-full flex-col items-center pt-[14.7svh]">
        <img
          src={text1}
          alt="Yacht Party"
          className="p5-text h-[clamp(2.9rem,8.1svh,5.3rem)] w-auto max-w-none"
        />

        <img
          src={text2}
          alt="Monday"
          className="p5-text mt-[clamp(0.1rem,0.4svh,0.3rem)] h-[clamp(0.75rem,2.1svh,1.4rem)] w-auto max-w-none"
        />

        {/* 30 and a text "th" beside it. Both have the page's text class, so the th drops in right after the 30 */}
        <div className="mt-[clamp(0.1rem,0.4svh,0.3rem)] flex items-start">
          <img
            src={text3}
            alt="30"
            className="p5-text h-[clamp(1.9rem,5.4svh,3.6rem)] w-auto max-w-none"
          />
          {/* "th": text size is the text-[clamp(...)] class, colour is the text-[#...] class */}
          <span className="p5-text ml-[0.15em] font-serif text-[clamp(0.75rem,2.2svh,1.45rem)] leading-none text-[#0d6193]">
            th
          </span>
        </div>

        <img
          src={text4}
          alt="November 2026"
          className="p5-text mt-[clamp(0.25rem,0.8svh,0.55rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        <img
          src={text5}
          alt="10:00 AM Onwards"
          className="p5-text mt-[clamp(0.7rem,2.1svh,1.4rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        <img
          src={text6}
          alt="At - RA 11"
          className="p5-text mt-[clamp(0.45rem,1.4svh,0.95rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        <img
          src={text7}
          alt="Attire - Coastal/ Breezy/ Western"
          className="p5-text mt-[clamp(0.65rem,2svh,1.35rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />
      </div>

      {/* Couple: max-w keeps it inside the screen on narrow phones */}
      <div className="p5-couple pointer-events-none absolute inset-0">
        <img
          src={couple}
          alt="Jyoti and Prakhar"
          className="absolute bottom-[9svh] left-[56%] h-[43svh] max-w-[88%] -translate-x-1/2 object-contain object-bottom"
        />
      </div>

      {/* Disco balls and flowers in the bottom corners, in front of the couple */}
      <div className="p5-bottomleft pointer-events-none absolute inset-0">
        <img
          src={bottomLeft}
          alt=""
          className="absolute -bottom-4 left-2 h-[21svh] w-auto max-w-none translate-x-[-8%]"
        />
      </div>
      <div className="p5-bottomright pointer-events-none absolute inset-0">
        <img
          src={bottomRight}
          alt=""
          className="absolute right-2 bottom-0 h-[17svh] w-auto max-w-none translate-x-[8%]"
        />
      </div>
    </div>
  )
}

export default Page5
