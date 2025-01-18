import { Metadata } from 'next'
import Script from 'next/script'
import AIImageCaptionGenerator from '@/components/AIImageCaptionGenerator'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import ImageCaptionContent from '@/components/ImageCaptionContent'
import { generateWebApplicationSchema } from '@/utils/schemaGenerator'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index.AIImageCaptionGeneratorPage.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ImageCaptionGeneratorPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const schema = await generateWebApplicationSchema(locale, 'AIImageCaptionGeneratorPage')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Script
        id="image-caption-generator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AIImageCaptionGenerator />
      <ImageCaptionContent />
    </div>
  )
}

