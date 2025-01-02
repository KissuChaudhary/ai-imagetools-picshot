'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function CallToAction() {
  const t = useTranslations('Index.cta')

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/patterns/cta-background.svg"
          alt="Background pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Small decorative dot pattern */}
          <div className="absolute -left-8 -top-8 h-16 w-16" aria-hidden="true">
            {[...Array(9)].map((_, i) => (
              <motion.div 
                key={i} 
                className={`absolute h-1.5 w-1.5 rounded-full bg-indigo-300
                  ${i % 3 === 0 ? 'left-0' : i % 3 === 1 ? 'left-6' : 'left-12'}
                  ${Math.floor(i / 3) === 0 ? 'top-0' : Math.floor(i / 3) === 1 ? 'top-6' : 'top-12'}`
                }
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            ))}
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <motion.h2 
              className="text-3xl font-semibold tracking-tight sm:text-4xl text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('title')}
            </motion.h2>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('subtitle')}
            </motion.p>
            <motion.div 
              className="mt-10 flex items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button size="lg" className="group bg-indigo-600 hover:bg-indigo-700 text-white">
                {t('button')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                {t('secondaryButton')}
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.dl 
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { value: t('stats.users'), label: t('stats.usersLabel') },
              { value: t('stats.assets'), label: t('stats.assetsLabel') },
              { value: t('stats.satisfaction'), label: t('stats.satisfactionLabel') },
            ].map((stat) => (
              <motion.div 
                key={stat.label} 
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <dt className="text-4xl font-semibold tracking-tight text-indigo-600">{stat.value}</dt>
                <dd className="text-sm text-gray-600">{stat.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  )
}

