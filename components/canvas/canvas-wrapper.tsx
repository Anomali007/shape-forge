"use client";

import { Shape } from "@/lib/types/shapes";
import dynamic from "next/dynamic";

const KonvaWrapper = dynamic(
  () => import("./konva-wrapper").then((mod) => mod.KonvaWrapper),
  {
    ssr: false,
  }
);

interface CanvasWrapperProps {
  shapes: Shape[];
  selectedId?: string;
  currentImage?: string;
  onShapeUpdate: (shape: Shape) => void;
  onShapeClick: (id: string) => void;
  onShapeAdd: (shape: Shape) => void;
}

export function CanvasWrapper({
  shapes,
  selectedId,
  currentImage,
  onShapeUpdate,
  onShapeClick,
  onShapeAdd,
}: CanvasWrapperProps) {
  return (
    <div className="canvas-container flex-1 min-h-0">
      <KonvaWrapper
        shapes={shapes}
        selectedId={selectedId}
        currentImage={currentImage}
        onShapeUpdate={onShapeUpdate}
        onShapeClick={onShapeClick}
        onShapeAdd={onShapeAdd}
      />
    </div>
  );
}
