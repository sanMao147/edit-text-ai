'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useEditorStore } from '@/stores/editor-store';

export default function CompareView() {
  const t = useTranslations('editor.result');
  const originalImageUrl = useEditorStore((s) => s.originalImageUrl);
  const editedImageUrl = useEditorStore((s) => s.editedImageUrl);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setSliderPos(Math.max(0, Math.min(100, x)));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!originalImageUrl || !editedImageUrl) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-8 text-sm">
        <span className="flex items-center gap-2 text-surface-300">
          <span className="h-2 w-2 rounded-full bg-primary-500" />
          {t('original')}
        </span>
        <span className="flex items-center gap-2 text-surface-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {t('edited')}
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto max-w-lg cursor-ew-resize overflow-hidden rounded-xl border border-surface-800"
        onMouseDown={handleMouseDown}
      >
        {/* Edited image (full) */}
        <img
          src={editedImageUrl}
          alt="Edited"
          className="block w-full select-none"
          draggable={false}
        />

        {/* Original image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden select-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={originalImageUrl}
            alt="Original"
            className="block w-full max-w-none select-none"
            style={{ width: `${100 / (sliderPos / 100)}%` }}
            draggable={false}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-surface-800"
            >
              <path
                d="M6 4L2 8L6 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 4L14 8L10 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
