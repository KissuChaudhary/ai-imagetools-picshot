'use client'

import { motion } from 'framer-motion'
import { ImageIcon, QrCode, Languages, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'

const featureIcons = [ImageIcon, QrCode, Languages, Clock]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function WhyChooseUs() {
  const t = useTranslations('Index.whyChoose')

  const features = [
    {
      icon: ImageIcon,
      title: t('features.fastImage.title'),
      description: t('features.fastImage.description')
    },
    {
      icon: QrCode,
      title: t('features.quality.title'),
      description: t('features.quality.description')
    },
    {
      icon: Languages,
      title: t('features.language.title'),
      description: t('features.language.description')
    },
    {
      icon: Clock,
      title: t('features.support.title'),
      description: t('features.support.description')
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="text-blue-500 mr-2">✧</span>
          {t('title')}
          <span className="text-blue-500 ml-2">✧</span>
        </motion.h2>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">
                <feature.icon className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

