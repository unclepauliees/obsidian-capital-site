"use client";

import React from "react";
import { THREAT } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionThreat() {
  const { ref, inView } = useSectionReveal(0.1);

  return (
    <section
      id="threat"
      ref={ref as React.Ref<HTMLElement>}
      className="relative min-h-screen flex flex-col justify-center px-8 lg:px-24 xl:px-32 py-20"
    >
      <ClassificationStamp position="top-right" />

      <div
        className={cn(
          "max-w-5xl transition-opacity duration-400",
          inView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="font-mono text-[10px] text-steel tracking-[0.2em] mb-4">
          [ {THREAT.eyebrow} ]
        </div>

        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-10 leading-tight">
          {THREAT.headline}
        </h2>

        {/* Transition table */}
        <div className="mb-16">
          <div className="grid grid-cols-[1fr_24px_1fr] gap-x-4 gap-y-2 max-w-2xl">
            <div className="font-mono text-[10px] text-steel tracking-widest pb-2 border-b border-steel/30">
              TRADITIONAL
            </div>
            <div />
            <div className="font-mono text-[10px] text-steel tracking-widest pb-2 border-b border-steel/30">
              EMERGING REALITY
            </div>
            {THREAT.transitions.map((row, i) => (
              <React.Fragment key={i}>
                <div className="font-mono text-[11px] text-classified/60 py-2 border-b border-steel/10">
                  {row.from}
                </div>
                <div className="font-mono text-steel py-2 border-b border-steel/10 text-center">
                  →
                </div>
                <div className="font-mono text-[11px] text-classified py-2 border-b border-steel/10">
                  {row.to}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Stat band — one signal-green figure at a time (only first is green, rest steel) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {THREAT.stats.map((stat, i) => (
            <div key={stat.figure} className="flex flex-col gap-2">
              <div
                className={cn(
                  "font-grotesk text-3xl sm:text-4xl font-medium",
                  i === 0 ? "text-signal" : "text-classified"
                )}
              >
                {stat.figure}
              </div>
              <div className="font-mono text-[10px] text-steel leading-snug">
                {stat.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
