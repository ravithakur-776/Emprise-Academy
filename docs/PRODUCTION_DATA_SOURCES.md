# Production Data Sources & Single Source of Truth

This document defines the single source of truth for all production entities across the Emprise Academy digital platform.

---

## 1. Data Architecture Matrix

| Entity | Primary Storage Source | Server Service Layer | Production Routes | Fallback Policy (Zero/Empty State) |
| :--- | :--- | :--- | :--- | :--- |
| **Admin Metrics** | `leads`, `admissions`, `etse_registrations`, `lead_followups` | `DashboardService` (`/api/admin/dashboard`) | `/admin` | Displays `0` KPI metrics, clean empty tables |
| **Leads & Enquiries** | Supabase PostgreSQL `leads` | `LeadService` (`/api/leads`, `/api/leads/[id]`) | `/admin/leads`, `/admin/leads/[id]` | "No leads found" state with search adjustment guidance |
| **Follow-up Calls** | Supabase `lead_followups` | `LeadService` / `/api/leads` | `/admin/follow-ups` | "No follow-ups scheduled in this queue" |
| **Admissions Roster** | Supabase `admissions`, `student_profiles` | Supabase Admin Client | `/admin/admissions`, `/admin/admissions/[id]` | "No admissions found" clean empty state |
| **Student Profiles** | Supabase `student_profiles` | Supabase Server Client | `/admin/students`, `/student/profile` | Clean empty student directory state |
| **Academic Batches** | Supabase `batches`, `courses` | Supabase Admin Client | `/admin/batches` | "No batches configured" clean state |
| **ETSE 2026 Engine** | Supabase `etse_exams`, `etse_registrations` | `EtseService` (`/api/etse/register`) | `/admin/etse`, `/etse-2026`, `/student/admit-cards` | Clean registration state, zero mock candidates |
| **Admit Cards & Passes** | Supabase `admit_cards` | `AdmitCardService` (`/api/verify-admit-card/[token]`) | `/verify-admit-card/[id]`, `/admin/admit-cards` | Immutable SHA-256 token verification; 404 on invalid token |
| **Examination Results** | Supabase `results`, `result_subjects` | `ResultImportService`, `ResultSearchService` | `/admin/results`, `/results`, `/api/results/search` | "No published results match criteria"; zero fake scorecards |
| **Directors & Leadership**| Supabase `directors` / `@/data/directors` | Verified Founding Leadership Source | `/directors`, `/directors/*`, Homepage | Verified Sushil Dagur & Rakesh Kumar profiles only |
| **Faculty Mentors** | Supabase `faculty` / `@/data/faculty` | Verified Academic Faculty Source | `/faculty`, `/faculty/*`, Homepage | Verified founding faculty & subject pedagogy only |
| **Scholarships** | Supabase `scholarships` / `@/data/scholarship` | Verified Scholarship Config | `/scholarship`, Homepage | Strict transparent criteria; no fabricated percentages |
| **CMS Blog Posts** | Supabase `blog_posts` | `CmsService` | `/blog`, `/admin/cms/blog` | "No articles published yet" clean empty state |
| **CMS Gallery Items** | Supabase `gallery_items` | `CmsService` | `/admin/cms/gallery` | Clean gallery grid; no random placeholder images |
| **Announcements** | Supabase `announcements` | `CmsService` | Navbar banner, `/admin/cms/announcements` | Authoritative ETSE 2026 banner; auto-hides when expired |
| **Business NAP Info** | `@/data/brand` & `@/data/admissions` | Singular Canonical Brand Constant | Footer, Contact page, Schema.org JSON-LD | Mathura campus address, +91 98765 43210, empriseacademy.com |

---

## 2. ETSE 2026 Authoritative Campaign Specifications

- **Campaign Name**: ETSE 2026 (Emprise Talent Search Examination)
- **Exam Date**: **29 November 2026** (10:00 AM – 01:00 PM, Reporting 09:15 AM)
- **Eligible Classes**: **Classes 7, 8, 9, 10**
- **Registration Fee**: **FREE**
- **Exam Mode**: Offline (Pen & Paper at Emprise Academy Campus, Mathura)
- **Roll Number Sequence**: `[YEAR (26)][CLASS CODE (07/08/09/10)][SEQUENCE (00100)]`
- **Application Number Format**: `ETSE2026-000100`

---

## 3. Strict Data Policies

1. **Zero Demo Data in Production**: All production components load from real database records or render professional empty states.
2. **Zero Fake Student Results**: No fabricated ranks, names, or percentages exist in production. The single success story on record is verified alumnus Atul Dagur (`atul-dagur-jee-advanced-2026`).
3. **Isolated Design System**: The `/design-system` development showcase is strictly isolated from production student and admin routes.
4. **Failure State Resilience**: When network or database operations encounter errors, the UI falls back to explicit, safe error/empty states rather than synthetic mock objects.
