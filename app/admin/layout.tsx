import { createSupabaseServer } from '@/lib/supabase-server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="admin-root">
      <AdminSidebar userEmail={user?.email} />
      <div className="admin-main">
        {children}
      </div>
    </div>
  )
}
