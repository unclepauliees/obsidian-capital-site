"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AtmosphericFieldProps {
  style?: React.CSSProperties;
  className?: string;
}

export function AtmosphericField({ style, className }: AtmosphericFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let empTimer = 0;
    let empActive = false;
    let empRadius = 0;
    let empOpacity = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Grain particles
    const GRAIN_COUNT = 600;
    const grains: { x: number; y: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < GRAIN_COUNT; i++) {
      grains.push({
        x: Math.random() * 2000,
        y: Math.random() * 2000,
        speed: 0.05 + Math.random() * 0.1,
        opacity: 0.01 + Math.random() * 0.04,
      });
    }

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Base: ops background
      ctx.fillStyle = "#0A0B0E";
      ctx.fillRect(0, 0, W, H);

      if (reduced) {
        // Static version — just a subtle grid
        drawGrid(ctx, W, H, 0.1);
        return;
      }

      // Drifting grain
      grains.forEach((g) => {
        g.y += g.speed;
        if (g.y > H) { g.y = 0; g.x = Math.random() * W; }
        ctx.fillStyle = `rgba(232,228,220,${g.opacity})`;
        ctx.fillRect((g.x * W / 2000) | 0, g.y | 0, 1, 1);
      });

      // Faint grid
      drawGrid(ctx, W, H, 0.08 + Math.sin(frame * 0.003) * 0.02);

      // EMP pulse every ~8 seconds
      empTimer++;
      if (empTimer > 480 && !empActive) {
        empActive = true;
        empRadius = 0;
        empOpacity = 0.8;
        empTimer = 0;
      }
      if (empActive) {
        const ox = W * 0.5, oy = H * 0.45;
        for (let ring = 0; ring < 4; ring++) {
          const r = empRadius - ring * 30;
          if (r > 0) {
            const alpha = Math.max(0, empOpacity - ring * 0.18);
            ctx.strokeStyle = `rgba(0,255,65,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(ox, oy, r, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        empRadius += 2.5;
        empOpacity -= 0.006;
        if (empOpacity <= 0 || empRadius > Math.max(W, H)) {
          empActive = false;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    function drawGrid(
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      alpha: number
    ) {
      const step = 80;
      ctx.strokeStyle = `rgba(0,255,65,${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
      aria-hidden
    />
  );
}
