"use client";

import { PORTFOLIO } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { CornerBracket } from "@/components/ui/CornerBracket";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionPortfolio() {
  const { ref, inView } = useSectionReveal(0.08);

  return (
    <section
      id="portfolio"
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
          [ {PORTFOLIO.eyebrow} ]
        </div>

        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-3 leading-tight">
          {PORTFOLIO.headline}
        </h2>

        <p className="font-plex text-classified/60 text-sm mb-10">
          {PORTFOLIO.subhead}
        </p>

        {/* Platform grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PORTFOLIO.platforms.map((platform) => (
            <CornerBracket
              key={platform.name}
              active={false}
              armLength={12}
              className="p-5 h-full"
            >
              <div className="font-mono text-steel text-[10px] tracking-widest mb-1">
                {platform.category}
              </div>
              <div className="font-grotesk text-classified text-base font-medium mb-3">
                {platform.name}
              </div>
              <ul className="space-y-1">
                {platform.specs.map((spec, i) => (
                  <li key={i} className="font-mono text-[10px] text-classified/60 leading-snug">
                    {spec}
                  </li>
                ))}
              </ul>
            </CornerBracket>
          ))}
        </div>
      </div>
    </section>
  );
}
