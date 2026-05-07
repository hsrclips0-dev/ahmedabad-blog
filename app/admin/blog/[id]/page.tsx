import { notFound } from 'next/navigation'
import PostForm from '@/components/admin/PostForm'
import { createSupabaseServer } from '@/lib/supabase-server'

interface Props { params: Promise<{ id: string }> }

export default async function EditPost({ params }: Props) {
  const { id } = await params
  const supabase = await createSupabaseServer()
  const { data: p } = await supabase.from('posts').select('*').eq('id', id).single()
  if (!p) notFound()

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Edit post</h1>
          <p>{p.title}</p>
        </div>
      </div>
      <div className="admin-content">
        <PostForm mode="edit" id={id} initial={{
          slug: p.slug,
          title: p.title,
          subtitle: p.subtitle || '',
          author: p.author,
          category_slug: p.category_slug || '',
          excerpt: p.excerpt || '',
          cover_img: p.cover_img || '',
          body: p.body,
          published: p.published,
        }} />
      </div>
    </>
  )
}
