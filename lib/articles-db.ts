import { getSupabaseClient,tenantId } from './supabase'
export type Article={slug:string;title:string;excerpt:string;content:string;featuredImage?:string;publishedAt?:string}
const map=(r:any):Article=>({slug:r.slug,title:r.title_i18n?.en||r.title,excerpt:r.excerpt_i18n?.en||r.excerpt||'',content:r.content_i18n?.en||r.content||'',featuredImage:r.featured_image||undefined,publishedAt:r.published_at||undefined})
export async function getPublishedArticles(){const db=getSupabaseClient(),id=tenantId();if(!db||!id)return[];const {data,error}=await db.from('articles').select('*').eq('tenant_id',id).eq('is_published',true).order('published_at',{ascending:false});return error?[]:(data||[]).map(map)}
export async function getArticleBySlug(slug:string){return (await getPublishedArticles()).find(x=>x.slug===slug)}
