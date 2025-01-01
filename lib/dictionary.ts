import 'server-only'

export interface Dictionary {
  Index: {
    hero: {
      title: string;
      subtitle: string;
      cta1: string;
      cta2: string;
    };
    features: {
      title: string;
      colorize: string;
      colorizeDesc: string;
      enhance: string;
      enhanceDesc: string;
      removeBg: string;
      removeBgDesc: string;
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
  Header: {
    colorize: string;
    enhance: string;
    removeBg: string;
  };
  Footer: {
    product: string;
    company: string;
    legal: string;
    followUs: string;
  };
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

