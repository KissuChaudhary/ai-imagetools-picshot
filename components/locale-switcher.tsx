'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown } from 'lucide-react'

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  function onSelectChange(newLocale: string) {
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathnameWithoutLocale}`;
    router.push(newPath);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white">
          <Globe className="h-4 w-4 mr-1" />
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#0B0F17] border-gray-700">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onSelectChange(lang.code)}
            className="text-gray-300 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white"
          >
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
