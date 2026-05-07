'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { categories } from '@/lib/data'

type ScoreRow = { key: string; value: string }
type DetailRow = { key: string; value: string }

interface ListingFormData {
  id: string
  name: string
  category_slug: string
  neighborhood: string
  subtitle: string
  rank_order: number
  featured: boolean
  verified: boolean
  pick: boolean
  rating: string
  review_count: string
  price: string
  tags: string
  img: string
  review: string
  pull: string
  hours: string
  phone: string
  address: string
  body_paras: string
  pull_quote: string
  attribution: string
  published: boolean
}

interface Props {
  initial?: Partial<ListingFormData>
  scores?: ScoreRow[]
  details?: DetailRow[]
  mode: 'create' | 'edit'
}

export default function ListingForm({ initial, scores: initScores, details: initDetails, mode }: Props) {
  const router = useRouter()
  const supabase = createSupabaseBrowser()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [imgPreview, setImgPreview] = useState(initial?.img || '')

  const [form, setForm] = useState<ListingFormData>({
    id: initial?.id || '',
    name: initial?.name || '',
    category_slug: initial?.category_slug || 'cafes',
    neighborhood: initial?.neighborhood || '',
    subtitle: initial?.subtitle || '',
    rank_order: initial?.rank_order ?? 99,
    featured: initial?.featured ?? false,
    verified: initial?.verified ?? false,
    pick: initial?.pick ?? false,
    rating: String(initial?.rating ?? '4.5'),
    review_count: String(initial?.review_count ?? '0'),
    price: String(initial?.price ?? '2'),
    tags: initial?.tags || '',
    img: initial?.img || '',
    review: initial?.review || '',
    pull: initial?.pull || '',
    hours: initial?.hours || '',
    phone: initial?.phone || '',
    address: initial?.address || '',
    body_paras: initial?.body_paras || '',
    pull_quote: initial?.pull_quote || '',
    attribution: initial?.attribution || '',
    published: initial?.published ?? true,
  })

  const [scores, setScores] = useState<ScoreRow[]>(
    initScores?.length ? initScores : [{ key: '', value: '' }, { key: '', value: '' }, { key: '', value: '' }, { key: '', value: '' }]
  )
  const [details, setDetails] = useState<DetailRow[]>(
    initDetails?.length ? initDetails : [{ key: '', value: '' }]
  )

  function set(field: keyof ListingFormData, value: string | boolean | number) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const scoresObj: Record<string, number> = {}
    scores.filter((s) => s.key && s.value).forEach((s) => {
      scoresObj[s.key.toLowerCase().replace(/\s+/g, '_')] = parseFloat(s.value)
    })

    const detailsObj: Record<string, string> = {}
    details.filter((d) => d.key && d.value).forEach((d) => {
      detailsObj[d.key] = d.value
    })

    const payload = {
      id: form.id.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      name: form.name,
      category_slug: form.category_slug,
      neighborhood: form.neighborhood,
      subtitle: form.subtitle,
      rank_order: Number(form.rank_order),
      featured: form.featured,
      verified: form.verified,
      pick: form.pick,
      rating: parseFloat(form.rating),
      review_count: parseInt(form.review_count),
      price: parseInt(form.price),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      img: form.img,
      review: form.review,
      pull: form.pull,
      hours: form.hours,
      phone: form.phone,
      address: form.address,
      body_paras: form.body_paras.split('\n\n').filter(Boolean),
      pull_quote: form.pull_quote,
      attribution: form.attribution,
      published: form.published,
      scores: scoresObj,
      details: detailsObj,
    }

    const { error: err } = mode === 'create'
      ? await supabase.from('listings').insert(payload)
      : await supabase.from('listings').update(payload).eq('id', initial?.id)

    if (err) {
      setError(err.message)
      setSaving(false)
    } else {
      router.push('/admin/listings')
      router.refresh()
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this listing? This cannot be undone.')) return
    await supabase.from('listings').delete().eq('id', initial?.id)
    router.push('/admin/listings')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label>Listing ID (URL slug)
            <span className="hint">e.g. amalgam-coffee — becomes /listing/amalgam-coffee</span>
          </label>
          <input className="admin-input" value={form.id} onChange={(e) => set('id', e.target.value)}
            placeholder="coffee-shop-name" required disabled={mode === 'edit'} />
        </div>

        <div className="admin-form-group">
          <label>Category</label>
          <select className="admin-input" value={form.category_slug} onChange={(e) => set('category_slug', e.target.value)}>
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>

        <div className="admin-form-group">
          <label>Business name</label>
          <input className="admin-input" value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="The name as it appears on the site" />
        </div>

        <div className="admin-form-group">
          <label>Subtitle
            <span className="hint">e.g. Specialty roastery, Heritage dining</span>
          </label>
          <input className="admin-input" value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} placeholder="Short descriptor" />
        </div>

        <div className="admin-form-group">
          <label>Neighborhood</label>
          <input className="admin-input" value={form.neighborhood} onChange={(e) => set('neighborhood', e.target.value)} required placeholder="e.g. Navrangpura" />
        </div>

        <div className="admin-form-group">
          <label>Rank order
            <span className="hint">Lower = appears higher. Default 99.</span>
          </label>
          <input className="admin-input" type="number" value={form.rank_order} onChange={(e) => set('rank_order', e.target.value)} />
        </div>

        <div className="admin-form-group">
          <label>Rating (out of 5)</label>
          <input className="admin-input" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => set('rating', e.target.value)} required />
        </div>

        <div className="admin-form-group">
          <label>Review count</label>
          <input className="admin-input" type="number" value={form.review_count} onChange={(e) => set('review_count', e.target.value)} />
        </div>

        <div className="admin-form-group">
          <label>Price (1=₹, 2=₹₹, 3=₹₹₹)</label>
          <select className="admin-input" value={form.price} onChange={(e) => set('price', e.target.value)}>
            <option value="1">₹</option><option value="2">₹₹</option><option value="3">₹₹₹</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label>Tags
            <span className="hint">Comma-separated: Wi-Fi, Brunch, Outdoor</span>
          </label>
          <input className="admin-input" value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="Tag 1, Tag 2, Tag 3" />
        </div>

        <div className="admin-form-group full">
          <label>Cover image URL
            <span className="hint">Paste any Unsplash URL: https://images.unsplash.com/photo-...?w=900&amp;q=80</span>
          </label>
          <input className="admin-input" value={form.img} onChange={(e) => { set('img', e.target.value); setImgPreview(e.target.value) }} placeholder="https://images.unsplash.com/photo-..." />
          {imgPreview
            ? <img src={imgPreview} alt="preview" className="admin-img-preview" onError={() => setImgPreview('')} />
            : <div className="admin-img-placeholder">Image preview will appear here</div>}
        </div>

        <div className="admin-form-group full">
          <label>Review (main paragraph)
            <span className="hint">This is the editorial review — 2-4 sentences, editorial voice.</span>
          </label>
          <textarea className="admin-input" rows={4} value={form.review} onChange={(e) => set('review', e.target.value)} required />
        </div>

        <div className="admin-form-group full">
          <label>Pull highlight phrase
            <span className="hint">A phrase from the review above that will be highlighted in accent color.</span>
          </label>
          <input className="admin-input" value={form.pull} onChange={(e) => set('pull', e.target.value)} placeholder="must match exactly what's in the review above" />
        </div>

        <div className="admin-form-group full">
          <label>Body paragraphs
            <span className="hint">Extended review content. Separate paragraphs with a blank line.</span>
          </label>
          <textarea className="admin-input" rows={8} value={form.body_paras} onChange={(e) => set('body_paras', e.target.value)} placeholder="First paragraph&#10;&#10;Second paragraph&#10;&#10;Third paragraph" />
        </div>

        <div className="admin-form-group full">
          <label>Pull quote
            <span className="hint">Optional blockquote shown in the review (without the quotation marks).</span>
          </label>
          <textarea className="admin-input" rows={2} value={form.pull_quote} onChange={(e) => set('pull_quote', e.target.value)} placeholder="A memorable quote about this place..." />
        </div>

        <div className="admin-form-group">
          <label>Attribution</label>
          <input className="admin-input" value={form.attribution} onChange={(e) => set('attribution', e.target.value)} placeholder="— Riya Shah · Visited Apr 2026" />
        </div>

        <div className="admin-form-group">
          <label>Hours</label>
          <input className="admin-input" value={form.hours} onChange={(e) => set('hours', e.target.value)} placeholder="8:00–22:00" />
        </div>

        <div className="admin-form-group">
          <label>Phone</label>
          <input className="admin-input" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 79 XXXX XXXX" />
        </div>

        <div className="admin-form-group">
          <label>Address</label>
          <input className="admin-input" value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="Near X, Neighborhood" />
        </div>
      </div>

      {/* Scores */}
      <div className="admin-form-group">
        <label>Score bars
          <span className="hint">Up to 4 scored dimensions. Key name + score out of 5.</span>
        </label>
        <div className="admin-score-grid">
          {scores.map((s, i) => (
            <div key={i} className="admin-score-row">
              <input className="admin-input" type="text" placeholder="e.g. coffee" value={s.key}
                onChange={(e) => setScores(scores.map((r, j) => j === i ? { ...r, key: e.target.value } : r))} />
              <input className="admin-input" type="number" placeholder="4.5" step="0.1" min="0" max="5" value={s.value}
                onChange={(e) => setScores(scores.map((r, j) => j === i ? { ...r, value: e.target.value } : r))} />
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="admin-form-group">
        <label>Detail rows (sidecar info card)
          <span className="hint">Key → Value pairs shown in the info sidebar.</span>
        </label>
        <div className="admin-details-grid">
          {details.map((d, i) => (
            <div key={i} className="admin-details-row">
              <input className="admin-input" type="text" placeholder="Label" value={d.key}
                onChange={(e) => setDetails(details.map((r, j) => j === i ? { ...r, key: e.target.value } : r))} />
              <input className="admin-input" type="text" placeholder="Value" value={d.value}
                onChange={(e) => setDetails(details.map((r, j) => j === i ? { ...r, value: e.target.value } : r))} />
              <button type="button" className="admin-remove-row" onClick={() => setDetails(details.filter((_, j) => j !== i))}>×</button>
            </div>
          ))}
          <button type="button" className="admin-add-row-btn" onClick={() => setDetails([...details, { key: '', value: '' }])}>+ Add row</button>
        </div>
      </div>

      {/* Flags */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {(['featured', 'verified', 'pick', 'published'] as const).map((flag) => (
          <label key={flag} className="admin-toggle">
            <input type="checkbox" checked={form[flag] as boolean} onChange={(e) => set(flag, e.target.checked)} />
            {flag.charAt(0).toUpperCase() + flag.slice(1)}
          </label>
        ))}
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-accent btn-arrow" disabled={saving}>
          {saving ? 'Saving…' : mode === 'create' ? 'Publish listing' : 'Save changes'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.back()}>Cancel</button>
        {mode === 'edit' && (
          <button type="button" onClick={handleDelete} style={{ marginLeft: 'auto', color: '#c0392b', background: 'none', border: '1px solid #c0392b', padding: '8px 16px', borderRadius: '3px', cursor: 'pointer', fontSize: '13px' }}>
            Delete listing
          </button>
        )}
      </div>
    </form>
  )
}
