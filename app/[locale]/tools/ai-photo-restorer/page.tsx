import { Metadata } from 'next'
import AIPhotoRestorer from '@/components/AIPhotoRestorer'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import PhotoRestorerContent from '@/components/PhotoRestorerContent'


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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AIPhotoRestorer />
        <PhotoRestorerContent />
    </div>
  )
}

