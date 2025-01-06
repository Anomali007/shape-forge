// components/canvas/shape-layer.tsx
import { Shape } from "@/lib/types/shapes";
import { ShapeTransformer } from "./transformers/shape-transformer";
import { Fragment } from "react";

interface ShapeLayerProps {
  shapes: Shape[];
  onShapeUpdate: (shape: Shape) => void;
  onShapeClick: (shape: Shape) => void;
  selectedId?: string;
}

export const ShapeLayer = ({
  shapes,
  onShapeUpdate,
  onShapeClick,
  selectedId,
}: ShapeLayerProps) => {
  return (
    <Fragment>
      {shapes.map((shape) => (
        <ShapeTransformer
          key={shape.id}
          shape={shape}
          isSelected={shape.id === selectedId}
          onChange={onShapeUpdate}
          onClick={() => onShapeClick(shape)}
        />
      ))}
    </Fragment>
  );
};
