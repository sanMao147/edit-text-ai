'use client';

import { useTranslations } from 'next-intl';
import { Upload, FileText, Download } from 'lucide-react';

const steps = ['step1', 'step2', 'step3'] as const;
const icons = [Upload, FileText, Download];

export default function HowToUse() {
  const t = useTranslations('howToUse');

  return (
    <section id="how-to-use" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-surface-400">
            Three simple steps to edit text in your images
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* 连接线 */}
          <div className="absolute top-12 left-[15%] right-[15%] hidden h-0.5 bg-gradient-to-r from-primary-500/40 via-primary-500 to-primary-500/40 md:block" />

          {steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <div key={step} className="relative text-center">
                {/* Step number */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20">
                  <span className="text-2xl font-bold text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="rounded-xl bg-surface-800 p-3">
                    <Icon className="h-6 w-6 text-primary-400" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {t(`${step}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-surface-400">
                  {t(`${step}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
