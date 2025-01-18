import Link from "next/link"
import { useTranslations } from 'next-intl'
import { Mail } from 'lucide-react'
import { Logo } from "@/components/logo"

export function Footer() {
  const t = useTranslations('Footer')

  const tools = [
    { href: '/tools/ai-image-generator', label: t('AIimageGenerator') },
    { href: '/tools/ai-background-remover', label: t('removeBg') },
    { href: '/tools/ai-image-upscaler', label: t('upscaler') },
    { href: '/tools/ai-photo-colorizer', label: t('colorize') },
    { href: '/tools/ai-photo-restorer', label: t('restorer') },
    { href: '/tools/ai-image-enhancer', label: t('enhance') },
    { href: '/tools/ai-image-caption-generator', label: t('captionGenerator') },
    { href: '/tools/image-to-text-converter', label: t('imageToText') },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center mb-8">
          <Link 
            href="/" 
            className="flex text-lg items-center gap-2 font-semibold transition-colors duration-300 text-white mb-2"
          >
            <Logo />
            {t('title')}
          </Link>
          <p className="text-gray-400 text-sm text-center max-w-md">
            {t('siteDescription')}
          </p>
        </div>

        {/* Horizontal Navigation Links */}
        <div className="border-t border-gray-800 pt-8">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {tool.label}
              </Link>
            ))}
            <Link href="/policy" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
              {t('termsOfService')}
            </Link>
          </nav>
        </div>

        {/* Email (Centered) */}
        <div className="border-t border-gray-800 pt-8 flex justify-center">
          <a href="mailto:contact@lexistock.com" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4" />
            contact@lexistock.com
          </a>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
            <p className="text-gray-400 text-sm">
              {t('madeInIndia')} 💗
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
