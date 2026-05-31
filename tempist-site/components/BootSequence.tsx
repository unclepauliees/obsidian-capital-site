"use client";

import { useEffect, useState } from "react";
import { DataReadout } from "@/components/ui/DataReadout";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<
    "dark" | "timestamp" | "coords" | "wordmark" | "tagline" | "done"
  >("dark");
  const [zuluTime, setZuluTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setZuluTime(
        `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")} ${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")} Z`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Boot sequence timing
    const t1 = setTimeout(() => setPhase("timestamp"), 200);
    const t2 = setTimeout(() => setPhase("coords"), 600);
    const t3 = setTimeout(() => setPhase("wordmark"), 1000);
    const t4 = setTimeout(() => setPhase("tagline"), 1400);
    const t5 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2200);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ops"
      aria-label="System initializing"
    >
      {/* Timestamp top-right */}
      {phase !== "dark" && (
        <div className="absolute top-4 right-6 font-mono text-xs text-steel">
          ZULU // {zuluTime}
        </div>
      )}

      {/* Coordinate readout */}
      {(phase === "coords" || phase === "wordmark" || phase === "tagline") && (
        <div className="absolute top-4 left-6">
          <DataReadout
            items={["25.7617° N", "80.1918° W", "SECTOR ALPHA"]}
            active={false}
            animate
            charDelay={35}
          />
        </div>
      )}

      {/* Wordmark */}
      {(phase === "wordmark" || phase === "tagline") && (
        <div
          className="font-grotesk text-classified text-4xl sm:text-5xl tracking-[0.25em] uppercase"
          style={{ animation: "section-fade 200ms ease-out forwards" }}
        >
          TEMPIST SYSTEMS INC.
        </div>
      )}

      {/* Tagline */}
      {phase === "tagline" && (
        <div
          className="mt-6 font-grotesk text-signal text-xl tracking-widest"
          style={{ animation: "section-fade 200ms ease-out forwards" }}
        >
          We are the weather.
        </div>
      )}
    </div>
  );
}
