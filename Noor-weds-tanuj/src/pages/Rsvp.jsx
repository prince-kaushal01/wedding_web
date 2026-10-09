import React, { useState } from 'react'

// Replace with real Google Form response URL and entry IDs later
const RSVP_FORM_URL = 'https://script.google.com/macros/s/AKfycbxK780X6sDqeOPVk6yWEknaYsUHk8sPrGHoxILScBpsMsV79mLpa2zHmaVThNP3MTThtQ/exec'

const labelStyle = {
  fontFamily: 'Georgia, serif',
  letterSpacing: '0.08em',
  fontSize: '11px',
}

const inputStyle = {
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.25)',
  fontFamily: 'Georgia, serif',
}

const Rsvp = ({ onClose }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent]   = useState(false)

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
    setPhone(digits)
    if (error) setError('')
  }

  const handleSend = async () => {
    if (!name.trim()) { setError('Please enter your full name.'); return }
    if (phone.length !== 10) { setError('Phone number must be exactly 10 digits.'); return }

    setError('')
    try {
      await fetch(RSVP_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      })
    } catch (_) {}

    setSent(true)
    setTimeout(onClose, 1800)
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-6"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl px-6 py-8"
        style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* X close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
          style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          ✕
        </button>

        {sent ? (
          <p className="text-center text-white text-lg py-6" style={{ fontFamily: 'Georgia, serif' }}>
            Thank you! We'll see you there 🎉
          </p>
        ) : (
          <>
            {/* Form title */}
            <p
              className="text-center text-white mb-6 text-xl"
              style={{ fontFamily: 'Great Vibes', letterSpacing: '0.12em' }}
            >
              RSVP
            </p>

            {/* Full Name */}
            <p className="text-white/70 mb-1" style={labelStyle}>FULL NAME <span style={{ color: '#f87171' }}>*</span></p>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={e => { setName(e.target.value); if (error) setError('') }}
              className="w-full mb-4 px-4 py-3 rounded-xl text-white text-sm outline-none uppercase"
              style={inputStyle}
            />

            {/* Phone Number */}
            <p className="text-white/70 mb-1" style={labelStyle}>PHONE NUMBER <span style={{ color: '#f87171' }}>*</span></p>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="10-digit phone number"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={10}
              className="w-full mb-2 px-4 py-3 rounded-xl text-white text-sm outline-none"
              style={inputStyle}
            />

            {/* Character counter + error */}
            <div className="flex justify-between items-center mb-4">
              {error
                ? <p style={{ fontFamily: 'Georgia, serif', fontSize: '11px', color: '#f87171' }}>{error}</p>
                : <span />
              }
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginLeft: 'auto' }}>
                {phone.length}/10
              </p>
            </div>

            {/* Send */}
            <button
              onClick={handleSend}
              className="w-full py-3 rounded-xl text-white text-sm"
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.4)',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.15em',
              }}
            >
              SEND
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Rsvp
