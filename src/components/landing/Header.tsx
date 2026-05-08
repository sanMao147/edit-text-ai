'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('header');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-surface-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-sm font-bold text-white">
            E
          </span>
          <span>EditTextAI</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm text-surface-400 transition-colors hover:text-white"
          >
            {t('features')}
          </Link>
          <Link
            href="/#how-to-use"
            className="text-sm text-surface-400 transition-colors hover:text-white"
          >
            {t('howToUse')}
          </Link>
          <Link
            href="/#faq"
            className="text-sm text-surface-400 transition-colors hover:text-white"
          >
            {t('faq')}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/editor"
            className="hidden rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary-500/25 md:inline-flex"
          >
            {t('getStarted')}
          </Link>
        </div>
      </div>
    </header>
  );
}
