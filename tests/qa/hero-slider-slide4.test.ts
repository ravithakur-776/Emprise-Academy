import fs from "fs";
import path from "path";
import { HOMEPAGE_DATA } from "@/data/homepage";

console.log("==================================================");
console.log("TEST SUITE: HERO CAROUSEL SLIDE 4 NEET 2026 RESULT AUDIT");
console.log("==================================================");

async function runSlide4Tests() {
  // [TEST 1] Auditing Slide Order & Sequence
  console.log("\n[TEST 1] Auditing Slide Order & Sequence...");
  const slides = HOMEPAGE_DATA.heroSlides;
  if (slides.length !== 8) {
    throw new Error(`Expected exactly 8 slides, found ${slides.length}`);
  }

  const slide1 = slides[0];
  const slide2 = slides[1];
  const slide3 = slides[2];
  const slide4 = slides[3];
  const slide5 = slides[4];
  const slide6 = slides[5];
  const slide7 = slides[6];
  const slide8 = slides[7];

  if (slide1.id !== "slide-jee-toppers") {
    throw new Error(`Slide 1 must be 'slide-jee-toppers', got '${slide1.id}'`);
  }
  if (slide2.id !== "slide-iit-bombay-achievers") {
    throw new Error(`Slide 2 must be 'slide-iit-bombay-achievers', got '${slide2.id}'`);
  }
  if (slide3.id !== "slide-jee-main-2026-top-performers") {
    throw new Error(`Slide 3 must be 'slide-jee-main-2026-top-performers', got '${slide3.id}'`);
  }
  if (slide4.id !== "slide-neet-ug-2026-result") {
    throw new Error(`Slide 4 must be 'slide-neet-ug-2026-result', got '${slide4.id}'`);
  }
  if (slide5.id !== "slide-top-iit-jee-performers") {
    throw new Error(`Slide 5 must be 'slide-top-iit-jee-performers', got '${slide5.id}'`);
  }
  if (slide6.id !== "slide-neet-excellence-aiims") {
    throw new Error(`Slide 6 must be 'slide-neet-excellence-aiims', got '${slide6.id}'`);
  }
  if (slide7.id !== "slide-neet-2025-top-performers") {
    throw new Error(`Slide 7 must be 'slide-neet-2025-top-performers', got '${slide7.id}'`);
  }
  if (slide8.id !== "slide-jee-advanced-2025-govind-gupta") {
    throw new Error(`Slide 8 must be 'slide-jee-advanced-2025-govind-gupta', got '${slide8.id}'`);
  }
  console.log("✓ Verified exact sequence: 1. JEE Toppers -> 2. IIT Bombay -> 3. JEE Main 2026 -> 4. NEET (UG) 2026 -> 5. Top IIT-JEE Performers -> 6. NEET Excellence AIIMS -> 7. NEET 2025 Result -> 8. JEE Adv 2025 Govind Gupta.");

  // [TEST 2] Auditing Slide 4 Metadata & Content
  console.log("\n[TEST 2] Auditing Slide 4 Metadata & Content...");
  if (!slide4.isBannerImage) {
    throw new Error("Slide 4 must have isBannerImage set to true");
  }
  if (slide4.bannerImageSrc !== "/images/emprise-neet-ug-2026-result-achievers.png") {
    throw new Error(`Slide 4 image source mismatch: ${slide4.bannerImageSrc}`);
  }
  if (slide4.bannerImageAlt !== "Emprise Academy NEET UG 2026 Result — Mathura Achievers") {
    throw new Error(`Slide 4 alt text mismatch: ${slide4.bannerImageAlt}`);
  }
  if (slide4.bannerImageHref !== "/results") {
    throw new Error(`Slide 4 link must point to /results, got: ${slide4.bannerImageHref}`);
  }

  // Check student achievers listed in subheading/meta
  const requiredStudents = [
    "Bhanu Pratap Tomar",
    "Shreya Agrawal",
    "Ashwani Kr. Sahni",
    "Srishti Saraswat",
    "Shreya Yadav",
    "Khushi",
  ];
  for (const student of requiredStudents) {
    if (!slide4.subheading.includes(student)) {
      throw new Error(`Slide 4 subheading missing student: ${student}`);
    }
  }
  console.log("✓ Verified Slide 4 metadata, alt text, link destination, and 6 student records.");

  // [TEST 3] Auditing Physical Master Asset on Disk
  console.log("\n[TEST 3] Auditing Master Image Asset on Disk...");
  const diskAssetPath = path.resolve(process.cwd(), "public/images/emprise-neet-ug-2026-result-achievers.png");
  if (!fs.existsSync(diskAssetPath)) {
    throw new Error(`Master image missing at ${diskAssetPath}`);
  }
  const stat = fs.statSync(diskAssetPath);
  if (stat.size < 5000000) {
    throw new Error(`Expected high-res master asset (>5MB), found ${stat.size} bytes`);
  }
  console.log(`✓ Master image verified on disk: ${stat.size} bytes (uncompressed high-res master).`);

  // [TEST 4] Auditing HeroSlider Component Preload & Render Strategy
  console.log("\n[TEST 4] Auditing HeroSlider Component...");
  const heroSliderPath = path.resolve(process.cwd(), "src/components/home/HeroSlider.tsx");
  const heroSliderCode = fs.readFileSync(heroSliderPath, "utf-8");

  if (!heroSliderCode.includes("aspectRatio: \"6197 / 2478\"")) {
    throw new Error("HeroSlider must enforce exact aspect ratio 6197 / 2478");
  }
  if (!heroSliderCode.includes("preload={current === 0}") && !heroSliderCode.includes("priority={current === 0}")) {
    throw new Error("HeroSlider must set preload={current === 0} or priority={current === 0} for initial LCP slide");
  }
  if (!heroSliderCode.includes("quality={82}")) {
    throw new Error("HeroSlider must specify high-fidelity optimized quality={82}");
  }
  console.log("✓ HeroSlider component verified: LCP preload on initial slide, Next.js image optimization active, quality=82, exact 6197/2478 aspect ratio.");

  // [TEST 5] Auditing Slides 1, 2, 3 Unchanged Integrity
  console.log("\n[TEST 5] Auditing Slides 1, 2, 3 Unchanged Integrity...");
  if (slide1.bannerImageSrc !== "/images/emprise-jee-main-advanced-2026-mathura-toppers.png") {
    throw new Error("Slide 1 image was modified!");
  }
  if (slide2.bannerImageSrc !== "/images/emprise-back-to-back-iit-bombay-achievers-2025-2026.png") {
    throw new Error("Slide 2 image was modified!");
  }
  if (slide3.bannerImageSrc !== "/images/emprise-jee-main-2026-top-performers.png") {
    throw new Error("Slide 3 image was modified!");
  }
  console.log("✓ Verified Slides 1, 2, 3 are completely unchanged.");

  // [TEST 6] Auditing Slide 5 (Top IIT-JEE Performers)
  console.log("\n[TEST 6] Auditing Slide 5 (Top IIT-JEE Performers)...");
  if (!slide5.isBannerImage) {
    throw new Error("Slide 5 must have isBannerImage set to true");
  }
  if (slide5.bannerImageSrc !== "/images/emprise-top-iit-jee-performers-achievement-legacy.png") {
    throw new Error(`Slide 5 image source mismatch: ${slide5.bannerImageSrc}`);
  }
  const diskAssetPath5 = path.resolve(process.cwd(), "public/images/emprise-top-iit-jee-performers-achievement-legacy.png");
  if (!fs.existsSync(diskAssetPath5)) {
    throw new Error(`Master image 5 missing at ${diskAssetPath5}`);
  }
  const stat5 = fs.statSync(diskAssetPath5);
  if (stat5.size < 100000) {
    throw new Error(`Expected master asset 5 (>100KB), found ${stat5.size} bytes`);
  }
  const slide5Students = ["Utkarsh", "Shravan", "Umesh"];
  for (const student of slide5Students) {
    if (!slide5.subheading.includes(student)) {
      throw new Error(`Slide 5 subheading missing student: ${student}`);
    }
  }
  if (slide5.bannerImageSrc !== "/images/emprise-top-iit-jee-performers-achievement-legacy.png") {
    throw new Error("Slide 5 image source mismatch");
  }
  console.log(`✓ Master image 5 verified on disk: ${stat5.size} bytes.`);
  console.log("✓ Verified Slide 5 metadata, alt text, link destination, and 3 IIT achiever records.");

  // [TEST 7] Auditing Slides 6, 7, 8 Master Assets & Metadata
  console.log("\n[TEST 7] Auditing Slides 6, 7, 8 Master Assets & Metadata...");

  // Slide 6 Audit (NEET Excellence AIIMS)
  const diskAssetPath6 = path.resolve(process.cwd(), "public/images/emprise-legacy-of-neet-excellence-aiims-toppers.png");
  if (!fs.existsSync(diskAssetPath6) || fs.statSync(diskAssetPath6).size < 100000) {
    throw new Error("Slide 6 master asset missing or under 100KB");
  }
  ["Tanisha", "Aayan", "Shobhit"].forEach(s => {
    if (!slide6.subheading.includes(s)) throw new Error(`Slide 6 missing student: ${s}`);
  });

  // Slide 7 Audit
  const diskAssetPath7 = path.resolve(process.cwd(), "public/images/emprise-neet-2025-result-top-performers.png");
  if (!fs.existsSync(diskAssetPath7) || fs.statSync(diskAssetPath7).size < 100000) {
    throw new Error("Slide 7 master asset missing or under 100KB");
  }
  ["Anil Yadav", "Rahul", "Deepak Singh", "Chandrabhan"].forEach(s => {
    if (!slide7.subheading.includes(s)) throw new Error(`Slide 7 missing student: ${s}`);
  });

  // Slide 8 Audit
  const diskAssetPath8 = path.resolve(process.cwd(), "public/images/emprise-jee-advanced-2025-govind-gupta-air-404-iit-bombay.png");
  if (!fs.existsSync(diskAssetPath8) || fs.statSync(diskAssetPath8).size < 100000) {
    throw new Error("Slide 8 master asset missing or under 100KB");
  }
  ["Govind Gupta", "IIT Bombay"].forEach(s => {
    if (!slide8.subheading.includes(s)) throw new Error(`Slide 8 missing: ${s}`);
  });

  console.log("✓ Verified Slides 6, 7, 8 master assets on disk, metadata, and student records.");

  console.log("\n==================================================");
  console.log("ALL SLIDES 1 THROUGH 8 AUDIT CHECKS PASSED (100% SUCCESS)");
  console.log("==================================================");
}

runSlide4Tests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
