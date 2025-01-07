"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { Shape } from "@/lib/types/shapes";
import dynamic from "next/dynamic";

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

const PreviewCanvas = dynamic<PreviewCanvasProps>(
  () =>
    import("@/components/ui/preview-canvas").then((mod) => mod.PreviewCanvas),
  { ssr: false }
);

interface PreviewDialogProps {
  imageUrl?: string;
  shapes: Shape[];
}

export function PreviewDialog({ imageUrl, shapes }: PreviewDialogProps) {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh]">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <div className="flex gap-2 mt-4">
            <Button
              variant={deviceType === "mobile" ? "secondary" : "outline"}
              size="icon"
              onClick={() => setDeviceType("mobile")}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceType === "tablet" ? "secondary" : "outline"}
              size="icon"
              onClick={() => setDeviceType("tablet")}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceType === "desktop" ? "secondary" : "outline"}
              size="icon"
              onClick={() => setDeviceType("desktop")}
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="overflow-auto p-4 flex items-center justify-center bg-gray-100 rounded-lg">
          <div
            style={{
              width: DEVICE_SIZES[deviceType].width,
              height: DEVICE_SIZES[deviceType].height,
              transform: deviceType === "desktop" ? "scale(0.7)" : "none",
              transformOrigin: "center",
            }}
          >
            <PreviewCanvas
              imageUrl={imageUrl}
              shapes={shapes}
              deviceType={deviceType}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
