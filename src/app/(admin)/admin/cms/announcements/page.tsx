"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { ETSE_CONFIG, isAnnouncementActiveInIST } from "@/config/etse";
import {
  Bell,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function AdminAnnouncementsCmsPage() {
  const toast = useToast();

  const [announcements, setAnnouncements] = useState([
    {
      id: "ann-1",
      title: "ETSE 2026 Registration Open for Classes 7–10",
      shortText: `Offline Talent Search Exam on ${ETSE_CONFIG.shortDateDisplay}. ₹0 Registration Fee. Last Date: ${ETSE_CONFIG.registrationDeadlineShort}.`,
      ctaText: "Register Now",
      ctaLink: "/etse-2026",
      startDate: "01 August 2026",
      endDate: "28 November 2026",
      priority: "HIGH",
      status: isAnnouncementActiveInIST("28 November 2026", "01 August 2026") ? "ACTIVE" : "EXPIRED",
    },
    {
      id: "ann-2",
      title: "New JEE Dropper & Rankers Batch Orientation",
      shortText: "Admissions open for Target 2027 classroom batch at Mathura Campus.",
      ctaText: "Enquire Online",
      ctaLink: "/admissions",
      startDate: "15 August 2026",
      endDate: "15 September 2026",
      priority: "NORMAL",
      status: isAnnouncementActiveInIST("15 September 2026", "15 August 2026") ? "ACTIVE" : "EXPIRED",
    },
  ]);

  const toggleStatus = (id: string) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "ACTIVE" ? "EXPIRED" : "ACTIVE" }
          : a
      )
    );
    toast.success("Announcement Updated", "Notice visibility toggled successfully.");
  };

  return (
    <AdminLayout staffName="Content Director" staffRole="DIRECTOR">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <Link
              href="/admin/cms"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to CMS Modules</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Announcements & Urgent Banners CMS
            </h1>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-3">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant={ann.priority === "HIGH" ? "accent" : "primary"} size="sm">
                    {ann.priority} PRIORITY
                  </Badge>
                  <span className="text-[11px] text-slate-400">
                    Active: {ann.startDate} – {ann.endDate}
                  </span>
                </div>

                <Badge variant={ann.status === "ACTIVE" ? "success" : "muted"} size="sm">
                  {ann.status}
                </Badge>
              </div>

              <div>
                <strong className="block text-slate-900 font-bold text-base">{ann.title}</strong>
                <p className="text-xs text-slate-600 mt-1">{ann.shortText}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--brand-primary)] font-semibold">
                  CTA: {ann.ctaText} ({ann.ctaLink})
                </span>

                <Button variant="ghost" size="sm" onClick={() => toggleStatus(ann.id)}>
                  {ann.status === "ACTIVE" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
