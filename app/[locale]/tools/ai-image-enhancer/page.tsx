import { Metadata } from 'next'
import Script from 'next/script'
import AIImageEnhancer from '@/components/AIImageEnhancer'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import ImageEnhancerContent from '@/components/ImageEnhancerContent'
import { generateWebApplicationSchema } from '@/utils/schemaGenerator'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index.AIImageEnhancerPage.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ImageEnhancerPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const schema = await generateWebApplicationSchema(locale, 'AIImageEnhancerPage')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Script
        id="image-enhancer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AIImageEnhancer />
      <ImageEnhancerContent />
    </div>
  )
}

