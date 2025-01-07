// components/canvas/responsive-stage.tsx
"use client";
import { Stage, StageProps } from "react-konva";
import { useEffect, useState, useRef, useCallback } from "react";
import type { KonvaEventObject } from "konva/lib/Node";

interface ResponsiveStageProps extends Omit<StageProps, "width" | "height"> {
  children: React.ReactNode;
  onResize?: (width: number, height: number) => void;
  onClick?: (e: KonvaEventObject<MouseEvent>) => void;
}

interface StageDimensions {
  width: number;
  height: number;
}

export const ResponsiveStage = ({
  children,
  onResize,
  onClick,
  ...props
}: ResponsiveStageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<StageDimensions>({
    width: 0,
    height: 0,
  });
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const onResizeRef = useRef(onResize);

  // Update the ref when onResize changes
  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      const newDimensions = {
        width: clientWidth,
        height: clientHeight,
      };

      setDimensions(newDimensions);
      onResizeRef.current?.(clientWidth, clientHeight);
    }
  }, []); // No dependencies since we use refs

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(updateDimensions, 100);
    };

    // Initial size
    updateDimensions();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [updateDimensions]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onClick={onClick}
        {...props}
      >
        {children}
      </Stage>
    </div>
  );
};
