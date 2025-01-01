import { Suspense } from 'react';
import { Hero } from '@/components/Hero';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Features } from '@/components/Features';
import { CallToAction } from '@/components/CallToAction';
import { setRequestLocale } from 'next-intl/server';

export default async function Page({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <HomeContent />;
}

function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          <Hero />
        </Suspense>
        <WhyChooseUs />
        <Features />
        <CallToAction />
      </main>
    </div>
  );
}

