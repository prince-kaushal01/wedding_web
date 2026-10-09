import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import page7Bg          from '../assets/page7-bg.png'
import page7AboveBg     from '../assets/page7-abovebg.png'
import page7Bottom      from '../assets/page7-bottom.png'
import page7Top         from '../assets/page7-top.png'
import page7Left        from '../assets/page7-left.png'
import page7Right       from '../assets/page7-right.png'
import page7LeftAbove   from '../assets/page7-leftabove.png'
import page7RightAbove  from '../assets/page7-rightabove.png'
import page7Light       from '../assets/page7-light.png'
import page7Center      from '../assets/page7-center.png'
import page7BelowCenter from '../assets/page7-belowcenter.png'
import page7Grass       from '../assets/page7-grass.png'
import page7Couple      from '../assets/page7-couple.png'
import page7Candle1     from '../assets/page7-candle1.png'
import page7Candle2     from '../assets/page7-candle2.png'
import page7Text1       from '../assets/page7-text1.png'
import page7Text2       from '../assets/page7-text2.png'
import page7friday from "../assets/page7-friday.png";
import page7Oct from "../assets/page7-oct.png";
import page7_23 from "../assets/page7-23.png";
import page7_2026 from "../assets/page7-2026.png";
import page7Time from "../assets/page7-time.png";

gsap.registerPlugin(ScrollTrigger)

