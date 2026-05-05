import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { cafes, categories } from '@/lib/data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return cafes.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const listing = cafes.find((c) => c.id === id)
  if (!listing) return {}

  const title = `${listing.name} — Best Cafés in Ahmedabad`
  const description = listing.review.slice(0, 160)

  return {
    title,
    description,
    openGraph: {
      title: listing.name,
      description: listing.review.slice(0, 200),
      images: [{ url: listing.img, width: 900, height: 600, alt: listing.name }],
      type: 'article',
      url: `https://ahmedabad.blog/listing/${id}`,
    },
    alternates: { canonical: `https://ahmedabad.blog/listing/${id}` },
  }
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params
  const c = cafes.find((x) => x.id === id)
  if (!c) notFound()

  const others = cafes.filter((x) => x.id !== c.id).slice(0, 3)
  const related = cafes.filter((x) => x.id !== c.id).slice(0, 3)
  const cat = categories.find((x) => x.slug === 'cafes')!

  const pullIdx = c.review.indexOf(c.pull)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: c.name,
    description: c.review.slice(0, 200),
    image: c.img,
    url: `https://ahmedabad.blog/listing/${c.id}`,
    telephone: c.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.address,
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: c.rating.toString(),
      reviewCount: c.reviews.toString(),
      bestRating: '5',
    },
    openingHours: c.hours,
    priceRange: '₹'.repeat(c.price),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <article className="detail-hero">
          <div className="container-wide">
            {/* Breadcrumbs */}
            <div className="detail-breadcrumbs">
              <Link href="/">The Index</Link>{' '}
              <span style={{ opacity: 0.5 }}>/</span>{' '}
              <Link href="/category/cafes">Best Cafés</Link>{' '}
              <span style={{ opacity: 0.5 }}>/</span>{' '}
              <span>{c.name}</span>
            </div>

            {/* Meta badges */}
            <div className="detail-meta-top">
              <span className="eyebrow">★ Ranked #{parseInt(c.rank)} of {cafes.length}</span>
              {c.verified && <span className="badge-verified">Verified by us</span>}
              {c.pick && <span className="badge-pick">Editor&apos;s pick</span>}
              {c.featured && <span className="badge-featured">Featured Partner</span>}
            </div>

            <h1 className="detail-title">{c.name}</h1>
            <p className="detail-subtitle">
              — Specialty café, {c.neighborhood}
            </p>

            {/* Meta row */}
            <div className="detail-meta-row">
              <div className="stat-block">
                <span className="l">Rating</span>
                <span className="v">
                  {c.rating} ★ · {c.reviews} reviews
                </span>
              </div>
              <div className="stat-block">
                <span className="l">Price</span>
                <span className="v">
                  {'₹'.repeat(c.price)}
                  <span style={{ opacity: 0.3 }}>{'₹'.repeat(3 - c.price)}</span>
                </span>
              </div>
              <div className="stat-block">
                <span className="l">Vibe</span>
                <span className="v">{c.tags[0]}</span>
              </div>
              <div className="stat-block">
                <span className="l">Last visited</span>
                <span className="v">Apr 2026</span>
              </div>
              <div className="stat-block">
                <span className="l">Times visited</span>
                <span className="v">3</span>
              </div>
            </div>

            {/* Image grid */}
            <div className="detail-image-grid">
              <div>
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 820px) 100vw, 55vw"
                  priority
                />
              </div>
              {others.map((o) => (
                <div key={o.id}>
                  <Image
                    src={o.img}
                    alt={o.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 820px) 50vw, 20vw"
                  />
                </div>
              ))}
            </div>

            {/* Body: review + sidecar */}
            <div className="detail-body">
              <div className="review-body">
                <div className="eyebrow" style={{ marginBottom: '24px' }}>
                  § The Review · 8 min read
                </div>

                <p>
                  {pullIdx > -1 ? (
                    <>
                      {c.review.slice(0, pullIdx)}
                      <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{c.pull}</em>
                      {c.review.slice(pullIdx + c.pull.length)}
                    </>
                  ) : (
                    c.review
                  )}
                </p>

                <p>
                  Coffee in Ahmedabad has been a slow-build story. For most of the 2010s, the
                  city&apos;s idea of a café was a milky cappuccino at CCD and a pastry that had
                  been sitting under a glass dome since the previous Tuesday. Then came the Bombay
                  imports, and slowly, a few homegrown shops that took the work seriously. Amalgam
                  is the most serious of them.
                </p>

                <div className="pull-quote">
                  &ldquo;He pulls a 1:2 ratio at 92°C, talks about extraction yields without
                  sounding insufferable, and the result is in the cup.&rdquo;
                </div>

                <p>
                  The owner, Karan, spent eight years at a hedge fund in Lower Parel before
                  deciding he&apos;d rather own a roastery. He sources from a single estate in
                  Coorg and a couple of small farms outside Chikmagalur, roasts on a small Probat
                  in the back, and — crucially — pays attention to the espresso machine. Most cafés
                  in this city run their groupheads filthy. His are immaculate.
                </p>

                <p>
                  The food menu is short by design. The croissant is from Blackforest down the road
                  (he doesn&apos;t pretend to bake). The eggs are good. The ragi pancakes are
                  surprisingly excellent. Don&apos;t order the salads.
                </p>

                <p>
                  Sit upstairs. There&apos;s a window seat that looks out onto the courtyard, and
                  it&apos;s the best chair in any café in this city.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    paddingTop: '24px',
                    borderTop: '1px solid var(--rule)',
                  }}
                >
                  — Riya Shah · Visited Mar 2026 &amp; Apr 2026
                </p>
              </div>

              {/* Sidecar */}
              <aside className="sidecar">
                {/* Score card */}
                <div className="sidecar-card">
                  <h4>Our Score</h4>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-bricolage)',
                        fontWeight: 800,
                        fontSize: '64px',
                        letterSpacing: '-0.045em',
                        lineHeight: 1,
                        color: 'var(--accent)',
                      }}
                    >
                      {c.rating}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-newsreader)',
                        fontStyle: 'italic',
                        fontSize: '18px',
                        color: 'var(--ink-2)',
                      }}
                    >
                      / 5.0
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '20px',
                    }}
                  >
                    Editor&apos;s score
                  </div>

                  {c.scores &&
                    Object.entries(c.scores).map(([key, val]) => (
                      <div key={key} className="score-bar">
                        <div className="score-top">
                          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                          <span className="v">{val}</span>
                        </div>
                        <div className="track">
                          <div className="fill" style={{ width: `${(val / 5) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                </div>

                {/* Info card */}
                <div className="sidecar-card">
                  <h4>The Details</h4>
                  <div className="info-row">
                    <span className="k">Status</span>
                    <span className="v open">● Open · until 22:00</span>
                  </div>
                  <div className="info-row">
                    <span className="k">Hours</span>
                    <span className="v">{c.hours}, daily</span>
                  </div>
                  <div className="info-row">
                    <span className="k">Address</span>
                    <span className="v">{c.address}</span>
                  </div>
                  <div className="info-row">
                    <span className="k">Phone</span>
                    <span className="v">{c.phone}</span>
                  </div>
                  <div className="info-row">
                    <span className="k">Price</span>
                    <span className="v">
                      {'₹'.repeat(c.price)}
                      <span style={{ opacity: 0.3 }}>{'₹'.repeat(3 - c.price)}</span> · ₹250 for
                      two
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="k">Wi-Fi</span>
                    <span className="v">Yes — fast</span>
                  </div>
                  <div className="info-row">
                    <span className="k">Seating</span>
                    <span className="v">42 inside · 12 courtyard</span>
                  </div>
                  <div className="info-row">
                    <span className="k">Parking</span>
                    <span className="v">2-wheeler only</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="cta-stack">
                  <button className="btn btn-primary btn-arrow">Get directions</button>
                  <button className="btn btn-ghost btn-arrow">Call them</button>
                  <button className="btn btn-ghost btn-arrow">WhatsApp</button>
                </div>

                {/* Owner CTA */}
                <div
                  className="sidecar-card"
                  style={{ background: 'var(--paper-2)', borderStyle: 'dashed' }}
                >
                  <h4 style={{ color: 'var(--accent)' }}>Are you the owner?</h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-newsreader)',
                      fontSize: '15px',
                      lineHeight: 1.45,
                      color: 'var(--ink-2)',
                      marginBottom: '14px',
                    }}
                  >
                    Claim this listing to add hours, photos, and respond to reviews. Free, takes 5
                    minutes.
                  </p>
                  <Link
                    href="/advertise#claim"
                    className="btn btn-accent btn-arrow"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Claim listing
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* ── RELATED ── */}
        <section className="related-section">
          <div className="container-wide">
            <div className="section-head" style={{ paddingTop: 0 }}>
              <div className="left">
                <div className="eyebrow">§ Continue reading</div>
                <h2>
                  If you liked this, <em>try these.</em>
                </h2>
              </div>
              <div className="right">
                <Link href="/category/cafes" className="btn btn-ghost btn-arrow">
                  All {cafes.length} cafés
                </Link>
              </div>
            </div>

            {related.map((r) => (
              <ListingCard key={r.id} listing={r} eyebrow="Best Cafés" truncateReview={180} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
