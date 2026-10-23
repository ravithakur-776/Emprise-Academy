"use client";

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomepageDirectorLeader } from "@/data/directors";
import { GraduationCap, ArrowRight, Quote, Briefcase } from "lucide-react";
import sushilPhoto from "../../../public/images/directors/sushil-dagur.jpg";
import rakeshPhoto from "../../../public/images/directors/rakesh-kumar.jpg";

const DIRECTOR_STATIC_PHOTOS: Record<string, typeof sushilPhoto> = {
  "sushil-dagur": sushilPhoto,
  "rakesh-kumar": rakeshPhoto,
  "/images/directors/sushil-dagur.jpg": sushilPhoto,
  "/images/directors/rakesh-kumar.jpg": rakeshPhoto,
};

interface DirectorLeadershipCardProps {
  director: HomepageDirectorLeader;
  className?: string;
}

export const DirectorLeadershipCard: React.FC<DirectorLeadershipCardProps> = ({
  director,
  className = "",
}) => {
  const cardRef = useRef<HTMLElement>(null);

  // Lightweight pointer tracking for subtle 3D perspective tilt (max ~2.5 degrees)
  // Zero React re-renders via native CSS variables
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    const rotateX = -deltaY * 2.2;
    const rotateY = deltaX * 2.5;

    card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--mx", `${x.toFixed(1)}px`);
    card.style.setProperty("--my", `${y.toFixed(1)}px`);
    card.style.setProperty("--ty", "-5px");
    card.style.setProperty("--glow-opacity", "1");
  }, []);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--ty", "0px");
    card.style.setProperty("--glow-opacity", "0");
  }, []);

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group/card relative rounded-[22px] bg-white border border-[#E3EAF3] p-6 sm:p-8 text-left flex flex-col justify-between overflow-hidden cursor-default select-none shadow-[0_1px_3px_0_rgba(11,39,72,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(18,62,115,0.1),0_4px_12px_-2px_rgba(18,62,115,0.04)] hover:border-[#1769E0]/45 transition-[transform,box-shadow,border-color,opacity] duration-200 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none ${className}`}
      style={{
        transform:
          "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--ty, 0px))",
      }}
    >
      {/* Subtle Top Accent Bar */}
      <div
        className="absolute top-0 left-8 right-8 h-[2.5px] rounded-full bg-gradient-to-r from-[#1769E0] to-[#FF8A00] opacity-75 group-hover/card:opacity-100 transition-opacity"
        aria-hidden="true"
      />

      {/* Subtle Cursor-Following Radial Highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 motion-reduce:hidden"
        style={{
          opacity: "var(--glow-opacity, 0)",
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(23, 105, 224, 0.05), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* 1. Director Header: Photo, Name, Role & Education */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
          {/* PHOTO */}
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100 shadow-xs">
            <Image
              src={
                (director.slug && DIRECTOR_STATIC_PHOTOS[director.slug]) ||
                (director.photoUrl && DIRECTOR_STATIC_PHOTOS[director.photoUrl]) ||
                director.photoUrl
              }
              alt={`${director.name} — Director, Emprise Academy`}
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover object-top transition-transform duration-300 ease-out group-hover/card:scale-[1.02]"
              loading="lazy"
              quality={85}
            />
          </div>

          {/* Identity Info: NAME, ROLE, EDUCATION */}
          <div className="space-y-1.5 min-w-0 flex-1 pt-0.5">
            <h3 className="text-xl sm:text-2xl font-bold text-[#14213D] tracking-tight group-hover/card:text-[#1769E0] transition-colors leading-snug">
              {director.name}
            </h3>

            <p className="text-xs sm:text-sm font-semibold text-[#FF8A00] leading-snug">
              {director.role}
            </p>

            <div className="flex items-start sm:items-center gap-1.5 text-xs text-[#667085] pt-0.5 leading-snug">
              <GraduationCap className="w-3.5 h-3.5 text-[#667085]/70 shrink-0 mt-0.5 sm:mt-0" />
              <span className="line-clamp-2 sm:line-clamp-1">{director.education || director.educationSummary}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#667085] pt-0.5 leading-snug">
              <Briefcase className="w-3.5 h-3.5 text-[#667085]/70 shrink-0" />
              <span>{director.experience || "15+ Years of Experience"}</span>
            </div>
          </div>
        </div>

        {/* Visual Separator */}
        <div className="h-[1px] bg-[#E3EAF3] my-5" aria-hidden="true" />

        {/* 2. Professional Journey / Biography Paragraph */}
        <div className="text-[#667085] text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.72] sm:leading-[1.75]">
          <p>{director.bio || director.biography}</p>
        </div>

        {/* 3. Dedicated Leadership Philosophy Panel */}
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-[#EEF5FF]/70 border-l-[3.5px] border-l-[#1769E0] text-slate-700 relative shadow-2xs">
          <div className="flex items-center gap-1.5 mb-2">
            <Quote className="w-3.5 h-3.5 text-[#1769E0] shrink-0" />
            <span className="text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase text-[#123E73]">
              LEADERSHIP PHILOSOPHY
            </span>
          </div>

          <blockquote className="text-xs sm:text-[13.5px] italic text-[#14213D] leading-relaxed">
            {director.philosophy.startsWith("“") ? director.philosophy : `“${director.philosophy}”`}
          </blockquote>

          <div className="text-[11px] sm:text-xs font-semibold text-[#1769E0] mt-2.5 tracking-tight not-italic">
            {director.signature}
          </div>
        </div>
      </div>

      {/* 4. Bottom Footer: Read Full Profile CTA */}
      <div className="pt-4 mt-5 border-t border-[#E3EAF3] flex items-center justify-between relative z-10">
        <Link
          href={`/directors/${director.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1769E0] hover:text-[#123E73] group-hover/card:translate-x-0.5 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769E0]"
        >
          <span>Read Full Profile</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/card:translate-x-0.5" />
        </Link>

        <span className="text-[11px] font-medium text-slate-400">
          Mathura Campus
        </span>
      </div>
    </article>
  );
};
