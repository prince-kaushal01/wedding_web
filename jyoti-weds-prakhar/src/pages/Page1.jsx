import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import leftBird from '../assets/left-bird.webp'
import rightBird from '../assets/right-bird.webp'
import ScratchCard from '../components/ScratchCard'
import bg from '../assets/page1-bg.webp'
import logo from '../assets/page1-logo.webp'
import text1 from '../assets/page1-text1.webp'
import text2 from '../assets/page1-text2.webp'
import text3 from '../assets/page1-text3.webp'
import text4 from '../assets/page1-text4.webp'
import text5 from '../assets/page1-text5.webp'
import text6 from '../assets/page1-text6.webp'
import text7 from '../assets/page1-text7.webp'
import text8 from '../assets/page1-text8.webp'
import text9 from '../assets/page1-text9.webp'
import text10 from '../assets/page1-text10.webp'
import text11 from '../assets/page1-text11.webp'
import text12 from '../assets/page1-text12.webp'
import bottom from '../assets/page1-bottom.webp'
import bottomLeft from '../assets/page1-bottomleft.webp'
import bottomRight from '../assets/page1-bottomright.webp'

gsap.registerPlugin(ScrollTrigger)

// start becomes true once the envelope has opened (set in App.jsx)
const Page1 = ({ start }) => {
  useGSAP(() => {
    // Hidden above their place until the envelope opens
    gsap.set('.p1-drop', { opacity: 0, y: -80 })

    if (!start) return

    gsap.to('.p1-drop', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.35, // delay between one item and the next
      ease: 'power3.out',
    })
  }, [start])

  // "Scroll down" hint: pops in after the logo, names, card and resort name
  useGSAP(() => {
    gsap.set('.p1-hint', { opacity: 0, scale: 0 })

    if (!start) return

    gsap.to('.p1-hint', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', delay: 2.55 })

    gsap.to('.p1-hint-arrow', { y: 4, duration: 0.7, ease: 'sine.inOut', repeat: -1, yoyo: true })
  }, [start])

  // Birds: they fly across the screen one at a time, again and again. Not tied to the scroll.
  useGSAP(() => {
    gsap.set('.p1-bird', { x: -300 })

    if (!start) return

    const screenWidth = window.innerWidth
    const birdWidth = document.querySelector('.p1-bird').offsetWidth

    // Start points just outside the screen edges
    const outLeft = -birdWidth * 0.9
    const outRight = screenWidth + birdWidth * 0.05

    const birds = gsap.timeline({
      delay: 0.7, // seconds before the first bird starts
      repeat: -1,
      repeatDelay: 2, // pause before the first bird comes again
    })

    // 1. Left bird crosses left to right. duration = seconds to cross, the y numbers = wave height in px
    birds.fromTo('.p1-bird-left', { x: outLeft }, { x: outRight, duration: 8, ease: 'none' })
    birds.to('.p1-bird-left', { keyframes: { y: [0, -30, 12, -18, 22], rotation: [0, -6, 4, -4, 5] }, duration: 8, ease: 'sine.inOut' }, '<')

    // 2. Right bird, after the left one has gone, crosses right to left
    birds.fromTo('.p1-bird-right', { x: outRight }, { x: outLeft, duration: 8, ease: 'none' }, '+=1.5')
    birds.to('.p1-bird-right', { keyframes: { y: [0, 26, -16, 18, -26], rotation: [0, -5, 4, -4, 6] }, duration: 8, ease: 'sine.inOut' }, '<')
  }, [start])

  // Scroll animations (scrub = tied to the scroll position)
  useGSAP(() => {
    const page = document.querySelector('.page1')
    const screen = window.innerHeight
    const scrollLength = page.offsetHeight - screen // how many px the user scrolls inside Page1

    // One timeline for Page1's scroll, with its time measured in px of scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: page,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8, // 0.8s glide behind the scroll; true = no glide
      },
    })

    // 1. text4 to text12 fade in and rise as they come out from behind the building
    const revealLength = screen * 0.1 // each text takes 10% of a screen of scrolling to appear
    gsap.utils.toArray('.p1-scroll-text').forEach((text) => {
      // scroll position where this text's bottom edge is 68% down the screen
      const textBottom = text.getBoundingClientRect().bottom - page.getBoundingClientRect().top
      let startAt = textBottom - screen * 0.68

      // keep every text's animation inside Page1's scroll, so the last texts always finish
      startAt = Math.max(0, Math.min(startAt, scrollLength - revealLength))

      tl.from(text, { opacity: 0, y: 50, duration: revealLength, ease: 'none' }, startAt)
    })

    // 2. Palms slide in from the sides. GSAP moves their wrapper divs, because moving the
    //    images directly would break their Tailwind position classes
    tl.from('.p1-palm-left', { xPercent: -60, duration: scrollLength / 2, ease: 'none' }, scrollLength / 2)
    tl.from('.p1-palm-right', { xPercent: 60, duration: scrollLength / 2, ease: 'none' }, scrollLength / 2)
  })

  return (
    // 165svh = 65svh of scrolling + one screen. To change when the second texts appear, change BOTH 65svh values.
    // overflow-clip, not overflow-hidden: overflow-hidden would break sticky
    <div className="page1 relative flex h-[165svh] w-full flex-col justify-between overflow-clip bg-[#d9ecf7]">
      <img
        src={bg}
        alt=""
        className="sticky top-0 h-svh w-full shrink-0 scale-105 object-cover"
      />

      {/* Building and palms: sticky at the bottom, above the texts */}
      <div className="sticky bottom-0 z-20 w-full shrink-0">
        <img
          src={bottom}
          alt=""
          className="h-[clamp(12rem,41svh,26rem)] w-full object-center"
        />

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

      {/* Birds (z-5): in front of the logo (z-1), behind the other texts (z-10) */}
      <div className="pointer-events-none absolute inset-0 z-5">
        <div className="sticky top-0 h-svh w-full overflow-hidden">
          <img
            src={leftBird}
            alt=""
            className="p1-bird p1-bird-left absolute top-[14svh] left-0 h-[clamp(4.5rem,13svh,7.5rem)] w-auto max-w-none"
          />

          <img
            src={rightBird}
            alt=""
            className="p1-bird p1-bird-right absolute top-[30svh] left-0 h-[clamp(4.5rem,13svh,7.5rem)] w-auto max-w-none"
          />
        </div>
      </div>

      {/* Texts. No z-index on this box, so the logo can be z-1 and the other texts z-10 */}
      <div className="absolute inset-x-0 top-0">
        {/* First texts: logo, names and date */}
        <div className="flex h-[65svh] flex-col items-center pt-18">
          <img
            src={logo}
            alt="Jyoti and Prakhar logo"
            className="p1-drop relative z-1 h-[clamp(5rem,25vh,20rem)] w-auto max-w-none"
          />

          <img
            src={text1}
            alt="Jyoti & Prakhar"
            className="p1-drop relative z-10 mt-[clamp(0.75rem,3.5svh,2.25rem)] h-[clamp(3rem,2vh,7.5rem)] w-auto max-w-none"
          />

          {/* Scratch card over the two date lines */}
          <ScratchCard className="p1-drop z-10 mt-[clamp(0.5rem,2.5svh,1.5rem)] flex flex-col items-center">
            <img
              src={text2}
              alt="29th - 30th"
              className="h-[clamp(0.6rem,2.4svh,1.2rem)] w-auto max-w-none"
            />

            <img
              src={text3}
              alt="November 2026"
              className="mt-[clamp(0.4rem,1.5svh,1rem)] h-[clamp(0.6rem,1.6svh,1.4rem)] w-auto max-w-none"
            />
          </ScratchCard>

          {/* Resort name. Size: text-[clamp(...)] */}
          <p className="p1-drop relative z-10 mt-[clamp(0.5rem,2svh,1.2rem)] px-4 text-center font-serif text-[clamp(0.6rem,1.5svh,0.85rem)] tracking-[0.18em] text-[#1f2f6b] uppercase">
            Marriott Resort and Spa, Goa
          </p>

          {/* "Scroll down" hint. Size: text-[clamp(...)]. Colour: the /55 is its strength, lower = lighter */}
          <div className="p1-hint relative z-10 mt-[clamp(0.7rem,2.2svh,1.3rem)] flex items-center gap-1 font-serif text-[clamp(0.55rem,1.3svh,0.7rem)] tracking-[0.2em] text-[#1f2f6b]/55 uppercase">
            Scroll down
            <span className="p1-hint-arrow">&darr;</span>
          </div>
        </div>

        {/* Second texts. The mb gaps use "svh minus rem" so they shrink faster on short screens */}
        <div className="relative z-10 flex h-svh flex-col items-center pt-[clamp(3.5rem,3svh,4rem)]">
          {/* Ganesh symbol */}
          <img
            src={text4}
            alt=""
            className="p1-scroll-text mb-[clamp(0.4rem,3.2svh-0.54rem,1.5rem)] h-[clamp(2rem,5.7svh,4.2rem)] w-auto max-w-none"
          />

          <img
            src={text5}
            alt="Shri Ganeshaya Namah"
            className="p1-scroll-text mb-[clamp(0.3rem,2.35svh-0.39rem,1rem)] h-[clamp(0.6rem,2svh,1.2rem)] max-w-[90%] object-contain"
          />

          <img
            src={text6}
            alt="Gayatri mantra"
            className="p1-scroll-text mb-[clamp(0.4rem,3.2svh-0.54rem,1.5rem)] h-[clamp(1.6rem,5.2svh,3.4rem)] max-w-[90%] object-contain"
          />

          <img
            src={text7}
            alt="We cordially invite your gracious presence to the occasion of engagement ceremony of"
            className="p1-scroll-text mb-[clamp(1.2rem,0.73svh-0.12rem,0.9rem)] h-[clamp(2.1rem,6.5svh,4.5rem)] max-w-[90%] object-contain"
          />

          <img
            src={text8}
            alt="Jyoti"
            className="p1-scroll-text mb-[clamp(0.5rem,1.9svh-0.1rem,0.9rem)] h-[clamp(2.2rem,6.7svh,4.8rem)] w-auto max-w-none"
          />

          <img
            src={text9}
            alt="D/o Mrs. Kiran & Mr. Digvijay Singh"
            className="p1-scroll-text mb-[clamp(0.1rem,1.93svh-0.49rem,1.3rem)] h-[clamp(0.8rem,1.8svh,1.25rem)] max-w-[90%] object-contain"
          />

          <img
            src={text10}
            alt="and"
            className="p1-scroll-text mb-[clamp(0.35rem,2.93svh-0.49rem,1.3rem)] h-[clamp(0.5rem,1.6svh,1.05rem)] w-auto max-w-none"
          />

          <img
            src={text11}
            alt="Prakhar"
            className="p1-scroll-text mb-[clamp(1rem,1.86svh-0.79rem,1.5rem)] h-[clamp(1.6rem,4.7svh,3rem)] w-auto max-w-none"
          />

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
