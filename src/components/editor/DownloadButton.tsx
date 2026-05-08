'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, Check } from 'lucide-react';
import { useEditorStore } from '@/stores/editor-store';

export default function DownloadButton() {
  const t = useTranslations('editor.result');
  const editedImageUrl = useEditorStore((s) => s.editedImageUrl);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = async () => {
    if (!editedImageUrl) return;

    try {
      const response = await fetch(editedImageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch {
      // Fallback: open in new tab
      window.open(editedImageUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary-500/25"
      >
        <Download className="h-5 w-5" />
        {t('download')}
      </button>

      {showSuccess && (
        <div className="flex animate-in fade-in items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          <Check className="h-4 w-4" />
          <span>{t('success')}</span>
        </div>
      )}
    </div>
  );
}
