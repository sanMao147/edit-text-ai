'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { Languages } from 'lucide-react';

const locales = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const currentLocale = (params?.locale as string) || 'en';

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm text-surface-300 transition-colors hover:border-primary-500 hover:text-white"
        aria-label="Switch language"
      >
        <Languages className="h-4 w-4" />
        <span>{locales.find((l) => l.code === currentLocale)?.label}</span>
      </button>
      <div className="absolute right-0 top-full z-50 mt-1 hidden min-w-[120px] rounded-lg border border-surface-700 bg-surface-800 py-1 shadow-xl group-hover:block">
        {locales.map((locale) => (
          <button
            key={locale.code}
            disabled={isPending}
            className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-surface-700 ${
              locale.code === currentLocale
                ? 'text-primary-400'
                : 'text-surface-300'
            }`}
            onClick={() => {
              startTransition(() => {
                router.replace(pathname, { locale: locale.code });
              });
            }}
          >
            {locale.label}
          </button>
        ))}
      </div>
    </div>
  );
}
