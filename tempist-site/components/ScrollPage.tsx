"use client";

import { useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useSpring, motion } from "motion/react";
import { AtmosphericField } from "@/components/ui/AtmosphericField";
import { BootSequence } from "@/components/BootSequence";
import { NavIndex } from "@/components/NavIndex";
import { SectionCover } from "@/components/sections/SectionCover";
import { SectionDoctrine } from "@/components/sections/SectionDoctrine";
import { SectionMission } from "@/components/sections/SectionMission";
import { SectionThreat } from "@/components/sections/SectionThreat";
import { SectionEscalation } from "@/components/sections/SectionEscalation";
import { SectionPortfolio } from "@/components/sections/SectionPortfolio";
import { SectionOEM } from "@/components/sections/SectionOEM";
import { SectionRaise } from "@/components/sections/SectionRaise";
import { SectionDealTerms } from "@/components/sections/SectionDealTerms";
import { SectionStepUp } from "@/components/sections/SectionStepUp";
import { SectionTeam } from "@/components/sections/SectionTeam";
import { SectionExtended } from "@/components/sections/SectionExtended";
import { SectionClose } from "@/components/sections/SectionClose";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// HYBRID depth mode — background drifts 4–8%, content fades only, no parallax on content
const DEPTH_MODE = "HYBRID" as const;

export function ScrollPage() {
  const [booted, setBooted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Atmospheric field drifts 0%→8% in HYBRID mode
  const bgYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : DEPTH_MODE === "HYBRID" ? ["0%", "8%"] : ["0%", "3%"]
  );
  const bgY = useSpring(bgYRaw, { stiffness: 20, damping: 40, mass: 1 });

  // Note: grid drift (0%→4%) is handled inside AtmosphericField canvas directly,
  // which combines atmospheric+grid into a single GPU layer. gridY is unused.

  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      <div
        ref={containerRef}
        className="relative"
        style={{ opacity: booted ? 1 : 0, transition: "opacity 300ms ease-out" }}
      >
        {/* Depth layer 1: Atmospheric field — fixed backdrop drifting on scroll */}
        <motion.div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ y: bgY }}
        >
          <AtmosphericField className="w-full h-full" />
        </motion.div>

        {/* Depth layer 2: Scanline texture — fixed, never on type */}
        <div
          className="fixed inset-0 z-0 pointer-events-none scanline-overlay opacity-60"
          aria-hidden
        />

        {/* Document index navigation */}
        <NavIndex />

        {/* Scrollable content stack — pt-14 offsets the fixed top nav (h-14 = 56px) */}
        <main className="relative z-10 pt-14">
          <SectionCover />
          <SectionDoctrine />
          <SectionMission />
          <SectionThreat />
          <SectionEscalation />
          <SectionPortfolio />
          <SectionOEM />
          <SectionRaise />
          <SectionDealTerms />
          <SectionStepUp />
          <SectionTeam />
          <SectionExtended />
          <SectionClose />
        </main>
      </div>
    </>
  );
}
