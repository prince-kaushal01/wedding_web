import { useState } from 'react'
import LoadingScreen   from './components/LoadingScreen'
import Homepage        from './pages/Homepage'
import ScratchCard     from './pages/ScratchCard'
import Shaggan         from './pages/Shaggan'
import Jaggo           from './pages/Jaggo'
import AnandKaraj      from './pages/AnandKaraj'
import Reception       from './pages/Reception'
import Family          from './pages/Family'
import Location        from './pages/Location'
import IntroEnvelope   from './pages/IntroEnvelope'
import useWeddingSong  from './hooks/useWeddingSong'

const App = () => {
  const [introComplete,   setIntroComplete]   = useState(false)
  const [envelopeReady,   setEnvelopeReady]   = useState(false)
  const [homepageReady,   setHomepageReady]   = useState(false)
  const playSong = useWeddingSong()

  // Loading screen hides only when BOTH the envelope and homepage images are loaded
  const criticalReady = envelopeReady && homepageReady

  return (
    <div className="relative w-full overflow-x-hidden">

      {/* ── Loading screen — hides the moment envelope + homepage images are ready ── */}
      <LoadingScreen ready={criticalReady} />

      {/* ── Page 1 ── */}
      <Homepage introComplete={introComplete} onReady={() => setHomepageReady(true)} />

      {/* ── Page 2 ── */}
      <ScratchCard />

      {/* ── Page 3 ── */}
      <Shaggan />

      {/* ── Page 4 ── */}
      <Jaggo />

      {/* ── Page 5 ── */}
      <AnandKaraj />

      {/* ── Page 6 ── */}
      <Reception />

      {/* ── Page 7 ── */}
      <Family />

      {/* ── Page 8 ── */}
      <Location />

      {/* ── Intro overlay (unmounts after 2 s animation) ── */}
      <IntroEnvelope
        onComplete={() => setIntroComplete(true)}
        onOpen={playSong}
        onReady={() => setEnvelopeReady(true)}
      />

    </div>
  )
}

export default App
