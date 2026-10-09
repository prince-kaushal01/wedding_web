import { useState, useRef, useEffect } from 'react'

import song from './assets/song.mp3'

// ── Phase 1: Envelope ────────────────────────────────────────────────────────
import envBg       from './assets/env-bg.png'
import envTopText  from './assets/env-toptext.png'
import envTop      from './assets/env-top.png'
import envBottom   from './assets/env-bottom.jpeg'
import envButton   from './assets/env-button.png'

// ── Phase 1: HomePage (Page 1) ───────────────────────────────────────────────
import page1Bg    from './assets/page1-bg.jpeg'
import page1Img   from './assets/page1-img.png'
import page1Text2 from './assets/page1-text1.png'

// ── Phase 1: Page 2 ──────────────────────────────────────────────────────────
import page2Top       from './assets/page2-top.png'
import page2Bottom    from './assets/page2-bottom.png'
import page2LeftTree  from './assets/page2-lefttree.png'
import page2RightTree from './assets/page2-righttree.png'
import page2Logo      from './assets/page2-logo.png'
import page2Text1     from './assets/page2-text1.png'

// ── Phase 1: Page 3 ──────────────────────────────────────────────────────────
import page3Bg          from './assets/page3-bg.png'
import page3TopRight    from './assets/page3-topright.png'
import page3Left        from './assets/page3-left.png'
import page3Center      from './assets/page3-center.png'
import page3Center2     from './assets/page3-center2.png'
import page3Counter     from './assets/page3-counter.png'
import page3Text1       from './assets/page3-text1.png'
import page3Text2       from './assets/page3-text2.png'
import page3TextBottom  from './assets/page3-textbottom.png'
import page3BottomLeft  from './assets/page3-bottomleft.png'
import page3BottomRight from './assets/page3-bottomright.png'
import page3Scratch     from './assets/page3-scratchex.png'

// ── Phase 1: Page 4 ──────────────────────────────────────────────────────────
import page4Bg          from './assets/page4-bg.png'
import page4Top         from './assets/page4-top.png'
import page4Bottom      from './assets/page4-bottom.png'
import page4Left        from './assets/page4-left.png'
import page4Right       from './assets/page4-right.png'
import page4Couple      from './assets/page4-couple.png'
import page4Frame       from './assets/page4-frame.png'
import page4Text1       from './assets/page4-text1.png'
import page4Text2       from './assets/page4-text2.png'
import page4BottomLeft  from './assets/page4-bottomleft.png'
import page4BottomLeft2 from './assets/page4-bottomleft2.png'
import page4BottomLeft3 from './assets/page4-bottomleft3.png'
import page4Thur        from './assets/page4-thur.png'
import page4Oct         from './assets/page4-oct.png'
import page4_22         from './assets/page4-22.png'
import page4_2026       from './assets/page4-2026.png'
import page4Time        from './assets/page4-time.png'

// ── Phase 2: Page 5 (background preload) ────────────────────────────────────
import page5Bg          from './assets/page5-bg.png'
import page5Bottom      from './assets/page5-bottom.png'
import page5Cloud       from './assets/page5-cloud.png'
import page5Top         from './assets/page5-top.png'
import page5TopLight    from './assets/page5-toplight.png'
import page5LeftTree    from './assets/page5-lefttree.png'
import page5RightTree   from './assets/page5-rightree.png'
import page5Center      from './assets/page5-center.png'
import page5CenterFloor from './assets/page5-centerfloor.png'
import page5BelowTree   from './assets/page5-belowtree.png'
import page5Candles     from './assets/page5-candles.png'
import page5LeftLight   from './assets/page5-leftlight.png'
import page5RightLight  from './assets/page5-rightlight.png'
import page5Couple      from './assets/page5-couple.png'
import page5Text1       from './assets/page5-text1.png'
import page5Text2       from './assets/page5-text2.png'
import page5Thur        from './assets/page5-thur.png'
import page5Oct         from './assets/page5-oct.png'
import page5_22         from './assets/page5-22.png'
import page5_2026       from './assets/page5-2026.png'
import page5Time        from './assets/page5-time.png'

