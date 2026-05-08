'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslations } from 'next-intl';
import { Upload, ImageIcon } from 'lucide-react';
import { useEditorStore } from '@/stores/editor-store';
import { SUPPORTED_FORMATS, MAX_FILE_SIZE } from '@/lib/constants';

export default function ImageUploader() {
  const t = useTranslations('editor.upload');
  const setOriginalImage = useEditorStore((s) => s.setOriginalImage);
  const setError = useEditorStore((s) => s.setError);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds 4MB limit');
        return;
      }

      setOriginalImage(file);
    },
    [setOriginalImage, setError],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-8">
      <div
        {...getRootProps()}
        className={`w-full max-w-2xl cursor-pointer rounded-2xl border-2 border-dashed p-16 text-center transition-all duration-300 ${
          isDragActive
            ? 'border-primary-500 bg-primary-500/5'
            : 'border-surface-700 bg-surface-900/30 hover:border-surface-600 hover:bg-surface-900/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-800">
          {isDragActive ? (
            <Upload className="h-8 w-8 text-primary-400" />
          ) : (
            <ImageIcon className="h-8 w-8 text-surface-400" />
          )}
        </div>
        <p className="mb-2 text-lg font-medium text-white">
          {isDragActive ? t('title') : t('dragDrop')}
        </p>
        <p className="mb-6 text-sm text-surface-400">{t('browse')}</p>
        <p className="text-xs text-surface-500">{t('supportedFormats')}</p>
      </div>
    </div>
  );
}
