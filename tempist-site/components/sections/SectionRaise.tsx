"use client";

import { THE_RAISE } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionRaise() {
  const { ref, inView } = useSectionReveal(0.1);

  return (
    <section
      id="raise"
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
          [ {THE_RAISE.eyebrow} ]
        </div>

        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-6 leading-tight">
          {THE_RAISE.headline}
        </h2>

        <p className="font-plex text-classified/80 text-base leading-relaxed max-w-3xl mb-10">
          {THE_RAISE.body}
        </p>

        {/* Comparison table — horizontally scrollable on mobile */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                {THE_RAISE.tableHeaders.map((h, i) => (
                  <th
                    key={i}
                    className={cn(
                      "font-mono text-[10px] tracking-widest text-left py-2 px-4 border-b border-steel/30",
                      i === 1 ? "text-signal" : "text-steel"
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {THE_RAISE.tableRows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        "font-mono text-[11px] py-2 px-4 border-b border-steel/10",
                        ci === 0 ? "text-steel" : ci === 1 ? "text-classified" : "text-classified/60"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer — verbatim, never truncated */}
        <div className="font-mono text-[10px] text-steel leading-relaxed border-l border-steel/30 pl-4">
          {THE_RAISE.disclaimer}
        </div>
      </div>
    </section>
  );
}
