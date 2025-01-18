'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

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

export function FAQSection() {
  const t = useTranslations('Index.faq')

  const faqItems: FAQItem[] = [
    {
      id: '01',
      question: t('categories.general.items.what-is.question'),
      answer: t('categories.general.items.what-is.answer'),
    },
    {
      id: '02',
      question: t('categories.general.items.free.question'),
      answer: t('categories.general.items.free.answer'),
    },
    {
      id: '03',
      question: t('categories.general.items.signup.question'),
      answer: t('categories.general.items.signup.answer'),
    },
    {
      id: '04',
      question: t('categories.general.items.tools.question'),
      answer: (
        <div className="space-y-4">
          <p>{t('categories.general.items.tools.answer.intro')}</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t('categories.general.items.tools.answer.items.bgRemover')}</li>
            <li>{t('categories.general.items.tools.answer.items.enhancer')}</li>
            <li>{t('categories.general.items.tools.answer.items.artGenerator')}</li>
            <li>{t('categories.general.items.tools.answer.items.restorer')}</li>
            <li>{t('categories.general.items.tools.answer.items.avatarGenerator')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: '05',
      question: t('categories.usage.items.textToImage.question'),
      answer: t('categories.usage.items.textToImage.answer'),
    },
    {
      id: '06',
      question: t('categories.usage.items.bgRemover.question'),
      answer: t('categories.usage.items.bgRemover.answer'),
    },
    {
      id: '07',
      question: t('categories.usage.items.mobile.question'),
      answer: t('categories.usage.items.mobile.answer'),
    },
    {
      id: '08',
      question: t('categories.usage.items.formats.question'),
      answer: t('categories.usage.items.formats.answer'),
    },
    {
      id: '09',
      question: t('categories.other.items.speed.question'),
      answer: t('categories.other.items.speed.answer'),
    },
    {
      id: '10',
      question: t('categories.other.items.security.question'),
      answer: t('categories.other.items.security.answer'),
    },
    {
      id: '11',
      question: t('categories.other.items.privacy.question'),
      answer: t('categories.other.items.privacy.answer'),
    },
    {
      id: '12',
      question: t('categories.other.items.support.question'),
      answer: t('categories.other.items.support.answer'),
    },
  ]

  // Calculate the midpoint to split the FAQs into two columns
  const midpoint = Math.ceil(faqItems.length / 2)

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white">
            {t('title')}
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.slice(0, midpoint).map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border rounded-xl bg-gradient-to-br from-gray-900 to-black border-gray-700 transition-all duration-300 hover:border-white/50 hover:shadow-lg hover:shadow-white/10"
                >
                  <AccordionTrigger 
                    className="px-4 hover:no-underline [&[data-state=open]>div]:text-white [&>svg]:text-white"
                  >
                    <div className="flex gap-4 text-left">
                      <span className="text-[#22d3ee] font-mono">{item.id}</span>
                      <span className="text-gray-200 font-semibold">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pl-10 text-gray-400">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.slice(midpoint).map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border rounded-xl bg-gradient-to-br from-gray-900 to-black border-gray-700 transition-all duration-300 hover:border-white/50 hover:shadow-lg hover:shadow-white/10"
                >
                  <AccordionTrigger 
                    className="px-4 hover:no-underline [&[data-state=open]>div]:text-white [&>svg]:text-white"
                  >
                    <div className="flex gap-4 text-left">
                      <span className="text-[#22d3ee] font-mono">{item.id}</span>
                      <span className="text-gray-200 font-semibold">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pl-10 text-gray-400">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

