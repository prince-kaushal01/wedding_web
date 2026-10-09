import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Mobile assets ─────────────────────────────────────────────────────────────
import page7Bg     from '../assets/page7-bg.jpg'
import page7Center from '../assets/page7-center.png'
import page7Above  from '../assets/page7-above.png'
import page7Bottom from '../assets/page7-bottom.png'
import page7Logo   from '../assets/page7-logo.png'
import page7Icon1  from '../assets/page7-icon1.png'
import page7Icon2  from '../assets/page7-icon2.png'
import page7Icon3  from '../assets/page7-icon3.png'
import page7design from '../assets/pae1-design.png'

// ── Desktop assets ────────────────────────────────────────────────────────────
import page7DBg          from '../assets/page7-d-bg.jpg'
import page7DTopleft     from '../assets/page7-d-topleft.png'
import page7DBottomright from '../assets/page7-d-bottomright.png'
import page7DCenter      from '../assets/page7-d-center.png'
import page7DAbove       from '../assets/page7-d-above.png'
import page7DBottom      from '../assets/page7-d-bottom.png'

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxj077tjJc24xGip9gtt1pB3s0yG4JkJ4Oyc6kAziIvCP6MPI8Ykt4k2nY4zcYOyEr9tA/exec'
const MAP_LINK  = 'https://maps.google.com'

const EVENT_LIST = [
  { id: 'engagement', label: 'Engagement',          icon: page7Icon1, Address: "St. Mary's Metropolitan Cathedral, Changanassery" },
  { id: 'event2',     label: 'Engagement Reception', icon: page7Icon2, Address: "Contour Backwaters & Resort, Changanassery" },
  { id: 'event3',     label: 'Wedding Church',        icon: page7Icon3, Address: "St. Joseph's Church Pushpagiri, Kottayam" },
  { id: 'event4',     label: 'Wedding Reception',     icon: page7Icon2, Address: "Backwaters Ripples, Kumarakom" },
]

