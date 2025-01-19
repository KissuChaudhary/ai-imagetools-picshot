'use client'

import { useRef, useState, useCallback } from 'react'
import { ArrowLeftRight, Zap, Maximize, MousePointer, DollarSign, Upload, Sliders, Download, Camera, ShoppingBag, Share2, PieChart } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TestimonialsSection } from '@/components/testimonials'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslations } from 'next-intl'
import NextLink from 'next/link'


const features = [
  {
    icon: Maximize,
    color: 'text-blue-500',
    titleKey: 'features.precisionCut.title',
    descriptionKey: 'features.precisionCut.description',
  },
  {
    icon: Zap,
    color: 'text-yellow-500',
    titleKey: 'features.hdQuality.title',
    descriptionKey: 'features.hdQuality.description',
  },
  {
    icon: MousePointer,
    color: 'text-green-500',
    titleKey: 'features.fastProcessing.title',
    descriptionKey: 'features.fastProcessing.description',
  },
  {
    icon: DollarSign,
    color: 'text-purple-500',
    titleKey: 'features.freeToUse.title',
    descriptionKey: 'features.freeToUse.description',
  }
]

const steps = [
  {
    icon: Upload,
    titleKey: 'steps.upload.title',
    descriptionKey: 'steps.upload.description',
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    icon: Sliders,
    titleKey: 'steps.process.title',
    descriptionKey: 'steps.process.description',
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    icon: Download,
    titleKey: 'steps.download.title',
    descriptionKey: 'steps.download.description',
    image: '/placeholder.svg?height=200&width=300'
  }
]

const useCases = [
  {
    icon: Camera,
    titleKey: 'useCases.socialMedia.title',
    descriptionKey: 'useCases.socialMedia.description',
  },
  {
    icon: ShoppingBag,
    titleKey: 'useCases.ecommerce.title',
    descriptionKey: 'useCases.ecommerce.description',
  },
  {
    icon: Share2,
    titleKey: 'useCases.personalProjects.title',
    descriptionKey: 'useCases.personalProjects.description',
  },
  {
    icon: PieChart,
    titleKey: 'useCases.presentations.title',
    descriptionKey: 'useCases.presentations.description',
  }
]

export default function BackgroundRemoverContent() {
  const t = useTranslations('Index.BackgroundRemoverContent')
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const x = 'touches' in event ? event.touches[0].clientX : event.clientX
      const relativeX = x - containerRect.left
      const newPosition = (relativeX / containerRect.width) * 100
      setSliderPosition(Math.min(Math.max(0, newPosition), 100))
    }
  }, [])

  return (
    <div className="bg-background text-foreground">
      <section className="bg-black text-white mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl flex flex-col mx-auto justify-center lg:flex-row lg:items-center lg:space-x-8">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div
              ref={containerRef}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted cursor-col-resize shadow-lg"
              onMouseMove={handleMove}
              onTouchMove={handleMove}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={sliderPosition}
              tabIndex={0}
            >
              <Image
                src="/aibgbefore.png"
                alt={t('imageAltBefore')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
              <div
                className="absolute top-0 bottom-0 right-0 w-full overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <Image
                  src="/aibgafter.png"
                  alt={t('imageAltAfter')}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                  <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm font-medium">
                {t('beforeLabel')}
              </div>
              <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm font-medium">
                {t('afterLabel')}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              {t('heroTitle')}
            </h1>
            <div className="space-y-4">
              <p>{t('heroParagraph1')}</p>
              <p>{t('heroParagraph2')}</p>
            </div>
            <div className="mt-8">
            <NextLink href="/tools/ai-background-remover" passHref>

              <Button size="lg">{t('removeBGButton')}</Button>
              </NextLink>

            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('featuresTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <div className="bg-background rounded-lg p-3">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <span>{t(feature.titleKey)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t(feature.descriptionKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('stepsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="bg-primary/10 rounded-full p-4 mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{t(step.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{t(step.descriptionKey)}</p>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={step.image}
                      alt={t(step.titleKey)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('useCasesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="bg-background text-foreground">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center space-y-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <useCase.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-center">{t(useCase.titleKey)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">{t(useCase.descriptionKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">
            {t('bgRemovalTitle')}
          </h2>
          <div className="space-y-6">
            <p>{t('bgRemovalParagraph1')}</p>
            <p>{t('bgRemovalParagraph2')}</p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-8">
            {t('benefitsTitle')}
          </h2>
          <div className="space-y-6 ">
            <p>{t('benefitsParagraph')}</p>
            <ul className="list-disc pl-6 space-y-2">
              {['benefit1', 'benefit2', 'benefit3', 'benefit4'].map((key, index) => (
                <li key={index}>{t(`benefits.${key}`)}</li>
              ))}
            </ul>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-8">
            {t('misconceptionsTitle')}
          </h2>
          <div className="space-y-6 ">
            <p>{t('misconceptionsParagraph1')}</p>
            <p>{t('misconceptionsParagraph2')}</p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-8">
            {t('whyChooseTitle')}
          </h2>
          <div className="space-y-6">
            <p>{t('whyChooseParagraph1')}</p>
            <ul className="list-disc pl-6 space-y-2">
              {['reason1', 'reason2', 'reason3'].map((key, index) => (
                <li key={index}>{t(`whyChoose.${key}`)}</li>
              ))}
            </ul>
            <p>{t('whyChooseParagraph2')}</p>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('faqTitle')}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {Array.from({ length: 10 }).map((_, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>
                  {t(`faq.${index}.question`)}
                </AccordionTrigger>
                <AccordionContent>
                  {t(`faq.${index}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
