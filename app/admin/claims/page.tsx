import { createSupabaseServer } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export default async function AdminClaims() {
  const supabase = await createSupabaseServer()
  const { data: claims } = await supabase.from('claims').select('*').order('created_at', { ascending: false })

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Claims</h1>
          <p>{claims?.length ?? 0} listing claim requests</p>
        </div>
      </div>
      <div className="admin-content">
        <div className="admin-section">
          <table className="admin-table">
            <thead><tr>
              <th>Business</th><th>Role</th><th>Email</th><th>Phone</th><th>Notes</th><th>Status</th><th>Submitted</th>
            </tr></thead>
            <tbody>
              {claims && claims.length > 0 ? claims.map((c) => (
                <tr key={c.id}>
                  <td className="name-cell">{c.business_name}</td>
                  <td>{c.role}</td>
                  <td className="mono">{c.email}</td>
                  <td className="mono">{c.phone}</td>
                  <td style={{ maxWidth: '200px', fontSize: '12px' }}>{c.notes || '—'}</td>
                  <td><span className={`badge-pub ${c.status === 'pending' ? 'new' : 'pub'}`}>{c.status}</span></td>
                  <td className="mono">{new Date(c.created_at).toLocaleString('en-IN')}</td>
                </tr>
              )) : <tr><td colSpan={7} style={{ color: 'var(--muted)', textAlign: 'center', padding: '32px' }}>No claims yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
