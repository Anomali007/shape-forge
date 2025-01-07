// components/ui/properties-panel.tsx
"use client";

import { Shape } from "@/lib/types/shapes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useCallback } from "react";

interface PropertiesPanelProps {
  selectedShape?: Shape;
  onUpdate: (shape: Shape) => void;
}

export function PropertiesPanel({
  selectedShape,
  onUpdate,
}: PropertiesPanelProps) {
  const handleChange = useCallback(
    (changes: Partial<Shape>) => {
      if (selectedShape) {
        // Create a new shape object with the correct type
        const updatedShape = { ...selectedShape, ...changes } as Shape;
        onUpdate(updatedShape);
      }
    },
    [selectedShape, onUpdate]
  );

  if (!selectedShape) {
    return (
      <div className="p-4 text-sm text-gray-500 text-center">
        Select a shape to edit its properties
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-sm font-semibold mb-4">Properties</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={selectedShape.name || ""}
            onChange={(e) => handleChange({ name: e.target.value })}
            placeholder={`${selectedShape.type} ${selectedShape.id.slice(
              0,
              4
            )}`}
          />
        </div>

        <div className="space-y-2">
          <Label>Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={selectedShape.fill}
              onChange={(e) => handleChange({ fill: e.target.value })}
              className="w-12 h-9 p-1"
            />
            <Input
              value={selectedShape.fill}
              onChange={(e) => handleChange({ fill: e.target.value })}
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Opacity</Label>
          <div className="flex gap-4 items-center">
            <Slider
              value={[selectedShape.opacity * 100]}
              onValueChange={([value]) =>
                handleChange({ opacity: value / 100 })
              }
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm w-12 text-right">
              {Math.round(selectedShape.opacity * 100)}%
            </span>
          </div>
        </div>

        {selectedShape.type === "rectangle" && (
          <>
            <div className="space-y-2">
              <Label>Width</Label>
              <Input
                type="number"
                value={selectedShape.width}
                onChange={(e) =>
                  handleChange({ width: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Height</Label>
              <Input
                type="number"
                value={selectedShape.height}
                onChange={(e) =>
                  handleChange({ height: Number(e.target.value) })
                }
              />
            </div>
          </>
        )}

        {selectedShape.type === "circle" && (
          <div className="space-y-2">
            <Label>Radius</Label>
            <Input
              type="number"
              value={selectedShape.radius}
              onChange={(e) => handleChange({ radius: Number(e.target.value) })}
            />
          </div>
        )}

        {(selectedShape.type === "polygon" ||
          selectedShape.type === "custom") && (
          <div className="space-y-2">
            <Label>Points</Label>
            <div className="text-sm text-gray-500">
              {selectedShape.points?.length
                ? `${selectedShape.points.length / 2} points defined`
                : "No points defined"}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Position</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">X</Label>
              <Input
                type="number"
                value={selectedShape.x}
                onChange={(e) => handleChange({ x: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label className="text-xs">Y</Label>
              <Input
                type="number"
                value={selectedShape.y}
                onChange={(e) => handleChange({ y: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
