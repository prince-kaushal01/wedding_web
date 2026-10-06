import { useState } from 'react'
import bg from '../assets/rsvp.png'
import Countdown from '../components/Countdown'

// DUMMY LINK: replace this with your own Google Apps Script "web app" link
// (the script that adds a row to your Google Sheet). The form sends its answers here.
const SHEET_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

// The countdown runs to this date and time: 29 November 2026, 4:30 PM, India time
const WEDDING_DATE = '2026-11-29T16:30:00+05:30'

const Rsvp = () => {
  // idle = not sent yet, sending = on its way, done = sent, error = could not send
  const [status, setStatus] = useState('idle')

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
    // At least one screen tall, scrolls normally. Sizes follow the screen height (svh)
    <div className="rsvp relative flex min-h-svh w-full flex-col items-center overflow-hidden bg-[#a9cdf5] px-6 py-[clamp(1.5rem,5svh,3.5rem)]">
      {/* Background: sunset sky */}
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" />

      {/* ---------- Heading ---------- */}
      <h2 className="relative font-['Pinyon_Script'] text-[clamp(2.5rem,8svh,4.5rem)] leading-none text-[#8a1c2b]">
        RSVP
      </h2>
      <p className="relative mt-[clamp(0.25rem,1svh,0.75rem)] text-center font-serif text-[clamp(0.8rem,1.9svh,1rem)] text-[#1f2f6b]">
        Kindly let us know if you will be joining us
      </p>

      {/* ---------- Form ---------- */}
      {status === 'done' ? (
        // Shown after the form is sent
        <p className="relative mt-[clamp(1rem,3svh,2rem)] w-full max-w-sm rounded-2xl border border-white/70 bg-white/45 p-6 text-center font-serif text-[clamp(1rem,2.4svh,1.25rem)] text-[#1f2f6b] shadow-lg backdrop-blur-sm">
          Thank you! Your reply has been sent.
        </p>
      ) : (
        <form
          onSubmit={sendRsvp}
          className="relative mt-[clamp(1rem,3svh,2rem)] flex w-full max-w-sm flex-col gap-[clamp(0.6rem,1.8svh,1rem)] rounded-2xl border border-white/70 bg-white/45 p-[clamp(1rem,2.5svh,1.5rem)] shadow-lg backdrop-blur-sm"
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            required
            className="h-[clamp(2.5rem,6svh,3rem)] w-full rounded-lg border border-white bg-white/80 px-3 font-serif text-base text-[#1f2f6b] outline-none placeholder:text-[#1f2f6b]/50 focus:border-[#8a1c2b]"
          />

          {/* Number of guests */}
          <input
            type="number"
            name="guests"
            placeholder="Number of guests"
            min="1"
            max="20"
            required
            className="h-[clamp(2.5rem,6svh,3rem)] w-full rounded-lg border border-white bg-white/80 px-3 font-serif text-base text-[#1f2f6b] outline-none placeholder:text-[#1f2f6b]/50 focus:border-[#8a1c2b]"
          />

          {/* Attending or not */}
          <select
            name="attending"
            required
            defaultValue=""
            className="h-[clamp(2.5rem,6svh,3rem)] w-full rounded-lg border border-white bg-white/80 px-3 font-serif text-base text-[#1f2f6b] outline-none focus:border-[#8a1c2b]"
          >
            <option value="" disabled>
              Will you attend?
            </option>
            <option value="Yes">Joyfully accept</option>
            <option value="No">Regretfully decline</option>
          </select>

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

      {/* ---------- Countdown ---------- */}
      <p className="relative mt-[clamp(1.25rem,4svh,2.5rem)] font-['Pinyon_Script'] text-[clamp(1.4rem,min(3.8svh,7.5vw),2.2rem)] whitespace-nowrap text-[#8a1c2b]">
        Counting down to our big day
      </p>
      <div className="relative mt-[clamp(0.5rem,1.5svh,1rem)]">
        <Countdown date={WEDDING_DATE} />
      </div>

      {/* ---------- Warm line for the guests ---------- */}
      <p className="relative mt-[clamp(1.25rem,4svh,2.5rem)] max-w-xs text-center font-serif text-[clamp(0.85rem,2svh,1.05rem)] text-[#1f2f6b]">
        Your presence and blessings are the most precious gift to us. We cannot wait to celebrate with you.
      </p>
      <p className="relative mt-[clamp(0.25rem,1svh,0.75rem)] font-['Pinyon_Script'] text-[clamp(1.3rem,3.4svh,2rem)] text-[#8a1c2b]">
        With love, Jyoti &amp; Prakhar
      </p>
    </div>
  )
}

export default Rsvp
