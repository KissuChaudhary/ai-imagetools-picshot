'use client'

import { useTranslations } from 'next-intl'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { Zap, Award, Globe, HeadphonesIcon } from 'lucide-react'

const features = [
  { icon: Zap, key: 'fastImage' },
  { icon: Award, key: 'quality' },
  { icon: Globe, key: 'language' },
  { icon: HeadphonesIcon, key: 'support' }
]

export function WhyChooseUs() {
  const t = useTranslations('Index.whyChoose')
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <section className="py-24 bg-[#0B0F17] relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#22d3ee]/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-[#22d3ee] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map(({ icon: Icon, key }) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-[#1A1F2D] border border-gray-800 overflow-hidden transition-all duration-500 hover:border-[#22d3ee]/50">
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6 inline-block">
                    <div className="p-3 rounded-xl bg-[#22d3ee]/10 group-hover:bg-[#22d3ee]/20 transition-colors duration-500">
                      <Icon className="w-8 h-8 text-[#22d3ee]" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[#22d3ee] transition-colors duration-500">
                    {t(`features.${key}.title`)}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500 text-sm leading-relaxed">
                    {t(`features.${key}.description`)}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute -top-1 -right-1 w-16 h-16 bg-gradient-to-br from-[#22d3ee]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

