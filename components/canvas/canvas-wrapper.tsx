"use client";

import { ResponsiveStage } from "./responsive-stage";
import { ImageLayer } from "./image-layer";
import { ShapeLayer } from "./shape-layer";
import { Layer } from "react-konva";
import { Shape } from "@/lib/types/shapes";
import { useState } from "react";

interface CanvasWrapperProps {
  shapes: Shape[];
  selectedId?: string;
  currentImage?: string;
  onShapeUpdate: (shape: Shape) => void;
  onShapeClick: (shape: Shape) => void;
}

export function CanvasWrapper({
  shapes,
  selectedId,
  currentImage,
  onShapeUpdate,
  onShapeClick,
}: CanvasWrapperProps) {
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleStageResize = (width: number, height: number) => {
    setStageDimensions({ width, height });
  };

  return (
    <ResponsiveStage onResize={handleStageResize}>
      <Layer>
        <ImageLayer
          imageUrl={currentImage}
          stageWidth={stageDimensions.width}
          stageHeight={stageDimensions.height}
        />
      </Layer>
      <Layer>
        <ShapeLayer
          shapes={shapes}
          selectedId={selectedId}
          onShapeUpdate={onShapeUpdate}
          onShapeClick={onShapeClick}
        />
      </Layer>
    </ResponsiveStage>
  );
}
