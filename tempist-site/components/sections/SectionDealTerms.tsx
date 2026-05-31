"use client";

import { DEAL_TERMS } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { CornerBracket } from "@/components/ui/CornerBracket";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

export function SectionDealTerms() {
  const { ref, inView } = useSectionReveal(0.1);

  return (
    <section
      id="terms"
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
          [ {DEAL_TERMS.eyebrow} ]
        </div>

        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-10 leading-tight">
          {DEAL_TERMS.headline}
        </h2>

        {/* Hero stats — 4 figures */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {DEAL_TERMS.heroStats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <div
                className={cn(
                  "font-grotesk text-3xl sm:text-4xl font-medium",
                  i === 0 ? "text-signal" : "text-classified"
                )}
              >
                {stat.figure}
              </div>
              <div className="font-mono text-[10px] text-steel">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Deal Terms ledger */}
          <div>
            <div className="font-mono text-[10px] text-steel tracking-widest mb-4">
              DEAL TERMS
            </div>
            <div className="space-y-2">
              {DEAL_TERMS.terms.map(({ key, value }) => (
                <div key={key} className="flex gap-4 border-b border-steel/10 py-2">
                  <span className="font-mono text-[10px] text-steel tracking-wider w-40 shrink-0">
                    {key}
                  </span>
                  <span className="font-mono text-[11px] text-classified leading-snug">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Use of Proceeds */}
          <div>
            <div className="font-mono text-[10px] text-steel tracking-widest mb-4">
              USE OF PROCEEDS — $750,000
            </div>
            <div className="space-y-5">
              {DEAL_TERMS.proceeds.map((item) => (
                <CornerBracket key={item.title} active={false} armLength={10} className="p-4">
                  <div className="font-mono text-classified text-[11px] tracking-wider mb-1">
                    {item.amount}
                  </div>
                  <div className="font-grotesk text-classified text-sm font-medium mb-2">
                    {item.title}
                  </div>
                  <div className="font-mono text-[10px] text-classified/60 leading-snug">
                    {item.detail}
                  </div>
                </CornerBracket>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 font-mono text-[10px] text-steel tracking-wider border-t border-steel/20 pt-4">
          {DEAL_TERMS.footer}
        </div>
      </div>
    </section>
  );
}
