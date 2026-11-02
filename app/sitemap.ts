import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { fetchProductsData } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'
export const revalidate=60
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const now=new Date();const [products,articles]=await Promise.all([fetchProductsData(),getPublishedArticles()]);const paths=['','/products','/capabilities','/about','/faq','/news','/contact'];return[...paths.map(p=>({url:`${siteConfig.url}${p}`,lastModified:now,changeFrequency:'weekly' as const,priority:p===''?1:.7})),...products.map(p=>({url:`${siteConfig.url}/products/${p.slug}`,lastModified:now,changeFrequency:'weekly' as const,priority:.8})),...articles.map(a=>({url:`${siteConfig.url}/news/${a.slug}`,lastModified:a.publishedAt?new Date(a.publishedAt):now,changeFrequency:'monthly' as const,priority:.6}))]}
