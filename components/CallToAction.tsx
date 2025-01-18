'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'
import { Wand2, Image, Zap, Users, Star } from 'lucide-react'

export default function CallToAction() {
  const t = useTranslations('Index.cta')
  
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-br from-white via-[#e6fbfe] to-[#f0fdff]">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black space-y-4">
            <div className="inline-flex flex-wrap items-center justify-center gap-3">
              {t('headingPart1')}
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0066FF] text-white">
                <Wand2 className="w-5 h-5" />
                {t('headingAIPowered')}
              </span>
              {t('headingPart2')}
            </div>
            <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-2">
              {t('headingPart3')}
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#34C759] text-white">
                <Image className="w-5 h-5" />
                {t('headingCreative')}
              </span>
              {t('headingPart4')}
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF3B30] text-white">
                <Zap className="w-5 h-5" />
                {t('headingEfficient')}
              </span>
              {t('headingPart5')}
            </div>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              className="bg-[#22d3ee] text-black hover:bg-[#22d3ee]/90 text-lg px-4 py-3 h-auto font-semibold"
            >
              {t('button')}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.dl 
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { icon: Users, value: t('stats.users'), label: t('stats.usersLabel') },
              { icon: Image, value: t('stats.assets'), label: t('stats.assetsLabel') },
              { icon: Star, value: t('stats.satisfaction'), label: t('stats.satisfactionLabel') },
            ].map((stat) => (
              <motion.div 
                key={stat.label}
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="h-6 w-6 text-[#22d3ee] mb-2" />
                <dt className="text-3xl font-bold tracking-tight text-black">{stat.value}</dt>
                <dd className="text-sm text-gray-600">{stat.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  )
}
