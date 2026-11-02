import { PageIntro } from '@/components/site/page-intro'
import { RfqForm } from '@/components/forms/rfq-form'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { defaultLocale } from '@/lib/i18n/config'
import { siteConfig } from '@/lib/site'
export default function ContactPage(){const d=getDictionary(defaultLocale);return <><PageIntro eyebrow="Contact" title="Tell us what you need" description="Send your bag type, quantity, size, material, colours and branding requirements." crumbs={[{label:'Home',href:'/'},{label:'Contact'}]}/><section className="container-site grid gap-12 py-16 lg:grid-cols-[.65fr_1.35fr]"><aside><h2 className="text-2xl">Direct contact</h2><a className="mt-5 block font-semibold text-evergreen" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a className="mt-2 block text-ink-soft" href={siteConfig.phoneHref}>{siteConfig.phone}</a><p className="mt-5 text-sm leading-relaxed text-ink-soft">Yiwu, Jinhua, Zhejiang, China</p></aside><div className="rounded-xl border border-line bg-stage p-6 sm:p-8"><RfqForm dict={d} idPrefix="contact-rfq"/></div></section></>}
