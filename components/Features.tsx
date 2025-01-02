'use client'

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Wand2, ImageIcon, Eraser } from 'lucide-react';

export const Features = () => {
  const t = useTranslations('Index.features');

  const features = [
    { icon: Wand2, title: t('colorize'), description: t('colorizeDesc') },
    { icon: ImageIcon, title: t('enhance'), description: t('enhanceDesc') },
    { icon: Eraser, title: t('removeBg'), description: t('removeBgDesc') },
  ];

  return (
    <section className="py-20 bg-sage">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-navy">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-cream rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="w-12 h-12 text-terracotta mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-navy">{feature.title}</h3>
              <p className="text-terracotta">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

