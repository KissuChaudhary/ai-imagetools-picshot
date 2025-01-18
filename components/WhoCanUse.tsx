'use client'

import { useTranslations } from 'next-intl'
import { ShoppingCart, Home, GraduationCap, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

const categories = [
  {
    icon: ShoppingCart,
    titleKey: 'eCommerce.title',
    descriptionKey: 'eCommerce.description'
  },
  {
    icon: Home,
    titleKey: 'realEstate.title',
    descriptionKey: 'realEstate.description'
  },
  {
    icon: GraduationCap,
    titleKey: 'education.title',
    descriptionKey: 'education.description'
  },
  {
    icon: Share2,
    titleKey: 'socialMedia.title',
    descriptionKey: 'socialMedia.description'
  }
]

export default function WhoCanUse() {
  const t = useTranslations('Index.whoCanUse')

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl">
        <motion.div 
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan-400 font-medium">{t('welcome')}</p>
          <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white">
            {t('title')} <span className="text-cyan-400">{t('titleHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.titleKey}
              className="bg-[#111111] rounded-2xl p-6 space-y-4 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-[#0C1F1F] flex items-center justify-center">
                <category.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-xl font-semibold">{t(category.titleKey)}</h2>
              <p className="text-gray-400">{t(category.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

