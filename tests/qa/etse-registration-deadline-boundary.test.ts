import { ETSE_CONFIG, getIndiaCalendarDate, isRegistrationOpenInIST, getRegistrationStatusInfo } from "@/config/etse";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { MAIN_ETSE_DATA } from "@/data/etse";

console.log("==================================================");
console.log("TEST SUITE: ETSE 2026 REGISTRATION DEADLINE & TIMEZONE BOUNDARIES");
console.log("==================================================");

// [TEST 1] Configuration Verification
console.log("\n[TEST 1] Auditing Canonical ETSE Deadline Configuration...");
if (ETSE_CONFIG.examDate !== "2026-11-29") {
  throw new Error(`Expected examDate '2026-11-29', got '${ETSE_CONFIG.examDate}'`);
}
if (ETSE_CONFIG.registrationEndDate !== "2026-11-28") {
  throw new Error(`Expected registrationEndDate '2026-11-28', got '${ETSE_CONFIG.registrationEndDate}'`);
}
if (ETSE_CONFIG.registrationStartDate !== "2026-06-01") {
  throw new Error(`Expected registrationStartDate '2026-06-01', got '${ETSE_CONFIG.registrationStartDate}'`);
}
if (ETSE_CONFIG.registrationEndDateDisplay !== "28 November 2026") {
  throw new Error(`Expected registrationEndDateDisplay '28 November 2026', got '${ETSE_CONFIG.registrationEndDateDisplay}'`);
}
if (ETSE_CONFIG.registrationDeadlineShort !== "28 Nov 2026") {
  throw new Error(`Expected registrationDeadlineShort '28 Nov 2026', got '${ETSE_CONFIG.registrationDeadlineShort}'`);
}
console.log(`✓ ETSE 2026 Schedule Verified: Exam on ${ETSE_CONFIG.examDateDisplay}, Registration Deadline on ${ETSE_CONFIG.registrationEndDateDisplay}.`);

// [TEST 2] Deterministic Indian Calendar Date Extraction
console.log("\n[TEST 2] Testing getIndiaCalendarDate(date) across timezone offsets...");
const sampleUtcDates = [
  { utc: "2026-11-28T18:29:59.999Z", expectedIndiaDate: "2026-11-28", desc: "28 Nov 11:59:59.999 PM IST" },
  { utc: "2026-11-28T18:30:00.000Z", expectedIndiaDate: "2026-11-29", desc: "29 Nov 12:00:00.000 AM IST (Midnight)" },
  { utc: "2026-05-31T18:29:59.999Z", expectedIndiaDate: "2026-05-31", desc: "31 May 11:59:59.999 PM IST" },
  { utc: "2026-05-31T18:30:00.000Z", expectedIndiaDate: "2026-06-01", desc: "01 Jun 12:00:00.000 AM IST (Opening)" },
];

for (const s of sampleUtcDates) {
  const resolved = getIndiaCalendarDate(new Date(s.utc));
  if (resolved !== s.expectedIndiaDate) {
    throw new Error(`Date resolution mismatch for ${s.desc} (${s.utc}): expected '${s.expectedIndiaDate}', got '${resolved}'`);
  }
  console.log(`  ✓ ${s.desc} (${s.utc}) -> Indian Date: ${resolved}`);
}

// [TEST 3] Authoritative Date Boundary Cases (Asia/Kolkata)
console.log("\n[TEST 3] Testing Specified Boundary Cases against Registration Window...");
const boundaryCases = [
  { label: "27 November 2026, 11:59 PM IST", date: new Date("2026-11-27T18:29:00Z"), expected: true },
  { label: "28 November 2026, 12:00 AM IST", date: new Date("2026-11-27T18:30:00Z"), expected: true },
  { label: "28 November 2026, 12:00 PM IST", date: new Date("2026-11-28T06:30:00Z"), expected: true },
  { label: "28 November 2026, 11:59:59 PM IST", date: new Date("2026-11-28T18:29:59.999Z"), expected: true },
  { label: "29 November 2026, 12:00 AM IST", date: new Date("2026-11-28T18:30:00.000Z"), expected: false },
  { label: "29 November 2026, 10:00 AM IST", date: new Date("2026-11-29T04:30:00Z"), expected: false },
  { label: "30 November 2026 IST", date: new Date("2026-11-30T06:00:00Z"), expected: false },
  { label: "31 May 2026, 11:59 PM IST (Before Opening)", date: new Date("2026-05-31T18:29:00Z"), expected: false },
  { label: "01 June 2026, 12:00 AM IST (Opening Moment)", date: new Date("2026-05-31T18:30:00Z"), expected: true },
];

