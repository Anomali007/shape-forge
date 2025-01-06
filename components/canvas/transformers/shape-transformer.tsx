// components/canvas/transformers/shape-transformer.tsx
"use client";
import { useRef } from "react";
import { Transformer, Shape as KonvaShape } from "react-konva";
import { Shape as ShapeType } from "@/lib/types/shapes";
import type Konva from "konva";

interface ShapeTransformerProps {
  shape: ShapeType;
  isSelected: boolean;
  onChange: (shape: ShapeType) => void;
  onClick: () => void;
}

interface Overlay {
  id: string;
  color: string;
  opacity: number;
}

export const ShapeTransformer = ({
  shape,
  isSelected,
  onChange,
  onClick,
}: ShapeTransformerProps) => {
  const shapeRef = useRef<Konva.Shape | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);

  return (
    <>
      <KonvaShape
        ref={shapeRef}
        {...shape}
        onClick={onClick}
        sceneFunc={(context: Konva.Context, shape: Konva.Shape) => {
          context.beginPath();

          if (
            (shape.attrs.type === "polygon" || shape.attrs.type === "custom") &&
            Array.isArray(shape.attrs.points)
          ) {
            const points = shape.attrs.points;
            context.moveTo(points[0], points[1]);
            for (let i = 2; i < points.length; i += 2) {
              context.lineTo(points[i], points[i + 1]);
            }
          } else if (shape.attrs.type === "rectangle") {
            const { width = 0, height = 0 } = shape.attrs;
            context.rect(0, 0, width, height);
          } else if (shape.attrs.type === "circle") {
            const { radius = 0 } = shape.attrs;
            context.arc(0, 0, radius, 0, Math.PI * 2);
          }

          context.closePath();
          context.fillStrokeShape(shape);

          // Draw overlays if they exist
          const overlays = (shape.attrs as ShapeType).overlays;
          if (Array.isArray(overlays)) {
            overlays.forEach((overlay: Overlay) => {
              context.save();
              context.fillStyle = overlay.color;
              context.globalAlpha = overlay.opacity;
              context.fill();
              context.restore();
            });
          }
        }}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shape,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};
