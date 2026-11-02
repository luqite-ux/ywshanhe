import { getSupabaseClient, tenantId } from './supabase'
import { products as fallback, type CatalogImage, type Product, type ProductSpec } from './data/catalog'

type Row = {
  slug: string
  name: string
  name_i18n?: Record<string, string>
  description?: string
  description_i18n?: Record<string, string>
  image_url?: string
  category_slug: string
  features?: string[]
  features_i18n?: Record<string, string[]>
  specs?: Record<string, string>
  extra_data?: { images?: string[]; gallery?: string[]; source_price_usd?: string }
}

const specLabels: Record<string, string> = { color: 'Colors', colors: 'Colors', '颜色': 'Colors', size: 'Size', '尺寸': 'Size', weight: 'Weight', '重量': 'Weight' }
const mapSpecs = (specs: Row['specs']): ProductSpec[] => Object.entries(specs ?? {}).map(([label, value]) => ({ label: specLabels[label.toLowerCase()] ?? label, value: String(value) }))
const mapGallery = (row: Row, name: string): CatalogImage[] => {
  const sources = [row.image_url, ...(row.extra_data?.gallery ?? row.extra_data?.images ?? [])].filter((src): src is string => Boolean(src))
  return [...new Set(sources)].map((src, index) => ({ src, alt: `${name} view ${index + 1}` }))
}
const map = (row: Row): Product => {
  const name = row.name_i18n?.en || row.name
  const gallery = mapGallery(row, name)
  return { slug: row.slug, name, categorySlug: row.category_slug as Product['categorySlug'], image: gallery[0] ?? { src: '/placeholder.svg', alt: `${name} product image` }, gallery, summary: row.description_i18n?.en || row.description || '', highlights: row.features_i18n?.en || row.features || [], specifications: mapSpecs(row.specs), referencePriceUsd: row.extra_data?.source_price_usd }
}

export async function fetchProductsData() {
  const db = getSupabaseClient(), id = tenantId()
  if (!db || !id) return fallback
  const { data, error } = await db.from('products').select('slug,name,name_i18n,description,description_i18n,image_url,category_slug,features,features_i18n,specs,extra_data').eq('tenant_id', id).eq('is_active', true).order('sort_order')
  return error || !data?.length ? fallback : (data as Row[]).map(map)
}
export async function fetchProductBySlug(slug: string) { return (await fetchProductsData()).find((product) => product.slug === slug) }
