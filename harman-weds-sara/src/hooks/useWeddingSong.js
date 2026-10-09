import { useRef } from 'react'
import songSrc from '../assets/song.mp3'

/**
 * Returns a `play` function.
 * - The Audio object is created once and reused (ref-stable).
 * - `currentTime` is always reset to 0 so a reload always starts the song
 *   from the beginning, even if the browser cached a mid-track position.
 * - `loop` is true so the song repeats automatically.
 */
const useWeddingSong = () => {
  const audioRef = useRef(null)

  if (!audioRef.current) {
    const audio = new Audio(songSrc)
    audio.loop = true
    audio.currentTime = 0
    audioRef.current = audio
  }

  const play = () => {
    const audio = audioRef.current
    audio.currentTime = 0        // always restart from the top on every page load
    audio.play().catch(() => {}) // silently ignore if browser still blocks it
  }

  return play
}

export default useWeddingSong
