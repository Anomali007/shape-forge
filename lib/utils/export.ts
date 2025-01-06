import { Scene } from "../types/shapes";

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
