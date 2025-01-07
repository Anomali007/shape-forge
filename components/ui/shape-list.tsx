"use client";

import { Shape } from "@/lib/types/shapes";
import { Button } from "./button";
import { Circle, Square, Trash2, Pencil } from "lucide-react";

interface ShapeListProps {
  shapes: Shape[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ShapeList({
  shapes,
  selectedId,
  onSelect,
  onDelete,
}: ShapeListProps) {
  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">Shapes</h3>
      <div className="space-y-2">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`flex items-center justify-between p-2 rounded-lg border ${
              shape.id === selectedId ? "bg-primary/10 border-primary" : ""
            }`}
          >
            <button
              className="flex items-center gap-2 flex-1 text-left"
              onClick={() => onSelect(shape.id)}
            >
              {shape.type === "rectangle" && <Square className="w-4 h-4" />}
              {shape.type === "circle" && <Circle className="w-4 h-4" />}
              {shape.type === "polygon" && <Pencil className="w-4 h-4" />}
              <span className="text-sm">
                {shape.type.charAt(0).toUpperCase() + shape.type.slice(1)}{" "}
                {shapes.indexOf(shape) + 1}
              </span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onDelete(shape.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {shapes.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No shapes added yet
          </p>
        )}
      </div>
    </div>
  );
}
