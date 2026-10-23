"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA, HeroSlide } from "@/data/homepage";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Trophy,
  Award,
  GraduationCap,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const HeroSlider: React.FC = () => {
  const slides: HeroSlide[] = HOMEPAGE_DATA.heroSlides;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay with 5.5s duration
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);



  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  // Touch/Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = slides[current];
  const isImageSlide = Boolean(slide.isBannerImage);

  return (
    <section
      id="hero"
      aria-label="Promotional Hero Showcase"
      aria-roledescription="carousel"
      className={cn(
        "relative overflow-hidden select-none focus:outline-none transition-colors duration-500",
        isImageSlide
          ? "bg-[#F8FAFC] border-b border-[var(--brand-border)] text-[var(--brand-text)]"
          : "bg-gradient-to-b from-[#123E73] via-[#1769E0] to-[#0B2748] border-b border-blue-900/40 text-white"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      {/* Background Decorative Glows for Editorial Slides */}
      {!isImageSlide && (
        <>
          <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-[var(--brand-accent)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        </>
      )}

      {/* Subtle clean canvas texture for image slide */}
      {isImageSlide && (
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#1769E0_0.75px,transparent_0.75px)] [background-size:24px_24px]" />
      )}

      {/* Main Container: Wide, premium hero container (occupies 90-95% of available width) */}
      <div
        className={cn(
          "relative z-10 w-full mx-auto",
          isImageSlide
            ? "max-w-[1536px] px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-3 sm:pb-4"
            : "max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16"
        )}
      >
        {/* SLIDE CONTENT AREA */}
        {isImageSlide ? (
          /* ============================================================ */
          /* SLIDES 01-03: HIGH-RESOLUTION PROMOTIONAL CAMPAIGN BANNERS   */
          /* UNCOMPRESSED ORIGINAL MASTER ASSETS (6197x2478) - 100% CRISP */
          /* No text overlay, no artificial cards, no scaling distortion  */
          /* ============================================================ */
          <div className="w-full flex flex-col items-center">
            <Link
              href={slide.bannerImageHref || "/results"}
              className="block w-full group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-primary)]"
              aria-label={`View Emprise Academy ${slide.heading} results`}
            >
              <div className="relative w-full overflow-hidden rounded-[18px] sm:rounded-[20px] lg:rounded-[22px] bg-white border border-[var(--brand-border)] shadow-xs group-hover:shadow-md transition-shadow duration-200">
                <Image
                  src={slide.bannerImageSrc!}
                  alt={slide.bannerImageAlt || "Emprise Academy JEE Main and Advanced 2026 Mathura Toppers"}
                  width={6197}
                  height={2478}
                  preload={current === 0}
                  quality={82}
                  className="w-full h-auto object-contain block"
                  style={{
                    aspectRatio: "6197 / 2478",
                  }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 96vw, (max-width: 1536px) 94vw, 1480px"
                />
              </div>
            </Link>
          </div>
        ) : (
          /* ============================================================ */
          /* EDITORIAL SLIDES (ETSE 2026, 15+ Years Excellence, Courses)  */
          /* ============================================================ */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[320px] sm:min-h-[380px]">
            {/* Left Column: Heading, Subheading & CTAs */}
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wider uppercase text-amber-300 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                  <span>{slide.tag}</span>
                </span>

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-950/60 border border-blue-300/20 text-[11px] font-semibold text-blue-100">
                  {slide.badge}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                {slide.heading}
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 leading-relaxed max-w-2xl font-normal">
                {slide.subheading}
              </p>

              {slide.supportingInfo && (
                <div className="inline-flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-black/20 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-amber-300">
                  <Calendar className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                  <span>{slide.supportingInfo}</span>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link href={slide.primaryBtn.href}>
                  <Button
                    variant="accent"
                    size="lg"
                    className="font-bold bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {slide.primaryBtn.label}
                  </Button>
                </Link>

                {slide.secondaryBtn && (
                  <Link href={slide.secondaryBtn.href}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-white border-white/30 hover:bg-white/10 font-semibold"
                    >
                      {slide.secondaryBtn.label}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Column: Refined Feature Panel */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="relative p-7 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl space-y-5 max-w-sm w-full text-left">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--brand-accent)] to-orange-600 text-white flex items-center justify-center shadow-md">
                    {current === 1 && <Trophy className="w-6 h-6" />}
                    {current === 2 && <Award className="w-6 h-6" />}
                    {current === 3 && <GraduationCap className="w-6 h-6" />}
                  </div>

                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                    Slide {current + 1} / {slides.length}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white">
                    {slide.tag}
                  </h3>
                  <p className="text-xs text-blue-100/80 leading-relaxed line-clamp-3">
                    {slide.subheading}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>IITian & NITian Expert Faculty</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Strict Batch Cap (35–40 Students)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Bhuteshwar Road, Mathura Campus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SAFE OUTER CAROUSEL CONTROLS & PAGINATION                    */}
        {/* Placed cleanly below the banner, NEVER covering students     */}
        {/* ============================================================ */}
        <div
          className={cn(
            "pt-3 sm:pt-4 flex items-center justify-between w-full",
            isImageSlide
              ? "border-t border-[var(--brand-border)] mt-3 sm:mt-4"
              : "border-t border-white/10 mt-8 sm:mt-12"
          )}
        >
          {/* Left: Pagination Dots & Slide Number Indicator */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    current === index
                      ? isImageSlide
                        ? "w-7 sm:w-8 bg-[var(--brand-primary)] shadow-xs"
                        : "w-7 sm:w-8 bg-[var(--brand-accent)] shadow-xs"
                      : isImageSlide
                      ? "w-2 bg-slate-300 hover:bg-slate-400"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  )}
                />
              ))}
            </div>

            <span
              className={cn(
                "text-[11px] sm:text-xs font-semibold ml-1.5 font-mono",
                isImageSlide ? "text-[var(--brand-text-secondary)]" : "text-white/80"
              )}
            >
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Right: Previous and Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className={cn(
                "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer",
                isImageSlide
                  ? "bg-white border border-[var(--brand-border)] text-[var(--brand-text)] hover:bg-[var(--brand-primary-soft)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]/40 shadow-2xs active:scale-95"
                  : "bg-white/10 hover:bg-white/20 border border-white/20 text-white active:scale-95"
              )}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className={cn(
                "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all cursor-pointer",
                isImageSlide
                  ? "bg-white border border-[var(--brand-border)] text-[var(--brand-text)] hover:bg-[var(--brand-primary-soft)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]/40 shadow-2xs active:scale-95"
                  : "bg-white/10 hover:bg-white/20 border border-white/20 text-white active:scale-95"
              )}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
