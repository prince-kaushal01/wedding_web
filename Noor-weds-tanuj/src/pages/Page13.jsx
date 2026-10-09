import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import page13Bg    from '../assets/page13-bg.jpg'
import page13Left  from '../assets/page13-left.png'
import page13Right from '../assets/page13-right.png'
import page13Sun   from '../assets/page13-sun.png'
import page13Text1 from '../assets/page13-text1.png'
import page13Text2 from '../assets/page13-text2.png'

gsap.registerPlugin(ScrollTrigger)

const Page13 = () => {
  const containerRef = useRef(null)
  const leftRef      = useRef(null)
  const rightRef     = useRef(null)
  const sunRef       = useRef(null)
  const text1Ref     = useRef(null)
  const text2Ref     = useRef(null)
  const box1Ref      = useRef(null)
  const box2Ref      = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    })

    // Left — from left
    tl.fromTo(leftRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Right — from right
    tl.fromTo(rightRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Sun — scale up
    tl.fromTo(sunRef.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.1
    )

    // Text — from above one by one
    tl.fromTo(text1Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.2
    )
    tl.fromTo(text2Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.35
    )

    // Boxes — from above one by one
    tl.fromTo(box1Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.5
    )
    tl.fromTo(box2Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.65
    )
  }, [])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>

      {/* BG — no animation */}
      <img src={page13Bg} alt="bg"
        className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Left — from left */}
      <img ref={leftRef} src={page13Left} alt="left"
        className="absolute top-10 -left-[15%] w-[45vw] object-contain z-10"
        style={{ opacity: 0 }} />

      {/* Right — from right */}
      <img ref={rightRef} src={page13Right} alt="right"
        className="absolute bottom-12 -right-8 w-[45vw] object-contain z-10"
        style={{ opacity: 0 }} />

      {/* Sun — center */}
      <img ref={sunRef} src={page13Sun} alt="sun"
        className="absolute top-[60vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] z-5"
        style={{ opacity: 0 }} />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center pt-[30%] px-6">

        <img ref={text1Ref} src={page13Text1} alt="text1"
          className="w-[30vw] mb-5"
          style={{ opacity: 0 }} />

        <img ref={text2Ref} src={page13Text2} alt="text2"
          className="w-[60vw] mb-14"
          style={{ opacity: 0 }} />

        {/* Family boxes */}
        <div className="flex flex-col items-center gap-6 w-full">

          <div ref={box1Ref}
            className="w-[75%] py-12 rounded-2xl flex items-center justify-center"
            style={{
              background: 'rgba(173, 216, 230, 0.25)',
              border: '1px solid rgba(173, 216, 230, 0.4)',
              backdropFilter: 'blur(2px)',
              opacity: 0,
            }}>
            <p style={{ color: '#7E7458', fontSize: '25px', letterSpacing: '0.1em', fontFamily: 'Playfair Display' }}>
              Gaba Family
            </p>
          </div>

          <div ref={box2Ref}
            className="w-[75%] py-12 rounded-2xl flex items-center justify-center"
            style={{
              background: 'rgba(173, 216, 230, 0.25)',
              border: '1px solid rgba(173, 216, 230, 0.4)',
              backdropFilter: 'blur(2px)',
              opacity: 0,
            }}>
            <p style={{ color: '#7E7458', fontSize: '25px', letterSpacing: '0.1em', fontFamily: 'Playfair Display' }}>
              Khurana Family
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Page13
