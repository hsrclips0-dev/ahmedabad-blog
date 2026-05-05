'use client'

import { useState } from 'react'

export default function AdvertiseForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const data = new FormData(e.currentTarget)

    try {
      await fetch('/api/advertise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: data.get('business_name'),
          category: data.get('category'),
          service_area: data.get('service_area'),
          budget: data.get('budget'),
          phone: data.get('phone'),
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
            fontSize: '36px',
            color: 'var(--accent)',
            letterSpacing: '-0.03em',
          }}
        >
          Application received.
        </div>
        <p
          style={{
            marginTop: '12px',
            fontFamily: 'var(--font-newsreader)',
            fontStyle: 'italic',
            fontSize: '18px',
          }}
        >
          We&apos;ll review and call within 2 business days.
        </p>
      </div>
    )
  }

  return (
    <form className="claim-form" onSubmit={handleSubmit}>
      <div className="eyebrow" style={{ marginBottom: '20px' }}>
        Apply to receive leads
      </div>

      <div className="field">
        <label htmlFor="adv-biz">Business name</label>
        <input
          id="adv-biz"
          name="business_name"
          type="text"
          placeholder="e.g. Pixel & Co. Studio"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="adv-cat">Category</label>
        <select id="adv-cat" name="category" required>
          <option value="">Select…</option>
          <option>Digital marketing agency</option>
          <option>Web developer / SEO</option>
          <option>Interior designer</option>
          <option>Architect</option>
          <option>Tax consultant / CA</option>
          <option>Other</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="adv-area">Service area</label>
        <input
          id="adv-area"
          name="service_area"
          type="text"
          placeholder="Ahmedabad, Gandhinagar"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="adv-budget">Monthly lead budget</label>
        <select id="adv-budget" name="budget" required>
          <option value="">Select…</option>
          <option>₹5,000 – ₹15,000</option>
          <option>₹15,000 – ₹50,000</option>
          <option>₹50,000+</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="adv-phone">Phone</label>
        <input
          id="adv-phone"
          name="phone"
          type="tel"
          placeholder="+91 ##### #####"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-accent btn-arrow"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={loading}
      >
        {loading ? 'Sending…' : 'Apply for leads →'}
      </button>
    </form>
  )
}
