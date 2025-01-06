// lib/store/useShapeStore.ts
import { create } from "zustand";
import { Shape, Scene } from "@/lib/types/shapes";

interface ShapeState {
  shapes: Shape[];
  selectedId?: string;
  currentImage?: string;
  addShape: (shape: Shape) => void;
  updateShape: (shape: Shape) => void;
  setSelectedId: (id?: string) => void;
  setImage: (imageUrl: string) => void;
  importScene: (scene: Scene) => void;
}

export const useShapeStore = create<ShapeState>((set) => ({
  shapes: [],
  selectedId: undefined,
  currentImage: undefined,

  addShape: (shape) => set((state) => ({ shapes: [...state.shapes, shape] })),

  updateShape: (updatedShape) =>
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === updatedShape.id ? updatedShape : shape
      ),
    })),

  setSelectedId: (id) => set({ selectedId: id }),

  setImage: (imageUrl) => set({ currentImage: imageUrl }),

  importScene: (scene) =>
    set({
      shapes: scene.shapes,
      currentImage: scene.image,
    }),
}));
