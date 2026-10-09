import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import page1Bg    from '../assets/page1-bg.jpeg'
import page1Img   from '../assets/page1-img.png'
import page1text2 from '../assets/page1-text1.png'

const garamondStyle = { fontFamily: "'EBGaramond-SemiBold', serif" }

const HomePage = () => {
  const imgRef    = useRef(null)
  const textImgRef = useRef(null)
  const line1Ref  = useRef(null)
  const line2Ref  = useRef(null)
  const line3Ref  = useRef(null)
  const signRef   = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } })

    // 1. Couple image slides in from above
    tl.fromTo(
      imgRef.current,
      { opacity: 0, y: -60 },
      {
        opacity: 1,
        y: 0,
        onComplete: () => {
          // start the zoom loop only after the slide-in finishes
          gsap.to(imgRef.current, {
            scale: 1.06,
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        },
      }
    )

    // 2. Name text image
    tl.fromTo(
      textImgRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0 },
      '-=0.3'
    )

    // 3. Text line 1
    tl.fromTo(
      line1Ref.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0 },
      '-=0.2'
    )

    // 4. Text line 2
    tl.fromTo(
      line2Ref.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0 },
      '-=0.2'
    )

    // 5. Text line 3
    tl.fromTo(
      line3Ref.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0 },
      '-=0.2'
    )

    // 6. Signature
    tl.fromTo(
      signRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0 },
      '-=0.2'
    )
  }, [])

  return (
    <div className="w-full h-svh overflow-hidden">
      {/* Background */}
      <img
        src={page1Bg}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top div — couple image anchored to top */}
      <div className="w-full flex justify-center pt-[6%] z-10">
        <img
          ref={imgRef}
          src={page1Img}
          alt="couple"
          className="w-[62vw] sm:w-62"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Bottom div — text image + all text lines anchored to bottom */}
      <div className="mt-12 w-full flex flex-col items-center text-center px-6 z-10 max-h-[55%]">
        {/* Name / text image */}
        <img
          ref={textImgRef}
          src={page1text2}
          alt="couple names"
          className="w-[38vw] sm:w-44 mb-4 flex-shrink-0"
          style={{ opacity: 0 }}
        />

        {/* Text lines */}
        <div
          className="flex flex-col items-center gap-3 w-full max-w-sm"
          style={garamondStyle}
        >
          {/* Line 1 */}
          <p
            ref={line1Ref}
            className="text-[clamp(0.62rem,2.2vw,0.95rem)] leading-relaxed text-[#634B00]"
            style={{ opacity: 0 }}
          >
            We found the kind of love that feels effortless, electric, and completely like home.
            <br />
            A love built on friendship, passion, endless laughter, unwavering support
            <br />
            and choosing one another again and again.
          </p>

          {/* Line 2 */}
          <p
            ref={line2Ref}
            className="text-[clamp(0.62rem,2.2vw,0.95rem)] leading-relaxed text-[#634B00]"
            style={{ opacity: 0 }}
          >
            Now, surrounded by the people who mean the most,
            <br />
            we cannot wait to celebrate the beginning of forever.
          </p>

          {/* Line 3 */}
          <p
            ref={line3Ref}
            className="text-[clamp(0.62rem,2.2vw,0.95rem)] leading-relaxed text-[#634B00]"
            style={{ opacity: 0 }}
          >
            Pack your bags, bring your love,
            <br />
            and join us for a celebration close to our hearts.
          </p>

          {/* Signature */}
          <p
            ref={signRef}
            className="text-[clamp(0.7rem,2.4vw,1rem)] text-[#634B00]"
            style={{ opacity: 0 }}
          >
            - Noor &amp; Tanuj 💕
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
