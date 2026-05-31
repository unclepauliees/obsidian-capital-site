"use client";

import Image from "next/image";
import { TEAM } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { CornerBracket } from "@/components/ui/CornerBracket";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

function PortraitFrame({ initials, photo }: { initials: string; photo?: string }) {
  return (
    <CornerBracket active={false} armLength={14} className="w-32 h-40 shrink-0 overflow-hidden">
      {photo ? (
        <Image
          src={photo}
          alt={initials}
          fill
          className="object-cover object-top"
          sizes="128px"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <span className="font-mono text-2xl text-steel tracking-widest">{initials}</span>
        </div>
      )}
      {/* Signal-green cast regardless of photo/initials */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,255,65,0.04) 0%, transparent 60%)",
        }}
      />
    </CornerBracket>
  );
}

export function SectionTeam() {
  const { ref, inView } = useSectionReveal(0.1);

  return (
    <section
      id="team"
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
          [ {TEAM.eyebrow} ]
        </div>

        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-12 leading-tight">
          {TEAM.headline}
        </h2>

        <div className="space-y-10">
          {TEAM.leaders.map((leader) => (
            <div key={leader.name} className="flex flex-col sm:flex-row gap-8">
              <PortraitFrame
                initials={leader.initials}
                photo={
                  leader.initials === "MW" ? "/team/weaver.png" :
                  leader.initials === "MM" ? "/team/moore.png" :
                  undefined
                }
              />
              <div className="flex-1">
                <div className="font-mono text-classified/70 text-[11px] tracking-widest mb-1">
                  {leader.name}
                </div>
                <div className="font-grotesk text-classified text-base font-medium mb-4">
                  {leader.title}
                </div>
                <p className="font-plex text-classified/70 text-sm leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
