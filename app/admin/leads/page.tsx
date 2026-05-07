import { createSupabaseServer } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export default async function AdminLeads() {
  const supabase = await createSupabaseServer()
  const { data: leads } = await supabase.from('leads').select('*').order('created_at', { ascending: false })

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Leads</h1>
          <p>{leads?.length ?? 0} submissions from the "Get 3 Free Quotes" form</p>
        </div>
      </div>
      <div className="admin-content">
        <div className="admin-section">
          <table className="admin-table">
            <thead><tr>
              <th>Phone</th><th>Category</th><th>Area</th><th>Status</th><th>Submitted</th>
            </tr></thead>
            <tbody>
              {leads && leads.length > 0 ? leads.map((l) => (
                <tr key={l.id}>
                  <td className="name-cell">{l.phone}</td>
                  <td>{l.category}</td>
                  <td className="mono">{l.area || '—'}</td>
                  <td><span className={`badge-pub ${l.status === 'new' ? 'new' : 'pub'}`}>{l.status}</span></td>
                  <td className="mono">{new Date(l.created_at).toLocaleString('en-IN')}</td>
                </tr>
              )) : <tr><td colSpan={5} style={{ color: 'var(--muted)', textAlign: 'center', padding: '32px' }}>No leads yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
