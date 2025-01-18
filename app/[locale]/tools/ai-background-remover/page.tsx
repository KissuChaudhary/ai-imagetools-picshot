import { Metadata } from 'next'
import AIBackgroundRemover from '@/components/AIBackgroundRemover'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import BackgroundRemoverContent from '@/components/BackGroundRemoverContent'


type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index.AIBackgroundRemover' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function BackgroundRemoverPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AIBackgroundRemover />
            <BackgroundRemoverContent />
    </div>
  )
}

