import ListingForm from '@/components/admin/ListingForm'

export default function NewListing() {
  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Add listing</h1>
          <p>New business, destination, or service to feature on the site.</p>
        </div>
      </div>
      <div className="admin-content">
        <ListingForm mode="create" />
      </div>
    </>
  )
}
