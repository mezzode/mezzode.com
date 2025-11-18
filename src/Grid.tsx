import { useRef, useEffect } from "react";

interface GridProps {
  color?: string;
  nodeRadius?: number;
  spacing?: number;
  activeRadius?: number;
}

export default function Grid({
  color = "#242424",
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

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
          const opacity = distance / activeRadius;
          ctx.beginPath();
          ctx.strokeStyle = `rgb(from ${color} r g b / ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(x - nodeRadius, y);
          ctx.lineTo(x + nodeRadius, y);
          ctx.stroke();
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
  }, [color, nodeRadius, spacing, activeRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="grid"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
