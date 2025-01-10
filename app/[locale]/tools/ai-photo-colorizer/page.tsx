import { Metadata } from 'next'
import AIPhotoColorizer from '@/components/AIPhotoColorizer'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AIPhotoColorizer />
    </div>
  )
}

