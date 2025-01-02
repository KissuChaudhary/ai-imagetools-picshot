import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { CallToAction } from '@/components/CallToAction';
import { AIToolsSection } from '@/components/AIToolsSection';
import { setRequestLocale } from 'next-intl/server';

export default async function Page({
  params
}: {
  params: {locale: string}
}) {
  setRequestLocale(params.locale);
  
  return <HomeContent />;
}

function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          <HeroSection />
        </Suspense>
        <AIToolsSection />
        <WhyChooseUs />
        <CallToAction />
      </main>
    </div>
  );
}
