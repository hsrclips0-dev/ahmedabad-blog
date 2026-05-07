'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createSupabaseBrowser } from '@/lib/supabase-browser'

const navItems = [
  { section: 'Overview', items: [
    { href: '/admin', label: 'Dashboard', icon: '▦' },
  ]},
  { section: 'Content', items: [
    { href: '/admin/listings', label: 'Listings', icon: '◈' },
    { href: '/admin/blog', label: 'Blog Posts', icon: '✦' },
    { href: '/admin/listicles', label: 'Listicles', icon: '≡' },
  ]},
  { section: 'Inbox', items: [
    { href: '/admin/leads', label: 'Leads', icon: '◎' },
    { href: '/admin/claims', label: 'Claims', icon: '◉' },
    { href: '/admin/applications', label: 'Applications', icon: '◌' },
  ]},
]

export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createSupabaseBrowser()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <div>ahmedabad<span className="dot">.</span><span className="tld">blog</span></div>
        <span className="badge">Admin</span>
      </div>

      <nav className="admin-nav">
        {navItems.map((group) => (
          <div key={group.section}>
            <div className="admin-nav-section">{group.section}</div>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? 'active' : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <strong>{userEmail ?? 'Admin'}</strong>
        <button className="admin-logout-btn" onClick={handleLogout}>Sign out</button>
      </div>
    </aside>
  )
}
