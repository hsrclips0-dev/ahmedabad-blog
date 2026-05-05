import type { Category, Listing, CalendarEvent, IssueInfo } from './types'

export const issue: IssueInfo = { num: 'Vol. 02 · Issue 14', date: 'May 2026' }

export const categories: Category[] = [
  { slug: 'cafes', name: 'Cafés', count: 24, icon: '☕' },
  { slug: 'coworking', name: 'Coworking', count: 12, icon: '✦' },
  { slug: 'gyms', name: 'Gyms & Trainers', count: 18, icon: '✦' },
  { slug: 'restaurants', name: 'Restaurants', count: 42, icon: '✦' },
  { slug: 'agencies', name: 'Marketing Agencies', count: 16, icon: '✦' },
  { slug: 'designers', name: 'Interior Designers', count: 22, icon: '✦' },
  { slug: 'doctors', name: 'Doctors & Clinics', count: 31, icon: '✦' },
  { slug: 'weekend', name: 'Weekend Getaways', count: 14, icon: '✦' },
  { slug: 'events', name: 'Events This Month', count: 9, icon: '✦' },
]

export const cafes: Listing[] = [
  {
    id: 'amalgam',
    rank: '01',
    name: 'Amalgam Coffee Roasters',
    neighborhood: 'Navrangpura',
    featured: true,
    verified: true,
    pick: true,
    rating: 4.8,
    reviews: 412,
    price: 2,
    tags: ['Specialty Coffee', 'Wi-Fi', 'Brunch'],
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80',
    review:
      'If Ahmedabad has produced one café that can hold a candle to Bombay\'s third-wave scene, this is it. The owner — a former finance guy from Bodakdev — sources beans from Coorg and Chikmagalur and pulls one of the cleanest espressos in the state. Sit upstairs by the courtyard window.',
    pull: 'the cleanest espresso in the state',
    hours: '7:00–22:00',
    phone: '+91 79 4002 1188',
    address: 'Behind St. Xavier\'s, Navrangpura',
    scores: { coffee: 4.9, atmosphere: 4.7, service: 4.6, value: 4.5 },
  },
  {
    id: 'mocha',
    rank: '02',
    name: 'Mocha Mojo & Co.',
    neighborhood: 'C.G. Road',
    featured: true,
    verified: true,
    pick: false,
    rating: 4.6,
    reviews: 1208,
    price: 2,
    tags: ['All-day', 'Outdoor seating'],
    img: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=900&q=80',
    review:
      'A Bombay import that found its rhythm in Ahmedabad faster than anyone expected. The shakshuka is shockingly good and the playlists genuinely work. Tuesdays are quiet; weekends are war.',
    pull: 'shockingly good shakshuka',
    hours: '8:00–23:30',
    phone: '+91 79 2656 4421',
    address: 'Opp. Crossword, C.G. Road',
    scores: { coffee: 4.5, atmosphere: 4.8, service: 4.4, value: 4.6 },
  },
  {
    id: 'blackforest',
    rank: '03',
    name: 'Blackforest Hideout',
    neighborhood: 'Bodakdev',
    featured: true,
    verified: true,
    pick: false,
    rating: 4.5,
    reviews: 624,
    price: 3,
    tags: ['Patisserie', 'Quiet'],
    img: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=900&q=80',
    review:
      'The croissants take 72 hours and you can taste every one of them. The owner trained in Lyon and refuses to compromise on butter. A small room, ten tables, no laptops after noon. A treasure.',
    pull: 'no laptops after noon',
    hours: '8:00–20:00',
    phone: '+91 98257 33420',
    address: 'Iscon Cross Roads, Bodakdev',
    scores: { coffee: 4.4, atmosphere: 4.9, service: 4.3, value: 4.2 },
  },
  {
    id: 'thirdwave',
    rank: '04',
    name: 'Third Wave by the River',
    neighborhood: 'Riverfront',
    featured: false,
    verified: true,
    pick: false,
    rating: 4.4,
    reviews: 388,
    price: 2,
    tags: ['Outdoor', 'View'],
    img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80',
    review:
      'The Sabarmati view from the upper deck is the best in the city. Coffee is solid, food is forgettable, but you don\'t come here for either — you come to watch the sun fall behind the Mahatma\'s old footbridge.',
    pull: 'best Sabarmati view in the city',
    hours: '6:30–22:00',
    phone: '+91 79 4990 1100',
    address: 'Riverfront East, near Ellis Bridge',
    scores: { coffee: 4.2, atmosphere: 4.8, service: 4.3, value: 4.4 },
  },
  {
    id: 'kothi',
    rank: '05',
    name: 'The Old Kothi',
    neighborhood: 'Khadia (Old City)',
    featured: false,
    verified: true,
    pick: true,
    rating: 4.7,
    reviews: 286,
    price: 1,
    tags: ['Heritage', 'Filter coffee'],
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
    review:
      'Set inside a 140-year-old pol house, restored by a young architect who returned from Berlin. They serve only filter coffee, masala chai, and one daily snack. The carved wooden ceiling alone is worth the trip into the old city.',
    pull: 'the carved wooden ceiling alone is worth the trip',
    hours: '8:00–19:00',
    phone: '+91 98985 22113',
    address: 'Doshiwada ni Pol, Khadia',
    scores: { coffee: 4.6, atmosphere: 5.0, service: 4.5, value: 4.9 },
  },
  {
    id: 'library',
    rank: '06',
    name: 'Library Coffee House',
    neighborhood: 'University Area',
    featured: false,
    verified: false,
    pick: false,
    rating: 4.3,
    reviews: 521,
    price: 1,
    tags: ['Books', 'Study'],
    img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80',
    review:
      'Eight thousand books, two thousand of them readable, a hundred of them rare. CEPT and IIM kids treat it like an extension of the library, which is exactly the point. Coffee is fine; the atmosphere does the rest.',
    pull: 'an extension of the library',
    hours: '9:00–23:00',
    phone: '+91 79 2630 2845',
    address: 'Near CEPT, University Area',
    scores: { coffee: 4.0, atmosphere: 4.6, service: 4.2, value: 4.5 },
  },
]

