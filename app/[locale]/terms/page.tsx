'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Shield, Image, DollarSign } from 'lucide-react'
import { formatDate } from '@/utils/dateFormat'

export default function Terms() {
  const t = useTranslations('Terms')

  const sections = [
    {
      id: 'service',
      icon: Image,
      titleKey: 'sections.service.title',
      contentKey: 'sections.service.description',
      items: [
        'sections.service.items.free',
        'sections.service.items.noAccount',
        'sections.service.items.fairUse'
      ]
    },
    {
      id: 'privacy',
      icon: Clock,
      titleKey: 'sections.privacy.title',
      contentKey: 'sections.privacy.description',
      items: [
        'sections.privacy.items.retention',
        'sections.privacy.items.deletion',
        'sections.privacy.items.noData'
      ]
    },
    {
      id: 'guidelines',
      icon: Shield,
      titleKey: 'sections.guidelines.title',
      contentKey: 'sections.guidelines.description',
      items: [
        'sections.guidelines.items.legal',
        'sections.guidelines.items.appropriate',
        'sections.guidelines.items.safe'
      ]
    },
    {
      id: 'monetization',
      icon: DollarSign,
      titleKey: 'sections.monetization.title',
      contentKey: 'sections.monetization.description',
      items: [
        'sections.monetization.items.adSupported',
        'sections.monetization.items.userAgreement',
        'sections.monetization.items.optionalClicks'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
        <div className="space-y-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-gray-50 to-white shadow-sm text-gray-900">
                    <section.icon className="h-6 w-6" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t(section.titleKey)}
                </h2>
              </div>

              <div className="mt-6 prose prose-lg text-gray-500">
                <p>{t(section.contentKey)}</p>
                <ul className="mt-6 space-y-3">
                  {section.items.map((itemKey) => (
                    <li key={itemKey} className="flex items-start">
                      <ArrowRight className="h-6 w-6 text-gray-400 mr-2 flex-shrink-0" />
                      <span>{t(itemKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {t('lastUpdated', { date: formatDate(new Date()) })}
        </motion.div>
      </div>
    </div>
  )
}
