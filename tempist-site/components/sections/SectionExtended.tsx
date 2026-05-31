"use client";

import { EXTENDED } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { CornerBracket } from "@/components/ui/CornerBracket";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionExtended() {
  const { ref, inView } = useSectionReveal(0.08);

  return (
    <section
      id="extended"
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
          [ {EXTENDED.eyebrow} ]
        </div>

        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-10 leading-tight">
          {EXTENDED.headline}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {EXTENDED.members.map((member) => (
            <CornerBracket key={member.name} active={false} armLength={10} className="p-5">
              <div className="font-mono text-classified/70 text-[10px] tracking-widest mb-1">
                {member.name}
              </div>
              <div className="font-mono text-steel text-[10px] tracking-widest mb-3">
                {member.title}
              </div>
              <p className="font-plex text-classified/70 text-xs leading-relaxed">
                {member.bio}
              </p>
            </CornerBracket>
          ))}
        </div>
      </div>
    </section>
  );
}
