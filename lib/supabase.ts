import { createClient, type SupabaseClient } from '@supabase/supabase-js'
let client:SupabaseClient|null|undefined
export function getSupabaseClient(){if(client!==undefined)return client;const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;client=url&&key?createClient(url,key,{auth:{persistSession:false}}):null;return client}
export const tenantId=()=>process.env.NEXT_PUBLIC_TENANT_ID?.trim()||''
export const getTenantId=tenantId
