import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import bg from '../assets/page5-bg.png'
import top from '../assets/page5-top.png'
import left from '../assets/page5-left.png'
import right from '../assets/page5-right.png'
import centerRight from '../assets/page5-centerright.png'
import bottomLeft from '../assets/page5-bottomleft.png'
import bottomRight from '../assets/page5-bottomright.png'
import couple from '../assets/page5-couple.png'
import text1 from '../assets/page5-text1.png'
import text2 from '../assets/page5-text2.png'
import text3 from '../assets/page5-text3.png'
import text4 from '../assets/page5-text4.png'
import text5 from '../assets/page5-text5.png'
import text6 from '../assets/page5-text6.png'
import text7 from '../assets/page5-text7.png'

gsap.registerPlugin(ScrollTrigger)

const Page5 = () => {
  // Scroll animation: plays while Page5 scrolls up into the screen, and every element moves only
  // as much as the user scrolls (scrub). The page is not stuck, it scrolls normally.
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.page5',
        start: 'top bottom', // begins when the top of Page5 enters from the bottom of the screen
        end: 'top top', // finishes when Page5 fills the screen
        scrub: true, // tie the animation to the scroll position
      },
    })

    // The number at the end of each line is the position on the timeline (0 = start, 10 = end).
    // The page comes into view from its top first, so top elements animate first and bottom elements last.
    // Elements that are placed with a Tailwind translate class sit inside a full-screen wrapper div,
    // and GSAP moves the wrapper. (If GSAP moved those images directly it would break their translate.)
    // For the wrappers, xPercent / yPercent are a % of the screen: -50 = half a screen up or left.

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

    // 6. Couple: this one is NOT tied to the scroll. It plays by itself once Page5 is far enough on screen.
    //    transformOrigin is where the couple stands, so it zooms on its own place

    // zoom: keeps zooming in and out gently, forever (starts paused)
    const zoom = gsap.to('.p5-couple', {
      scale: 1.05,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      paused: true,
    })

    // grow: from 0 to full size (starts paused). When it finishes, the zoom starts
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
      start: 'top 20%', // the point where the couple appears (top of Page5 is 20% down the screen)
      onEnter: () => grow.timeScale(1).play(), // scrolling down past the point: grow at normal speed
      onLeaveBack: () => {
        // scrolling back up past the point: stop the zoom and shrink back to 0.
        // timeScale(3) makes the shrink 3 times faster than the grow
        zoom.pause()
        grow.timeScale(3).reverse()
      },
    })
  })

  return (
    // One screen tall, scrolls normally. All sizes follow the screen height (svh) so it looks the same on short and long screens
    <div className="page5 relative h-svh w-full overflow-hidden bg-[#a9cdea]">
      {/* Background: sky, sea and yacht deck */}
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />

      {/* Island on the right, behind the couple. The bottom value keeps it sitting on the
          horizon line of the background (the background is sized by height or by width, whichever is bigger) */}
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

      {/* Texts, stacked from the top */}
      <div className="relative flex h-full flex-col items-center pt-[14.7svh]">
        {/* Yacht Party */}
        <img
          src={text1}
          alt="Yacht Party"
          className="p5-text h-[clamp(2.9rem,8.1svh,5.3rem)] w-auto max-w-none"
        />

        {/* Monday */}
        <img
          src={text2}
          alt="Monday"
          className="p5-text mt-[clamp(0.1rem,0.4svh,0.3rem)] h-[clamp(0.75rem,2.1svh,1.4rem)] w-auto max-w-none"
        />

        {/* 30 */}
        <img
          src={text3}
          alt="30"
          className="p5-text mt-[clamp(0.1rem,0.4svh,0.3rem)] h-[clamp(1.9rem,5.4svh,3.6rem)] w-auto max-w-none"
        />

        {/* November 2026 */}
        <img
          src={text4}
          alt="November 2026"
          className="p5-text mt-[clamp(0.25rem,0.8svh,0.55rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        {/* 10:00 AM Onwards */}
        <img
          src={text5}
          alt="10:00 AM Onwards"
          className="p5-text mt-[clamp(0.7rem,2.1svh,1.4rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        {/* At - RA 11 */}
        <img
          src={text6}
          alt="At - RA 11"
          className="p5-text mt-[clamp(0.45rem,1.4svh,0.95rem)] h-[clamp(0.6rem,1.7svh,1.15rem)] w-auto max-w-none"
        />

        {/* Attire - Coastal/ Breezy/ Western */}
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
          className="absolute bottom-[9svh] left-[56%] h-[44.5svh] max-w-[88%] -translate-x-1/2 object-contain object-bottom"
        />
      </div>

      {/* Disco balls and flowers in the bottom corners, in front of the couple */}
      <div className="p5-bottomleft pointer-events-none absolute inset-0">
        <img
          src={bottomLeft}
          alt=""
          className="absolute bottom-[-2svh] left-0 h-[20.5svh] w-auto max-w-none translate-x-[-8%]"
        />
      </div>
      <div className="p5-bottomright pointer-events-none absolute inset-0">
        <img
          src={bottomRight}
          alt=""
          className="absolute right-0 bottom-[-2svh] h-[21svh] w-auto max-w-none translate-x-[8%]"
        />
      </div>
    </div>
  )
}

export default Page5
