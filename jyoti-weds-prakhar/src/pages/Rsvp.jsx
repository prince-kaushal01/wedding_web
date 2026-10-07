import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Countdown from '../components/Countdown'

// DUMMY LINK: replace this with your own Google Apps Script "web app" link
// (the script that adds a row to your Google Sheet). The form sends its answers here,
// under the names: name, attending, mood
const SHEET_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

// The venue's Google Maps share link. The "Open in Google Maps" button opens this
const MAPS_URL = 'https://maps.app.goo.gl/QhK3acpeJorFdBUk9?g_st=iw'

// The map shown inside the page. This is the "src" address from Google Maps > Share > Embed a map
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.9508130219765!2d73.8092587!3d15.487077699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc085624c679b%3A0xd3f137e3ddd48a8c!2sGoa%20Marriott%20Resort%20%26%20Spa!5e0!3m2!1sen!2sin!4v1791382146726!5m2!1sen!2sin'

// The countdown runs to this date and time: 29 November 2026, 4:30 PM, India time
const WEDDING_DATE = '2026-11-29T16:30:00+05:30'

// The choices for "Engagement mood". Add, remove or change them here
const MOODS = ['The food', 'The entertainment', 'The love', 'All of the above']

// The phone numbers guests can call. Add, remove or change them here
const PHONES = ['+91 77770 01194', '+91 89837 65117']

gsap.registerPlugin(ScrollTrigger)

