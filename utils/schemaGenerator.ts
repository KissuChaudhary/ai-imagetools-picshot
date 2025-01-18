import { getTranslations } from 'next-intl/server'

export async function generateWebApplicationSchema(locale: string, toolPage: string) {
  const t = await getTranslations({ locale, namespace: `Index.${toolPage}.schema` })

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('name'),
    "description": t('description'),
    "url": `https://lexistock.com/${locale}/tools/${toolPage.toLowerCase().replace('page', '')}`,
    "applicationCategory": t('applicationCategory'),
    "operatingSystem": t('operatingSystem'),
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}

