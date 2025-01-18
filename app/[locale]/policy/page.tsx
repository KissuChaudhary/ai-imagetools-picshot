'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Shield, Eye, Lock, AlertTriangle, ActivityIcon as Ad } from 'lucide-react'
import { formatDate } from '@/utils/dateFormat'

export default function PolicyPage() {
  const t = useTranslations('Policy')

  const sections = [
    {
      id: 'privacy',
      icon: Eye,
      titleKey: 'sections.privacy.title',
      contentKey: 'sections.privacy.description',
      items: [
        'sections.privacy.items.noCollection',
        'sections.privacy.items.tempStorage',
        'sections.privacy.items.noCookies'
      ]
    },
    {
      id: 'security',
      icon: Lock,
      titleKey: 'sections.security.title',
      contentKey: 'sections.security.description',
      items: [
        'sections.security.items.encryption',
        'sections.security.items.deletion',
        'sections.security.items.noSharing'
      ]
    },
    {
      id: 'usage',
      icon: Shield,
      titleKey: 'sections.usage.title',
      contentKey: 'sections.usage.description',
      items: [
        'sections.usage.items.legalUse',
        'sections.usage.items.fairUse',
        'sections.usage.items.noHarmful'
      ]
    },
    {
      id: 'disclaimer',
      icon: AlertTriangle,
      titleKey: 'sections.disclaimer.title',
      contentKey: 'sections.disclaimer.description',
      items: [
        'sections.disclaimer.items.aiLimitations',
        'sections.disclaimer.items.noLiability',
        'sections.disclaimer.items.userResponsibility'
      ]
    },
    {
      id: 'advertising',
      icon: Ad,
      titleKey: 'sections.advertising.title',
      contentKey: 'sections.advertising.description',
      items: [
        'sections.advertising.items.thirdParty',
        'sections.advertising.items.cookies',
        'sections.advertising.items.optOut'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative py-16 sm:py-24">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
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
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
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
                      <svg className="h-6 w-6 text-cyan-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
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

