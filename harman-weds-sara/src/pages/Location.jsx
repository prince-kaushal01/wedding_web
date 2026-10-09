import { useEffect, useRef, useState } from 'react'
import RSVP from './RSVP'
import bg from '../assets/page7_bg.png'

const Location = () => {
  const sectionRef = useRef(null)
  const [inView,   setInView]   = useState(false)
  const [showRSVP, setShowRSVP] = useState(false)

  // Animate in when section enters view
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

  // Lock page scroll while RSVP modal is open
  useEffect(() => {
    document.body.style.overflow = showRSVP ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showRSVP])

  const fade = (d) => ({
    opacity:    inView ? 1 : 0,
    transform:  inView ? 'none' : 'translateY(-20px)',
    transition: `opacity .5s ease ${d}s, transform .5s ease ${d}s`,
  })

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden flex items-center justify-center" style={{ height: '20vh' }}>

      {/* Background */}
      <img src={bg} alt="" draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />

      {/* RSVP button */}
      <button
        onClick={() => setShowRSVP(true)}
        style={{
          ...fade(0.1),
          fontFamily:      "'Great Vibes', cursive",
          backgroundColor: '#D4B083',
          borderColor:     '#BC8C50',
          color:           'white',
        }}
        className="relative z-10 px-12 py-[14px] border-2 rounded-4xl text-[1.7rem] tracking-[0.08em]"
      >
        Rsvp &nbsp;&nbsp;Now
      </button>

      {/* RSVP modal overlay */}
      {showRSVP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Backdrop — tap outside to close */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowRSVP(false)}
          />

          {/* Modal card */}
          <div
            className="relative w-[92%] max-w-sm rounded-2xl z-10 overflow-hidden"
            style={{ background: 'linear-gradient(to bottom, #fdf6ee, #f5e8d0)' }}
          >

            {/* X close button */}
            <button
              onClick={() => setShowRSVP(false)}
              aria-label="Close RSVP"
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#D4B083]/40 text-[#790A2A] text-base leading-none"
            >
              ✕
            </button>

            {/* RSVP form */}
            <RSVP />

          </div>
        </div>
      )}

    </section>
  )
}

export default Location
