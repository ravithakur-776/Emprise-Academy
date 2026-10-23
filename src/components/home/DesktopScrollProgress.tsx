"use client";

import React, { useEffect, useState, useTransition } from "react";

interface SectionCheckpoint {
  id: string;
  number: string;
  label: string;
}

const SECTION_CHECKPOINTS: SectionCheckpoint[] = [
  { id: "hero", number: "01", label: "Hero" },
  { id: "proof-band", number: "02", label: "Trust & Legacy" },
  { id: "about-intro", number: "03", label: "About" },
  { id: "directors", number: "04", label: "Leadership" },
  { id: "programs", number: "05", label: "Programs" },
  { id: "etse-banner", number: "06", label: "ETSE 2026" },
  { id: "why-emprise", number: "07", label: "Advantage" },
  { id: "emprise-system", number: "08", label: "System" },
  { id: "results", number: "09", label: "Results" },
  { id: "gallery", number: "10", label: "Campus Life" },
  { id: "updates", number: "11", label: "Newsroom" },
  { id: "testimonials", number: "12", label: "Reviews" },
  { id: "faqs", number: "13", label: "FAQs" },
  { id: "campus-location", number: "14", label: "Visit Us" },
];

export const DesktopScrollProgress: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (window.innerWidth < 1280) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = docHeight > 0 ? Math.min(100, Math.max(0, (currentScroll / docHeight) * 100)) : 0;
          setScrollProgress(progress);

          // Find current section in view
          const scrollPosition = currentScroll + window.innerHeight * 0.35;
          let current = SECTION_CHECKPOINTS[0].id;

          for (const section of SECTION_CHECKPOINTS) {
            const el = document.getElementById(section.id);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                current = section.id;
              }
            }
          }

          startTransition(() => {
            setActiveSection(current);
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Page scroll progress navigation"
      className="fixed right-4 2xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2 pointer-events-none select-none"
    >
      {/* Background Track with Dynamic Fill Line */}
      <div className="relative flex flex-col items-center py-2.5 px-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#E3EAF3]/90 shadow-[0_4px_24px_rgba(18,62,115,0.08)] pointer-events-auto">
        {/* Subtle Vertical Progress Guide */}
        <div className="absolute top-3 bottom-3 w-[2px] bg-[#E3EAF3] rounded-full overflow-hidden">
          <div
            className="w-full bg-[#1769E0] transition-all duration-150 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        {/* Section Dots */}
        <div className="relative flex flex-col gap-2.5 z-10">
          {SECTION_CHECKPOINTS.map((checkpoint) => {
            const isActive = activeSection === checkpoint.id;
            const isHovered = hoveredSection === checkpoint.id;

            return (
              <div
                key={checkpoint.id}
                className="relative flex items-center justify-end group"
                onMouseEnter={() => setHoveredSection(checkpoint.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Floating Tooltip Label */}
                <div
                  className={`absolute right-6 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider whitespace-nowrap shadow-md transition-all duration-200 pointer-events-none ${
                    isHovered
                      ? "opacity-100 translate-x-0 bg-[#123E73] text-white"
                      : "opacity-0 translate-x-1"
                  }`}
                >
                  <span className="text-[#FF8A00] font-mono mr-1.5">{checkpoint.number}</span>
                  <span>{checkpoint.label}</span>
                </div>

                {/* Interactive Dot */}
                <button
                  type="button"
                  onClick={() => scrollToSection(checkpoint.id)}
                  aria-label={`Scroll to ${checkpoint.label} section`}
                  aria-current={isActive ? "true" : undefined}
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769E0] ${
                    isActive
                      ? "scale-125"
                      : "hover:scale-110"
                  }`}
                >
                  <span
                    className={`block rounded-full transition-all duration-200 ${
                      isActive
                        ? "w-2.5 h-2.5 bg-[#1769E0] ring-4 ring-[#1769E0]/20"
                        : "w-1.5 h-1.5 bg-[#8791A5]/60 hover:bg-[#1769E0]"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
