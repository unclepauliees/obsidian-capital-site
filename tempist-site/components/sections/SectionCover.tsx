"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { COVER } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { DataReadout } from "@/components/ui/DataReadout";
import { CornerBracket } from "@/components/ui/CornerBracket";
import { EMPPulse } from "@/components/ui/EMPPulse";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionCover() {
  const { ref, inView } = useSectionReveal(0.1);
  const [zuluTime, setZuluTime] = useState("");
  const [empTrigger, setEmpTrigger] = useState(false);

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
    if (inView) {
      const t = setTimeout(() => setEmpTrigger(true), 800);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section
      id="cover"
      ref={ref as React.Ref<HTMLElement>}
      className="relative min-h-screen flex flex-col items-center justify-center px-8 lg:px-20 py-20 overflow-hidden"
    >
      {/* EMP pulse at center */}
      <EMPPulse
        trigger={empTrigger}
        cx={200} cy={200} size={400}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
      />

      {/* Classification stamp */}
      <ClassificationStamp text={COVER.classificationStamp} position="top-right" />

      {/* Timestamp top-left */}
      <div className="absolute top-4 left-8 lg:left-20 font-mono text-[10px] text-steel">
        ZULU // {zuluTime}
      </div>

      {/* Main content */}
      <div
        className={cn(
          "flex flex-col items-center text-center max-w-4xl gap-8 transition-opacity duration-500",
          inView ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Logo mark */}
        <Image
          src="/tempist-logo.png"
          alt="Tempist Systems"
          width={96}
          height={96}
          className="mb-2 opacity-90"
          priority
        />

        {/* Wordmark */}
        <div className="font-grotesk text-classified text-3xl sm:text-4xl tracking-[0.3em] uppercase">
          {COVER.wordmark}
        </div>

        {/* Acronym — steel so the tagline below remains the single green element */}
        <div className="font-mono text-steel text-sm tracking-widest">
          {COVER.acronymSpaced}
          <span className="ml-3">— {COVER.acronymFull}</span>
        </div>

        {/* Headline */}
        <h1 className="font-grotesk text-classified text-2xl sm:text-3xl lg:text-4xl leading-tight max-w-3xl">
          {COVER.headline}
        </h1>

        {/* Tagline */}
        <div className="font-grotesk text-signal text-xl sm:text-2xl tracking-wide mt-2">
          {COVER.tagline}
        </div>

        {/* Spec strip */}
        <CornerBracket active={false} armLength={16} className="mt-4 w-full max-w-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COVER.specs.map(({ key, value }) => (
              <div key={key} className="flex gap-3 text-left">
                <span className="font-mono text-[10px] text-steel tracking-widest shrink-0 w-24">
                  {key}
                </span>
                <span className="font-mono text-[11px] text-classified leading-snug">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </CornerBracket>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-steel tracking-widest">
        <DataReadout items={["SCROLL TO BRIEF"]} active={false} />
      </div>
    </section>
  );
}
