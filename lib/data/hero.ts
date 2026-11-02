export interface HeroSlide {
  id: string
  title: string
  body: string
  cta: { label: string; href: string }
  image: { src: string; alt: string }
  /** Colour of the banner area behind the copy at desktop width */
  tone: 'dark' | 'light'
  /** Keeps the bags in frame on narrow screens */
  mobilePosition: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'real-use',
    title: 'Functional Bags Built Around Real Use',
    body: 'Fireproof, cosmetic, cooler and storage bags developed and produced in Yiwu for B2B buyers.',
    cta: { label: 'Browse Products', href: '/products' },
    image: {
      src: '/images/hero/hero-01-document-cases.jpg',
      alt: 'Navy document cases open to show orange folders and compartments beside a navy briefcase on metallic platforms',
    },
    tone: 'dark',
    mobilePosition: '88% center',
  },
  {
    id: 'made-to-fit',
    title: 'Shape, Material and Branding Made to Fit',
    body: 'OEM and ODM development around your size, structure, fabric, colour and branding. MOQ 1,000 pieces.',
    cta: { label: 'Request a Quote', href: '/contact' },
    image: {
      src: '/images/hero/hero-02-bag-range.jpg',
      alt: 'Range of grey, navy and green bags and sleeves arranged on white steps',
    },
    tone: 'light',
    mobilePosition: '94% center',
  },
  {
    id: 'sample-to-production',
    title: 'From Approved Sample to Controlled Production',
    body: 'Samples in 7 working days, normal production in 30–35 days, with third-party inspection supported.',
    cta: { label: 'View Capabilities', href: '/capabilities' },
    image: {
      src: '/images/hero/hero-03-workshop.jpg',
      alt: 'Workshop tables with fabric rolls, zip tapes, thread and finished bags beside industrial sewing machines',
    },
    tone: 'dark',
    mobilePosition: '84% center',
  },
]
