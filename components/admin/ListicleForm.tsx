'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { categories } from '@/lib/data'
import RichEditor from './RichEditor'

interface ListicleItem { rank: number; title: string; body: string; img: string }

interface ListicleFormData {
  slug: string
  title: string
  subtitle: string
  author: string
  category_slug: string
  intro: string
  cover_img: string
  published: boolean
}

interface Props {
  initial?: Partial<ListicleFormData>
  initialItems?: ListicleItem[]
  id?: string
  mode: 'create' | 'edit'
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

export default function ListicleForm({ initial, initialItems, id, mode }: Props) {
  const router = useRouter()
  const supabase = createSupabaseBrowser()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<ListicleFormData>({
    slug: initial?.slug || '',
    title: initial?.title || '',
    subtitle: initial?.subtitle || '',
    author: initial?.author || 'The Editors',
    category_slug: initial?.category_slug || '',
    intro: initial?.intro || '',
    cover_img: initial?.cover_img || '',
    published: initial?.published ?? false,
  })

  const [items, setItems] = useState<ListicleItem[]>(
    initialItems?.length
      ? initialItems
      : [{ rank: 1, title: '', body: '', img: '' }]
  )

  function set(field: keyof ListicleFormData, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function updateItem(index: number, field: keyof ListicleItem, value: string | number) {
    setItems(items.map((item, i) => i === index ? { ...item, [field]: value } : item))
  }

  function addItem() {
    setItems([...items, { rank: items.length + 1, title: '', body: '', img: '' }])
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index).map((item, i) => ({ ...item, rank: i + 1 })))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      items: items.filter((item) => item.title),
      published_at: form.published ? new Date().toISOString() : null,
    }

    const { error: err } = mode === 'create'
      ? await supabase.from('listicles').insert(payload)
      : await supabase.from('listicles').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id)

    if (err) {
      setError(err.message)
      setSaving(false)
    } else {
      router.push('/admin/listicles')
      router.refresh()
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this listicle? This cannot be undone.')) return
    await supabase.from('listicles').delete().eq('id', id)
    router.push('/admin/listicles')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form" style={{ maxWidth: '900px' }}>
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-form-grid">
        <div className="admin-form-group full">
          <label>Title</label>
          <input className="admin-input" value={form.title} required
            style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-bricolage)' }}
            onChange={(e) => {
              set('title', e.target.value)
              if (!form.slug) set('slug', slugify(e.target.value))
            }}
            placeholder="The 10 best rooftops in Ahmedabad" />
        </div>

        <div className="admin-form-group full">
          <label>Subtitle</label>
          <input className="admin-input" value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} placeholder="A short standfirst" />
        </div>

        <div className="admin-form-group">
          <label>URL slug</label>
          <input className="admin-input" value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="best-rooftops-ahmedabad" required />
        </div>

        <div className="admin-form-group">
          <label>Author</label>
          <input className="admin-input" value={form.author} onChange={(e) => set('author', e.target.value)} />
        </div>

        <div className="admin-form-group">
          <label>Category</label>
          <select className="admin-input" value={form.category_slug} onChange={(e) => set('category_slug', e.target.value)}>
            <option value="">— None —</option>
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>

        <div className="admin-form-group">
          <label>Cover image URL</label>
          <input className="admin-input" value={form.cover_img} onChange={(e) => set('cover_img', e.target.value)} placeholder="https://images.unsplash.com/photo-..." />
        </div>

        <div className="admin-form-group full">
          <label>Intro paragraph</label>
          <textarea className="admin-input" rows={3} value={form.intro} onChange={(e) => set('intro', e.target.value)}
            placeholder="Set the context for your ranked list in 2-3 sentences." />
        </div>
      </div>

      {/* List items */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid var(--ink)' }}>
          <h2 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, fontSize: '18px', margin: 0 }}>List items ({items.length})</h2>
          <button type="button" className="btn btn-ghost" style={{ fontSize: '13px', padding: '6px 14px' }} onClick={addItem}>+ Add item</button>
        </div>

        {items.map((item, i) => (
          <div key={i} style={{ border: '1px solid var(--rule)', borderRadius: '4px', padding: '24px', marginBottom: '16px', background: 'var(--paper-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, fontSize: '32px', color: 'var(--accent)', lineHeight: 1 }}>
                {String(item.rank).padStart(2, '0')}
              </span>
              <div style={{ flex: 1 }}>
                <input className="admin-input" value={item.title}
                  onChange={(e) => updateItem(i, 'title', e.target.value)}
                  placeholder={`Item ${i + 1} name`}
                  style={{ fontWeight: '700', fontFamily: 'var(--font-bricolage)', fontSize: '16px' }} />
              </div>
              <button type="button" className="admin-remove-row" style={{ fontSize: '20px' }} onClick={() => removeItem(i)}>×</button>
            </div>

            <div className="admin-form-group">
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-2)', marginBottom: '6px', display: 'block' }}>
                Image URL (optional)
              </label>
              <input className="admin-input" value={item.img}
                onChange={(e) => updateItem(i, 'img', e.target.value)}
                placeholder="https://images.unsplash.com/photo-..." />
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-2)', marginBottom: '6px', display: 'block' }}>
                Description
              </label>
              <RichEditor
                value={item.body}
                onChange={(html) => updateItem(i, 'body', html)}
                placeholder={`Why is ${item.title || 'this'} on the list? Write 1-3 paragraphs.`}
              />
            </div>
          </div>
        ))}

        <button type="button" className="admin-add-row-btn" style={{ width: '100%', padding: '12px' }} onClick={addItem}>
          + Add another item
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
        <label className="admin-toggle">
          <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
          Published (visible on site)
        </label>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-accent btn-arrow" disabled={saving}>
          {saving ? 'Saving…' : form.published ? 'Publish listicle' : 'Save draft'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.back()}>Cancel</button>
        {mode === 'edit' && (
          <button type="button" onClick={handleDelete} style={{ marginLeft: 'auto', color: '#c0392b', background: 'none', border: '1px solid #c0392b', padding: '8px 16px', borderRadius: '3px', cursor: 'pointer', fontSize: '13px' }}>
            Delete listicle
          </button>
        )}
      </div>
    </form>
  )
}
