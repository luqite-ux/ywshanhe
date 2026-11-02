import { getSupabaseClient,tenantId } from './supabase'
import { products as fallback, type Product } from './data/catalog'
type Row={slug:string;name:string;name_i18n?:Record<string,string>;description?:string;description_i18n?:Record<string,string>;image_url?:string;category_slug:string;features?:string[];features_i18n?:Record<string,string[]>;is_active:boolean}
const map=(r:Row):Product=>({slug:r.slug,name:r.name_i18n?.en||r.name,categorySlug:r.category_slug as Product['categorySlug'],image:{src:r.image_url||'/placeholder.svg',alt:`${r.name_i18n?.en||r.name} product image`},summary:r.description_i18n?.en||r.description||'',highlights:r.features_i18n?.en||r.features||[]})
export async function fetchProductsData(){const db=getSupabaseClient(),id=tenantId();if(!db||!id)return fallback;const {data,error}=await db.from('products').select('slug,name,name_i18n,description,description_i18n,image_url,category_slug,features,features_i18n,is_active').eq('tenant_id',id).eq('is_active',true).order('sort_order');return error||!data?.length?fallback:(data as Row[]).map(map)}
export async function fetchProductBySlug(slug:string){return (await fetchProductsData()).find(x=>x.slug===slug)}
