import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import page8Bg         from '../assets/page8-bg.png'
import page8TopRight   from '../assets/page8-topright.png'
import page8BottomLeft from '../assets/page8-bottomleft.png'
import page8Text1      from '../assets/page8-text1.png'
import page8Text2      from '../assets/page8-text2.png'
import page8Text3      from '../assets/page8-text3.png'
import page8Icon       from '../assets/page8-icon.png'
import page8Img        from '../assets/page8-img.png'
import page8M1         from '../assets/page8-m1.png'
import page8M2         from '../assets/page8-m2.png'
import page8M3         from '../assets/page8-m3.png'
import page8M4         from '../assets/page8-m4.png'
import page8Sub        from '../assets/page8-sub.png'

gsap.registerPlugin(ScrollTrigger)

const MenuCard = ({ imgSrc, mSrc, mClassName = 'w-[65%] mt-10', subClassName = 'w-[60%]', onClick }) => (
  <div
    className="relative cursor-pointer"
    style={{ width: '32vw', maxWidth: '180px' }}
    onClick={onClick}
  >
    <img src={imgSrc} alt="menu bg" className="w-full" />
    <div className="absolute inset-0 flex flex-col items-center justify-between py-[30%] px-[8%]">
      <img src={mSrc} alt="m" className={`object-contain ${mClassName}`} />
      <img src={page8Sub} alt="sub" className={`object-contain ${subClassName}`} />
    </div>
  </div>
)

const Page8 = ({ onOpenPage9, onOpenPage10, onOpenPage11, onOpenPage12 }) => {
  const containerRef  = useRef(null)
  const topRightRef   = useRef(null)
  const bottomLeftRef = useRef(null)
  const text1Ref      = useRef(null)
  const text2Ref      = useRef(null)
  const card1Ref      = useRef(null)
  const card2Ref      = useRef(null)
  const card3Ref      = useRef(null)
  const card4Ref      = useRef(null)
  const iconRef       = useRef(null)
  const text3Ref      = useRef(null)

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
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Bottom left — from left
    tl.fromTo(bottomLeftRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
    )

    // Text1 — from above
    tl.fromTo(text1Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.1
    )

    // Text2 — from above
    tl.fromTo(text2Ref.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.25
    )

    // Cards — scale up one by one
    tl.fromTo(card1Ref.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.35
    )
    tl.fromTo(card2Ref.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.45
    )
    tl.fromTo(card3Ref.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.55
    )
    tl.fromTo(card4Ref.current,
      { scale: 0.75, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.65
    )

    // Icon — from above
    tl.fromTo(iconRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.75
    )

    // Text3 — from above
    tl.fromTo(text3Ref.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.85
    )
  }, [])

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>

      {/* BG — no animation */}
      <img src={page8Bg} alt="bg"
        className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Top right — from right */}
      <img ref={topRightRef} src={page8TopRight} alt="top right"
        className="absolute -top-10 -right-[30vw] w-[50%] z-10 rotate-180"
        style={{ opacity: 0 }} />

      {/* Bottom left — from left */}
      <img ref={bottomLeftRef} src={page8BottomLeft} alt="bottom left"
        className="absolute bottom-0 -left-[25%] w-[45%] z-10 rotate-180"
        style={{ opacity: 0 }} />

      {/* ── DIV 1 — Text1 + Text2 anchored to top ── */}
      <div className="absolute inset-x-0 top-0 z-20 flex flex-col items-center pt-[10%]">

        <img ref={text1Ref} src={page8Text1} alt="text1"
          className="w-[55vw] mb-5"
          style={{ opacity: 0 }} />

        <img ref={text2Ref} src={page8Text2} alt="text2"
          className="w-[80vw] mb-5"
          style={{ opacity: 0 }} />

      </div>

      {/* ── DIV 2 — 2×2 grid cards centered vertically ── */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">

        <div className="flex flex-col items-center gap-6">

          {/* Row 1 */}
          <div className="flex gap-12">
            <div ref={card1Ref} style={{ opacity: 0 }}>
              <MenuCard imgSrc={page8Img} mSrc={page8M1} onClick={onOpenPage9} />
            </div>
            <div ref={card2Ref} style={{ opacity: 0 }}>
              <MenuCard imgSrc={page8Img} mSrc={page8M2}
                mClassName="w-[80%] mt-13"
                subClassName="w-[60%] mb-1"
                onClick={onOpenPage10} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-12">
            <div ref={card3Ref} style={{ opacity: 0 }}>
              <MenuCard imgSrc={page8Img} mSrc={page8M3}
                mClassName="w-[50%] mt-10"
                subClassName="w-[55%]"
                onClick={onOpenPage11} />
            </div>
            <div ref={card4Ref} style={{ opacity: 0 }}>
              <MenuCard imgSrc={page8Img} mSrc={page8M4}
                mClassName="w-[80%] mt-13"
                subClassName="w-[60%] mb-1"
                onClick={onOpenPage12} />
            </div>
          </div>

        </div>

      </div>

      {/* ── DIV 3 — Icon + Text3 anchored to bottom ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center pb-6">

        <img ref={iconRef} src={page8Icon} alt="icon"
          className="w-[8vw] mb-4"
          style={{ opacity: 0 }} />

        <img ref={text3Ref} src={page8Text3} alt="text3"
          className="w-[70vw]"
          style={{ opacity: 0 }} />

      </div>

    </div>
  )
}

export default Page8
