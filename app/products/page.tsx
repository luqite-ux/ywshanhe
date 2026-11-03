import Link from 'next/link'
import { PageIntro } from '@/components/site/page-intro'
import { ProductCard } from '@/components/products/product-card'
import { categories, isCategorySlug } from '@/lib/data/catalog'
import { fetchProductsData } from '@/lib/products-db'

export const revalidate = 60

type ProductsPageProps = { searchParams: Promise<{ category?: string }> }

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: requestedCategory } = await searchParams
  const activeCategory = isCategorySlug(requestedCategory) ? requestedCategory : undefined
  const products = await fetchProductsData()
  const visibleCategories = activeCategory
    ? categories.filter((category) => category.slug === activeCategory)
    : categories

  return <>
    <PageIntro
      title="Products by Category"
      description="Browse the eight supplied products across four customer-defined product families."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
    />
    <section className="container-site py-14 lg:py-16">
      <nav aria-label="Product categories" className="flex flex-wrap gap-2 border-b border-line pb-7">
        <Link
          href="/products"
          aria-current={!activeCategory ? 'page' : undefined}
          className={`inline-flex min-h-11 items-center rounded-md border px-5 text-sm font-semibold transition-colors ${!activeCategory ? 'border-evergreen bg-evergreen text-white' : 'border-line bg-white text-ink hover:border-evergreen hover:text-evergreen'}`}
        >
          All Products <span className="ml-2 text-xs opacity-75">{products.length}</span>
        </Link>
        {categories.map((category) => {
          const count = products.filter((product) => product.categorySlug === category.slug).length
          const selected = activeCategory === category.slug
          return <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            aria-current={selected ? 'page' : undefined}
            className={`inline-flex min-h-11 items-center rounded-md border px-5 text-sm font-semibold transition-colors ${selected ? 'border-evergreen bg-evergreen text-white' : 'border-line bg-white text-ink hover:border-evergreen hover:text-evergreen'}`}
          >
            {category.name} <span className="ml-2 text-xs opacity-75">{count}</span>
          </Link>
        })}
      </nav>

      <div className="divide-y divide-line">
        {visibleCategories.map((category) => {
          const categoryProducts = products.filter((product) => product.categorySlug === category.slug)
          return <section key={category.slug} id={category.slug} className="scroll-mt-28 py-12 first:pt-10">
            <div className="mb-7 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div>
                <h2 className="font-display text-3xl font-medium tracking-[-0.025em] text-ink sm:text-4xl">{category.name}</h2>
                <p className="mt-2 max-w-[65ch] leading-7 text-ink-soft">{category.summary}</p>
              </div>
              <p className="text-sm font-medium text-evergreen">{categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          </section>
        })}
      </div>
    </section>
  </>
}