const Page7 = () => {
  const containerRef    = useRef(null)
  // from above
  const topRef          = useRef(null)
  const lightRef        = useRef(null)
  // from sides
  const leftRef         = useRef(null)
  const rightRef        = useRef(null)
  const leftAboveRef    = useRef(null)
  const rightAboveRef   = useRef(null)
  // scale up
  const centerRef       = useRef(null)
  const coupleRef       = useRef(null)
  // from below
  const candle1aRef     = useRef(null)  // first candle1 instance
  const candle2Ref      = useRef(null)
  const candle1bRef     = useRef(null)  // second candle1 instance
  // text — from above one by one
  const text1Ref        = useRef(null)
  const text2Ref        = useRef(null)
  const fridayRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  useGSAP(() => {
    // Same trigger as Page4 / Page2
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    })

    // Top — from above
    tl.fromTo(topRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Light — from above
    tl.fromTo(lightRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.2
    )

    // Left + leftabove — from left together
    tl.fromTo(leftRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0
    )
    tl.fromTo(leftAboveRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0
    )

    // Right + rightabove — from right together
    tl.fromTo(rightRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0
    )
    tl.fromTo(rightAboveRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 0
    )

    // Center — scale up
    tl.fromTo(centerRef.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.15
    )

    // Couple — scale up
    tl.fromTo(coupleRef.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.3
    )

    // Candles — rise from below one by one
    tl.fromTo(candle1aRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.1
    )
    tl.fromTo(candle2Ref.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.25
    )
    tl.fromTo(candle1bRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.4
    )

    // Text — from above one by one
    tl.fromTo(text1Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.3
    )
    tl.fromTo(text2Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.45
    )
    tl.fromTo(fridayRef.current,
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

      {/* BG — no animation */}
      <img src={page7Bg} alt="bg"
        className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Above bg — no animation */}
      <img src={page7AboveBg} alt="above bg"
        className="absolute inset-0 w-full h-full object-cover z-[5]" />

      {/* Bottom — no animation */}
      <img src={page7Bottom} alt="bottom"
        className="absolute -bottom-10 left-0 w-full z-30" />

      {/* Top — from above */}
      <img ref={topRef} src={page7Top} alt="top"
        className="absolute -top-[18vh] left-6 w-full z-10"
        style={{ opacity: 0 }} />

      {/* Left — from left */}
      <img ref={leftRef} src={page7Left} alt="left"
        className="absolute -left-6 top-[20%] w-[20%] z-15"
        style={{ opacity: 0 }} />

      {/* Right — from right */}
      <img ref={rightRef} src={page7Right} alt="right"
        className="absolute -right-6 top-[20%] w-[20%] z-15"
        style={{ opacity: 0 }} />

      {/* Left above — from left */}
      <img ref={leftAboveRef} src={page7LeftAbove} alt="left above"
        className="absolute -left-4 top-[15%] w-[18%] z-20"
        style={{ opacity: 0 }} />

      {/* Right above — from right */}
      <img ref={rightAboveRef} src={page7RightAbove} alt="right above"
        className="absolute -right-2 top-[20%] w-[18%] z-20"
        style={{ opacity: 0 }} />

      {/* Center — scale up */}
      <img ref={centerRef} src={page7Center} alt="center"
        className="absolute top-[34%] left-1/2 -translate-x-1/2 w-full z-20"
        style={{ opacity: 0 }} />

      {/* Light — from above */}
      <img ref={lightRef} src={page7Light} alt="light"
        className="absolute top-[50%] left-0 w-full z-25"
        style={{ opacity: 0 }} />

      {/* Grass — no animation */}
      <img src={page7Grass} alt="grass"
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-76 z-45" />

      {/* Below center — no animation */}
      <img src={page7BelowCenter} alt="below center"
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-62 z-40" />

      {/* Candle1 first — rises from below */}
      <img ref={candle1aRef} src={page7Candle1} alt="candle 1"
        className="absolute bottom-0 -left-2 max-w-[400px] z-41"
        style={{ opacity: 0 }} />

      {/* Candle2 — rises from below */}
      <img ref={candle2Ref} src={page7Candle2} alt="candle 2"
        className="absolute bottom-[14%] -left-3 max-w-[410px] z-41"
        style={{ opacity: 0 }} />

      {/* Candle1 second — rises from below */}
      <img ref={candle1bRef} src={page7Candle1} alt="candle 1b"
        className="absolute bottom-[19%] left-[22vw] w-54 z-47"
        style={{ opacity: 0 }} />

      {/* Couple — scale up */}
      <img ref={coupleRef} src={page7Couple} alt="couple"
        className="absolute bottom-[2%] left-[13vw] w-[60%] z-40"
        style={{ opacity: 0 }} />

      {/* Text content — from above one by one */}
      <div className="absolute inset-0 z-50 flex flex-col items-center pt-[45%]">

        <img ref={text1Ref} src={page7Text1} alt="text1"
          className="w-[35vw] mb-2"
          style={{ opacity: 0 }} />

        <img ref={text2Ref} src={page7Text2} alt="text2"
          className="w-[65vw] mb-5"
          style={{ opacity: 0 }} />

        <div className="flex flex-col items-center gap-1">
                  <img
                    ref={fridayRef}
                    src={page7friday}
                    alt="friday"
                    className="w-[20vw] h-auto mb-3"
                    style={{ opacity: 0 }}
                  />
        
                  <div
                    ref={dateRef}
                    className="flex items-center gap-2"
                    style={{ opacity: 0 }}
                  >
                    <img
                      src={page7Oct}
                      alt="oct"
                      className="w-[10vw] h-auto"
                      style={{ marginTop: "6px" }}
                    />
                    <span
                      className="text-white"
                      style={{
                        opacity: "0.2",
                        fontSize: "30px",
                        lineHeight: 1,
                        marginLeft: "6px",
                        marginRight: "2px",
                      }}
                    >
                      |
                    </span>
                    <img src={page7_23} alt="23" className="w-[12vw] h-auto" />
                    <span
                      className="text-white"
                      style={{
                        opacity: "0.2",
                        fontSize: "30px",
                        lineHeight: 1,
                        marginLeft: "2px",
                        marginRight: "6px",
                      }}
                    >
                      |
                    </span>
                    <img
                      src={page7_2026}
                      alt="2026"
                      className="w-[10vw] h-auto"
                      style={{ marginTop: "6px" }}
                    />
                  </div>
        
                  <img
                    ref={timeRef}
                    src={page7Time}
                    alt="time"
                    className="w-[30vw] h-auto mb-2"
                    style={{ marginTop: "22px", opacity: 0 }}
                  />
                </div>
      </div>

    </div>
  )
}

export default Page7
