import type { AiEngine } from './ai-engine';
import type { EditParams, EditResult, ProgressCallback } from '@/types/editor';
import {
  MOCK_PROCESSING_TIME_MIN,
  MOCK_PROCESSING_TIME_MAX,
} from '@/lib/constants';

/**
 * Mock AI 引擎 - 模拟文字编辑效果
 * 后续可替换为真实的 AI 引擎实现
 */
export class MockAiEngine implements AiEngine {
  readonly name = 'Mock AI Engine';

  async edit(
    imageFile: File,
    params: EditParams,
    onProgress?: ProgressCallback,
  ): Promise<EditResult> {
    const processingTime =
      Math.random() * (MOCK_PROCESSING_TIME_MAX - MOCK_PROCESSING_TIME_MIN) +
      MOCK_PROCESSING_TIME_MIN;

    const startTime = Date.now();

    return new Promise((resolve) => {
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / processingTime) * 100, 100);

        onProgress?.(Math.round(progress));

        if (progress >= 100) {
          // 返回图片 base64 作为结果
          this.imageToBase64(imageFile).then((base64) => {
            resolve({
              editedImageBase64: base64,
              success: true,
            });
          });
        } else {
          setTimeout(tick, 50);
        }
      };
      tick();
    });
  }

  private imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
