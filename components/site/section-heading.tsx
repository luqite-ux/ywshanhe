import { cn } from '@/lib/utils'

export function StitchMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 72 10" className={cn('h-2.5 w-[4.5rem]', className)} fill="none">
      <path
        d="M1 6C14-1 26 11 38 5S62 0 71 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
    </svg>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  id?: string
  className?: string
  onDark?: boolean
  as?: 'h1' | 'h2'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  className,
  onDark = false,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow ? (
        <p className={cn('flex items-center gap-3 text-sm font-medium tracking-wide', onDark ? 'text-white/80' : 'text-evergreen')}>
          <span className="uppercase">{eyebrow}</span>
          <StitchMark className={onDark ? 'text-white/60' : 'text-seam'} />
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          'mt-3 text-balance text-[1.9rem] leading-[1.12] font-medium sm:text-4xl lg:text-[2.6rem]',
          onDark ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className={cn('mt-4 text-base leading-relaxed sm:text-lg', onDark ? 'text-white/80' : 'text-ink-soft')}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
