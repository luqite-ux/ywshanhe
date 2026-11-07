import Link from 'next/link'
import { Logo } from '@/components/site/logo'
import { categories, categoryHref } from '@/lib/data/catalog'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'
import { siteConfig } from '@/lib/site'

const linkClass =
  'inline-flex min-h-8 items-center text-[0.95rem] text-ink-soft transition-colors duration-200 hover:text-evergreen hover:underline underline-offset-4'

export function Footer({ dict }: { dict: Dictionary }) {
  const companyLinks = [
    { href: '/', label: dict.nav.home },
    { href: '/capabilities', label: dict.nav.capabilities },
    { href: '/about', label: dict.nav.about },
    { href: '/news', label: dict.nav.news },
    { href: '/contact', label: dict.nav.contact },
  ]

  return (
    <footer className="border-t border-line bg-stage">
      <div className="container-site grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Logo label={dict.header.homeLabel} height={78} source="workbook" />
          <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-ink-soft">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.footer.families}>
          <h2 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">{dict.footer.families}</h2>
          <ul className="mt-4 flex flex-col">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={categoryHref(category.slug)} className={linkClass}>
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className={linkClass}>
                {dict.nav.products}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label={dict.footer.company}>
          <h2 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">{dict.footer.company}</h2>
          <ul className="mt-4 flex flex-col">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">{dict.footer.contact}</h2>
          <address className="mt-4 flex flex-col gap-1 text-[0.95rem] leading-relaxed text-ink-soft not-italic">
            <a href={`mailto:${siteConfig.email}`} className={linkClass}>
              {siteConfig.email}
            </a>
            <a href={siteConfig.phoneHref} className={linkClass}>
              {siteConfig.phone}
            </a>
            <p className="mt-2">
              {siteConfig.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-site py-5 text-sm text-ink-soft">
          © {new Date().getFullYear()} {siteConfig.name} {dict.footer.rights}
        </p>
      </div>
    </footer>
  )
}
