import { defaultLocale, type Locale } from './config'
import { en, type Dictionary } from './dictionaries/en'

const dictionaries: Record<Locale, Dictionary> = { en }

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}
