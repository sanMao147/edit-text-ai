'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('home');

  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-24">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-surface-950" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-20 md:flex-row md:pt-32">
        {/* 左侧文字 */}
        <div className="flex-1 text-center md:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-surface-400">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary-500/25"
            >
              {t('hero.cta')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* 右侧 Before/After 占位 */}
        <div className="mt-12 flex-1 md:mt-0 md:pl-12">
          <div className="relative overflow-hidden rounded-2xl border border-surface-800 bg-surface-900/50 backdrop-blur-sm">
            <div className="aspect-[4/3] flex items-center justify-center p-8">
              <div className="text-center">
                <div className="mb-4 flex justify-center gap-4">
                  <div className="rounded-lg bg-surface-800 px-4 py-2">
                    <p className="text-xs text-surface-500">Before</p>
                    <div className="mt-1 h-24 w-32 rounded bg-surface-700" />
                  </div>
                  <div className="rounded-lg bg-surface-800 px-4 py-2">
                    <p className="text-xs text-surface-500">After</p>
                    <div className="mt-1 h-24 w-32 rounded bg-gradient-to-br from-primary-500/30 to-primary-600/30" />
                  </div>
                </div>
                <p className="text-sm text-surface-500">
                  Upload an image to see the magic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