// ── Phase 2: Page 6 ──────────────────────────────────────────────────────────
import page6Bg          from './assets/page6-bg.png'
import page6Bottom      from './assets/page6-bottom.png'
import page6BottomAbove from './assets/page6-bottomabove.png'
import page6River       from './assets/page6-river.png'
import page6Sun         from './assets/page6-sun.png'
import page6Sun2        from './assets/page6-sun2.png'
import page6Center      from './assets/page6-center.png'
import page6Mandap      from './assets/page6-mandap.png'
import page6Couple      from './assets/page6-couple.png'
import page6LeftTree    from './assets/page6-lefttree.png'
import page6RightTree   from './assets/page6-righttree.png'
import page6Left        from './assets/page6-left.png'
import page6Right       from './assets/page6-right.png'
import page6TopLeft     from './assets/page6-topleft.png'
import page6TopRight    from './assets/page6-topright.png'
import page6Top         from './assets/page6-top.png'
import page6Chandelier  from './assets/page6-chandelier.png'
import page6Text1       from './assets/page6-text1.png'
import page6Text2       from './assets/page6-text2.png'
import page6Friday      from './assets/page6-friday.png'
import page6Oct         from './assets/page6-oct.png'
import page6_23         from './assets/page6-23.png'
import page6_2026       from './assets/page6-2026.png'
import page6Time        from './assets/page6-time.png'

// ── Phase 2: Page 7 ──────────────────────────────────────────────────────────
import page7Bg          from './assets/page7-bg.png'
import page7AboveBg     from './assets/page7-abovebg.png'
import page7Bottom      from './assets/page7-bottom.png'
import page7Top         from './assets/page7-top.png'
import page7Left        from './assets/page7-left.png'
import page7Right       from './assets/page7-right.png'
import page7LeftAbove   from './assets/page7-leftabove.png'
import page7RightAbove  from './assets/page7-rightabove.png'
import page7Light       from './assets/page7-light.png'
import page7Center      from './assets/page7-center.png'
import page7BelowCenter from './assets/page7-belowcenter.png'
import page7Grass       from './assets/page7-grass.png'
import page7Couple      from './assets/page7-couple.png'
import page7Candle1     from './assets/page7-candle1.png'
import page7Candle2     from './assets/page7-candle2.png'
import page7Text1       from './assets/page7-text1.png'
import page7Text2       from './assets/page7-text2.png'
import page7Friday      from './assets/page7-friday.png'
import page7Oct         from './assets/page7-oct.png'
import page7_23         from './assets/page7-23.png'
import page7_2026       from './assets/page7-2026.png'
import page7Time        from './assets/page7-time.png'

// ── Phase 2: Page 8 ──────────────────────────────────────────────────────────
import page8Bg         from './assets/page8-bg.png'
import page8TopRight   from './assets/page8-topright.png'
import page8BottomLeft from './assets/page8-bottomleft.png'
import page8Text1      from './assets/page8-text1.png'
import page8Text2      from './assets/page8-text2.png'
import page8Text3      from './assets/page8-text3.png'
import page8Icon       from './assets/page8-icon.png'
import page8Img        from './assets/page8-img.png'
import page8M1         from './assets/page8-m1.png'
import page8M2         from './assets/page8-m2.png'
import page8M3         from './assets/page8-m3.png'
import page8M4         from './assets/page8-m4.png'
import page8Sub        from './assets/page8-sub.png'

// ── Phase 2: Pages 9-12 (menu overlays — single image each) ─────────────────
import popup9Img  from './assets/page9-1.png'
import popup10Img from './assets/page9-2.png'
import popup11Img from './assets/page9-3.png'
import popup12Img from './assets/page9-4.png'

// ── Phase 2: Pages 13-14 ─────────────────────────────────────────────────────
import page13Bg    from './assets/page13-bg.jpg'
import page13Left  from './assets/page13-left.png'
import page13Right from './assets/page13-right.png'
import page13Sun   from './assets/page13-sun.png'
import page13Text1 from './assets/page13-text1.png'
import page13Text2 from './assets/page13-text2.png'
import page14TopRight from './assets/page14-topright.png'
import page14TopLeft  from './assets/page14-topleft.png'
import page14Boat     from './assets/page14-boat.png'
import page14Icon     from './assets/page14-icon.png'
import page14TopText  from './assets/page14-toptext.png'

import LoadingScreen from './pages/LoadingScreen'
import Envelope from './pages/Envelope'
import HomePage from './pages/HomePage'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import Page7 from './pages/Page7'
import Page8 from './pages/Page8'
import Page9  from './pages/Page9'
import Page10 from './pages/Page10'
import Page11 from './pages/Page11'
import Page12 from './pages/Page12'
import Page13 from './pages/Page13'
import Page14 from './pages/Page14'

// ── Phase 1: must all be in cache before loading screen hides ────────────────
// Keep this small — only what's needed to show the envelope + homepage.
const CRITICAL_IMAGES = [
  // Envelope
  envBg, envTopText, envTop, envBottom, envButton,
  // HomePage (Page 1)
  page1Bg, page1Img, page1Text2,
]

