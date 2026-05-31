"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SwarmFieldProps {
  targetX?: number;
  targetY?: number;
  count?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function SwarmField({
  targetX = 0.5,
  targetY = 0.5,
  count = 40,
  style,
  className,
}: SwarmFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    type Agent = {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
    };

    const agents: Agent[] = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: 3 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.4,
    }));

    const drawTriangle = (
      ctx: CanvasRenderingContext2D,
      x: number, y: number,
      angle: number, size: number, alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = "#00FF41";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.866, size * 0.5);
      ctx.lineTo(-size * 0.866, size * 0.5);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      const tx = targetX * W;
      const ty = targetY * H;

      agents.forEach((a) => {
        if (!reduced) {
          const dx = tx - a.x;
          const dy = ty - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          // Gentle convergence
          a.vx += (dx / dist) * 0.04;
          a.vy += (dy / dist) * 0.04;
          // Dampen
          a.vx *= 0.96;
          a.vy *= 0.96;
          a.x += a.vx;
          a.y += a.vy;
          // Wrap if too close to target
          if (dist < 20) {
            a.x = Math.random() * W;
            a.y = Math.random() * H;
          }
        }

        const angle = Math.atan2(ty - a.y, tx - a.x) + Math.PI / 2;
        drawTriangle(ctx, a.x, a.y, angle, a.size, a.opacity);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetX, targetY, count, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
      aria-hidden
    />
  );
}
