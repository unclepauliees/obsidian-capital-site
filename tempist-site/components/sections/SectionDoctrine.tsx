"use client";

import { DOCTRINE } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { CornerBracket } from "@/components/ui/CornerBracket";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionDoctrine() {
  const { ref, inView } = useSectionReveal(0.15);

  return (
    <section
      id="doctrine"
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
        {/* Eyebrow */}
        <div className="font-mono text-[10px] text-steel tracking-[0.2em] mb-4">
          [ {DOCTRINE.eyebrow} ]
        </div>

        {/* Headline */}
        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-8 leading-tight">
          {DOCTRINE.headline}
        </h2>

        {/* Body */}
        <p className="font-plex text-classified/80 text-base sm:text-lg leading-relaxed max-w-3xl mb-12">
          {DOCTRINE.body}
        </p>

        {/* Three cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {DOCTRINE.cards.map((card, i) => (
            <CornerBracket key={card.label} active={false} armLength={14} className="p-6">
              <div className="font-mono text-steel text-xs tracking-widest mb-3">
                [ {card.label} ]
              </div>
              <p className="font-plex text-classified/80 text-sm leading-relaxed">
                {card.body}
              </p>
            </CornerBracket>
          ))}
        </div>
      </div>
    </section>
  );
}
