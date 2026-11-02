import type { Metadata } from 'next'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { defaultLocale, localizedPath, type Locale } from '@/lib/i18n/config'

interface PageMetaInput {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  locale?: Locale
}

export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.defaultOgImage,
  type = 'website',
  noIndex = false,
  locale = defaultLocale,
}: PageMetaInput): Metadata {
  const localized = localizedPath(locale, path)
  return {
    title,
    description,
    alternates: {
      canonical: localized,
      languages: { en: localizedPath('en', path), 'x-default': localizedPath('en', path) },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localized),
      siteName: siteConfig.name,
      type,
      locale: 'en_US',
      images: [{ url: absoluteUrl(image), alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}

export type JsonLdNode = Record<string, unknown>

export function organizationJsonLd(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.legalNameZh,
    url: siteConfig.url,
    logo: absoluteUrl('/images/brand/shanhe-logo.jpg'),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: String(siteConfig.founded),
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.email,
      telephone: siteConfig.phone,
      availableLanguage: ['English', 'Chinese'],
    },
  }
}

export function websiteJsonLd(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'en',
    publisher: { '@id': `${siteConfig.url}/#organization` },
  }
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function collectionJsonLd(input: { name: string; description: string; path: string }): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { '@id': `${siteConfig.url}/#website` },
  }
}

export function productJsonLd(input: {
  name: string
  description: string
  path: string
  image: string
  category: string
}): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteUrl(input.image),
    category: input.category,
    brand: { '@type': 'Brand', name: siteConfig.name },
    manufacturer: { '@id': `${siteConfig.url}/#organization` },
  }
}

export function articleJsonLd(input: {
  headline: string
  description: string
  path: string
  publishedAt: string
  updatedAt?: string
  image?: string
}): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    image: input.image ? absoluteUrl(input.image) : undefined,
    author: { '@id': `${siteConfig.url}/#organization` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
