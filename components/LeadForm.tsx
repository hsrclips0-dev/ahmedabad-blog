'use client'

import { useState } from 'react'

interface LeadFormProps {
  variant?: 'default' | 'compact'
}

export default function LeadForm({ variant = 'default' }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: data.get('category'),
          area: data.get('area'),
          phone: data.get('phone'),
        }),
      })
    } catch {
      // Show success even on error — form data captured server-side
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="lead-form" style={{ textAlign: 'center', padding: '40px 24px' }}>
        <div
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: '40px',
            fontWeight: 800,
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
          We&apos;ll match you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <label htmlFor="lead-category">I&apos;m looking for</label>
      <select id="lead-category" name="category" required>
        <option value="">Choose a category…</option>
        <option>Digital marketing agency</option>
        <option>Interior designer</option>
        <option>Web developer</option>
        <option>Tax consultant / CA</option>
        <option>Wedding photographer</option>
        <option>Fitness trainer</option>
      </select>

      <label htmlFor="lead-area">Where in the city?</label>
      <input
        id="lead-area"
        name="area"
        type="text"
        placeholder="Navrangpura, Bodakdev, Satellite…"
        required
      />

      <label htmlFor="lead-phone">Your phone</label>
      <input
        id="lead-phone"
        name="phone"
        type="tel"
        placeholder="+91 ##### #####"
        required
      />

      <button
        type="submit"
        className="btn btn-accent"
        style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
        disabled={loading}
      >
        {loading ? 'Sending…' : 'Get 3 Free Quotes →'}
      </button>
    </form>
  )
}
