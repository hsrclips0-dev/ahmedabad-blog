'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories, issue } from '@/lib/data'
import LiveMetaBar from './LiveMetaBar'

export default function Masthead() {
  const pathname = usePathname()
  const catSlug = pathname.startsWith('/category/') ? pathname.split('/')[2] : null
  const isHome = pathname === '/'

  return (
    <header className="masthead">
      <div className="container-wide">
        <div className="masthead-top">
          <div className="left">
            <LiveMetaBar />
          </div>
          <div className="right">
            <Link href="/advertise">Advertise</Link>
            <Link href="#">Newsletter</Link>
            <Link href="#">Submit a Tip</Link>
          </div>
        </div>

        <div className="wordmark-row">
          <Link href="/" className="wordmark">
            <span>
              ahmedabad<span className="dot" />
            </span>
            <span className="tld">blog</span>
            <span className="gj">અમદાવાદ</span>
          </Link>
          <div className="issue-meta">
            <div>
              <span className="num">{issue.num}</span>
            </div>
            <div>{issue.date}</div>
          </div>
        </div>

        <nav className="nav-cats">
          <Link href="/" className={isHome ? 'active' : ''}>
            The Index
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={catSlug === c.slug ? 'active' : ''}
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
