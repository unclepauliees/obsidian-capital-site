"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DataReadoutProps {
  items: string[];
  active?: boolean;
  animate?: boolean;
  charDelay?: number;
  className?: string;
}

export function DataReadout({
  items,
  active = true,
  animate = false,
  charDelay = 40,
  className,
}: DataReadoutProps) {
  const fullText = `[ ${items.join(" // ")} ]`;
  const [displayed, setDisplayed] = useState(animate ? "" : fullText);
  const [cursorVisible, setCursorVisible] = useState(animate);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!animate) {
      setDisplayed(fullText);
      setCursorVisible(false);
      return;
    }

    setDisplayed("");
    setCursorVisible(true);
    let idx = 0;

    const tick = () => {
      idx++;
      setDisplayed(fullText.slice(0, idx));
      if (idx < fullText.length) {
        timerRef.current = setTimeout(tick, charDelay);
      } else {
        timerRef.current = setTimeout(() => setCursorVisible(false), 800);
      }
    };
    timerRef.current = setTimeout(tick, charDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [animate, fullText, charDelay]);

  const color = active ? "text-signal" : "text-steel";

  return (
    <span className={cn("font-mono text-xs tracking-wider", color, className)}>
      {displayed}
      {cursorVisible && <span className="data-cursor">▓</span>}
    </span>
  );
}
