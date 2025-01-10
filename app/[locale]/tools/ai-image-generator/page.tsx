import { Metadata } from 'next'
import AIImageGenerator from '@/components/AIImageGenerator'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Camera, Brush, Clock, Sparkles, Layers } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Index.AIImageGeneratorPage.metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

interface BenefitCardProps {
  icon: React.ReactElement
  title: string
  description: string
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="bg-card text-card-foreground p-6 rounded-lg">
    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h2 className="text-lg font-medium title-font mb-2">{title}</h2>
    <p className="leading-relaxed text-base">{description}</p>
  </div>
)

interface StepItemProps {
  number: string
  title: string
  description: string
}

const StepItem: React.FC<StepItemProps> = ({ number, title, description }) => (
  <div className="flex mb-8">
    <div className="flex-shrink-0 mr-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
        {number}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
)

export default async function AIImageGeneratorPage({ params }: Props) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Index.AIImageGeneratorPage')

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ paddingBottom: '3rem' }}>
      <AIImageGenerator />
     
      {/* What is AI Image Generator Section */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">{t('whatIsTitle')}</h2>
          <p className="leading-relaxed text-base text-muted-foreground">
            {t('whatIsDescription')}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-8 text-center">
            {t('benefitsTitle')}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <BenefitCard
              icon={<Clock size={24} />}
              title={t('timeSavingTitle')}
              description={t('timeSavingDescription')}
            />
            <BenefitCard
              icon={<Brush size={24} />}
              title={t('creativeFreedomTitle')}
              description={t('creativeFreedomDescription')}
            />
            <BenefitCard
              icon={<Camera size={24} />}
              title={t('highQualityTitle')}
              description={t('highQualityDescription')}
            />
            <BenefitCard
              icon={<Sparkles size={24} />}
              title={t('easyToUseTitle')}
              description={t('easyToUseDescription')}
            />
            <BenefitCard
              icon={<Layers size={24} />}
              title={t('versatileApplicationsTitle')}
              description={t('versatileApplicationsDescription')}
            />
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold mb-8 text-center">
            {t('howToUseTitle')}
          </h2>
          <div className="space-y-8">
            <StepItem
              number="1"
              title={t('step1Title')}
              description={t('step1Description')}
            />
            <StepItem
              number="2"
              title={t('step2Title')}
              description={t('step2Description')}
            />
            <StepItem
              number="3"
              title={t('step3Title')}
              description={t('step3Description')}
            />
            <StepItem
              number="4"
              title={t('step4Title')}
              description={t('step4Description')}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

