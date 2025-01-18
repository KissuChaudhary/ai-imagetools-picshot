'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'
import { Wand2, Image, Zap } from 'lucide-react'
import NextLink from 'next/link'

export default function CallToAction() {
  const t = useTranslations('Index.cta')
  
  return (
<section className="py-24 sm:py-32 bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden relative">
        {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#22d3ee" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white space-y-4">
            <div className="inline-flex flex-wrap items-center justify-center gap-3">
              {t('headingPart1')}
              <motion.span 
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0066FF] text-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Wand2 className="w-5 h-5" />
                {t('headingAIPowered')}
              </motion.span>
              {t('headingPart2')}
            </div>
            <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-2">
              {t('headingPart3')}
              <motion.span 
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#34C759] text-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image className="w-5 h-5" />
                {t('headingCreative')}
              </motion.span>
              {t('headingPart4')}
              <motion.span 
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF3B30] text-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Zap className="w-5 h-5" />
                {t('headingEfficient')}
              </motion.span>
              {t('headingPart5')}
            </div>
          </h2>
          
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <NextLink href="/tools/ai-image-enhancer" passHref>
              <Button 
                size="lg" 
                className="bg-[#22d3ee] text-black hover:bg-[#22d3ee]/90 text-lg px-4 py-2 h-auto font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#22d3ee]/50"
              >
                {t('button')}
              </Button>
            </NextLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
