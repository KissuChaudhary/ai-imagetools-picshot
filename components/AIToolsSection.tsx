'use client'

import React from 'react';
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImageIcon, Eraser, Maximize, Palette, History, Sparkles, UserCircle, SwitchCameraIcon as Switch } from 'lucide-react'

interface Tool {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  glowColor: string
  href: string
}

const tools: Tool[] = [
  {
    id: 'image-generator',
    title: 'AI Image Generator',
    description: 'Create stunning, unique images from text descriptions with advanced AI technology.',
    icon: <ImageIcon className="w-8 h-8" />,
    glowColor: 'from-purple-500',
    href: '/tools/ai-image-generator',
  },
  {
    id: 'background-remover',
    title: 'Background Remover',
    description: 'Remove backgrounds from images instantly with precision and accuracy.',
    icon: <Eraser className="w-8 h-8" />,
    glowColor: 'from-blue-500',
    href: '/tools/ai-background-remover',
  },
  {
    id: 'image-upscaler',
    title: 'Image Upscaler',
    description: 'Enhance image resolution without losing quality using AI technology.',
    icon: <Maximize className="w-8 h-8" />,
    glowColor: 'from-green-500',
    href: '/tools/ai-image-upscaler',
  },
  {
    id: 'photo-colorizer',
    title: 'Photo Colorizer',
    description: 'Bring black and white photos to life with AI-powered colorization.',
    icon: <Palette className="w-8 h-8" />,
    glowColor: 'from-yellow-500',
    href: '/tools/ai-photo-colorizer',
  },
  {
    id: 'photo-restorer',
    title: 'Photo Restorer',
    description: 'Restore old and damaged photos to their former glory.',
    icon: <History className="w-8 h-8" />,
    glowColor: 'from-red-500',
    href: '/tools/ai-photo-restorer',
  },
  {
    id: 'image-enhancer',
    title: 'Image Enhancer',
    description: 'Automatically enhance your photos for professional-quality results.',
    icon: <Sparkles className="w-8 h-8" />,
    glowColor: 'from-indigo-500',
    href: '/tools/ai-image-enhancer',
  },
  {
    id: 'caption-generator',
    title: 'AI Image Caption Generator',
    description: 'Create personalized avatars using advanced AI algorithms.',
    icon: <UserCircle className="w-8 h-8" />,
    glowColor: 'from-pink-500',
    href: '/tools/ai-image-caption-generator',
  },
  {
    id: 'image-to-text',
    title: 'AI Image to Text Converter',
    description: 'Seamlessly swap faces in photos with AI precision.',
    icon: <Switch className="w-8 h-8" />,
    glowColor: 'from-orange-500',
    href: '/tools/image-to-text-converter',
  },
]

export function AIToolsSection() {
  const t = useTranslations('Index.aiTools')

  return (
    <section className="w-full py-8 md:py-24 lg:py-32 bg-black">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            <span className="text-cyan-400">{t('title')}</span> {t('titleHighlight1')}
          </h2>
          <p className="max-w-[900px] text-sm sm:text-base text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t('description')}
          </p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link href={tool.href} className="block">
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Card className="relative h-full overflow-hidden border-0 bg-zinc-900/50 backdrop-blur-sm">
                    <motion.div
                      className={`absolute inset-0 opacity-10 bg-gradient-to-br ${tool.glowColor} to-transparent`}
                    />
                    <CardContent className="p-3 sm:p-6 flex flex-col space-y-2 sm:space-y-4">
                      <motion.div 
                        className={`p-1.5 sm:p-2 w-fit rounded-lg bg-gradient-to-br ${tool.glowColor} to-transparent`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {React.cloneElement(tool.icon as React.ReactElement, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                      </motion.div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{t(`tools.${tool.id}.title`)}</h3>
                      <p className="text-sm sm:text-base text-zinc-400 line-clamp-3">{t(`tools.${tool.id}.description`)}</p>
                    </CardContent>
                    <CardFooter className="p-3 sm:p-6 pt-0">
                      <Button
                        variant="ghost"
                        className="w-full h-8 sm:h-10 text-sm bg-zinc-800/50 hover:bg-zinc-800 text-white"
                      >
                        {t('exploreMore')}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

