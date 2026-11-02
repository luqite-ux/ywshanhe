import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProductStage } from '@/components/site/product-stage'
import { getCategory, type Product } from '@/lib/data/catalog'

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const category = getCategory(product.categorySlug)
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group/card flex h-full flex-col border border-line bg-paper transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-evergreen"
    >
      <ProductStage image={product.image} priority={priority} />
      <div className="flex flex-1 items-start justify-between gap-3 border-t border-line p-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-evergreen uppercase">{category?.name}</p>
          <h3 className="mt-1.5 font-sans text-base leading-snug font-semibold text-ink">{product.name}</h3>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="mt-1 size-5 shrink-0 text-ink-soft transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-evergreen"
        />
      </div>
    </Link>
  )
}
