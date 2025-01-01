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
import {setRequestLocale} from 'next-intl/server';

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

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages(locale);

  if (!messages) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.className}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_CLIENT_ID"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background text-text">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">
              <Header dict={messages.Header} lang={locale} />
              <main className="flex-1">
                {children}
              </main>
              <Footer dict={messages.Footer} lang={locale} />
            </div>
          </ToastProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}

