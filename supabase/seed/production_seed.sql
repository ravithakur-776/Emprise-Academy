-- ==============================================================================
-- EMPRISE ACADEMY — PRODUCTION SEED DATA SCRIPT
-- Strictly for initializing production database instances.
-- Contains ZERO fake students, ZERO demo leads, ZERO mock marks.
-- ==============================================================================

-- 1. Institutional Business Information
INSERT INTO public.site_settings (key, value, is_public, description)
VALUES 
  ('academy_name', '"Emprise Academy"', true, 'Official institution name'),
  ('tagline', '"Serious Preparation. Proven Mentorship. Rank-Driven Results."', true, 'Brand motto and core value proposition'),
  ('campus_address', '"Near Highway Crossing, Mathura, Uttar Pradesh - 281001"', true, 'Primary campus address'),
  ('contact_phone', '"+91 98765 43210"', true, 'Official enquiry helpline'),
  ('contact_email', '"admissions@empriseacademy.com"', true, 'Admissions desk email'),
  ('whatsapp_helpline', '"+91 98765 43210"', true, 'WhatsApp enquiry number'),
  ('business_hours', '"Monday to Saturday: 08:30 AM – 08:00 PM"', true, 'Campus visiting hours')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 2. Official Academic Programmes
INSERT INTO public.courses (id, slug, name, target_exam, eligible_classes, duration, description, is_active, display_order)
VALUES
  ('c1111111-1111-4111-8111-111111111111', 'iit-jee-two-year', 'IIT-JEE 2-Year Integrated Classroom Programme', 'IIT_JEE', ARRAY['Class 11'], '2 Years', 'Comprehensive preparation for JEE Main & Advanced alongside Class 11-12 CBSE/UP Board curriculum.', true, 1),
  ('c2222222-2222-4222-8222-222222222222', 'iit-jee-one-year', 'IIT-JEE 1-Year Fast-Track Classroom Programme', 'IIT_JEE', ARRAY['Class 12'], '1 Year', 'Intensive problem-solving, test series, and rank-boosting revision for Class 12 aspirants.', true, 2),
  ('c3333333-3333-4333-8333-333333333333', 'iit-jee-dropper', 'IIT-JEE Dropper / Repeater Rank Accelerator Batch', 'IIT_JEE', ARRAY['Dropper'], '1 Year', 'Dedicated full-time rigorous coaching for Class 12 passed engineering aspirants.', true, 3),
  ('c4444444-4444-4444-8444-444444444444', 'neet-ug-two-year', 'NEET-UG 2-Year Integrated Medical Programme', 'NEET_UG', ARRAY['Class 11'], '2 Years', 'NCERT-aligned Physics, Chemistry, and Biology coaching with weekly mock drills.', true, 4),
  ('c5555555-5555-4555-8555-555555555555', 'neet-ug-one-year', 'NEET-UG 1-Year Power Prep Batch', 'NEET_UG', ARRAY['Class 12'], '1 Year', 'High-yield syllabus mastery, timed testing, and error-rectification for Class 12 medical aspirants.', true, 5),
  ('c6666666-6666-4666-8666-666666666666', 'neet-ug-dropper', 'NEET-UG Dropper / Repeater Medical Batch', 'NEET_UG', ARRAY['Dropper'], '1 Year', 'Full syllabus NCERT mastery with targeted speed and accuracy enhancement.', true, 6),
  ('c7777777-7777-4777-8777-777777777777', 'foundation-junior', 'Foundation Pre-Nurture Programme (Classes 8-10)', 'FOUNDATION', ARRAY['Class 8', 'Class 9', 'Class 10'], '1 Year / Multi-Year', 'Concept building for School Boards, NTSE, IJSO, and Junior Science Olympiads.', true, 7)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 3. Standard Exam Centres
INSERT INTO public.exam_centres (id, centre_code, name, address, city, state, postal_code, capacity, is_active)
VALUES
  ('ec111111-1111-4111-8111-111111111111', 'MTH-01', 'Emprise Academy Main Campus', 'Near Highway Crossing', 'Mathura', 'Uttar Pradesh', '281001', 500, true),
  ('ec222222-2222-4222-8222-222222222222', 'MTH-02', 'Emprise Academy City Annex', 'Civil Lines', 'Mathura', 'Uttar Pradesh', '281001', 300, true)
ON CONFLICT (id) DO NOTHING;

-- 4. Active ETSE 2026 Campaign Record
INSERT INTO public.examinations (id, exam_code, title, exam_type, academic_year, exam_date, registration_start_date, registration_end_date, is_active, max_score, created_at, updated_at)
VALUES
  ('e1111111-1111-4111-8111-111111111111', 'ETSE-2026', 'Emprise Talent Search Examination 2026', 'ETSE', '2026-27', '2026-11-29', '2026-06-01', '2026-11-28', true, 300, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, exam_date = EXCLUDED.exam_date, registration_end_date = EXCLUDED.registration_end_date;
