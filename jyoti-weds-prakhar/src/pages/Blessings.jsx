import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

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

const Blessings = () => {
  // Each bless-item comes down from above and fades in as it scrolls into view
  useGSAP(() => {
    gsap.utils.toArray('.bless-item').forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'clamp(top 95%)', // clamp = still works for items at the very end of the site
          end: 'clamp(top 75%)',
          scrub: 0.8, // 0.8s glide behind the scroll; true = no glide
        },
      })
    })
  })

  return (
    <div className="blessings relative flex w-full flex-col items-center px-6 pt-[clamp(2rem,6svh,4rem)] text-center">
      <p className="bless-item font-['Pinyon_Script'] text-[clamp(1.6rem,min(5svh,9vw),3rem)] leading-tight whitespace-nowrap text-[#8a1c2b]">
        With the blessings of
      </p>

      <p className="bless-item mt-[clamp(0.75rem,2.5svh,1.5rem)] font-serif text-[clamp(1.05rem,2.7svh,1.5rem)] text-[#1f2f6b]">
        Late Shyam Sundari Devi &amp;
      </p>
      <p className="bless-item mt-[clamp(0.15rem,0.6svh,0.4rem)] font-serif text-[clamp(1.05rem,2.7svh,1.5rem)] text-[#1f2f6b]">
        Late Ravinder Singh
      </p>

      <div className="bless-item mt-[clamp(1.25rem,4svh,2.5rem)] h-px w-24 bg-[#8a1c2b]/50" />

      <p className="bless-item mt-[clamp(1.25rem,4svh,2.5rem)] font-['Pinyon_Script'] text-[clamp(1.2rem,min(4.2svh,6.6vw),2.5rem)] leading-tight whitespace-nowrap text-[#8a1c2b]">
        Warm Regards from Singh family
      </p>

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
