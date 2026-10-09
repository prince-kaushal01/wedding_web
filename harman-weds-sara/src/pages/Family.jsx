import { useEffect, useRef, useState } from 'react'

import bg from '../assets/page7_bg.png'

const Family = () => {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const txt = (d) => ({
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(-26px)',
    transition: `opacity .5s ease ${d}s, transform .5s ease ${d}s`,
  })

  const boxAnim = (d) => ({
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity .6s ease ${d}s, transform .6s ease ${d}s`,
    backgroundColor: '#D4B083',
    borderRadius: '1rem',
    width: '78%',
  })

  return (
    <section ref={sectionRef} className="relative w-full h-dvh overflow-hidden">

      {/* Background */}
      <img src={bg} alt="" draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />

      {/* Content — centred column */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-28 z-10 px-0">

        {/* With Love */}
        <p
          style={{ ...txt(0.08), fontFamily: "'Cormorant Garamond'" }}
          className="text-[#805600] text-[1.3rem] leading-none mb-3 uppercase font-light"
        >
          With Love
        </p>

        {/* the families */}
        <p
          style={{ ...txt(0.18), fontFamily: "'Great Vibes', cursive" }}
          className="text-[#790A2A] text-[2.8rem] leading-none m-0 mb-8"
        >
          The families
        </p>

        {/* Groom's Family box */}
        <div style={boxAnim(0.30)} className="flex flex-col items-center pt-3 pb-10 mb-8 border-2 border-[#BC8C50] w-[78%]">
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-white text-[1.2rem] tracking-[0.06em] mt-5 mb-2">
            Groom&apos;s Family
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-white text-[0.89rem] tracking-[0.12em] uppercase m-0">
            Bajwa Family
          </p>
        </div>

        {/* Bride's Family box */}
        <div style={boxAnim(0.42)} className="flex flex-col items-center pt-3 pb-10 mb-10 border-2 border-[#BC8C50] w-[78%]">
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-white text-[1.2rem] tracking-[0.06em] mt-5 mb-2">
            Bride&apos;s Family
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-white text-[0.89rem] tracking-[0.12em] uppercase m-0">
            Jain Family
          </p>
        </div>

        {/* Closing lines */}
        <p
          style={{ ...txt(0.54), fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[#780A2A] text-[0.9rem] tracking-[0.03em] leading-[1.3] m-0 text-center"
        >
          We look forward to celebrating this joyous
          <br />
          occasion with your presence.
        </p>

      </div>

    </section>
  )
}

export default Family
