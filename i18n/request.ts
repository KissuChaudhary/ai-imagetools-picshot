import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './config';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    return {
      messages: (await import(`../messages/${defaultLocale}.json`)).default,
      locale: defaultLocale
    };
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale: locale
  };
});

