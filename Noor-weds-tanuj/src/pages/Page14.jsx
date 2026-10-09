import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Rsvp from './Rsvp'

import page13Bg       from '../assets/page13-bg.jpg'
import page14TopRight from '../assets/page14-topright.png'
import page14TopLeft  from '../assets/page14-topleft.png'
import page14Boat     from '../assets/page14-boat.png'
import page14Icon     from '../assets/page14-icon.png'
import page14TopText  from '../assets/page14-toptext.png'

gsap.registerPlugin(ScrollTrigger)

// Replace with real links later
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.3933706453163!2d98.26638947479152!3d8.84291879121119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3050c56d1f02aa2f%3A0x9ee00e771c837adb!2sKhao%20Lak%20Marriott%20Beach%20Resort%20%26%20Spa!5e0!3m2!1sen!2sin!4v1779893576668!5m2!1sen!2sin'
const DIRECTION_URL = 'https://maps.app.goo.gl/bpy72uFtwEEf35Fb6'

const Page14 = () => {
  const containerRef = useRef(null)
  const topRightRef  = useRef(null)
  const topLeftRef   = useRef(null)
  const boatRef      = useRef(null)
  const iconRef      = useRef(null)
  const topTextRef   = useRef(null)
  const mapRef       = useRef(null)
  const btnsRef      = useRef(null)

  const [showRsvp, setShowRsvp] = useState(false)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    })

    // Top right — from right
    tl.fromTo(topRightRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Top left — from left
    tl.fromTo(topLeftRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Boat — from right
    tl.fromTo(boatRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.1
    )

    // Icon — from above
    tl.fromTo(iconRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.15
    )

    // Top text — from above
    tl.fromTo(topTextRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.3
    )

    // Map — scale up
    tl.fromTo(mapRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.45
    )

    // Buttons — from below
    tl.fromTo(btnsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.6
    )
  }, [])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>

      {/* BG — no animation */}
      <img src={page13Bg} alt="bg"
        className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Top right — from right */}
      <img ref={topRightRef} src={page14TopRight} alt="top right"
        className="absolute top-0 -right-[14%] w-[30%] z-10"
        style={{ opacity: 0 }} />

      {/* Top left — from left */}
      <img ref={topLeftRef} src={page14TopLeft} alt="top left"
        className="absolute top-[20%] -left-[14%] w-[30%] z-10"
        style={{ opacity: 0 }} />

      {/* Boat — bottom right */}
      <img ref={boatRef} src={page14Boat} alt="boat"
        className="absolute bottom-[10%] -right-[20%] w-[45%] z-10"
        style={{ opacity: 0 }} />

      {/* Main content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center px-14 pt-[20%]">

        {/* Icon */}
        <img ref={iconRef} src={page14Icon} alt="icon"
          className="w-[6vw] mb-5"
          style={{ opacity: 0 }} />

        {/* Top text */}
        <img ref={topTextRef} src={page14TopText} alt="top text"
          className="w-[68vw] mb-12"
          style={{ opacity: 0 }} />

        {/* Map */}
        <div ref={mapRef} className="w-full rounded-2xl overflow-hidden mb-5"
          style={{ opacity: 0, height: '43vh' }}>
          <iframe
            title="venue map"
            src={MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Buttons */}
        <div ref={btnsRef} className="absolute bottom-10 w-full flex flex-col gap-5 px-10" style={{ opacity: 0 }}>

          {/* Get Direction — slim */}
          <div className="flex justify-center">
            <a href={DIRECTION_URL} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-6 py-2 rounded-full text-white text-lg"
              style={{
                background: 'rgb(126, 144, 117,0.15)',
                border: '1px solid rgba(255,255,255,0.35)',
                backdropFilter: 'blur(8px)',
                fontFamily: 'Playfair Display',
                letterSpacing: '0.08em',
                textDecoration: 'none',
              }}>
              <span style={{ fontSize: '16px' }}>📍</span>
              Get Direction
            </a>
          </div>

          {/* RSVP Now — full width */}
          <button
            onClick={() => setShowRsvp(true)}
            className="w-full py-2 rounded-2xl text-white text-2xl"
            style={{
              background: 'rgb(177, 174, 143,0.35)',
              border: '1px solid rgba(255,255,255,0.35)',
              backdropFilter: 'blur(8px)',
              fontFamily: 'Great Vibes',
              letterSpacing: '0.15em',
            }}>
            Rsvp now
          </button>

        </div>
      </div>

      {/* RSVP overlay — lives in its own file */}
      {showRsvp && <Rsvp onClose={() => setShowRsvp(false)} />}

    </div>
  )
}

export default Page14
