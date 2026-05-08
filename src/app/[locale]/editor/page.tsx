'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useEditorStore } from '@/stores/editor-store';
import ImageUploader from '@/components/editor/ImageUploader';
import EditorCanvas from '@/components/editor/EditorCanvas';
import EditToolbar from '@/components/editor/EditToolbar';
import EditPanel from '@/components/editor/EditPanel';
import ProcessButton from '@/components/editor/ProcessButton';
import CompareView from '@/components/editor/CompareView';
import DownloadButton from '@/components/editor/DownloadButton';

export default function EditorPage() {
  const t = useTranslations('editor');
  const stage = useEditorStore((s) => s.stage);
  const reset = useEditorStore((s) => s.reset);

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Top bar */}
      <div className="mx-auto max-w-7xl px-6 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-surface-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToHome')}
        </Link>
      </div>

      {/* Upload stage */}
      {stage === 'upload' && <ImageUploader />}

      {/* Edit stage */}
      {stage === 'edit' && (
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* Left: Editor canvas */}
            <div>
              <EditorCanvas />
            </div>

            {/* Right: Controls */}
            <div className="space-y-4">
              <EditToolbar />
              <EditPanel />
              <ProcessButton />
            </div>
          </div>
        </div>
      )}

      {/* Result stage */}
      {stage === 'result' && (
        <div className="mx-auto max-w-3xl px-6">
          <CompareView />
          <div className="mt-8 flex items-center justify-center gap-4">
            <DownloadButton />
            <button
              onClick={reset}
              className="rounded-xl border border-surface-700 bg-surface-800/50 px-6 py-3.5 text-sm font-medium text-surface-300 transition-all duration-300 hover:border-surface-600 hover:text-white"
            >
              {t('result.editAgain')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
