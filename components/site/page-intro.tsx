import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { StitchMark } from '@/components/site/section-heading'
import { Reveal } from '@/components/motion/reveal'

interface PageIntroProps {
  title: string
  description?: string
  eyebrow?: string
  crumbs?: { label: string; href?: string }[]
}

export function PageIntro({ title, description, eyebrow, crumbs }: PageIntroProps) {
  return (
    <section className="border-b border-line bg-stage">
      <div className="container-site py-12 sm:py-16 lg:py-20">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-soft">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {index > 0 ? <ChevronRight aria-hidden="true" className="size-3.5" /> : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="inline-flex min-h-8 items-center hover:text-evergreen hover:underline underline-offset-4">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <Reveal className="max-w-3xl">
          {eyebrow ? (
            <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-evergreen">
              <span className="uppercase">{eyebrow}</span>
              <StitchMark className="text-seam" />
            </p>
          ) : null}
          <h1 className="mt-3 text-balance text-4xl leading-[1.08] font-medium sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{description}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}
