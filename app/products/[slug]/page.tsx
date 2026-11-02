import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Ruler, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PageIntro } from '@/components/site/page-intro'
import { fetchProductBySlug } from '@/lib/products-db'
import { siteConfig } from '@/lib/site'

export const revalidate = 60
export const dynamicParams = true

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) return {}
  const url = `${siteConfig.url}/products/${product.slug}`
  return { title: product.name, description: product.summary, alternates: { canonical: url }, openGraph: { title: product.name, description: product.summary, type: 'website', url, images: product.image.src.startsWith('http') ? [product.image.src] : [`${siteConfig.url}${product.image.src}`] } }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) notFound()
  const productUrl = `${siteConfig.url}/products/${product.slug}`
  const imageUrl = product.image.src.startsWith('http') ? product.image.src : `${siteConfig.url}${product.image.src}`
  const schema = { '@context': 'https://schema.org', '@type': 'Product', '@id': `${productUrl}#product`, name: product.name, description: product.summary, image: product.gallery.map((item) => item.src.startsWith('http') ? item.src : `${siteConfig.url}${item.src}`), url: productUrl, brand: { '@type': 'Brand', name: 'Yiwu Shanhe' } }

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <PageIntro title={product.name} description={product.summary} crumbs={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: product.name }]} />
    <section className="container-site grid gap-12 py-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:py-20">
      <div className="grid gap-4 sm:grid-cols-2">
        {product.gallery.map((item, index) => <figure key={item.src} className={index === 0 ? 'relative aspect-[4/3] overflow-hidden rounded-xl bg-white sm:col-span-2' : 'relative aspect-square overflow-hidden rounded-xl bg-white'}>
          <Image src={item.src} alt={item.alt} fill sizes={index === 0 ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 640px) 50vw, 100vw'} className="object-contain p-5 sm:p-7" priority={index === 0} />
        </figure>)}
      </div>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="font-display text-3xl font-medium tracking-[-0.025em] text-ink">Product details</h2>
        <p className="mt-4 max-w-[65ch] leading-7 text-ink-soft">{product.summary}</p>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {product.specifications.map((spec) => <div key={spec.label} className="grid grid-cols-[7rem_1fr] gap-4 py-4"><dt className="flex items-center gap-2 text-sm font-medium text-ink"><Ruler aria-hidden="true" className="size-4 text-evergreen" />{spec.label}</dt><dd className="text-sm leading-6 text-ink-soft">{spec.value}</dd></div>)}
          {product.referencePriceUsd ? <div className="grid grid-cols-[7rem_1fr] gap-4 py-4"><dt className="flex items-center gap-2 text-sm font-medium text-ink"><Tag aria-hidden="true" className="size-4 text-evergreen" />Reference</dt><dd className="text-sm leading-6 text-ink-soft">USD {product.referencePriceUsd}; final pricing depends on quantity, material and customization.</dd></div> : null}
        </dl>
        <h2 className="mt-10 font-display text-2xl font-medium text-ink">Construction and use</h2>
        <ul className="mt-5 grid gap-3">{product.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-3 text-[0.95rem] leading-6 text-ink-soft"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-evergreen" /><span>{highlight}</span></li>)}</ul>
        <div className="mt-10 rounded-xl bg-evergreen-deep p-7 text-white">
          <h2 className="font-display text-2xl font-medium">Build this around your brief</h2>
          <p className="mt-3 leading-7 text-white/80">Confirm material, dimensions, colour, artwork and packing requirements with our team. Standard MOQ: 1,000 pieces.</p>
          <Link href={`/contact?product=${product.slug}`} className="mt-6 inline-flex min-h-12 items-center rounded-md bg-white px-5 font-semibold text-evergreen-deep transition-colors hover:bg-paper">Request a Quote</Link>
        </div>
      </div>
    </section>
  </>
}
