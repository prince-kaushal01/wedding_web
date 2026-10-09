import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import page2Top       from '../assets/page2-top.png'
import page2Bottom    from '../assets/page2-bottom.png'
import page2LeftTree  from '../assets/page2-lefttree.png'
import page2RightTree from '../assets/page2-righttree.png'
import page2Logo      from '../assets/page2-logo.png'
import page2Text1     from '../assets/page2-text1.png'

gsap.registerPlugin(ScrollTrigger)

const semiBold   = { fontFamily: "'EBGaramond-Semibold', serif" }
const boldItalic = { fontFamily: "'Great Vibes', serif" }

const Page2 = () => {
  const containerRef = useRef(null)
  const leftTreeRef  = useRef(null)
  const rightTreeRef = useRef(null)

  const logoRef      = useRef(null)
  const shlokRef     = useRef(null)
  const text1Ref     = useRef(null)
  const inviteRef    = useRef(null)
  const tanujRef     = useRef(null)
  const tanujFamRef  = useRef(null)
  const andRef       = useRef(null)
  const noorRef      = useRef(null)
  const noorFamRef   = useRef(null)

  useGSAP(() => {
    const textItems = [
      logoRef,shlokRef, text1Ref, inviteRef, tanujRef,
      tanujFamRef, andRef, noorRef, noorFamRef,
    ]

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    })

    // Trees slide in from their sides simultaneously
    tl.fromTo(leftTreeRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      0
    )
    tl.fromTo(rightTreeRef.current,
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      0
    )

    // Text items drop in one by one
    textItems.forEach((ref, i) => {
      tl.fromTo(ref.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        i * 0.31
      )
    })
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">

      {/* Top decoration */}
      <img src={page2Top} alt="top" className="absolute top-0 left-0 w-full z-10" />

      {/* Bottom decoration */}
      <img src={page2Bottom} alt="bottom" className="absolute -bottom-6 left-0 w-full z-30" />

      {/* Right tree */}
      <img
        ref={rightTreeRef}
        src={page2RightTree}
        alt="right tree"
        className="absolute top-[6%] -right-[40%] w-[55%] z-20"
      />

      {/* Left tree */}
      <img
        ref={leftTreeRef}
        src={page2LeftTree}
        alt="left tree"
        className="absolute top-[20%] -left-[40%] w-[57%] z-20"
      />

      {/* Text stack */}
      <div
        className="absolute inset-x-0 top-0 flex flex-col items-center text-center z-20 px-8 pt-[4%]"
        style={{ gap: 'clamp(4px, 0.7vh, 12px)' }}
      >
        {/* Logo */}
        <img
          ref={logoRef}
          src={page2Logo}
          alt="logo"
          className="w-[8%] mb-2"
          style={{ opacity: 0 }}
        />

        {/* Gurmukhi verse */}
        <p
          ref={shlokRef}
          className="leading-snug text-[#634B00] w-full"
          style={{ ...semiBold, fontSize: 'clamp(0.35rem, 1.35vh, 0.8rem)', marginBottom: 'clamp(2px, 1.1vh, 25px)' }}
        >
          ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ।।
          <br />
          ਸਤਿਗੁਰ ਦਾਤੇ ਕਾਜ ਰਚਾਇਆ ਆਪਣੀ ਮਿਹਰ ਕਰਾਈ।
          <br />
          ਦਾਸਾ ਕਾਰਜ ਆਪ ਸਵਾਰੇ ਇਹ ਉਸ ਦੀ ਵਡਿਆਈ।।
        </p>

        {/* Invite line */}
        <p
          ref={inviteRef}
          className="tracking-wider text-[#634B00] w-full"
          style={{ ...semiBold, fontSize: 'clamp(0.6rem, 1.5vh, 0.9rem)', opacity: 0 }}
        >
          We are delighted to invite you to the
          <br />
          Wedding Celebrations of
        </p>

        {/* Tanuj name */}
        <p
          ref={tanujRef}
          className="leading-none text-[#F1A800] w-full"
          style={{ ...boldItalic, fontSize: 'clamp(1.3rem, 4vh, 1.9rem)', opacity: 0, marginTop: 'clamp(8px, 2.5vh, 24px)', marginBottom: 'clamp(8px, 2.5vh, 24px)' }}
        >
          Tanuj Gaba
        </p>

        {/* Tanuj family */}
        <p
          ref={tanujFamRef}
          className="tracking-wider text-[#634B00] w-full"
          style={{ ...semiBold, fontSize: 'clamp(0.5rem, 1.1vh, 0.7rem)', opacity: 0, marginBottom: 'clamp(4px, 1vh, 14px)' }}
        >
          Grandson of Sdr. Gursharan Kaur &amp; S. Balbir Singh
          <br />
          Son of Manjit Kaur &amp; S. Harvinder Singh
        </p>

        {/* and */}
        <p
          ref={andRef}
          className="text-[#634B00] w-full"
          style={{ ...semiBold, fontSize: 'clamp(0.7rem, 1.6vh, 0.85rem)', opacity: 0, marginTop: 'clamp(2px, 0.7vh, 10px)', marginBottom: 'clamp(2px, 0.7vh, 10px)' }}
        >
          and
        </p>

        {/* Noor name */}
        <p
          ref={noorRef}
          className="leading-none text-[#F1A800] w-full"
          style={{ ...boldItalic, fontSize: 'clamp(1.3rem, 4vh, 1.9rem)', opacity: 0, marginTop: 'clamp(2px, 2vh, 24px)', marginBottom: 'clamp(2px, 1.6vh, 24px)' }}
        >
          Noor Khurana
        </p>

        {/* Noor family */}
        <p
          ref={noorFamRef}
          className="tracking-wider text-[#634B00] w-full"
          style={{ ...semiBold, fontSize: 'clamp(0.5rem, 1.1vh, 0.7rem)', opacity: 0 }}
        >
          Granddaughter of Sdr. Paramjeet Khurana S. Satnam Singh Khurana
          <br />
          Daughter of Ekta Khurana &amp; Lt S. Chintu Khurana
        </p>
      </div>

    </div>
  )
}

export default Page2
