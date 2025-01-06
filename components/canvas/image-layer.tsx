// components/canvas/image-layer.tsx
"use client";
import { Image } from "react-konva";
import useImage from "use-image";
import { useEffect, useState, useMemo } from "react";

interface ImageLayerProps {
  imageUrl?: string;
  stageWidth: number;
  stageHeight: number;
}

interface ImageSize {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const ImageLayer = ({
  imageUrl,
  stageWidth,
  stageHeight,
}: ImageLayerProps) => {
  const [image] = useImage(imageUrl || "");
  const [size, setSize] = useState<ImageSize>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const dimensions = useMemo(() => {
    if (!image || !stageWidth || !stageHeight) {
      return null;
    }

    const imageRatio = image.width / image.height;
    const stageRatio = stageWidth / stageHeight;
    let width, height, x, y;

    if (stageRatio > imageRatio) {
      // Stage is wider than image ratio
      height = stageHeight;
      width = height * imageRatio;
      y = 0;
      x = (stageWidth - width) / 2;
    } else {
      // Stage is taller than image ratio
      width = stageWidth;
      height = width / imageRatio;
      x = 0;
      y = (stageHeight - height) / 2;
    }

    return { width, height, x, y };
  }, [image, stageWidth, stageHeight]);

  useEffect(() => {
    if (dimensions) {
      setSize(dimensions);
    }
  }, [dimensions]);

  if (!imageUrl || !image) return null;

  return (
    <Image image={image} {...size} listening={false} alt="Background image" />
  );
};
