import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { VERIFIED_BRAND_DATA } from "@/data/brand";
import { MAIN_CONTACT_DATA } from "@/data/admissions";
import { MAIN_ETSE_DATA } from "@/data/etse";
import { HOMEPAGE_DATA } from "@/data/homepage";
import fs from "fs";
import path from "path";

console.log("==================================================");
console.log("TEST SUITE: PHASE 5.2B OFFICIAL INSTITUTE DATA POPULATION & CANONICAL CONFIGURATION");
console.log("==================================================");

async function runDataPurificationTests() {
  // [TEST 1] Canonical Business Configuration Official Values
  console.log("\n[TEST 1] Auditing Canonical Official Institute Data...");
  if (CANONICAL_BUSINESS_CONFIG.academy_name !== "Emprise Academy") {
    throw new Error(`Invalid academy_name: ${CANONICAL_BUSINESS_CONFIG.academy_name}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.established_year !== 2011) {
    throw new Error(`Invalid established_year: ${CANONICAL_BUSINESS_CONFIG.established_year}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.years_of_excellence !== "15+ Years of Academic Excellence") {
    throw new Error(`Invalid years_of_excellence: ${CANONICAL_BUSINESS_CONFIG.years_of_excellence}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.years_of_excellence_enabled !== true) {
    throw new Error("years_of_excellence_enabled must be true");
  }
  if (CANONICAL_BUSINESS_CONFIG.tagline !== null) {
    throw new Error("Official tagline must be null (N/A)");
  }
  console.log(`✓ Official identity verified: ${CANONICAL_BUSINESS_CONFIG.academy_name} (Est. ${CANONICAL_BUSINESS_CONFIG.established_year}, ${CANONICAL_BUSINESS_CONFIG.years_of_excellence}).`);

  // [TEST 2] Official Campus Address & Postal Code
  console.log("\n[TEST 2] Auditing Official Campus Address...");
  if (
    CANONICAL_BUSINESS_CONFIG.address.street_address !== "Near Tera Tower, Bhuteshwar Road" ||
    CANONICAL_BUSINESS_CONFIG.address.city !== "Mathura" ||
    CANONICAL_BUSINESS_CONFIG.address.state !== "Uttar Pradesh" ||
    CANONICAL_BUSINESS_CONFIG.address.postal_code !== "281004"
  ) {
    throw new Error(`Invalid campus address: ${JSON.stringify(CANONICAL_BUSINESS_CONFIG.address)}`);
  }
  console.log(`✓ Official campus address verified: ${CANONICAL_BUSINESS_CONFIG.address.display_location}.`);

  // [TEST 3] Official Helplines, Secondary Phone Link & WhatsApp
  console.log("\n[TEST 3] Auditing Official Contact Helplines & Links...");
  if (
    CANONICAL_BUSINESS_CONFIG.contact.phone_primary !== "+91 7247889955" ||
    CANONICAL_BUSINESS_CONFIG.contact.phone_primary_tel !== "tel:+917247889955"
  ) {
    throw new Error(`Invalid primary phone: ${CANONICAL_BUSINESS_CONFIG.contact.phone_primary}`);
  }
  if (
    CANONICAL_BUSINESS_CONFIG.contact.phone_secondary !== "+91 9634448800" ||
    CANONICAL_BUSINESS_CONFIG.contact.phone_secondary_tel !== "tel:+919634448800"
  ) {
    throw new Error(`Invalid secondary phone: ${CANONICAL_BUSINESS_CONFIG.contact.phone_secondary}`);
  }
  const secTel = CANONICAL_BUSINESS_CONFIG.contact.phone_secondary_tel as string;
  const primTel = CANONICAL_BUSINESS_CONFIG.contact.phone_primary_tel as string;
  if (secTel === primTel) {
    throw new Error("Secondary phone tel href MUST NOT match primary phone tel href");
  }
  if (
    CANONICAL_BUSINESS_CONFIG.contact.whatsapp !== "+91 9808912829" ||
    !CANONICAL_BUSINESS_CONFIG.contact.whatsapp_link.includes("919808912829")
  ) {
    throw new Error(`Invalid WhatsApp config: ${CANONICAL_BUSINESS_CONFIG.contact.whatsapp}`);
  }
  if (
    CANONICAL_BUSINESS_CONFIG.contact.email !== "info@empriseacademy.com" ||
    CANONICAL_BUSINESS_CONFIG.contact.email_mailto !== "mailto:info@empriseacademy.com"
  ) {
    throw new Error(`Invalid email config: ${CANONICAL_BUSINESS_CONFIG.contact.email}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.contact.google_maps_url !== "https://maps.app.goo.gl/P3E6GLnWqrdZfNcn7") {
    throw new Error(`Invalid maps URL: ${CANONICAL_BUSINESS_CONFIG.contact.google_maps_url}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.contact.business_hours !== "10 AM – 7 PM") {
    throw new Error(`Invalid business hours: ${CANONICAL_BUSINESS_CONFIG.contact.business_hours}`);
  }
  console.log("✓ Official primary/secondary phones, WhatsApp, email, hours, and Google Maps URL verified.");

  // [TEST 4] Official Social Media Channels & LinkedIn Null State
  console.log("\n[TEST 4] Auditing Official Social Media Channels...");
  if (
    CANONICAL_BUSINESS_CONFIG.social.instagram !== "https://www.instagram.com/empriseacademy/" ||
    CANONICAL_BUSINESS_CONFIG.social.facebook !== "https://www.facebook.com/EmpriseAcademy" ||
    CANONICAL_BUSINESS_CONFIG.social.youtube !== "https://youtube.com/@emprisemathura?si=mQONprDb6PzOAGuB"
  ) {
    throw new Error("Social channel URLs mismatch with official provided data");
  }
  if (CANONICAL_BUSINESS_CONFIG.social.linkedin !== null) {
    throw new Error("LinkedIn must be null (NOT PROVIDED)");
  }
  console.log("✓ Social media channels verified (Instagram, Facebook, YouTube active; LinkedIn null).");

  // [TEST 5] Single-Source Derivations Synchronized
  console.log("\n[TEST 5] Auditing Single-Source Derivations...");
  if (VERIFIED_BRAND_DATA.institutionName !== CANONICAL_BUSINESS_CONFIG.academy_name) {
    throw new Error("VERIFIED_BRAND_DATA.institutionName mismatch with canonical config");
  }
  if (MAIN_CONTACT_DATA.contactDetails.phone !== "+91 7247889955") {
    throw new Error("MAIN_CONTACT_DATA primary phone mismatch");
  }
  if (MAIN_CONTACT_DATA.contactDetails.phoneSecondary !== "+91 9634448800") {
    throw new Error("MAIN_CONTACT_DATA secondary phone mismatch");
  }
  if (MAIN_CONTACT_DATA.contactDetails.email !== "info@empriseacademy.com") {
    throw new Error("MAIN_CONTACT_DATA email mismatch");
  }
  if (HOMEPAGE_DATA.contactCampus.phoneDisplay !== "+91 7247889955") {
    throw new Error("HOMEPAGE_DATA phone mismatch");
  }
  if (HOMEPAGE_DATA.contactCampus.email !== "info@empriseacademy.com") {
    throw new Error("HOMEPAGE_DATA email mismatch");
  }
  console.log("✓ All brand, contact, and homepage modules strictly derive from canonical config.");

  // [TEST 6] ETSE 2026 Campaign Single-Source Integrity
  console.log("\n[TEST 6] Auditing ETSE 2026 Campaign Single Source...");
  if (CANONICAL_BUSINESS_CONFIG.etse.short_name !== "ETSE 2026") {
    throw new Error(`Invalid ETSE short name: ${CANONICAL_BUSINESS_CONFIG.etse.short_name}`);
  }
  if (CANONICAL_BUSINESS_CONFIG.etse.exam_date !== "29 November 2026") {
    throw new Error(`Invalid ETSE exam date: ${CANONICAL_BUSINESS_CONFIG.etse.exam_date}`);
  }
  if (MAIN_ETSE_DATA.campaign.examDateDisplay !== "29 November 2026") {
    throw new Error(`MAIN_ETSE_DATA exam date mismatch: ${MAIN_ETSE_DATA.campaign.examDateDisplay}`);
  }
  console.log(`✓ ETSE 2026 campaign specs verified: ${CANONICAL_BUSINESS_CONFIG.etse.exam_date}, Classes 7–10, ${CANONICAL_BUSINESS_CONFIG.etse.fee}.`);

  // [TEST 7] Scanning for Stale Dates across Production Source Files
  console.log("\n[TEST 7] Scanning for Stale ETSE Dates (21 Sep 2025, 23 Aug 2026, 18 Oct 2026, 25 Oct 2026)...");
  const dataDir = path.resolve(process.cwd(), "src/data");
  const compDir = path.resolve(process.cwd(), "src/components");

  const getTsFiles = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files: string[] = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getTsFiles(fullPath));
      } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
        files.push(fullPath);
      }
    }
    return files;
  };

  const filesToCheck = [...getTsFiles(dataDir), ...getTsFiles(compDir)];
  const staleDates = ["21 September 2025", "23 August 2026", "18 October 2026", "27 September 2026", "06 September 2026", "25 October 2026"];

  for (const file of filesToCheck) {
    const content = fs.readFileSync(file, "utf-8");
    for (const d of staleDates) {
      if (content.includes(d)) {
        throw new Error(`Found stale date "${d}" in file: ${path.relative(process.cwd(), file)}`);
      }
    }
  }
  console.log(`✓ Scanned ${filesToCheck.length} production files — Zero stale campaign dates detected.`);

  // [TEST 8] Scanning for Old Unverified Placeholders in Public Data & Config
  console.log("\n[TEST 8] Scanning for Old Placeholder Strings (+91 98765 43210, Near Highway Crossing, admissions@empriseacademy.com)...");
  const publicFiles = [...getTsFiles(dataDir), ...getTsFiles(path.resolve(process.cwd(), "src/config"))];
  const prohibitedPlaceholders = ["+91 98765 43210", "Near Highway Crossing", "admissions@empriseacademy.com"];

  for (const file of publicFiles) {
    const content = fs.readFileSync(file, "utf-8");
    for (const ph of prohibitedPlaceholders) {
      if (content.includes(ph)) {
        throw new Error(`Found unverified placeholder "${ph}" in public data: ${path.relative(process.cwd(), file)}`);
      }
    }
  }
  console.log(`✓ Scanned ${publicFiles.length} public data & config files — Zero old placeholders detected.`);

  console.log("\n==================================================");
  console.log("ALL PHASE 5.2B DATA POPULATION TESTS PASSED (8/8)");
  console.log("==================================================");
}

runDataPurificationTests().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
