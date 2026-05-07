import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { allListings, listingsByCategory, categories, getListingAndCategory } from '@/lib/data'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return allListings.map((l) => ({ id: l.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const result = getListingAndCategory(id)
  if (!result) return {}

  const { listing, categorySlug } = result
  const cat = categories.find((c) => c.slug === categorySlug)
  const title = `${listing.name} — Best ${cat?.name ?? 'Listings'} in Ahmedabad`
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

function formatScoreKey(key: string) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params
  const result = getListingAndCategory(id)
  if (!result) notFound()

  const { listing: c, categorySlug } = result
  const cat = categories.find((x) => x.slug === categorySlug)!
  const categoryListings = listingsByCategory[categorySlug] ?? []
  const others = categoryListings.filter((x) => x.id !== c.id).slice(0, 3)
  const related = categoryListings.filter((x) => x.id !== c.id).slice(0, 3)

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
              <Link href={`/category/${categorySlug}`}>Best {cat.name}</Link>{' '}
              <span style={{ opacity: 0.5 }}>/</span>{' '}
              <span>{c.name}</span>
            </div>

            {/* Meta badges */}
            <div className="detail-meta-top">
              <span className="eyebrow">★ Ranked #{parseInt(c.rank)} of {categoryListings.length}</span>
              {c.verified && <span className="badge-verified">Verified by us</span>}
              {c.pick && <span className="badge-pick">Editor&apos;s pick</span>}
              {c.featured && <span className="badge-featured">Featured Partner</span>}
            </div>

            <h1 className="detail-title">{c.name}</h1>
            <p className="detail-subtitle">
              — {c.subtitle ?? cat.name}, {c.neighborhood}
            </p>

            {/* Meta row */}
            <div className="detail-meta-row">
              <div className="stat-block">
                <span className="l">Rating</span>
                <span className="v">
                  {c.rating} ★ · {c.reviews.toLocaleString()} reviews
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
                <span className="l">Category</span>
                <span className="v">{cat.name}</span>
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
                  § The Review · 5 min read
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

                {c.body?.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {c.quote && (
                  <div className="pull-quote">&ldquo;{c.quote}&rdquo;</div>
                )}

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
                  {c.attribution ?? '— The editors · ahmedabad.blog'}
                </p>
              </div>

              {/* Sidecar */}
              <aside className="sidecar">
                {/* Score card */}
                {c.scores && Object.keys(c.scores).length > 0 && (
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

                    {Object.entries(c.scores).map(([key, val]) => (
                      <div key={key} className="score-bar">
                        <div className="score-top">
                          <span>{formatScoreKey(key)}</span>
                          <span className="v">{val}</span>
                        </div>
                        <div className="track">
                          <div className="fill" style={{ width: `${(val / 5) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Info card */}
                <div className="sidecar-card">
                  <h4>The Details</h4>
                  <div className="info-row">
                    <span className="k">Hours</span>
                    <span className="v">{c.hours}</span>
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
                      <span style={{ opacity: 0.3 }}>{'₹'.repeat(3 - c.price)}</span>
                    </span>
                  </div>
                  {c.details &&
                    Object.entries(c.details).map(([key, val]) => (
                      <div key={key} className="info-row">
                        <span className="k">{key}</span>
                        <span className="v">{val}</span>
                      </div>
                    ))}
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
        {related.length > 0 && (
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
                  <Link href={`/category/${categorySlug}`} className="btn btn-ghost btn-arrow">
                    All {categoryListings.length} {cat.name.toLowerCase()}
                  </Link>
                </div>
              </div>

              {related.map((r) => (
                <ListingCard key={r.id} listing={r} eyebrow={`Best ${cat.name}`} truncateReview={180} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}
