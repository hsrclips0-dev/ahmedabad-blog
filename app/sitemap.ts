import type { MetadataRoute } from 'next'
import { categories, cafes } from '@/lib/data'

const BASE = 'https://ahmedabad.blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const listingUrls: MetadataRoute.Sitemap = cafes.map((c) => ({
    url: `${BASE}/listing/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/advertise`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...categoryUrls,
    ...listingUrls,
  ]
}
