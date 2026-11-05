import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/link/TextLink";
import { EtseCountdown } from "@/components/etse/EtseCountdown";
import { MAIN_ETSE_DATA } from "@/data/etse";
import { ETSE_CONFIG, isRegistrationOpenInIST } from "@/config/etse";
import { ArrowRight, Trophy, Calendar, Award, ShieldCheck, Sparkles, Clock, AlertCircle } from "lucide-react";

export interface EtseHeroProps {
  breadcrumbs: BreadcrumbItem[];
}

export const EtseHero: React.FC<EtseHeroProps> = ({ breadcrumbs }) => {
  const { campaign } = MAIN_ETSE_DATA;
  const isRegOpen = isRegistrationOpenInIST();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[var(--brand-primary-dark)] via-[#1B4282] to-[#112C57] text-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pb-20 border-b border-blue-900/40">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl" className="relative z-10 space-y-6">
        <div className="text-slate-400">
          <Breadcrumbs
            items={breadcrumbs}
            className="text-slate-300 [&_a]:text-slate-300 [&_a:hover]:text-white [&_span]:text-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-amber-300 font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span>ANNUAL TALENT SEARCH EXAMINATION</span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-bold text-emerald-300">
                100% FREE REGISTRATION
              </span>
            </div>

            <Heading
              as="h1"
              variant="display"
              color="white"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
            >
              ETSE 2026
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-[var(--brand-accent-light)] font-bold mt-1">
                {campaign.tagline}
              </span>
            </Heading>

            <div className="text-base sm:text-lg font-semibold text-slate-200">
              {campaign.subheading}
            </div>

            <Text
              variant="body-large"
              color="white"
              className="text-slate-300 leading-relaxed max-w-2xl text-sm sm:text-base"
            >
              {campaign.heroParagraph}
            </Text>

            {/* Countdown Bar */}
            <div className="pt-1">
              <EtseCountdown />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a href="#register">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Register Free for ETSE 2026
                </Button>
              </a>
              <a href="#benefits">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Exam Benefits & Slabs
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Campaign Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-linear-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      Examination Key Details
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Official 2026 Session Configuration
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${isRegOpen ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-rose-500/20 text-rose-300 border-rose-500/30"}`}>
                  {isRegOpen ? "Registration Open" : "Registration Closed"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">Exam Date</span>
                  <span className="font-bold text-amber-300 text-sm">
                    {campaign.examDateDisplay}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">Registration Last Date</span>
                  <span className="font-bold text-amber-300 text-sm">
                    {ETSE_CONFIG.registrationEndDateDisplay}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">Application Fee</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {campaign.registrationFee}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">Target Classes</span>
                  <span className="font-bold text-white text-sm">
                    Classes 7th to 10th
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 col-span-2">
                  <span className="text-slate-400 block mb-0.5">Test Format & Timing</span>
                  <span className="font-bold text-white text-sm">
                    Offline (Pen-Paper OMR) • 10:00 AM – 12:00 PM (IST)
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-700/60 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Instant Database-Generated Application ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Top 100 Rank Recognition & Merit Certificates</span>
                </div>
              </div>

              <div className="pt-2">
                {isRegOpen ? (
                  <a
                    href="#register"
                    className="block w-full py-2.5 px-4 rounded-xl bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-center text-xs font-bold transition-colors shadow-xs"
                  >
                    Start Online Registration →
                  </a>
                ) : (
                  <Link
                    href="/student/admit-cards"
                    className="block w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-center text-xs font-bold transition-colors shadow-xs"
                  >
                    Download Admit Card →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
