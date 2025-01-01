'use client'

import { useState } from 'react'
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import LocaleSwitcher from "./locale-switcher"
import { Dictionary } from "@/lib/dictionary"

type HeaderProps = {
  dict: Dictionary['Header']
  lang: string
}

export function Header({ dict, lang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href={`/${lang}`} className="text-xl font-bold">
            AI Image Tools
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href={`/${lang}/colorize`} className="text-sm hover:text-blue-600">{dict.colorize}</Link>
            <Link href={`/${lang}/enhance`} className="text-sm hover:text-blue-600">{dict.enhance}</Link>
            <Link href={`/${lang}/remove-bg`} className="text-sm hover:text-blue-600">{dict.removeBg}</Link>
            <LocaleSwitcher />
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link href={`/${lang}/colorize`} className="block py-2 hover:text-blue-600" onClick={toggleMenu}>
                  {dict.colorize}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/enhance`} className="block py-2 hover:text-blue-600" onClick={toggleMenu}>
                  {dict.enhance}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/remove-bg`} className="block py-2 hover:text-blue-600" onClick={toggleMenu}>
                  {dict.removeBg}
                </Link>
              </li>
              <li className="pt-2">
                <LocaleSwitcher />
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

