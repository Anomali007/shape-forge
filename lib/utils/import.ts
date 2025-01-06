import { Scene } from "../types/shapes";

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
