"use client";

import {
  Zap,
  Maximize,
  MousePointer,
  DollarSign,
  Upload,
  Sliders,
  Download,
  Camera,
  ShoppingBag,
  Share2,
  PieChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestimonialsSection } from "@/components/testimonials";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

const features = [
  {
    icon: Maximize,
    color: "text-blue-500",
    titleKey: "features.smartRecognition.title",
    descriptionKey: "features.smartRecognition.description",
  },
  {
    icon: Zap,
    color: "text-yellow-500",
    titleKey: "features.multiFormatSupport.title",
    descriptionKey: "features.multiFormatSupport.description",
  },
  {
    icon: MousePointer,
    color: "text-green-500",
    titleKey: "features.freeToUse.title",
    descriptionKey: "features.freeToUse.description",
  },
  {
    icon: DollarSign,
    color: "text-purple-500",
    titleKey: "features.fastResults.title",
    descriptionKey: "features.fastResults.description",
  },
];

const steps = [
  {
    icon: Upload,
    titleKey: "steps.upload.title",
    descriptionKey: "steps.upload.description",
  },
  {
    icon: Sliders,
    titleKey: "steps.generate.title",
    descriptionKey: "steps.generate.description",
  },
  {
    icon: Download,
    titleKey: "steps.copy.title",
    descriptionKey: "steps.copy.description",
  },
];

const useCases = [
  {
    icon: Camera,
    titleKey: "useCases.documentScanning.title",
    descriptionKey: "useCases.documentScanning.description",
  },
  {
    icon: ShoppingBag,
    titleKey: "useCases.photoNotes.title",
    descriptionKey: "useCases.photoNotes.description",
  },
  {
    icon: Share2,
    titleKey: "useCases.handwrittenText.title",
    descriptionKey: "useCases.handwrittenText.description",
  },
  {
    icon: PieChart,
    titleKey: "useCases.businessDataEntry.title",
    descriptionKey: "useCases.businessDataEntry.description",
  },
];

export default function ImageToTextContent() {
  const t = useTranslations("Index.ImageTextConverterContent");

  return (
    <div className="bg-background text-foreground">
      <section className="bg-black text-white mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl px-4 flex flex-col mx-auto justify-center lg:flex-row lg:items-center lg:space-x-8">
        
          <div className="max-w-7xl ">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              {t("heroTitle")}
            </h1>
            <div className="space-y-4">
              <p>{t("heroParagraph1")}</p>
              <p>{t("heroParagraph2")}</p>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("featuresTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <div className="bg-background rounded-lg p-3">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <span>{t(feature.titleKey)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t(feature.descriptionKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("stepsTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="bg-primary/10 rounded-full p-4 mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{t(step.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{t(step.descriptionKey)}</p>
                
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("useCasesTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="bg-background text-foreground">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center space-y-4">
                    <div className="bg-primary/10 rounded-full p-4">
                      <useCase.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-center">{t(useCase.titleKey)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">{t(useCase.descriptionKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">
            {t("captionGenerationTitle")}
          </h2>
          <div className="space-y-6">
            <p>{t("captionGenerationParagraph1")}</p>
            <p>{t("captionGenerationParagraph2")}</p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-8">
            {t("benefitsTitle")}
          </h2>
          <div className="space-y-6 ">
            <p>{t("benefitsParagraph")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {["benefit1", "benefit2", "benefit3", "benefit4"].map(
                (key, index) => (
                  <li key={index}>{t(`benefits.${key}`)}</li>
                )
              )}
            </ul>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-8">
            {t("misconceptionsTitle")}
          </h2>
          <div className="space-y-6 ">
            <p>{t("misconceptionsParagraph1")}</p>
            <p>{t("misconceptionsParagraph2")}</p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-8">
            {t("whyChooseTitle")}
          </h2>
          <div className="space-y-6">
            <p>{t("whyChooseParagraph1")}</p>
            <ul className="list-disc pl-6 space-y-2">
              {["reason1", "reason2", "reason3"].map((key, index) => (
                <li key={index}>{t(`whyChoose.${key}`)}</li>
              ))}
            </ul>
            <p>{t("whyChooseParagraph2")}</p>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("faqTitle")}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {Array.from({ length: 10 }).map((_, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>
                  {t(`faq.${index}.question`)}
                </AccordionTrigger>
                <AccordionContent>{t(`faq.${index}.answer`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
