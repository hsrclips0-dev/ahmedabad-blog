import Link from 'next/link'
import Image from 'next/image'
import type { Listing } from '@/lib/types'

interface ListingCardProps {
  listing: Listing
  eyebrow?: string
  truncateReview?: number
}

export default function ListingCard({
  listing: c,
  eyebrow = 'Best Cafés',
  truncateReview,
}: ListingCardProps) {
  const pullIdx = c.review.indexOf(c.pull)
  const reviewText =
    truncateReview && c.review.length > truncateReview
      ? c.review.slice(0, truncateReview) + '…'
      : c.review

  const highlightedReview =
    !truncateReview && pullIdx > -1 ? (
      <>
        {c.review.slice(0, pullIdx)}
        <span className="pull">{c.pull}</span>
        {c.review.slice(pullIdx + c.pull.length)}
      </>
    ) : (
      reviewText
    )

  return (
    <Link
      className={`listing ${c.featured ? 'featured' : ''}`}
      href={`/listing/${c.id}`}
    >
      <div className="listing-rank">{c.rank}</div>

      <div className="listing-image">
        {c.featured && (
          <span className="featured-tag">
            <span className="badge-featured">Featured</span>
          </span>
        )}
        <Image
          src={c.img}
          alt={c.name}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
          sizes="(max-width: 820px) 100vw, (max-width: 1024px) 50vw, 35vw"
        />
      </div>

      <div className="listing-body">
        <div className="listing-meta-top">
          <span className="eyebrow">{eyebrow}</span>
          {c.verified && <span className="badge-verified">Verified by us</span>}
          {c.pick && <span className="badge-pick">Editor&apos;s pick</span>}
        </div>

        <h3 className="listing-title">{c.name}</h3>
        <div className="listing-neighborhood">— {c.neighborhood}</div>
        <p className="listing-review">{highlightedReview}</p>

        <div className="listing-footer">
          <div className="listing-rating">
            <span className="rating-num">{c.rating}</span>
            <span className="stars">
              {'★'.repeat(Math.round(c.rating))}
              {'☆'.repeat(5 - Math.round(c.rating))}
            </span>
            {!truncateReview && (
              <span className="muted mono">{c.reviews} reviews</span>
            )}
          </div>
          <span className="listing-divider" />
          <span className="price-range">
            {'₹'.repeat(c.price)}
            <span className="dim">{'₹'.repeat(3 - c.price)}</span>
          </span>
          {!truncateReview && (
            <>
              <span className="listing-divider" />
              {c.tags.slice(0, 2).map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
