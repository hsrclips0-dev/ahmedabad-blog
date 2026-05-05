'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const KEYWORD_MAP: Record<string, string> = {
  cafe: 'cafes',
  cafes: 'cafes',
  coffee: 'cafes',
  cowork: 'coworking',
  coworking: 'coworking',
  gym: 'gyms',
  gyms: 'gyms',
  trainer: 'gyms',
  agency: 'agencies',
  agencies: 'agencies',
  marketing: 'agencies',
  seo: 'agencies',
  designer: 'designers',
  interior: 'designers',
  doctor: 'doctors',
  clinic: 'doctors',
  weekend: 'weekend',
  getaway: 'weekend',
  event: 'events',
  restaurant: 'restaurants',
  food: 'restaurants',
}

export default function SearchBlock() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function goSearch() {
    const q = query.toLowerCase()
    let cat = 'cafes'
    for (const k in KEYWORD_MAP) {
      if (q.includes(k)) {
        cat = KEYWORD_MAP[k]
        break
      }
    }
    router.push(`/category/${cat}`)
  }

  return (
    <>
      <div className="search-block">
        <span className="prefix">Find the best</span>
        <input
          type="text"
          placeholder="cafés, gyms, agencies…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && goSearch()}
          autoComplete="off"
          aria-label="Search for the best places in Ahmedabad"
        />
        <span className="suffix">in Ahmedabad</span>
        <button className="go-btn" onClick={goSearch} type="button">
          Find →
        </button>
      </div>

      <div className="search-suggest">
        <span className="label">Trending</span>
        <button type="button" onClick={() => router.push('/category/coworking')}>
          Coworking spaces
        </button>
        <button type="button" onClick={() => router.push('/category/cafes')}>
          Specialty cafés
        </button>
        <button type="button" onClick={() => router.push('/category/agencies')}>
          SEO agencies
        </button>
        <button type="button" onClick={() => router.push('/category/weekend')}>
          Weekend trips
        </button>
      </div>
    </>
  )
}
