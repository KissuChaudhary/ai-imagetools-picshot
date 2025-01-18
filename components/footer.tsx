import Link from "next/link"
import { useTranslations } from 'next-intl'

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
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-6">
            <h3 className="font-bold mb-6 text-xl text-white/90">{t('allTools')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-bold mb-6 text-xl text-white/90">{t('company')}</h3>
            <div className="space-y-4">
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                {t('about')}
              </Link>
              <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                {t('blog')}
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                {t('contact')}
              </Link>
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="font-bold mb-6 text-xl text-white/90">{t('legal')}</h3>
            <div className="space-y-4">
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                {t('privacyPolicy')}
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                {t('termsOfService')}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm order-2 md:order-1">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
            <p className="text-gray-400 text-sm order-1 md:order-2">
              {t('madeInIndia')} 💗
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
