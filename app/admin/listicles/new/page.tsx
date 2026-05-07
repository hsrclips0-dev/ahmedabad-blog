import ListicleForm from '@/components/admin/ListicleForm'

export default function NewListicle() {
  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>New listicle</h1>
          <p>Create a ranked editorial list with rich text per item.</p>
        </div>
      </div>
      <div className="admin-content">
        <ListicleForm mode="create" />
      </div>
    </>
  )
}
