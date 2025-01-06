// components/canvas/drawing-tool.tsx
import { useState } from "react";

export const DrawingTool = ({
  onComplete,
}: {
  onComplete: (points: number[]) => void;
}) => {
  const [points, setPoints] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    setIsDrawing(true);
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setPoints([pos.x, pos.y]);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setPoints([...points, pos.x, pos.y]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    onComplete(points);
    setPoints([]);
  };

  return (
    <Line
      points={points}
      stroke="#000"
      strokeWidth={2}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};
