'use client';

import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-surface-800 bg-surface-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary-500 to-primary-600 text-xs font-bold text-white">
            E
          </span>
          <span className="text-sm text-surface-500">
            {t('copyright')}
          </span>
        </div>
        <a
          href="mailto:contact@edittextai.com"
          className="flex items-center gap-2 text-sm text-surface-400 transition-colors hover:text-white"
        >
          <Mail className="h-4 w-4" />
          {t('contact')}
        </a>
      </div>
    </footer>
  );
}
