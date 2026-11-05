import {
  ETSE_CONFIG,
  isAnnouncementActiveInIST,
  normalizeDateToIso,
  getIndiaCalendarDate,
} from "@/config/etse";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[ANNOUNCEMENT EXPIRY ASSERTION FAILED]: ${message}`);
  }
}

console.log("==================================================");
console.log("TEST SUITE: CMS ANNOUNCEMENT EXPIRY & TIMEZONE BOUNDARIES");
console.log("==================================================");

async function runAnnouncementExpiryTests() {
  // [TEST 1] Canonical Configuration Check
  console.log("\n[TEST 1] Auditing Canonical ETSE Announcement Date Configuration...");
  assert(
    ETSE_CONFIG.registrationEndDate === "2026-11-28",
    `Expected registrationEndDate "2026-11-28", got "${ETSE_CONFIG.registrationEndDate}"`
  );
  assert(
    ETSE_CONFIG.registrationEndDateDisplay === "28 November 2026",
    `Expected display "28 November 2026", got "${ETSE_CONFIG.registrationEndDateDisplay}"`
  );
  console.log("✓ Canonical ETSE announcement dates verified.");

  // [TEST 2] Date Normalizer Audit
  console.log("\n[TEST 2] Testing normalizeDateToIso() for varied date formats...");
  assert(normalizeDateToIso("2026-11-28") === "2026-11-28", "ISO YYYY-MM-DD failed to pass through");
  assert(normalizeDateToIso("28 November 2026") === "2026-11-28", "Long month name failed to normalize");
  assert(normalizeDateToIso("28 Nov 2026") === "2026-11-28", "Short month name failed to normalize");
  assert(normalizeDateToIso("01 August 2026") === "2026-08-01", "Padded day format failed to normalize");
  assert(normalizeDateToIso("15 September 2026") === "2026-09-15", "September date failed to normalize");
  console.log("✓ normalizeDateToIso successfully normalizes varied date inputs.");

  // [TEST 3] Final Second of 28 November (23:59:59.999 IST) -> MUST BE ACTIVE
  console.log("\n[TEST 3] Testing Announcement at Final Second of 28 November 2026...");
  // 23:59:59.999 IST = 18:29:59.999 UTC
  const finalMomentOf28Nov = new Date("2026-11-28T18:29:59.999Z");
  const indiaDateFinalSec = getIndiaCalendarDate(finalMomentOf28Nov);
  assert(indiaDateFinalSec === "2026-11-28", `Expected 2026-11-28 in India, got ${indiaDateFinalSec}`);

  const isActiveAtFinalSecond = isAnnouncementActiveInIST(
    "28 November 2026",
    "01 August 2026",
    finalMomentOf28Nov
  );
  assert(
    isActiveAtFinalSecond === true,
    "Announcement MUST remain ACTIVE at 28 November 2026, 23:59:59.999 IST!"
  );
  console.log("✓ Verified: Announcement is ACTIVE at 28 November 2026, 23:59:59.999 IST (18:29:59.999 UTC).");

  // [TEST 4] First Second of 29 November (00:00:00.000 IST) -> MUST BE EXPIRED
  console.log("\n[TEST 4] Testing Announcement at First Second of 29 November 2026...");
  // 00:00:00.000 IST = 18:30:00.000 UTC
  const firstMomentOf29Nov = new Date("2026-11-28T18:30:00.000Z");
  const indiaDateFirstSec = getIndiaCalendarDate(firstMomentOf29Nov);
  assert(indiaDateFirstSec === "2026-11-29", `Expected 2026-11-29 in India, got ${indiaDateFirstSec}`);

  const isActiveAtFirstSecond = isAnnouncementActiveInIST(
    "28 November 2026",
    "01 August 2026",
    firstMomentOf29Nov
  );
  assert(
    isActiveAtFirstSecond === false,
    "Announcement MUST become EXPIRED at 29 November 2026, 00:00:00.000 IST!"
  );
  console.log("✓ Verified: Announcement is EXPIRED at 29 November 2026, 00:00:00.000 IST (18:30:00.000 UTC).");

  // [TEST 5] Auditing Date-Only JavaScript Parsing Trap
  console.log("\n[TEST 5] Auditing Date-Only JavaScript Parsing Trap Protection...");
  // In native JS: new Date("28 November 2026") parses to 2026-11-28 00:00:00 local time.
  // At midday on 28 Nov (e.g., 12:00 PM IST = 06:30 UTC):
  const midday28Nov = new Date("2026-11-28T06:30:00.000Z");
  const isActiveAtMidday = isAnnouncementActiveInIST(
    "28 November 2026",
    undefined,
    midday28Nov
  );
  assert(
    isActiveAtMidday === true,
    "Announcement MUST remain ACTIVE during daytime hours on 28 November!"
  );

  // At start of 28 Nov (00:00:01 IST = 2026-11-27T18:30:01.000Z):
  const startOf28Nov = new Date("2026-11-27T18:30:01.000Z");
  const isActiveAtStartOfDay = isAnnouncementActiveInIST(
    "28 November 2026",
    undefined,
    startOf28Nov
  );
  assert(
    isActiveAtStartOfDay === true,
    "Announcement MUST be ACTIVE at 00:00:01 IST on 28 November!"
  );
  console.log("✓ Verified: Calendar-date comparison completely avoids premature date-only expiration.");

  // [TEST 6] Admin CMS Status Audit
  console.log("\n[TEST 6] Auditing Admin CMS Status across active and historical campaigns...");
  const adminAnnouncements = [
    {
      id: "ann-1",
      title: "ETSE 2026 Registration Open for Classes 7–10",
      startDate: "01 August 2026",
      endDate: "28 November 2026",
    },
    {
      id: "ann-2",
      title: "New JEE Dropper & Rankers Batch Orientation",
      startDate: "15 August 2026",
      endDate: "15 September 2026",
    },
  ];

  // At current date (5 November 2026):
  const currentDate = new Date("2026-11-05T12:00:00+05:30");
  const ann1StatusCurrent = isAnnouncementActiveInIST(
    adminAnnouncements[0].endDate,
    adminAnnouncements[0].startDate,
    currentDate
  )
    ? "ACTIVE"
    : "EXPIRED";
  const ann2StatusCurrent = isAnnouncementActiveInIST(
    adminAnnouncements[1].endDate,
    adminAnnouncements[1].startDate,
    currentDate
  )
    ? "ACTIVE"
    : "EXPIRED";

  assert(ann1StatusCurrent === "ACTIVE", "ETSE announcement must be ACTIVE on 5 Nov 2026");
  assert(ann2StatusCurrent === "EXPIRED", "Historical Sept 15 announcement must be EXPIRED on 5 Nov 2026");

  // At 29 November 2026 00:00:00 IST:
  const ann1StatusPostExam = isAnnouncementActiveInIST(
    adminAnnouncements[0].endDate,
    adminAnnouncements[0].startDate,
    firstMomentOf29Nov
  )
    ? "ACTIVE"
    : "EXPIRED";

  assert(ann1StatusPostExam === "EXPIRED", "ETSE announcement must be EXPIRED on 29 Nov 2026 in Admin CMS");
  console.log("✓ Admin CMS statuses verified: ETSE 2026 is ACTIVE now, EXPIRED on 29 Nov; historical batch is EXPIRED.");

  // [TEST 7] Public UI Auto-Hide Consistency Check
  console.log("\n[TEST 7] Auditing Public Navbar Announcement Auto-Hide State...");
  const isBannerVisibleOn28NovNight = isAnnouncementActiveInIST("28 November 2026", undefined, finalMomentOf28Nov);
  const isBannerVisibleOn29NovMorning = isAnnouncementActiveInIST("28 November 2026", undefined, firstMomentOf29Nov);

  assert(isBannerVisibleOn28NovNight === true, "Public announcement bar must be visible on 28 Nov night");
  assert(isBannerVisibleOn29NovMorning === false, "Public announcement bar must auto-hide on 29 Nov at 00:00:00 IST");
  console.log("✓ Public UI announcement auto-hides starting 29 November 2026 at 00:00:00 IST.");

  console.log("\n==================================================");
  console.log("ALL CMS ANNOUNCEMENT EXPIRY TESTS PASSED (7/7)");
  console.log("==================================================");
}

runAnnouncementExpiryTests().catch((err) => {
  console.error("FATAL ERROR IN ANNOUNCEMENT EXPIRY TEST SUITE:", err);
  process.exit(1);
});

