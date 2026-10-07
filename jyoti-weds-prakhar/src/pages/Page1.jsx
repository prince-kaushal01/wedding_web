import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import leftBird from '../assets/left-bird.png'
import rightBird from '../assets/right-bird.png'
import ScratchCard from '../components/ScratchCard'
import bg from '../assets/page1-bg.png'
import logo from '../assets/page1-logo.PNG'
import text1 from '../assets/page1-text1.png'
import text2 from '../assets/page1-text2.png'
import text3 from '../assets/page1-text3.png'
import text4 from '../assets/page1-text4.png'
import text5 from '../assets/page1-text5.png'
import text6 from '../assets/page1-text6.png'
import text7 from '../assets/page1-text7.png'
import text8 from '../assets/page1-text8.png'
import text9 from '../assets/page1-text9.png'
import text10 from '../assets/page1-text10.png'
import text11 from '../assets/page1-text11.png'
import text12 from '../assets/page1-text12.png'
import bottom from '../assets/page1-bottom.png'
import bottomLeft from '../assets/page1-bottomleft.png'
import bottomRight from '../assets/page1-bottomright.png'

gsap.registerPlugin(ScrollTrigger)

// start: false while the envelope is on screen, true once it has gone (comes from App.jsx)
const Page1 = ({ start }) => {
  useGSAP(() => {
    // Before the envelope opens: logo, text1 and the scratch card (text2 + text3) wait hidden, a little above their place
    gsap.set('.p1-drop', { opacity: 0, y: -80 })

    if (!start) return

    // After the envelope has gone: they come down from above one by one
    gsap.to('.p1-drop', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.35, // delay between one item and the next
      ease: 'power3.out',
    })
  }, [start])

  // "Scroll down" message under the scratch card: pops in after the logo, names and card have arrived
  useGSAP(() => {
    // hidden and shrunk to nothing until the envelope has opened
    gsap.set('.p1-hint', { opacity: 0, scale: 0 })

    if (!start) return

    // pop in with a little bounce
    gsap.to('.p1-hint', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', delay: 2.2 })

    // the small arrow keeps nudging downwards, forever
    gsap.to('.p1-hint-arrow', { y: 4, duration: 0.7, ease: 'sine.inOut', repeat: -1, yoyo: true })
  }, [start])

  // Birds: they fly across the screen one at a time, again and again. Not tied to the scroll.
  useGSAP(() => {
    // Before the envelope opens both birds wait outside the screen, on the left
    gsap.set('.p1-bird', { x: -300 })

    if (!start) return

    const screenWidth = window.innerWidth
    const birdWidth = document.querySelector('.p1-bird').offsetWidth

    // Places just outside the screen edges. They are only just outside (the bird images have empty space
    // around the bird), so a bird shows up almost as soon as it starts moving
    const outLeft = -birdWidth * 0.9
    const outRight = screenWidth + birdWidth * 0.05

    const birds = gsap.timeline({
      delay: 0.7, // seconds to wait after Page1 is visible before the first bird starts (it shows about 0.3s later)
      repeat: -1, // fly forever
      repeatDelay: 2, // pause before the first bird comes again
    })

    // 1. Left bird: comes in from the left, flies across, leaves on the right.
    //    x moves it across the screen, y makes it rise and dip so it looks like flying,
    //    rotation tilts it a little as it climbs and dives.
    //    duration = seconds to cross the screen (smaller = faster). The y numbers are the wave height in px
    //    (bigger numbers = higher waves). Keep both durations on a bird the same.
    //    ease 'none' on x = steady speed, so the bird does not creep slowly at the start
    birds.fromTo('.p1-bird-left', { x: outLeft }, { x: outRight, duration: 8, ease: 'none' })
    birds.to('.p1-bird-left', { keyframes: { y: [0, -30, 12, -18, 22], rotation: [0, -6, 4, -4, 5] }, duration: 8, ease: 'sine.inOut' }, '<')

    // 2. Right bird: only after the left bird has gone. Comes in from the right, leaves on the left
    birds.fromTo('.p1-bird-right', { x: outRight }, { x: outLeft, duration: 8, ease: 'none' }, '+=1.5')
    birds.to('.p1-bird-right', { keyframes: { y: [0, 26, -16, 18, -26], rotation: [0, -5, 4, -4, 6] }, duration: 8, ease: 'sine.inOut' }, '<')
  }, [start])

  // Scroll animations: everything below moves only as much as the user scrolls (scrub)
  useGSAP(() => {
    const page = document.querySelector('.page1')
    const screen = window.innerHeight
    const scrollLength = page.offsetHeight - screen // how many px the user scrolls inside Page1

    // One timeline for the whole Page1 scroll. Its time is measured in px of scroll:
    // position 0 = scroll start, position scrollLength = scroll end
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: page,
        start: 'top top', // begins when Page1 touches the top of the screen
        end: 'bottom bottom', // finishes when the bottom of Page1 reaches the bottom of the screen
        scrub: 0.8, // follows the scroll, taking 0.8s to catch up: this glide is what makes it smooth. true = no glide
      },
    })

    // 1. text4 to text12: each one fades in and rises from below while it comes out from behind the building
    const revealLength = screen * 0.1 // each text takes 10% of a screen of scrolling to appear
    gsap.utils.toArray('.p1-scroll-text').forEach((text) => {
      // scroll position where this text's bottom edge is 68% down the screen (just under the building's top edge)
      // (measured from the top of Page1, whatever boxes the text sits inside)
      const textBottom = text.getBoundingClientRect().bottom - page.getBoundingClientRect().top
      let startAt = textBottom - screen * 0.68

      // keep every text's animation inside Page1's scroll, so the last texts always finish
      startAt = Math.max(0, Math.min(startAt, scrollLength - revealLength))

      tl.from(text, { opacity: 0, y: 50, duration: revealLength, ease: 'none' }, startAt)
    })

    // 2. Palm trees slide in from the sides during the second half of the scroll.
    //    Each palm sits inside a full-width wrapper div and GSAP moves the wrapper, because moving the
    //    image directly would break its Tailwind position classes. xPercent is a % of the screen width
    tl.from('.p1-palm-left', { xPercent: -60, duration: scrollLength / 2, ease: 'none' }, scrollLength / 2)
    tl.from('.p1-palm-right', { xPercent: 60, duration: scrollLength / 2, ease: 'none' }, scrollLength / 2)
  })

  return (
    // 165svh tall = 65svh of scrolling + one full screen. Background sticks to the top and the building
    // sticks to the bottom while the texts scroll. When the 165svh is finished, everything scrolls away together.
    // To make the second texts appear sooner or later, change BOTH 65svh values below (165 = 65 + 100).
    // overflow-clip is used (not overflow-hidden) because overflow-hidden would break sticky.
    <div className="page1 relative flex h-[165svh] w-full flex-col justify-between overflow-clip bg-[#d9ecf7]">
      {/* Background: sticky at the top */}
      <img
        src={bg}
        alt=""
        className="sticky top-0 h-svh w-full shrink-0 scale-105 object-cover"
      />

      {/* Bottom group: sticky at the bottom, above the texts (z-20) */}
      <div className="sticky bottom-0 z-20 w-full shrink-0">
        {/* Building */}
        <img
          src={bottom}
          alt=""
          className="h-[clamp(12rem,41svh,26rem)] w-full object-center"
        />

        {/* Palm trees: sit on top of the building, they slide in from the sides while scrolling */}
        <div className="p1-palm-left pointer-events-none absolute inset-0">
          <img
            src={bottomLeft}
            alt=""
            className="absolute -bottom-34 -left-20 h-[clamp(33rem,60svh,52rem)] w-auto max-w-none"
          />
        </div>
        <div className="p1-palm-right pointer-events-none absolute inset-0">
          <img
            src={bottomRight}
            alt=""
            className="absolute -right-11 bottom-40 h-[clamp(15rem,40svh,35rem)] w-auto max-w-none"
          />
        </div>
      </div>

      {/* Birds layer (z-5): above the background and the logo (z-1), below the other texts (z-10),
          so a bird flies in front of the logo but never covers any text.
          The inner box stays stuck to the screen while Page1 scrolls, and hides the birds when they are outside it.
          GSAP moves the birds with x and y, so they have no translate classes */}
      <div className="pointer-events-none absolute inset-0 z-5">
        <div className="sticky top-0 h-svh w-full overflow-hidden">
          {/* Left bird: flies from left to right */}
          <img
            src={leftBird}
            alt=""
            className="p1-bird p1-bird-left absolute top-[14svh] left-0 h-[clamp(4.5rem,13svh,7.5rem)] w-auto max-w-none"
          />

          {/* Right bird: flies from right to left */}
          <img
            src={rightBird}
            alt=""
            className="p1-bird p1-bird-right absolute top-[30svh] left-0 h-[clamp(4.5rem,13svh,7.5rem)] w-auto max-w-none"
          />
        </div>
      </div>

      {/* All texts: they scroll normally and come out from behind the building (z-20).
          This box has no z-index of its own, so each item inside can pick its own layer:
          the logo is z-1 (below the birds), every other text is z-10 (above the birds) */}
      <div className="absolute inset-x-0 top-0">
        {/* ---------- First texts: logo, names and date. This box is 65svh tall,
            so the second texts start right after it instead of a full screen later ---------- */}
        <div className="flex h-[65svh] flex-col items-center pt-22">
          {/* Logo */}
          <img
            src={logo}
            alt="Jyoti and Prakhar logo"
            className="p1-drop relative z-1 h-[clamp(5rem,25vh,20rem)] w-auto max-w-none"
          />

          {/* Jyoti & Prakhar */}
          <img
            src={text1}
            alt="Jyoti & Prakhar"
            className="p1-drop relative z-10 mt-[clamp(0.75rem,3.5svh,2.25rem)] h-[clamp(3rem,2vh,7.5rem)] w-auto max-w-none"
          />

          {/* Scratch card: covers the two date lines until the user scratches it off.
              It drops in as one item (p1-drop) and carries the top margin the first date line had */}
          <ScratchCard className="p1-drop z-10 mt-[clamp(0.5rem,2.5svh,1.5rem)] flex flex-col items-center">
            {/* 29th - 30th */}
            <img
              src={text2}
              alt="29th - 30th"
              className="h-[clamp(0.6rem,2.4svh,1.2rem)] w-auto max-w-none"
            />

            {/* November 2026 */}
            <img
              src={text3}
              alt="November 2026"
              className="mt-[clamp(0.4rem,1.5svh,1rem)] h-[clamp(0.6rem,1.6svh,1.4rem)] w-auto max-w-none"
            />
          </ScratchCard>

          {/* "Scroll down" message: small plain text under the scratch card. It pops in by itself (see the top of this file).
              Wording: the text below. Size: the text-[clamp(...)] class.
              Colour: text-[#1f2f6b]/55 is the navy at 55% strength, a bigger number = darker, smaller = lighter */}
          <div className="p1-hint relative z-10 mt-[clamp(0.7rem,2.2svh,1.3rem)] flex items-center gap-1 font-serif text-[clamp(0.55rem,1.3svh,0.7rem)] tracking-[0.2em] text-[#1f2f6b]/55 uppercase">
            Scroll down
            <span className="p1-hint-arrow">&darr;</span>
          </div>
        </div>

        {/* ---------- Second texts: fill the screen once the scrolling is finished.
            Every text has a height clamp and a margin-bottom (mb) clamp: clamp(smallest, normal, biggest).
            The mb normal value is "svh minus a little rem", so the gaps shrink faster on short screens
            and the texts always fit above the building ---------- */}
        <div className="relative z-10 flex h-svh flex-col items-center pt-[clamp(3.5rem,3svh,4rem)]">
          {/* Ganesh symbol */}
          <img
            src={text4}
            alt=""
            className="p1-scroll-text mb-[clamp(0.4rem,3.2svh-0.54rem,1.5rem)] h-[clamp(2rem,5.7svh,4.2rem)] w-auto max-w-none"
          />

          {/* Shri Ganeshaya Namah */}
          <img
            src={text5}
            alt="Shri Ganeshaya Namah"
            className="p1-scroll-text mb-[clamp(0.3rem,2.35svh-0.39rem,1rem)] h-[clamp(0.6rem,2svh,1.2rem)] max-w-[90%] object-contain"
          />

          {/* Mantra */}
          <img
            src={text6}
            alt="Gayatri mantra"
            className="p1-scroll-text mb-[clamp(0.4rem,3.2svh-0.54rem,1.5rem)] h-[clamp(1.6rem,5.2svh,3.4rem)] max-w-[90%] object-contain"
          />

          {/* We cordially invite ... of */}
          <img
            src={text7}
            alt="We cordially invite your gracious presence to the occasion of engagement ceremony of"
            className="p1-scroll-text mb-[clamp(1.2rem,0.73svh-0.12rem,0.9rem)] h-[clamp(2.1rem,6.5svh,4.5rem)] max-w-[90%] object-contain"
          />

          {/* Jyoti */}
          <img
            src={text8}
            alt="Jyoti"
            className="p1-scroll-text mb-[clamp(0.5rem,1.9svh-0.1rem,0.9rem)] h-[clamp(2.2rem,6.7svh,4.8rem)] w-auto max-w-none"
          />

          {/* D/o Mrs. Kiran & Mr. Digvijay Singh */}
          <img
            src={text9}
            alt="D/o Mrs. Kiran & Mr. Digvijay Singh"
            className="p1-scroll-text mb-[clamp(0.1rem,1.93svh-0.49rem,1.3rem)] h-[clamp(0.8rem,1.8svh,1.25rem)] max-w-[90%] object-contain"
          />

          {/* and */}
          <img
            src={text10}
            alt="and"
            className="p1-scroll-text mb-[clamp(0.35rem,2.93svh-0.49rem,1.3rem)] h-[clamp(0.5rem,1.6svh,1.05rem)] w-auto max-w-none"
          />

          {/* Prakhar */}
          <img
            src={text11}
            alt="Prakhar"
            className="p1-scroll-text mb-[clamp(1rem,1.86svh-0.79rem,1.5rem)] h-[clamp(1.6rem,4.7svh,3rem)] w-auto max-w-none"
          />

          {/* S/o Mrs. Abha & Mr. Bhanu Pratap Singh */}
          <img
            src={text12}
            alt="S/o Mrs. Abha & Mr. Bhanu Pratap Singh"
            className="p1-scroll-text h-[clamp(0.35rem,1.8svh,1.25rem)] max-w-[90%] object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Page1
