'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase-browser'
import { categories } from '@/lib/data'
import RichEditor from './RichEditor'

interface PostFormData {
  slug: string
  title: string
  subtitle: string
  author: string
  category_slug: string
  excerpt: string
  cover_img: string
  body: string
  published: boolean
}

interface Props {
  initial?: Partial<PostFormData>
  id?: string
  mode: 'create' | 'edit'
}

export default function PostForm({ initial, id, mode }: Props) {
  const router = useRouter()
  const supabase = createSupabaseBrowser()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [coverPreview, setCoverPreview] = useState(initial?.cover_img || '')

  const [form, setForm] = useState<PostFormData>({
    slug: initial?.slug || '',
    title: initial?.title || '',
    subtitle: initial?.subtitle || '',
    author: initial?.author || 'The Editors',
    category_slug: initial?.category_slug || '',
    excerpt: initial?.excerpt || '',
    cover_img: initial?.cover_img || '',
    body: initial?.body || '',
    published: initial?.published ?? false,
  })

  function set(field: keyof PostFormData, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function slugify(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      published_at: form.published ? new Date().toISOString() : null,
    }

    const { error: err } = mode === 'create'
      ? await supabase.from('posts').insert(payload)
      : await supabase.from('posts').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id)

    if (err) {
      setError(err.message)
      setSaving(false)
    } else {
      router.push('/admin/blog')
      router.refresh()
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await supabase.from('posts').delete().eq('id', id)
    router.push('/admin/blog')
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
            placeholder="The headline of your post" />
        </div>

        <div className="admin-form-group full">
          <label>Subtitle / standfirst
            <span className="hint">One sentence that summarises the piece.</span>
          </label>
          <input className="admin-input" value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)}
            placeholder="A sentence that draws readers in" />
        </div>

        <div className="admin-form-group">
          <label>URL slug
            <span className="hint">Auto-generated from title. e.g. best-cafes-navrangpura</span>
          </label>
          <input className="admin-input" value={form.slug} onChange={(e) => set('slug', e.target.value)}
            placeholder="url-slug-here" required />
        </div>

        <div className="admin-form-group">
          <label>Author</label>
          <input className="admin-input" value={form.author} onChange={(e) => set('author', e.target.value)}
            placeholder="Riya Shah" />
        </div>

        <div className="admin-form-group">
          <label>Category</label>
          <select className="admin-input" value={form.category_slug} onChange={(e) => set('category_slug', e.target.value)}>
            <option value="">— None —</option>
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>

        <div className="admin-form-group">
          <label>Cover image URL
            <span className="hint">Unsplash: https://images.unsplash.com/photo-...?w=1200&amp;q=80</span>
          </label>
          <input className="admin-input" value={form.cover_img}
            onChange={(e) => { set('cover_img', e.target.value); setCoverPreview(e.target.value) }}
            placeholder="https://images.unsplash.com/photo-..." />
          {coverPreview
            ? <img src={coverPreview} alt="cover" className="admin-img-preview" onError={() => setCoverPreview('')} />
            : <div className="admin-img-placeholder">Cover preview</div>}
        </div>

        <div className="admin-form-group full">
          <label>Excerpt (for listing pages)
            <span className="hint">2-3 sentences shown on the blog index. Leave blank to auto-use the opening.</span>
          </label>
          <textarea className="admin-input" rows={3} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)}
            placeholder="A short teaser for the post..." />
        </div>
      </div>

      {/* Rich text body */}
      <div className="admin-form-group">
        <label>Body content</label>
        <RichEditor
          value={form.body}
          onChange={(html) => set('body', html)}
          placeholder="Write your post here. Use H2 for section headings, blockquote for standout quotes."
        />
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
        <label className="admin-toggle">
          <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
          Published (visible on site)
        </label>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="btn btn-accent btn-arrow" disabled={saving}>
          {saving ? 'Saving…' : form.published ? 'Publish post' : 'Save draft'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => router.back()}>Cancel</button>
        {mode === 'edit' && (
          <button type="button" onClick={handleDelete} style={{ marginLeft: 'auto', color: '#c0392b', background: 'none', border: '1px solid #c0392b', padding: '8px 16px', borderRadius: '3px', cursor: 'pointer', fontSize: '13px' }}>
            Delete post
          </button>
        )}
      </div>
    </form>
  )
}
