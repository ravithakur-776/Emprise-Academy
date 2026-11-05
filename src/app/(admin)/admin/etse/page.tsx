"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { Input, Select } from "@/components/ui/form/Input";
import {
  Award,
  Search,
  Download,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { ETSE_CONFIG } from "@/config/etse";

interface EtseRegistrationItem {
  id: string;
  applicationNo: string;
  rollNumber: string;
  candidateName: string;
  fatherName: string;
  currentClass: string;
  schoolName: string;
  phone: string;
  stream: string;
  registrationDate: string;
  status: string;
  admitCardStatus: string;
}

export default function AdminEtsePage() {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [registrations, setRegistrations] = useState<EtseRegistrationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRegistrations = useCallback(async () => {
    setIsLoading(true);
    try {
      // In production, fetch etse_registrations from database
      setRegistrations([]);
    } catch {
      setRegistrations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleExportCSV = () => {
    if (registrations.length === 0) {
      toast.error("Export Empty", "No ETSE registration records available to export.");
      return;
    }
    const headers = ["Application No", "Roll Number", "Candidate Name", "Father Name", "Class", "School", "Phone", "Stream", "Status", "Date"];
    const rows = registrations.map((r) => [r.applicationNo, r.rollNumber, r.candidateName, r.fatherName, r.currentClass, r.schoolName, r.phone, r.stream, r.status, r.registrationDate]);
    const csvContent = [headers.join(","), ...rows.map((row) => row.map((f) => `"${f || ""}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ETSE_2026_Registrations_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    toast.success("CSV Exported", "ETSE registration roster exported.");
  };

  const filtered = registrations.filter((r) => {
    const matchesSearch =
      searchQuery === "" ||
      r.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.applicationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);

    const matchesClass = classFilter === "ALL" || r.currentClass === classFilter;

    return matchesSearch && matchesClass;
  });

  return (
    <AdminLayout staffName="Examination Officer" staffRole="ADMISSION_ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              CAMPAIGN MONITOR (CLASSES 7–10)
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              ETSE 2026 Candidate Registrations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold border border-amber-200">
              Exam Date: {ETSE_CONFIG.examDateDisplay}
            </span>

            <span className="text-xs px-3 py-1.5 rounded-xl bg-blue-100 text-blue-900 font-bold border border-blue-200">
              Last Date: {ETSE_CONFIG.registrationDeadlineShort}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchRegistrations}
              isLoading={isLoading}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by candidate name, application number, school, mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="sm:w-56 text-xs h-10 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]/20 focus:border-[var(--brand-accent)] bg-white"
          >
            <option value="ALL">All Eligible Classes</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
          </select>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-700">No ETSE registrations found</p>
                <p className="text-xs text-slate-400">
                  {searchQuery || classFilter !== "ALL"
                    ? "Try adjusting your search query or filter criteria."
                    : "Candidate applications submitted for ETSE 2026 will appear here."}
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Application No</th>
                    <th className="py-3.5 px-4">Candidate & Father</th>
                    <th className="py-3.5 px-4">Class & School</th>
                    <th className="py-3.5 px-4">Roll Number</th>
                    <th className="py-3.5 px-4">Stream Track</th>
                    <th className="py-3.5 px-4">Pass Status</th>
                    <th className="py-3.5 px-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {r.applicationNo}
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block">{r.candidateName}</strong>
                        <span className="text-[11px] text-slate-500">Father: {r.fatherName}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-semibold block">{r.currentClass}</span>
                        <span className="text-[11px] text-slate-500">{r.schoolName}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-800">
                        {r.rollNumber}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {r.stream}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={r.admitCardStatus === "PUBLISHED" ? "success" : "warning"}
                          size="sm"
                        >
                          {r.admitCardStatus}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-right">
                        {r.registrationDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
