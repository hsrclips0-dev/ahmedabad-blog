export interface Listing {
  id: string
  rank: string
  name: string
  neighborhood: string
  featured: boolean
  verified: boolean
  pick: boolean
  rating: number
  reviews: number
  price: number
  tags: string[]
  img: string
  review: string
  pull: string
  hours: string
  phone: string
  address: string
  categorySlug?: string
  subtitle?: string
  body?: string[]
  quote?: string
  attribution?: string
  details?: Record<string, string>
  scores?: Record<string, number>
}

export interface Category {
  slug: string
  name: string
  count: number
  icon: string
}

export interface CalendarEvent {
  date: string
  time: string
  title: string
  location: string
  price: string
}

export interface IssueInfo {
  num: string
  date: string
}
