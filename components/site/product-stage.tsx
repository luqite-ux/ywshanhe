import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { CatalogImage } from '@/lib/data/catalog'

interface ProductStageProps {
  image: CatalogImage
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * Complete product outline on a continuous clean background. The images are white-ground studio
 * shots, so the stage is white and the subject is always contained, never cropped.
 */
export function ProductStage({ image, className, sizes = '(min-width: 1024px) 25vw, 50vw', priority }: ProductStageProps) {
  return (
    <div className={cn('relative aspect-square w-full overflow-hidden bg-white', className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain p-2 transition-transform duration-300 ease-out group-hover/card:-translate-y-0.5"
      />
    </div>
  )
}
