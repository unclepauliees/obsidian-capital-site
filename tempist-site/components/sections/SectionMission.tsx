"use client";

import { MISSION } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionMission() {
  const { ref, inView } = useSectionReveal(0.15);

  return (
    <section
      id="mission"
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
          [ {MISSION.eyebrow} ]
        </div>

        <h2 className="font-grotesk text-classified text-4xl sm:text-5xl lg:text-6xl leading-tight mb-12">
          {MISSION.headline}
        </h2>

        <div className="space-y-6 max-w-3xl">
          <p className="font-plex text-classified/80 text-lg sm:text-xl leading-relaxed">
            {MISSION.body1}
          </p>
          <p className="font-plex text-classified/80 text-lg sm:text-xl leading-relaxed">
            {MISSION.body2}
          </p>
        </div>
      </div>
    </section>
  );
}
