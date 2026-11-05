"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Bell, CheckCircle2, Clock, PhoneCall, Award, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "n-1",
      title: "New Admission Enquiry Received",
      message: "Lead ENQ-2026-891240 (Devansh Rajput, Class 11 IIT-JEE) captured via Admissions Portal.",
      date: "Today, 11:30 AM",
      isRead: false,
      type: "LEAD",
    },
    {
      id: "n-2",
      title: "Follow-up Reminder Due",
      message: "Scheduled follow-up call with Rohan Agrawal (NEET-UG Target) due today at 04:00 PM.",
      date: "Today, 09:00 AM",
      isRead: false,
      type: "FOLLOWUP",
    },
    {
      id: "n-3",
      title: "ETSE 2026 Registration Milestone",
      message: "42 student applications verified for ETSE 2026 examination on 29 November 2026.",
      date: "Yesterday, 06:00 PM",
      isRead: true,
      type: "CAMPAIGN",
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <AdminLayout staffName="Admissions Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              STAFF COMMUNICATIONS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Operational Alerts & Notices
            </h1>
          </div>

          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={cn(
                "p-5 rounded-2xl border transition-all flex items-start gap-4",
                notif.isRead
                  ? "bg-white border-slate-200 opacity-80"
                  : "bg-white border-[var(--brand-accent)] shadow-xs"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                  notif.isRead
                    ? "bg-slate-100 text-slate-400"
                    : "bg-orange-50 text-[var(--brand-accent)]"
                )}
              >
                <Bell className="w-5 h-5" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>{notif.title}</span>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
                    )}
                  </h3>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {notif.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {notif.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
