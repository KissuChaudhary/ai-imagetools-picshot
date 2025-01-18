import { Metadata } from 'next'
import Script from 'next/script'
import AIPhotoColorizer from '@/components/AIPhotoColorizer'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import PhotoColorizerContent from '@/components/PhotoColorizerContent'
import { generateWebApplicationSchema } from '@/utils/schemaGenerator'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index.AIPhotoColorizerPage.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function PhotoColorizerPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const schema = await generateWebApplicationSchema(locale, 'AIPhotoColorizerPage')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Script
        id="photo-colorizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AIPhotoColorizer />
      <PhotoColorizerContent />
    </div>
  )
}

