/**
 * CANONICAL ETSE CONFIGURATION — Emprise Academy
 * Single Source of Truth for all ETSE 2026 Exam Dates and Scheduling.
 *
 * Official verified date: 29 November 2026 (Sunday)
 */

export interface EtseConfig {
  readonly examDate: string; // ISO date format YYYY-MM-DD
  readonly examDateDisplay: string; // Factual user-facing format: "29 November 2026"
  readonly examDay: string; // Day of week: "Sunday"
  readonly examDateIso: string; // ISO 8601 with Asia/Kolkata timezone (+05:30)
  readonly examTimeDisplay: string;
  readonly reportingTimeDisplay: string;
  readonly fullDisplay: string; // "Sunday, 29 November 2026"
  readonly fullDisplayWithTime: string; // "Sunday, 29 November 2026 (10:00 AM – 12:00 PM)"
  readonly shortDateDisplay: string; // "29 Nov 2026"
  readonly registrationStartDate: string; // "2026-06-01"
  readonly registrationEndDate: string; // "2026-11-28"
  readonly registrationEndDateDisplay: string; // "28 November 2026"
  readonly registrationEndDay: string; // "Saturday"
  readonly registrationDeadlineShort: string; // "28 Nov 2026"
  readonly academicYear: string;
  readonly registrationFee: string;
  readonly mode: string;
}

export const ETSE_CONFIG: EtseConfig = {
  examDate: "2026-11-29",
  examDateDisplay: "29 November 2026",
  examDay: "Sunday",
  examDateIso: "2026-11-29T10:00:00+05:30",
  examTimeDisplay: "10:00 AM – 12:00 PM (2 Hours)",
  reportingTimeDisplay: "09:15 AM",
  fullDisplay: "Sunday, 29 November 2026",
  fullDisplayWithTime: "Sunday, 29 November 2026 (10:00 AM – 12:00 PM)",
  shortDateDisplay: "29 Nov 2026",
  registrationStartDate: "2026-06-01",
  registrationEndDate: "2026-11-28",
  registrationEndDateDisplay: "28 November 2026",
  registrationEndDay: "Saturday",
  registrationDeadlineShort: "28 Nov 2026",
  academicYear: "2026-27",
  registrationFee: "FREE (Zero Application Fee)",
  mode: "Offline (Pen & Paper OMR Format)",
};

/**
 * Returns the current calendar date in India (Asia/Kolkata timezone) in "YYYY-MM-DD" format.
 * Deterministic and independent of server host timezone.
 */
export function getIndiaCalendarDate(date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

/**
 * Evaluates whether ETSE registration is currently open in Indian Standard Time (Asia/Kolkata).
 * Registration is open through 28 November 2026 23:59:59 IST (inclusive),
 * and strictly closes at 00:00:00 IST on 29 November 2026.
 */
export function isRegistrationOpenInIST(
  startDateStr: string = ETSE_CONFIG.registrationStartDate,
  endDateStr: string = ETSE_CONFIG.registrationEndDate,
  currentDate: Date = new Date()
): boolean {
  const todayInIndia = getIndiaCalendarDate(currentDate);
  const startIso = normalizeDateToIso(startDateStr);
  const endIso = normalizeDateToIso(endDateStr);
  return todayInIndia >= startIso && todayInIndia <= endIso;
}

/**
 * Normalizes common human or ISO date representations to standard YYYY-MM-DD.
 */
export function normalizeDateToIso(dateStr: string): string {
  if (!dateStr) return "";
  const trimmed = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

  const months: Record<string, string> = {
    january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
    july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
    jan: "01", feb: "02", mar: "03", apr: "04", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12"
  };

  const parts = trimmed.split(/\s+/);
  if (parts.length === 3) {
    const day = parts[0].padStart(2, "0");
    const month = months[parts[1].toLowerCase()] || "01";
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return trimmed;
}

/**
 * Evaluates whether an announcement is currently active (visible) in Indian Standard Time (Asia/Kolkata).
 * Remains active throughout the entirety of endDateStr until 23:59:59.999 IST,
 * and becomes expired strictly starting at 00:00:00 IST on the following day.
 *
 * Prevents the date-only JavaScript parsing trap where new Date("2026-11-28") or
 * new Date("28 November 2026") parses to 00:00:00 UTC/local, causing premature expiration
 * at the start of the final day.
 */
export function isAnnouncementActiveInIST(
  endDateStr: string = ETSE_CONFIG.registrationEndDate,
  startDateStr?: string,
  currentDate: Date = new Date()
): boolean {
  const todayInIndia = getIndiaCalendarDate(currentDate);
  const endIso = normalizeDateToIso(endDateStr);
  const startIso = startDateStr ? normalizeDateToIso(startDateStr) : undefined;

  if (startIso && todayInIndia < startIso) {
    return false;
  }
  return todayInIndia <= endIso;
}

/**
 * Returns user-facing status information based on Indian Standard Time.
 */
export function getRegistrationStatusInfo(currentDate: Date = new Date()): {
  isOpen: boolean;
  statusText: string;
  badgeLabel: string;
  deadlineDisplay: string;
  helperMessage: string;
} {
  const isOpen = isRegistrationOpenInIST(
    ETSE_CONFIG.registrationStartDate,
    ETSE_CONFIG.registrationEndDate,
    currentDate
  );

  return {
    isOpen,
    statusText: isOpen ? "Registration Open" : "Registration Closed",
    badgeLabel: isOpen ? "REGISTRATION OPEN" : "REGISTRATION CLOSED",
    deadlineDisplay: ETSE_CONFIG.registrationEndDateDisplay,
    helperMessage: isOpen
      ? `Registration closes on ${ETSE_CONFIG.registrationEndDateDisplay} at 11:59 PM IST.`
      : `Registrations for ETSE 2026 closed on ${ETSE_CONFIG.registrationEndDateDisplay}. Registered candidates may download their Admit Card online.`,
  };
}

/**
 * Safe date formatter ensuring Indian Standard Time (Asia/Kolkata)
 * Prevents UTC conversion bugs where midnight UTC could shift 29 Nov to 28 Nov.
 */
export function formatEtseExamDate(
  rawDate?: string | Date | null,
  options?: { includeWeekday?: boolean; includeTime?: boolean }
): string {
  if (!rawDate) {
    return options?.includeWeekday ? ETSE_CONFIG.fullDisplay : ETSE_CONFIG.examDateDisplay;
  }

  try {
    const dateStr = typeof rawDate === "string" ? rawDate : rawDate.toISOString();
    if (dateStr.startsWith("2026-11-29") || dateStr.startsWith("2026-10-25")) {
      if (options?.includeTime) {
        return ETSE_CONFIG.fullDisplayWithTime;
      }
      return options?.includeWeekday ? ETSE_CONFIG.fullDisplay : ETSE_CONFIG.examDateDisplay;
    }

    const d = new Date(rawDate);
    if (isNaN(d.getTime())) {
      return options?.includeWeekday ? ETSE_CONFIG.fullDisplay : ETSE_CONFIG.examDateDisplay;
    }

    const formatted = d.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: options?.includeWeekday ? "long" : undefined,
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatted;
  } catch {
    return options?.includeWeekday ? ETSE_CONFIG.fullDisplay : ETSE_CONFIG.examDateDisplay;
  }
}
