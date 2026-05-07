import { notFound } from 'next/navigation'
import ListingForm from '@/components/admin/ListingForm'
import { createSupabaseServer } from '@/lib/supabase-server'

interface Props { params: Promise<{ id: string }> }

export default async function EditListing({ params }: Props) {
  const { id } = await params
  const supabase = await createSupabaseServer()
  const { data: l } = await supabase.from('listings').select('*').eq('id', id).single()
  if (!l) notFound()

  const scores = l.scores
    ? Object.entries(l.scores as Record<string, number>).map(([key, value]) => ({ key, value: String(value) }))
    : []
  const details = l.details
    ? Object.entries(l.details as Record<string, string>).map(([key, value]) => ({ key, value }))
    : []

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Edit listing</h1>
          <p>{l.name} · {l.category_slug}</p>
        </div>
      </div>
      <div className="admin-content">
        <ListingForm
          mode="edit"
          scores={scores}
          details={details}
          initial={{
            id: l.id,
            name: l.name,
            category_slug: l.category_slug,
            neighborhood: l.neighborhood,
            subtitle: l.subtitle || '',
            rank_order: l.rank_order,
            featured: l.featured,
            verified: l.verified,
            pick: l.pick,
            rating: String(l.rating),
            review_count: String(l.review_count),
            price: String(l.price),
            tags: Array.isArray(l.tags) ? l.tags.join(', ') : '',
            img: l.img || '',
            review: l.review,
            pull: l.pull || '',
            hours: l.hours || '',
            phone: l.phone || '',
            address: l.address || '',
            body_paras: Array.isArray(l.body_paras) ? l.body_paras.join('\n\n') : '',
            pull_quote: l.pull_quote || '',
            attribution: l.attribution || '',
            published: l.published,
          }}
        />
      </div>
    </>
  )
}