const PinIcon = ({ size = 10, color = '#AD8D67' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" className="inline-block flex-shrink-0">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
)

const Page7 = () => {
  const [name,    setName]    = useState('')
  const [guests,  setGuests]  = useState(1)
  const [checked, setChecked] = useState({})
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  // ── Mobile refs ──────────────────────────────────────────────────────────
  const sectionRef    = useRef(null)
  const aboveRef      = useRef(null)
  const cardRef       = useRef(null)
  const directionRef  = useRef(null)

  // ── Desktop refs ─────────────────────────────────────────────────────────
  const dSectionRef    = useRef(null)
  const dTopleftRef    = useRef(null)
  const dBottomrightRef= useRef(null)
  const dAboveRef      = useRef(null)
  const dCardRef       = useRef(null)
  const dBottomRef     = useRef(null)
  const dDirectionRef  = useRef(null)

  // ── Animation — mobile ────────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(aboveRef.current,     { y: -50,     opacity: 0 })
    gsap.set(cardRef.current,      { y: 50, scale: 0.95, opacity: 0 })
    gsap.set(directionRef.current, { y: 30,      opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%',    // ← animation fires when section top hits 30% from viewport top
        end:   'bottom 20%',
        toggleActions: 'play reverse play reverse', // replays on scroll-back
      }
    })

    tl.to(aboveRef.current,     { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out'                  }, 0   )
      .to(cardRef.current,      { y: 0, scale: 1, opacity: 1, duration: 1.4, ease: 'back.out(1.2)'  }, 0.15)
      .to(directionRef.current, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'                  }, 0.4 )
  }, [])

  // ── Animation — desktop ───────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(dTopleftRef.current,    { x: '-120%', opacity: 0 })
    gsap.set(dBottomrightRef.current,{ x: '120%',  opacity: 0 })
    gsap.set(dAboveRef.current,      { y: -50,     opacity: 0 })
    gsap.set(dCardRef.current,       { y: 50, scale: 0.95, opacity: 0 })
    gsap.set(dBottomRef.current,     { y: 40,      opacity: 0 })
    gsap.set(dDirectionRef.current,  { y: 30,      opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: dSectionRef.current,
        start: 'top 30%',    // ← animation fires when section top hits 30% from viewport top
        end:   'bottom 20%',
        toggleActions: 'play reverse play reverse', // replays on scroll-back
      }
    })

    tl.to(dTopleftRef.current,    { x: 0, opacity: 1, duration: 1.5, ease: 'expo.out'                  }, 0   )
      .to(dBottomrightRef.current,{ x: 0, opacity: 1, duration: 1.5, ease: 'expo.out'                  }, 0   )
      .to(dAboveRef.current,      { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out'                  }, 0.15)
      .to(dCardRef.current,       { y: 0, scale: 1, opacity: 1, duration: 1.4, ease: 'back.out(1.2)'  }, 0.3 )
      .to(dBottomRef.current,     { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'                  }, 0.45)
      .to(dDirectionRef.current,  { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out'                  }, 0.55)
  }, [])

  const toggle = id => setChecked(prev => ({ ...prev, [id]: !prev[id] }))

  const handleSend = async () => {
    if (!name.trim()) { setError('Please enter your full name.'); return }
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      params.append('name',   name.trim())
      params.append('guests', String(guests))
      params.append('events', EVENT_LIST.filter(e => checked[e.id]).map(e => e.label).join(', ') || 'None')
      await fetch(`${SHEET_URL}?${params.toString()}`, { method: 'GET', mode: 'no-cors' })
      setSuccess(true)
    } catch {
      setError('Unable to send. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = [
    'w-full border border-[#092648] rounded-sm shadow-sm bg-transparent outline-none',
    'text-[10px] text-[#092648] placeholder-[#092648] py-1.5 px-2 uppercase tracking-wide',
  ].join(' ')

  const labelCls = 'block text-[9px] tracking-[0.10em] text-[#092648] font-semibold mb-1'

  // ── Shared RSVP form content — called as a function, NOT rendered as a component
  // Using <RsvpForm /> inside a parent causes remount on every keystroke (focus loss)
  const RsvpForm = () => (
    <div className="w-full flex flex-col items-center gap-3">

      {/* Full Name */}
      <div className="absolute top-[21%] w-full px-5">
        <label className={labelCls} style={{ fontFamily: 'Playfair Display' }}>FULL NAME</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className={inputCls} />
      </div>

      {/* No. of Guests */}
      <div className="absolute top-[31%] w-full px-5">
        <label className={labelCls} style={{ fontFamily: 'Playfair Display' }}>NO. OF GUESTS ATTENDING</label>
        <div className="flex items-center justify-between border border-[#092648] rounded-sm shadow-sm py-1 px-3 bg-transparent">
          <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="text-[#092648] text-base leading-none select-none">−</button>
          <span className="text-[#092648] text-[12px] font-medium">{guests}</span>
          <button onClick={() => setGuests(g => g + 1)} className="text-[#092648] text-base leading-none select-none">+</button>
        </div>
      </div>

      {/* Events */}
      <div className="absolute top-[41%] w-full px-5">
        <label className={labelCls} style={{ fontFamily: 'Playfair Display', textAlign: 'center' }}>EVENTS YOU'LL BE JOINING</label>
        <div className="flex flex-col gap-2.5 mt-1">
          {EVENT_LIST.map(ev => (
            <div key={ev.id} className="flex items-center gap-2 border border-[#092648] rounded-sm px-2 py-1">
              <div className="w-10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src={ev.icon} alt="" className="w-10 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-semibold text-[#092648] tracking-wide leading-3" style={{ fontFamily: 'Playfair Display' }}>{ev.label}</p>
                <p className="text-[8px] text-[#092648] font-medium leading-3.5 mt-0.5 flex items-start gap-0.5">
                  <PinIcon size={8} color="#092648" />
                  <span>{ev.Address}</span>
                </p>
              </div>
              <div className="flex flex-col items-end justify-between gap-3 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={!!checked[ev.id]}
                  onChange={() => toggle(ev.id)}
                  className="w-3.5 h-3.5 appearance-none border border-[#092648] rounded-sm cursor-pointer checked:bg-[#092648] checked:border-[#092648]"
                />
                <a href="#" className="flex items-center text-[7px] text-[#A17847] whitespace-nowrap">
                  <PinIcon size={7} color="#A17847" />
                  View Location &gt;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-[9px] text-center px-5 -mt-1 absolute top-[94%]">{error}</p>}

      <button
        onClick={handleSend}
        disabled={loading}
        className="absolute cursor-pointer top-[88%] flex items-center justify-center gap-2 bg-[#092648] text-white text-[9px] tracking-[0.2em] py-1.5 px-10 rounded-full mb-4 disabled:opacity-70 hover:scale-105 hover:bg-[#1a4a7a] transition-all duration-200"
        style={{ fontFamily: 'Playfair Display' }}
      >
        {loading ? <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'SEND RSVP'}
      </button>

    </div>
  )

  return (
    <>
      {/* ══════════════════════════════════════════════════
          MOBILE  (hidden on md+)
      ══════════════════════════════════════════════════ */}
      <section ref={sectionRef} className="block md:hidden relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pb-16">

        <img src={page7Bg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center top-[3%] -left-7">
          <img ref={aboveRef} src={page7Above} alt="" className="absolute top-4 left-23 w-70 z-20 pointer-events-none" />
          <div ref={cardRef} className="relative w-full">
            <img src={page7Center} alt="" className="w-full pointer-events-none relative z-10" />
            <div className="absolute inset-0 z-30 flex flex-col items-center pt-14 px-6 ml-20 mr-4 overflow-y-auto">
              <img src={page7Logo}   alt="" className="absolute top-[6%]  w-28 pointer-events-none" />
              <img src={page7design} alt="" className="absolute top-[19%] w-28 mb-4 pointer-events-none" />
              {success ? (
                <p className="text-[#092648] text-center text-[11px] tracking-wide px-4 mt-4 absolute top-[50%] -translate-y-1/2" style={{ fontFamily: 'Playfair Display' }}>
                  Thank you! Your RSVP has been received.
                </p>
              ) : RsvpForm()}
            </div>
          </div>
        </div>

        <div ref={directionRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <a href={MAP_LINK} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-[#AD8D67] text-[#AD8D67] text-[9px] tracking-[0.2em] py-1.5 px-6 rounded-full bg-transparent hover:scale-105 transition-transform duration-200"
            style={{ fontFamily: 'Playfair Display' }}
          >
            <PinIcon size={10} color="#AD8D67" />
            GET DIRECTION
          </a>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════
          DESKTOP  (hidden below md)
      ══════════════════════════════════════════════════ */}
      <section ref={dSectionRef} className="hidden md:flex relative w-full h-screen items-center justify-center overflow-hidden">

        {/* Background — full cover */}
        <img src={page7DBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />

        {/* Topleft — left edge */}
        <img ref={dTopleftRef} src={page7DTopleft} alt="" className="absolute left-0 top-0 w-[23vw] z-10 pointer-events-none" />

        {/* Center card + above overlay */}
        <div className="relative z-20 flex flex-col items-center ml-30 -mt-10">

          {/* page7-d-above — decorative overlay on top of center */}
          <img ref={dAboveRef} src={page7DAbove} alt="" className="absolute top-6 left-[16%] w-69 z-30 pointer-events-none" />

          {/* page7-d-center — card frame */}
          <div ref={dCardRef} className="relative w-[36vw]">
            <img src={page7DCenter} alt="" className="w-96 pointer-events-none relative z-10" />

            {/* Form content sits on top of center image */}
            <div className="absolute inset-0 z-30 flex flex-col items-center pt-16 mt-4 px-6 ml-20 mr-46 overflow-y-auto">
              <img src={page7Logo}   alt="" className="absolute top-[4%]  w-28 pointer-events-none" />
              <img src={page7design} alt="" className="absolute top-[18%] w-28 mb-4 pointer-events-none" />
              {success ? (
                <p className="text-[#092648] text-center text-[11px] tracking-wide px-4 mt-4 absolute top-[50%] -translate-y-1/2" style={{ fontFamily: 'Playfair Display' }}>
                  Thank you! Your RSVP has been received.
                </p>
              ) : RsvpForm()}
            </div>
          </div>

          {/* page7-d-bottom — below center card */}
          <img ref={dBottomRef} src={page7DBottom} alt="" className="w-[16vw] -ml-24 mt-2 pointer-events-none z-10" />

        </div>

        {/* Bottomright — right edge, last in DOM to paint on top */}
        <img ref={dBottomrightRef} src={page7DBottomright} alt="" className="absolute right-0 bottom-0 w-72 z-[999] pointer-events-none" />

        {/* GET DIRECTION button — pinned to bottom */}
        <div ref={dDirectionRef} className="absolute bottom-7 left-[45vw] z-20">
          <a href={MAP_LINK} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-[#AD8D67] text-[#AD8D67] text-[9px] tracking-[0.2em] py-1.5 px-6 rounded-full bg-transparent hover:scale-105 transition-transform duration-200"
            style={{ fontFamily: 'Playfair Display' }}
          >
            <PinIcon size={10} color="#AD8D67" />
            GET DIRECTION
          </a>
        </div>

      </section>
    </>
  )
}

export default Page7
