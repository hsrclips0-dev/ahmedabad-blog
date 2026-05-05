import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SearchBlock from '@/components/SearchBlock'
import LeadForm from '@/components/LeadForm'
import ListingCard from '@/components/ListingCard'
import { categories, cafes, events } from '@/lib/data'

export const metadata: Metadata = {
  title: 'ahmedabad.blog — A curated guide to the city',
  description:
    'A curated guide to the best cafés, restaurants, gyms, coworking spaces, agencies, and more in Ahmedabad. Ranked honestly, updated weekly.',
  openGraph: {
    title: 'ahmedabad.blog — A curated guide to the city',
    description: 'The best of Ahmedabad, ranked honestly. No paid rankings, ever.',
    url: 'https://ahmedabad.blog',
    type: 'website',
  },
  alternates: { canonical: 'https://ahmedabad.blog' },
}

export default function HomePage() {
  const top3 = cafes.slice(0, 3)

  return (
    <main>
      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="container-wide">
          <div className="home-hero-grid">
            <div>
              <div className="hero-eyebrow">
                <span className="pip" />
                <span className="meta">Updated weekly · Independent · No paid rankings</span>
              </div>

              <h1>
                The <em>best</em> of
                <br />
                Ahmedabad,
                <br />
                ranked honestly.
              </h1>

              <p className="hero-sub">
                A curated guide written by people who actually live here. Cafés that pull a real
                espresso. Doctors you'd send your mother to. Cowork spaces where the Wi-Fi works.
              </p>

              <SearchBlock />

              <div className="home-hero-stats">
                <div className="stat">
                  <span className="num">188</span>
                  <span className="label">Listings, hand-picked</span>
                </div>
                <div className="stat">
                  <span className="num">
                    42<span className="accent">k</span>
                  </span>
                  <span className="label">Readers / month</span>
                </div>
                <div className="stat">
                  <span className="num">9</span>
                  <span className="label">Categories live</span>
                </div>
                <div className="stat">
                  <span className="num">0</span>
                  <span className="label">Paid rankings, ever</span>
                </div>
              </div>
            </div>

            <div className="featured-cover">
              <span className="cover-label">This Week&apos;s Pick</span>
              <Image
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80"
                alt="The Old Kothi café — a 140-year-old pol house in Khadia, Ahmedabad"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1100px) 100vw, 40vw"
                priority
              />
              <div className="caption">
                <div className="cap-meta">Heritage Café · Khadia</div>
                <h3>Inside The Old Kothi: a 140-year-old pol house, restored.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY GRID ── */}
      <section>
        <div className="container-wide">
          <div className="section-head">
            <div className="left">
              <div className="eyebrow">§ 01 · The Index</div>
              <h2>
                Browse by <em>category.</em>
              </h2>
            </div>
            <div className="right">
              188 listings
              <br />
              across 9 sections
            </div>
          </div>

          <div className="cat-grid">
            {categories.map((c, i) => (
              <Link key={c.slug} className="cat-tile" href={`/category/${c.slug}`}>
                <div>
                  <div className="cat-num">§ {String(i + 1).padStart(2, '0')}</div>
                  <div className="cat-name">Best {c.name}</div>
                </div>
                <div className="cat-bottom">
                  <div className="cat-meta">{c.count} hand-picked</div>
                  <div className="cat-arrow">→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="manifesto">
        <div className="container-wide">
          <div className="eyebrow" style={{ marginBottom: '32px' }}>
            § Method
          </div>
          <p>
            We visit every place, in person, on our own dime. We don&apos;t take money for
            rankings — only for <span className="accent">visibility</span>. The order is ours, and
            we&apos;ll defend it. If a Featured business ever stops being good, the badge comes
            off. <em>That&apos;s the deal.</em>
          </p>
        </div>
      </section>

      {/* ── TOP THREE PICKS ── */}
      <section className="two-col-editorial">
        <div style={{ display: 'contents' }}>
          <div className="container-wide" style={{ gridColumn: '1 / -1', padding: '0 32px' }}>
            <div
              className="section-head"
              style={{ paddingTop: 0, marginBottom: '32px' }}
            >
              <div className="left">
                <div className="eyebrow">§ 02 · The Picks</div>
                <h2>
                  This week&apos;s <em>top three.</em>
                </h2>
              </div>
              <div className="right">
                <Link href="/category/cafes" className="btn btn-ghost btn-arrow">
                  See all cafés
                </Link>
              </div>
            </div>

            <div>
              {top3.map((c) => (
                <ListingCard key={c.id} listing={c} eyebrow="Best Cafés" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEAD GEN STRIP ── */}
      <section className="leadgen-strip">
        <div className="container-wide">
          <div className="leadgen-inner">
            <div>
              <div
                className="eyebrow"
                style={{ color: 'rgba(245,240,230,0.6)', marginBottom: '20px' }}
              >
                § 03 · Get Quotes
              </div>
              <h2>
                Need an agency, an architect, a doctor?{' '}
                <em>We&apos;ll match you with three.</em>
              </h2>
              <p>
                Tell us what you need. We&apos;ll send your brief to three vetted businesses on
                our list, and they&apos;ll come back to you within 24 hours. Free for you. We
                charge them.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── THIS MONTH ── */}
      <section style={{ padding: '64px 0' }}>
        <div className="container-wide">
          <div className="section-head" style={{ paddingTop: 0, marginBottom: '32px' }}>
            <div className="left">
              <div className="eyebrow">§ 04 · The Calendar</div>
              <h2>
                What&apos;s on, <em>this month.</em>
              </h2>
            </div>
            <div className="right">
              May 2026
              <br />9 events
            </div>
          </div>

          <div className="this-month-list">
            {events.map((ev, i) => (
              <div key={i} className="item">
                <div className="when">
                  {ev.date}
                  <br />
                  <span className="muted">{ev.time}</span>
                </div>
                <div>
                  <div className="event-title">{ev.title}</div>
                  <div className="where">{ev.location}</div>
                </div>
                <span className="tag">{ev.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
