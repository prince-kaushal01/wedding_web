import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// A gold card that covers its children until the user scratches it off
const ScratchCard = ({ children, className }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let scratching = false
    let started = false
    let lastX = 0
    let lastY = 0

    // Runs again if the card changes size
    const paintCover = () => {
      if (started) return

      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const ratio = window.devicePixelRatio || 1 // keeps the card sharp on phone screens
      canvas.width = width * ratio
      canvas.height = height * ratio
      ctx.scale(ratio, ratio)

      const gold = ctx.createLinearGradient(0, 0, width, height)
      gold.addColorStop(0, '#b8892f')
      gold.addColorStop(0.5, '#f3df9f')
      gold.addColorStop(1, '#b8892f')
      ctx.fillStyle = gold
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = '#6b4a12'

      // TEXT SIZE: card height x 0.52. Bigger number = bigger text. 14 is the smallest size in px
      ctx.font = `${Math.max(14, height * 0.55)}px "Great Vibes", cursive`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Scratch here', width / 2, height / 2)
    }

    const getPoint = (event) => {
      const box = canvas.getBoundingClientRect()
      return { x: event.clientX - box.left, y: event.clientY - box.top }
    }

    const startScratch = (event) => {
      scratching = true
      started = true
      const point = getPoint(event)
      lastX = point.x
      lastY = point.y
      scratch(event)
    }

    // Erase a thick line from the last finger position to the new one
    const scratch = (event) => {
      if (!scratching) return
      const point = getPoint(event)

      ctx.globalCompositeOperation = 'destination-out' // drawing now removes the cover instead of adding colour
      ctx.lineWidth = 28 // thickness of the scratch
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(point.x, point.y)
      ctx.stroke()

      lastX = point.x
      lastY = point.y
    }

    // When the finger lifts: if more than half of the cover is gone, fade the rest away
    const stopScratch = () => {
      if (!scratching) return
      scratching = false

      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      let cleared = 0
      // every pixel has 4 numbers (red, green, blue, alpha). alpha 0 = scratched off
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) cleared++
      }

      if (cleared / (pixels.length / 4) > 0.5) {
        gsap.to(canvas, { opacity: 0, duration: 0.6, onComplete: () => gsap.set(canvas, { display: 'none' }) })
      }
    }

    const resizeWatcher = new ResizeObserver(paintCover)
    resizeWatcher.observe(canvas)

    // The font may arrive after the card is first painted, so paint it again once the font is ready
    document.fonts.load('16px "Great Vibes"').then(paintCover)

    canvas.addEventListener('pointerdown', startScratch)
    canvas.addEventListener('pointermove', scratch)
    canvas.addEventListener('pointerup', stopScratch)
    canvas.addEventListener('pointerleave', stopScratch)
    canvas.addEventListener('pointercancel', stopScratch)

    return () => {
      resizeWatcher.disconnect()
      canvas.removeEventListener('pointerdown', startScratch)
      canvas.removeEventListener('pointermove', scratch)
      canvas.removeEventListener('pointerup', stopScratch)
      canvas.removeEventListener('pointerleave', stopScratch)
      canvas.removeEventListener('pointercancel', stopScratch)
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      {children}

      {/* Cover size: change -left with w (w adds twice -left) and -top with h.
          touch-none + data-lenis-prevent stop the page scrolling while scratching */}
      <canvas
        ref={canvasRef}
        data-lenis-prevent
        className="absolute -top-1 -left-12 h-[calc(100%+0.5rem)] w-[calc(100%+6rem)] cursor-pointer touch-none rounded-md"
      />
    </div>
  )
}

export default ScratchCard