for (const c of boundaryCases) {
  const isOpen = isRegistrationOpenInIST(ETSE_CONFIG.registrationStartDate, ETSE_CONFIG.registrationEndDate, c.date);
  if (isOpen !== c.expected) {
    throw new Error(`Boundary test failed for '${c.label}': expected ${c.expected ? "OPEN" : "CLOSED"}, got ${isOpen ? "OPEN" : "CLOSED"}`);
  }
  console.log(`  ✓ ${c.label} -> ${isOpen ? "OPEN" : "CLOSED"}`);
}

// [TEST 4] Critical UTC Boundary Precision
console.log("\n[TEST 4] Auditing Sub-Second UTC Boundary Precision...");
const boundaryOpenUtc = new Date("2026-11-28T18:29:59.999Z");
const boundaryClosedUtc = new Date("2026-11-28T18:30:00.000Z");

const isOpenAtLastSecond = isRegistrationOpenInIST(ETSE_CONFIG.registrationStartDate, ETSE_CONFIG.registrationEndDate, boundaryOpenUtc);
const isClosedAtMidnight = isRegistrationOpenInIST(ETSE_CONFIG.registrationStartDate, ETSE_CONFIG.registrationEndDate, boundaryClosedUtc);

if (!isOpenAtLastSecond) {
  throw new Error("Registration must remain OPEN at 2026-11-28T18:29:59.999Z (11:59:59.999 PM IST).");
}
if (isClosedAtMidnight) {
  throw new Error("Registration must be CLOSED at 2026-11-28T18:30:00.000Z (12:00:00.000 AM IST on 29 Nov).");
}
console.log("✓ Sub-millisecond boundary precision verified: 18:29:59.999Z is OPEN, 18:30:00.000Z is CLOSED.");

// [TEST 5] Status Info Helper Formatting
console.log("\n[TEST 5] Auditing getRegistrationStatusInfo() output format...");
const openStatus = getRegistrationStatusInfo(new Date("2026-11-15T10:00:00Z"));
const closedStatus = getRegistrationStatusInfo(new Date("2026-11-29T10:00:00Z"));

if (!openStatus.isOpen || !openStatus.helperMessage.includes("28 November 2026")) {
  throw new Error("getRegistrationStatusInfo() returned invalid open state structure.");
}
if (closedStatus.isOpen || !closedStatus.helperMessage.includes("closed")) {
  throw new Error("getRegistrationStatusInfo() returned invalid closed state structure.");
}
console.log(`✓ Status info verified for active and closed windows.`);

// [TEST 6] Homepage and Announcement Copy Consistency
console.log("\n[TEST 6] Auditing Homepage & Promotional Announcement Data Consistency...");
if (!HOMEPAGE_DATA.announcement.text.includes("Last Date: 28 November")) {
  throw new Error(`Homepage announcement missing last date: ${HOMEPAGE_DATA.announcement.text}`);
}
if (!MAIN_ETSE_DATA.meta.description.includes("28 November 2026")) {
  throw new Error(`ETSE meta description missing last date: ${MAIN_ETSE_DATA.meta.description}`);
}
console.log("✓ All promotional copy displays approved registration last date: 28 November 2026.");

console.log("\n==================================================");
console.log("ALL ETSE 2026 REGISTRATION DEADLINE TESTS PASSED (6/6)");
console.log("==================================================");

