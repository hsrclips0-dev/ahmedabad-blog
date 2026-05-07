import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export default async function AdminListings() {
  const supabase = await createSupabaseServer()
  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .order('category_slug')
    .order('rank_order')

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Listings</h1>
          <p>{listings?.length ?? 0} database listings</p>
        </div>
        <Link href="/admin/listings/new" className="btn btn-accent btn-arrow" style={{ fontSize: '13px', padding: '8px 16px' }}>
          Add listing
        </Link>
      </div>

      <div className="admin-content">
        <div className="admin-section">
          <table className="admin-table">
            <thead><tr>
              <th>Name</th><th>Category</th><th>Neighborhood</th><th>Rating</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {listings && listings.length > 0 ? listings.map((l) => (
                <tr key={l.id}>
                  <td className="name-cell">{l.name}</td>
                  <td className="mono">{l.category_slug}</td>
                  <td>{l.neighborhood}</td>
                  <td className="mono">{l.rating} ★</td>
                  <td><span className={`badge-pub ${l.published ? 'pub' : 'draft'}`}>{l.published ? 'Live' : 'Draft'}</span></td>
                  <td className="action-links">
                    <Link href={`/admin/listings/${l.id}`}>Edit</Link>
                    <Link href={`/listing/${l.id}`} target="_blank">View ↗</Link>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} style={{ color: 'var(--muted)', textAlign: 'center', padding: '32px' }}>
                  No listings yet. <Link href="/admin/listings/new" style={{ color: 'var(--accent)' }}>Add the first one →</Link>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
