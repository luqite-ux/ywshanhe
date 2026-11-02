export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Single-locale launch: paths are unprefixed. Extend here when more locales go live. */
export function localizedPath(_locale: Locale, path: string) {
  return path
}
