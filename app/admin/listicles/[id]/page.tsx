import { notFound } from 'next/navigation'
import ListicleForm from '@/components/admin/ListicleForm'
import { createSupabaseServer } from '@/lib/supabase-server'

interface Props { params: Promise<{ id: string }> }

export default async function EditListicle({ params }: Props) {
  const { id } = await params
  const supabase = await createSupabaseServer()
  const { data: l } = await supabase.from('listicles').select('*').eq('id', id).single()
  if (!l) notFound()

  return (
    <>
      <div className="admin-topbar">
        <div><h1>Edit listicle</h1><p>{l.title}</p></div>
      </div>
      <div className="admin-content">
        <ListicleForm mode="edit" id={id}
          initialItems={Array.isArray(l.items) ? l.items : []}
          initial={{
            slug: l.slug, title: l.title, subtitle: l.subtitle || '',
            author: l.author, category_slug: l.category_slug || '',
            intro: l.intro || '', cover_img: l.cover_img || '',
            published: l.published,
          }} />
      </div>
    </>
  )
}
