import { create } from 'zustand';
import type {
  EditorState,
  EditorActions,
  EditMode,
  SelectionBox,
  EditorStage,
} from '@/types/editor';

type EditorStore = EditorState & EditorActions;

const initialState: EditorState = {
  stage: 'upload',
  originalImage: null,
  originalImageUrl: null,
  editedImageUrl: null,
  editMode: 'replace',
  selectionBox: null,
  isProcessing: false,
  progress: 0,
  showCompare: false,
  error: null,
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  ...initialState,

  setOriginalImage: (file: File) => {
    const url = URL.createObjectURL(file);
    // 清理旧的 URL
    if (get().originalImageUrl) {
      URL.revokeObjectURL(get().originalImageUrl!);
    }
    set({
      originalImage: file,
      originalImageUrl: url,
      stage: 'edit',
      error: null,
    });
  },

  setEditedImage: (url: string) => {
    set({ editedImageUrl: url, showCompare: true, stage: 'result' });
  },

  setEditMode: (mode: EditMode) => {
    set({ editMode: mode, selectionBox: null });
  },

  setSelectionBox: (box: SelectionBox | null) => {
    set({ selectionBox: box });
  },

  setProcessing: (processing: boolean) => {
    set({
      isProcessing: processing,
      progress: processing ? 0 : 100,
    });
  },

  setProgress: (progress: number) => {
    set({ progress });
  },

  setShowCompare: (show: boolean) => {
    set({ showCompare: show });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setStage: (stage: EditorStage) => {
    set({ stage });
  },

  reset: () => {
    // 清理 URL
    const state = get();
    if (state.originalImageUrl) {
      URL.revokeObjectURL(state.originalImageUrl);
    }
    if (state.editedImageUrl) {
      URL.revokeObjectURL(state.editedImageUrl);
    }
    set(initialState);
  },
}));
