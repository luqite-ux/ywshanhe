import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { buttonStyles, type ButtonStyleProps } from '@/lib/button-styles'

type CtaLinkProps = Omit<ComponentProps<typeof Link>, 'className'> &
  ButtonStyleProps & {
    className?: string
    arrow?: boolean
  }

export function CtaLink({ variant, size, className, arrow = true, children, ...props }: CtaLinkProps) {
  return (
    <Link className={cn(buttonStyles({ variant, size }), className)} {...props}>
      {children}
      {arrow ? (
        <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
      ) : null}
    </Link>
  )
}
