'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Logo } from './logo'


const LocaleSwitcher = dynamic(() => import("./locale-switcher"), { ssr: false })

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('Header')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      { threshold: [1] }
    )

    const target = document.createElement('div')
    target.style.height = '1px'
    target.style.position = 'absolute'
    target.style.top = '0'
    target.style.left = '0'
    target.style.right = '0'
    document.body.prepend(target)

    observer.observe(target)

    return () => {
      observer.disconnect()
      target.remove()
    }
  }, [])

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), [])

  const navItems = useMemo(() => [
    { href: '/tools/ai-image-generator', label: t('AIimageGenerator') },
    { href: '/tools/ai-background-remover', label: t('removeBg') },
    { href: '/tools/ai-image-upscaler', label: t('upscaler') },
    { href: '/tools/ai-photo-colorizer', label: t('colorize') },
    { href: '/tools/ai-photo-restorer', label: t('restorer') },
    { href: '/tools/ai-image-enhancer', label: t('enhance') },
    { href: '/tools/ai-image-caption-generator', label: t('captionGenerator') },
    { href: '/tools/image-to-text-converter', label: t('imageToText') },
  ], [t])

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-transparent px-4 py-1 mt-2' 
          : 'bg-[#0B0F17]'
      }`}
    >
      <div className={`max-w-7xl mx-auto flex items-center ${
        isScrolled 
          ? 'bg-[#0B0F17] backdrop-blur-md shadow-sm rounded-lg px-6 h-14' 
          : 'px-4 h-16'
      }`}>
        <nav className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="flex text-lg items-center gap-2 font-semibold transition-colors duration-300 text-white"
          >
            <Logo />
            {t('title')}
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <HeadlessMenu as="div" className="relative inline-block text-left">
              <div>
                <HeadlessMenu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  {t('allTools')}
                  <ChevronDown
                    className="ml-2 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </HeadlessMenu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-[#0B0F17] shadow-lg ring-1 ring-gray-700 ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    {navItems.map((item) => (
                      <HeadlessMenu.Item key={item.href}>
                        {({ active }) => (
                          <Link
                            href={item.href}
                            className={`${
                              active ? 'bg-gray-800 text-white' : 'text-gray-300'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-800 hover:text-white`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </HeadlessMenu.Item>
                    ))}
                  </div>
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>
            <LocaleSwitcher />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <LocaleSwitcher />
            <button 
              className="transition-colors duration-300 text-white"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div
            className="md:hidden absolute top-14 left-0 right-0 rounded-lg mt-2 border-t bg-[#0B0F17] backdrop-blur-md shadow-sm bg-transparent border-gray-800 transition-all duration-300 ease-in-out"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3 px-4 text-sm transition-colors duration-300 ${
                  pathname.includes(item.href)
                    ? 'text-white font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

