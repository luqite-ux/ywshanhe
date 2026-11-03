export type FactoryGroupId = 'making' | 'materials' | 'samples' | 'company'

export interface FactoryPhoto {
  id: string
  group: FactoryGroupId
  src: string
  alt: string
  caption: string
  /** Tailwind aspect utility that frames the photo without cropping away its subject */
  aspect: string
  objectPosition?: string
}

export interface FactoryGroup {
  id: FactoryGroupId
  title: string
  description: string
}

export const factoryGroups: FactoryGroup[] = [
  {
    id: 'making',
    title: 'Making',
    description: 'An operator at an industrial sewing machine on the production floor.',
  },
  {
    id: 'materials',
    title: 'Materials and cartons',
    description: 'Material stored in sacks and packed cartons stacked in the warehouse.',
  },
  {
    id: 'samples',
    title: 'Sample rooms',
    description: 'Shelves of finished samples that buyers can point to when briefing a new project.',
  },
  {
    id: 'company',
    title: 'Company',
    description: 'The office wall at the Yiwu site, with the company timeline and values in Chinese.',
  },
]

export const factoryPhotos: FactoryPhoto[] = [
  {
    id: 'sewing-station',
    group: 'making',
    src: '/images/factory/sewing-station.jpg',
    alt: 'Operator guiding grey bag fabric through an industrial sewing machine',
    caption: 'Sewing station',
    aspect: 'aspect-[4/5]',
    objectPosition: '55% 40%',
  },
  {
    id: 'material-storage',
    group: 'materials',
    src: '/images/factory/material-storage.jpg',
    alt: 'Storage room with stacked woven sacks of material and a red floor runner',
    caption: 'Material storage',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'packed-cartons',
    group: 'materials',
    src: '/images/factory/packed-cartons.jpg',
    alt: 'Warehouse corridor with stacked cartons and bundled bags under a skylight roof',
    caption: 'Packed cartons in the warehouse',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'sample-hall',
    group: 'samples',
    src: '/images/factory/sample-hall.jpg',
    alt: 'Sample exhibition hall with shelving full of bags and a long meeting table',
    caption: 'Sample exhibition hall',
    aspect: 'aspect-[17/10]',
    objectPosition: 'center top',
  },
  {
    id: 'company-wall',
    group: 'company',
    src: '/images/factory/company-wall.jpg',
    alt: 'Office corridor wall printed with the company profile, timeline and rules in Chinese',
    caption: 'Company wall at the Yiwu office',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'factory-exterior',
    group: 'company',
    src: '/images/factory/factory-exterior.jpeg',
    alt: 'Exterior of the Yiwu Shanhe factory building with cartons and delivery vehicles',
    caption: 'Factory exterior',
    aspect: 'aspect-[4/3]',
    objectPosition: 'center 42%',
  },
  {
    id: 'production-floor-panorama',
    group: 'making',
    src: '/images/factory/production-floor-panorama.jpeg',
    alt: 'Panoramic view of the sewing production floor with operators at workstations',
    caption: 'Production floor panorama',
    aspect: 'aspect-[2.3/1]',
    objectPosition: 'center',
  },
  {
    id: 'production-and-warehouse-overview',
    group: 'making',
    src: '/images/factory/production-and-warehouse-overview.jpeg',
    alt: 'Overview of material storage, production tables and packing operations',
    caption: 'Production and warehouse overview',
    aspect: 'aspect-[2.3/1]',
    objectPosition: 'center',
  },
  {
    id: 'sewing-floor',
    group: 'making',
    src: '/images/factory/sewing-floor.jpeg',
    alt: 'Wide view across the sewing floor with operators and industrial machines',
    caption: 'Sewing floor',
    aspect: 'aspect-[17/10]',
    objectPosition: 'center',
  },
  {
    id: 'company-corridor',
    group: 'company',
    src: '/images/factory/company-corridor.jpeg',
    alt: 'Office corridor beside the Yiwu Shanhe company profile wall',
    caption: 'Company corridor',
    aspect: 'aspect-[17/10]',
    objectPosition: '20% center',
  },
  {
    id: 'workbook-office',
    group: 'company',
    src: '/images/factory/workbook-office.jpeg',
    alt: 'Open-plan Yiwu office with desks, shelving and sample displays',
    caption: 'Open-plan office',
    aspect: 'aspect-[17/10]',
    objectPosition: 'center',
  },
]

export function getFactoryPhoto(id: string) {
  const photo = factoryPhotos.find((item) => item.id === id)
  if (!photo) throw new Error(`Unknown factory photo: ${id}`)
  return photo
}
