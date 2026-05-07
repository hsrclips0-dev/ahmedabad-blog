import { createSupabaseServer } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export default async function AdminApplications() {
  const supabase = await createSupabaseServer()
  const { data: apps } = await supabase.from('advertise_applications').select('*').order('created_at', { ascending: false })

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Ad Applications</h1>
          <p>{apps?.length ?? 0} businesses that applied to advertise</p>
        </div>
      </div>
      <div className="admin-content">
        <div className="admin-section">
          <table className="admin-table">
            <thead><tr>
              <th>Business</th><th>Category</th><th>Service area</th><th>Budget</th><th>Phone</th><th>Status</th><th>Submitted</th>
            </tr></thead>
            <tbody>
              {apps && apps.length > 0 ? apps.map((a) => (
                <tr key={a.id}>
                  <td className="name-cell">{a.business_name}</td>
                  <td>{a.category}</td>
                  <td className="mono">{a.service_area}</td>
                  <td className="mono">{a.budget}</td>
                  <td className="mono">{a.phone}</td>
                  <td><span className={`badge-pub ${a.status === 'new' ? 'new' : 'pub'}`}>{a.status}</span></td>
                  <td className="mono">{new Date(a.created_at).toLocaleString('en-IN')}</td>
                </tr>
              )) : <tr><td colSpan={7} style={{ color: 'var(--muted)', textAlign: 'center', padding: '32px' }}>No applications yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
