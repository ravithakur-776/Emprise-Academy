"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/layout/Container";
import { Badge } from "@/components/ui/badge/Badge";
import { HOMEPAGE_DATA, LatestUpdateItem } from "@/data/homepage";
import { ETSE_CONFIG } from "@/config/etse";
import { ArrowRight, Bell, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnnouncementVisualConfig {
  imageSrc: string;
  imageAlt: string;
  formattedDate: string;
  categoryTag: string;
}

const ANNOUNCEMENT_VISUALS: Record<string, AnnouncementVisualConfig> = {
  "up-1": {
    imageSrc: "/images/announcements/etse-2026-exam-confirmed.jpg",
    imageAlt: "Emprise Academy ETSE 2026 Talent Search Examination",
    formattedDate: ETSE_CONFIG.shortDateDisplay.toUpperCase(),
    categoryTag: "ETSE",
  },
  "up-2": {
    imageSrc: "/images/announcements/new-batches-jee-neet.jpg",
    imageAlt: "Emprise Academy JEE and NEET new batches",
    formattedDate: "Session 2026–27",
    categoryTag: "ADMISSIONS",
  },
  "up-3": {
    imageSrc: "/images/announcements/etse-2026-digital-admit-cards.jpg",
    imageAlt: "Emprise Academy ETSE 2026 digital admit card",
    formattedDate: "Active Notice",
    categoryTag: "NOTICES",
  },
};

function getVisualConfig(update: LatestUpdateItem, idx: number): AnnouncementVisualConfig {
  if (update.id && ANNOUNCEMENT_VISUALS[update.id]) {
    return ANNOUNCEMENT_VISUALS[update.id];
  }
  if (update.title.toLowerCase().includes("examination date") || idx === 0) {
    return ANNOUNCEMENT_VISUALS["up-1"];
  }
  if (update.title.toLowerCase().includes("batches") || idx === 1) {
    return ANNOUNCEMENT_VISUALS["up-2"];
  }
  return ANNOUNCEMENT_VISUALS["up-3"];
}

export const LatestUpdatesSection: React.FC = () => {
  const updates: LatestUpdateItem[] = HOMEPAGE_DATA.latestUpdates;
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="updates"
      aria-label="Official Institutional Notices and Bulletins"
      className="w-full bg-[#F7F9FC] py-14 sm:py-18 lg:py-20 border-y border-[#DCE3EE] select-none"
    >
      {/* Anchor compatibility for existing #latest-updates links */}
      <div id="latest-updates" className="scroll-mt-24" />

      <Container size="xl" className="max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="md">
                <Bell className="w-3.5 h-3.5 mr-1 text-[#FF8A00]" />
                OFFICIAL NOTICES &amp; BULLETINS
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight leading-tight">
              Latest From <span className="text-[#2F6FED]">Emprise</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5B6578] font-normal leading-relaxed">
              Official academic notifications, examination schedules, and admission notices from the Mathura campus.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/etse-2026"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2F6FED] hover:text-[#173B73] transition-colors group min-h-[44px] py-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2F6FED] rounded-lg"
            >
              <span>View All Academy Announcements</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Announcements List: Editorial Horizontal Cards */}
        <div className="space-y-3 sm:space-y-3.5">
          {updates.map((update, idx) => {
            const visual = getVisualConfig(update, idx);

            return (
              <div
                key={update.id || idx}
                style={{
                  transitionDelay: hasAnimated ? `${idx * 100}ms` : "0ms",
                }}
                className={cn(
                  "transition-all duration-600 ease-out",
                  hasAnimated
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-[18px] motion-reduce:opacity-100 motion-reduce:translate-y-0"
                )}
              >
                <Link
                  href={update.href}
                  aria-label={`${update.title} - ${visual.categoryTag} official announcement`}
                  className="group relative block bg-white border border-[#DCE3EE] rounded-2xl lg:rounded-[20px] shadow-[0_2px_8px_rgba(20,33,61,0.03)] p-[18px] sm:p-5 lg:p-[22px] hover:border-[#2F6FED]/50 hover:shadow-[0_8px_24px_rgba(47,111,237,0.09)] hover:-translate-y-[3px] transition-all duration-300 ease-out text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2F6FED] focus-visible:ring-offset-2"
                >
                  {/* DESKTOP & TABLET LAYOUT (>= 640px) */}
                  <div className="hidden sm:flex items-center justify-between gap-5 lg:gap-6">
                    {/* 1. Desktop Thumbnail Image */}
                    <div className="relative shrink-0 w-[195px] lg:w-[215px] h-[125px] lg:h-[135px] aspect-[16/10] rounded-[14px] lg:rounded-[16px] overflow-hidden border border-[#DCE3EE] shadow-2xs bg-slate-100">
                      <Image
                        src={visual.imageSrc}
                        alt={visual.imageAlt}
                        fill
                        className="object-cover object-center transition-transform duration-350 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 1024px) 195px, 215px"
                        loading="lazy"
                      />
                      {/* Very subtle protective overlay to harmonize branding */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/10 via-transparent to-transparent pointer-events-none opacity-40" />
                    </div>

                    {/* 2. Desktop Content: Tags, Title, Description */}
                    <div className="min-w-0 flex-1 sm:pl-1 lg:pl-2 space-y-2">
                      {/* Meta Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F6FED] bg-[#EAF2FF] px-2.5 py-0.5 rounded-md border border-[#2F6FED]/25 font-mono inline-flex items-center">
                          {visual.categoryTag}
                        </span>
                        {update.isImportant && (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#C05621] bg-[#FFF7ED] px-2.5 py-0.5 rounded-md border border-[#F28C28]/35 font-mono">
                            <Sparkles className="w-2.5 h-2.5 text-[#F28C28]" />
                            <span>Important</span>
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#5B6578] bg-slate-100/90 px-2.5 py-0.5 rounded-md border border-[#DCE3EE] font-mono">
                          <Calendar className="w-3 h-3 text-[#5B6578]" />
                          <span>{visual.formattedDate}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base lg:text-[17px] font-bold text-[#172033] group-hover:text-[#2F6FED] transition-colors duration-200 leading-snug">
                        {update.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#5B6578] leading-relaxed line-clamp-2">
                        {update.preview}
                      </p>
                    </div>

                    {/* 3. Desktop Action Button */}
                    <div className="shrink-0 flex items-center gap-2.5 pl-2">
                      <span className="text-xs font-bold text-[#2F6FED] opacity-0 group-hover:opacity-100 transition-all duration-300 hidden xl:inline">
                        View Notice
                      </span>
                      <div
                        aria-hidden="true"
                        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#F0F4FA] group-hover:bg-[#2F6FED] text-[#173B73] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:shadow-sm"
                      >
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* MOBILE LAYOUT (< 640px) */}
                  <div className="sm:hidden flex flex-col gap-3">
                    {/* Top row: [ Small image (115x85px) ] [ Tags + Title ] */}
                    <div className="flex items-start gap-3.5">
                      <div className="relative shrink-0 w-[115px] h-[85px] rounded-xl overflow-hidden border border-[#DCE3EE] shadow-2xs bg-slate-100">
                        <Image
                          src={visual.imageSrc}
                          alt={visual.imageAlt}
                          fill
                          className="object-cover object-center transition-transform duration-350 ease-out group-hover:scale-[1.04]"
                          sizes="115px"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/10 via-transparent to-transparent pointer-events-none opacity-40" />
                      </div>

                      <div className="min-w-0 flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F6FED] bg-[#EAF2FF] px-2 py-0.5 rounded-md border border-[#2F6FED]/25 font-mono">
                            {visual.categoryTag}
                          </span>
                          {update.isImportant && (
                            <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-[#C05621] bg-[#FFF7ED] px-1.5 py-0.5 rounded-md border border-[#F28C28]/35 font-mono">
                              <Sparkles className="w-2.5 h-2.5 text-[#F28C28]" />
                              <span>Important</span>
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#5B6578] bg-slate-100/90 px-1.5 py-0.5 rounded-md border border-[#DCE3EE] font-mono">
                            <Calendar className="w-2.5 h-2.5 text-[#5B6578]" />
                            <span>{visual.formattedDate}</span>
                          </span>
                        </div>

                        <h3 className="text-[14px] font-bold text-[#172033] group-hover:text-[#2F6FED] transition-colors leading-snug line-clamp-2">
                          {update.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description below */}
                    <p className="text-xs text-[#5B6578] leading-relaxed line-clamp-2">
                      {update.preview}
                    </p>

                    {/* Mobile bottom action strip: Read Notice + 44px round arrow button */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-xs font-bold text-[#2F6FED]">
                        Read Official Notice
                      </span>
                      <div
                        aria-hidden="true"
                        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#F0F4FA] group-hover:bg-[#2F6FED] text-[#173B73] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
                      >
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
