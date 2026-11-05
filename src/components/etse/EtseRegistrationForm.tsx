"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout/Container";
import { Section } from "@/components/ui/layout/Section";
import { Heading } from "@/components/ui/typography/Heading";
import { Text } from "@/components/ui/typography/Text";
import { Badge } from "@/components/ui/badge/Badge";
import { Button } from "@/components/ui/button/Button";
import { FormField } from "@/components/ui/form/FormField";
import { Input, Select } from "@/components/ui/form/Input";
import { PhoneField } from "@/components/ui/form/SpecializedFields";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { createClientBrowser } from "@/lib/supabase/client";
import { ETSE_CONFIG, formatEtseExamDate, isRegistrationOpenInIST } from "@/config/etse";
import {
  Send,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Building,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";

function normalizeClassOption(raw?: string | number | null): string {
  if (!raw) return "Class 8";
  const str = String(raw).trim();
  const digits = str.replace(/\D/g, "");
  if (digits === "7") return "Class 7";
  if (digits === "8") return "Class 8";
  if (digits === "9") return "Class 9";
  if (digits === "10") return "Class 10";
  if (["Class 7", "Class 8", "Class 9", "Class 10"].includes(str)) return str;
  return "Class 8";
}

export const EtseRegistrationForm: React.FC = () => {
  const toast = useToast();

  // Form Fields
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("MALE");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentClass, setCurrentClass] = useState("Class 8");
  const [schoolName, setSchoolName] = useState("");
  const [streamInterest, setStreamInterest] = useState<"FOUNDATION" | "IIT_JEE" | "NEET_UG">("FOUNDATION");

  // Dynamic Exam & Centre Config (Resolved from live DB)
  const [examId, setExamId] = useState<string | null>(null);
  const [examCentreId, setExamCentreId] = useState<string | null>(null);
  const [examInfo, setExamInfo] = useState({
    title: "Emprise Talent Search Examination (ETSE) 2026",
    examDate: ETSE_CONFIG.fullDisplay,
    reportingTime: "09:30 AM",
    examTime: "10:00 AM – 12:00 PM",
    centreName: "Emprise Academy Mathura",
    centreAddress: "Near Tera Tower, Bhuteshwar Road, Mathura",
    pincode: "281004",
  });

  // State Management
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isAuthenticatedStudent, setIsAuthenticatedStudent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState<string | null>(null);
  const [admitCardReady, setAdmitCardReady] = useState(false);
  const [admitCardToken, setAdmitCardToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load authenticated student profile and active exam config on mount
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const supabase = createClientBrowser();

        // 1. Fetch active exam configuration from database
        const { data: activeExams } = await (supabase
          .from("etse_exams") as any)
          .select("*")
          .eq("is_active", true)
          .order("exam_date", { ascending: true })
          .limit(1);

        if (activeExams && activeExams.length > 0 && isMounted) {
          const ex = activeExams[0];
          setExamId(ex.id);
          setExamInfo((prev) => ({
            ...prev,
            title: ex.title || prev.title,
            examDate: formatEtseExamDate(ex.exam_date, { includeWeekday: true }),
            reportingTime: ex.reporting_time || "09:30 AM",
            examTime: ex.exam_time || "10:00 AM – 12:00 PM",
          }));
        }

        // 2. Fetch active centre configuration from database
        const { data: activeCentres } = await (supabase
          .from("exam_centres") as any)
          .select("*")
          .eq("is_active", true)
          .limit(1);

        if (activeCentres && activeCentres.length > 0 && isMounted) {
          const ctr = activeCentres[0];
          setExamCentreId(ctr.id);
          setExamInfo((prev) => ({
            ...prev,
            centreName: ctr.centre_name || "Emprise Academy Mathura",
            centreAddress: ctr.address || "Near Tera Tower, Bhuteshwar Road, Mathura",
            pincode: ctr.pincode || "281004",
          }));
        }

        // 3. Resolve authenticated user session and student profile
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user && isMounted) {
          setIsAuthenticatedStudent(true);
          setEmail(user.email || "");

          // Query linked student_profile
          const { data: studentProf } = await (supabase
            .from("student_profiles") as any)
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();

          // Query linked user_profile
          const { data: userProf } = await (supabase
            .from("user_profiles") as any)
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

          const resolvedName =
            studentProf?.full_name ||
            userProf?.full_name ||
            user.user_metadata?.full_name ||
            "";

          if (resolvedName) setStudentName(resolvedName);
          if (studentProf?.phone || userProf?.phone) {
            setPhone(studentProf?.phone || userProf?.phone || "");
          }
          if (studentProf?.dob) {
            setDob(studentProf.dob);
          } else if (!dob) {
            setDob("2012-05-15");
          }
          if (studentProf?.gender) {
            setGender(studentProf.gender as any);
          }
          if (studentProf?.current_class || userProf?.current_class) {
            setCurrentClass(normalizeClassOption(studentProf?.current_class || userProf?.current_class));
          }
          if (studentProf?.school_name) {
            setSchoolName(studentProf.school_name);
          }
          if (studentProf?.target_exam) {
            if (["FOUNDATION", "IIT_JEE", "NEET_UG"].includes(studentProf.target_exam)) {
              setStreamInterest(studentProf.target_exam as any);
            }
          }
        } else if (isMounted) {
          setIsAuthenticatedStudent(false);
          if (!dob) {
            setDob("2012-05-15");
          }
        }
      } catch (err) {
        console.error("[ETSE_FORM_INIT_ERROR]", err);
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!studentName.trim() || !fatherName.trim() || phone.length < 10 || !schoolName.trim()) {
      toast.error("Required Fields Missing", "Please complete student name, father name, phone, and school.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: any = {
        studentName: studentName.trim(),
        fatherName: fatherName.trim(),
        motherName: motherName.trim() || null,
        dob,
        gender,
        phone: phone.trim(),
        email: email.trim() || null,
        currentClass,
        schoolName: schoolName.trim(),
        streamInterest,
      };

      if (examId) payload.examId = examId;
      if (examCentreId) payload.examCentreId = examCentreId;

      const res = await fetch("/api/etse/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && res.status === 201 && data.success && data.data?.applicationNumber) {
        // Real database persistence confirmed
        setApplicationNumber(data.data.applicationNumber);
        setAdmitCardReady(!!data.data.admitCardReady);
        setAdmitCardToken(data.data.admitCardToken || null);
        setIsSubmitted(true);
        toast.success("Registration Successful", `Application ID: ${data.data.applicationNumber}`);
      } else {
        // Fail cleanly without fake application number generation
        const errorMsg =
          data.error?.message ||
          data.message ||
          "Registration could not be completed. Please check your information.";
        setErrorMessage(errorMsg);
        toast.error("Registration Failed", errorMsg);
        setIsSubmitted(false);
      }
    } catch (err: any) {
      const msg = err?.message || "Could not complete registration. Please check your connection.";
      setErrorMessage(msg);
      toast.error("Registration Error", msg);
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section variant="default" spacing="lg" id="register">
      <Container size="xl">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Reassurance & Canonical Exam Card */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <Badge variant="gold" size="md" className="mb-3">
                  FREE CANDIDATE REGISTRATION
                </Badge>
                <Heading as="h2" variant="h1">
                  Register for ETSE 2026
                </Heading>
              </div>

              <Text variant="body-large" color="muted" className="leading-relaxed">
                Fill in the verified details below to generate your unique ETSE 2026 Application Number. Registration is 100% free with zero fees required.
              </Text>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Immediate generation of permanent ETSE 2026 Application Number.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Official digital Admit Card access prior to examination day.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Rank benchmarking and merit scholarship eligibility for Foundation and Senior batches.</span>
                </div>
              </div>

              {/* Canonical Exam Schedule Card */}
              <div className="p-5 rounded-2xl bg-linear-to-br from-[var(--brand-primary-dark)] via-[#1B4282] to-[#112C57] text-white text-xs space-y-2.5 border border-blue-900/40 shadow-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" /> Exam Date
                  </span>
                  <span className="font-semibold">{examInfo.examDate}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-300" /> Exam Schedule
                  </span>
                  <span>{examInfo.examTime} (Reporting: {examInfo.reportingTime})</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-300" /> Exam Centre
                  </span>
                  <span className="font-semibold">{examInfo.centreName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" /> Registration Last Date
                  </span>
                  <span className="font-bold text-amber-300">{ETSE_CONFIG.registrationEndDateDisplay}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">Application Fee</span>
                  <span className="font-extrabold text-emerald-400">₹0.00 (FREE)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Registration Form / Skeleton / Success View */}
            <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl border border-slate-200 p-6 sm:p-8">
              {!isRegistrationOpenInIST() ? (
                <div className="text-center py-10 px-4 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      Registrations Closed for ETSE 2026
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Online registration for the 2026 session officially closed on <strong>{ETSE_CONFIG.registrationEndDateDisplay} at 11:59:59 PM IST</strong>. Registered candidates can access their digital Admit Card with QR verification below.
                    </p>
                  </div>
                  <div className="pt-3">
                    <Link href="/student/admit-cards">
                      <Button variant="primary" size="md">
                        Download Digital Admit Card
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : isLoadingProfile ? (
                <div className="space-y-4 py-4 animate-pulse">
                  <div className="h-6 bg-slate-200 rounded-md w-1/3 mb-4" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="h-10 bg-slate-200 rounded-xl" />
                    <div className="h-10 bg-slate-200 rounded-xl" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="h-10 bg-slate-200 rounded-xl" />
                    <div className="h-10 bg-slate-200 rounded-xl" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="h-10 bg-slate-200 rounded-xl" />
                    <div className="h-10 bg-slate-200 rounded-xl" />
                    <div className="h-10 bg-slate-200 rounded-xl" />
                  </div>
                  <div className="h-12 bg-slate-200 rounded-xl mt-6" />
                </div>
              ) : isSubmitted ? (
                <div className="text-center py-6 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <UserCheck className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      Registration Confirmed
                    </span>
                    <h3 className="text-2xl font-bold text-[var(--brand-primary)]">
                      Welcome to ETSE 2026, {studentName}!
                    </h3>
                  </div>

                  {/* Summary Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 max-w-md mx-auto space-y-2.5 text-left shadow-xs">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Application Number:</span>
                      <span className="font-extrabold text-[var(--brand-primary)] text-sm">{applicationNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Candidate Name:</span>
                      <span className="font-bold text-slate-900">{studentName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Class & Stream:</span>
                      <span className="font-bold text-slate-900">{currentClass} • {streamInterest}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Exam Date:</span>
                      <span className="font-bold text-amber-600">{examInfo.examDate} ({examInfo.examTime})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="font-bold text-emerald-600">Registered</span>
                    </div>
                  </div>

                  {/* Admit Card Status Alert */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto text-left flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block mb-0.5">Admit Card Availability</strong>
                      {admitCardReady && admitCardToken ? (
                        <span>
                          Your admit card has been issued.{" "}
                          <Link href={`/verify-admit-card/${admitCardToken}`} className="underline font-bold text-amber-800">
                            View Official Verification Record →
                          </Link>
                        </span>
                      ) : (
                        <span>
                          Your registration is confirmed. Your digital admit card with designated roll number and seating slot will appear in your student dashboard when released prior to exam day.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <Link href="/student/dashboard">
                      <Button variant="primary" size="sm">
                        Go to Student Dashboard
                      </Button>
                    </Link>
                    <Link href="/scholarship">
                      <Button variant="outline" size="sm">
                        View Scholarship Slabs
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-200 pb-3 mb-2 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--brand-primary)]">
                        Candidate Details Form
                      </h3>
                      <p className="text-xs text-slate-500">
                        Please enter accurate information as per your school identity card.
                      </p>
                    </div>
                    {isAuthenticatedStudent && (
                      <Badge variant="accent" size="sm" className="hidden sm:inline-flex">
                        <Sparkles className="w-3 h-3 mr-1" /> Profile Synced
                      </Badge>
                    )}
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Student Full Name" required htmlFor="etse-name">
                      <Input
                        id="etse-name"
                        placeholder="Full Name as per School ID"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                      />
                    </FormField>

                    <FormField label="Father's / Guardian's Name" required htmlFor="etse-father">
                      <Input
                        id="etse-father"
                        placeholder="Father / Guardian Full Name"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        required
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Mobile Number" required htmlFor="etse-phone">
                      <PhoneField
                        id="etse-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </FormField>

                    <FormField label="Email Address" htmlFor="etse-email">
                      <Input
                        id="etse-email"
                        type="email"
                        placeholder="registered.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormField label="Current Class" required htmlFor="etse-class">
                      <Select
                        id="etse-class"
                        value={currentClass}
                        onChange={(e) => setCurrentClass(e.target.value)}
                        options={[
                          { value: "Class 7", label: "Class 7" },
                          { value: "Class 8", label: "Class 8" },
                          { value: "Class 9", label: "Class 9" },
                          { value: "Class 10", label: "Class 10" },
                        ]}
                      />
                    </FormField>

                    <FormField label="Date of Birth" required htmlFor="etse-dob">
                      <Input
                        id="etse-dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                      />
                    </FormField>

                    <FormField label="Gender" required htmlFor="etse-gender">
                      <Select
                        id="etse-gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        options={[
                          { value: "MALE", label: "Male" },
                          { value: "FEMALE", label: "Female" },
                          { value: "OTHER", label: "Other" },
                        ]}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="School Name & City" required htmlFor="etse-school">
                      <Input
                        id="etse-school"
                        placeholder="School Name, City"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        required
                      />
                    </FormField>

                    <FormField label="Aspirational Stream Interest" required htmlFor="etse-stream">
                      <Select
                        id="etse-stream"
                        value={streamInterest}
                        onChange={(e) => setStreamInterest(e.target.value as any)}
                        options={[
                          { value: "FOUNDATION", label: "Foundation (Science & Maths)" },
                          { value: "IIT_JEE", label: "Future IIT-JEE (Engineering)" },
                          { value: "NEET_UG", label: "Future NEET-UG (Medical)" },
                        ]}
                      />
                    </FormField>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                    <Building className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                    <div>
                      <span>Designated Exam Centre: <strong>{examInfo.centreName}</strong></span>
                      <p className="text-[11px] text-slate-500 mt-0.5">{examInfo.centreAddress}, PIN {examInfo.pincode}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    By registering for ETSE 2026, you agree to receive exam guidelines, admit card notifications, and result scorecards from Emprise Academy.
                  </p>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      fullWidth
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Complete Free ETSE Registration
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
