# Verified Data Registry & Single-Source Configuration

> **Phase 5.2B — Official Institute Data Population & Canonical Business Configuration**
> Authoritative register of all institutional data, classification statuses, single sources of truth, and public rendering policies for the Emprise Academy digital platform.

---

## 1. Architectural Principles

1. **One Verified Source**: All institutional business identity data flows strictly through `CANONICAL_BUSINESS_CONFIG` (`src/config/business.ts`) and CMS tables.
2. **Safe Null State**: When a field is unprovided (e.g. `tagline`, `linkedin`), its value is stored as `null` and safely hidden in the UI.
3. **Zero Placeholder Fallbacks**: No synthetic addresses, mock emails, or placeholder numbers appear in public production UI.
4. **No Demo Leakage**: Demo datasets are isolated to `src/app/design-system` and automated test fixtures.

---

## 2. Institutional Brand & Business Registry

| Field Name | Status | Authoritative Source | Can Render Publicly? | Canonical Value / Active Behavior |
| :--- | :--- | :--- | :---: | :--- |
| `academy_name` | **VERIFIED_OFFICIAL** | Project Owner / `CANONICAL_BUSINESS_CONFIG` | **YES** | `"Emprise Academy"` |
| `established_year` | **VERIFIED_OFFICIAL** | Project Owner / `CANONICAL_BUSINESS_CONFIG` | **YES** | `2011` |
| `years_of_excellence` | **VERIFIED_OFFICIAL** | Brand Brief (`years_of_excellence_enabled: true`) | **YES** | `"15+ Years of Academic Excellence"` |
| `primary_positioning` | **VERIFIED_OFFICIAL** | Project Brief | **YES** | `"IIT-JEE & NEET Coaching in Mathura"` |
| `secondary_pillar` | **VERIFIED_OFFICIAL** | Project Brief | **YES** | `"Foundation Classes 8–10"` |
| `website_url` | **VERIFIED_OFFICIAL** | Production URL | **YES** | `"https://www.empriseacademy.com/"` |
| `tagline` | **NOT PROVIDED** | `CANONICAL_BUSINESS_CONFIG.tagline` | **NO** | `null` (Safely hidden in UI) |
| `street_address` | **VERIFIED_OFFICIAL** | Official Address | **YES** | `"Near Tera Tower, Bhuteshwar Road"` |
| `city` | **VERIFIED_OFFICIAL** | Official Address | **YES** | `"Mathura"` |
| `state` | **VERIFIED_OFFICIAL** | Official Address | **YES** | `"Uttar Pradesh"` |
| `postal_code` | **VERIFIED_OFFICIAL** | Official Address | **YES** | `"281004"` |
| `display_location` | **VERIFIED_OFFICIAL** | `CANONICAL_BUSINESS_CONFIG.address.display_location` | **YES** | `"Near Tera Tower, Bhuteshwar Road, Mathura, Uttar Pradesh - 281004"` |
| `phone_primary` | **VERIFIED_OFFICIAL** | Official Helpline | **YES** | `"+91 7247889955"` (`tel:+917247889955`) |
| `phone_secondary` | **VERIFIED_OFFICIAL** | Official Secondary Helpline | **YES** | `"+91 9634448800"` (`tel:+919634448800`) |
| `whatsapp` | **VERIFIED_OFFICIAL** | Official WhatsApp Desk | **YES** | `"+91 9808912829"` (`https://wa.me/919808912829...`) |
| `email` | **VERIFIED_OFFICIAL** | Official Email Desk | **YES** | `"info@empriseacademy.com"` (`mailto:info@empriseacademy.com`) |
| `google_maps_url` | **VERIFIED_OFFICIAL** | Official Maps Location | **YES** | `"https://maps.app.goo.gl/P3E6GLnWqrdZfNcn7"` |
| `business_hours` | **VERIFIED_OFFICIAL** | Official Working Hours | **YES** | `"10 AM – 7 PM"` |
| `social.instagram` | **VERIFIED_OFFICIAL** | Official Instagram Profile | **YES** | `"https://www.instagram.com/empriseacademy/"` |
| `social.facebook` | **VERIFIED_OFFICIAL** | Official Facebook Page | **YES** | `"https://www.facebook.com/EmpriseAcademy"` |
| `social.youtube` | **VERIFIED_OFFICIAL** | Official YouTube Channel | **YES** | `"https://youtube.com/@emprisemathura?si=mQONprDb6PzOAGuB"` |
| `social.linkedin` | **NOT PROVIDED** | `CANONICAL_BUSINESS_CONFIG.social.linkedin` | **NO** | `null` (LinkedIn icon/link not rendered) |

