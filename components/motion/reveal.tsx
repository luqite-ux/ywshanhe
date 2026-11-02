'use client'

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

type RevealState = 'idle' | 'hidden' | 'revealed'

interface RevealProps {
  as?: ElementType
  className?: string
  /** Stagger in ms, capped at 240 */
  delay?: number
  variant?: 'rise' | 'mask'
  children: ReactNode
}

/**
 * Content is rendered visible on the server. After hydration, blocks that are still below the fold
 * are hidden and revealed once, when IntersectionObserver reports real viewport entry. No timers.
 */
export function Reveal({ as: Tag = 'div', className, delay = 0, variant = 'rise', children }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<RevealState>('idle')

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setState('revealed')
      return
    }

    const rect = element.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0
    const alreadyPassed = rect.bottom <= 0
    if (alreadyVisible || alreadyPassed) {
      setState('revealed')
      return
    }

    setState('hidden')
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState('revealed')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const style = { '--reveal-delay': `${Math.min(Math.max(delay, 0), 240)}ms` } as CSSProperties

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      data-reveal={state === 'idle' ? undefined : state}
      data-reveal-variant={variant}
    >
      {children}
    </Tag>
  )
}
