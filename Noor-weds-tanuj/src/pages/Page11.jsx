import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import page9_3 from '../assets/page9-3.png'

const Page11 = ({ onClose }) => {
  const containerRef = useRef(null)
  const closeRef     = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    // Page slides up from below on open
    tl.fromTo(containerRef.current,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' }, 0
    )

    // Close button fades in after page settles
    tl.fromTo(closeRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }, 0.35
    )
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full z-[100]"
      style={{ height: '100dvh', opacity: 0 }}
    >
      {/* Full-cover image */}
      <img
        src={page9_3}
        alt="page11"
        className="w-full h-full object-cover"
      />

      {/* X close button */}
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white text-2xl font-light leading-none"
        style={{ opacity: 0, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px' }}
      >
        ✕
      </button>
    </div>
  )
}

export default Page11
