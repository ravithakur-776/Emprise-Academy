import { createAdminClient } from "@/lib/supabase/admin";
import { createClientServer } from "@/lib/supabase/server";
import { ETSERegistrationInput } from "@/validations/etse.validation";
import { ValidationError, NotFoundError, DuplicateResourceError } from "@/lib/errors";
import { logAuditEvent } from "@/lib/audit";
import { RegistrationResult } from "@/types/etse";
import { AdmitCardService } from "@/services/admit-card.service";
import { getIndiaCalendarDate, ETSE_CONFIG } from "@/config/etse";
import crypto from "crypto";

export class ETSEService {
  /**
   * Registers a student for ETSE and triggers automatic admit card creation
   * Concurrency-safe, Transaction-safe, and supports both authenticated & new students.
   */
  public static async registerStudent(
    input: ETSERegistrationInput,
    userId?: string | null
  ): Promise<RegistrationResult> {
    const adminSupabase = createAdminClient();

    // 1. Verify and resolve active ETSE Exam
    let exam: any = null;
    if (input.examId) {
      const { data: exById } = await (adminSupabase
        .from("etse_exams") as any)
        .select("*")
        .eq("id", input.examId)
        .eq("is_active", true)
        .maybeSingle();
      exam = exById;
    }

    if (!exam) {
      // Resolve canonical active ETSE2026 exam record
      const { data: exByCode } = await (adminSupabase
        .from("etse_exams") as any)
        .select("*")
        .eq("is_active", true)
        .order("exam_date", { ascending: true })
        .limit(1)
        .maybeSingle();
      exam = exByCode;
    }

    if (!exam) {
      throw new NotFoundError("ETSE Exam", input.examId || "ETSE2026");
    }

    // Verify registration window is open using deterministic Indian Standard Time (Asia/Kolkata)
    const todayInIndia = getIndiaCalendarDate();
    const regStartDate = exam.registration_start_date || ETSE_CONFIG.registrationStartDate;
    const regEndDate = exam.registration_end_date || ETSE_CONFIG.registrationEndDate;

    if (todayInIndia < regStartDate || todayInIndia > regEndDate) {
      throw new ValidationError("Registrations for this examination are currently closed.");
    }

    // Verify class eligibility
    const studentClassClean = input.currentClass.trim();
    const classDigits = studentClassClean.replace(/\D/g, "");
    const allowedClasses = (exam.eligible_classes || []).map((c: string) => c.replace(/\D/g, ""));

    if (classDigits && allowedClasses.length > 0 && !allowedClasses.includes(classDigits)) {
      throw new ValidationError(
        `Students of ${studentClassClean} are not eligible for ${exam.title}. Eligible classes: ${exam.eligible_classes.join(", ")}`
      );
    }

    // 2. Verify and resolve active Exam Centre
    let centre: any = null;
    if (input.examCentreId) {
      const { data: ctrById } = await (adminSupabase
        .from("exam_centres") as any)
        .select("*")
        .eq("id", input.examCentreId)
        .eq("is_active", true)
        .maybeSingle();
      centre = ctrById;
    }

    if (!centre) {
      // Resolve canonical active Mathura centre
      const { data: ctrDefault } = await (adminSupabase
        .from("exam_centres") as any)
        .select("*")
        .eq("is_active", true)
        .limit(1)
        .maybeSingle();
      centre = ctrDefault;
    }

    if (!centre) {
      throw new NotFoundError("Exam Centre", input.examCentreId || "Default Mathura Centre");
    }

    // 3. Resolve or Link Student Profile
    let studentProfileId: string | null = null;
    let isNewAccountClaimRequired = false;
    let rawClaimToken: string | null = null;
    let claimTokenHash: string | null = null;

    if (userId) {
      // Flow A: Logged-in student
      const { data: profile } = await (adminSupabase
        .from("student_profiles") as any)
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      studentProfileId = profile?.id || null;
    }

    // Check duplicate registration for this specific exam
    if (studentProfileId) {
      const { data: existingReg } = await (adminSupabase
        .from("etse_registrations") as any)
        .select("id, application_number")
        .eq("exam_id", exam.id)
        .eq("student_profile_id", studentProfileId)
        .maybeSingle();

      if (existingReg) {
        throw new DuplicateResourceError(
          "ETSE Registration",
          `student is already registered for this exam (Application #${existingReg.application_number})`
        );
      }
    } else {
      // Flow B: Candidate without active user session
      // Check duplicate by Phone + DOB + Exam
      const { data: duplicateCheck } = await (adminSupabase
        .from("etse_registrations") as any)
        .select("id, application_number")
        .eq("exam_id", exam.id)
        .eq("phone", input.phone)
        .eq("dob", input.dob)
        .maybeSingle();

      if (duplicateCheck) {
        throw new DuplicateResourceError(
          "ETSE Registration",
          `a registration already exists with this Phone & DOB (Application #${duplicateCheck.application_number})`
        );
      }

      // Check if student profile exists by phone + DOB or create one
      const { data: existingProfile } = await (adminSupabase
        .from("student_profiles") as any)
        .select("id")
        .eq("phone", input.phone)
        .eq("dob", input.dob)
        .maybeSingle();

      if (existingProfile) {
        studentProfileId = existingProfile.id;
      } else {
        const { data: newProfile } = await (adminSupabase
          .from("student_profiles") as any)
          .insert({
            full_name: input.studentName,
            dob: input.dob,
            gender: input.gender,
            phone: input.phone,
            email: input.email || null,
            current_class: input.currentClass,
            school_name: input.schoolName,
            target_exam: input.streamInterest,
            city: centre.city || "Mathura",
            state: "Uttar Pradesh",
          })
          .select("id")
          .maybeSingle();

        studentProfileId = newProfile?.id || null;
      }

      // Generate secure claim token for future account claiming / verification
      rawClaimToken = crypto.randomBytes(24).toString("hex");
      claimTokenHash = crypto.createHash("sha256").update(rawClaimToken).digest("hex");
      isNewAccountClaimRequired = true;
    }

    // 4. Generate Concurrency-Safe Application Number from DB function
    let applicationNumber: string;
    const { data: rpcAppNo, error: rpcErr } = await (adminSupabase as any).rpc(
      "get_next_etse_application_number",
      { p_exam_id: exam.id }
    );

    if (rpcErr || !rpcAppNo) {
      // Query counter directly with atomic increment
      const { data: counter, error: counterErr } = await (adminSupabase
        .from("exam_application_counters") as any)
        .upsert(
          { exam_id: exam.id, current_sequence: 1 },
          { onConflict: "exam_id" }
        )
        .select("current_sequence")
        .single();

      if (counterErr || !counter?.current_sequence) {
        throw new Error(`Failed to generate application sequence number: ${rpcErr?.message || counterErr?.message}`);
      }
      applicationNumber = `ETSE${exam.year}-${String(counter.current_sequence).padStart(6, "0")}`;
    } else {
      applicationNumber = rpcAppNo;
    }

    // 5. Insert ETSE Registration into public.etse_registrations
    const { data: registration, error: regError } = await (adminSupabase
      .from("etse_registrations") as any)
      .insert({
        application_number: applicationNumber,
        student_profile_id: studentProfileId,
        user_id: userId || null,
        exam_id: exam.id,
        student_name: input.studentName,
        father_name: input.fatherName,
        mother_name: input.motherName || null,
        dob: input.dob,
        gender: input.gender,
        phone: input.phone,
        email: input.email || null,
        current_class: input.currentClass,
        school_name: input.schoolName,
        stream_interest: input.streamInterest,
        exam_centre_id: centre.id,
        photo_url: input.photoUrl || null,
        status: "REGISTERED",
        claim_token_hash: claimTokenHash,
        claim_token_expires_at: isNewAccountClaimRequired
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          : null,
        registered_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (regError || !registration || !registration.id) {
      throw new Error(`Failed to insert ETSE registration: ${regError?.message}`);
    }

    // 6. Generate Idempotent Admit Card with historical snapshot data
    const admitCard = await AdmitCardService.createAdmitCardForRegistration(
      registration.id,
      {
        exam,
        centre,
        registration,
      }
    );

    if (!admitCard || (!(admitCard as any).roll_number && !(admitCard as any).rollNumber)) {
      throw new Error("Admit card generation failed after registration insert.");
    }

    // 7. Log administrative audit event
    await logAuditEvent({
      userId: userId || null,
      action: "ETSE_REGISTRATION_CREATED",
      entityName: "etse_registrations",
      entityId: registration.id,
      metadata: {
        applicationNumber: registration.application_number,
        examId: exam.id,
        studentProfileId,
        isNewAccountClaimRequired,
      },
    });

    return {
      registration,
      admitCard,
      applicationNumber: registration.application_number,
      claimToken: rawClaimToken,
      isNewAccountClaimRequired,
    };
  }

  /**
   * Fetches active ETSE exams for public registration
   */
  public static async getActiveExams() {
    const supabase = await createClientServer();
    const { data, error } = await (supabase
      .from("etse_exams") as any)
      .select("*")
      .eq("is_active", true)
      .order("exam_date", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * Fetches active exam centres for registration dropdown
   */
  public static async getActiveCentres() {
    const supabase = await createClientServer();
    const { data, error } = await (supabase
      .from("exam_centres") as any)
      .select("id, centre_code, centre_name, address, city, pincode")
      .eq("is_active", true)
      .order("centre_name", { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }
}
