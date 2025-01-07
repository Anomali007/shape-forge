"use client";

import { Stage, Layer } from "react-konva";
import { Shape } from "@/lib/types/shapes";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

interface ImageLayerProps {
  imageUrl?: string;
  stageWidth: number;
  stageHeight: number;
}

interface ShapeLayerProps {
  shapes: Shape[];
  selectedId?: string;
  onShapeUpdate: (shape: Shape) => void;
  onShapeClick: (id: string) => void;
}

interface DrawingLayerProps {
  onComplete: (points: number[]) => void;
}

const ImageLayer = dynamic<ImageLayerProps>(
  () => import("./image-layer").then((mod) => mod.ImageLayer),
  { ssr: false }
);

const ShapeLayer = dynamic<ShapeLayerProps>(
  () => import("./shape-layer").then((mod) => mod.ShapeLayer),
  { ssr: false }
);

const DrawingLayer = dynamic<DrawingLayerProps>(
  () => import("./drawing-layer").then((mod) => mod.DrawingLayer),
  { ssr: false }
);

interface KonvaWrapperProps {
  shapes: Shape[];
  selectedId?: string;
  currentImage?: string;
  onShapeUpdate: (shape: Shape) => void;
  onShapeClick: (id: string) => void;
  onShapeAdd: (shape: Shape) => void;
}

export function KonvaWrapper({
  shapes,
  selectedId,
  currentImage,
  onShapeUpdate,
  onShapeClick,
  onShapeAdd,
}: KonvaWrapperProps) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector(".canvas-container");
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Stage
      width={dimensions.width}
      height={dimensions.height}
      className="border rounded-lg"
    >
      <Layer>
        <ImageLayer
          imageUrl={currentImage}
          stageWidth={dimensions.width}
          stageHeight={dimensions.height}
        />
        <ShapeLayer
          shapes={shapes}
          selectedId={selectedId}
          onShapeUpdate={onShapeUpdate}
          onShapeClick={onShapeClick}
        />
        <DrawingLayer
          onComplete={(points) => {
            onShapeAdd({
              id: crypto.randomUUID(),
              type: "polygon",
              points,
              x: 0,
              y: 0,
              fill: "#00D2FF",
              opacity: 0.5,
            } as Shape);
          }}
        />
      </Layer>
    </Stage>
  );
}
