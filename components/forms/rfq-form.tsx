'use client'

import { useActionState, useEffect, useRef, type ReactNode } from 'react'
import { AlertCircle, Mail } from 'lucide-react'
import { submitInquiry } from '@/app/actions/submit-inquiry'
import { categories } from '@/lib/data/catalog'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'
import { buildMailtoHref, initialRfqState, type RfqFieldErrors, type RfqState, type RfqValues } from '@/lib/rfq/schema'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'

const controlClass =
  'w-full rounded-[0.25rem] border border-[oklch(0.6_0.014_170)] bg-white px-3.5 text-base text-ink transition-[border-color,box-shadow] duration-200 placeholder:text-ink-soft/70 hover:border-ink focus-visible:border-blue-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-ink/40 aria-[invalid=true]:border-destructive'

interface RfqFormProps {
  dict: Dictionary
  idPrefix: string
  defaultFamily?: string
  defaultReference?: string
}

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  optionalLabel: string
  children: (aria: { 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode
}

function Field({ id, label, hint, error, required, optionalLabel, children }: FieldProps) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink">
        <span>{label}</span>
        {required ? null : <span className="text-xs font-normal text-ink-soft">{optionalLabel}</span>}
      </label>
      {children({ 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-medium text-destructive">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

function errorText(code: RfqFieldErrors[keyof RfqFieldErrors], dict: Dictionary) {
  if (!code) return undefined
  return dict.rfq.errors[code]
}

export function RfqForm({ dict, idPrefix, defaultFamily = '', defaultReference = '' }: RfqFormProps) {
  const [state, formAction, pending] = useActionState<RfqState, FormData>(submitInquiry, initialRfqState)
  const summaryRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const { fields, hints, sections, errors: errorCopy, status: statusCopy } = dict.rfq

  useEffect(() => {
    if (state.status === 'invalid') summaryRef.current?.focus()
    if (state.status === 'unavailable' || state.status === 'success' || state.status === 'error') statusRef.current?.focus()
  }, [state])

  const values: RfqValues = state.status === 'idle' ? { ...state.values, family: defaultFamily, reference: defaultReference } : state.values
  const errors = state.status === 'invalid' ? state.errors : {}
  const errorKeys = Object.keys(errors) as (keyof RfqFieldErrors)[]
  const fieldId = (name: string) => `${idPrefix}-${name}`
  const optional = hints.optional

  return (
    <form action={formAction} noValidate className="flex flex-col gap-8" aria-busy={pending}>
      {state.status === 'invalid' ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-l-4 border-destructive bg-white p-4 text-sm outline-none"
        >
          <p className="font-semibold text-destructive">{errorCopy.summary}</p>
          <ul className="mt-2 flex flex-col gap-1">
            {errorKeys.map((key) => (
              <li key={key}>
                <a href={`#${fieldId(key)}`} className="underline underline-offset-4">
                  {fields[key as keyof typeof fields] ?? key}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {state.status === 'unavailable' || state.status === 'success' || state.status === 'error' ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className={cn(
            'border-l-4 bg-white p-5 outline-none',
            state.status === 'success' ? 'border-evergreen' : 'border-blue-ink',
          )}
        >
          <p className="font-semibold text-ink">
            {state.status === 'success'
              ? statusCopy.successTitle
              : state.status === 'error'
                ? statusCopy.errorTitle
                : statusCopy.unavailableTitle}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            {state.status === 'success'
              ? statusCopy.successBody
              : state.status === 'error'
                ? statusCopy.errorBody
                : statusCopy.unavailableBody}
          </p>
          {state.status !== 'success' ? (
            <a
              href={buildMailtoHref(siteConfig.email, state.values)}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-[0.25rem] border border-ink px-4 text-sm font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              <Mail aria-hidden="true" className="size-4" />
              {statusCopy.emailDraft}
            </a>
          ) : null}
        </div>
      ) : null}

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-1 font-display text-xl font-medium text-ink">{sections.you}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={fieldId('fullName')} label={fields.fullName} required error={errorText(errors.fullName, dict)} optionalLabel={optional}>
            {(aria) => (
              <input
                id={fieldId('fullName')}
                name="fullName"
                type="text"
                autoComplete="name"
                defaultValue={values.fullName}
                required
                className={cn(controlClass, 'h-12')}
                {...aria}
              />
            )}
          </Field>
          <Field id={fieldId('company')} label={fields.company} required error={errorText(errors.company, dict)} optionalLabel={optional}>
            {(aria) => (
              <input
                id={fieldId('company')}
                name="company"
                type="text"
                autoComplete="organization"
                defaultValue={values.company}
                required
                className={cn(controlClass, 'h-12')}
                {...aria}
              />
            )}
          </Field>
          <Field id={fieldId('email')} label={fields.email} required error={errorText(errors.email, dict)} optionalLabel={optional}>
            {(aria) => (
              <input
                id={fieldId('email')}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                defaultValue={values.email}
                required
                className={cn(controlClass, 'h-12')}
                {...aria}
              />
            )}
          </Field>
          <Field id={fieldId('phone')} label={fields.phone} error={errorText(errors.phone, dict)} optionalLabel={optional}>
            {(aria) => (
              <input
                id={fieldId('phone')}
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                defaultValue={values.phone}
                className={cn(controlClass, 'h-12')}
                {...aria}
              />
            )}
          </Field>
          <div className="sm:col-span-2">
            <Field id={fieldId('country')} label={fields.country} required error={errorText(errors.country, dict)} optionalLabel={optional}>
              {(aria) => (
                <input
                  id={fieldId('country')}
                  name="country"
                  type="text"
                  autoComplete="country-name"
                  defaultValue={values.country}
                  required
                  className={cn(controlClass, 'h-12')}
                  {...aria}
                />
              )}
            </Field>
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-1 font-display text-xl font-medium text-ink">{sections.request}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={fieldId('family')} label={fields.family} optionalLabel={optional}>
            {(aria) => (
              <select
                id={fieldId('family')}
                name="family"
                defaultValue={values.family}
                className={cn(controlClass, 'h-12')}
                {...aria}
              >
                <option value="">{dict.rfq.familyOptions.placeholder}</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.name}>
                    {category.name}
                  </option>
                ))}
                <option value={dict.rfq.familyOptions.notSure}>{dict.rfq.familyOptions.notSure}</option>
              </select>
            )}
          </Field>
          <Field id={fieldId('quantity')} label={fields.quantity} hint={hints.quantity} optionalLabel={optional}>
            {(aria) => (
              <input
                id={fieldId('quantity')}
                name="quantity"
                type="text"
                inputMode="numeric"
                defaultValue={values.quantity}
                className={cn(controlClass, 'h-12')}
                {...aria}
              />
            )}
          </Field>
          <div className="sm:col-span-2">
            <Field id={fieldId('reference')} label={fields.reference} hint={hints.reference} optionalLabel={optional}>
              {(aria) => (
                <input
                  id={fieldId('reference')}
                  name="reference"
                  type="text"
                  defaultValue={values.reference}
                  className={cn(controlClass, 'h-12')}
                  {...aria}
                />
              )}
            </Field>
          </div>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-medium text-ink">{fields.customization}</legend>
          <div className="grid gap-x-4 sm:grid-cols-2">
            {dict.rfq.customizationOptions.map((option) => (
              <label
                key={option.value}
                className="flex min-h-11 cursor-pointer items-center gap-3 text-[0.95rem] text-ink"
              >
                <input
                  type="checkbox"
                  name="customization"
                  value={option.label}
                  defaultChecked={values.customization.includes(option.label)}
                  className="size-5 shrink-0 accent-[var(--evergreen)]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Field id={fieldId('message')} label={fields.message} hint={hints.message} required error={errorText(errors.message, dict)} optionalLabel={optional}>
          {(aria) => (
            <textarea
              id={fieldId('message')}
              name="message"
              rows={5}
              defaultValue={values.message}
              required
              className={cn(controlClass, 'min-h-32 py-3')}
              {...aria}
            />
          )}
        </Field>
      </fieldset>

      <InquiryCaptchaField
        tokenName="captchaToken"
        answerName="captchaAnswer"
        scopeName="captchaScope"
        className="rounded-lg border border-line bg-white p-4"
      />

      <div className="flex flex-col gap-1.5">
        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
          <input
            id={fieldId('consent')}
            type="checkbox"
            name="consent"
            defaultChecked={values.consent}
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${fieldId('consent')}-error` : undefined}
            className="mt-0.5 size-5 shrink-0 accent-[var(--evergreen)]"
          />
          <span>{fields.consent}</span>
        </label>
        {errors.consent ? (
          <p id={`${fieldId('consent')}-error`} className="flex items-start gap-1.5 text-sm font-medium text-destructive">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {errorCopy.consent}
          </p>
        ) : null}
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center rounded-[0.35rem_1.25rem_0.35rem_1.25rem] bg-evergreen px-8 text-[0.95rem] font-medium text-primary-foreground transition-[background-color,transform] duration-200 hover:bg-evergreen-hover active:scale-[0.98] disabled:opacity-60 max-sm:w-full"
        >
          {pending ? dict.rfq.submitting : dict.rfq.submit}
        </button>
      </div>
    </form>
  )
}
