'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

export default function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="space-y-3">
          {faqKeys.map((key, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={key}
                className="overflow-hidden rounded-xl border border-surface-800 bg-surface-900/30 transition-colors hover:border-surface-700"
              >
                <button
                  className="flex w-full items-center justify-between p-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="pr-4 text-base font-medium text-white">
                    {t(`${key}`)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-surface-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="border-t border-surface-800 px-5 py-4 text-sm leading-relaxed text-surface-400">
                    {t(`a${index + 1}`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
