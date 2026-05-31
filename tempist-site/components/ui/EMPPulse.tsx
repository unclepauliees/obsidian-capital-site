"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface EMPPulseProps {
  trigger?: boolean;
  cx?: number;
  cy?: number;
  size?: number;
  className?: string;
}

export function EMPPulse({
  trigger = false,
  cx = 200,
  cy = 200,
  size = 400,
  className,
}: EMPPulseProps) {
  const reduced = useReducedMotion();
  const [rings, setRings] = useState<number[]>([]);

  useEffect(() => {
    if (!trigger || reduced) return;
    const id = Date.now();
    setRings((r) => [...r, id]);
    const t = setTimeout(() => setRings((r) => r.filter((x) => x !== id)), 3000);
    return () => clearTimeout(t);
  }, [trigger, reduced]);

  if (rings.length === 0) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      {rings.map((id, i) => (
        <g key={id}>
          {[0, 0.4, 0.8, 1.2].map((delay, j) => (
            <circle
              key={j}
              cx={cx}
              cy={cy}
              r={20}
              fill="none"
              stroke="#00FF41"
              strokeWidth={1}
              style={{
                animation: `emp-expand 2.4s ease-out ${delay}s forwards`,
              }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
