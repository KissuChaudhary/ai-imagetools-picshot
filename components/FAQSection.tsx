'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
  id: string
  question: string
  answer: string | React.ReactNode
}

interface FAQCategory {
  title: string
  items: FAQItem[]
}

export function FAQSection() {
  const t = useTranslations('Index.faq')

  const faqCategories: FAQCategory[] = [
    {
      title: t('categories.general.title'),
      items: [
        {
          id: 'what-is',
          question: t('categories.general.items.what-is.question'),
          answer: t('categories.general.items.what-is.answer'),
        },
        {
          id: 'free',
          question: t('categories.general.items.free.question'),
          answer: t('categories.general.items.free.answer'),
        },
        {
          id: 'signup',
          question: t('categories.general.items.signup.question'),
          answer: t('categories.general.items.signup.answer'),
        },
        {
          id: 'tools',
          question: t('categories.general.items.tools.question'),
          answer: (
            <div>
              {t('categories.general.items.tools.answer.intro')}
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>{t('categories.general.items.tools.answer.items.bgRemover')}</li>
                <li>{t('categories.general.items.tools.answer.items.enhancer')}</li>
                <li>{t('categories.general.items.tools.answer.items.artGenerator')}</li>
                <li>{t('categories.general.items.tools.answer.items.restorer')}</li>
                <li>{t('categories.general.items.tools.answer.items.avatarGenerator')}</li>
              </ul>
            </div>
          ),
        },
      ],
    },
    {
      title: t('categories.usage.title'),
      items: [
        {
          id: 'text-to-image',
          question: t('categories.usage.items.textToImage.question'),
          answer: t('categories.usage.items.textToImage.answer'),
        },
        {
          id: 'bg-remover',
          question: t('categories.usage.items.bgRemover.question'),
          answer: t('categories.usage.items.bgRemover.answer'),
        },
        {
          id: 'mobile',
          question: t('categories.usage.items.mobile.question'),
          answer: t('categories.usage.items.mobile.answer'),
        },
        {
          id: 'formats',
          question: t('categories.usage.items.formats.question'),
          answer: t('categories.usage.items.formats.answer'),
        },
      ],
    },
    {
      title: t('categories.other.title'),
      items: [
        {
          id: 'speed',
          question: t('categories.other.items.speed.question'),
          answer: t('categories.other.items.speed.answer'),
        },
        {
          id: 'security',
          question: t('categories.other.items.security.question'),
          answer: t('categories.other.items.security.answer'),
        },
        {
          id: 'privacy',
          question: t('categories.other.items.privacy.question'),
          answer: t('categories.other.items.privacy.answer'),
        },
        {
          id: 'support',
          question: t('categories.other.items.support.question'),
          answer: t('categories.other.items.support.answer'),
        },
      ],
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="flex items-center space-x-2 text-primary">
            <h2 className="text-2xl sm:text-3xl sm:text-5xl font-bold tracking-tighter">
              {t('title')}
            </h2>
            
          </div>
          <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t('description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
          {faqCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border mb-2 rounded-md px-2 border-zinc-200">
                    <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-500">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

