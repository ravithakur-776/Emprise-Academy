# Emprise Academy Digital Platform — Release Log

---

## Release: v1.0.0 (Production Go-Live)
- **Release Date**: 28 August 2026
- **Target Domain**: [https://empriseacademy.com](https://empriseacademy.com)
- **Framework & Hosting**: Next.js 16 (Turbopack) on Vercel / Edge Infrastructure
- **Database & Auth**: Supabase (PostgreSQL 15+, SSR Auth, RLS, Storage)
- **Database Migrations Applied**:
  - `20260826000001_initial_emprise_schema.sql`
  - `20260826000002_hardening_corrections.sql`
  - `production_seed.sql`
- **Active Campaign**: ETSE 2026 (Exam Date: 29 November 2026, Eligibility: Classes 7–10, Fee: FREE)
- **Core Modules Integrated**:
  - Public Academic Website (IIT-JEE, NEET-UG, Foundation)
  - Student Portal & Accounts (`/student`)
  - Admin Operations Hub & CRM (`/admin`, `/admin/leads`, `/admin/admissions`)
  - Automatic Admit Card System (`/admin/admit-cards`, `/verify-admit-card`)
  - Dynamic Excel Result Import & Search (`/admin/results`, `/results`)
  - Complete CMS (`/admin/cms`)
  - Technical & Local SEO (30 Canonical Sitemap Routes, Schema.org JSON-LD, Robots.txt)
  - Legal Trust Infrastructure (`/privacy-policy`, `/terms`)

---

## Rollback & Forward-Fix Strategy
- **Application Rollback**: Instantly revert the deployment commit in Vercel to previous verified release tag if critical runtime errors occur.
- **Database Schema**: Follow additive forward-compatible migrations. Never run destructive table drops on live production database.
- **Storage Safety**: Document snapshots and admit card PDFs are immutable and preserved in private object storage.
