import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Works out how much time is left until the target date, as two-digit texts like "07"
const getTimeLeft = (target) => {
  const seconds = Math.max(0, Math.floor((target - Date.now()) / 1000))
  const twoDigits = (number) => String(number).padStart(2, '0')

  return {
    days: twoDigits(Math.floor(seconds / 86400)),
    hours: twoDigits(Math.floor((seconds % 86400) / 3600)),
    minutes: twoDigits(Math.floor((seconds % 3600) / 60)),
    seconds: twoDigits(seconds % 60),
  }
}

// One box. value = the number now, previous = the number just before
const CountdownUnit = ({ name, label, value, previous }) => {
  // On change: the old number flips away upwards, the new one flips in from below
  useGSAP(() => {
    if (value === previous) return

    gsap.fromTo(
      `.cd-${name}-old`,
      { yPercent: 0, rotationX: 0, opacity: 1 },
      { yPercent: -100, rotationX: 90, opacity: 0, duration: 0.6, ease: 'power2.inOut' },
    )
    gsap.fromTo(
      `.cd-${name}-new`,
      { yPercent: 100, rotationX: -90, opacity: 0 },
      { yPercent: 0, rotationX: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' },
    )
  }, [value])

  return (
    <div className="flex flex-col items-center">
      {/* NUMBER SIZE: the text-[clamp(...)] class below (smallest, normal, biggest) */}
      <div className="relative flex h-[clamp(2.75rem,8svh,4.25rem)] w-[clamp(2.75rem,8svh,4.25rem)] items-center justify-center overflow-hidden rounded-xl border border-white/70 bg-white/45 font-['Google_Sans',sans-serif] text-[clamp(1.2rem,3.6svh,1.9rem)] text-[#1f2f6b] shadow-md backdrop-blur-sm perspective-midrange">
        <span className={`cd-${name}-old absolute opacity-0`}>{previous}</span>
        <span className={`cd-${name}-new absolute`}>{value}</span>
      </div>

      <p className="mt-[clamp(0.25rem,0.8svh,0.5rem)] text-[clamp(0.55rem,1.4svh,0.75rem)] tracking-[0.2em] text-[#1f2f6b] uppercase">
        {label}
      </p>
    </div>
  )
}

const Countdown = ({ date }) => {
  const target = new Date(date).getTime()

  // now = what the countdown shows, before = what it showed one second ago
  const [time, setTime] = useState(() => {
    const now = getTimeLeft(target)
    return { now, before: now }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((old) => ({ now: getTimeLeft(target), before: old.now }))
    }, 1000)

    return () => clearInterval(timer)
  }, [target])

  return (
    <div className="flex gap-[clamp(0.5rem,2.5vw,1rem)]">
      <CountdownUnit name="days" label="Days" value={time.now.days} previous={time.before.days} />
      <CountdownUnit name="hours" label="Hours" value={time.now.hours} previous={time.before.hours} />
      <CountdownUnit name="minutes" label="Minutes" value={time.now.minutes} previous={time.before.minutes} />
      <CountdownUnit name="seconds" label="Seconds" value={time.now.seconds} previous={time.before.seconds} />
    </div>
  )
}

export default Countdown
