"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { createClientBrowser } from "@/lib/supabase/client";
import { Trophy, Award, Calendar, CheckCircle2, Clock, ArrowRight, ExternalLink, RefreshCw } from "lucide-react";
import { ETSE_CONFIG } from "@/config/etse";

export default function StudentResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [studentIdentity, setStudentIdentity] = useState({
    name: "Student",
    class: "Class 12",
    applicationNo: "ETSE Portal",
  });
  const [publishedResults, setPublishedResults] = useState<any[]>([]);
  const [hasActiveRegistration, setHasActiveRegistration] = useState(false);

  const loadResults = async () => {
    try {
      setLoading(true);
      const supabase = createClientBrowser();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push("/student/login?redirectTo=%2Fstudent%2Fresults");
        return;
      }

      // Fetch student profile
      const { data: studentProf } = await (supabase
        .from("student_profiles") as any)
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      const { data: userProf } = await (supabase
        .from("user_profiles") as any)
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const name =
        studentProf?.full_name ||
        userProf?.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Student";
      const currentClass = studentProf?.current_class || "Class 12";

      // Check if registration exists
      const { data: appRecord } = await (supabase
        .from("etse_registrations") as any)
        .select("application_number")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();

      setHasActiveRegistration(!!appRecord);
      const appNo = appRecord?.application_number || studentProf?.admission_number || "No Application";

      setStudentIdentity({
        name,
        class: currentClass,
        applicationNo: appNo,
      });

      // Query results
      if (studentProf?.id) {
        const { data: results } = await (supabase
          .from("results") as any)
          .select("*, result_exams(*), result_subjects(*)")
          .eq("student_profile_id", studentProf.id)
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (results && results.length > 0) {
          const formatted = results.map((r: any) => {
            const exam = r.result_exams || {};
            const subs = (r.result_subjects || []).map((s: any) => ({
              subject: s.subject_name,
              marks: Number(s.marks_obtained),
              maxMarks: Number(s.max_marks),
            }));

            return {
              id: r.id,
              examTitle: exam.exam_title || "Official Academic Assessment",
              academicYear: r.academic_year || "2026–27",
              rollNumber: r.roll_number,
              examDate: "Academic Session 2026–27",
              publishedDate: exam.published_at ? new Date(exam.published_at).toLocaleDateString("en-IN") : "Recent",
              totalMarksObtained: Number(r.total_marks_obtained),
              maxMarks: Number(r.max_marks),
              percentage: Number(r.percentage),
              rank: r.rank,
              rankType: "ALL_MATHURA_RANK",
              scholarshipPercentageAwarded: Number(r.scholarship_percentage_awarded || 0),
              qualifyingStatus: r.qualifying_status || "QUALIFIED",
              subjects: subs,
            };
          });
          setPublishedResults(formatted);
        } else {
          setPublishedResults([]);
        }
      } else {
        setPublishedResults([]);
      }
    } catch (err) {
      console.error("[RESULTS_LOAD_ERROR]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="space-y-6 max-w-5xl mx-auto animate-pulse">
          <div className="h-8 bg-slate-200 rounded-md w-1/3" />
          <div className="bg-white rounded-3xl border border-slate-200 p-8 h-80" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout
      studentName={studentIdentity.name}
      studentClass={studentIdentity.class}
      applicationNo={studentIdentity.applicationNo}
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-accent)] block mb-0.5">
              ACADEMIC SCORECARDS & MERIT
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--brand-primary)]">
              My Examination Results
            </h1>
          </div>
        </div>

        {/* ETSE Status Banner */}
        <div className="p-6 rounded-3xl bg-linear-to-br from-[var(--brand-primary-dark)] via-[#1B4282] to-[#112C57] text-white border border-blue-900/40 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {hasActiveRegistration ? "Awaiting Examination" : "Upcoming Examination"}
              </span>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
              Exam Date: {ETSE_CONFIG.examDateDisplay}
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Emprise Talent Search Examination 2026 (ETSE 2026)
            </h2>
            <p className="text-xs text-slate-300">
              Official scorecards, All-Mathura ranks, and merit scholarship decisions will be published here within 10 days of exam completion.
            </p>
          </div>
        </div>

        {/* Published Historical Results */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Published Academic Assessments
          </h2>

          {publishedResults.length > 0 ? (
            publishedResults.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
                      Session {res.academicYear} • Roll No: {res.rollNumber}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--brand-primary)]">
                      {res.examTitle}
                    </h3>
                  </div>

                  <Badge variant={res.qualifyingStatus === "QUALIFIED" ? "success" : "muted"} size="md">
                    {res.qualifyingStatus}
                  </Badge>
                </div>

                {/* Score Summary Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Total Score</span>
                    <strong className="text-slate-900 text-base font-extrabold">
                      {res.totalMarksObtained} / {res.maxMarks}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5">Percentage</span>
                    <strong className="text-slate-900 text-base font-extrabold">{res.percentage}%</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5">Rank</span>
                    <strong className="text-[var(--brand-primary)] text-base font-extrabold">
                      {res.rank ? `#${res.rank}` : "Qualified"}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5">Scholarship Awarded</span>
                    <strong className="text-emerald-700 text-base font-extrabold">
                      {res.scholarshipPercentageAwarded}% Fee Waiver
                    </strong>
                  </div>
                </div>

                {/* Subject breakdown */}
                {res.subjects && res.subjects.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Subject-Wise Marks Breakdown
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {res.subjects.map((sub: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                          <span className="font-semibold text-slate-700">{sub.subject}</span>
                          <span className="font-mono font-bold text-slate-900">{sub.marks}/{sub.maxMarks}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Published Scorecards</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Official test results will appear here once examinations are conducted and scorecards are announced.
              </p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
