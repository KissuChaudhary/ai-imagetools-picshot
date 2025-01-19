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
import { Metadata, Viewport } from 'next'

const inter = Inter({ subsets: ["latin"] })

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'es'}, {locale: 'fr'}];
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index.Layout.metadata' });

  return {
    metadataBase: new URL('https://lexistock.com'),
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'LexiStock' }],
    creator: 'LexiStock',
    publisher: 'LexiStock',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: '/favicon-16x16.png',
        },
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
          color: '#5bbad5',
        },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: locale,
      alternateLocale: ['en', 'es', 'fr'].filter(l => l !== locale),
      url: 'https://lexistock.com',
      title: t('title'),
      description: t('description'),
      siteName: t('siteName'),
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/twitter-image.png'],
      creator: '@lexistock',
      site: '@lexistock',
    },
    verification: {
      google: 'EqsIGgrrtMrNtRauKOgeKufv6Z3dUBAaa48Fh6fhzS0',
      yandex: 'your-yandex-verification',
      other: {
        'msvalidate.01': 'your-bing-verification',
      },
    },
    category: 'technology',
    classification: 'AI Image Tools',
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black',
      'apple-mobile-web-app-title': t('title'),
      'format-detection': 'telephone=no',
      'msapplication-TileColor': '#ffffff',
      'msapplication-config': '/browserconfig.xml',
    }
  }
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

  const t = await getTranslations({ locale, namespace: 'Index.Layout.schema' });

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": t('name'),
    "description": t('description'),
    "url": `https://lexistock.com/${locale}`
  };

  return (
    <html lang={locale} className={`${inter.className}`} suppressHydrationWarning>
      <head>
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NES5QWSTPZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NES5QWSTPZ');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7915372771416695"
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

