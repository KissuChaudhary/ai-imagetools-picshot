'use client'

import { useState } from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import LocaleSwitcher from "./locale-switcher"
import { useTranslations } from 'next-intl'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('Header')

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { href: '/colorize', label: t('colorize') },
    { href: '/enhance', label: t('enhance') },
    { href: '/remove-bg', label: t('removeBg') },
  ]

  return (
    <header className="fixed w-full z-50 bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            {t('title')}
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`text-sm hover:text-white transition-colors ${pathname.includes(item.href) ? 'text-white font-semibold' : 'text-gray-400'}`}
              >
                {item.label}
              </Link>
            ))}
            <LocaleSwitcher />
          </div>

          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 py-4 bg-gray-900 rounded-lg shadow-lg"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 px-4 text-sm hover:bg-gray-700 ${pathname.includes(item.href) ? 'text-white font-semibold' : 'text-gray-400'}`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2">
              <LocaleSwitcher />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}
