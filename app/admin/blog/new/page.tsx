import PostForm from '@/components/admin/PostForm'

export default function NewPost() {
  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>New blog post</h1>
          <p>Write it, style it, publish when ready.</p>
        </div>
      </div>
      <div className="admin-content">
        <PostForm mode="create" />
      </div>
    </>
  )
}
