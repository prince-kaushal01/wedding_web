import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import envTop from '../assets/env-top.png'
import envBottom from '../assets/env-bottom.png'
import envButton from '../assets/env-button.png'

// onOpened: a function from App.jsx, called when the envelope has fully gone
const Envelope = ({ onOpened }) => {
  // contextSafe makes GSAP clean up the animation if this component is removed
  const { contextSafe } = useGSAP()

  // Runs when the seal is clicked
  const openEnvelope = contextSafe(() => {
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
  })

  return (
    // Full screen wrapper, sits on top of Page1 and hides anything outside the screen
    <div className="envelope fixed inset-0 z-50 flex justify-center overflow-hidden bg-[#d3e4ec]">
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
