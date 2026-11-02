'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Flips to true once, the first time the element genuinely enters the viewport.
 * Reduced motion or a missing IntersectionObserver resolve immediately so content is never stuck.
 */
export function useOnceInView<T extends Element>(rootMargin = '0px 0px -15% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0.2 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
