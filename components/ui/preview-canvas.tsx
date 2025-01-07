"use client";

import { Stage, Layer, Image as KonvaImage, Line } from "react-konva";
import useImage from "use-image";
import { Shape } from "@/lib/types/shapes";

const DEVICE_SIZES = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
} as const;

type DeviceType = keyof typeof DEVICE_SIZES;

interface PreviewCanvasProps {
  imageUrl?: string;
  shapes: Shape[];
  deviceType: DeviceType;
}

export function PreviewCanvas({
  imageUrl,
  shapes,
  deviceType,
}: PreviewCanvasProps) {
  const [image] = useImage(imageUrl || "");
  const { width, height } = DEVICE_SIZES[deviceType];

  if (!image) return null;

  const scale = Math.min(width / image.width, height / image.height);
  const x = (width - image.width * scale) / 2;
  const y = (height - image.height * scale) / 2;

  return (
    <Stage width={width} height={height} style={{ background: "#f0f0f0" }}>
      <Layer>
        <KonvaImage
          image={image}
          x={x}
          y={y}
          width={image.width * scale}
          height={image.height * scale}
        />
        {shapes.map((shape) => {
          if (shape.type === "polygon") {
            return (
              <Line
                key={shape.id}
                points={shape.points.map((p, i) =>
                  i % 2 === 0 ? p * scale + x : p * scale + y
                )}
                closed
                fill={shape.fill}
                opacity={shape.opacity}
              />
            );
          }
          return null;
        })}
      </Layer>
    </Stage>
  );
}
