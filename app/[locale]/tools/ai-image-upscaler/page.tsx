import { Metadata } from 'next'
import Script from 'next/script'
import AIImageUpscaler from '@/components/AIImageUpscaler'
import ImageComparisonSlider from '@/components/ImageComparisonSlider'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { generateWebApplicationSchema } from '@/utils/schemaGenerator'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index.AIImageUpscalerPage.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ImageUpscalerPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const schema = await generateWebApplicationSchema(locale, 'AIImageUpscalerPage')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Script
        id="image-upscaler-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AIImageUpscaler />
      <ImageComparisonSlider />
    </div>
  )
}
