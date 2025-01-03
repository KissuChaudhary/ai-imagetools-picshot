import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import CallToAction from "@/components/CallToAction";
import { AIToolsSection } from '@/components/AIToolsSection';
import { FAQSection } from '@/components/FAQSection';
import WhoCanUse from '@/components/WhoCanUse';


export default async function Page() {
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
        <WhoCanUse />
        <FAQSection />
        <CallToAction />
      </main>
    </div>
  );
}

