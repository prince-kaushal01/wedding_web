import { useEffect, useState } from 'react'

// ready = true  → both envelope images AND homepage images have loaded
const LoadingScreen = ({ ready }) => {
  const [fading,  setFading]  = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!ready) return
    setFading(true)
    const t = setTimeout(() => setVisible(false), 700)
    return () => clearTimeout(t)
  }, [ready])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#E7BD88]"
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.7s ease' }}
    >

      {/* Spinner — outer ring rotates, inner dot pulses */}
      <div className="relative flex items-center justify-center mb-6">

        {/* Rotating ring */}
        <div
          className="w-14 h-14 rounded-full border-[3px] border-transparent"
          style={{
            borderTopColor:    '#BD8321',
            borderRightColor:  '#BD8321',
            animation: 'loaderSpin 1s linear infinite',
          }}
        />

        {/* Pulsing centre dot */}
        <div
          className="absolute w-3 h-3 rounded-full bg-[#790A2A]"
          style={{ animation: 'loaderPulse 1s ease-in-out infinite' }}
        />

      </div>

      {/* Label */}
      <p
        style={{ fontFamily: "'Great Vibes', cursive" }}
        className="text-[#790A2A] text-[2rem] leading-none m-0"
      >
        Loading…
      </p>

    </div>
  )
}

export default LoadingScreen
