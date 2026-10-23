"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Badge } from "@/components/ui/badge/Badge";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Navigation,
  MessageCircle,
  ExternalLink,
  Building2,
} from "lucide-react";

export const CampusContactSection: React.FC = () => {
  const business = CANONICAL_BUSINESS_CONFIG;

  const phone = business.contact.phone_primary || "+91 7247889955";
  const email = business.contact.email || "info@empriseacademy.com";
  const hours = "10 AM – 7 PM";
  const whatsappNumber = "9808912829";
  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
    "Hello Emprise Academy, I would like to inquire about courses and admissions."
  )}`;
  const directionsUrl = business.contact.google_maps_url || "https://maps.google.com/?q=Emprise+Academy+Mathura";

  return (
    <Section variant="default" spacing="lg" id="campus-location" className="bg-white border-y border-[var(--brand-border)] select-none">
      {/* Anchor compatibility for existing #contact links */}
      <div id="contact" className="scroll-mt-24" />
      <Container size="xl">
        <div className="rounded-3xl bg-white border border-[#E3EAF3] p-6 sm:p-10 lg:p-12 shadow-sm text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Authentic Campus/Academy Photograph */}
            <div className="lg:col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D8E4F2] shadow-xl group ring-1 ring-black/5">
              <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[490px] bg-slate-100 overflow-hidden">
                <Image
                  src="/images/emprise-academy-building-campus.jpg"
                  alt="Emprise Academy modern academic campus building near Tera Tower, Bhuteshwar Road, Mathura"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                  quality={80}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Subtle top & bottom lighting gradients */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />

                {/* Floating Top Badges */}
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-md text-xs font-bold text-[#123E73]">
                  <span className="w-2 h-2 rounded-full bg-[#16A36A] animate-pulse" />
                  <span>Bhuteshwar Road Campus</span>
                </div>

                <div className="absolute top-4 right-4 z-10 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-xs font-semibold text-white shadow-xs">
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Main Center</span>
                </div>

                {/* Floating Glassmorphic Bottom Info Panel */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-2xl bg-[#0B2545]/85 backdrop-blur-md border border-white/20 text-white shadow-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Mathura Academic Center
                    </span>
                    <span className="text-[10px] font-semibold text-slate-300">
                      Established 2011
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-xs">
                    Emprise Academy Campus
                  </h3>
                  <p className="text-xs text-slate-200/90 leading-snug">
                    Spacious classrooms, library, and direct faculty counseling desk.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Verified NAP Details & Directions Action */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <Badge variant="primary" size="md" className="mb-3">
                  VISIT OUR CAMPUS
                </Badge>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight leading-[1.2]">
                  Visit Emprise Academy, <span className="text-[#1769E0]">Mathura</span>
                </h2>
                <Text variant="body-large" color="secondary" className="text-sm sm:text-base text-[#667085] mt-2 leading-relaxed">
                  Visit our academic campus in Mathura for personalized course guidance, syllabus discussion, and direct faculty counseling.
                </Text>
              </div>

              {/* Verified Contact Points */}
              <div className="space-y-4 pt-1 text-xs sm:text-sm text-[#667085]">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF5FF] text-[#1769E0] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100 shadow-2xs">
                    <MapPin className="w-5 h-5 text-[#FF8A00]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#14213D] block text-[13px] sm:text-sm">Campus Address:</span>
                    <span className="text-[#667085] leading-relaxed">
                      Near Tera Tower, Bhuteshwar Road, Mathura, Uttar Pradesh, 281004
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF5FF] text-[#1769E0] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100 shadow-2xs">
                    <Phone className="w-5 h-5 text-[#1769E0]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#14213D] block text-[13px] sm:text-sm">Admissions Desk:</span>
                    <a href={`tel:${phone}`} className="text-[#1769E0] hover:underline font-bold text-sm">
                      {phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F8F0] text-[#16A36A] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100 shadow-2xs">
                    <MessageCircle className="w-5 h-5 text-[#16A36A]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#14213D] block text-[13px] sm:text-sm">WhatsApp Desk:</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#16A36A] hover:underline font-bold text-sm inline-flex items-center gap-1"
                    >
                      <span>+91 {whatsappNumber}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF5FF] text-[#1769E0] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100 shadow-2xs">
                    <Mail className="w-5 h-5 text-[#1769E0]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#14213D] block text-[13px] sm:text-sm">Official Email:</span>
                    <a href={`mailto:${email}`} className="text-[#1769E0] hover:underline font-semibold">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7EB] text-[#FF8A00] flex items-center justify-center shrink-0 mt-0.5 border border-amber-100 shadow-2xs">
                    <Clock className="w-5 h-5 text-[#FF8A00]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#14213D] block text-[13px] sm:text-sm">Working Hours:</span>
                    <span className="font-semibold text-[#14213D]">{hours}</span>
                    <span className="text-xs text-slate-400 block sm:inline sm:ml-2">(Monday to Sunday)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="primary"
                    size="md"
                    className="font-bold bg-[#1769E0] hover:bg-[#1358BE] text-white shadow-sm"
                    leftIcon={<Navigation className="w-4 h-4" />}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Get Directions →
                  </Button>
                </a>

                <Link href="/admissions">
                  <Button
                    variant="secondary"
                    size="md"
                    className="border-[#E3EAF3] text-[#14213D] hover:bg-slate-50 font-semibold"
                  >
                    Admissions Process
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
