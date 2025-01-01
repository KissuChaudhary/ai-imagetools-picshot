'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Hero() {
  const t = useTranslations('Index.hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 text-primary leading-tight">
              {t('title')}
            </h1>
            <p className="text-xl mb-8 text-foreground opacity-80">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                {t('cta1')}
              </Button>
              <Button 
                variant="outline" 
                className="bg-white hover:bg-secondary/10 text-primary hover:text-secondary font-semibold py-3 px-6 border-2 border-primary hover:border-secondary rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                {t('cta2')}
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <Image
                src="/hero-image.png"
                alt="AI Image Enhancement"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
              <p className="font-bold text-primary text-2xl">AI-Powered</p>
              <p className="text-foreground">Image Enhancement</p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <svg className="absolute left-0 bottom-0 h-full w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" fillOpacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  )
}

