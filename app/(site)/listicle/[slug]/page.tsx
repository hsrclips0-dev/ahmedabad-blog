import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase-server'

interface ListicleItem { rank: number; title: string; body: string; img: string }
interface Props { params: Promise<{ slug: string }> }

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createSupabaseServer()
  const { data: l } = await supabase.from('listicles').select('title, subtitle, cover_img').eq('slug', slug).single()
  if (!l) return {}
  return {
    title: l.title,
    description: l.subtitle || undefined,
    openGraph: { title: l.title, images: l.cover_img ? [l.cover_img] : [] },
    alternates: { canonical: `https://ahmedabad.blog/listicle/${slug}` },
  }
}

export default async function ListiclePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createSupabaseServer()
  const { data: l } = await supabase
    .from('listicles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!l) notFound()

  const items: ListicleItem[] = Array.isArray(l.items) ? l.items : []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: l.title,
    description: l.subtitle,
    url: `https://ahmedabad.blog/listicle/${l.slug}`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.title,
    })),
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        <div className="blog-hero">
          <div className="container-wide">
            <div className="detail-breadcrumbs">
              <Link href="/">The Index</Link>
              {l.category_slug && (
                <><span style={{ opacity: 0.5 }}>/</span><Link href={`/category/${l.category_slug}`}>{l.category_slug}</Link></>
              )}
            </div>

            <div style={{ marginTop: '16px' }}>
              <span className="eyebrow">§ {items.length} picks · ranked list</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-bricolage)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 5vw, 52px)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              maxWidth: '820px',
              textWrap: 'balance',
              marginTop: '20px',
            }}>
              {l.title}
            </h1>

            {l.subtitle && (
              <p style={{ fontFamily: 'var(--font-newsreader)', fontSize: '20px', fontStyle: 'italic', color: 'var(--ink-2)', maxWidth: '680px', lineHeight: 1.4, marginTop: '16px' }}>
                {l.subtitle}
              </p>
            )}

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--rule)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>By {l.author}</span>
              <span className="listing-divider" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {new Date(l.published_at || l.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {l.cover_img && (
          <div style={{ position: 'relative', width: '100%', height: '480px' }}>
            <Image src={l.cover_img} alt={l.title} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
          </div>
        )}

        <div className="container-wide" style={{ maxWidth: '820px', padding: '0 32px 80px' }}>
          {l.intro && (
            <p style={{ fontFamily: 'var(--font-newsreader)', fontSize: '19px', lineHeight: 1.65, color: 'var(--ink-2)', margin: '48px 0 0', maxWidth: '680px' }}>
              {l.intro}
            </p>
          )}

          <div style={{ marginTop: '48px' }}>
            {items.map((item) => (
              <div key={item.rank} className="listicle-item">
                <div className="listicle-rank">{String(item.rank).padStart(2, '0')}</div>
                <div>
                  {item.img && (
                    <div style={{ position: 'relative', width: '100%', height: '280px', marginBottom: '20px', overflow: 'hidden', borderRadius: '3px' }}>
                      <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 820px) 100vw, 680px" />
                    </div>
                  )}
                  <h2 className="listicle-item-title">{item.title}</h2>
                  <div
                    className="listicle-item-body blog-body"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
