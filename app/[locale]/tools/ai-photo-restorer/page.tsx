import { Metadata } from 'next'
import Script from 'next/script'
import AIPhotoRestorer from '@/components/AIPhotoRestorer'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import PhotoRestorerContent from '@/components/PhotoRestorerContent'
import { generateWebApplicationSchema } from '@/utils/schemaGenerator'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index.AIPhotoRestorerPage.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function PhotoRestorerPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const schema = await generateWebApplicationSchema(locale, 'AIPhotoRestorerPage')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Script
        id="photo-restorer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AIPhotoRestorer />
      <PhotoRestorerContent />
    </div>
  )
}

