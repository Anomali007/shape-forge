// components/ui/properties-panel.tsx
import { Shape } from "@/lib/types/shapes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface PropertiesPanelProps {
  selectedShape?: Shape;
  onUpdate: (shape: Shape) => void;
}

export const PropertiesPanel = ({
  selectedShape,
  onUpdate,
}: PropertiesPanelProps) => {
  if (!selectedShape) return null;

  return (
    <div className="p-4 space-y-4">
      <div>
        <Label>Color</Label>
        <Input
          type="color"
          value={selectedShape.fill}
          onChange={(e) => onUpdate({ ...selectedShape, fill: e.target.value })}
        />
      </div>
      <div>
        <Label>Opacity</Label>
        <Slider
          value={[selectedShape.opacity]}
          min={0}
          max={1}
          step={0.1}
          onValueChange={([value]) =>
            onUpdate({ ...selectedShape, opacity: value })
          }
        />
      </div>
    </div>
  );
};
