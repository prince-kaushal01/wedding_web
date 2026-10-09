import { useState } from 'react'

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyF9mE4gSoUb0SjYuE0yCf9lbvKqmSJofNbZf0dUydA5hNcMWNpWq4YTX8V6tV7bgvP/exec'

const RSVP = () => {
  const [name,      setName]      = useState('')
  const [attending, setAttending] = useState('') // 'yes' | 'no'
  const [guests,    setGuests]    = useState('')
  const [status,    setStatus]    = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields are filled
    if (!name.trim() || !attending || !guests) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      // no-cors bypasses CORS restrictions. Data is still written to the sheet
      // even though we can't read the response back.
      await fetch(GOOGLE_SHEET_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: name.trim(), attending, guests }),
      })
      setStatus('success')
      setName('')
      setAttending('')
      setGuests('')
    } catch {
      setStatus('error')
    }
  }

  const showValidationError = status === 'error' && (!name.trim() || !attending || !guests)

  return (
    <section
      className="relative w-full flex flex-col items-center px-6 py-5"
      style={{ background: 'linear-gradient(to bottom, #fdf6ee, #f5e8d0)' }}
    >

      {/* RSVP heading */}
      <h1
        style={{ fontFamily: "'Great Vibes', cursive" }}
        className="text-[#790A2A] text-[2.4rem] leading-none font-normal m-0 mb-6"
      >
        Rsvp
      </h1>
      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">

        {/* Name input */}
        <div className="flex flex-col gap-1">
          <label
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[#805600] text-[0.7rem] tracking-[0.12em] uppercase"
          >
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setStatus('idle') }}
            placeholder="Enter your name"
            style={{ fontFamily: "'Cormorant Garamond', serif", backgroundColor: 'transparent' }}
            className="border-b border-[#BC8C50] pb-2 text-[#790A2A] text-[0.95rem] tracking-[0.03em] outline-none placeholder:text-[#BC8C50]/60 uppercase"
          />
        </div>
        {/* No. of guests */}
        <div className="flex flex-col gap-1">
          <label
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[#805600] text-[0.7rem] tracking-[0.12em] uppercase"
          >
            No. of Guests Attending
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={guests}
            onChange={(e) => { setGuests(e.target.value); setStatus('idle') }}
            placeholder="Enter number of guests"
            style={{ fontFamily: "'Cormorant Garamond', serif", backgroundColor: 'transparent' }}
            className="border-b border-[#BC8C50] pb-2 text-[#790A2A] text-[0.95rem] tracking-[0.03em] outline-none placeholder:text-[#BC8C50]/60"
          />
        </div>

        {/* Attending — Yes / No toggle */}
        <div className="flex flex-col gap-2">
          <label
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[#805600] text-[0.7rem] tracking-[0.12em] uppercase"
          >
            Will you attend?
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setAttending('yes'); setStatus('idle') }}
              style={{
                fontFamily:      "'Cormorant Garamond', serif",
                backgroundColor: attending === 'yes' ? '#D4B083' : 'transparent',
                borderColor:     '#BC8C50',
                color:           attending === 'yes' ? '#fff' : '#805600',
              }}
              className="flex-1 py-2 border-2 rounded-xl text-[0.95rem] tracking-[0.06em] transition-colors duration-200"
            >
              Yes
            </button>

            <button
              type="button"
              onClick={() => { setAttending('no'); setStatus('idle') }}
              style={{
                fontFamily:      "'Cormorant Garamond', serif",
                backgroundColor: attending === 'no' ? '#D4B083' : 'transparent',
                borderColor:     '#BC8C50',
                color:           attending === 'no' ? '#fff' : '#805600',
              }}
              className="flex-1 py-2 border-2 rounded-xl text-[0.95rem] tracking-[0.06em] transition-colors duration-200"
            >
              No
            </button>
          </div>
        </div>

        

        {/* Validation error */}
        {showValidationError && (
          <p
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[#790A2A] text-[0.75rem] tracking-[0.03em] text-center -mt-2"
          >
            Please fill in all fields.
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          style={{
            fontFamily:      "'Cormorant Garamond', serif",
            backgroundColor: '#D4B083',
            borderColor:     '#BC8C50',
          }}
          className="mt-2 py-[11px] px-8 border-2 rounded-xl text-white text-[1rem] tracking-[0.08em] disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : status === 'success' ? 'Received ✓' : 'Send RSVP'}
        </button>

      </form>

      {/* Success message */}
      {status === 'success' && (
        <p
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-[#805600] text-[0.8rem] tracking-[0.04em] text-center mt-4 leading-[1.6]"
        >
          Thank you! We look forward
          <br />
          to celebrating with you.
        </p>
      )}

    </section>
  )
}

export default RSVP
