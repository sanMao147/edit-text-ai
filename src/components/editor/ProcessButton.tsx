'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, Sparkles } from 'lucide-react';
import { useEditorStore } from '@/stores/editor-store';

export default function ProcessButton() {
  const t = useTranslations('editor.process');
  const isProcessing = useEditorStore((s) => s.isProcessing);
  const progress = useEditorStore((s) => s.progress);
  const setProcessing = useEditorStore((s) => s.setProcessing);
  const setProgress = useEditorStore((s) => s.setProgress);
  const setEditedImage = useEditorStore((s) => s.setEditedImage);
  const setError = useEditorStore((s) => s.setError);
  const originalImageUrl = useEditorStore((s) => s.originalImageUrl);
  const [dots, setDots] = useState('');

  // Animated dots
  useEffect(() => {
    if (!isProcessing) {
      setDots('');
      return;
    }
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleProcess = async () => {
    if (!originalImageUrl) return;

    setProcessing(true);
    setProgress(0);

    // Simulate processing with progress
    const startTime = Date.now();
    const minDuration = 2000;
    const maxDuration = 4000;
    const duration =
      Math.random() * (maxDuration - minDuration) + minDuration;

    const simulateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 95);
      const easedProgress = Math.min(
        Math.floor(rawProgress * (1 + Math.sin(rawProgress * 0.05) * 0.1)),
        95,
      );
      setProgress(easedProgress);
    };

    const progressInterval = setInterval(simulateProgress, 100);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, duration));

    clearInterval(progressInterval);
    setProgress(100);

    // Mock result: reuse original image as "edited" result
    setTimeout(() => {
      setEditedImage(originalImageUrl);
      setProcessing(false);
    }, 300);
  };

  return (
    <button
      onClick={handleProcess}
      disabled={isProcessing || !originalImageUrl}
      className="w-full rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-primary-500/25 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isProcessing ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>
              {t('processing')}
              {dots}
            </span>
          </div>
          <div className="h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-surface-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-300 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-surface-400">{progress}%</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span>{t('button')}</span>
        </div>
      )}
    </button>
  );
}