// ── Phase 2: starts preloading the moment the envelope becomes visible ────────
// Everything else: pages 2-14 + popup images. By the time the user reads
// the envelope and scrolls, these are already in the browser cache.
const BACKGROUND_IMAGES = [
  // Page 2
  page2Top, page2Bottom, page2LeftTree, page2RightTree, page2Logo, page2Text1,
  // Page 3
  page3Bg, page3TopRight, page3Left, page3Center, page3Center2, page3Counter,
  page3Text1, page3Text2, page3TextBottom, page3BottomLeft, page3BottomRight, page3Scratch,
  // Page 4
  page4Bg, page4Top, page4Bottom, page4Left, page4Right, page4Couple, page4Frame,
  page4Text1, page4Text2, page4BottomLeft, page4BottomLeft2, page4BottomLeft3,
  page4Thur, page4Oct, page4_22, page4_2026, page4Time,
  // Page 5
  page5Bg, page5Bottom, page5Cloud, page5Top, page5TopLight,
  page5LeftTree, page5RightTree, page5Center, page5CenterFloor, page5BelowTree,
  page5Candles, page5LeftLight, page5RightLight, page5Couple,
  page5Text1, page5Text2, page5Thur, page5Oct, page5_22, page5_2026, page5Time,
  // Page 6
  page6Bg, page6Bottom, page6BottomAbove, page6River, page6Sun, page6Sun2,
  page6Center, page6Mandap, page6Couple, page6LeftTree, page6RightTree,
  page6Left, page6Right, page6TopLeft, page6TopRight, page6Top, page6Chandelier,
  page6Text1, page6Text2, page6Friday, page6Oct, page6_23, page6_2026, page6Time,
  // Page 7
  page7Bg, page7AboveBg, page7Bottom, page7Top, page7Left, page7Right,
  page7LeftAbove, page7RightAbove, page7Light, page7Center, page7BelowCenter,
  page7Grass, page7Couple, page7Candle1, page7Candle2,
  page7Text1, page7Text2, page7Friday, page7Oct, page7_23, page7_2026, page7Time,
  // Page 8
  page8Bg, page8TopRight, page8BottomLeft,
  page8Text1, page8Text2, page8Text3, page8Icon, page8Img,
  page8M1, page8M2, page8M3, page8M4, page8Sub,
  // Pages 9-12 popup images
  popup9Img, popup10Img, popup11Img, popup12Img,
  // Pages 13-14
  page13Bg, page13Left, page13Right, page13Sun, page13Text1, page13Text2,
  page14TopRight, page14TopLeft, page14Boat, page14Icon, page14TopText,
]

// Fire-and-forget: create Image objects so the browser fetches + caches them.
// Uses requestIdleCallback when available so it doesn't compete with animations.
const preloadInBackground = (srcs) => {
  const load = () => srcs.forEach((src) => { const i = new Image(); i.src = src })
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(load, { timeout: 2000 })
  } else {
    setTimeout(load, 100)
  }
}

const App = () => {
  const audioRef = useRef(null)
  if (!audioRef.current) {
    audioRef.current = new Audio(song)
    audioRef.current.loop = true
  }

  const handlePlay = () => {
    const audio = audioRef.current
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  const [loading,      setLoading]      = useState(true)
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [showPage9,    setShowPage9]    = useState(false)
  const [showPage10,   setShowPage10]   = useState(false)
  const [showPage11,   setShowPage11]   = useState(false)
  const [showPage12,   setShowPage12]   = useState(false)

  // The moment the loading screen hides (envelope is now visible),
  // fire off background preloading for every remaining page.
  useEffect(() => {
    if (!loading) {
      preloadInBackground(BACKGROUND_IMAGES)
    }
  }, [loading])

  return (
    <div className="w-full">
      {/* Loading screen — visible until envelope + homepage assets are ready */}
      {loading && (
        <LoadingScreen
          onDone={() => setLoading(false)}
          imagesToPreload={CRITICAL_IMAGES}
        />
      )}

      {showEnvelope ? (
        <Envelope onOpen={() => setShowEnvelope(false)} onPlay={handlePlay} />
      ) : (
        <>
          <HomePage />
          <Page2 />
          <Page3 />
          <Page4 />
          <Page5 />
          <Page6 />
          <Page7 />
          <Page8
            onOpenPage9={()  => setShowPage9(true)}
            onOpenPage10={() => setShowPage10(true)}
            onOpenPage11={() => setShowPage11(true)}
            onOpenPage12={() => setShowPage12(true)}
          />
          <Page13 />
          <Page14 />
        </>
      )}

      {showPage9  && <Page9  onClose={() => setShowPage9(false)}  />}
      {showPage10 && <Page10 onClose={() => setShowPage10(false)} />}
      {showPage11 && <Page11 onClose={() => setShowPage11(false)} />}
      {showPage12 && <Page12 onClose={() => setShowPage12(false)} />}
    </div>
  )
}

export default App
