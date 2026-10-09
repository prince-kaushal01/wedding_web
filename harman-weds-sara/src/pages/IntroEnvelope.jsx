import { useState, useRef } from 'react'
import envelopeBottom from '../assets/envelope_bottom.png'
import envelopeButton from '../assets/envelope_button.png'
import envelopeUp     from '../assets/envelope_up.png'

const IntroEnvelope = ({ onComplete, onOpen, onReady }) => {
  const [isOpening, setIsOpening] = useState(false)
  const [bgOpacity, setBgOpacity] = useState(1)
  const [isGone,    setIsGone]    = useState(false)
  const loadedCount = useRef(0)

  const handleImageLoad = () => {
    loadedCount.current += 1
    if (loadedCount.current >= 3) onReady?.()
  }

  const handleOpen = () => {
    if (isOpening) return
    onOpen?.()          // start the song the moment the user taps the seal
    setIsOpening(true)
    setTimeout(() => onComplete?.(), 1000)
    setTimeout(() => setBgOpacity(0), 1100)
    setTimeout(() => setIsGone(true), 2000)
  }

  if (isGone) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#E7BD88] overflow-hidden"
      style={{
        touchAction: 'none',
        opacity:    bgOpacity,
        transition: bgOpacity === 0 ? 'opacity 0.9s ease' : 'none',
      }}
    >
      {/* Envelope wrapper — stacks top flap and bottom body, button sits at the seam */}
<div className="relative flex flex-col items-center w-full">

  {/* ── ALIGNMENT GUIDE (remove later) ── */}

  {/* ── TOP FLAP ── slides up on open */}
  <div
    className="w-full flex justify-center"
    style={{
      zIndex:     20,
      transition: isOpening ? 'transform 2s cubic-bezier(0.4,0,0.2,1)' : 'none',
      transform:  isOpening ? 'translateY(-160vh)' : 'translateY(0)',
    }}
  >
    <img
      src={envelopeUp}
      alt=""
      draggable={false}
      onLoad={handleImageLoad}
      className="w-full block select-none"
      style={{
        objectFit: 'contain',
      }}
    />
  </div>

  {/* ── BOTTOM BODY ── slides down on open */}
  <div
    className="w-full flex justify-center -mt-[300px]"
    style={{
      zIndex:     10,
      transition: isOpening ? 'transform 2s cubic-bezier(0.4,0,0.2,1)' : 'none',
      transform:  isOpening ? 'translateY(160vh)' : 'translateY(0)',
    }}
  >
    <img
      src={envelopeBottom}
      alt=""
      draggable={false}
      onLoad={handleImageLoad}
      className="max-w-xl block select-none"
      style={{
        objectFit: 'contain',
      }}
    />
  </div>

  {/* ── SEAL BUTTON — centred exactly at the seam between top and bottom ── */}
  <button
    onClick={handleOpen}
    aria-label="Open envelope"
    style={{
      position:   'absolute',
      top:        '63%',
      left:       '50%',
      transform:  'translate(-50%, -50%)',
      zIndex:     30,
      opacity:    isOpening ? 0 : 1,
      transition: isOpening ? 'opacity 0.25s ease' : 'none',
      padding:    '8px',
      background: 'none',
      border:     'none',
      cursor:     'pointer',
    }}
  >
    <img
      src={envelopeButton}
      alt="Open"
      draggable={false}
      onLoad={handleImageLoad}
      className="select-none"
      style={{
        width: '130px',
        height: '130px',
        objectFit: 'contain',
      }}
    />
  </button>

</div>
    </div>
  )
}

export default IntroEnvelope
