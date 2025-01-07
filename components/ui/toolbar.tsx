// components/ui/toolbar.tsx
"use client";
import { Button } from "@/components/ui/button";
import { ShapeType } from "@/lib/types/shapes";
import { Circle, Download, Square, Upload, Pencil } from "lucide-react";

interface ToolbarProps {
  onAddShape: (type: ShapeType) => void;
  onExport: () => void;
  onImport: () => void;
  hasImage: boolean;
  isDrawing: boolean;
  startDrawing: () => void;
  stopDrawing: () => void;
  clearDrawingPoints: () => void;
}

export function Toolbar({
  onAddShape,
  onExport,
  onImport,
  hasImage,
  isDrawing,
  startDrawing,
  stopDrawing,
  clearDrawingPoints,
}: ToolbarProps) {
  const handleDrawingClick = () => {
    if (isDrawing) {
      stopDrawing();
      clearDrawingPoints();
    } else {
      startDrawing();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-b">
      <div className="flex items-center gap-2 mr-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onAddShape("rectangle")}
          disabled={!hasImage || isDrawing}
          title="Add Rectangle"
        >
          <Square className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onAddShape("circle")}
          disabled={!hasImage || isDrawing}
          title="Add Circle"
        >
          <Circle className="w-4 h-4" />
        </Button>
        <Button
          variant={isDrawing ? "secondary" : "outline"}
          size="icon"
          onClick={handleDrawingClick}
          disabled={!hasImage}
          title={isDrawing ? "Stop Drawing" : "Start Drawing"}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onExport}
          disabled={!hasImage}
          title="Export Shapes"
        >
          <Download className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onImport}
          title="Import Shapes"
        >
          <Upload className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
