import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Footer: the last thing on the site, after the RSVP. Its sky background comes from App.jsx
const Footer = () => {
  // Text animation, the same as the earlier pages: every line with the class footer-item comes down
  // from above and fades in, tied to the scroll (scrub). Each one starts when it enters the bottom
  // of the screen and is fully in place by the time it is 75% down the screen, so they arrive one by one.
  useGSAP(() => {
    gsap.utils.toArray('.footer-item').forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: -50, // starts 50px higher and comes down into place
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'clamp(top 95%)', // clamp = still works for items at the very end of the site
          end: 'clamp(top 75%)',
          scrub: 0.8, // follows the scroll, taking 0.8s to catch up. true = no glide
        },
      })
    })
  })

  return (
    <footer className="footer relative flex w-full flex-col items-center px-6 pt-[clamp(1.25rem,4svh,2.5rem)] pb-[clamp(2rem,6svh,4rem)] text-center">
      {/* Thin line above the footer */}
      <div className="footer-item h-px w-24 bg-[#8a1c2b]/50" />

      <p className="footer-item mt-[clamp(1rem,3svh,2rem)] max-w-xs font-serif text-[clamp(0.85rem,2svh,1.05rem)] text-[#1f2f6b]">
        The beginning of our forever with you. Your presence and blessings means the world to us.
      </p>

      <p className="footer-item mt-[clamp(0.5rem,1.5svh,1rem)] font-['Pinyon_Script'] text-[clamp(1.4rem,3.6svh,2.1rem)] text-[#8a1c2b]">
        Together with our families
      </p>
    </footer>
  )
}

export default Footer
