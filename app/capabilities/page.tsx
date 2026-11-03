import { PageIntro } from '@/components/site/page-intro'
import { FactoryGallery } from '@/components/factory/factory-gallery'
import { capacityFacts,termFacts } from '@/lib/data/facts'
import { factoryPhotos } from '@/lib/data/factory'
export default function CapabilitiesPage(){return <><PageIntro eyebrow="Manufacturing" title="Capabilities" description="Capacity, customization, process and photographs from the Yiwu site." crumbs={[{label:'Home',href:'/'},{label:'Capabilities'}]}/><section className="container-site py-16"><div className="grid gap-4 sm:grid-cols-3">{[...capacityFacts,...termFacts].map(f=><div key={f.label} className="rounded-xl border border-line p-6"><p className="text-3xl font-semibold text-evergreen">{f.value} <span className="text-sm">{f.unit}</span></p><p className="mt-2 text-ink-soft">{f.label}</p></div>)}</div><h2 className="mt-16 text-4xl">Factory photographs</h2><FactoryGallery photos={factoryPhotos}/></section></>}
