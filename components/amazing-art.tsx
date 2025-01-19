'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Check, ArrowUpRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function AmazingArt() {
  const t = useTranslations('Index.amazingArt')
  
  const features = [
    [t('features.aiPoweredCreativity'), t('features.customizableParameters')],
    [t('features.speedEfficiency'), t('features.flexibleUsage')],
    [t('features.costEfficiency'), t('features.userFriendly')],
  ]

  const images = [
    "/hero-images/image1.webp",
    "/hero-images/image2.webp",
    "/hero-images/image3.webp",
    "/hero-images/image4.webp",
    "/hero-images/image5.webp",
    "/hero-images/image6.webp",
  ]

  return (
    <section className="bg-[#0B0F17] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              {t('subtitle')}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10">
              {features.map(([left, right], index) => (
                <motion.div 
                  key={index}
                  className="col-span-2 grid grid-cols-2 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22d3ee]/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#22d3ee]" />
                    </div>
                    <span className="text-gray-300">{left}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22d3ee]/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#22d3ee]" />
                    </div>
                    <span className="text-gray-300">{right}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button 
              size="lg"
              className="bg-[#22d3ee] text-black hover:bg-[#22d3ee]/90 group w-full sm:w-auto"
            >
              {t('button')}
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-[#1A1F2D] rounded-2xl p-4 sm:p-6 relative">
              {/* Browser Dots */}
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
              </div>

              {/* Modern Asymmetric Grid */}
              <div className="grid grid-cols-6 gap-3">
                {/* Large Feature Image */}
                <motion.div
                  className="col-span-4 row-span-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative rounded-xl overflow-hidden" style={{ paddingTop: '100%' }}>
                    <Image
                      src={images[0] || "/placeholder.svg"}
                      alt="AI Generated Art 1"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      priority
                    />
                  
                  </div>
                </motion.div>

                {/* Right Column Small Images */}
                <motion.div
                  className="col-span-2 space-y-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {[1, 2].map((index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden" style={{ paddingTop: '100%' }}>
                      <Image
                        src={images[index] || "/placeholder.svg"}
                        alt={`AI Generated Art ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </motion.div>

                {/* Bottom Row */}
                <motion.div
                  className="col-span-6 grid grid-cols-3 gap-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {[3, 4, 5].map((index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden" style={{ paddingTop: '100%' }}>
                      <Image
                        src={images[index] || "/placeholder.svg"}
                        alt={`AI Generated Art ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 33vw, 16.67vw"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#22d3ee]/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-30"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

