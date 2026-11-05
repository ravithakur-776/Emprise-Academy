"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button/Button";
import { ArrowRight, Sparkles, Phone, Trophy, GraduationCap } from "lucide-react";
import { ETSE_CONFIG } from "@/config/etse";

export const FinalCtaSection: React.FC = () => {
  return (
    <section
      id="final-cta"
      aria-label="Start Academic Journey at Emprise Academy"
      className="w-full bg-[#F8FAFC] py-16 sm:py-20 lg:py-24 select-none"
    >
      <Container size="xl">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#123E73] via-[#0D2F57] to-[#123E73] text-white p-8 sm:p-14 lg:p-18 border border-blue-900/40 shadow-2xl overflow-hidden text-center">
          {/* Subtle Ambient Lighting Depth (No excessive animation, institutional refinement) */}
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>START YOUR JOURNEY TODAY</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Build Your Next Big Achievement?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-100 font-normal max-w-2xl mx-auto leading-relaxed">
              Start your academic journey with Emprise Academy, Mathura.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  variant="accent"
                  size="lg"
                  className="font-bold bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 text-sm sm:text-base px-8"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Talk to a Counsellor →
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10 font-semibold text-sm sm:text-base px-8"
                  rightIcon={<GraduationCap className="w-5 h-5 text-amber-300" />}
                >
                  Explore Programs →
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-200">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" /> ETSE Exam: {ETSE_CONFIG.examDateDisplay}
              </span>
              <span>•</span>
              <span>Mathura Campus Classroom Batches</span>
              <span>•</span>
              <span>Small Batch Size (35–40)</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
