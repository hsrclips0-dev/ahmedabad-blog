import type { Metadata } from 'next'
import Link from 'next/link'
import ClaimForm from '@/components/ClaimForm'
import AdvertiseForm from '@/components/AdvertiseForm'

export const metadata: Metadata = {
  title: 'Advertise on ahmedabad.blog — Get Featured & Buy Leads',
  description:
    '42,000 readers/month in Ahmedabad. Get featured listings, buy verified leads, or claim your free listing. No traffic needed — just results.',
  openGraph: {
    title: 'Advertise on ahmedabad.blog',
    description: '42k readers. Get found by people actually searching for what you sell.',
    url: 'https://ahmedabad.blog/advertise',
    type: 'website',
  },
  alternates: { canonical: 'https://ahmedabad.blog/advertise' },
}

export default function AdvertisePage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="adv-hero">
        <div className="container-wide">
          <div className="hero-eyebrow">
            <span className="pip" />
            <span className="meta">For Businesses · Get listed, get found, get leads</span>
          </div>
          <h1>
            Get found by people
            <br />
            actually <em>looking</em>
            <br />
            for what you sell.
          </h1>
          <p className="lede">
            42,000 readers a month, all in Ahmedabad, all already searching for cafés, gyms,
            agencies, doctors, designers. We don&apos;t sell rankings — we sell visibility,
            leads, and trust. Pick what works for you.
          </p>

          <div className="adv-stats">
            <div className="stat">
              <div className="num">
                42<span className="accent">k</span>
              </div>
              <div className="l">Monthly readers</div>
            </div>
            <div className="stat">
              <div className="num">
                87<span className="accent">%</span>
              </div>
              <div className="l">From Ahmedabad</div>
            </div>
            <div className="stat">
              <div className="num">
                4.2<span className="accent">×</span>
              </div>
              <div className="l">Avg. listing CTR</div>
            </div>
            <div className="stat">
              <div className="num">₹312</div>
              <div className="l">Avg. cost / lead</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing" id="rates">
        <div className="container-wide">
          <div className="section-head" style={{ paddingTop: 0 }}>
            <div className="left">
              <div className="eyebrow">§ Featured Listings</div>
              <h2>
                Three plans. <em>Cancel anytime.</em>
              </h2>
            </div>
            <div className="right">All prices monthly · GST extra</div>
          </div>

          <div className="pricing-grid">
            {/* Verified */}
            <div className="tier">
              <div className="tier-name">Verified</div>
              <div className="tier-sub">For businesses already listed by us</div>
              <div className="tier-price">
                ₹0<span className="small">/ free forever</span>
              </div>
              <ul className="tier-features">
                <li className="tier-feature">Claim your free listing</li>
                <li className="tier-feature">Add hours, photos, contact</li>
                <li className="tier-feature">Respond to reviews</li>
                <li className="tier-feature dim">No featured placement</li>
                <li className="tier-feature dim">No leads forwarded</li>
              </ul>
              <Link href="#claim" className="btn btn-ghost btn-arrow">
                Claim listing
              </Link>
            </div>

            {/* Featured — popular */}
            <div className="tier popular">
              <span className="tier-tag">Most popular</span>
              <div className="tier-name">Featured</div>
              <div className="tier-sub">Top-3 placement on your category</div>
              <div className="tier-price">
                ₹3,499<span className="small">/ month</span>
              </div>
              <ul className="tier-features">
                <li className="tier-feature">Top-3 &ldquo;Featured&rdquo; badge on category</li>
                <li className="tier-feature">Priority on search results</li>
                <li className="tier-feature">3 in-article placements/month</li>
                <li className="tier-feature">Click-to-call &amp; WhatsApp button</li>
                <li className="tier-feature">Monthly performance report</li>
              </ul>
              <Link href="#claim" className="btn btn-accent btn-arrow">
                Get Featured
              </Link>
            </div>

            {/* Lead Engine */}
            <div className="tier">
              <div className="tier-name">Lead Engine</div>
              <div className="tier-sub">For agencies, designers, consultants</div>
              <div className="tier-price">
                ₹4,999<span className="small">+ ₹/lead</span>
              </div>
              <ul className="tier-features">
                <li className="tier-feature">Everything in Featured</li>
                <li className="tier-feature">Exclusive lead-gen forms</li>
                <li className="tier-feature">Verified leads, your inbox</li>
                <li className="tier-feature">Pay-per-lead pricing</li>
                <li className="tier-feature">Replace any lead within 48h</li>
              </ul>
              <Link href="#leads" className="btn btn-primary btn-arrow">
                Buy leads
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEAD GEN ── */}
      <section className="leadgen-block" id="leads">
        <div className="container-wide">
          <div className="section-head" style={{ paddingTop: 0 }}>
            <div className="left">
              <div className="eyebrow">§ Lead Generation</div>
              <h2>
                Pay only when a real <em>customer</em> reaches you.
              </h2>
            </div>
          </div>

          <div className="leadgen-grid">
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontSize: '19px',
                  lineHeight: 1.55,
                  color: 'var(--ink-2)',
                  marginBottom: '24px',
                  textWrap: 'pretty',
                }}
              >
                When someone fills our &ldquo;Get 3 quotes&rdquo; form for your category — and we
                verify them by phone — we send the lead to you and two other vetted businesses. You
                only pay when we forward a verified lead. No traffic, no fees.
              </p>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <span className="tag tag-filled">Verified by phone</span>
                <span className="tag tag-accent">Exclusive (3 max)</span>
                <span className="tag">48h replacement</span>
              </div>

              <table className="lead-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th style={{ textAlign: 'right' }}>Price per lead</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Digital marketing agency</td>
                    <td className="price">₹1,500</td>
                  </tr>
                  <tr>
                    <td>Web developer / SEO</td>
                    <td className="price">₹1,200</td>
                  </tr>
                  <tr>
                    <td>Interior designer</td>
                    <td className="price">₹2,000</td>
                  </tr>
                  <tr>
                    <td>Architect</td>
                    <td className="price">₹2,500</td>
                  </tr>
                  <tr>
                    <td>Tax consultant / CA</td>
                    <td className="price">₹800</td>
                  </tr>
                  <tr>
                    <td>Wedding photographer</td>
                    <td className="price">₹1,000</td>
                  </tr>
                  <tr>
                    <td>Personal trainer</td>
                    <td className="price">₹500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <AdvertiseForm />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="testimonial-strip">
        <div className="container-wide">
          <div className="eyebrow" style={{ marginBottom: '24px' }}>
            § What partners say
          </div>
          <blockquote>
            We made back our first three months of Featured fees in{' '}
            <span
              className="accent"
              style={{
                fontStyle: 'normal',
                fontFamily: 'var(--font-bricolage)',
                fontWeight: 700,
              }}
            >
              11 days
            </span>
            . The leads are real, they&apos;re local, and they&apos;re already half-sold by the
            time they call us.&rdquo;
          </blockquote>
          <footer>
            — Aditi Mehta, Founder · <strong>Studio Pol</strong> (Interior Designers, Bodakdev)
          </footer>
        </div>
      </section>

      {/* ── CLAIM ── */}
      <section className="claim-section" id="claim">
        <div className="container-wide">
          <div className="section-head" style={{ paddingTop: 0 }}>
            <div className="left">
              <div className="eyebrow">§ Claim Your Listing</div>
              <h2>
                Already on the site? <em>Claim it free.</em>
              </h2>
            </div>
          </div>

          <div className="claim-grid">
            <div className="steps">
              <div className="step">
                <div className="num">01</div>
                <div>
                  <h4>Find your business</h4>
                  <p>
                    Search for your business name. If we&apos;ve listed you, you&apos;ll see a
                    &ldquo;Claim this listing&rdquo; button on your page.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="num">02</div>
                <div>
                  <h4>Verify it&apos;s yours</h4>
                  <p>
                    We&apos;ll call the listed phone number, or ask for a GST/email verification.
                    Takes about 5 minutes.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="num">03</div>
                <div>
                  <h4>Manage your listing</h4>
                  <p>
                    Update hours, upload photos, respond to reviews, and see how many people clicked
                    through to call you.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="num">04</div>
                <div>
                  <h4>Upgrade if you want</h4>
                  <p>
                    Featured placement, lead-gen — entirely up to you. The basic listing stays
                    free.
                  </p>
                </div>
              </div>
            </div>

            <ClaimForm />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="container-wide">
          <div className="section-head" style={{ paddingTop: 0 }}>
            <div className="left">
              <div className="eyebrow">§ FAQ</div>
              <h2>
                Things you&apos;ll <em>want to know.</em>
              </h2>
            </div>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I pay to be #1 on a category?</h4>
              <p>
                No. Rankings are editorial and we won&apos;t sell them. Featured slots get a clear
                badge and surface higher within the page, but our top-3 ranking is decided by us, in
                person.
              </p>
            </div>
            <div className="faq-item">
              <h4>What happens if my listing gets bad reviews?</h4>
              <p>
                We re-evaluate Featured listings every 6 months. If quality drops below our bar, we
                keep your money for the period paid but won&apos;t renew. We&apos;d rather lose a
                customer than lose reader trust.
              </p>
            </div>
            <div className="faq-item">
              <h4>How are leads &ldquo;verified&rdquo;?</h4>
              <p>
                Every lead form requires a phone OTP and we call within 30 minutes to confirm intent
                and budget. Junk leads or duplicates are replaced free within 48 hours.
              </p>
            </div>
            <div className="faq-item">
              <h4>Is there an exclusivity?</h4>
              <p>
                Lead-gen is exclusive to 3 partners per category. Featured listings have no cap, but
                we limit Featured slots to 5 per category page so they stay meaningful.
              </p>
            </div>
            <div className="faq-item">
              <h4>What if I&apos;m a brand-new business not yet listed?</h4>
              <p>
                Send us your details on the form above. If you fit our category and meet our quality
                bar after a visit, we&apos;ll add you. We don&apos;t list every business — that&apos;s
                the whole point.
              </p>
            </div>
            <div className="faq-item">
              <h4>What&apos;s the contract length?</h4>
              <p>
                Monthly. Cancel any time before your renewal date. We don&apos;t lock anyone in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '96px 0' }}>
        <div className="container-wide" style={{ textAlign: 'center' }}>
          <div
            className="eyebrow"
            style={{ color: 'rgba(245,240,230,0.6)', marginBottom: '24px' }}
          >
            § Ready?
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-bricolage)',
              fontWeight: 800,
              fontSize: 'clamp(48px, 6vw, 88px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              maxWidth: '1100px',
              margin: '0 auto 32px',
              textWrap: 'balance',
            }}
          >
            The next 100 readers searching{' '}
            <em
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--accent)',
              }}
            >
              &ldquo;best ___ in Ahmedabad&rdquo;
            </em>{' '}
            could be reading about you.
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '40px',
              flexWrap: 'wrap',
            }}
          >
            <Link href="#rates" className="btn btn-accent btn-arrow">
              See Featured plans
            </Link>
            <Link
              href="#leads"
              className="btn btn-ghost btn-arrow"
              style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}
            >
              Buy leads
            </Link>
            <a
              href="mailto:hello@ahmedabad.blog"
              className="btn btn-ghost btn-arrow"
              style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}
            >
              Talk to us
            </a>
          </div>
          <p
            style={{
              marginTop: '32px',
              fontFamily: 'var(--font-newsreader)',
              fontStyle: 'italic',
              fontSize: '16px',
              opacity: 0.7,
            }}
          >
            No commitment. Cancel any time. We answer email in under 4 hours.
          </p>
        </div>
      </section>
    </main>
  )
}
