'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { CtaLink } from '@/components/site/cta-link'
import { cn } from '@/lib/utils'

export interface HeaderLabels {
  homeLabel: string
  openMenu: string
  closeMenu: string
  primaryNav: string
  requestQuote: string
}

interface HeaderProps {
  items: { href: string; label: string }[]
  labels: HeaderLabels
}

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function Header({ items, labels }: HeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
        <Logo label={labels.homeLabel} height={50} />

        <nav aria-label={labels.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-11 items-center px-3.5 text-[0.95rem] font-medium transition-colors duration-200',
                      'after:absolute after:inset-x-3.5 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-evergreen after:transition-transform after:duration-200',
                      active ? 'text-evergreen after:scale-x-100' : 'text-ink hover:text-evergreen hover:after:scale-x-100',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink href="/contact" size="sm" className="hidden sm:inline-flex">
            {labels.requestQuote}
          </CtaLink>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-md text-ink transition-colors duration-200 hover:bg-stage active:scale-95 lg:hidden"
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={labels.primaryNav}
        hidden={!open}
        className="border-t border-line bg-paper lg:hidden"
      >
        <ul className="container-site flex flex-col py-2">
          {items.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex min-h-12 items-center py-3 text-lg font-medium',
                    active ? 'text-evergreen' : 'text-ink',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
          <li className="py-4">
            <CtaLink href="/contact" className="w-full">
              {labels.requestQuote}
            </CtaLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
