import { Metadata } from 'next'
import AIImageUpscaler from '@/components/AIImageUpscaler'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AIImageUpscaler />
    </div>
  )
}

