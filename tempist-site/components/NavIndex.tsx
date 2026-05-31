"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function NavIndex() {
  const [activeId, setActiveId] = useState<string>("cover");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const visible = entries.find((e) => e.isIntersecting);
      if (visible) setActiveId(visible.target.id);
    }, options);

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 hidden md:flex items-center h-14 nav-glass relative"
      aria-label="Document index"
    >
      {/* Wordmark — fixed left, links back to cover */}
      <a
        href="#cover"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("cover")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="shrink-0 flex items-center h-full px-8 lg:px-10 cursor-pointer border-r border-white/[0.07]"
      >
        <Image
          src="/tempist-logo-horizontal.png"
          alt="Tempist Systems"
          width={536}
          height={173}
          className="h-10 w-auto opacity-90"
          priority
        />
      </a>

      {/* Section index — horizontally scrollable */}
      <div className="flex items-center gap-6 px-8 whitespace-nowrap overflow-x-auto nav-scrollbar-hide flex-1">
        {NAV_ITEMS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "font-mono text-[10px] tracking-wider transition-colors duration-200 flex items-center gap-1.5 cursor-pointer shrink-0",
              activeId === id ? "text-classified" : "text-steel hover:text-classified"
            )}
            aria-current={activeId === id ? "location" : undefined}
          >
            {activeId === id && (
              <span className="w-[3px] h-[3px] rounded-full bg-signal shrink-0" aria-hidden />
            )}
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
