import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { JsonLd } from '@/components/seo/json-ld'
import { defaultLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Yiwu Shanhe Luggage Co., Ltd. | Functional Bag Manufacturer in Yiwu',
    template: '%s | Yiwu Shanhe Luggage',
  },
  description:
    'Yiwu Shanhe Luggage develops and produces fireproof, cosmetic, cooler and storage bags. OEM and ODM supported, MOQ 1,000 pieces, samples in 7 working days.',
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#FAF8F3',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dict = getDictionary(defaultLocale)
  const navItems = [
    { href: '/', label: dict.nav.home },
    { href: '/products', label: dict.nav.products },
    { href: '/capabilities', label: dict.nav.capabilities },
    { href: '/about', label: dict.nav.about },
    { href: '/news', label: dict.nav.news },
    { href: '/contact', label: dict.nav.contact },
  ]

  return (
    <html lang={defaultLocale}>
      <body className="min-h-dvh font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-paper"
        >
          {dict.header.skip}
        </a>
        <Header
          items={navItems}
          labels={{
            homeLabel: dict.header.homeLabel,
            openMenu: dict.header.openMenu,
            closeMenu: dict.header.closeMenu,
            primaryNav: dict.header.primaryNav,
            requestQuote: dict.cta.requestQuote,
          }}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer dict={dict} />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
