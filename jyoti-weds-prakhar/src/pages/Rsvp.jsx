import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Countdown from '../components/Countdown'

// The Google Apps Script web app link. The form sends name, attending and mood here
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxTJq-yEg6oszjayt3yKImTef0qfgdE8wuapcDJaljw3nh_XuEOO52JUgimltesxT5J/exec'

// Opened by the "Open in Google Maps" button
const MAPS_URL = 'https://maps.app.goo.gl/QhK3acpeJorFdBUk9?g_st=iw'

// The map shown inside the page (the src from Google Maps > Share > Embed a map)
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.9508130219765!2d73.8092587!3d15.487077699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc085624c679b%3A0xd3f137e3ddd48a8c!2sGoa%20Marriott%20Resort%20%26%20Spa!5e0!3m2!1sen!2sin!4v1791382146726!5m2!1sen!2sin'

// Countdown target: 30 November 2026, 5:00 PM India time. 17:00 = 5:00 PM, +05:30 = India
const WEDDING_DATE = '2026-11-30T17:00:00+05:30'

const MOODS = ['The food', 'The entertainment', 'The love', 'All of the above']

const PHONES = ['+91 77770 01194', '+91 89837 65117']

gsap.registerPlugin(ScrollTrigger)

const Rsvp = () => {
  // Each rsvp-item comes down from above and fades in as it scrolls into view
  useGSAP(() => {
    gsap.utils.toArray('.rsvp-item').forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'clamp(top 95%)', // clamp = still works for items at the very end of the site
          end: 'clamp(top 75%)',
          scrub: 0.8, // 0.8s glide behind the scroll; true = no glide
        },
      })
    })
  })

  // idle = not sent yet, sending = on its way, done = sent, error = could not send
  const [status, setStatus] = useState('idle')

  // The thank-you message makes the page shorter, so GSAP must measure it again
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [status])

  const sendRsvp = async (event) => {
    event.preventDefault()
    setStatus('sending')

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script needs this when called from another website
        body: new FormData(event.target),
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rsvp relative flex w-full flex-col items-center px-6 pt-[clamp(1.75rem,5svh,3rem)] text-center">
      <h2 className="rsvp-item font-['Pinyon_Script'] text-[clamp(2.3rem,min(7svh,13vw),4rem)] leading-none whitespace-nowrap text-[#8a1c2b]">
        Kindly RSVP
      </h2>
      <p className="rsvp-item mt-[clamp(0.25rem,1svh,0.75rem)] font-serif text-[clamp(0.85rem,2svh,1.05rem)] tracking-[0.15em] text-[#1f2f6b] uppercase">
        By 15th October
      </p>

      {status === 'done' ? (
        <p className="mt-[clamp(1rem,3svh,2rem)] w-full max-w-sm rounded-2xl border border-white/70 bg-white/45 p-6 font-serif text-[clamp(1rem,2.4svh,1.25rem)] text-[#1f2f6b] shadow-lg backdrop-blur-sm">
          Thank you! Your reply has been sent.
        </p>
      ) : (
        <form
          onSubmit={sendRsvp}
          className="rsvp-item mt-[clamp(1rem,3svh,2rem)] flex w-full max-w-sm flex-col gap-[clamp(0.75rem,2.2svh,1.25rem)] rounded-2xl border border-white/70 bg-white/45 p-[clamp(1rem,2.5svh,1.5rem)] text-left shadow-lg backdrop-blur-sm"
        >
          <div>
            <p className="mb-1 font-serif text-[clamp(0.8rem,1.9svh,1rem)] text-[#1f2f6b]">Guest name</p>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              required
              className="h-[clamp(2.5rem,6svh,3rem)] w-full rounded-lg border border-white bg-white/80 px-3 font-serif text-base text-[#1f2f6b] outline-none placeholder:text-[#1f2f6b]/50 focus:border-[#8a1c2b]"
            />
          </div>

          {/* Hidden radio buttons (sr-only); the pill beside each changes colour when it is selected (peer-checked) */}
          <div>
            <p className="mb-1 font-serif text-[clamp(0.8rem,1.9svh,1rem)] text-[#1f2f6b]">Will you attend</p>
            <div className="flex gap-2">
              {['Yes', 'No'].map((answer) => (
                <label key={answer} className="flex-1 cursor-pointer">
                  <input type="radio" name="attending" value={answer} required className="peer sr-only" />
                  <span className="flex h-[clamp(2.5rem,6svh,3rem)] items-center justify-center rounded-lg border border-white bg-white/80 font-serif text-base text-[#1f2f6b] peer-checked:border-[#8a1c2b] peer-checked:bg-[#8a1c2b] peer-checked:text-white">
                    {answer}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 font-serif text-[clamp(0.8rem,1.9svh,1rem)] text-[#1f2f6b]">Engagement mood</p>
            <div className="grid grid-cols-2 gap-2">
              {MOODS.map((mood) => (
                <label key={mood} className="cursor-pointer">
                  <input type="radio" name="mood" value={mood} required className="peer sr-only" />
                  <span className="flex h-[clamp(2.5rem,6svh,3rem)] items-center justify-center rounded-lg border border-white bg-white/80 px-2 text-center font-serif text-[clamp(0.8rem,1.9svh,0.95rem)] leading-tight text-[#1f2f6b] peer-checked:border-[#8a1c2b] peer-checked:bg-[#8a1c2b] peer-checked:text-white">
                    {mood}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="h-[clamp(2.5rem,6svh,3rem)] w-full cursor-pointer rounded-lg bg-[#8a1c2b] font-serif text-base tracking-[0.15em] text-white uppercase shadow-md disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : 'Send RSVP'}
          </button>

          {status === 'error' && (
            <p className="text-center font-serif text-sm text-[#8a1c2b]">
              Sorry, that did not go through. Please try again.
            </p>
          )}
        </form>
      )}

      <div className="rsvp-item mt-[clamp(1.25rem,4svh,2.5rem)] flex w-full max-w-sm flex-col items-center">
        <p className="font-['Pinyon_Script'] text-[clamp(1.5rem,4svh,2.3rem)] leading-tight text-[#8a1c2b]">Location</p>
        <p className="mt-[clamp(0.15rem,0.6svh,0.4rem)] font-serif text-[clamp(0.95rem,2.3svh,1.2rem)] text-[#1f2f6b]">
          Marriott Resort and Spa
        </p>

        <iframe
          src={MAP_EMBED_URL}
          title="Map of Goa Marriott Resort and Spa"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="mt-[clamp(0.5rem,1.5svh,1rem)] h-[clamp(13rem,35svh,19rem)] w-[90%] rounded-2xl border-0 shadow-lg"
        />

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-[clamp(0.5rem,1.5svh,1rem)] rounded-full border border-[#8a1c2b] bg-white/60 px-5 py-2 font-serif text-[clamp(0.8rem,1.9svh,0.95rem)] text-[#8a1c2b] shadow-sm"
        >
          Open in Google Maps
        </a>
      </div>

      <div className="rsvp-item mt-[clamp(1.25rem,4svh,2.5rem)] flex flex-col items-center">
        <p className="max-w-xs font-serif text-[clamp(0.85rem,2svh,1.05rem)] text-[#1f2f6b]">
          In case of any assistance, feel free to reach out
        </p>
        {PHONES.map((phone) => (
          <a
            key={phone}
            href={`tel:${phone.replaceAll(' ', '')}`}
            className="mt-[clamp(0.2rem,0.8svh,0.5rem)] font-serif text-[clamp(1rem,2.4svh,1.25rem)] text-[#8a1c2b] underline underline-offset-4"
          >
            {phone}
          </a>
        ))}
      </div>

      <p className="rsvp-item mt-[clamp(1.25rem,4svh,2.5rem)] font-['Pinyon_Script'] text-[clamp(1.4rem,min(3.8svh,7.5vw),2.2rem)] whitespace-nowrap text-[#8a1c2b]">
        Counting down to our big day
      </p>
      <div className="rsvp-item mt-[clamp(0.5rem,1.5svh,1rem)]">
        <Countdown date={WEDDING_DATE} />
      </div>

      <p className="rsvp-item mt-[clamp(1.25rem,4svh,2.5rem)] font-['Pinyon_Script'] text-[clamp(1.5rem,4svh,2.3rem)] leading-tight text-[#8a1c2b]">
        With love and blessings
      </p>
      <p className="rsvp-item mt-[clamp(0.15rem,0.6svh,0.4rem)] font-serif text-[clamp(0.9rem,2.1svh,1.1rem)] text-[#1f2f6b]">
        We can&apos;t wait to celebrate
      </p>
    </div>
  )
}

export default Rsvp
