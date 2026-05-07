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
      posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          title: string
          subtitle: string | null
          author: string
          category_slug: string | null
          body: string
          excerpt: string | null
          cover_img: string | null
          tags: string[] | null
          published: boolean
          published_at: string | null
        }
        Insert: {
          slug: string
          title: string
          subtitle?: string | null
          author?: string
          category_slug?: string | null
          body: string
          excerpt?: string | null
          cover_img?: string | null
          tags?: string[] | null
          published?: boolean
          published_at?: string | null
        }
      }
      listings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          rank_order: number
          name: string
          category_slug: string
          neighborhood: string
          subtitle: string | null
          featured: boolean
          verified: boolean
          pick: boolean
          rating: number
          review_count: number
          price: number
          tags: string[] | null
          img: string | null
          review: string
          pull: string | null
          hours: string | null
          phone: string | null
          address: string | null
          body_paras: string[] | null
          pull_quote: string | null
          attribution: string | null
          scores: Record<string, number> | null
          details: Record<string, string> | null
          published: boolean
        }
        Insert: {
          id?: string
          rank_order?: number
          name: string
          category_slug: string
          neighborhood: string
          subtitle?: string | null
          featured?: boolean
          verified?: boolean
          pick?: boolean
          rating?: number
          review_count?: number
          price?: number
          tags?: string[] | null
          img?: string | null
          review: string
          pull?: string | null
          hours?: string | null
          phone?: string | null
          address?: string | null
          body_paras?: string[] | null
          pull_quote?: string | null
          attribution?: string | null
          scores?: Record<string, number> | null
          details?: Record<string, string> | null
          published?: boolean
        }
      }
      listicles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          slug: string
          title: string
          subtitle: string | null
          author: string
          category_slug: string | null
          intro: string | null
          cover_img: string | null
          items: Array<{ rank: number; title: string; body: string; img: string }>
          published: boolean
          published_at: string | null
        }
        Insert: {
          slug: string
          title: string
          subtitle?: string | null
          author?: string
          category_slug?: string | null
          intro?: string | null
          cover_img?: string | null
          items?: Array<{ rank: number; title: string; body: string; img: string }>
          published?: boolean
          published_at?: string | null
        }
      }
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
