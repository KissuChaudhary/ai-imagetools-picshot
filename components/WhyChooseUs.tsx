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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
        >
          {t('title')}
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map(({ icon: Icon, key }) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="group"
            >
              <div className="relative p-6 bg-card rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-lg border border-border">
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <Icon className="w-12 h-12 mb-4 text-primary group-hover:text-secondary transition-colors duration-300" />
                <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {t(`features.${key}.title`)}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {t(`features.${key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

