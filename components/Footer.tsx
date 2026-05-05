import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div>
            <div className="footer-wordmark">
              ahmedabad<span className="tld">.blog</span>
            </div>
            <p className="footer-tagline">
              A curated guide to the city — written by people who actually live here. We rank, we
              visit, we don't take money for rankings.
            </p>
          </div>
          <div>
            <h4>Sections</h4>
            <ul>
              <li>
                <Link href="/category/cafes">Cafés</Link>
              </li>
              <li>
                <Link href="/category/coworking">Coworking</Link>
              </li>
              <li>
                <Link href="/category/restaurants">Restaurants</Link>
              </li>
              <li>
                <Link href="/category/weekend">Weekend</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>For Businesses</h4>
            <ul>
              <li>
                <Link href="/advertise">Get Featured</Link>
              </li>
              <li>
                <Link href="/advertise#leads">Buy Leads</Link>
              </li>
              <li>
                <Link href="/advertise#claim">Claim a Listing</Link>
              </li>
              <li>
                <Link href="/advertise#rates">Rate Card</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li>
                <Link href="#">Our Method</Link>
              </li>
              <li>
                <Link href="#">Editorial Standards</Link>
              </li>
              <li>
                <Link href="#">The Team</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ahmedabad.blog · made in અમદાવાદ</span>
          <span>ISSN 3024-1188</span>
        </div>
      </div>
    </footer>
  )
}
