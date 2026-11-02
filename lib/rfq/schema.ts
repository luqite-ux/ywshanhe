export interface RfqValues {
  fullName: string
  company: string
  email: string
  phone: string
  country: string
  family: string
  reference: string
  quantity: string
  customization: string[]
  message: string
  consent: boolean
}

export type RfqErrorCode = 'required' | 'email' | 'message' | 'consent'
export type RfqFieldErrors = Partial<Record<keyof RfqValues, RfqErrorCode>>

/**
 * `unavailable` is the honest state while no backend is connected: the inquiry was validated
 * but nothing was stored or sent. Codex replaces it with `success` once Supabase and CAPTCHA are wired.
 */
export type RfqStatus = 'idle' | 'invalid' | 'unavailable' | 'success' | 'error'

export interface RfqState {
  status: RfqStatus
  values: RfqValues
  errors: RfqFieldErrors
}

export const emptyRfqValues: RfqValues = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  family: '',
  reference: '',
  quantity: '',
  customization: [],
  message: '',
  consent: false,
}

export const initialRfqState: RfqState = { status: 'idle', values: emptyRfqValues, errors: {} }

function text(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim().slice(0, 4000) : ''
}

export function parseRfq(formData: FormData): RfqValues {
  return {
    fullName: text(formData, 'fullName'),
    company: text(formData, 'company'),
    email: text(formData, 'email'),
    phone: text(formData, 'phone'),
    country: text(formData, 'country'),
    family: text(formData, 'family'),
    reference: text(formData, 'reference'),
    quantity: text(formData, 'quantity'),
    customization: formData
      .getAll('customization')
      .filter((value): value is string => typeof value === 'string')
      .slice(0, 10),
    message: text(formData, 'message'),
    consent: formData.get('consent') === 'on',
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateRfq(values: RfqValues): RfqFieldErrors {
  const errors: RfqFieldErrors = {}
  if (!values.fullName) errors.fullName = 'required'
  if (!values.company) errors.company = 'required'
  if (!values.email) errors.email = 'required'
  else if (!emailPattern.test(values.email)) errors.email = 'email'
  if (!values.country) errors.country = 'required'
  if (!values.message) errors.message = 'required'
  else if (values.message.length < 10) errors.message = 'message'
  if (!values.consent) errors.consent = 'consent'
  return errors
}

export function buildMailtoHref(to: string, values: RfqValues) {
  const lines = [
    `Name: ${values.fullName}`,
    `Company: ${values.company}`,
    `Email: ${values.email}`,
    `Phone / WhatsApp: ${values.phone}`,
    `Country or region: ${values.country}`,
    `Product family: ${values.family}`,
    `Product or reference: ${values.reference}`,
    `Estimated quantity: ${values.quantity}`,
    `Customization: ${values.customization.join(', ')}`,
    '',
    values.message,
  ]
  const subject = `Inquiry from ${values.company || values.fullName || 'website'}`
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}
