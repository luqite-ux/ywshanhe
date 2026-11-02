import { notFound } from 'next/navigation'
import { PageIntro } from '@/components/site/page-intro'
import { getArticleBySlug } from '@/lib/articles-db'
export const revalidate=60;export const dynamicParams=true
export default async function NewsArticlePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=await getArticleBySlug(slug);if(!a)notFound();return <><PageIntro eyebrow="News" title={a.title} description={a.excerpt} crumbs={[{label:'Home',href:'/'},{label:'News',href:'/news'},{label:a.title}]}/><article className="article-prose container-site max-w-3xl py-16" dangerouslySetInnerHTML={{__html:a.content}}/></>}
