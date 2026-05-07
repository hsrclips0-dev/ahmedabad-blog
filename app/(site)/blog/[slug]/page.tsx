import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase-server'

interface Props { params: Promise<{ slug: string }> }

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createSupabaseServer()
  const { data: p } = await supabase.from('posts').select('title, excerpt, cover_img').eq('slug', slug).single()
  if (!p) return {}
  return {
    title: p.title,
    description: p.excerpt || undefined,
    openGraph: { title: p.title, images: p.cover_img ? [p.cover_img] : [] },
    alternates: { canonical: `https://ahmedabad.blog/blog/${slug}` },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const supabase = await createSupabaseServer()
  const { data: p } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!p) notFound()

  return (
    <main>
      <article>
        <div className="blog-hero">
          <div className="container-wide">
            <div className="detail-breadcrumbs">
              <Link href="/">The Index</Link>{' '}
              <span style={{ opacity: 0.5 }}>/</span>{' '}
              <Link href="/blog">Blog</Link>{' '}
              <span style={{ opacity: 0.5 }}>/</span>{' '}
              <span>{p.title}</span>
            </div>

            {p.category_slug && (
              <div style={{ marginTop: '16px' }}>
                <span className="eyebrow">§ {p.category_slug}</span>
              </div>
            )}

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
              {p.title}
            </h1>

            {p.subtitle && (
              <p style={{ fontFamily: 'var(--font-newsreader)', fontSize: '20px', fontStyle: 'italic', color: 'var(--ink-2)', maxWidth: '680px', lineHeight: 1.4, marginTop: '16px' }}>
                {p.subtitle}
              </p>
            )}

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--rule)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                By {p.author}
              </span>
              <span className="listing-divider" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {new Date(p.published_at || p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {p.cover_img && (
          <div style={{ position: 'relative', width: '100%', height: '480px', margin: '0' }}>
            <Image src={p.cover_img} alt={p.title} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
          </div>
        )}

        <div className="container-wide">
          <div className="blog-body-wrap">
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: p.body }}
            />

            <div style={{ paddingTop: '48px', borderTop: '1px solid var(--rule)', marginTop: '48px' }}>
              <Link href="/blog" className="btn btn-ghost btn-arrow">← All posts</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
