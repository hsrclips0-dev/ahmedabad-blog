import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export default async function AdminListicles() {
  const supabase = await createSupabaseServer()
  const { data: listicles } = await supabase
    .from('listicles')
    .select('id, slug, title, author, category_slug, published, created_at')
    .order('created_at', { ascending: false })

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Listicles</h1>
          <p>{listicles?.length ?? 0} ranked lists</p>
        </div>
        <Link href="/admin/listicles/new" className="btn btn-accent btn-arrow" style={{ fontSize: '13px', padding: '8px 16px' }}>
          New listicle
        </Link>
      </div>

      <div className="admin-content">
        <div className="admin-section">
          <table className="admin-table">
            <thead><tr>
              <th>Title</th><th>Category</th><th>Author</th><th>Status</th><th>Created</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {listicles && listicles.length > 0 ? listicles.map((l) => (
                <tr key={l.id}>
                  <td className="name-cell">{l.title}</td>
                  <td className="mono">{l.category_slug || '—'}</td>
                  <td>{l.author}</td>
                  <td><span className={`badge-pub ${l.published ? 'pub' : 'draft'}`}>{l.published ? 'Published' : 'Draft'}</span></td>
                  <td className="mono">{new Date(l.created_at).toLocaleDateString('en-IN')}</td>
                  <td className="action-links">
                    <Link href={`/admin/listicles/${l.id}`}>Edit</Link>
                    {l.published && <Link href={`/listicle/${l.slug}`} target="_blank">View ↗</Link>}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ color: 'var(--muted)', textAlign: 'center', padding: '32px' }}>
                  No listicles yet. <Link href="/admin/listicles/new" style={{ color: 'var(--accent)' }}>Create the first one →</Link>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
