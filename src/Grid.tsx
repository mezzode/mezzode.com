import { useRef, useEffect } from "react";
import styles from "./Grid.module.css";

interface GridProps {
  primaryColor?: string;
  secondaryColor?: string;
  nodeRadius?: number;
  spacing?: number;
  activeRadius?: number;
}

export default function Grid({
  primaryColor = "#242424",
  secondaryColor = "#f9f9f9",
  nodeRadius = 4,
  spacing = 60,
  activeRadius = 150,
}: GridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid(-1, -1);
    };

    const drawGrid = (mouseX: number, mouseY: number) => {
      for (let x = spacing / 2; x < canvas.width; x += spacing) {
        for (let y = spacing / 2; y < canvas.height; y += spacing) {
          const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
          const opacity = Math.max(1 - distance / activeRadius, 0.2);
          const opacityPercent = `${(opacity * 100).toFixed(0)}%`;
          ctx.beginPath();
          ctx.strokeStyle = `color-mix(in oklab, ${primaryColor} ${opacityPercent}, ${secondaryColor})`;

          // Lines offset by 0.5 on their parallel axes to prevent subpixel rendering when single pixel wide
          // Lines also extended by 1 to account for the offset
          ctx.moveTo(x - nodeRadius, y + 0.5);
          ctx.lineTo(x + nodeRadius + 1, y + 0.5);
          ctx.moveTo(x + 0.5, y - nodeRadius);
          ctx.lineTo(x + 0.5, y + nodeRadius + 1);
          ctx.stroke();
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      drawGrid(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        drawGrid(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove); // On window so works when other elements cover
    window.addEventListener("touchmove", handleTouchMove);

    resizeCanvas();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [primaryColor, secondaryColor, nodeRadius, spacing, activeRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.grid}
      width={window.innerWidth}
      height={window.innerHeight}
      aria-label="Pretty Grid"
    >
      There should be a pretty grid here, but your browser doesn't support
      `canvas`.
    </canvas>
  );
}
