import fs from "fs";
import path from "path";
import { HOMEPAGE_DATA } from "@/data/homepage";

console.log("==================================================");
console.log("TEST SUITE: STEP 5B - TOP ANNOUNCEMENT BAR ETSE LABEL QA");
console.log("==================================================");

async function runAnnouncementBarTests() {
  const navbarPath = path.resolve(process.cwd(), "src/components/navigation/Navbar.tsx");
  const navbarContent = fs.readFileSync(navbarPath, "utf-8");

  // [TEST 1] Auditing ETSE Badge/Sticker Removal
  console.log("\n[TEST 1] Auditing removal of ETSE sticker/badge component...");
  if (navbarContent.includes("bg-white/10 px-2 py-0.5 rounded shrink-0 border border-white/15")) {
    throw new Error("Navbar announcement bar still contains sticker/badge pill container styling!");
  }
  if (navbarContent.includes("<Sparkles className=\"w-3 h-3 text-[var(--brand-accent)]\" /> ETSE 2026")) {
    throw new Error("Navbar announcement bar still contains 'ETSE 2026' badge with Sparkles icon!");
  }
  console.log("✓ Verified old 'ETSE 2026' pill badge and sticker container completely removed.");

  // [TEST 2] Auditing Simple Plain Text ETSE
  console.log("\n[TEST 2] Auditing simple plain text 'ETSE' label...");
  if (!navbarContent.includes(">ETSE</span>") && !navbarContent.includes(">\n              ETSE\n            </span>")) {
    throw new Error("Navbar announcement bar missing plain text ETSE category label!");
  }
  console.log("✓ Verified clean semantic text 'ETSE' category label without pill background.");

  // [TEST 3] Auditing Preserved Announcement Content (Desktop & Mobile)
  console.log("\n[TEST 3] Auditing announcement copy preservation...");
  const desktopAnnouncement = "Free ETSE 2026 Registration — Last Date: 28 November • Exam on 29 November 2026 • Classes 7th to 10th";
  if (!navbarContent.includes(desktopAnnouncement)) {
    throw new Error("Desktop announcement copy modified unexpectedly!");
  }
  const mobileAnnouncement = "• Last Date: 28 Nov • Exam: 29 Nov • FREE";
  if (!navbarContent.includes(mobileAnnouncement)) {
    throw new Error("Mobile announcement copy modified unexpectedly!");
  }
  console.log("✓ Verified exact desktop and mobile announcement sentences preserved.");

  // [TEST 4] Auditing Action Links & Phone Number
  console.log("\n[TEST 4] Auditing announcement action links & contact info...");
  if (!navbarContent.includes('href="/etse-2026#register"') || !navbarContent.includes("Register Now")) {
    throw new Error("Missing 'Register Now' CTA link pointing to /etse-2026#register");
  }
  if (!navbarContent.includes("tel:+917247889955") || !navbarContent.includes("+91 7247889955")) {
    throw new Error("Missing contact number +91 7247889955 in announcement bar");
  }
  console.log("✓ Verified 'Register Now' and '+91 7247889955' links preserved.");

  // [TEST 5] Auditing HOMEPAGE_DATA Announcement Object
  console.log("\n[TEST 5] Auditing HOMEPAGE_DATA.announcement data configuration...");
  if (HOMEPAGE_DATA.announcement.badge !== "ETSE") {
    throw new Error(`HOMEPAGE_DATA.announcement.badge expected 'ETSE', found '${HOMEPAGE_DATA.announcement.badge}'`);
  }
  if (HOMEPAGE_DATA.announcement.examDate !== "29 November 2026") {
    throw new Error("HOMEPAGE_DATA.announcement.examDate modified unexpectedly!");
  }
  console.log("✓ Verified canonical announcement data configuration.");

  console.log("\n==================================================");
  console.log("ALL STEP 5B ANNOUNCEMENT BAR TESTS PASSED (5/5)");
  console.log("==================================================");
}

runAnnouncementBarTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
