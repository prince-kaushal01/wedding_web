import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import page4Bg          from '../assets/page4-bg.png'
import page4Top         from '../assets/page4-top.png'
import page4Bottom      from '../assets/page4-bottom.png'
import page4Left        from '../assets/page4-left.png'
import page4Right       from '../assets/page4-right.png'
import page4Couple      from '../assets/page4-couple.png'
import page4Frame       from '../assets/page4-frame.png'
import page4Text1       from '../assets/page4-text1.png'
import page4Text2       from '../assets/page4-text2.png'
import page4BottomLeft  from '../assets/page4-bottomleft.png'
import page4BottomLeft2 from '../assets/page4-bottomleft2.png'
import page4BottomLeft3 from '../assets/page4-bottomleft3.png'
import page4Thur        from '../assets/page4-thur.png'
import page4Oct         from '../assets/page4-oct.png'
import page4_22         from '../assets/page4-22.png'
import page4_2026       from '../assets/page4-2026.png'
import page4Time        from '../assets/page4-time.png'

gsap.registerPlugin(ScrollTrigger)

const Page4 = () => {
  const containerRef  = useRef(null)
  // decorations
  const topRef        = useRef(null)
  const leftRef       = useRef(null)
  const frameRef      = useRef(null)
  const coupleRef     = useRef(null)
  const rightRef      = useRef(null)
  const bl1Ref        = useRef(null)
  const bl2Ref        = useRef(null)
  const bl3Ref        = useRef(null)
  // text content
  const text1Ref      = useRef(null)
  const text2Ref      = useRef(null)
  const thursdayRef   = useRef(null)
  const dateRef       = useRef(null)
  const timeRef       = useRef(null)

  useGSAP(() => {
    // Same trigger as page2 — play on enter, reverse on scroll back
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    })

    // Top image — slides down from above (position 0, starts with everything)
    tl.fromTo(topRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0
    )

    // Left image — slides in from left
    tl.fromTo(leftRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Frame — slides in from right
    tl.fromTo(frameRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Right decoration — slides in from right
    tl.fromTo(rightRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Couple — scales up from its own center
    tl.fromTo(coupleRef.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.2
    )

    // Bottom left images come from the left one by one
    tl.fromTo(bl1Ref.current,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.1
    )
    tl.fromTo(bl2Ref.current,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.25
    )
    tl.fromTo(bl3Ref.current,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.4
    )

    // Text content drops in one by one from above
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
      <img src={page4Bg} alt="bg" className="absolute inset-0 w-full h-full object-cover" />

      {/* ── DIV 1 — Top image + all text content ── */}
      <div className="absolute inset-0 z-50 flex flex-col items-center">

        {/* Top — slides from above */}
        <img ref={topRef} src={page4Top} alt="top"
          className="absolute -top-[11%] left-0 w-full z-10"
          style={{ opacity: 0 }} />

        {/* Text content — centered column, sits above the bottom decor */}
        <div className="w-full flex flex-col items-center" style={{ paddingTop: 'clamp(5%, 12vh, 30%)' }}>

          <img ref={text1Ref} src={page4Text1} alt="text1"
            className="w-[78vw] mb-3"
            style={{ opacity: 0 }} />

          <img ref={text2Ref} src={page4Text2} alt="text2"
            className="w-[40vw] mb-5"
            style={{ opacity: 0 }} />

          <div className="flex flex-col items-center gap-1 mt-2">
          
                    <img ref={thursdayRef} src={page4Thur} alt="thursday"
                      className="w-[20vw] h-auto mb-3"
                      style={{ opacity: 0 }} />
          
                    <div ref={dateRef} className="flex items-center gap-2" style={{ opacity: 0 }}>
                      <img src={page4Oct} alt="oct" className="w-[10vw] h-auto" style={{ marginTop: '6px' }} />
                      <span className="text-white" style={{ opacity: '0.2', fontSize: '30px', lineHeight: 1, marginLeft: '6px', marginRight: '2px' }}>|</span>
                      <img src={page4_22} alt="22" className="w-[12vw] h-auto" />
                      <span className="text-white" style={{ opacity: '0.2', fontSize: '30px', lineHeight: 1, marginLeft: '2px', marginRight: '6px' }}>|</span>
                      <img src={page4_2026} alt="2026" className="w-[10vw] h-auto" style={{ marginTop: '6px' }} />
                    </div>
          
                    <img ref={timeRef} src={page4Time} alt="time"
                      className="w-[30vw] h-auto mb-2"
                      style={{ marginTop: '10px', opacity: 0 }} />
          
                  </div>
        </div>
      </div>

      {/* ── DIV 2 — Bottom decorations (left, frame, couple, right, bottom-left images, bottom bar) ── */}
      <div className="absolute inset-0 z-10">

        {/* Bottom bar — no animation */}
        <img src={page4Bottom} alt="bottom" className="absolute bottom-0 left-0 w-full z-10" />

        {/* Left — slides from left */}
        <img ref={leftRef} src={page4Left} alt="left"
          className="absolute left-0 bottom-[13%] w-[42%] z-10"
          style={{ opacity: 0 }} />

        {/* Frame — slides from right */}
        <img ref={frameRef} src={page4Frame} alt="frame"
          className="absolute right-[10%] bottom-[21%] w-[30%] z-20"
          style={{ opacity: 0 }} />

        {/* Couple — scales up */}
        <img ref={coupleRef} src={page4Couple} alt="couple"
          className="absolute right-[26%] bottom-[16%] w-[42%] z-40"
          style={{ opacity: 0 }} />

        {/* Right — slides from right */}
        <img ref={rightRef} src={page4Right} alt="right"
          className="absolute -right-[2%] bottom-[3%] w-[33%] z-30"
          style={{ opacity: 0 }} />

        {/* Bottom left images — slide in from left one by one */}
        <img ref={bl1Ref} src={page4BottomLeft} alt=""
          className="absolute bottom-[8%] left-0 w-[20%] z-10 pointer-events-none"
          style={{ opacity: 0 }} />
        <img ref={bl2Ref} src={page4BottomLeft2} alt=""
          className="absolute bottom-[7%] left-[16%] w-[15%] z-20 pointer-events-none"
          style={{ opacity: 0 }} />
        <img ref={bl3Ref} src={page4BottomLeft3} alt=""
          className="absolute bottom-[2%] left-[16%] w-[22%] z-30 pointer-events-none"
          style={{ opacity: 0 }} />

      </div>

    </div>
  )
}

export default Page4
