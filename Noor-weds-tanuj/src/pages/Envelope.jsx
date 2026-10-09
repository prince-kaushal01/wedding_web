import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import envBg from '../assets/env-bg.png'
import envTopText from '../assets/env-toptext.png'
import envTop from '../assets/env-top.png'
import envBottom from '../assets/env-bottom.jpeg'
import envButton from '../assets/env-button.png'

const Envelope = ({ onOpen, onPlay }) => {
  const containerRef = useRef(null)
  const buttonRef    = useRef(null)
  const topRef       = useRef(null)
  const bottomRef    = useRef(null)
  const bgRef        = useRef(null)
  const topTextRef   = useRef(null)
  const topWrapRef   = useRef(null) // ✅ new wrapper ref for GSAP (replaces topRef on the div)

  const handleOpen = () => {
    const tl = gsap.timeline()

    tl.to(buttonRef.current, {
      scale: 1.3,
      duration: 0.2,
      ease: 'power2.out',
    })
    tl.to(buttonRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.56,
      ease: 'power2.in',
    })

    tl.to(bottomRef.current, {
      y: '100%',
      opacity: 0,
      duration: 1.1,
      ease: 'power2.in',
    }, '-=0.05')

    // ✅ animate the wrapper instead of topRef directly
    tl.to(topWrapRef.current, {
      y: '-180%',
      duration: 1.2,
      ease: 'power2.in',
    }, '<')

    tl.to([bgRef.current, topTextRef.current], {
      opacity: 0,
      duration: 0.9,
      ease: 'power1.inOut',
      onComplete: () => {
        if (onPlay) onPlay()
        if (onOpen) onOpen()
      },
    }, '-=0.6')
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background */}
      <img
        ref={bgRef}
        src={envBg}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top text */}
      <img
        ref={topTextRef}
        src={envTopText}
        alt="top text"
        className="absolute left-1/2 -translate-x-1/2 w-[50%] z-10"
        style={{ top: '15%' }}
      />

      {/*
        ✅ FIX: Wrap envTop + button together.
        The wrapper sits at top-[24vh] just like envTop did before.
        The stamp is now anchored to bottom-0 of this wrapper,
        so it always tracks the flap's bottom tip on every screen size.
      */}
      <div
        ref={topWrapRef}
        className="absolute top-[24vh] left-0 w-full z-30"
      >
        <img
          ref={topRef}
          src={envTop}
          alt="envelope top"
          className="w-full"
        />

        {/* Stamp — always at the bottom center of the flap */}
        <button
          ref={buttonRef}
          onClick={handleOpen}
          className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-4 z-40 bg-transparent border-none p-0 cursor-pointer"
        >
          <img
            src={envButton}
            alt="open envelope"
            className="w-[72px]"
          />
        </button>
      </div>

      {/* Envelope bottom — unchanged */}
      <img
        ref={bottomRef}
        src={envBottom}
        alt="envelope bottom"
        className="absolute bottom-[20vh] left-0 w-full h-[56vh] z-20"
      />
    </div>
  )
}

export default Envelope