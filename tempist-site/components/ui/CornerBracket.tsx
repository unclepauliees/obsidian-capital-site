"use client";

import { cn } from "@/lib/utils";

interface CornerBracketProps {
  children: React.ReactNode;
  active?: boolean;
  armLength?: number;
  thickness?: number;
  className?: string;
  animate?: boolean;
  glass?: boolean;
}

export function CornerBracket({
  children,
  active = false,
  armLength = 20,
  thickness = 1,
  className,
  animate = false,
  glass = true,
}: CornerBracketProps) {
  const color = active ? "#00FF41" : "#4A5568";
  const arm = armLength;
  const t = thickness;

  const cornerStyle = {
    "--corner-color": color,
    "--arm": `${arm}px`,
    "--thickness": `${t}px`,
  } as React.CSSProperties;

  return (
    <div className={cn("relative", glass && "corner-bracket-glass", className)} style={cornerStyle}>
      {/* Top-left */}
      <span
        className={cn(
          "absolute top-0 left-0 pointer-events-none",
          animate && "corner-draw-tl"
        )}
        style={{
          width: arm,
          height: arm,
          borderTop: `${t}px solid ${color}`,
          borderLeft: `${t}px solid ${color}`,
        }}
        aria-hidden
      />
      {/* Top-right */}
      <span
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: arm,
          height: arm,
          borderTop: `${t}px solid ${color}`,
          borderRight: `${t}px solid ${color}`,
        }}
        aria-hidden
      />
      {/* Bottom-left */}
      <span
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: arm,
          height: arm,
          borderBottom: `${t}px solid ${color}`,
          borderLeft: `${t}px solid ${color}`,
        }}
        aria-hidden
      />
      {/* Bottom-right */}
      <span
        className={cn(
          "absolute bottom-0 right-0 pointer-events-none",
          animate && "corner-draw-br"
        )}
        style={{
          width: arm,
          height: arm,
          borderBottom: `${t}px solid ${color}`,
          borderRight: `${t}px solid ${color}`,
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
