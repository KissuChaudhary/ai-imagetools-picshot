import { Metadata } from 'next'
import AIImageCaptionGenerator from '@/components/AIImageCaptionGenerator'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AIImageCaptionGenerator />
    </div>
  )
}

