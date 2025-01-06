import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Scene } from "./types/shapes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const exportScene = (scene: Scene) => {
  const json = JSON.stringify(scene, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "scene.json";
  link.click();
  URL.revokeObjectURL(url);
};

export const importScene = (file: File): Promise<Scene> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const scene = JSON.parse(e.target?.result as string);
        resolve(scene);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};
