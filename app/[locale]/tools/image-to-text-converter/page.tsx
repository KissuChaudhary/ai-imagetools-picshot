import { Metadata } from 'next'
import Script from 'next/script'
import AIImageToTextConverter from '@/components/AIImageToTextConverter'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import ImageToTextContent from '@/components/ImageToTextContent'
import { generateWebApplicationSchema } from '@/utils/schemaGenerator'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index.AIImageToTextConverterPage.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ImageToTextPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const schema = await generateWebApplicationSchema(locale, 'AIImageToTextConverterPage')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Script
        id="image-to-text-converter-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AIImageToTextConverter />
      <ImageToTextContent />
    </div>
  )
}

