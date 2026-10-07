import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import envTop from '../assets/env-top.png'
import envBottom from '../assets/env-bottom.png'
import envButton from '../assets/env-button.png'
import song from '../assets/song.mp3'

// The song starts from this point: 1 minute 31 seconds = 91 seconds
const SONG_START = 91

// onOpened: a function from App.jsx, called when the envelope has fully gone
const Envelope = ({ onOpened }) => {
  // contextSafe makes GSAP clean up the animation if this component is removed
  const { contextSafe } = useGSAP()

  // Runs when the seal is clicked
  const openEnvelope = contextSafe(() => {
    // Browsers only let a website start sound inside a tap. This tap on the seal is our only chance,
    // so the song is started here, at full "play" but with its volume knob turned down to 0.
    // The volume knob is a Web Audio "gain". (Muting the song and un-muting it later does not work:
    // browsers refuse to un-mute outside a tap, and phones ignore the normal volume setting.)
    const music = document.querySelector('.song')
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    const audio = new AudioContextClass()
    const volume = audio.createGain()
    volume.gain.value = 0 // 0 = silent, 1 = full volume
    audio.createMediaElementSource(music).connect(volume).connect(audio.destination)
    audio.resume()
    music.play().catch(() => {}) // if the browser still refuses, the site simply stays silent

    const tl = gsap.timeline()

    // 1. Seal fades out (and can't be clicked again)
    tl.set('.env-seal', { pointerEvents: 'none' })
    tl.to('.env-seal', { opacity: 0, duration: 0.5 })

    // 2. Flap goes up and body goes down, both at the same time
    tl.to('.env-top', { yPercent: -100, duration: 1.5, ease: 'power2.inOut' })
    tl.to('.env-bottom', { yPercent: 100, duration: 1.5, ease: 'power2.inOut' }, '<')

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
    // Full screen wrapper, sits on top of Page1 and hides anything outside the screen
    <div className="envelope fixed inset-0 z-50 flex justify-center overflow-hidden bg-[#d3e4ec]">
      {/* The song. It has no controls so it shows nothing on the page.
          When it reaches the end it goes back to 01:31 and plays again */}
      <audio
        className="song"
        src={song}
        preload="auto"
        onEnded={(event) => {
          event.target.currentTime = SONG_START
          event.target.play()
        }}
      />

      {/* Stage: a 9:16 box as tall as the screen (and never narrower than the screen).
          Everything inside is sized in % of this box, so it looks the same on short and long screens */}
      <div className="relative h-[max(100svh,177.78vw)] aspect-9/16 shrink-0">
        {/* Envelope body */}
        <img
          src={envBottom}
          alt=""
          className="env-bottom absolute bottom-[-1.6%] left-1/2 h-[83.1%] w-auto max-w-none -translate-x-1/2"
        />

        {/* Envelope flap */}
        <img
          src={envTop}
          alt=""
          className="env-top absolute top-[-0.8%] left-1/2 h-[63.5%] w-auto max-w-none -translate-x-1/2"
        />

        {/* Wax seal button */}
        <button
          type="button"
          aria-label="Open invitation"
          onClick={openEnvelope}
          className="env-seal absolute top-[45.5%] left-1/2 h-[25.5%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <img src={envButton} alt="" className="h-full w-auto max-w-none" />
        </button>
      </div>
    </div>
  )
}

export default Envelope
