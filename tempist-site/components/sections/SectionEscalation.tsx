"use client";

import { ESCALATION } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { CornerBracket } from "@/components/ui/CornerBracket";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionEscalation() {
  const { ref, inView } = useSectionReveal(0.1);

  return (
    <section
      id="escalation"
      ref={ref as React.Ref<HTMLElement>}
      className="relative min-h-screen flex flex-col justify-center px-8 lg:px-24 xl:px-32 py-20"
    >
      <ClassificationStamp position="top-right" />

      <div
        className={cn(
          "max-w-6xl transition-opacity duration-400",
          inView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="font-mono text-[10px] text-steel tracking-[0.2em] mb-4">
          [ {ESCALATION.eyebrow} ]
        </div>

        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-4 leading-tight">
          {ESCALATION.headline}
        </h2>

        <p className="font-plex text-classified/80 text-base leading-relaxed max-w-3xl mb-10">
          {ESCALATION.subhead}
        </p>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {ESCALATION.columns.map((col, ci) => (
            <CornerBracket key={col.title} active={false} armLength={12} className="p-5">
              <div className="font-mono text-steel text-[10px] tracking-widest mb-4">
                {col.title}
              </div>
              <div className="space-y-4">
                {col.rows.map((row) => (
                  <div key={row.label}>
                    <div className="font-mono text-classified text-[10px] tracking-widest mb-1">
                      {row.label}
                    </div>
                    <div className="font-plex text-classified/60 text-xs leading-relaxed">
                      {row.desc}
                    </div>
                  </div>
                ))}
              </div>
            </CornerBracket>
          ))}
        </div>

        {/* Source line */}
        <div className="font-mono text-[10px] text-steel tracking-wider">
          [ {ESCALATION.sourceLine} ]
        </div>
      </div>
    </section>
  );
}
