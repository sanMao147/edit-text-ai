export const EDIT_MODE_LABELS = {
  replace: { en: 'Replace Text', zh: '替换文字' },
  add: { en: 'Add Text', zh: '添加文字' },
  delete: { en: 'Delete Text', zh: '删除文字' },
  recolor: { en: 'Change Color', zh: '更改颜色' },
} as const;

export const EDIT_MODE_ICONS = {
  replace: 'Replace',
  add: 'Plus',
  delete: 'Eraser',
  recolor: 'Palette',
} as const;

export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'] as const;

export const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'] as const;

export const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export const PRESET_COLORS = [
  '#FFFFFF',
  '#000000',
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#6366F1',
  '#EC4899',
] as const;

export const POSITION_OPTIONS = [
  { label: 'Top Left', value: 'top-left' },
  { label: 'Top Center', value: 'top-center' },
  { label: 'Top Right', value: 'top-right' },
  { label: 'Center Left', value: 'center-left' },
  { label: 'Center', value: 'center' },
  { label: 'Center Right', value: 'center-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Bottom Center', value: 'bottom-center' },
  { label: 'Bottom Right', value: 'bottom-right' },
] as const;

export const PROGRESS_INTERVAL_MS = 100;
export const PROGRESS_INCREMENT_MIN = 2;
export const PROGRESS_INCREMENT_MAX = 8;
export const MOCK_PROCESSING_TIME_MIN = 2000;
export const MOCK_PROCESSING_TIME_MAX = 4000;
