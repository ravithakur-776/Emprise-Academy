import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { ETSE_CONFIG } from "@/config/etse";
import { Award, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export const ScholarshipSection: React.FC = () => {
  const { scholarship } = HOMEPAGE_DATA;

  return (
    <Section variant="default" spacing="lg" id="scholarship">
      <Container size="xl">
        <div className="rounded-3xl border-2 border-amber-300/80 bg-linear-to-br from-amber-50/50 via-white to-orange-50/30 p-6 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="gold" size="md">
                  SCHOLARSHIP PROGRAMME
                </Badge>
                <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-md">
                  Merit-Driven Support
                </span>
              </div>

              <Heading as="h2" variant="h1" className="text-slate-900">
                {scholarship.heading}
              </Heading>

              <Text variant="body-large" color="muted" className="text-slate-700 leading-relaxed">
                {scholarship.subheading}
              </Text>

              <div className="space-y-2.5 pt-2">
                {scholarship.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
                <Award className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-bold text-[var(--brand-primary)] mb-1">
                  ETSE 2026 Scholarship
                </h3>
                <p className="text-xs text-slate-500">
                  Appear in the talent search examination on {ETSE_CONFIG.examDateDisplay}.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Link href="/etse-2026" className="block">
                  <Button variant="primary" size="md" fullWidth rightIcon={<Sparkles className="w-4 h-4" />}>
                    Register for ETSE 2026
                  </Button>
                </Link>
                <Link href={scholarship.ctaHref} className="block">
                  <Button variant="outline" size="md" fullWidth>
                    View Scholarship Slabs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
