import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export default async function AdminBlog() {
  const supabase = await createSupabaseServer()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, slug, title, author, category_slug, published, created_at')
    .order('created_at', { ascending: false })

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Blog Posts</h1>
          <p>{posts?.length ?? 0} posts total</p>
        </div>
        <Link href="/admin/blog/new" className="btn btn-accent btn-arrow" style={{ fontSize: '13px', padding: '8px 16px' }}>
          New post
        </Link>
      </div>

      <div className="admin-content">
        <div className="admin-section">
          <table className="admin-table">
            <thead><tr>
              <th>Title</th><th>Category</th><th>Author</th><th>Status</th><th>Created</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {posts && posts.length > 0 ? posts.map((p) => (
                <tr key={p.id}>
                  <td className="name-cell">{p.title}</td>
                  <td className="mono">{p.category_slug || '—'}</td>
                  <td>{p.author}</td>
                  <td><span className={`badge-pub ${p.published ? 'pub' : 'draft'}`}>{p.published ? 'Published' : 'Draft'}</span></td>
                  <td className="mono">{new Date(p.created_at).toLocaleDateString('en-IN')}</td>
                  <td className="action-links">
                    <Link href={`/admin/blog/${p.id}`}>Edit</Link>
                    {p.published && <Link href={`/blog/${p.slug}`} target="_blank">View ↗</Link>}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ color: 'var(--muted)', textAlign: 'center', padding: '32px' }}>
                  No posts yet. <Link href="/admin/blog/new" style={{ color: 'var(--accent)' }}>Write the first one →</Link>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