export const events: CalendarEvent[] = [
  {
    date: 'Sat 09',
    time: '19:00',
    title: 'Sufi night at Sangath, with Madan Gopal Singh',
    location: "B.V. Doshi's studio · Thaltej",
    price: '₹600',
  },
  {
    date: 'Sun 17',
    time: '06:00',
    title: 'Heritage walk through the pols of Khadia',
    location: 'Starts at Swaminarayan Temple',
    price: '₹150',
  },
  {
    date: 'Fri 22',
    time: '20:00',
    title: 'Comedy showcase: Aakash Mehta and friends',
    location: 'The Comedy Theatre · Bodakdev',
    price: '₹499',
  },
  {
    date: 'Sat 30',
    time: '17:30',
    title: 'Garba practice — pre-Navratri community session',
    location: 'Karnavati Club lawns',
    price: 'Free',
  },
]

export const listingsByCategory: Record<string, Listing[]> = {
  cafes,
  coworking: cafes,
  gyms: cafes,
  restaurants: cafes,
  agencies: cafes,
  designers: cafes,
  doctors: cafes,
  weekend: cafes,
  events: cafes,
}

export function getCategoryMeta(slug: string) {
  const deks: Record<string, string> = {
    cafes:
      "We drank a lot of coffee. We sat in a lot of chairs. Most cafés in Ahmedabad are mediocre — these six are not. Ranked by what we'd actually go back to, not by who pays us. (Nobody does.)",
    coworking:
      'Hot desks, private offices, rooftop terraces — we tried them all. Most coworking spaces in Ahmedabad overpromise on vibes and underdeliver on broadband. These ones actually work.',
    gyms:
      'Finding a gym in Ahmedabad is easy. Finding one with good equipment, decent coaching, and no gym-bro ego at the door — that takes research. This is our shortlist.',
    restaurants:
      'Ahmedabad is one of the great vegetarian food cities in the world. It also has some quietly excellent non-veg. We rank both, honestly.',
    agencies:
      'A good digital marketing agency in Ahmedabad can triple your revenue. A bad one will burn your budget and ghost your calls. We know the difference — because we called them all.',
    designers:
      'Interior design in Ahmedabad ranges from pol-house restoration masters to Instagram-aesthetic studios with no substance. We rank only the former.',
    doctors:
      'The best doctors in Ahmedabad are not always the most Googled. We talked to patients, checked credentials, and visited clinics. Here is who we trust.',
    weekend:
      'Rann of Kutch, Champaner, Rani ki Vav, Polo Forest. Within four hours of Ahmedabad, some of the best travel in India. We have ranked the drives, stays, and timings.',
    events:
      "What's happening in Ahmedabad this month that's actually worth your evening. We skip the mall inaugurations and list the ones we'd go to ourselves.",
  }
  return deks[slug] || deks.cafes
}
