'use client'

import { useState } from 'react'

export default function ClaimForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const data = new FormData(e.currentTarget)

    try {
      await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: data.get('business_name'),
          role: data.get('role'),
          email: data.get('email'),
          phone: data.get('phone'),
          notes: data.get('notes'),
        }),
      })
    } catch {
      // Silent fail
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="claim-form" style={{ textAlign: 'center', padding: '60px 32px' }}>
        <div
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontWeight: 800,
            fontSize: '40px',
            color: 'var(--accent)',
            letterSpacing: '-0.03em',
          }}
        >
          Got it.
        </div>
        <p
          style={{
            marginTop: '12px',
            fontFamily: 'var(--font-newsreader)',
            fontStyle: 'italic',
            fontSize: '18px',
          }}
        >
          We&apos;ll verify and email you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form className="claim-form" onSubmit={handleSubmit}>
      <div className="eyebrow" style={{ marginBottom: '20px' }}>
        Start your claim
      </div>

      <div className="field">
        <label htmlFor="claim-biz">Business name</label>
        <input
          id="claim-biz"
          name="business_name"
          type="text"
          placeholder="As it appears on our site"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="claim-role">Your role</label>
        <select id="claim-role" name="role" required>
          <option value="">Select…</option>
          <option>Owner</option>
          <option>Manager</option>
          <option>Marketing</option>
          <option>Other</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="claim-email">Email (must match domain)</label>
        <input
          id="claim-email"
          name="email"
          type="email"
          placeholder="you@yourbusiness.com"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="claim-phone">Phone</label>
        <input
          id="claim-phone"
          name="phone"
          type="tel"
          placeholder="+91 ##### #####"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="claim-notes">Anything to tell us?</label>
        <textarea
          id="claim-notes"
          name="notes"
          placeholder="Optional — corrections to your listing, etc."
        />
      </div>

      <button
        type="submit"
        className="btn btn-accent btn-arrow"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={loading}
      >
        {loading ? 'Submitting…' : 'Submit claim →'}
      </button>
    </form>
  )
}
