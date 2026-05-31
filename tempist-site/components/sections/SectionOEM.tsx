"use client";

import { OEM_ADVANTAGE } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { CornerBracket } from "@/components/ui/CornerBracket";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionOEM() {
  const { ref, inView } = useSectionReveal(0.1);

  return (
    <section
      id="oem"
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
          [ {OEM_ADVANTAGE.eyebrow} ]
        </div>

        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-10 leading-tight">
          {OEM_ADVANTAGE.headline}
        </h2>

        {/* Stat band */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {OEM_ADVANTAGE.stats.map((stat, i) => (
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

        {/* Four points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {OEM_ADVANTAGE.points.map((point) => (
            <CornerBracket key={point.title} active={false} armLength={12} className="p-6">
              <div className="font-grotesk text-classified text-sm font-medium mb-3">
                {point.title}
              </div>
              <p className="font-plex text-classified/70 text-sm leading-relaxed">
                {point.body}
              </p>
            </CornerBracket>
          ))}
        </div>
      </div>
    </section>
  );
}
