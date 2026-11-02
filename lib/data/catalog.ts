/**
 * Representative catalogue used for the launch design.
 * Replace the exports with database-backed queries; the shapes below are the contract the UI reads.
 */
export type CategorySlug = 'fireproof-bags' | 'cosmetic-bags' | 'cooler-bags' | 'storage-bags'

export interface CatalogImage {
  src: string
  alt: string
}

export interface Category {
  slug: CategorySlug
  name: string
  summary: string
  image: CatalogImage
}

export interface Product {
  slug: string
  name: string
  categorySlug: CategorySlug
  image: CatalogImage
  summary: string
  highlights: string[]
  featured?: boolean
}

export const categories: Category[] = [
  {
    slug: 'fireproof-bags',
    name: 'Fireproof Bags',
    summary: 'Document bags, pouches and briefcase formats with locks and zip closures.',
    image: {
      src: '/images/products/lock-document-bags.jpg',
      alt: 'Light grey and graphite document bags with side combination locks',
    },
  },
  {
    slug: 'cosmetic-bags',
    name: 'Cosmetic Bags',
    summary: 'Quilted, drawstring and zip pouches for cosmetics and travel use.',
    image: {
      src: '/images/products/pink-drawstring-tote.jpg',
      alt: 'Pink drawstring cosmetic tote with twin handles and outer pockets',
    },
  },
  {
    slug: 'cooler-bags',
    name: 'Cooler Bags',
    summary: 'Soft-sided carry bags for food and drink, made to your size and lining.',
    image: {
      src: '/images/products/blue-carry-cooler-bag.jpg',
      alt: 'Light blue twin-handle carry bag with quilted front pocket',
    },
  },
  {
    slug: 'storage-bags',
    name: 'Storage Bags',
    summary: 'Organizers for documents, passports, cables and digital accessories.',
    image: {
      src: '/images/products/multi-layer-document-organizer.jpg',
      alt: 'Open multi-layer document organizer with passport slots and combination lock',
    },
  },
]

export const products: Product[] = [
  {
    slug: 'combination-lock-document-bag',
    name: 'Combination-Lock Document Bag',
    categorySlug: 'fireproof-bags',
    image: {
      src: '/images/products/lock-document-bags.jpg',
      alt: 'Two document bags in light grey and graphite with side combination locks and top handles',
    },
    summary:
      'A rectangular document bag with a top carry handle, perimeter zip and a side combination lock, shown in two colourways.',
    highlights: ['Top carry handle', 'Perimeter zip closure', 'Side combination lock', 'Shown in light grey and graphite'],
    featured: true,
  },
  {
    slug: 'zip-document-briefcase',
    name: 'Zip Document Briefcase',
    categorySlug: 'fireproof-bags',
    image: {
      src: '/images/products/zip-document-briefcase.jpg',
      alt: 'Black slim document briefcase with twin handles and a front zip pocket',
    },
    summary:
      'A slim black briefcase format with twin carry handles, a full perimeter zip and a front zip pocket.',
    highlights: ['Twin carry handles', 'Full perimeter zip', 'Front zip pocket', 'Slim, flat profile'],
    featured: true,
  },
  {
    slug: 'envelope-document-pouch',
    name: 'Envelope Document Pouch',
    categorySlug: 'fireproof-bags',
    image: {
      src: '/images/products/envelope-document-pouch.jpg',
      alt: 'Light grey envelope-style document pouch with black webbing binding and a rounded flap',
    },
    summary:
      'A flat envelope pouch with a rounded flap and contrast black webbing binding around the edges.',
    highlights: ['Rounded closing flap', 'Contrast webbing binding', 'Flat envelope profile'],
  },
  {
    slug: 'drawstring-cosmetic-tote',
    name: 'Drawstring Cosmetic Tote',
    categorySlug: 'cosmetic-bags',
    image: {
      src: '/images/products/pink-drawstring-tote.jpg',
      alt: 'Pink drawstring tote with two shoulder handles, snap pocket and side pockets',
    },
    summary:
      'A soft tote that gathers at the top with a drawstring, with twin handles, a snap-closure front pocket and side pockets.',
    highlights: ['Drawstring gathered opening', 'Twin shoulder handles', 'Snap-closure front pocket', 'Side pockets'],
    featured: true,
  },
  {
    slug: 'quilted-travel-storage-bag',
    name: 'Quilted Travel Storage Bag',
    categorySlug: 'cosmetic-bags',
    image: {
      src: '/images/products/lavender-quilted-travel-bag.jpg',
      alt: 'Lavender quilted travel storage bag with a top handle and woven brand label',
    },
    summary:
      'A horizontally quilted lavender bag with a padded top handle, a long side zip and a sewn-on brand label position.',
    highlights: ['Horizontal quilting', 'Padded top handle', 'Long side zip', 'Sewn-on label position'],
    featured: true,
  },
  {
    slug: 'twin-handle-carry-bag',
    name: 'Twin-Handle Carry Bag',
    categorySlug: 'cooler-bags',
    image: {
      src: '/images/products/blue-carry-cooler-bag.jpg',
      alt: 'Light blue carry bag with two webbing handles, quilted front pocket and zip compartments',
    },
    summary:
      'A compact soft-sided carry bag with two webbing handles, a quilted front zip pocket and a side zip pocket.',
    highlights: ['Two webbing handles', 'Quilted front zip pocket', 'Side zip pocket', 'Tone-on-tone zips'],
    featured: true,
  },
  {
    slug: 'multi-layer-document-organizer',
    name: 'Multi-Layer Document Organizer',
    categorySlug: 'storage-bags',
    image: {
      src: '/images/products/multi-layer-document-organizer.jpg',
      alt: 'Open grey document organizer showing passport slots, layered folders and a combination lock',
    },
    summary:
      'A zip-around organizer with passport slots in the lid, layered document folders and a combination lock on the body.',
    highlights: ['Passport slots in the lid', 'Layered document folders', 'Combination lock', 'Zip-around opening'],
  },
  {
    slug: 'digital-accessory-organizer',
    name: 'Digital Accessory Organizer',
    categorySlug: 'storage-bags',
    image: {
      src: '/images/products/digital-accessory-organizer.jpg',
      alt: 'Grey double-layer organizer bag with a printed icon label for cables, charger and tablet',
    },
    summary:
      'A grey double-layer zip organizer with a top handle and a printed icon label for cables, charger and tablet.',
    highlights: ['Double-layer zip body', 'Top carry handle', 'Printed icon label', 'Soft-edged profile'],
    featured: true,
  },
]

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function isCategorySlug(value: string | undefined): value is CategorySlug {
  return categories.some((category) => category.slug === value)
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getProductsByCategory(slug?: CategorySlug) {
  return slug ? products.filter((product) => product.categorySlug === slug) : products
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured)
}

export function getRelatedProducts(product: Product, limit = 3) {
  const sameFamily = products.filter(
    (candidate) => candidate.categorySlug === product.categorySlug && candidate.slug !== product.slug,
  )
  const others = products.filter(
    (candidate) => candidate.categorySlug !== product.categorySlug && candidate.slug !== product.slug,
  )
  return [...sameFamily, ...others].slice(0, limit)
}

export function categoryHref(slug: CategorySlug) {
  return `/products?category=${slug}`
}
