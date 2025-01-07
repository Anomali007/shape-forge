// components/canvas/image-layer.tsx
"use client";

import { Image } from "react-konva";
import useImage from "use-image";

interface ImageLayerProps {
  imageUrl?: string;
  stageWidth: number;
  stageHeight: number;
}

export function ImageLayer({
  imageUrl,
  stageWidth,
  stageHeight,
}: ImageLayerProps) {
  const [image] = useImage(imageUrl || "");

  if (!image) return null;

  // Calculate scale to fit image
  const scale = Math.min(stageWidth / image.width, stageHeight / image.height);

  // Center the image
  const x = (stageWidth - image.width * scale) / 2;
  const y = (stageHeight - image.height * scale) / 2;

  return (
    <Image
      image={image}
      alt={imageUrl || ""}
      x={x}
      y={y}
      width={image.width * scale}
      height={image.height * scale}
    />
  );
}
