'use server'

import { parseRfq, validateRfq, type RfqState } from '@/lib/rfq/schema'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'

/**
 * Integration point for the backend.
 * Wiring order once credentials exist:
 *   1. Reject when the honeypot field `website` is filled.
 *   2. Verify `captchaToken` and consume it atomically.
 *   3. Insert the validated values into Supabase and return status 'success'.
 * Until then the action validates and reports 'unavailable' so the interface never claims a send.
 */
export async function submitInquiry(_previous: RfqState, formData: FormData): Promise<RfqState> {
  const values = parseRfq(formData)
  const errors = validateRfq(values)
  try {
    const secret=process.env.CAPTCHA_SECRET?.trim()||''
    const context=createSupabaseCaptchaContextFromEnv()
    const captcha=await verifyCaptchaSubmission({secret,...context,scope:String(formData.get('captchaScope')||''),token:String(formData.get('captchaToken')||''),answer:String(formData.get('captchaAnswer')||'')})
    if(!captcha.ok)return {status:'error',values,errors:{}}
    if(Object.keys(errors).length>0)return {status:'invalid',values,errors}
    if(String(formData.get('website')||''))return {status:'error',values,errors:{}}
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY,tenantId=process.env.NEXT_PUBLIC_TENANT_ID
    if(!url||!key||!tenantId)return {status:'error',values,errors:{}}
    const db=createClient(url,key,{auth:{persistSession:false}})
    const subject=[values.family,values.reference,values.quantity].filter(Boolean).join(' · ')||'Website RFQ'
    const message=[values.message,values.customization.length?`Customization: ${values.customization.join(', ')}`:'',values.country?`Country: ${values.country}`:''].filter(Boolean).join('\n\n')
    const {error}=await db.from('inquiries').insert({tenant_id:tenantId,name:values.fullName,email:values.email,phone:values.phone||null,company:values.company||null,subject,message})
    if(error)throw error
    return {status:'success',values:{fullName:'',company:'',email:'',phone:'',country:'',family:'',reference:'',quantity:'',customization:[],message:'',consent:false},errors:{}}
  } catch { return {status:'error',values,errors:{}} }
}
