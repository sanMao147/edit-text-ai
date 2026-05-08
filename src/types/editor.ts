// 编辑模式类型
export type EditMode = 'replace' | 'add' | 'delete' | 'recolor';

// 文字选择区域
export interface SelectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

// 编辑器阶段
export type EditorStage = 'upload' | 'edit' | 'result';

// 替换参数
export interface ReplaceParams {
  originalText: string;
  newText: string;
}

// 添加参数
export interface AddParams {
  text: string;
  position: { x: number; y: number };
  color: string;
  fontSize: number;
}

// 删除参数
export interface DeleteParams {
  area: SelectionBox;
}

// 改色参数
export interface RecolorParams {
  color: string;
  area?: SelectionBox;
}

// 编辑参数联合类型
export type EditParams =
  | { type: 'replace' } & ReplaceParams
  | { type: 'add' } & AddParams
  | { type: 'delete' } & DeleteParams
  | { type: 'recolor' } & RecolorParams;

// AI 引擎处理结果
export interface EditResult {
  editedImageBase64: string;
  success: boolean;
  error?: string;
}

// AI 引擎进度回调
export interface ProgressCallback {
  (progress: number): void;
}

// 编辑器状态
export interface EditorState {
  stage: EditorStage;
  originalImage: File | null;
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  editMode: EditMode;
  selectionBox: SelectionBox | null;
  isProcessing: boolean;
  progress: number;
  showCompare: boolean;
  error: string | null;
}

// 编辑器操作
export interface EditorActions {
  setOriginalImage: (file: File) => void;
  setEditedImage: (url: string) => void;
  setEditMode: (mode: EditMode) => void;
  setSelectionBox: (box: SelectionBox | null) => void;
  setProcessing: (processing: boolean) => void;
  setProgress: (progress: number) => void;
  setShowCompare: (show: boolean) => void;
  setError: (error: string | null) => void;
  setStage: (stage: EditorStage) => void;
  reset: () => void;
}

// 多语言选项
export interface LanguageOption {
  code: string;
  label: string;
}
