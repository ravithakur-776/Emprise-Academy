import fs from "fs";
import path from "path";
import { HOMEPAGE_DATA } from "../../src/data/homepage";

console.log("==================================================");
console.log("TEST SUITE: LATEST UPDATES / OFFICIAL NOTICES REDESIGN QA");
console.log("==================================================");

// [TEST 1] Auditing Promotional Announcement Images on Disk
console.log("\n[TEST 1] Auditing Promotional Announcement Images on Disk...");
const expectedImages = [
  {
    file: "public/images/announcements/etse-2026-exam-confirmed.jpg",
    expectedAlt: "Emprise Academy ETSE 2026 Talent Search Examination",
    announcementId: "up-1",
  },
  {
    file: "public/images/announcements/new-batches-jee-neet.jpg",
    expectedAlt: "Emprise Academy JEE and NEET new batches",
    announcementId: "up-2",
  },
  {
    file: "public/images/announcements/etse-2026-digital-admit-cards.jpg",
    expectedAlt: "Emprise Academy ETSE 2026 digital admit card",
    announcementId: "up-3",
  },
];

for (const img of expectedImages) {
  const fullPath = path.join(process.cwd(), img.file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing expected announcement image file on disk: ${img.file}`);
  }
  const stat = fs.statSync(fullPath);
  if (stat.size < 50000) {
    throw new Error(`Announcement image file appears too small or corrupt: ${img.file} (${stat.size} bytes)`);
  }
  console.log(`  ✓ Image on disk verified: ${img.file} (${(stat.size / 1024).toFixed(1)} KB)`);
}

// [TEST 2] Auditing Exact Announcement Data Preservation in HOMEPAGE_DATA
console.log("\n[TEST 2] Auditing Exact Announcement Data in HOMEPAGE_DATA...");
const updates = HOMEPAGE_DATA.latestUpdates;
if (!updates || updates.length !== 3) {
  throw new Error(`Expected exactly 3 announcement items in HOMEPAGE_DATA.latestUpdates, found ${updates?.length}`);
}

const expectedAnnouncements = [
  {
    id: "up-1",
    category: "ETSE",
    title: "ETSE 2026 Examination Date Confirmed",
    preview: `Emprise Talent Search Examination will be conducted offline at the Mathura campus on 29 November 2026. Free registration is open until 28 November 2026.`,
    href: "/etse-2026",
    isImportant: true,
  },
  {
    id: "up-2",
    category: "Admissions",
    title: "New Batches Announced for JEE & NEET",
    preview: "Admissions open for Class 11, Class 12, and Dropper target batches. Direct and scholarship-based admissions available.",
    href: "/admissions",
    isImportant: true,
  },
  {
    id: "up-3",
    category: "Notices",
    title: "Digital Admit Cards Issued for Registered ETSE Candidates",
    preview: "Candidates registered for ETSE 2026 can download their official verified admit card with seat number and QR token from the Student Portal.",
    href: "/student/admit-cards",
  },
];

expectedAnnouncements.forEach((expected, i) => {
  const actual = updates[i];
  if (actual.id !== expected.id) {
    throw new Error(`Announcement ${i + 1} ID mismatch: expected ${expected.id}, got ${actual.id}`);
  }
  if (actual.title !== expected.title) {
    throw new Error(`Announcement ${i + 1} title mismatch: expected "${expected.title}", got "${actual.title}"`);
  }
  if (actual.preview !== expected.preview) {
    throw new Error(`Announcement ${i + 1} preview mismatch: expected "${expected.preview}", got "${actual.preview}"`);
  }
  if (actual.href !== expected.href) {
    throw new Error(`Announcement ${i + 1} href mismatch: expected "${expected.href}", got "${actual.href}"`);
  }
  console.log(`  ✓ Announcement ${i + 1} verified: "${actual.title}" -> ${actual.href}`);
});

// [TEST 3] Auditing LatestUpdatesSection Component Source
console.log("\n[TEST 3] Auditing LatestUpdatesSection.tsx Component Source...");
const componentPath = path.join(process.cwd(), "src/components/home/LatestUpdatesSection.tsx");
const componentSource = fs.readFileSync(componentPath, "utf-8");

// Verify Section IDs and ARIA
if (!componentSource.includes('id="updates"') || !componentSource.includes('id="latest-updates"')) {
  throw new Error("Missing backward-compatible section anchor IDs in LatestUpdatesSection.tsx");
}
console.log("  ✓ Backward-compatible anchor IDs #updates and #latest-updates present.");

// Verify Section Eyebrow, Title and Subtitle
if (!componentSource.includes("OFFICIAL NOTICES &amp; BULLETINS") && !componentSource.includes("OFFICIAL NOTICES & BULLETINS")) {
  throw new Error("Missing exact section badge 'OFFICIAL NOTICES & BULLETINS'");
}
if (!componentSource.includes("Latest From") || !componentSource.includes("Emprise")) {
  throw new Error("Missing exact heading 'Latest From Emprise'");
}
if (!componentSource.includes("View All Academy Announcements")) {
  throw new Error("Missing action link 'View All Academy Announcements'");
}
console.log("  ✓ Section eyebrow, heading, and header action link verified.");

// Verify 3 Image paths referenced
for (const img of expectedImages) {
  const filename = path.basename(img.file);
  if (!componentSource.includes(filename)) {
    throw new Error(`Component does not reference image filename: ${filename}`);
  }
  if (!componentSource.includes(img.expectedAlt)) {
    throw new Error(`Component does not include expected alt text: "${img.expectedAlt}"`);
  }
}
console.log("  ✓ All 3 promotional image paths and exact alt attributes verified in component.");

// Verify Hover Lift & Transitions
if (!componentSource.includes("-translate-y-[3px]") && !componentSource.includes("-translate-y-1")) {
  throw new Error("Missing card hover lift translation in LatestUpdatesSection.tsx");
}
if (!componentSource.includes("group-hover:scale-[1.04]") && !componentSource.includes("scale-105") && !componentSource.includes("scale-[1.03]")) {
  throw new Error("Missing subtle image scale transition on hover");
}
if (!componentSource.includes("min-h-[44px]") || !componentSource.includes("min-w-[44px]")) {
  throw new Error("Missing 44px minimum touch target guarantee on action buttons");
}
console.log("  ✓ Hover lift, image scale transition, and 44px touch targets verified.");

// Verify prefers-reduced-motion support
if (!componentSource.includes("prefers-reduced-motion") || !componentSource.includes("motion-reduce")) {
  throw new Error("Missing accessibility support for prefers-reduced-motion");
}
console.log("  ✓ Accessibility prefers-reduced-motion verified.");

console.log("\n==================================================");
console.log("ALL LATEST UPDATES REDESIGN TESTS PASSED (100% SUCCESS)");
console.log("==================================================");
