'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { heroSlides } from '@/lib/data/hero'

export function HomeHero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[76vh] overflow-hidden bg-evergreen-deep text-white" aria-label="Shanhe capabilities">
      {heroSlides.map((slide, index) => (
        <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${index === active ? 'opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden={index !== active}>
          <Image src={slide.image.src} alt={slide.image.alt} fill priority={index === 0} sizes="100vw" className="object-cover opacity-70" style={{ objectPosition: slide.mobilePosition }} />
        </div>
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,39,34,.94)_0%,rgba(10,39,34,.75)_46%,rgba(10,39,34,.12)_78%)]" />
      <div className="container-site relative flex min-h-[76vh] items-center py-20">
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className={`max-w-2xl transition-all duration-500 ${index === active ? 'relative translate-y-0 opacity-100' : 'pointer-events-none absolute translate-y-3 opacity-0'}`} aria-hidden={index !== active}>
            <p className="text-sm font-semibold uppercase tracking-[.22em] text-cyan-200">Functional Bag Manufacturer · Yiwu</p>
            <h1 className="mt-5 text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">{slide.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{slide.body}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={slide.cta.href} className="rounded-md bg-white px-6 py-3 font-semibold text-evergreen-deep">{slide.cta.label}</Link>
              <Link href="/contact" className="rounded-md border border-white/60 px-6 py-3 font-semibold text-white">Request a Quote</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="container-site absolute inset-x-0 bottom-7 z-10 flex gap-2" aria-label="Choose banner">
        {heroSlides.map((slide, index) => (
          <button key={slide.id} type="button" onClick={() => setActive(index)} aria-label={`Show banner ${index + 1}: ${slide.title}`} aria-current={index === active ? 'true' : undefined} className={`h-1.5 rounded-full transition-all ${index === active ? 'w-10 bg-white' : 'w-5 bg-white/45 hover:bg-white/75'}`} />
        ))}
      </div>
    </section>
  )
}
