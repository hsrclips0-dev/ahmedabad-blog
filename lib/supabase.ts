import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side admin client (only use in API routes / Server Actions)
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) return supabase
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          created_at: string
          category: string
          area: string | null
          phone: string
          status: string
        }
        Insert: {
          category: string
          area?: string | null
          phone: string
          status?: string
        }
      }
      claims: {
        Row: {
          id: string
          created_at: string
          business_name: string
          role: string
          email: string
          phone: string
          notes: string | null
          status: string
        }
        Insert: {
          business_name: string
          role: string
          email: string
          phone: string
          notes?: string | null
          status?: string
        }
      }
      advertise_applications: {
        Row: {
          id: string
          created_at: string
          business_name: string
          category: string
          service_area: string
          budget: string
          phone: string
          status: string
        }
        Insert: {
          business_name: string
          category: string
          service_area: string
          budget: string
          phone: string
          status?: string
        }
      }
    }
  }
}
