// lib/store/useShapeStore.ts
import { create } from "zustand";
import { Shape, Scene } from "@/lib/types/shapes";

interface ShapeState {
  shapes: Shape[];
  selectedId?: string;
  currentImage?: string;
  isDrawing: boolean;
  drawingPoints: number[];
  addShape: (shape: Shape) => void;
  updateShape: (shape: Shape) => void;
  deleteShape: (shapeId: string) => void;
  setSelectedId: (id?: string) => void;
  setImage: (imageUrl: string) => void;
  importScene: (scene: Scene) => void;
  startDrawing: () => void;
  stopDrawing: () => void;
  addDrawingPoint: (x: number, y: number) => void;
  clearDrawingPoints: () => void;
}

export const useShapeStore = create<ShapeState>((set) => ({
  shapes: [],
  selectedId: undefined,
  currentImage: undefined,
  isDrawing: false,
  drawingPoints: [],

  addShape: (shape) => set((state) => ({ shapes: [...state.shapes, shape] })),

  updateShape: (updatedShape) =>
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === updatedShape.id ? updatedShape : shape
      ),
    })),

  deleteShape: (shapeId) =>
    set((state) => ({
      shapes: state.shapes.filter((shape) => shape.id !== shapeId),
      selectedId: state.selectedId === shapeId ? undefined : state.selectedId,
    })),

  setSelectedId: (id) => set({ selectedId: id }),

  setImage: (imageUrl) => set({ currentImage: imageUrl }),

  importScene: (scene) =>
    set({
      shapes: scene.shapes,
      currentImage: scene.image,
    }),

  startDrawing: () => set({ isDrawing: true, selectedId: undefined }),
  stopDrawing: () => set({ isDrawing: false }),
  addDrawingPoint: (x, y) =>
    set((state) => ({
      drawingPoints: [...state.drawingPoints, x, y],
    })),
  clearDrawingPoints: () => set({ drawingPoints: [] }),
}));
