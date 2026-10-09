import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import page5Bg          from '../assets/page5-bg.png'
import page5Bottom      from '../assets/page5-bottom.png'
import page5Cloud       from '../assets/page5-cloud.png'
import page5Top         from '../assets/page5-top.png'
import page5TopLight    from '../assets/page5-toplight.png'
import page5LeftTree    from '../assets/page5-lefttree.png'
import page5RightTree   from '../assets/page5-rightree.png'
import page5Center      from '../assets/page5-center.png'
import page5CenterFloor from '../assets/page5-centerfloor.png'
import page5BelowTree   from '../assets/page5-belowtree.png'
import page5Candles     from '../assets/page5-candles.png'
import page5LeftLight   from '../assets/page5-leftlight.png'
import page5RightLight  from '../assets/page5-rightlight.png'
import page5Couple      from '../assets/page5-couple.png'
import page5Text1       from '../assets/page5-text1.png'
import page5Text2       from '../assets/page5-text2.png'
import page5Thur        from '../assets/page5-thur.png'
import page5Oct         from '../assets/page5-oct.png'
import page5_22         from '../assets/page5-22.png'
import page5_2026       from '../assets/page5-2026.png'
import page5Time        from '../assets/page5-time.png'

gsap.registerPlugin(ScrollTrigger)

const Page5 = () => {
  const containerRef   = useRef(null)
  // from above
  const topRef         = useRef(null)
  const topLightRef    = useRef(null)
  // from sides
  const leftTreeRef    = useRef(null)
  const rightTreeRef   = useRef(null)
  // scale up
  const centerRef      = useRef(null)
  const centerFloorRef = useRef(null)
  const coupleRef      = useRef(null)
  // from below
  const candlesRef     = useRef(null)
  const leftLightRef   = useRef(null)
  const rightLightRef  = useRef(null)
  // text — from above one by one
  const text1Ref       = useRef(null)
  const text2Ref       = useRef(null)
  const thursdayRef    = useRef(null)
  const dateRef        = useRef(null)
  const timeRef        = useRef(null)

  useGSAP(() => {
    // Same trigger as Page2
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    })

    // Top + toplight — slide down from above (together at position 0)
    tl.fromTo(topRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )
    tl.fromTo(topLightRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Left tree — slides from left
    tl.fromTo(leftTreeRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0
    )

    // Right tree — slides from right
    tl.fromTo(rightTreeRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0
    )

    // Center, centerfloor, couple — scale up
    tl.fromTo(centerFloorRef.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.1
    )
    tl.fromTo(centerRef.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.2
    )
    tl.fromTo(coupleRef.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.3
    )

    // Candles, left light, right light — rise from below
    tl.fromTo(candlesRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.2
    )
    tl.fromTo(leftLightRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.1
    )
    tl.fromTo(rightLightRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.1
    )

    // Text elements — drop in one by one from above
    tl.fromTo(text1Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.3
    )
    tl.fromTo(text2Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.45
    )
    tl.fromTo(thursdayRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.6
    )
    tl.fromTo(dateRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.75
    )
    tl.fromTo(timeRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.9
    )
  }, [])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>

      {/* Background — no animation */}
      <img src={page5Bg} alt="bg"
        className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Cloud — no animation */}
      <img src={page5Cloud} alt="cloud"
        className="absolute left-0 w-full z-10"
        style={{ top: '20%' }} />

      {/* Bottom — no animation */}
      <img src={page5Bottom} alt="bottom"
        className="absolute bottom-0 -left-[12%] max-w-[450px] z-10" />

      {/* Below tree — no animation */}
      <img src={page5BelowTree} alt="below tree"
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-full z-10" />

      {/* Left tree — from left */}
      <img ref={leftTreeRef} src={page5LeftTree} alt="left tree"
        className="absolute -left-[25%] bottom-[15%] w-[40%] z-30"
        style={{ opacity: 0 }} />

      {/* Right tree — from right */}
      <img ref={rightTreeRef} src={page5RightTree} alt="right tree"
        className="absolute -right-[20%] bottom-[30%] w-[40%] z-30"
        style={{ opacity: 0 }} />

      {/* Center floor — scales up */}
      <img ref={centerFloorRef} src={page5CenterFloor} alt="center floor"
        className="absolute bottom-[15%] -left-[15vw] max-w-[450px] z-10"
        style={{ opacity: 0 }} />

      {/* Candles — rises from below */}
      <img ref={candlesRef} src={page5Candles} alt="candles"
        className="absolute -bottom-2 -left-8 max-w-[420px] z-35"
        style={{ opacity: 0 }} />

      {/* Center — scales up */}
      <img ref={centerRef} src={page5Center} alt="center"
        className="absolute bottom-[14%] left-[6vw] max-w-[400px] z-20"
        style={{ opacity: 0 }} />

      {/* Top — slides from above */}
      <img ref={topRef} src={page5Top} alt="top"
        className="absolute -top-[6vh] left-1/2 -translate-x-1/2 w-full z-40"
        style={{ opacity: 0 }} />

      {/* Top light — slides from above */}
      <img ref={topLightRef} src={page5TopLight} alt="top light"
        className="absolute -top-[9vh] left-1/2 -translate-x-1/2 w-[90vw] z-45"
        style={{ opacity: 0 }} />

      {/* Left light — rises from below */}
      <img ref={leftLightRef} src={page5LeftLight} alt="left light"
        className="absolute -left-[15vw] bottom-0 w-[50%] z-50"
        style={{ opacity: 0 }} />

      {/* Right light — rises from below */}
      <img ref={rightLightRef} src={page5RightLight} alt="right light"
        className="absolute -right-[15vw] bottom-0 w-[50%] z-50"
        style={{ opacity: 0 }} />

      {/* Couple — scales up */}
      <img ref={coupleRef} src={page5Couple} alt="couple"
        className="absolute right-[33vw] bottom-4 w-[45%] z-50"
        style={{ opacity: 0 }} />

      {/* Text content — drops in one by one */}
      <div className="absolute inset-0 z-50 flex flex-col items-center pt-[45%]">

        <img ref={text1Ref} src={page5Text1} alt="text1"
          className="w-[60vw] mb-3"
          style={{ opacity: 0 }} />

        <img ref={text2Ref} src={page5Text2} alt="text2"
          className="w-[45vw] mb-8"
          style={{ opacity: 0 }} />

        <div className="flex flex-col items-center gap-1">

          <img ref={thursdayRef} src={page5Thur} alt="thursday"
            className="w-[20vw] h-auto mb-3"
            style={{ opacity: 0 }} />

          <div ref={dateRef} className="flex items-center gap-2" style={{ opacity: 0 }}>
            <img src={page5Oct} alt="oct" className="w-[10vw] h-auto" style={{ marginTop: '6px' }} />
            <span className="text-white" style={{ opacity: '0.2', fontSize: '30px', lineHeight: 1, marginLeft: '6px', marginRight: '2px' }}>|</span>
            <img src={page5_22} alt="22" className="w-[12vw] h-auto" />
            <span className="text-white" style={{ opacity: '0.2', fontSize: '30px', lineHeight: 1, marginLeft: '2px', marginRight: '6px' }}>|</span>
            <img src={page5_2026} alt="2026" className="w-[10vw] h-auto" style={{ marginTop: '6px' }} />
          </div>

          <img ref={timeRef} src={page5Time} alt="time"
            className="w-[30vw] h-auto mb-2"
            style={{ marginTop: '10px', opacity: 0 }} />

        </div>
      </div>

    </div>
  )
}

export default Page5
