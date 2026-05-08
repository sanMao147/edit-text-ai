'use client';

import { useTranslations } from 'next-intl';
import { Brain, MousePointerClick, Zap, Globe } from 'lucide-react';

const advantages = [
  { key: 'aiPowered', icon: Brain },
  { key: 'easyToUse', icon: MousePointerClick },
  { key: 'fastEfficient', icon: Zap },
  { key: 'freeOnline', icon: Globe },
] as const;

export default function WhyChooseUs() {
  const t = useTranslations('whyChooseUs');

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group rounded-2xl border border-surface-800 bg-surface-900/30 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/30 hover:bg-surface-900/50"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-surface-800 transition-colors group-hover:bg-primary-500/10">
                <Icon className="h-7 w-7 text-primary-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-surface-400">
                {t(`${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
