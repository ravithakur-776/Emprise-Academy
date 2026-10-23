import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer, MobileBottomCTA } from "@/components/navigation/Footer";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Button } from "@/components/ui/button/Button";
import { Sparkles, PlayCircle, Camera, Newspaper, ArrowRight, Award, GraduationCap } from "lucide-react";
import { VideoGalleryView } from "@/components/video/VideoGalleryView";
import { OFFICIAL_VIDEOS } from "@/data/videos";

export const metadata: Metadata = {
  title: "Video Gallery | Emprise Academy Mathura",
  description:
    "Watch authentic topper chronicles, Director interview sessions, and student success stories from Emprise Academy Mathura.",
  alternates: {
    canonical: "https://empriseacademy.com/gallery/videos",
  },
  openGraph: {
    title: "Video Gallery | Emprise Academy Mathura",
    description:
      "Watch authentic topper chronicles, Director interview sessions, and student success stories from Emprise Academy Mathura.",
    url: "https://empriseacademy.com/gallery/videos",
    siteName: "Emprise Academy Mathura",
    type: "website",
  },
};

export default function VideoGalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background)] text-[var(--brand-text)]">
      {/* Global Navigation Shell */}
      <Navbar />

      <main className="flex-1">
        {/* Page Hero Header */}
        <section className="bg-gradient-to-b from-[#071D36] via-[#0E2E56] to-[#1769E0] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--brand-accent)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

          <Container size="xl" className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
            {/* Gallery Navigation Switcher Tabs */}
            <div className="inline-flex p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 gap-1 mb-2">
              <Link
                href="/gallery"
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Photos</span>
              </Link>
              <Link
                href="/gallery/media"
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all"
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>Media & News</span>
              </Link>
              <span className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[var(--brand-primary)] shadow-sm">
                <PlayCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>Videos</span>
              </span>
            </div>

            {/* Main Page Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Video Gallery
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
              Authentic journey chronicles, Director felicitation dialogues, and student achievement testimonials from Emprise Academy.
            </p>

            {/* Status Pill */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-400/30 text-xs text-blue-100 font-medium shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{OFFICIAL_VIDEOS.length} Verified Academy Videos & Topper Interviews</span>
              </span>
            </div>
          </Container>
        </section>

        {/* Interactive Video Showcase Section */}
        <Section variant="default" spacing="lg" className="bg-[#F8FAFC]">
          <Container size="xl">
            <VideoGalleryView />

            {/* Institutional Admissions Banner */}
            <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B2748] to-[#123E73] text-white relative overflow-hidden shadow-xl border border-blue-400/20">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                  <span>START YOUR ACADEMIC SUCCESS STORY</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Inspired by Their Journeys?
                </h3>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Join Mathura&apos;s most trusted coaching institute for IIT-JEE, NEET-UG, and Foundation. Benefit from direct Director mentoring, rigorous testing, and structured concept mastery.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link href="/admissions">
                    <Button variant="accent" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Admissions Desk
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" size="md" className="text-white border-white/30 hover:bg-white/10">
                      Explore Programmes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      {/* Global Institutional Footer */}
      <Footer />

      {/* Mobile Fixed CTA Bar */}
      <MobileBottomCTA />
    </div>
  );
}
