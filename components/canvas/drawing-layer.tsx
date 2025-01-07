"use client";

import { Line, Circle } from "react-konva";
import { useShapeStore } from "@/lib/store/useShapeStore";
import { useEffect, useState, Fragment } from "react";
import { KonvaEventObject } from "konva/lib/Node";

interface DrawingLayerProps {
  onComplete: (points: number[]) => void;
}

export function DrawingLayer({ onComplete }: DrawingLayerProps) {
  const {
    isDrawing,
    drawingPoints,
    addDrawingPoint,
    stopDrawing,
    clearDrawingPoints,
  } = useShapeStore();
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    if (!isDrawing) {
      setMousePos(null);
      return;
    }

    const stage = document.querySelector("canvas")
      ?.parentElement as HTMLElement;
    if (!stage) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    stage.addEventListener("mousemove", handleMouseMove);
    return () => stage.removeEventListener("mousemove", handleMouseMove);
  }, [isDrawing]);

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const point = stage.getPointerPosition();
    if (!point) return;

    // Add the new point
    addDrawingPoint(point.x, point.y);

    // Check if we should complete the shape (at least 3 points and close to first point)
    if (drawingPoints.length >= 4) {
      // Already has 2+ points
      const [firstX, firstY] = drawingPoints;
      const distance = Math.sqrt(
        Math.pow(point.x - firstX, 2) + Math.pow(point.y - firstY, 2)
      );

      // If close to the first point, complete the shape
      if (distance < 20) {
        // Create the final points array with the closing point
        const finalPoints = [...drawingPoints, point.x, point.y];
        // Call onComplete before clearing the drawing state
        onComplete(finalPoints);
        // Then stop drawing and clear points
        stopDrawing();
        clearDrawingPoints();
      }
    }
  };

  if (!isDrawing) return null;

  return (
    <Fragment>
      {/* Draw the shape outline */}
      {drawingPoints.length >= 4 && (
        <Line
          points={drawingPoints}
          stroke="#00D2FF"
          strokeWidth={2}
          closed={false}
          fill={drawingPoints.length >= 6 ? "#00D2FF33" : undefined}
          opacity={0.8}
        />
      )}

      {/* Draw the points */}
      {drawingPoints.length > 0 &&
        drawingPoints.map((_, i) => {
          if (i % 2 === 0) {
            const isFirstPoint = i === 0;
            const distance =
              isFirstPoint && mousePos
                ? Math.sqrt(
                    Math.pow(mousePos.x - drawingPoints[i], 2) +
                      Math.pow(mousePos.y - drawingPoints[i + 1], 2)
                  )
                : Infinity;

            return (
              <Circle
                key={i}
                x={drawingPoints[i]}
                y={drawingPoints[i + 1]}
                radius={4}
                fill={
                  distance < 20
                    ? "#FF4444"
                    : isFirstPoint
                    ? "#4CAF50"
                    : "#00D2FF"
                }
                opacity={0.8}
              />
            );
          }
          return null;
        })}

      {/* Draw the preview line to cursor */}
      {drawingPoints.length >= 2 && mousePos && (
        <Line
          points={[
            drawingPoints[drawingPoints.length - 2],
            drawingPoints[drawingPoints.length - 1],
            mousePos.x,
            mousePos.y,
          ]}
          stroke="#00D2FF"
          strokeWidth={2}
          opacity={0.4}
          listening={false}
        />
      )}

      {/* Invisible layer to catch all clicks */}
      <Line
        points={[0, 0, window.innerWidth, window.innerHeight]}
        stroke="transparent"
        strokeWidth={window.innerWidth}
        onMouseDown={handleStageClick}
        listening={true}
      />
    </Fragment>
  );
}
