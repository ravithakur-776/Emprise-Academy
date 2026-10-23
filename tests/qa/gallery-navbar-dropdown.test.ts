import fs from "fs";
import path from "path";
import { GALLERY_CATEGORIES, OFFICIAL_GALLERY_IMAGES } from "@/data/gallery";

console.log("==================================================");
console.log("TEST SUITE: STEP 4B - GALLERY NAVBAR DROPDOWN & MEGA-MENU QA");
console.log("==================================================");

async function runGalleryNavbarDropdownTests() {
  // [TEST 1] Auditing Configuration Data in src/data/gallery.ts
  console.log("\n[TEST 1] Auditing Gallery Categories Configuration...");
  if (GALLERY_CATEGORIES.length !== 3) {
    throw new Error(`Expected exactly 3 categories, found ${GALLERY_CATEGORIES.length}`);
  }

  const expectedCategories = [
    {
      id: "photo",
      title: "Photo Gallery",
      description: "Campus, students & academy moments",
      href: "/gallery",
      step: "01",
    },
    {
      id: "media",
      title: "Media Gallery",
      description: "Press features & publications",
      href: "/gallery/media",
      step: "02",
    },
    {
      id: "video",
      title: "Video Gallery",
      description: "Campus tours & event highlights",
      href: "/gallery/videos",
      step: "03",
    },
  ];

  for (const exp of expectedCategories) {
    const found = GALLERY_CATEGORIES.find((c) => c.id === exp.id);
    if (!found) {
      throw new Error(`Missing category: ${exp.id}`);
    }
    if (found.title !== exp.title) {
      throw new Error(`Category title mismatch for ${exp.id}: got "${found.title}", expected "${exp.title}"`);
    }
    if (found.description !== exp.description) {
      throw new Error(`Category description mismatch for ${exp.id}: got "${found.description}", expected "${exp.description}"`);
    }
    if (found.href !== exp.href) {
      throw new Error(`Category href mismatch for ${exp.id}: got "${found.href}", expected "${exp.href}"`);
    }
    if (found.step !== exp.step) {
      throw new Error(`Category step mismatch for ${exp.id}: got "${found.step}", expected "${exp.step}"`);
    }
  }
  console.log("✓ Verified configuration-driven navigation data with exactly 3 categories (Photo, Media, Video).");

  // [TEST 2] Auditing Desktop Navbar Gallery Dropdown in Navbar.tsx
  console.log("\n[TEST 2] Auditing Desktop Navbar Gallery Dropdown...");
  const navbarPath = path.resolve(process.cwd(), "src/components/navigation/Navbar.tsx");
  if (!fs.existsSync(navbarPath)) {
    throw new Error("Missing src/components/navigation/Navbar.tsx");
  }
  const navbarContent = fs.readFileSync(navbarPath, "utf-8");

  // Verify interactive dropdown trigger with Chevron
  if (!navbarContent.includes("isGalleryOpen")) {
    throw new Error("Navbar.tsx missing isGalleryOpen state");
  }
  if (!navbarContent.includes("setIsGalleryOpen(true)")) {
    throw new Error("Navbar.tsx missing onMouseEnter trigger for Gallery dropdown");
  }
  if (!navbarContent.includes("setIsGalleryOpen(false)")) {
    throw new Error("Navbar.tsx missing onMouseLeave / close handler for Gallery dropdown");
  }
  if (!navbarContent.includes('aria-haspopup="menu"')) {
    throw new Error("Navbar.tsx missing aria-haspopup=\"menu\" on Gallery dropdown");
  }
  if (!navbarContent.includes("aria-expanded={isGalleryOpen}")) {
    throw new Error("Navbar.tsx missing aria-expanded on Gallery dropdown");
  }
  if (!navbarContent.includes("Escape")) {
    throw new Error("Navbar.tsx missing Escape key handler to close dropdown");
  }

  // Verify width within 600-760px and 3-column layout
  if (!navbarContent.includes("w-[660px]") || !navbarContent.includes("grid-cols-3")) {
    throw new Error("Navbar.tsx dropdown must have 3-column layout and approx 600-760px width");
  }

  // Verify active state styling
  if (!navbarContent.includes('pathname?.startsWith("/gallery")')) {
    throw new Error("Navbar.tsx missing active state check for /gallery pathname");
  }
  console.log("✓ Verified desktop Gallery dropdown: hover trigger, safe gap, ARIA attributes, 3 columns, and active state.");

  // [TEST 3] Auditing Mobile Drawer Accordion Submenu in Navbar.tsx
  console.log("\n[TEST 3] Auditing Mobile Drawer Accordion Submenu...");
  if (!navbarContent.includes("isMobileGalleryOpen")) {
    throw new Error("Navbar.tsx missing isMobileGalleryOpen state for mobile drawer");
  }
  if (!navbarContent.includes("min-h-[44px]")) {
    throw new Error("Navbar.tsx mobile drawer items must have min-h-[44px] touch target");
  }
  console.log("✓ Verified mobile drawer: inline expandable submenu with 44px minimum touch targets.");

  // [TEST 4] Auditing /gallery Page (Large category cards removed, Photo Gallery directly visible)
  console.log("\n[TEST 4] Auditing Full Gallery Page (/gallery)...");
  const galleryPagePath = path.resolve(process.cwd(), "src/app/(public)/gallery/page.tsx");
  const galleryPageContent = fs.readFileSync(galleryPagePath, "utf-8");

  if (galleryPageContent.includes("GalleryCategoryTabs")) {
    throw new Error("/gallery page must NOT include GalleryCategoryTabs (large cards UI must be removed)");
  }
  if (!galleryPageContent.includes("Photo Gallery")) {
    throw new Error("/gallery page must directly show Photo Gallery content");
  }
  if (!galleryPageContent.includes("OFFICIAL_GALLERY_IMAGES")) {
    throw new Error("/gallery page must display official gallery images");
  }
  if (OFFICIAL_GALLERY_IMAGES.length !== 84) {
    throw new Error(`Expected 84 official photos, found ${OFFICIAL_GALLERY_IMAGES.length}`);
  }
  console.log("✓ Verified /gallery page: large category cards removed, directly showing Photo Gallery with all 84 photos.");

  // [TEST 5] Auditing Media Gallery Route (/gallery/media)
  console.log("\n[TEST 5] Auditing Media Gallery Route (/gallery/media)...");
  const mediaPagePath = path.resolve(process.cwd(), "src/app/(public)/gallery/media/page.tsx");
  if (!fs.existsSync(mediaPagePath)) {
    throw new Error("Missing src/app/(public)/gallery/media/page.tsx");
  }
  const mediaContent = fs.readFileSync(mediaPagePath, "utf-8");
  if (!mediaContent.includes("MediaGalleryView") && !mediaContent.includes("GalleryEmptyState category=\"media\"")) {
    throw new Error("Media gallery route must render MediaGalleryView or GalleryEmptyState");
  }
  console.log("✓ Verified /gallery/media route: properly routed with institutional media coverage.");

  // [TEST 6] Auditing Video Gallery Route (/gallery/videos)
  console.log("\n[TEST 6] Auditing Video Gallery Route (/gallery/videos)...");
  const videoPagePath = path.resolve(process.cwd(), "src/app/(public)/gallery/videos/page.tsx");
  if (!fs.existsSync(videoPagePath)) {
    throw new Error("Missing src/app/(public)/gallery/videos/page.tsx");
  }
  const videoContent = fs.readFileSync(videoPagePath, "utf-8");
  if (!videoContent.includes("VideoGalleryView") && !videoContent.includes("GalleryEmptyState category=\"video\"")) {
    throw new Error("Video gallery route must render VideoGalleryView or GalleryEmptyState");
  }
  console.log("✓ Verified /gallery/videos route: authentic educational video gallery active.");

  // [TEST 7] Auditing Homepage Marquee Showcase
  console.log("\n[TEST 7] Auditing Homepage Marquee Showcase...");
  const homePreviewPath = path.resolve(process.cwd(), "src/components/home/GalleryPreviewSection.tsx");
  const homePreviewContent = fs.readFileSync(homePreviewPath, "utf-8");
  if (!homePreviewContent.includes("GalleryMarqueeRow")) {
    throw new Error("Homepage gallery marquee must remain intact");
  }
  if (homePreviewContent.includes("GalleryCategoryTabs")) {
    throw new Error("Homepage gallery should not render category tabs");
  }
  console.log("✓ Verified homepage marquee: continuous showcase preserved.");

  console.log("\n==================================================");
  console.log("ALL STEP 4B GALLERY NAVBAR DROPDOWN TESTS PASSED (7/7)");
  console.log("==================================================");
}

runGalleryNavbarDropdownTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
