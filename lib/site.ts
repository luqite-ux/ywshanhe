export const siteConfig = {
  name: 'Yiwu Shanhe Luggage Co., Ltd.',
  shortName: 'Shanhe',
  legalNameZh: '义乌市杉和箱包有限公司',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ywshanhe.com').replace(/\/$/, ''),
  email: 'info@ywshanhe.com',
  phone: '+86 199 5796 8350',
  phoneHref: 'tel:+8619957968350',
  founded: 2017,
  address: {
    lines: [
      'Building 4, Floor 1, Shangjing Industrial Zone',
      'Inside Yiwu Yunxing Color Printing Packaging Co., Ltd.',
      'Xialuozhai, Futian Subdistrict',
      'Yiwu, Jinhua, Zhejiang, China',
    ],
    locality: 'Yiwu',
    region: 'Zhejiang',
    country: 'CN',
  },
  defaultOgImage: '/images/hero/hero-02-bag-range.jpg',
} as const

export const routes = {
  home: '/',
  products: '/products',
  capabilities: '/capabilities',
  about: '/about',
  news: '/news',
  contact: '/contact',
} as const

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}
