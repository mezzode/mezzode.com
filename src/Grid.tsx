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
      ctx.clearRect(0, 0, canvas.width, canvas.height); // TODO: Consider not clearing and fully redrawing

      for (let x = spacing / 2; x < canvas.width; x += spacing) {
        for (let y = spacing / 2; y < canvas.height; y += spacing) {
          const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
          const opacity = Math.max(1 - distance / activeRadius, 0.2);
          const opacityPercent = `${opacity * 100}%`;
          ctx.beginPath();
          ctx.strokeStyle = `color-mix(in oklab, ${primaryColor} ${opacityPercent}, ${secondaryColor})`;
          ctx.beginPath();
          ctx.moveTo(x - nodeRadius, y);
          ctx.lineTo(x + nodeRadius, y);
          ctx.moveTo(x, y - nodeRadius);
          ctx.lineTo(x, y + nodeRadius);
          ctx.stroke();
        }
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      drawGrid(e.offsetX, e.offsetY);
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [primaryColor, secondaryColor, nodeRadius, spacing, activeRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.grid}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      There should be a pretty grid here, but your browser doesn't support
      `canvas`.
    </canvas>
  );
}
