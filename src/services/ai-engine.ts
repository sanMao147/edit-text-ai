import type { EditParams, ProgressCallback, EditResult } from '@/types/editor';

/**
 * AI 引擎抽象接口
 * MockAiEngine 和后续的 RealAiEngine 都实现此接口
 */
export interface AiEngine {
  /**
   * 执行图片文字编辑
   * @param imageFile 原始图片文件
   * @param params 编辑参数
   * @param onProgress 进度回调
   * @returns 编辑结果
   */
  edit(
    imageFile: File,
    params: EditParams,
    onProgress?: ProgressCallback,
  ): Promise<EditResult>;

  /**
   * 引擎名称
   */
  readonly name: string;
}
