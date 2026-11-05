-- Migration: Update ETSE 2026 Exam Date to Canonical 2026-11-29 (29 November 2026)
-- Target Campaign: ETSE 2026 (Active)
-- Timezone: Asia/Kolkata (Indian Standard Time)
-- Canonical single source of truth: 29 November 2026 (Sunday)

BEGIN;

DO $$
DECLARE
    v_exam_id UUID;
    v_updated_exams INT;
    v_updated_admit_cards INT;
BEGIN
    -- 1. Update ONLY the single active ETSE 2026 exam record in public.etse_exams
    UPDATE public.etse_exams
    SET exam_date = DATE '2026-11-29',
        updated_at = NOW()
    WHERE exam_code IN ('ETSE2026', 'ETSE-2026')
      AND is_active = TRUE
    RETURNING id INTO v_exam_id;

    GET DIAGNOSTICS v_updated_exams = ROW_COUNT;

    -- Strict validation: Must update exactly one active ETSE-2026 campaign record
    IF v_updated_exams <> 1 OR v_exam_id IS NULL THEN
        RAISE EXCEPTION 'ETSE exam date migration aborted: expected exactly 1 active campaign row in public.etse_exams with exam_code IN (''ETSE2026'', ''ETSE-2026'') and is_active = TRUE, but found %', v_updated_exams;
    END IF;

    -- 2. Update admit cards associated STRICTLY with the exact resolved active ETSE 2026 exam ID
    -- Dynamically verify whether updated_at exists on public.admit_cards before using it
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' 
          AND table_name = 'admit_cards' 
          AND column_name = 'updated_at'
    ) THEN
        UPDATE public.admit_cards
        SET exam_date = DATE '2026-11-29',
            updated_at = NOW()
        WHERE exam_id = v_exam_id;
    ELSE
        UPDATE public.admit_cards
        SET exam_date = DATE '2026-11-29'
        WHERE exam_id = v_exam_id;
    END IF;

    GET DIAGNOSTICS v_updated_admit_cards = ROW_COUNT;
END $$;

COMMIT;
