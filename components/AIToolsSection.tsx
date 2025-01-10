'use client'

import React from 'react';
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImageIcon, Eraser, Maximize, Palette, History, Sparkles, UserCircle, SwitchCameraIcon as Switch, User, XCircle } from 'lucide-react'

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
    id: 'avatar-generator',
    title: 'AI Image Caption Generator',
    description: 'Create personalized avatars using advanced AI algorithms.',
    icon: <UserCircle className="w-8 h-8" />,
    glowColor: 'from-pink-500',
    href: '/tools/ai-image-caption-generator',
  },
  {
    id: 'face-swap',
    title: 'AI Image to Text Converter',
    description: 'Seamlessly swap faces in photos with AI precision.',
    icon: <Switch className="w-8 h-8" />,
    glowColor: 'from-orange-500',
    href: '/tools/image-to-text-converter',
  },
  {
    id: 'headshot-generator',
    title: 'Headshot Generator',
    description: 'Generate professional headshots with AI technology.',
    icon: <User className="w-8 h-8" />,
    glowColor: 'from-teal-500',
    href: '/tools/headshot-generator',
  },
  {
    id: 'object-remover',
    title: 'Object Remover',
    description: 'Remove unwanted objects from photos with intelligent AI filling.',
    icon: <XCircle className="w-8 h-8" />,
    glowColor: 'from-cyan-500',
    href: '/tools/object-remover',
  },
]

export function AIToolsSection() {
  const t = useTranslations('Index.aiTools')

  return (
    <section className="w-full py-8 md:py-24 lg:py-32 bg-black">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-5xl text-white">
          <span className="text-cyan-400">{t('title')}</span> {t('titleHighlight1')}
          </h2>
          <p className="max-w-[900px] text-sm sm:text-base text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t('description')}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href} className="block">
              <Card className="relative h-full overflow-hidden border-0 bg-zinc-900/50 backdrop-blur-sm transition-all hover:scale-70 hover:-translate-y-1">
                <div
                  className={`absolute inset-0 opacity-10 bg-gradient-to-br ${tool.glowColor} to-transparent`}
                />
                <div
                  className={`absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-gradient-to-br ${tool.glowColor} to-transparent`}
                />
                <CardContent className="p-3 sm:p-6 flex flex-col space-y-2 sm:space-y-4">
                  <div className={`p-1.5 sm:p-2 w-fit rounded-lg bg-gradient-to-br ${tool.glowColor} to-transparent`}>
                    {React.cloneElement(tool.icon as React.ReactElement, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                  </div>
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

