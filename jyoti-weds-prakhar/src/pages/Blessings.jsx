import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// The family names, one per line. Add, remove or change names here
const NAMES = [
  'Bharat Bhushan Singh',
  'Digvijay Singh',
  'Kishor Singh',
  'Vivek Vishal',
  'Aman Singh',
  'Ashutosh Singh',
  'Kartikeyan Kishor',
  'Aditya Dev',
]

// Blessings section: sits just before the RSVP. Its sky background comes from App.jsx
const Blessings = () => {
  // Text animation, the same as the earlier pages: every line with the class bless-item comes down
  // from above and fades in, tied to the scroll (scrub). Each one starts when it enters the bottom
  // of the screen and is fully in place by the time it is 75% down the screen, so they arrive one by one.
  useGSAP(() => {
    gsap.utils.toArray('.bless-item').forEach((item) => {
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
    // As tall as its content (not a full screen), so it flows straight into the RSVP below.
    // Sizes follow the screen height (svh)
    <div className="blessings relative flex w-full flex-col items-center px-6 pt-[clamp(2rem,6svh,4rem)] text-center">
      {/* With the blessings of */}
      <p className="bless-item font-['Pinyon_Script'] text-[clamp(1.6rem,min(5svh,9vw),3rem)] leading-tight whitespace-nowrap text-[#8a1c2b]">
        With the blessings of
      </p>

      {/* The two elders */}
      <p className="bless-item mt-[clamp(0.75rem,2.5svh,1.5rem)] font-serif text-[clamp(1.05rem,2.7svh,1.5rem)] text-[#1f2f6b]">
        Late Shyam Sundari Devi &amp;
      </p>
      <p className="bless-item mt-[clamp(0.15rem,0.6svh,0.4rem)] font-serif text-[clamp(1.05rem,2.7svh,1.5rem)] text-[#1f2f6b]">
        Late Ravinder Singh
      </p>

      {/* Small line between the two parts */}
      <div className="bless-item mt-[clamp(1.25rem,4svh,2.5rem)] h-px w-24 bg-[#8a1c2b]/50" />

      {/* Warm Regards from Singh family */}
      <p className="bless-item mt-[clamp(1.25rem,4svh,2.5rem)] font-['Pinyon_Script'] text-[clamp(1.2rem,min(4.2svh,6.6vw),2.5rem)] leading-tight whitespace-nowrap text-[#8a1c2b]">
        Warm Regards from Singh family
      </p>

      {/* The family names, taken from the NAMES list at the top of this file */}
      <div className="mt-[clamp(0.75rem,2.5svh,1.5rem)] flex flex-col gap-[clamp(0.3rem,1svh,0.6rem)]">
        {NAMES.map((name) => (
          <p key={name} className="bless-item font-serif text-[clamp(0.95rem,2.3svh,1.25rem)] text-[#1f2f6b]">
            {name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Blessings
