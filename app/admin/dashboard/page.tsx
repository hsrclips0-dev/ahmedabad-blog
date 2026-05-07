import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createSupabaseServer()

  const [
    { count: leadsCount }, { count: claimsCount }, { count: appsCount },
    { count: postsCount }, { count: listingsCount }, { count: listiclesCount },
    { data: recentLeads }, { data: recentClaims }, { data: recentApps },
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('claims').select('*', { count: 'exact', head: true }),
    supabase.from('advertise_applications').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('listings').select('*', { count: 'exact', head: true }),
    supabase.from('listicles').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(8),
    supabase.from('claims').select('*').order('created_at', { ascending: false }).limit(8),
    supabase.from('advertise_applications').select('*').order('created_at', { ascending: false }).limit(8),
  ])

  function timeAgo(dateStr: string) {
    const d = new Date(dateStr)
    const diff = Date.now() - d.getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back. Here&apos;s what&apos;s happening.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/admin/listings/new" className="btn btn-accent btn-arrow" style={{ fontSize: '13px', padding: '8px 16px' }}>New listing</Link>
          <Link href="/admin/blog/new" className="btn btn-ghost btn-arrow" style={{ fontSize: '13px', padding: '8px 16px' }}>New post</Link>
        </div>
      </div>

      <div className="admin-content">
        {/* Stats */}
        <div className="admin-stat-grid">
          <div className="admin-stat-card">
            <div className="label">Leads</div>
            <div className="num">{leadsCount ?? 0}</div>
            <div className="sub">form submissions</div>
          </div>
          <div className="admin-stat-card">
            <div className="label">Claims</div>
            <div className="num">{claimsCount ?? 0}</div>
            <div className="sub">listing claims</div>
          </div>
          <div className="admin-stat-card">
            <div className="label">Applications</div>
            <div className="num">{appsCount ?? 0}</div>
            <div className="sub">advertise enquiries</div>
          </div>
          <div className="admin-stat-card">
            <div className="label">Content</div>
            <div className="num">{(postsCount ?? 0) + (listingsCount ?? 0) + (listiclesCount ?? 0)}</div>
            <div className="sub">{postsCount ?? 0} posts · {listingsCount ?? 0} listings · {listiclesCount ?? 0} listicles</div>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="admin-section">
          <div className="admin-section-head">
            <h2>Recent Leads</h2>
            <Link href="/admin/leads" style={{ fontSize: '13px', color: 'var(--accent)' }}>View all →</Link>
          </div>
          {recentLeads && recentLeads.length > 0 ? (
            <table className="admin-table">
              <thead><tr>
                <th>Phone</th><th>Category</th><th>Area</th><th>Status</th><th>When</th>
              </tr></thead>
              <tbody>
                {recentLeads.map((l) => (
                  <tr key={l.id}>
                    <td className="name-cell">{l.phone}</td>
                    <td>{l.category}</td>
                    <td className="mono">{l.area || '—'}</td>
                    <td><span className={`badge-pub ${l.status === 'new' ? 'new' : 'pub'}`}>{l.status}</span></td>
                    <td className="mono">{timeAgo(l.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No leads yet.</p>}
        </div>

        {/* Recent Claims */}
        <div className="admin-section">
          <div className="admin-section-head">
            <h2>Recent Claims</h2>
            <Link href="/admin/claims" style={{ fontSize: '13px', color: 'var(--accent)' }}>View all →</Link>
          </div>
          {recentClaims && recentClaims.length > 0 ? (
            <table className="admin-table">
              <thead><tr>
                <th>Business</th><th>Role</th><th>Email</th><th>Phone</th><th>Status</th><th>When</th>
              </tr></thead>
              <tbody>
                {recentClaims.map((c) => (
                  <tr key={c.id}>
                    <td className="name-cell">{c.business_name}</td>
                    <td>{c.role}</td>
                    <td className="mono">{c.email}</td>
                    <td className="mono">{c.phone}</td>
                    <td><span className={`badge-pub ${c.status === 'pending' ? 'new' : 'pub'}`}>{c.status}</span></td>
                    <td className="mono">{timeAgo(c.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No claims yet.</p>}
        </div>

        {/* Recent Applications */}
        <div className="admin-section">
          <div className="admin-section-head">
            <h2>Recent Ad Applications</h2>
            <Link href="/admin/applications" style={{ fontSize: '13px', color: 'var(--accent)' }}>View all →</Link>
          </div>
          {recentApps && recentApps.length > 0 ? (
            <table className="admin-table">
              <thead><tr>
                <th>Business</th><th>Category</th><th>Budget</th><th>Phone</th><th>Status</th><th>When</th>
              </tr></thead>
              <tbody>
                {recentApps.map((a) => (
                  <tr key={a.id}>
                    <td className="name-cell">{a.business_name}</td>
                    <td>{a.category}</td>
                    <td className="mono">{a.budget}</td>
                    <td className="mono">{a.phone}</td>
                    <td><span className={`badge-pub ${a.status === 'new' ? 'new' : 'pub'}`}>{a.status}</span></td>
                    <td className="mono">{timeAgo(a.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No applications yet.</p>}
        </div>
      </div>
    </>
  )
}
