import { getTranslations } from 'next-intl/server'

const toolPathMap: Record<string, string> = {
  'AIBackgroundRemoverPage': 'ai-background-remover',
  'AIImageGeneratorPage': 'ai-image-generator',
  'AIImageUpscalerPage': 'ai-image-upscaler',
  'AIPhotoColorizerPage': 'ai-photo-colorizer',
  'AIPhotoRestorerPage': 'ai-photo-restorer',
  'AIImageEnhancerPage': 'ai-image-enhancer',
  'AIImageCaptionGeneratorPage': 'ai-image-caption-generator',
  'AIImageToTextConverterPage': 'ai-image-to-text-converter'
}

export async function generateWebApplicationSchema(locale: string, toolPage: string) {
  const t = await getTranslations({ locale, namespace: `Index.${toolPage}.schema` })
  
  const toolPath = toolPathMap[toolPage] || toolPage.toLowerCase().replace('page', '')

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t('name'),
    "description": t('description'),
    "url": `https://lexistock.com/${locale}/tools/${toolPath}`,
    "applicationCategory": t('applicationCategory'),
    "operatingSystem": t('operatingSystem'),
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}

