'use client'

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function CallToAction() {
  const t = useTranslations('Index.cta');

  return (
    <section className="py-20 bg-navy text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p 
          className="text-xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('subtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button className="bg-terracotta hover:bg-terracotta-dark text-white font-bold py-3 px-6 rounded-full text-lg">
            {t('button')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

