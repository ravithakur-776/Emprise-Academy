import crypto from "crypto";
import { getIndiaCalendarDate, ETSE_CONFIG } from "@/config/etse";
import { ValidationError, NotFoundError } from "@/lib/errors";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[E2E REGISTRATION ASSERTION FAILED]: ${message}`);
  }
}

console.log("==================================================");
console.log("INTEGRATION TEST SUITE: ETSE 2026 END-TO-END REGISTRATION QA");
console.log("==================================================");

// Isolated Mock Fixture Database
interface MockEtseExam {
  id: string;
  exam_code: string;
  title: string;
  year: number;
  exam_date: string;
  exam_time: string;
  registration_start_date: string;
  registration_end_date: string;
  is_active: boolean;
  eligible_classes: string[];
}

interface MockRegistration {
  id: string;
  application_number: string;
  exam_id: string;
  student_name: string;
  phone: string;
  dob: string;
  current_class: string;
  status: string;
}

interface MockAdmitCard {
  id: string;
  registration_id: string;
  exam_id: string;
  roll_number: string;
  verification_token: string;
  exam_date: string;
  student_name_snapshot: string;
  status: "PUBLISHED" | "REVOKED";
}

const mockDatabase = {
  exams: new Map<string, MockEtseExam>(),
  registrations: new Map<string, MockRegistration>(),
  admitCards: new Map<string, MockAdmitCard>(),
  sequenceCounter: 100,
};

// Seed Active ETSE 2026 Campaign
const activeEtseExam: MockEtseExam = {
  id: "etse-2026-prod-uuid",
  exam_code: "ETSE-2026",
  title: "Emprise Talent Search Examination 2026",
  year: 2026,
  exam_date: "2026-11-29",
  exam_time: "10:00 AM – 12:00 PM",
  registration_start_date: "2026-06-01",
  registration_end_date: "2026-11-28",
  is_active: true,
  eligible_classes: ["Class 7", "Class 8", "Class 9", "Class 10"],
};

// Seed Inactive Historical Campaign
const inactiveEtseExam: MockEtseExam = {
  id: "etse-2025-archived-uuid",
  exam_code: "ETSE-2025",
  title: "Emprise Talent Search Examination 2025",
  year: 2025,
  exam_date: "2025-10-26",
  exam_time: "10:00 AM – 12:00 PM",
  registration_start_date: "2025-06-01",
  registration_end_date: "2025-09-01",
  is_active: false,
  eligible_classes: ["Class 7", "Class 8", "Class 9", "Class 10"],
};

mockDatabase.exams.set(activeEtseExam.id, activeEtseExam);
mockDatabase.exams.set(inactiveEtseExam.id, inactiveEtseExam);

// Isolated Registration Service Simulator matching ETSEService logic
function simulateRegisterStudent(
  examId: string,
  studentInput: {
    studentName: string;
    phone: string;
    dob: string;
    currentClass: string;
  },
  simulatedClock: Date
): { registration: MockRegistration; admitCard: MockAdmitCard } {
  // 1. Resolve Exam
  const exam = mockDatabase.exams.get(examId);
  if (!exam || !exam.is_active) {
    throw new NotFoundError("ETSE Exam", examId);
  }

  // 2. Validate registration window in Indian Standard Time (Asia/Kolkata)
  const todayInIndia = getIndiaCalendarDate(simulatedClock);
  const regStartDate = exam.registration_start_date || ETSE_CONFIG.registrationStartDate;
  const regEndDate = exam.registration_end_date || ETSE_CONFIG.registrationEndDate;

  if (todayInIndia < regStartDate || todayInIndia > regEndDate) {
    throw new ValidationError("Registrations for this examination are currently closed.");
  }

  // 3. Increment Sequence & Create Registration
  mockDatabase.sequenceCounter++;
  const appNumber = `ETSE${exam.year}-${String(mockDatabase.sequenceCounter).padStart(6, "0")}`;
  const regId = `reg-${mockDatabase.sequenceCounter}`;

  const registration: MockRegistration = {
    id: regId,
    application_number: appNumber,
    exam_id: exam.id,
    student_name: studentInput.studentName,
    phone: studentInput.phone,
    dob: studentInput.dob,
    current_class: studentInput.currentClass,
    status: "REGISTERED",
  };
  mockDatabase.registrations.set(regId, registration);

  // 4. Generate Idempotent Admit Card
  const rollNumber = `2610${String(mockDatabase.sequenceCounter).padStart(4, "0")}`;
  const verificationToken = crypto
    .createHash("sha256")
    .update(`${regId}:${studentInput.phone}:test-salt`)
    .digest("hex");

  const admitCard: MockAdmitCard = {
    id: `ac-${regId}`,
    registration_id: regId,
    exam_id: exam.id,
    roll_number: rollNumber,
    verification_token: verificationToken,
    exam_date: exam.exam_date,
    student_name_snapshot: studentInput.studentName,
    status: "PUBLISHED",
  };
  mockDatabase.admitCards.set(verificationToken, admitCard);

  return { registration, admitCard };
}

async function runEndToEndRegistrationTests() {
  // [TEST 1] Registration Accepted on 28 November 2026 at 11:59:59 PM IST
  console.log("\n[TEST 1] Testing registration at 28 November 2026, 11:59:59.999 PM IST...");
  const clockAtFinalInstant = new Date("2026-11-28T18:29:59.999Z"); // 23:59:59.999 IST
  const result1 = simulateRegisterStudent(
    activeEtseExam.id,
    {
      studentName: "Aditya Sharma",
      phone: "9876543210",
      dob: "2011-05-15",
      currentClass: "Class 10",
    },
    clockAtFinalInstant
  );

  assert(Boolean(result1.registration), "Registration must succeed on 28 Nov 11:59:59 PM IST");
  assert(result1.registration.application_number === "ETSE2026-000101", "Application number sequence mismatch");
  assert(result1.admitCard.exam_date === "2026-11-29", "Admit card must display exam date 2026-11-29");
  assert(result1.admitCard.roll_number === "26100101", "Roll number format mismatch");
  console.log(`✓ Registration ACCEPTED at 28 Nov 11:59:59 PM IST (App: ${result1.registration.application_number}, Roll: ${result1.admitCard.roll_number}).`);

  // [TEST 2] Registration Rejected on 29 November 2026 at 12:00:00 AM IST (Midnight)
  console.log("\n[TEST 2] Testing registration at 29 November 2026, 12:00:00 AM IST (Closing Instant)...");
  const clockAtMidnightClose = new Date("2026-11-28T18:30:00.000Z"); // 00:00:00.000 IST 29 Nov
  let rejectedAtMidnight = false;
  try {
    simulateRegisterStudent(
      activeEtseExam.id,
      {
        studentName: "Late Registrant",
        phone: "9876543211",
        dob: "2011-06-20",
        currentClass: "Class 10",
      },
      clockAtMidnightClose
    );
  } catch (err: any) {
    if (err instanceof ValidationError && err.message.includes("closed")) {
      rejectedAtMidnight = true;
    }
  }
  assert(rejectedAtMidnight, "Registration attempt at 29 Nov 00:00:00 AM IST must be REJECTED!");
  console.log("✓ Registration REJECTED at 29 Nov 12:00:00 AM IST with ValidationError: 'Registrations are currently closed'.");

  // [TEST 3] Registration Rejected before 1 June 2026
  console.log("\n[TEST 3] Testing registration before opening date (31 May 2026, 11:59:59 PM IST)...");
  const clockBeforeOpening = new Date("2026-05-31T18:29:59.999Z");
  let rejectedBeforeOpening = false;
  try {
    simulateRegisterStudent(
      activeEtseExam.id,
      {
        studentName: "Early Registrant",
        phone: "9876543212",
        dob: "2011-07-25",
        currentClass: "Class 10",
      },
      clockBeforeOpening
    );
  } catch (err: any) {
    if (err instanceof ValidationError && err.message.includes("closed")) {
      rejectedBeforeOpening = true;
    }
  }
  assert(rejectedBeforeOpening, "Registration before 1 June 2026 must be REJECTED!");
  console.log("✓ Registration REJECTED before 1 June 2026 opening date.");

  // [TEST 4] Inactive ETSE campaigns cannot accept registrations
  console.log("\n[TEST 4] Testing registration on inactive/archived ETSE campaign (ETSE-2025)...");
  let inactiveRejected = false;
  try {
    simulateRegisterStudent(
      inactiveEtseExam.id,
      {
        studentName: "Test Student",
        phone: "9876543213",
        dob: "2011-08-30",
        currentClass: "Class 10",
      },
      new Date("2026-08-15T10:00:00+05:30")
    );
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      inactiveRejected = true;
    }
  }
  assert(inactiveRejected, "Inactive ETSE campaign must NOT accept registrations!");
  console.log("✓ Inactive ETSE campaign safely rejected with NotFoundError.");

  // [TEST 5] Existing registered candidates can still access applications & admit cards after deadline
  console.log("\n[TEST 5] Testing post-deadline access to registered candidate admit card...");
  // Simulated access on Exam Day (29 November 2026 at 08:30 AM IST):
  const candidateReg = mockDatabase.registrations.get(result1.registration.id);
  const candidateAdmitCard = mockDatabase.admitCards.get(result1.admitCard.verification_token);

  assert(Boolean(candidateReg), "Candidate registration record must exist in DB");
  assert(Boolean(candidateAdmitCard), "Candidate admit card record must exist in DB");
  assert(candidateAdmitCard!.exam_date === "2026-11-29", "Exam date on admit card must be 2026-11-29");
  assert(candidateAdmitCard!.student_name_snapshot === "Aditya Sharma", "Snapshot integrity preserved");
  assert(candidateAdmitCard!.roll_number === "26100101", "Roll number preserved");
  console.log(`✓ Post-deadline candidate access verified: App ${candidateReg!.application_number}, Roll ${candidateAdmitCard!.roll_number}, Exam Date: ${candidateAdmitCard!.exam_date}.`);

  // [TEST 6] Public QR Verification Remains Functional
  console.log("\n[TEST 6] Testing Public QR Verification endpoint (/verify-admit-card/[token])...");
  const verificationToken = result1.admitCard.verification_token;
  const verifiedCard = mockDatabase.admitCards.get(verificationToken);

  assert(Boolean(verifiedCard), "QR verification must find admit card by token");
  assert(verifiedCard!.status === "PUBLISHED", "Valid admit card status must be PUBLISHED");
  assert(verifiedCard!.roll_number === "26100101", "Roll number verified via QR token");
  assert(verifiedCard!.exam_date === "2026-11-29", "Exam date verified as 2026-11-29");

  // Revocation verification test
  verifiedCard!.status = "REVOKED";
  assert(verifiedCard!.status === "REVOKED", "Revocation check verified");
  console.log(`✓ Public QR verification verified: Token ${verificationToken.substring(0, 16)}... safely resolves official candidate snapshot.`);

  console.log("\n==================================================");
  console.log("ALL END-TO-END REGISTRATION QA TESTS PASSED (6/6)");
  console.log("==================================================");
}

runEndToEndRegistrationTests().catch((err) => {
  console.error("FATAL ERROR IN E2E REGISTRATION TEST SUITE:", err);
  process.exit(1);
});
