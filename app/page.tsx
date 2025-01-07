"use client";

import { Toolbar } from "@/components/ui/toolbar";
import { PropertiesPanel } from "@/components/ui/properties-panel";
import { useShapeStore } from "@/lib/store/useShapeStore";
import { Shape, ShapeType } from "@/lib/types/shapes";
import dynamic from "next/dynamic";
import { ImageUpload } from "@/components/ui/image-upload";
import { ShapeList } from "@/components/ui/shape-list";

// Dynamically import the canvas wrapper with SSR disabled
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
    deleteShape,
    isDrawing,
    startDrawing,
    stopDrawing,
    clearDrawingPoints,
  } = useShapeStore();

  const handleAddShape = (type: ShapeType) => {
    addShape({
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
    } as Shape);
  };

  const selectedShape = selectedId
    ? shapes.find((s) => s.id === selectedId)
    : undefined;

  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        onAddShape={handleAddShape}
        onExport={() => {}}
        onImport={() => {}}
        hasImage={!!currentImage}
        isDrawing={isDrawing}
        startDrawing={startDrawing}
        stopDrawing={stopDrawing}
        clearDrawingPoints={clearDrawingPoints}
      />
      <div className="flex-1 flex gap-4 p-4 min-h-0">
        <div className="flex-1 min-w-0 relative">
          {!currentImage ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96">
                <ImageUpload onImageSelect={setImage} />
              </div>
            </div>
          ) : (
            <CanvasWrapper
              shapes={shapes}
              selectedId={selectedId}
              currentImage={currentImage}
              onShapeUpdate={updateShape}
              onShapeClick={setSelectedId}
              onShapeAdd={addShape}
            />
          )}
        </div>
        <div className="w-[500px] flex gap-4">
          <div className="flex-1 border rounded-lg overflow-auto">
            <ShapeList
              shapes={shapes}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDelete={deleteShape}
            />
          </div>
          {selectedShape && (
            <div className="flex-1 border rounded-lg overflow-auto">
              <PropertiesPanel
                selectedShape={selectedShape}
                onUpdate={updateShape}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