---

## 3. Active ETSE 2026 Campaign Registry

| Field Name | Status | Authoritative Source | Can Render Publicly? | Notes |
| :--- | :--- | :--- | :---: | :--- |
| `etse.name` | **VERIFIED_OFFICIAL** | `CANONICAL_BUSINESS_CONFIG.etse.name` | **YES** | `"Emprise Talent Search Examination"` |
| `etse.short_name` | **VERIFIED_OFFICIAL** | `CANONICAL_BUSINESS_CONFIG.etse.short_name` | **YES** | `"ETSE 2026"` |
| `etse.exam_date` | **VERIFIED_OFFICIAL** | `CANONICAL_BUSINESS_CONFIG.etse.exam_date` | **YES** | `"29 November 2026"` |
| `etse.eligible_classes`| **VERIFIED_OFFICIAL** | `CANONICAL_BUSINESS_CONFIG.etse.eligible_classes`| **YES** | `["Class 7", "Class 8", "Class 9", "Class 10"]` |
| `etse.fee` | **VERIFIED_OFFICIAL** | `CANONICAL_BUSINESS_CONFIG.etse.fee` | **YES** | `"FREE"` |
| `etse.mode` | **VERIFIED_OFFICIAL** | `CANONICAL_BUSINESS_CONFIG.etse.mode` | **YES** | `"Offline (Pen & Paper)"` |
| `etse.venue` | **VERIFIED_OFFICIAL** | `src/data/etse.ts` | **YES** | `"Emprise Academy Campus, Mathura & Designated City Partner Centres"` |

---

## 4. Academic Leadership & Results Registry

| Field Name | Status | Authoritative Source | Can Render Publicly? | Notes |
| :--- | :--- | :--- | :---: | :--- |
| `director_1` | **VERIFIED_OFFICIAL** | `src/data/directors.ts` | **YES** | `Sushil Dagur` (Director & HOD Mathematics, Univ. of Derby UK) |
| `director_2` | **VERIFIED_OFFICIAL** | `src/data/directors.ts` | **YES** | `Rakesh Kumar` (Director & Academic Head, Univ. of Derby UK) |
| `alumnus_atul_dagur` | **VERIFIED_OFFICIAL** | `src/data/results.ts` | **YES** | Verified alumnus scorecard (`atul-dagur-jee-advanced-2026`) |
| `dynamic_results` | **CMS_CONFIGURED** | Supabase `results` table | **YES (when published)** | Filtered by publication status |
| `dynamic_faculty` | **CMS_CONFIGURED** | Supabase `faculty` table | **YES (when published)** | Managed through Admin CMS |

---

## 5. Development & Test Fixture Isolation

| Entity / Fixture | Status | Location | Public Access Policy |
| :--- | :--- | :--- | :--- |
| `/design-system` | **DEVELOPMENT_ONLY** | `src/app/design-system` | Isolated sandbox route |
| Mock Candidate Names (`Aarav Sharma`, `Ishita Agarwal`) | **TEST_ONLY** | `src/services/result-import.service.ts` / Admin preview | Only inside sample CSV template and admin preview modals |
| Legacy Dates (`21 Sep 2025`, `23 Aug 2026`, `18 Oct 2026`, `25 Oct 2026`) | **ARCHIVED** | Purged from all production and active campaign files | Zero occurrences in `src/` |
