"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button/Button";
import {
  Trophy,
  Award,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ResultStreamCategory = "ALL" | "JEE_ADVANCED" | "JEE_MAIN" | "NEET";

interface FeaturedResultCreative {
  id: string;
  category: "JEE_ADVANCED" | "JEE_MAIN" | "NEET";
  categoryLabel: string;
  tag: string;
  badge: string;
  heading: string;
  subheading: string;
  keyMetric: string;
  highlights: string[];
  students: string[];
  imageSrc: string;
  imageAlt: string;
  targetHref: string;
}

const MASTER_RESULT_CREATIVES: FeaturedResultCreative[] = [
  {
    id: "res-jee-toppers-2026",
    category: "JEE_ADVANCED",
    categoryLabel: "JEE Advanced & Main",
    tag: "JEE MAIN + ADVANCED 2026 • MATHURA TOPPERS",
    badge: "MATHURA'S HIGHEST SUCCESS RATE",
    heading: "Mathura Toppers — JEE (Main + Advanced) 2026",
    subheading:
      "Celebrating 10 achievers securing admissions in IIT Bombay, IIT Guwahati, IIT Jodhpur, IIT Dhanbad, IIIT Delhi, NITs, and premier national institutes.",
    keyMetric: "10+ Selections in Premier IITs & NITs",
    highlights: [
      "Selections in IIT Bombay, IIT Guwahati, IIT Dhanbad & IIIT Delhi",
      "Consistent full-syllabus test series benchmarked against Kota standards",
      "Director-led advanced problem-solving & doubt clearance",
    ],
    students: [
      "Atul Dagur (IIT Bombay)",
      "Govind Gupta (IIT Bombay)",
      "Utkarsh Pandey (IIT Dhanbad)",
      "Vishal (IIT Guwahati)",
    ],
    imageSrc: "/images/emprise-jee-main-advanced-2026-mathura-toppers.png",
    imageAlt: "Emprise Academy JEE Main and Advanced 2026 Mathura Toppers",
    targetHref: "/results",
  },
  {
    id: "res-iit-bombay-2025-2026",
    category: "JEE_ADVANCED",
    categoryLabel: "JEE Advanced",
    tag: "JEE ADVANCED 2025 & 2026 • IIT BOMBAY ACHIEVERS",
    badge: "BACK-TO-BACK TOP PERFORMERS",
    heading: "Back-to-Back IIT Bombay Achievers",
    subheading:
      "Celebrating Govind Gupta (JEE Advanced 2025) and Atul Dagur (JEE Advanced 2026) achieving top ranks and prestigious admissions to IIT Bombay.",
    keyMetric: "Consecutive Years IIT Bombay Admissions",
    highlights: [
      "Atul Dagur — Computer Science & Engineering, IIT Bombay",
      "Govind Gupta — Premier B.Tech Program, IIT Bombay",
      "2-Year intensive classroom concept coaching in Mathura",
    ],
    students: [
      "Atul Dagur (AIR 412 / 642 • IIT Bombay)",
      "Govind Gupta (IIT Bombay)",
    ],
    imageSrc: "/images/emprise-back-to-back-iit-bombay-achievers-2025-2026.png",
    imageAlt: "Emprise Academy Back-to-Back IIT Bombay Achievers 2025 and 2026",
    targetHref: "/results",
  },
  {
    id: "res-jee-main-2026",
    category: "JEE_MAIN",
    categoryLabel: "JEE Main",
    tag: "JEE MAIN 2026 • TOP PERFORMERS",
    badge: "99+ PERCENTILE ACHIEVERS",
    heading: "JEE Main 2026 — Top Performers",
    subheading:
      "Behind every rank is a story of disciplined dedication: Rajeev Nain (99.42 %ile), Ashis Kumar (99.23 %ile), and Atul Dagur (99.22 %ile) — Year after year in Mathura.",
    keyMetric: "Multiple 99+ Percentile Scorers",
    highlights: [
      "Rajeev Nain — 99.42 Percentile",
      "Ashis Kumar — 99.23 Percentile",
      "Atul Dagur — 99.22 Percentile",
    ],
    students: [
      "Rajeev Nain (99.42 %ile)",
      "Ashis Kumar (99.23 %ile)",
      "Atul Dagur (99.22 %ile)",
    ],
    imageSrc: "/images/emprise-jee-main-2026-top-performers.png",
    imageAlt: "Emprise Academy JEE Main 2026 Top Performers — Rajeev Nain, Ashis Kumar, Atul Dagur",
    targetHref: "/results",
  },
  {
    id: "res-neet-ug-2026",
    category: "NEET",
    categoryLabel: "NEET (UG)",
    tag: "NEET (UG) 2026 • OFFICIAL RESULTS",
    badge: "MATHURA DISTRICT TOP MEDICAL RANKS",
    heading: "NEET (UG) 2026 — Mathura Result",
    subheading:
      "Celebrating top medical achievers: Bhanu Pratap Tomar (AIR 1794, OBC), Shreya Agrawal (AIR 8570), Ashwani Kr. Sahni (AIR 16734), Srishti Saraswat (AIR 18162), Shreya Yadav (AIR 16937, OBC), Khushi (AIR 3480, Category Rank) — Your Dream. Our Guidance. Your Success.",
    keyMetric: "Top Medical Selections in Mathura",
    highlights: [
      "Bhanu Pratap Tomar — AIR 1794 (OBC Category)",
      "Shreya Agrawal — AIR 8570",
      "Intensive NCERT Biology & Chemistry mastery curriculum",
    ],
    students: [
      "Bhanu Pratap Tomar (AIR 1794)",
      "Shreya Agrawal (AIR 8570)",
      "Ashwani Kr. Sahni (AIR 16734)",
      "Srishti Saraswat (AIR 18162)",
    ],
    imageSrc: "/images/emprise-neet-ug-2026-result-achievers.png",
    imageAlt: "Emprise Academy NEET UG 2026 Result — Mathura Achievers",
    targetHref: "/results",
  },
  {
    id: "res-top-iit-jee-performers",
    category: "JEE_ADVANCED",
    categoryLabel: "IIT-JEE Legacy",
    tag: "IIT-JEE ACHIEVEMENT LEGACY • TOP PERFORMERS",
    badge: "15 YEARS OF ACADEMIC EXCELLENCE",
    heading: "Top IIT-JEE Performers — Consistent Excellence",
    subheading:
      "Consistent excellence & brighter futures: Utkarsh (IIT-Dhanbad, 99.07 %ile, 100 Percentile Physics, JEE Main 2024), Shravan (IIT-Kanpur, 99.59 %ile, AIR-92 Cat., JEE Main 2023), and Umesh (IIT-Delhi, 99.86 %ile, AIR-645 Gen., JEE Main 2022).",
    keyMetric: "IIT Dhanbad, IIT Kanpur & IIT Delhi",
    highlights: [
      "Utkarsh — 99.07 %ile & 100 %ile Physics (IIT Dhanbad)",
      "Shravan — 99.59 %ile & AIR-92 Category (IIT Kanpur)",
      "Umesh — 99.86 %ile & AIR-645 General (IIT Delhi)",
    ],
    students: [
      "Utkarsh (IIT Dhanbad)",
      "Shravan (IIT Kanpur)",
      "Umesh (IIT Delhi)",
    ],
    imageSrc: "/images/emprise-top-iit-jee-performers-achievement-legacy.png",
    imageAlt: "Emprise Academy — Top IIT-JEE Performers Achievement Legacy (Utkarsh IIT Dhanbad, Shravan IIT Kanpur, Umesh IIT Delhi)",
    targetHref: "/results",
  },
  {
    id: "res-neet-excellence-aiims",
    category: "NEET",
    categoryLabel: "NEET (UG) • AIIMS",
    tag: "A LEGACY OF NEET EXCELLENCE • TOP PERFORMERS",
    badge: "AIIMS ADMISSIONS ACHIEVERS",
    heading: "A Legacy of NEET Excellence — Top Performers",
    subheading:
      "Celebrating top medical performers: Tanisha (AIIMS Raebareli, NEET 2024), Aayan (AIIMS Gorakhpur, NEET 2023), and Shobhit (AIIMS Jodhpur, NEET 2022) — Medicos Begin Here! Your Dream. Our Guidance. Brighter Futures.",
    keyMetric: "Consistent AIIMS Admissions Year After Year",
    highlights: [
      "Tanisha — AIIMS Raebareli (NEET 2024)",
      "Aayan — AIIMS Gorakhpur (NEET 2023)",
      "Shobhit — AIIMS Jodhpur (NEET 2022)",
    ],
    students: [
      "Tanisha (AIIMS Raebareli)",
      "Aayan (AIIMS Gorakhpur)",
      "Shobhit (AIIMS Jodhpur)",
    ],
    imageSrc: "/images/emprise-legacy-of-neet-excellence-aiims-toppers.png",
    imageAlt: "Emprise Academy — A Legacy of NEET Excellence AIIMS Toppers (Tanisha, Aayan, Shobhit)",
    targetHref: "/results",
  },
  {
    id: "res-neet-2025-top-performers",
    category: "NEET",
    categoryLabel: "NEET (UG) 2025",
    tag: "NEET 2025 RESULT • TOP PERFORMERS",
    badge: "GLORY OF NEET • AIR 4460",
    heading: "NEET 2025 Result — Top Performers",
    subheading:
      "A perfect key to unlock hidden potential: Anil Yadav (AIR 4460), Rahul (AIR-5209 OBC), Rahul Kumar (AIR-2036 Gen-EWS), Deepak Singh (AIR-8483 OBC), Chandrabhan (AIR-27707) and many more achievers.",
    keyMetric: "AIR 4460 & Multiple Top 10K Medical Ranks",
    highlights: [
      "Anil Yadav — AIR 4460 in NEET",
      "Rahul Kumar — AIR 2036 (Gen-EWS)",
      "Rahul — AIR 5209 (OBC Category)",
      "Deepak Singh — AIR 8483 (OBC Category)",
    ],
    students: [
      "Anil Yadav (AIR 4460)",
      "Rahul (AIR 5209)",
      "Rahul Kumar (AIR 2036)",
      "Deepak Singh (AIR 8483)",
      "Chandrabhan (AIR 27707)",
    ],
    imageSrc: "/images/emprise-neet-2025-result-top-performers.png",
    imageAlt: "Emprise Academy NEET 2025 Result Top Performers — Anil Yadav AIR 4460, Rahul, Rahul Kumar, Deepak Singh, Chandrabhan",
    targetHref: "/results",
  },
  {
    id: "res-jee-adv-2025-govind",
    category: "JEE_ADVANCED",
    categoryLabel: "JEE Advanced 2025",
    tag: "JEE ADVANCED 2025 • SPARKLING SUCCESS",
    badge: "AIR 404 GEN. (EWS) • IIT BOMBAY",
    heading: "JEE Advanced 2025 — Govind Gupta (AIR 404)",
    subheading:
      "Sparkling success of Empriseians: Govind Gupta (Emprise Topper) — AIR 404 Gen. (EWS), 99.65 %ile JEE Main, Selected in Indian Institute of Technology Bombay (IIT Bombay). From Potential to Possibilities.",
    keyMetric: "AIR 404 Gen. (EWS) • IIT Bombay Admission",
    highlights: [
      "Govind Gupta — AIR 404 General (EWS) in JEE Advanced",
      "99.65 Percentile in JEE Main",
      "Selected in premier B.Tech program at IIT Bombay",
    ],
    students: [
      "Govind Gupta (AIR 404 • IIT Bombay)",
      "Emprise Topper",
    ],
    imageSrc: "/images/emprise-jee-advanced-2025-govind-gupta-air-404-iit-bombay.png",
    imageAlt: "Emprise Academy JEE Advanced 2025 — Govind Gupta AIR 404 Selected in IIT-Bombay",
    targetHref: "/results",
  },
];

const CATEGORY_TABS: { id: ResultStreamCategory; label: string }[] = [
  { id: "ALL", label: "All Results" },
  { id: "JEE_ADVANCED", label: "JEE Advanced" },
  { id: "JEE_MAIN", label: "JEE Main" },
  { id: "NEET", label: "NEET (UG)" },
];

export const ResultsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ResultStreamCategory>("ALL");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter creatives based on category
  const filteredCreatives = MASTER_RESULT_CREATIVES.filter((item) => {
    if (selectedCategory === "ALL") return true;
    return item.category === selectedCategory;
  });

  const totalItems = filteredCreatives.length;
  const activeItem = filteredCreatives[currentIndex] || filteredCreatives[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const handleCategorySelect = (cat: ResultStreamCategory) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };



  // 5.5s Autoplay with pause on hover/focus/reduced motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;
    }

    if (isPaused || totalItems <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalItems, handleNext]);

  return (
    <section
      id="results"
      aria-label="Academic Achievements and Verified Results"
      className="w-full bg-gradient-to-b from-[#0F2D54] via-[#123E73] to-[#0A2240] text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden border-y border-blue-900/60 select-none shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Ambient Radial Lighting & Micro-Dot Academic Texture */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1769E0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF8A00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <Container size="xl" className="relative z-10 max-w-[1536px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-bold shadow-xs">
            <Trophy className="w-4 h-4 text-[#FF8A00]" />
            <span>VERIFIED ACADEMIC ACHIEVEMENTS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-white tracking-tight leading-tight">
            Performance <span className="text-[#38BDF8]">That Speaks For Itself</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-2xl mx-auto font-normal">
            Verified achievements of Emprise Academy students across JEE Advanced, NEET-UG, JEE Main, and Foundation Olympiads.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div
            role="tablist"
            aria-label="Filter Results by Competitive Stream"
            className="inline-flex p-1.5 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 gap-1.5 shadow-inner"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategorySelect(tab.id)}
                  className={cn(
                    "relative px-4 sm:px-6 py-2.5 min-h-[44px] inline-flex items-center justify-center rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769E0]",
                    isActive
                      ? "bg-[#1769E0] text-white shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#FF8A00] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* DOMINANT MAIN RESULT SHOWCASE (Asymmetric Editorial Split)    */}
        {/* ============================================================ */}
        <div className="rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/20 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (~42%): Editorial Achievement Details */}
            <div className="lg:col-span-5 space-y-5 text-left order-2 lg:order-1">
              {/* Stream Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1769E0]/80 border border-[#1769E0] text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{activeItem.badge}</span>
                </span>
                <span className="text-xs font-semibold text-amber-300">
                  {activeItem.categoryLabel}
                </span>
              </div>

              {/* Headline */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {activeItem.heading}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed mt-2.5">
                  {activeItem.subheading}
                </p>
              </div>

              {/* Key Metric Badge */}
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent)]/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                    Institutional Benchmark
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {activeItem.keyMetric}
                  </span>
                </div>
              </div>

              {/* Highlight Students Chips */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Featured Top Performers
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeItem.students.map((student, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-semibold text-white tracking-wide"
                    >
                      {student}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Seal & Direct Link */}
              <div className="pt-2 flex items-center justify-between border-t border-white/15">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Official Record</span>
                </span>

                <Link
                  href={activeItem.targetHref}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white transition-colors"
                >
                  <span>Explore Results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column (~58%): High-Resolution Master Result Creative */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center">
              <Link
                href={activeItem.targetHref}
                className="block w-full group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769E0]"
                aria-label={`View Emprise Academy ${activeItem.heading} details`}
              >
                <div className="relative w-full overflow-hidden rounded-[18px] sm:rounded-[22px] bg-white border border-white/20 shadow-2xl transition-all duration-300 group-hover:border-amber-400/60 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <Image
                    src={activeItem.imageSrc}
                    alt={activeItem.imageAlt}
                    width={6197}
                    height={2478}
                    loading="lazy"
                    quality={82}
                    className="w-full h-auto object-contain block transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                    style={{
                      aspectRatio: "6197 / 2478",
                    }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 96vw, 950px"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SAFE CAROUSEL CONTROLS & PAGINATION BELOW ARTWORK             */}
          {/* ============================================================ */}
          <div className="pt-6 mt-6 sm:pt-8 sm:mt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Interactive Jump Thumbnails / Dots */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {filteredCreatives.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to result ${idx + 1}: ${item.heading}`}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      currentIndex === idx
                        ? "w-8 bg-[#FF8A00] shadow-xs"
                        : "w-2.5 bg-white/30 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>

              <span className="text-xs font-semibold text-slate-300 font-mono ml-2">
                {String(currentIndex + 1).padStart(2, "0")} / {String(totalItems).padStart(2, "0")}
              </span>
            </div>

            {/* Right: Circular Navigation Buttons (44x44px min touch target) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous result creative"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#1769E0] border border-white/20 hover:border-[#1769E0] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next result creative"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#1769E0] border border-white/20 hover:border-[#1769E0] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COMPACT HORIZONTAL VISUAL PROOF STRIP                        */}
        {/* ============================================================ */}
        <div className="mb-10 py-5 px-6 rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/15">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 md:divide-x divide-white/15 text-center">
            <div className="py-2 px-3">
              <div className="text-xl sm:text-2xl font-extrabold text-white">15+ Years</div>
              <div className="text-xs text-amber-300/90 font-semibold uppercase mt-0.5">Academic Excellence</div>
            </div>
            <div className="py-2 px-3">
              <div className="text-xl sm:text-2xl font-extrabold text-white">5000+</div>
              <div className="text-xs text-amber-300/90 font-semibold uppercase mt-0.5">Students Mentored</div>
            </div>
            <div className="py-2 px-3">
              <div className="text-xl sm:text-2xl font-extrabold text-white">700+</div>
              <div className="text-xs text-amber-300/90 font-semibold uppercase mt-0.5">Students Qualified</div>
            </div>
            <div className="py-2 px-3">
              <div className="text-xl sm:text-2xl font-extrabold text-white">200+</div>
              <div className="text-xs text-amber-300/90 font-semibold uppercase mt-0.5">IITians &amp; Doctors Alumni</div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* OFFICIAL SCORECARD VERIFICATION GATEWAY                      */}
        {/* ============================================================ */}
        <div className="rounded-3xl bg-white/[0.08] backdrop-blur-xl border border-white/20 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-amber-300 font-bold border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Verified Candidate Archive</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Verify Official Examination Scorecards
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                Enrolled students and parents can instantly verify official examination results, subject-wise marks, All India Ranks, and scholarship percentages.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
              <Link href="/results" className="w-full">
                <Button
                  variant="accent"
                  size="md"
                  fullWidth
                  className="font-bold bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View All Results →
                </Button>
              </Link>
              <Link href="/results#verify-scorecard" className="w-full">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  className="text-white border-white/30 hover:bg-white/10 text-xs font-semibold"
                  leftIcon={<Lock className="w-3.5 h-3.5 text-amber-300" />}
                >
                  Scorecard Lookup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
