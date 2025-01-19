'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

export default function AITools() {
  const t = useTranslations('Index.aiTool')
  
  const tools = [
    { key: 'backgroundRemover', link: '/tools/background-remover' },
    { key: 'photoColorizer', link: '/tools/photo-colorizer' },
    { key: 'photoEnhancer', link: '/tools/photo-enhancer' }
  ]

  // Helper function to safely get features array
  const getFeatures = (toolKey: string): string[] => {
    const features = t.raw(`${toolKey}.features`) as Array<{text: string}>
    return features.map(feature => feature.text)
  }

  return (
    <div className="w-full overflow-hidden bg-[#0B0F17]">
      {tools.map(({ key: tool, link }, index) => (
        <section key={tool} className="w-full py-16 sm:py-24 border-b border-gray-800 last:border-0">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="text-[#22d3ee] text-sm font-medium mb-4">
                  {t(`${tool}.category`)}
                </div>
                <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {t(`${tool}.title`)}
                </h2>
                <p className="text-2xl text-gray-400 mb-4">
                  {t(`${tool}.subtitle`)}
                </p>
                <p className="text-gray-400 mb-8">
                  {t(`${tool}.description`)}
                </p>

                <div className="space-y-4 mb-8">
                  {getFeatures(tool).map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <Link href={link}>
                  <Button 
                    size="lg"
                    className="bg-[#22d3ee] text-black hover:bg-[#22d3ee]/90 group"
                  >
                    {t(`${tool}.button`)}
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </Link>
              </motion.div>

              {/* Preview */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <div className="bg-[#1A1F2D] rounded-2xl p-4 sm:p-6 relative">
                  {/* Browser Dots */}
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                  </div>

                  {/* Tool Preview */}
                  <div className="relative rounded-xl overflow-hidden" style={{ paddingTop: '75%' }}>
                    <Image
                      src={`${tool === 'backgroundRemover' ? 'ai-bg.jpeg' : tool === 'photoColorizer' ? 'ai-colorize.jpeg' : 'ai-enhancer.jpeg'}`}
                      alt={t(`${tool}.title`)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#22d3ee]/20 via-[#22d3ee]/10 to-purple-500/20 blur-3xl opacity-30"></div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

