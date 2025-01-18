import { Metadata } from 'next'
import Script from 'next/script'
import AIBackgroundRemover from '@/components/AIBackgroundRemover'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import BackgroundRemoverContent from '@/components/BackGroundRemoverContent'
import { generateWebApplicationSchema } from '@/utils/schemaGenerator'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index.AIBackgroundRemoverPage.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function BackgroundRemoverPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const schema = await generateWebApplicationSchema(locale, 'AIBackgroundRemoverPage')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Script
        id="background-remover-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AIBackgroundRemover />
      <BackgroundRemoverContent />
    </div>
  )
}

