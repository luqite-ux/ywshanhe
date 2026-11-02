import { PageIntro } from '@/components/site/page-intro'
import { ProductCard } from '@/components/products/product-card'
import { fetchProductsData } from '@/lib/products-db'
export const revalidate=60
export default async function ProductsPage(){const products=await fetchProductsData();return <><PageIntro eyebrow="Catalog" title="Products" description="Eight supplied bag formats across four buyer-focused product families." crumbs={[{label:'Home',href:'/'},{label:'Products'}]}/><section className="container-site py-16"><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.map(p=><ProductCard key={p.slug} product={p}/>)}</div></section></>}
