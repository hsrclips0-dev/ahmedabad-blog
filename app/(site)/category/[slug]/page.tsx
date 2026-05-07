import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { categories, listingsByCategory, getCategoryMeta } from '@/lib/data'
import { createSupabaseServer } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import type { Listing } from '@/lib/types'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) return {}

  const title = `Best ${cat.name} in Ahmedabad 2026`
  const description = `The ${cat.count} best ${cat.name.toLowerCase()} in Ahmedabad, ranked honestly by people who live here. No paid rankings.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://ahmedabad.blog/category/${slug}`,
      type: 'website',
    },
    alternates: { canonical: `https://ahmedabad.blog/category/${slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) notFound()

  const supabase = await createSupabaseServer()
  const { data: dbListings } = await supabase
    .from('listings')
    .select('*')
    .eq('category_slug', slug)
    .eq('published', true)
    .order('rank_order')

  const staticListings = listingsByCategory[slug] || []

  const dbMapped: Listing[] = (dbListings ?? []).map((l) => ({
    id: l.id,
    rank: String(l.rank_order).padStart(2, '0'),
    name: l.name,
    neighborhood: l.neighborhood,
    featured: l.featured,
    verified: l.verified,
    pick: l.pick,
    rating: l.rating,
    reviews: l.review_count,
    price: l.price,
    tags: Array.isArray(l.tags) ? l.tags : [],
    img: l.img || '',
    review: l.review,
    pull: l.pull || '',
    hours: l.hours || '',
    phone: l.phone || '',
    address: l.address || '',
    categorySlug: slug,
    subtitle: l.subtitle,
    body: Array.isArray(l.body_paras) ? l.body_paras : [],
    quote: l.pull_quote,
    attribution: l.attribution,
    scores: l.scores as Record<string, number>,
    details: l.details as Record<string, string>,
  }))

  const listings = [...staticListings, ...dbMapped]
  const topListings = listings.slice(0, 3)
  const rest = listings.slice(3)
  const dek = getCategoryMeta(slug)

  const eyebrowTop = '★ Top 3 Pick'
  const eyebrowRest = `Best ${cat.name}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Best ${cat.name} in Ahmedabad`,
    description: dek,
    url: `https://ahmedabad.blog/category/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'ahmedabad.blog',
      url: 'https://ahmedabad.blog',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* ── CATEGORY HERO ── */}
        <section className="cat-hero">
          <div className="container-wide">
            <div className="breadcrumbs">
              <Link href="/">The Index</Link>{' '}
              <span style={{ opacity: 0.5 }}>/</span>{' '}
              <span>{cat.name}</span>
            </div>

            <h1>
              The {listings.length} best <em>{cat.name.toLowerCase()}</em>
              <br />
              in Ahmedabad, 2026.
            </h1>

            <p className="dek">{dek}</p>

            <div className="cat-meta-row">
              <span>Updated 02 May 2026</span>
              <span className="listing-divider" />
              <span>
                {listings.length + 8} visited · {listings.length} ranked
              </span>
              <span className="listing-divider" />
              <span>Reading time 8 min</span>
              <span className="listing-divider" />
              <span className="author">
                By <strong>Riya Shah</strong> &amp; the editors
              </span>
            </div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div className="filter-bar">
          <div className="container-wide">
            <div className="filter-bar-inner">
              <span className="filter-label">Filter</span>
              <FilterPill label={`All ${listings.length}`} defaultActive />
              <FilterPill label="Editor&apos;s pick" />
              <FilterPill label="Open now" />
              <FilterPill label="Wi-Fi friendly" />
              <span className="filter-divider" />
              <span className="filter-label">Area</span>
              <FilterPill label="Navrangpura" />
              <FilterPill label="Bodakdev" />
              <FilterPill label="Old City" />
              <FilterPill label="Riverfront" />
              <span className="filter-divider" />
              <span className="filter-label">Price</span>
              <FilterPill label="₹" />
              <FilterPill label="₹₹" />
              <FilterPill label="₹₹₹" />
              <span className="filter-divider" />
              <span className="filter-label">Sort</span>
              <FilterPill label="Our ranking" defaultActive />
              <FilterPill label="Highest rated" />
            </div>
          </div>
        </div>

        {/* ── LISTINGS ── */}
        <section className="listings-section">
          <div className="container-wide">
            <div className="featured-strip">
              <span className="strip-label">★ The Top Three</span>
              <span className="muted serif" style={{ fontStyle: 'italic' }}>
                — our highest recommendations, in order
              </span>
            </div>

            {topListings.map((c) => (
              <ListingCard key={c.id} listing={c} eyebrow={eyebrowTop} />
            ))}

            {/* Inline lead-gen */}
            <div className="inline-leadgen">
              <div className="inline-leadgen-inner" style={{ padding: '0 32px' }}>
                <div>
                  <h3>
                    Want us to <em>match you</em> with the right {cat.name.toLowerCase()} for an
                    event or meeting?
                  </h3>
                  <p>
                    Tell us your guest count, budget, and neighborhood — we&apos;ll suggest 3
                    options the same day.
                  </p>
                </div>
                <Link href="/advertise#leads" className="btn btn-accent btn-arrow">
                  Get matched
                </Link>
              </div>
            </div>

            <div
              className="featured-strip"
              style={{ borderTop: '3px solid var(--ink)' }}
            >
              <span className="strip-label" style={{ color: 'var(--ink)' }}>
                § The rest of our list
              </span>
            </div>

            {rest.map((c) => (
              <ListingCard key={c.id} listing={c} eyebrow={eyebrowRest} />
            ))}

            {/* Method */}
            <div
              style={{
                borderTop: '1px solid var(--rule)',
                padding: '56px 0',
                marginTop: '48px',
              }}
            >
              <div className="eyebrow" style={{ marginBottom: '16px' }}>
                § Our method
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-bricolage)',
                  fontWeight: 800,
                  fontSize: '40px',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  maxWidth: '800px',
                  textWrap: 'balance',
                }}
              >
                How we ranked these {listings.length} {cat.name.toLowerCase()}.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontSize: '18px',
                  lineHeight: 1.55,
                  maxWidth: '720px',
                  marginTop: '18px',
                  color: 'var(--ink-2)',
                }}
              >
                We visited each spot at least twice — once on a weekday, once on a weekend. Two
                editors sampled the same items. We score on quality (40%), atmosphere (30%),
                service (15%), and value (15%). Businesses that pay for Featured placement appear
                with a clear badge — they don&apos;t get rank advantages.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function FilterPill({ label, defaultActive }: { label: string; defaultActive?: boolean }) {
  return (
    <button
      className={`filter-pill ${defaultActive ? 'active' : ''}`}
      dangerouslySetInnerHTML={{ __html: label }}
    />
  )
}
