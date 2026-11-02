export interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  image?: { src: string; alt: string }
  body: string[]
}

/** Intentionally empty: only real, published articles may appear. Connect to the CMS or database here. */
const articles: NewsArticle[] = []

export function getNewsArticles(): NewsArticle[] {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return articles.find((article) => article.slug === slug)
}
