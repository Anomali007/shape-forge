// components/canvas/shape-layer.tsx
"use client";

import { Fragment } from "react";
import { Shape } from "@/lib/types/shapes";
import { ShapeTransformer } from "./transformers/shape-transformer";

interface ShapeLayerProps {
  shapes: Shape[];
  selectedId?: string;
  onShapeUpdate: (shape: Shape) => void;
  onShapeClick: (id: string) => void;
}

export function ShapeLayer({
  shapes,
  selectedId,
  onShapeUpdate,
  onShapeClick,
}: ShapeLayerProps) {
  return (
    <Fragment>
      {shapes.map((shape) => (
        <ShapeTransformer
          key={shape.id}
          shape={shape}
          isSelected={shape.id === selectedId}
          onChange={onShapeUpdate}
          onClick={() => onShapeClick(shape.id)}
        />
      ))}
    </Fragment>
  );
}
