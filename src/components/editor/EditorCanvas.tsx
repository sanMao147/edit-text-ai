'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import type { SelectionBox } from '@/types/editor';
import { useEditorStore } from '@/stores/editor-store';

export default function EditorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const originalImageUrl = useEditorStore((s) => s.originalImageUrl);
  const selectionBox = useEditorStore((s) => s.selectionBox);
  const setSelectionBox = useEditorStore((s) => s.setSelectionBox);
  const editMode = useEditorStore((s) => s.editMode);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Load and draw image
  useEffect(() => {
    if (!originalImageUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const maxWidth = 600;
      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setImageLoaded(true);
    };
    img.src = originalImageUrl;

    return () => {
      img.onload = null;
    };
  }, [originalImageUrl]);

  // Draw selection box
  useEffect(() => {
    if (!canvasRef.current || !imageLoaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Redraw image
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw selection box
      if (selectionBox) {
        ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.fillRect(
          selectionBox.x,
          selectionBox.y,
          selectionBox.width,
          selectionBox.height,
        );

        ctx.strokeStyle = '#6366F1';
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.strokeRect(
          selectionBox.x,
          selectionBox.y,
          selectionBox.width,
          selectionBox.height,
        );

        // Draw corner handles
        const handles = [
          { x: selectionBox.x, y: selectionBox.y },
          { x: selectionBox.x + selectionBox.width, y: selectionBox.y },
          { x: selectionBox.x, y: selectionBox.y + selectionBox.height },
          {
            x: selectionBox.x + selectionBox.width,
            y: selectionBox.y + selectionBox.height,
          },
        ];
        handles.forEach((h) => {
          ctx.fillStyle = '#6366F1';
          ctx.fillRect(h.x - 4, h.y - 4, 8, 8);
        });
      }
    };
    if (originalImageUrl) img.src = originalImageUrl;
  }, [selectionBox, imageLoaded, originalImageUrl]);

  const getCanvasPos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    [],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (editMode === 'delete' || editMode === 'recolor') {
        setIsDrawing(true);
        const pos = getCanvasPos(e);
        setStartPos(pos);
        setSelectionBox({ x: pos.x, y: pos.y, width: 0, height: 0 });
      }
    },
    [editMode, getCanvasPos, setSelectionBox],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      const pos = getCanvasPos(e);
      setSelectionBox({
        x: Math.min(startPos.x, pos.x),
        y: Math.min(startPos.y, pos.y),
        width: Math.abs(pos.x - startPos.x),
        height: Math.abs(pos.y - startPos.y),
      });
    },
    [isDrawing, startPos, getCanvasPos, setSelectionBox],
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  if (!originalImageUrl) return null;

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center rounded-xl border border-surface-800 bg-surface-900/50 p-4"
    >
      <canvas
        ref={canvasRef}
        className="max-w-full rounded-lg"
        style={{ cursor: editMode === 'delete' ? 'crosshair' : 'default' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
