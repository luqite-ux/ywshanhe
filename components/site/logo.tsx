import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/** Visible bounds of the symbol + wordmark inside the 500 x 500 official logo file */
const CROP = { x: 135, y: 120, width: 180, height: 245, source: 500 }

interface LogoProps {
  label: string
  height?: number
  className?: string
  source?: 'standalone' | 'workbook'
}

export function Logo({ label, height = 52, className, source = 'standalone' }: LogoProps) {
  const scale = height / CROP.height
  const boxWidth = Math.round(CROP.width * scale)
  const imageSize = Math.round(CROP.source * scale)

  return (
    <Link
      href="/"
      aria-label={label}
      className={cn('group/logo inline-flex items-center gap-3 rounded-md', className)}
    >
      {source === 'workbook' ? <span className="relative block shrink-0" style={{ width: Math.round(height * 1.45), height }}>
        <Image src="/images/brand/shanhe-logo-workbook.jpeg" alt="" fill sizes={`${Math.round(height * 1.45)}px`} className="object-contain mix-blend-multiply" />
      </span> : <span className="relative block shrink-0 overflow-hidden" style={{ width: boxWidth, height }}>
        <Image
          src="/images/brand/shanhe-logo.jpg"
          alt=""
          width={CROP.source}
          height={CROP.source}
          priority
          className="absolute max-w-none mix-blend-multiply"
          style={{ width: imageSize, height: imageSize, left: -CROP.x * scale, top: -CROP.y * scale }}
        />
      </span>}
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-semibold tracking-tight text-ink">Yiwu Shanhe</span>
        <span className="mt-1 text-[0.7rem] font-medium tracking-[0.14em] text-ink-soft uppercase">
          Luggage Co., Ltd.
        </span>
      </span>
    </Link>
  )
}
