/**
 * Official Verified ETSE 2026 Campaign Configuration for Emprise Academy
 * Single source of truth for Phase 4.8 ETSE Complete Ecosystem
 */

import { ETSE_CONFIG, isRegistrationOpenInIST } from "@/config/etse";

export type EtseCampaignStatus =
  | "DRAFT"
  | "UPCOMING"
  | "REGISTRATION_OPEN"
  | "REGISTRATION_CLOSED"
  | "EXAM_DAY"
  | "COMPLETED"
  | "RESULT_PUBLISHED"
  | "ARCHIVED";

export interface EtseBenefitItem {
  id: string;
  title: string;
  badge?: string;
  description: string;
}

export interface EtseStepItem {
  step: string;
  title: string;
  description: string;
}

export interface EtseFaqItem {
  question: string;
  answer: string;
}

export const MAIN_ETSE_DATA = {
  meta: {
    title: "ETSE 2026 | Emprise Talent Search Examination | Mathura",
    description: `Register FREE for Emprise Talent Search Examination (ETSE 2026) for Classes 7–10 in Mathura. Exam Date: ${ETSE_CONFIG.examDateDisplay}. Registration Last Date: ${ETSE_CONFIG.registrationEndDateDisplay}. Earn merit scholarships, rank benchmarking, and academic recognition.`,
    keywords: [
      "ETSE 2026",
      "Emprise Talent Search Examination 2026",
      "Scholarship Exam in Mathura",
      "Talent Search Exam Mathura",
      "Free Scholarship Test Classes 7 to 10",
      "ETSE 2026 Registration Mathura",
      "Emprise Academy Mathura ETSE",
    ],
    canonical: "https://empriseacademy.com/etse-2026",
  },
  campaign: {
    title: "Emprise Talent Search Examination 2026",
    shortName: "ETSE 2026",
    tagline: "The Search for Mathura's Brightest Minds",
    subheading: "For Students of Classes 7, 8, 9 & 10",
    status: (isRegistrationOpenInIST() ? "REGISTRATION_OPEN" : "REGISTRATION_CLOSED") as EtseCampaignStatus,
    examDateIso: ETSE_CONFIG.examDateIso,
    examDateDisplay: ETSE_CONFIG.examDateDisplay,
    examTimeDisplay: ETSE_CONFIG.examTimeDisplay,
    registrationDeadline: ETSE_CONFIG.registrationEndDateDisplay,
    registrationDeadlineShort: ETSE_CONFIG.registrationDeadlineShort,
    registrationFee: "FREE (Zero Application Fee)",
    mode: "Offline (Pen & Paper OMR Format)",
    location: "Mathura, Uttar Pradesh",
    venue: "Emprise Academy Mathura, Near Tera Tower, Bhuteshwar Road, Mathura",
    admitCardReleaseDate: "To be announced 10 days prior to examination",
    isAdmitCardPublished: false,
    heroParagraph:
      "ETSE 2026 is Mathura's premier talent search and competitive diagnostic examination conducted by Emprise Academy. It gives middle and secondary school students an authentic opportunity to test conceptual clarity, benchmark their academic standing across the district, and unlock merit-based tuition fee concessions.",
  },
  eligibility: {
    heading: "Who Can Participate in ETSE 2026?",
    subheading:
      "Registration is open to all students currently studying in Classes 7th to 10th across CBSE, ICSE, and UP State Board schools.",
    classes: [
      {
        classLevel: "Class 7",
        target: "Preparing for Class 8 Foundation & Olympiads",
        focus: "Fundamentals in General Science, Arithmetic, Geometry & Mental Ability.",
      },
      {
        classLevel: "Class 8",
        target: "Preparing for Class 9 Senior Foundation",
        focus: "Applied Physics, Chemical reactions, Algebraic structures & Reasoning.",
      },
      {
        classLevel: "Class 9",
        target: "Preparing for Class 10 Board & Early Competitive",
        focus: "Advanced mechanics, cellular biology, coordinate geometry & logical deduction.",
      },
      {
        classLevel: "Class 10",
        target: "Transitioning to Senior Secondary (JEE / NEET)",
        focus: "Board science synergy, trigonometry, electrostatics, organic basics & analytical aptitude.",
      },
    ],
  },
  benefits: [
    {
      id: "b-1",
      title: "Showcase Your Academic Talent",
      badge: "Discovery",
      description:
        "Compete on a standardized, high-quality test paper crafted by senior IIT and medical faculty to discover your genuine problem-solving potential.",
    },
    {
      id: "b-2",
      title: "Detailed Strengths & Gaps Analysis",
      badge: "Diagnostic",
      description:
        "Receive a topic-wise diagnostic scorecard identifying strong areas, calculation speed, and conceptual blind spots before senior board and entrance exams.",
    },
    {
      id: "b-3",
      title: "City, School & Class Rank Benchmarking",
      badge: "Benchmarking",
      description:
        "Understand exactly where you stand among peers across Mathura with verified City Rank, School Rank, and Class Rank percentiles.",
    },
    {
      id: "b-4",
      title: "Top 100 Recognition & Awards",
      badge: "Recognition",
      description:
        "Top 100 rank holders receive official Certificates of Academic Distinction, commemorative medals, and special merit awards at our annual felicitation ceremony.",
    },
    {
      id: "b-5",
      title: "Merit-Based Tuition Fee Concessions",
      badge: "Scholarship",
      description:
        "Outstanding performers qualify for merit-based fee concessions on 1-Year and 2-Year Foundation, IIT-JEE, and NEET-UG classroom programmes.",
    },
  ] as EtseBenefitItem[],
  testPattern: {
    heading: "ETSE 2026 Examination Pattern",
    duration: "120 Minutes (2 Hours)",
    totalQuestions: "80 Multiple Choice Questions (MCQs)",
    markingScheme: "+4 for Correct Answer, 0 for Unattempted / Incorrect (No Negative Marking for Junior Foundation)",
    subjects: [
      { name: "Physics & Chemistry", questions: 30, marks: 120 },
      { name: "Mathematics", questions: 30, marks: 120 },
      { name: "Mental Ability & Reasoning", questions: 20, marks: 80 },
    ],
  },
  process: [
    {
      step: "01",
      title: "Free Online Registration",
      description: "Fill out the simple registration form with student and school details. Zero fee required.",
    },
    {
      step: "02",
      title: "Receive Unique Application ID",
      description: "Instant generation of your permanent application number (e.g. ETSE2026-000001).",
    },
    {
      step: "03",
      title: "Admit Card Release Notice",
      description: "Admit card notification sent prior to exam day with designated exam center and roll number.",
    },
    {
      step: "04",
      title: "Download & Print Admit Card",
      description: "Access your digital admit card with candidate photo and official QR verification token.",
    },
    {
      step: "05",
      title: `Appear for Exam on ${ETSE_CONFIG.shortDateDisplay}`,
      description: "Take the offline pen-and-paper OMR test at your allotted Mathura exam centre.",
    },
    {
      step: "06",
      title: "Scorecard & Merit Concession",
      description: "View subject marks, All-Mathura rank, and scholarship entitlement on the results portal.",
    },
  ] as EtseStepItem[],
  faqs: [
    {
      question: "What is ETSE 2026?",
      answer:
        "The Emprise Talent Search Examination (ETSE 2026) is the flagship talent discovery and scholarship test organized annually by Emprise Academy for students in Classes 7th to 10th in Mathura.",
    },
    {
      question: "What is the official exam date for ETSE 2026?",
      answer: `ETSE 2026 will take place on ${ETSE_CONFIG.fullDisplay}. The examination duration is 2 hours (10:00 AM to 12:00 PM).`,
    },
    {
      question: "Who is eligible to participate?",
      answer:
        "Students currently enrolled in Class 7, Class 8, Class 9, or Class 10 from any recognized educational board (CBSE, ICSE, UP Board) are eligible.",
    },
    {
      question: "Is there any registration or application fee?",
      answer:
        "No. Registration for ETSE 2026 is 100% FREE for all eligible candidates. There are no hidden or processing charges.",
    },
    {
      question: "What is the examination mode and syllabus?",
      answer:
        "The test is conducted offline in pen-and-paper OMR format. The syllabus comprises Science, Mathematics, and Mental Ability based on the NCERT curriculum of the student's current and previous class.",
    },
    {
      question: "How will I receive my Application Number and Admit Card?",
      answer:
        "Your unique Application ID (e.g. ETSE2026-000001) is generated immediately upon registration. The official Admit Card will be released before the exam date and will be downloadable online with a secure verification QR code.",
    },
    {
      question: "Where will the examination centres be located?",
      answer:
        "The primary examination center is located at the Emprise Academy campus in Mathura, with additional authorized city partner centers in Mathura district.",
    },
    {
      question: "What are the prizes and recognition for top performers?",
      answer:
        "Top 100 students receive Certificates of Distinction and medals. High rankers earn merit-based tuition fee concessions for our Foundation, JEE, and NEET classroom batches.",
    },
    {
      question: "Can students already studying at other schools or coaching institutes participate?",
      answer:
        "Yes. ETSE is an open diagnostic talent search test, and students from all schools and academic backgrounds are welcome to participate.",
    },
    {
      question: "How can I contact the ETSE helpdesk for queries?",
      answer:
        "You can reach the ETSE desk by submitting an enquiry on this website or visiting our Mathura campus for registration assistance.",
    },
  ] as EtseFaqItem[],
};
