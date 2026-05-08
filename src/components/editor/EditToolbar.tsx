'use client';

import { useTranslations } from 'next-intl';
import { Type, Plus, Eraser, Palette } from 'lucide-react';
import { useEditorStore } from '@/stores/editor-store';
import type { EditMode } from '@/types/editor';

const tabs: { mode: EditMode; icon: typeof Type }[] = [
  { mode: 'replace', icon: Type },
  { mode: 'add', icon: Plus },
  { mode: 'delete', icon: Eraser },
  { mode: 'recolor', icon: Palette },
];

export default function EditToolbar() {
  const t = useTranslations('editor.toolbar');
  const editMode = useEditorStore((s) => s.editMode);
  const setEditMode = useEditorStore((s) => s.setEditMode);

  return (
    <div className="flex gap-1 rounded-xl border border-surface-800 bg-surface-900/50 p-1">
      {tabs.map(({ mode, icon: Icon }) => (
        <button
          key={mode}
          onClick={() => setEditMode(mode)}
          className={`flex flex-1 flex-col items-center gap-1 rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-200 ${
            editMode === mode
              ? 'bg-primary-500/20 text-primary-300 shadow-sm'
              : 'text-surface-400 hover:bg-surface-800 hover:text-white'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span>{t(mode)}</span>
        </button>
      ))}
    </div>
  );
}
