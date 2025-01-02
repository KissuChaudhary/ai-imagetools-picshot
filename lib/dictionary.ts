import 'server-only'

export type Dictionary = {
  [key: string]: string | Dictionary
}

const dictionaries: { [key: string]: () => Promise<Dictionary> } = {
  en: () => import('@/messages/en.json').then((module) => module.default),
  es: () => import('@/messages/es.json').then((module) => module.default),
  fr: () => import('@/messages/fr.json').then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  if (!Object.keys(dictionaries).includes(locale)) {
    return dictionaries.en()
  }
  return dictionaries[locale]()
}

