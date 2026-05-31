"use client";

import { STEP_UP } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionStepUp() {
  const { ref, inView } = useSectionReveal(0.1);

  return (
    <section
      id="stepup"
      ref={ref as React.Ref<HTMLElement>}
      className="relative min-h-screen flex flex-col justify-center px-8 lg:px-24 xl:px-32 py-20"
    >
      <ClassificationStamp position="top-right" />

      <div
        className={cn(
          "max-w-4xl transition-opacity duration-400",
          inView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="font-mono text-[10px] text-steel tracking-[0.2em] mb-4">
          [ {STEP_UP.eyebrow} ]
        </div>

        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-4 leading-tight">
          {STEP_UP.headline}
        </h2>

        <p className="font-plex text-classified/70 text-sm leading-relaxed max-w-3xl mb-12">
          {STEP_UP.subhead}
        </p>

        {/* Milestones */}
        <div className="space-y-8">
          {STEP_UP.milestones.map((m) => (
            <div key={m.number} className="flex gap-6">
              {/* Number */}
              <div className="font-mono text-steel text-xl shrink-0 w-8">
                {m.number}
              </div>
              <div className="flex-1 border-l border-steel/20 pl-6">
                <div className="font-grotesk text-classified text-base font-medium mb-1">
                  {m.title}
                </div>
                <div className="font-mono text-[10px] text-classified/50 mb-3">
                  {m.detail}
                </div>
                <div className="font-mono text-[10px] text-steel tracking-widest mb-1">
                  VALUATION IMPACT
                </div>
                <div className="font-plex text-classified/70 text-sm leading-snug">
                  {m.impact}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div className="mt-12 font-plex text-classified/70 text-sm leading-relaxed border-l border-signal/30 pl-6">
          {STEP_UP.closingLine}
        </div>
      </div>
    </section>
  );
}
