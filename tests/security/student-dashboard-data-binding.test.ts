import { getStudentDashboardData } from "../../src/services/student-portal.service";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[STUDENT DASHBOARD TEST FAILED]: ${message}`);
  }
}

async function runStudentDashboardTestSuite() {
  console.log("==================================================");
  console.log("TEST SUITE: STUDENT DASHBOARD REAL DATA BINDING & ISOLATION");
  console.log("==================================================");

  // [TEST 1] Unauthenticated Access Check
  console.log("\n[TEST 1] Testing Unauthenticated Session Rejection...");
  const mockUnauthSupabase: any = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: { message: "No active session" } }),
    },
  };
  const unauthResult = await getStudentDashboardData(mockUnauthSupabase);
  assert(unauthResult === null, "Unauthenticated user must receive null dashboard payload");
  console.log("✓ Unauthenticated session safely returns null, prompting redirect.");

  // [TEST 2] Real Profile Binding with Zero Applications (Empty State)
  console.log("\n[TEST 2] Testing Authenticated Student (ravithakur2233@gmail.com) with Zero Applications...");
  const studentAUser = {
    id: "user-test-student-1234",
    email: "ravithakur2233@gmail.com",
    user_metadata: { full_name: "Test Student" },
  };

  const studentAProfile = {
    id: "prof-test-student",
    user_id: "user-test-student-1234",
    full_name: "Test Student",
    current_class: "Class 12",
    target_exam: "IIT-JEE",
    school_name: "Emprise Academy Mathura",
    phone: "9876543210",
    email: "ravithakur2233@gmail.com",
    admission_number: "EMP-2026-0012",
  };

  const mockSupabaseA: any = {
    auth: {
      getUser: async () => ({ data: { user: studentAUser }, error: null }),
    },
    from: (table: string) => {
      if (table === "student_profiles") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: studentAProfile, error: null }),
            }),
          }),
        };
      }
      if (table === "user_profiles") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: { full_name: "Test Student" }, error: null }),
            }),
          }),
        };
      }
      if (table === "etse_registrations") {
        return {
          select: () => ({
            or: () => ({
              order: async () => ({ data: [], count: 0, error: null }),
            }),
            eq: () => ({
              order: async () => ({ data: [], count: 0, error: null }),
            }),
          }),
        };
      }
      if (table === "notifications") {
        return {
          select: () => ({
            eq: (field: string, val: string) => {
              assert(val === "user-test-student-1234", `Notification query must scope to user.id, got ${val}`);
              return {
                eq: async () => ({ count: 0, error: null }),
              };
            },
          }),
        };
      }
      if (table === "results") {
        return {
          select: () => ({
            eq: () => ({
              eq: () => ({
                limit: () => ({
                  maybeSingle: async () => ({ data: null, error: null }),
                }),
              }),
            }),
          }),
        };
      }
      return {
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: null, error: null }),
          }),
        }),
      };
    },
  };

  const dataA = await getStudentDashboardData(mockSupabaseA);
  assert(dataA !== null, "Dashboard data for authenticated student must not be null");
  assert(dataA?.studentName === "Test Student", `Expected 'Test Student', got '${dataA?.studentName}'`);
  assert(dataA?.studentClass === "Class 12", `Expected 'Class 12', got '${dataA?.studentClass}'`);
  assert(dataA?.targetExam === "IIT-JEE", `Expected 'IIT-JEE', got '${dataA?.targetExam}'`);
  assert(dataA?.totalApplications === 0, `Expected 0 applications, got ${dataA?.totalApplications}`);
  assert(dataA?.activeExam === null, "Active exam must be null for student with 0 registrations");
  assert(dataA?.admitCardStatus === "No Application", `Expected 'No Application', got '${dataA?.admitCardStatus}'`);
  assert(dataA?.notificationsCount === 0, `Expected 0 unread notices, got ${dataA?.notificationsCount}`);
  assert(dataA?.studentName !== "Aarav Verma", "Must not fallback to Aarav Verma");
  console.log("✓ Authenticated Test Student verified with dynamic profile (Class 12, IIT-JEE) and 0 fake applications.");

  // [TEST 3] Real ETSE Registered Student Binding
  console.log("\n[TEST 3] Testing Authenticated Student with Live ETSE 2026 Registration...");
  const studentBUser = {
    id: "user-registered-5678",
    email: "registered.student@example.com",
  };

  const studentBProfile = {
    id: "prof-registered-5678",
    user_id: "user-registered-5678",
    full_name: "Priya Sharma",
    current_class: "Class 10",
    target_exam: "NEET",
    school_name: "Delhi Public School Mathura",
    phone: "9123456780",
    email: "registered.student@example.com",
  };

  const registrationRecord = {
    id: "reg-b-101",
    application_number: "ETSE2026-000555",
    student_name: "Priya Sharma",
    status: "CONFIRMED",
    current_class: "Class 10",
    stream_interest: "Medical (NEET)",
    etse_exams: {
      title: "Emprise Talent Search Examination 2026",
      exam_date: "2026-11-29",
      exam_time: "10:00 AM",
    },
    exam_centres: {
      centre_name: "Emprise Academy Main Campus",
      city: "Mathura",
    },
  };

  const admitCardRecord = {
    id: "ac-b-1",
    registration_id: "reg-b-101",
    roll_number: "26100555",
    verification_token: "tok-sec-9999",
    is_generated: true,
    status: "PUBLISHED",
  };

  const mockSupabaseB: any = {
    auth: {
      getUser: async () => ({ data: { user: studentBUser }, error: null }),
    },
    from: (table: string) => {
      if (table === "student_profiles") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: studentBProfile, error: null }),
            }),
          }),
        };
      }
      if (table === "user_profiles") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: { full_name: "Priya Sharma" }, error: null }),
            }),
          }),
        };
      }
      if (table === "etse_registrations") {
        return {
          select: () => ({
            or: () => ({
              order: async () => ({ data: [registrationRecord], count: 1, error: null }),
            }),
            eq: () => ({
              order: async () => ({ data: [registrationRecord], count: 1, error: null }),
            }),
          }),
        };
      }
      if (table === "admit_cards") {
        return {
          select: () => ({
            eq: (field: string, val: string) => {
              assert(val === "reg-b-101", `Admit card must be queried for registration_id reg-b-101, got ${val}`);
              return {
                maybeSingle: async () => ({ data: admitCardRecord, error: null }),
              };
            },
          }),
        };
      }
      if (table === "notifications") {
        return {
          select: () => ({
            eq: () => ({
              eq: async () => ({ count: 2, error: null }),
            }),
          }),
        };
      }
      if (table === "results") {
        return {
          select: () => ({
            eq: () => ({
              eq: () => ({
                limit: () => ({
                  maybeSingle: async () => ({ data: null, error: null }),
                }),
              }),
            }),
          }),
        };
      }
      return {
        select: () => ({
          eq: () => ({
            maybeSingle: async () => ({ data: null, error: null }),
          }),
        }),
      };
    },
  };

  const dataB = await getStudentDashboardData(mockSupabaseB);
  assert(dataB !== null, "Dashboard data for registered student must not be null");
  assert(dataB?.studentName === "Priya Sharma", `Expected 'Priya Sharma', got '${dataB?.studentName}'`);
  assert(dataB?.studentClass === "Class 10", `Expected 'Class 10', got '${dataB?.studentClass}'`);
  assert(dataB?.applicationNo === "ETSE2026-000555", `Expected 'ETSE2026-000555', got '${dataB?.applicationNo}'`);
  assert(dataB?.totalApplications === 1, `Expected 1 application, got ${dataB?.totalApplications}`);
  assert(dataB?.activeExam?.title === "Emprise Talent Search Examination 2026", "Exam title matches registration");
  assert(dataB?.admitCardStatus === "Ready", `Expected admit card status 'Ready', got '${dataB?.admitCardStatus}'`);
  assert(dataB?.admitCard?.rollNumber === "26100555", `Expected roll number '26100555', got '${dataB?.admitCard?.rollNumber}'`);
  assert(dataB?.notificationsCount === 2, `Expected 2 notifications, got ${dataB?.notificationsCount}`);
  console.log("✓ Registered student correctly bound to live exam registration and admit card pass.");

  // [TEST 4] Cross-Student Data Isolation Check
  console.log("\n[TEST 4] Testing Cross-Student Data Isolation (Student A vs Student B)...");
  assert(dataA?.studentName !== dataB?.studentName, "Student A and Student B identities must never collide");
  assert(dataA?.applicationNo !== dataB?.applicationNo, "Student A and Student B application numbers must be isolated");
  assert(dataA?.totalApplications === 0 && dataB?.totalApplications === 1, "Student A zero applications must not bleed into Student B");
  console.log("✓ Cross-student data isolation verified. No cross-account leakage.");

  console.log("\n==================================================");
  console.log("ALL STUDENT DASHBOARD DATA BINDING TESTS PASSED (4/4)");
  console.log("==================================================");
}

runStudentDashboardTestSuite().catch((err) => {
  console.error(err);
  process.exit(1);
});
