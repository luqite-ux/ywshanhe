'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/motion/reveal'
import type { FactoryPhoto } from '@/lib/data/factory'

const dimensions: Record<string, [number, number]> = {
  'sewing-station': [2859, 2291],
  'material-storage': [2964, 2210],
  'packed-cartons': [2971, 2205],
  'sample-hall': [1690, 1439],
  'company-wall': [4032, 3024],
  'factory-exterior': [1768, 1376],
  'production-floor-panorama': [3414, 1919],
  'production-and-warehouse-overview': [3157, 2075],
  'sewing-floor': [4032, 3024],
  'company-corridor': [2971, 2205],
  'workbook-office': [1702, 1276],
}

export function FactoryGallery({ photos }: { photos: FactoryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const activePhoto = activeIndex === null ? null : photos[activeIndex]

  const close = () => {
    const closingIndex = activeIndex
    setActiveIndex(null)
    requestAnimationFrame(() => {
      if (closingIndex !== null) triggerRefs.current[closingIndex]?.focus()
    })
  }

  useEffect(() => {
    if (activeIndex === null) return
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? null : (index - 1 + photos.length) % photos.length)
      if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? null : (index + 1) % photos.length)
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLButtonElement>('button:not([disabled])'))
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [activeIndex, photos.length])

  return (
    <>
      <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {photos.map((photo, index) => {
          const [width, height] = dimensions[photo.id] ?? [1600, 1200]
          return (
            <Reveal key={photo.id} className="mb-5 break-inside-avoid" delay={(index % 3) * 80}>
              <button
                ref={(element) => { triggerRefs.current[index] = element }}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-stage text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evergreen"
                aria-label={`Enlarge ${photo.caption}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={width}
                  height={height}
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="pointer-events-none absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                  <Expand className="size-4" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          )
        })}
      </div>

      {activePhoto && activeIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${activePhoto.caption}, image ${activeIndex + 1} of ${photos.length}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}
        >
          <button ref={closeRef} type="button" onClick={close} className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white text-ink shadow-lg" aria-label="Close image viewer">
            <X className="size-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setActiveIndex((activeIndex - 1 + photos.length) % photos.length)} className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg sm:left-6" aria-label="Previous image">
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <div className="flex max-h-full max-w-[calc(100vw-2rem)] flex-col items-center gap-3 sm:max-w-[calc(100vw-8rem)]">
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              width={dimensions[activePhoto.id]?.[0] ?? 1600}
              height={dimensions[activePhoto.id]?.[1] ?? 1200}
              sizes="100vw"
              priority
              className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain"
            />
            <p className="text-sm font-medium text-white">{activeIndex + 1} / {photos.length}</p>
          </div>
          <button type="button" onClick={() => setActiveIndex((activeIndex + 1) % photos.length)} className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg sm:right-6" aria-label="Next image">
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  )
}