const Rsvp = () => {
  // Text animation, the same as the earlier pages: every block with the class rsvp-item comes down
  // from above and fades in, tied to the scroll (scrub). Each one starts when it enters the bottom
  // of the screen and is fully in place by the time it is 75% down the screen, so they arrive one by one.
  useGSAP(() => {
    gsap.utils.toArray('.rsvp-item').forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: -50, // starts 50px higher and comes down into place
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'clamp(top 95%)', // clamp = still works for items at the very end of the site
          end: 'clamp(top 75%)',
          scrub: 0.8, // follows the scroll, taking 0.8s to catch up. true = no glide
        },
      })
    })
  })

  // idle = not sent yet, sending = on its way, done = sent, error = could not send
  const [status, setStatus] = useState('idle')

  // When the form is replaced by the thank-you message the page gets shorter.
  // This tells GSAP to measure the page again, so the footer's animation still starts at the right place
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [status])

  // Runs when the guest presses the button
  const sendRsvp = async (event) => {
    event.preventDefault() // stop the browser from reloading the page
    setStatus('sending')

    try {
      // FormData collects every field of the form by its "name"
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
    // As tall as its content, so blessings, RSVP and footer read as one page.
    // Sizes follow the screen height (svh). The sky background comes from App.jsx
    <div className="rsvp relative flex w-full flex-col items-center px-6 pt-[clamp(1.75rem,5svh,3rem)] text-center">
      {/* ---------- Heading ---------- */}
      <h2 className="rsvp-item font-['Pinyon_Script'] text-[clamp(2.3rem,min(7svh,13vw),4rem)] leading-none whitespace-nowrap text-[#8a1c2b]">
        Kindly RSVP
      </h2>
      <p className="rsvp-item mt-[clamp(0.25rem,1svh,0.75rem)] font-serif text-[clamp(0.85rem,2svh,1.05rem)] tracking-[0.15em] text-[#1f2f6b] uppercase">
        By 15th October
      </p>

      {/* ---------- Form ---------- */}
      {status === 'done' ? (
        // Shown after the form is sent
        <p className="mt-[clamp(1rem,3svh,2rem)] w-full max-w-sm rounded-2xl border border-white/70 bg-white/45 p-6 font-serif text-[clamp(1rem,2.4svh,1.25rem)] text-[#1f2f6b] shadow-lg backdrop-blur-sm">
          Thank you! Your reply has been sent.
        </p>
      ) : (
        <form
          onSubmit={sendRsvp}
          className="rsvp-item mt-[clamp(1rem,3svh,2rem)] flex w-full max-w-sm flex-col gap-[clamp(0.75rem,2.2svh,1.25rem)] rounded-2xl border border-white/70 bg-white/45 p-[clamp(1rem,2.5svh,1.5rem)] text-left shadow-lg backdrop-blur-sm"
        >
          {/* Guest name */}
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

          {/* Will you attend: Yes or No.
              Each choice is a real radio button that is hidden (sr-only), and the pill next to it
              changes colour when its radio button is selected (peer-checked) */}
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

          {/* Engagement mood: pick one. The choices come from the MOODS list at the top of this file */}
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

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="h-[clamp(2.5rem,6svh,3rem)] w-full cursor-pointer rounded-lg bg-[#8a1c2b] font-serif text-base tracking-[0.15em] text-white uppercase shadow-md disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : 'Send RSVP'}
          </button>

          {/* Shown only if sending failed */}
          {status === 'error' && (
            <p className="text-center font-serif text-sm text-[#8a1c2b]">
              Sorry, that did not go through. Please try again.
            </p>
          )}
        </form>
      )}

      {/* ---------- Location ---------- */}
      <div className="rsvp-item mt-[clamp(1.25rem,4svh,2.5rem)] flex w-full max-w-sm flex-col items-center">
        <p className="font-['Pinyon_Script'] text-[clamp(1.5rem,4svh,2.3rem)] leading-tight text-[#8a1c2b]">Location</p>
        <p className="mt-[clamp(0.15rem,0.6svh,0.4rem)] font-serif text-[clamp(0.95rem,2.3svh,1.2rem)] text-[#1f2f6b]">
          Marriott Resort and Spa
        </p>

        {/* The map itself, embedded from Google Maps. It is as wide as the form card,
            and its height follows the screen height. loading="lazy" = it only loads when the guest gets near it */}
        <iframe
          src={MAP_EMBED_URL}
          title="Map of Goa Marriott Resort and Spa"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="mt-[clamp(0.5rem,1.5svh,1rem)] h-[clamp(13rem,35svh,19rem)] w-[90%] rounded-2xl border-0 shadow-lg"
        />

        {/* Button below the map: opens the venue in Google Maps */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-[clamp(0.5rem,1.5svh,1rem)] rounded-full border border-[#8a1c2b] bg-white/60 px-5 py-2 font-serif text-[clamp(0.8rem,1.9svh,0.95rem)] text-[#8a1c2b] shadow-sm"
        >
          Open in Google Maps
        </a>
      </div>

      {/* ---------- Help: phone numbers, taken from the PHONES list at the top of this file ---------- */}
      <div className="rsvp-item mt-[clamp(1.25rem,4svh,2.5rem)] flex flex-col items-center">
        <p className="max-w-xs font-serif text-[clamp(0.85rem,2svh,1.05rem)] text-[#1f2f6b]">
          In case of any assistance, feel free to reach out
        </p>
        {PHONES.map((phone) => (
          // tel: makes the number open the phone's dialer when tapped
          <a
            key={phone}
            href={`tel:${phone.replaceAll(' ', '')}`}
            className="mt-[clamp(0.2rem,0.8svh,0.5rem)] font-serif text-[clamp(1rem,2.4svh,1.25rem)] text-[#8a1c2b] underline underline-offset-4"
          >
            {phone}
          </a>
        ))}
      </div>

      {/* ---------- Countdown ---------- */}
      <p className="rsvp-item mt-[clamp(1.25rem,4svh,2.5rem)] font-['Pinyon_Script'] text-[clamp(1.4rem,min(3.8svh,7.5vw),2.2rem)] whitespace-nowrap text-[#8a1c2b]">
        Counting down to our big day
      </p>
      <div className="rsvp-item mt-[clamp(0.5rem,1.5svh,1rem)]">
        <Countdown date={WEDDING_DATE} />
      </div>

      {/* ---------- Closing lines ---------- */}
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
