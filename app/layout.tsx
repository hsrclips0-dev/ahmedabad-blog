import type { Metadata } from 'next'
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono, Hind_Vadodara } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const hindVadodara = Hind_Vadodara({
  subsets: ['latin', 'gujarati'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-gujarati',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ahmedabad.blog'),
  title: {
    default: 'ahmedabad.blog — A curated guide to the city',
    template: '%s | ahmedabad.blog',
  },
  description:
    'A curated guide to the best cafés, restaurants, gyms, coworking spaces, agencies, and more in Ahmedabad. Ranked honestly, updated weekly.',
  keywords: [
    'Ahmedabad',
    'best places Ahmedabad',
    'restaurants Ahmedabad',
    'cafes Ahmedabad',
    'local guide Ahmedabad',
    'things to do Ahmedabad',
  ],
  authors: [{ name: 'ahmedabad.blog' }],
  creator: 'ahmedabad.blog',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ahmedabad.blog',
    siteName: 'ahmedabad.blog',
    title: 'ahmedabad.blog — A curated guide to the city',
    description: 'The best of Ahmedabad, ranked honestly.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ahmedabad.blog',
    description: 'A curated guide to the best places in Ahmedabad.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="warm"
      className={`${bricolage.variable} ${newsreader.variable} ${jetbrainsMono.variable} ${hindVadodara.variable}`}
    >
      <head>
        {/* Prevents flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('ahm-theme')||'warm';document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
