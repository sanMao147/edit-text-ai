'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useEditorStore } from '@/stores/editor-store';
import { PRESET_COLORS } from '@/lib/constants';

export default function EditPanel() {
  const t = useTranslations('editor');
  const editMode = useEditorStore((s) => s.editMode);

  const [originalText, setOriginalText] = useState('');
  const [newText, setNewText] = useState('');
  const [addText, setAddText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6366F1');

  return (
    <div className="rounded-xl border border-surface-800 bg-surface-900/50 p-4">
      {/* 替换模式 */}
      {editMode === 'replace' && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-300">
              {t('replacePanel.originalText')}
            </label>
            <input
              type="text"
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="w-full rounded-lg border border-surface-700 bg-surface-800 px-3 py-2 text-sm text-white placeholder-surface-500 outline-none transition-colors focus:border-primary-500"
              placeholder="Hello"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-300">
              {t('replacePanel.newText')}
            </label>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full rounded-lg border border-surface-700 bg-surface-800 px-3 py-2 text-sm text-white placeholder-surface-500 outline-none transition-colors focus:border-primary-500"
              placeholder={t('replacePanel.placeholder')}
            />
          </div>
        </div>
      )}

      {/* 添加模式 */}
      {editMode === 'add' && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-300">
              {t('addPanel.enterText')}
            </label>
            <input
              type="text"
              value={addText}
              onChange={(e) => setAddText(e.target.value)}
              className="w-full rounded-lg border border-surface-700 bg-surface-800 px-3 py-2 text-sm text-white placeholder-surface-500 outline-none transition-colors focus:border-primary-500"
              placeholder={t('addPanel.placeholder')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-surface-300">
              {t('recolorPanel.chooseColor')}
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 w-8 rounded-lg border-2 transition-all ${
                    selectedColor === color
                      ? 'border-white scale-110'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 删除模式 */}
      {editMode === 'delete' && (
        <div className="py-4 text-center">
          <p className="text-sm text-surface-400">{t('deletePanel.hint')}</p>
        </div>
      )}

      {/* 改色模式 */}
      {editMode === 'recolor' && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-surface-300">
            {t('recolorPanel.chooseColor')}
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`h-8 w-8 rounded-lg border-2 transition-all ${
                  selectedColor === color
                    ? 'border-white scale-110'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
