"use client";

import dynamic from "next/dynamic";
import { PropertiesPanel } from "@/components/ui/properties-panel";
import { Toolbar } from "@/components/ui/toolbar";
import { useShapeStore } from "@/lib/store/useShapeStore";
import { Shape, ShapeType } from "@/lib/types/shapes";
import { ImageUpload } from "@/components/ui/image-upload";
import { exportScene, importScene } from "@/lib/utils";

const CanvasWrapper = dynamic(
  () =>
    import("@/components/canvas/canvas-wrapper").then(
      (mod) => mod.CanvasWrapper
    ),
  { ssr: false }
);

export default function ShapeDesigner() {
  const {
    shapes,
    selectedId,
    currentImage,
    addShape,
    updateShape,
    setSelectedId,
    setImage,
    importScene: importShapes,
  } = useShapeStore();

  const handleAddShape = (type: ShapeType) => {
    const newShape = {
      id: crypto.randomUUID(),
      type,
      x: 100,
      y: 100,
      width: type === "rectangle" ? 200 : undefined,
      height: type === "rectangle" ? 150 : undefined,
      radius: type === "circle" ? 50 : undefined,
      points: type === "polygon" ? [] : undefined,
      fill: "#00D2FF",
      opacity: 0.5,
    } as Shape;

    addShape(newShape);
    setSelectedId(newShape.id);
  };

  const selectedShape = selectedId
    ? shapes.find((s) => s.id === selectedId)
    : undefined;

  const handleShapeClick = (shape: Shape) => {
    setSelectedId(shape.id);
  };

  const handleExport = () => {
    if (currentImage) {
      exportScene({ image: currentImage, shapes });
    }
  };

  const handleImport = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const scene = await importScene(file);
          importShapes(scene);
        } catch (error) {
          console.error("Failed to import scene:", error);
        }
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        onAddShape={handleAddShape}
        onExport={handleExport}
        onImport={handleImport}
        hasImage={!!currentImage}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          {!currentImage ? (
            <div className="absolute inset-0 p-8">
              <ImageUpload onImageSelect={setImage} />
            </div>
          ) : (
            <CanvasWrapper
              shapes={shapes}
              selectedId={selectedId}
              currentImage={currentImage}
              onShapeUpdate={updateShape}
              onShapeClick={handleShapeClick}
            />
          )}
        </div>
        {selectedShape && (
          <div className="w-80 border-l">
            <PropertiesPanel
              selectedShape={selectedShape}
              onUpdate={updateShape}
            />
          </div>
        )}
      </div>
    </div>
  );
}
