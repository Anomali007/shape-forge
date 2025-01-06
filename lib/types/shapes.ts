// lib/types/shapes.ts
export type ShapeType = "rectangle" | "circle" | "polygon" | "custom";

interface Overlay {
  id: string;
  color: string;
  opacity: number;
}

export interface BaseShape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  fill: string;
  opacity: number;
  name?: string;
  draggable?: boolean;
  selected?: boolean;
  overlays?: Overlay[];
}

export interface CustomShape extends BaseShape {
  type: "custom";
  label: string;
  category?: string; // e.g., 'vehicle-panel', 'building-level', etc.
  width: number;
  height: number;
  points: number[]; // For custom path drawing
}

export interface RectangleShape extends BaseShape {
  type: "rectangle";
  width: number;
  height: number;
}

export interface CircleShape extends BaseShape {
  type: "circle";
  radius: number;
}

export interface PolygonShape extends BaseShape {
  type: "polygon";
  points: number[];
}

export type Shape = RectangleShape | CircleShape | PolygonShape | CustomShape;

export interface Scene {
  image: string;
  shapes: Shape[];
}
