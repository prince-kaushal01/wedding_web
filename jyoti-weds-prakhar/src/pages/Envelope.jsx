import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import envTop from '../assets/env-top.webp'
import envBottom from '../assets/env-bottom.webp'
import envButton from '../assets/env-button.webp'
import song from '../assets/song.mp3'

// The song starts from this point: 1 minute 31 seconds = 91 seconds
const SONG_START = 91

// onOpened: a function from App.jsx, called when the envelope has fully gone
const Envelope = ({ onOpened }) => {
  const { contextSafe } = useGSAP()

  const openEnvelope = contextSafe(() => {
    // Sound may only start inside a tap, so the song starts here at volume 0 (a Web Audio gain)
    // and is turned up later. Un-muting later does not work: browsers block it outside a tap
    const music = document.querySelector('.song')
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    const audio = new AudioContextClass()
    const volume = audio.createGain()
    volume.gain.value = 0
    audio.createMediaElementSource(music).connect(volume).connect(audio.destination)
    audio.resume()
    music.play().catch(() => {})

    const tl = gsap.timeline()

    // 1. Seal fades out (and can't be clicked again)
    tl.set('.env-seal', { pointerEvents: 'none' })
    tl.to('.env-seal', { opacity: 0, duration: 0.5 })

    // 2. Flap goes up and body goes down, both at the same time; label uses y:"100svh" to guarantee it exits the screen
    tl.to('.env-top', { yPercent: -100, duration: 1.5, ease: 'power2.inOut' })
    tl.to('.env-bottom', { yPercent: 100, duration: 1.5, ease: 'power2.inOut' }, '<')
    tl.to('.env-tap-label', { y: '100svh', duration: 1.5, ease: 'power2.inOut' }, '<')

    // 3. Whole envelope fades out, then it is removed so Page1 can be used
    tl.to('.envelope', { opacity: 0, duration: 1 })
    tl.set('.envelope', { display: 'none' })

    // 4. Tell App.jsx the envelope is gone, so Page1 can start its animation
    tl.call(onOpened)

    // 5. Page1 is visible now: jump the song to 01:31 and turn the volume up over 1 second
    tl.call(() => {
      music.currentTime = SONG_START
      if (music.paused) music.play().catch(() => {})
      volume.gain.linearRampToValueAtTime(1, audio.currentTime + 1)
    })
  })

  return (
    <div className="envelope fixed inset-0 z-50 flex justify-center overflow-hidden bg-[#d3e4ec]">
      {/* No controls, so nothing shows. At the end it goes back to SONG_START */}
      <audio
        className="song"
        src={song}
        preload="auto"
        onEnded={(event) => {
          event.target.currentTime = SONG_START
          event.target.play()
        }}
      />

      {/* 9:16 stage: everything inside is sized in % of it, so it looks the same on every screen */}
      <div className="relative h-[max(100svh,177.78vw)] aspect-9/16 shrink-0">
        <img
          src={envBottom}
          alt=""
          className="env-bottom absolute bottom-[-1.6%] left-1/2 h-[83.1%] w-auto max-w-none -translate-x-1/2"
        />

        <img
          src={envTop}
          alt=""
          className="env-top absolute top-[-0.8%] left-1/2 h-[63.5%] w-auto max-w-none -translate-x-1/2"
        />

        <button
          type="button"
          aria-label="Open invitation"
          onClick={openEnvelope}
          className="env-seal absolute top-[45.5%] left-1/2 h-[25.5%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <img src={envButton} alt="" className="h-full w-auto max-w-none" />
        </button>

        <p className="env-tap-label absolute top-[62%] left-1/2 -translate-x-1/2 font-['Pinyon_Script'] text-[clamp(1.8rem,5svh,2.8rem)] text-[#7a5c3e]">Tap Here</p>
      </div>
    </div>
  )
}

export default Envelope
