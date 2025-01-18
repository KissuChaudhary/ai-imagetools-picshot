import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ToastProvider } from "@/components/ui/toast"
import "@/app/globals.css"
import {getMessages} from '@/lib/get-messages'
import {setRequestLocale, getTranslations} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] })

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'es'}, {locale: 'fr'}];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages(locale);

  if (!messages) {
    notFound();
  }

  const t = await getTranslations('WebsiteSchema');

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": t('name'),
    "description": t('description'),
    "url": `https://lexistock.com/${locale}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://lexistock.com/${locale}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang={locale} className={`${inter.className}`} suppressHydrationWarning>
      <head>
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_CLIENT_ID"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToastProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}

