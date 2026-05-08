'use client';

import { useTranslations } from 'next-intl';
import { Type, Plus, Eraser, Palette } from 'lucide-react';
import { Link } from '@/i18n/routing';

const features = [
  {
    key: 'replace',
    icon: Type,
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    key: 'add',
    icon: Plus,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    key: 'delete',
    icon: Eraser,
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    key: 'recolor',
    icon: Palette,
    gradient: 'from-amber-500 to-orange-500',
  },
] as const;

export default function FeatureCards() {
  const t = useTranslations('features');

  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Powerful Text Editing Features
          </h2>
          <p className="mt-4 text-lg text-surface-400">
            Everything you need to edit text in images
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ key, icon: Icon, gradient }) => (
            <Link
              key={key}
              href="/editor"
              className="group relative overflow-hidden rounded-2xl border border-surface-800 bg-surface-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-surface-700 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Icon */}
              <div
                className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${gradient} p-3`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-semibold text-white">
                {t(`${key}.title`)}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-surface-400">
                {t(`${key}.desc`)}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
