// lib/utils/scale.ts
export const calculateScale = (
  containerWidth: number,
  containerHeight: number,
  contentWidth: number,
  contentHeight: number
) => {
  const scaleX = containerWidth / contentWidth;
  const scaleY = containerHeight / contentHeight;
  return Math.min(scaleX, scaleY);
};
