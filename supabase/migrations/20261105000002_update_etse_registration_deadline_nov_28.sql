-- Migration: Update ETSE 2026 Registration Deadline to 28 November 2026 (23:59:59 IST)
-- Target Campaign: ETSE 2026 (Active)
-- Timezone: Asia/Kolkata (Indian Standard Time)

BEGIN;

DO $$
DECLARE
    v_updated_rows INT;
BEGIN
    -- Update active ETSE 2026 campaign in public.etse_exams
    -- Updates registration_end_date exclusively; preserves exam_date (2026-11-29) and all other fields.
    UPDATE public.etse_exams
    SET registration_end_date = DATE '2026-11-28',
        updated_at = NOW()
    WHERE exam_code IN ('ETSE2026', 'ETSE-2026')
      AND is_active = TRUE;

    GET DIAGNOSTICS v_updated_rows = ROW_COUNT;

    -- Strict validation: Must update exactly one active ETSE 2026 campaign row
    IF v_updated_rows <> 1 THEN
        RAISE EXCEPTION 'ETSE deadline migration aborted: expected exactly 1 active campaign row in public.etse_exams with exam_code IN (''ETSE2026'', ''ETSE-2026'') and is_active = TRUE, but found %', v_updated_rows;
    END IF;
END $$;

COMMIT;
