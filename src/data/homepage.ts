/**
 * Official Verified Homepage Content Configuration for Emprise Academy
 * Single source of truth for Master UI/UX Redesign
 */

import { CANONICAL_BUSINESS_CONFIG } from "@/config/business";
import { ETSE_CONFIG } from "@/config/etse";
import { DIRECTORS_DATA } from "@/data/directors";

export interface HeroSlide {
  id: string;
  tag: string;
  badge: string;
  heading: string;
  subheading: string;
  supportingInfo?: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn?: { label: string; href: string };
  gradient: string;
  accentColor: string;
  isBannerImage?: boolean;
  bannerImageSrc?: string;
  bannerImageAlt?: string;
  bannerImageHref?: string;
}

export interface AcademicStatItem {
  index: string;
  value: string;
  label: string;
  description: string;
  accent: "blue" | "gold" | "success" | "academic";
  iconName: "Trophy" | "Target" | "Award" | "Users" | "CheckCircle2" | "Stethoscope";
}

export interface TrustMetric {
  value: string;
  label: string;
  sublabel: string;
  isVerified?: boolean;
}

export interface CourseCardData {
  id: string;
  title: string;
  badge: string;
  targetClasses: string;
  tagline?: string;
  targetExams: string;
  description?: string;
  keyBenefit: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  iconName: "Compass" | "Atom" | "DraftingCompass" | "Sparkles" | "Stethoscope" | "GraduationCap" | "BookOpen" | "Laptop" | "MonitorPlay";
  accentColor?: "navy" | "orange" | "gold";
}

export interface WhyEmpriseItem {
  id?: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface EmpriseSystemStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  iconName?: string;
  phase?: string;
  benefits?: string[];
}

export interface StudentAchiever {
  name: string;
  exam: string;
  academicYear: string;
  rank?: string;
  achievement: string;
  program: string;
  badge: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Campus" | "Classrooms" | "Events" | "Students" | "Activities";
  caption: string;
  aspect: string;
}

export interface LatestUpdateItem {
  id: string;
  date: string;
  category: "ETSE" | "Admissions" | "Results" | "Notices" | "Events";
  title: string;
  preview: string;
  href: string;
  isImportant?: boolean;
}

export interface FaqAchiever {
  yearExam: string;
  student: string;
  detail: string;
}

export interface HomepageFAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  lead?: string;
  bullets?: string[];
  paragraphs?: string[];
  achievers?: FaqAchiever[];
  subheading?: string;
  closing?: string;
  closingParagraphs?: string[];
  highlight?: string;
}

export const HOMEPAGE_DATA = {
  announcement: {
    badge: "ETSE",
    text: `Free ETSE 2026 Registration — Last Date: 28 November • Exam on ${ETSE_CONFIG.examDateDisplay} • Classes 7th to 10th`,
    ctaText: "Register Now →",
    ctaHref: "/etse-2026#register",
    examDate: ETSE_CONFIG.examDateDisplay,
    registrationDeadline: ETSE_CONFIG.registrationEndDateDisplay,
    eligibleClasses: "Classes 7th to 10th",
    fee: "100% FREE",
  },
  
  heroSlides: [
    {
      id: "slide-jee-toppers",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-jee-main-advanced-2026-mathura-toppers.png",
      bannerImageAlt: "Emprise Academy JEE Main and Advanced 2026 Mathura Toppers",
      bannerImageHref: "/results",
      tag: "JEE MAIN + ADVANCED 2026 • MATHURA TOPPERS",
      badge: "MATHURA'S HIGHEST SUCCESS RATE",
      heading: "Mathura Toppers — JEE (Main + Advanced) 2026",
      subheading: "Celebrating 10 achievers securing admissions in IIT Bombay, IIT Guwahati, IIT Jodhpur, IIT Dhanbad, IIIT Delhi, NITs, and premier institutes.",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Verify Scorecards", href: "/results#verify-scorecard" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-iit-bombay-achievers",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-back-to-back-iit-bombay-achievers-2025-2026.png",
      bannerImageAlt: "Emprise Academy Back-to-Back IIT Bombay Achievers 2025 and 2026",
      bannerImageHref: "/results",
      tag: "JEE ADVANCED 2025 & 2026 • IIT BOMBAY ACHIEVERS",
      badge: "BACK-TO-BACK TOP PERFORMERS",
      heading: "Back-to-Back IIT Bombay Achievers — 2025 & 2026",
      subheading: "Celebrating Govind Gupta (JEE Advanced 2025) and Atul Dagur (JEE Advanced 2026) achieving top ranks and admissions to IIT Bombay.",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Explore JEE Program", href: "/iit-jee-coaching-mathura" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-jee-main-2026-top-performers",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-jee-main-2026-top-performers.png",
      bannerImageAlt: "Emprise Academy JEE Main 2026 Top Performers — Rajeev Nain, Ashis Kumar, Atul Dagur",
      bannerImageHref: "/results",
      tag: "JEE MAIN 2026 • TOP PERFORMERS",
      badge: "99+ PERCENTILE ACHIEVERS",
      heading: "JEE Main 2026 — Top Performers",
      subheading: "Behind every rank is a story of dedication: Rajeev Nain (99.42 %ile), Ashis Kumar (99.23 %ile), and Atul Dagur (99.22 %ile) — Year after year in Mathura.",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Explore JEE Program", href: "/iit-jee-coaching-mathura" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-neet-ug-2026-result",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-neet-ug-2026-result-achievers.png",
      bannerImageAlt: "Emprise Academy NEET UG 2026 Result — Mathura Achievers",
      bannerImageHref: "/results",
      tag: "NEET (UG) 2026 • OFFICIAL RESULTS",
      badge: "MATHURA DISTRICT TOP MEDICAL RANKS",
      heading: "NEET (UG) 2026 — Mathura Result",
      subheading: "Celebrating top medical achievers: Bhanu Pratap Tomar (AIR 1794, OBC), Shreya Agrawal (AIR 8570), Ashwani Kr. Sahni (AIR 16734), Srishti Saraswat (AIR 18162), Shreya Yadav (AIR 16937, OBC), Khushi (AIR 3480, Category Rank) — Your Dream. Our Guidance. Your Success.",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Explore NEET Program", href: "/neet-coaching-mathura" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-top-iit-jee-performers",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-top-iit-jee-performers-achievement-legacy.png",
      bannerImageAlt: "Emprise Academy — Top IIT-JEE Performers Achievement Legacy (Utkarsh IIT Dhanbad, Shravan IIT Kanpur, Umesh IIT Delhi)",
      bannerImageHref: "/results",
      tag: "IIT-JEE ACHIEVEMENT LEGACY • TOP IIT-JEE PERFORMERS",
      badge: "15 YEARS OF ACADEMIC EXCELLENCE",
      heading: "Top IIT-JEE Performers — Consistent Excellence",
      subheading: "Consistent excellence. Brighter futures: Utkarsh (IIT-Dhanbad, 99.07 %ile, 100 Percentile Physics, JEE Main 2024), Shravan (IIT-Kanpur, 99.59 %ile, AIR-92 Cat., JEE Main 2023), and Umesh (IIT-Delhi, 99.86 %ile, AIR-645 Gen., JEE Main 2022).",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Explore JEE Program", href: "/iit-jee-coaching-mathura" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-neet-excellence-aiims",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-legacy-of-neet-excellence-aiims-toppers.png",
      bannerImageAlt: "Emprise Academy — A Legacy of NEET Excellence — Top Performers Year After Year (Tanisha AIIMS Raebareli, Aayan AIIMS Gorakhpur, Shobhit AIIMS Jodhpur)",
      bannerImageHref: "/results",
      tag: "A LEGACY OF NEET EXCELLENCE • TOP PERFORMERS YEAR AFTER YEAR",
      badge: "AIIMS ADMISSIONS ACHIEVERS",
      heading: "A Legacy of NEET Excellence — Top Performers",
      subheading: "Celebrating top medical performers: Tanisha (AIIMS Raebareli, NEET 2024), Aayan (AIIMS Gorakhpur, NEET 2023), and Shobhit (AIIMS Jodhpur, NEET 2022) — Medicos Begin Here! Your Dream. Our Guidance. Brighter Futures.",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Explore NEET Program", href: "/neet-coaching-mathura" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-neet-2025-top-performers",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-neet-2025-result-top-performers.png",
      bannerImageAlt: "Emprise Academy NEET 2025 Result Top Performers — Anil Yadav AIR 4460, Rahul, Rahul Kumar, Deepak Singh, Chandrabhan",
      bannerImageHref: "/results",
      tag: "NEET 2025 RESULT • TOP PERFORMERS",
      badge: "GLORY OF NEET • AIR 4460",
      heading: "NEET 2025 Result — Top Performers",
      subheading: "A perfect key to unlock hidden potential: Anil Yadav (AIR 4460), Rahul (AIR-5209 OBC), Rahul Kumar (AIR-2036 Gen-EWS), Deepak Singh (AIR-8483 OBC), Chandrabhan (AIR-27707) and many more achievers.",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Explore NEET Program", href: "/neet-coaching-mathura" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
    {
      id: "slide-jee-advanced-2025-govind-gupta",
      isBannerImage: true,
      bannerImageSrc: "/images/emprise-jee-advanced-2025-govind-gupta-air-404-iit-bombay.png",
      bannerImageAlt: "Emprise Academy JEE Advanced 2025 — Govind Gupta AIR 404 Selected in IIT-Bombay",
      bannerImageHref: "/results",
      tag: "JEE ADVANCED 2025 • SPARKLING SUCCESS OF EMPRISEIANS",
      badge: "AIR 404 GEN. (EWS) • IIT BOMBAY",
      heading: "JEE Advanced 2025 — Govind Gupta (AIR 404)",
      subheading: "Sparkling success of Empriseians: Govind Gupta (Emprise Topper) — AIR 404 Gen. (EWS), 99.65 %ile JEE Main, Selected in Indian Institute of Technology Bombay (IIT Bombay). From Potential to Possibilities.",
      primaryBtn: { label: "View All Results", href: "/results" },
      secondaryBtn: { label: "Explore JEE Program", href: "/iit-jee-coaching-mathura" },
      gradient: "from-[#123E73] via-[#1769E0] to-[#0B2748]",
      accentColor: "#FF8A00",
    },
  ] as HeroSlide[],

  // Legacy hero compatibility for any sub-components
  hero: {
    badge: "PREMIER COACHING INSTITUTE • MATHURA",
    h1: "IIT-JEE & NEET Coaching in Mathura",
    supportingLine: "JEE Main | JEE Advanced | NEET-UG | Foundation Classes 8–10",
    paragraph:
      "Established in 2011, Emprise Academy provides structured academic preparation, experienced faculty, personalised mentorship and regular testing for students preparing for IIT-JEE, NEET-UG and future competitive examinations.",
    primaryCta1: { label: "Explore JEE Programs", href: "/iit-jee-coaching-mathura" },
    primaryCta2: { label: "Explore NEET Programs", href: "/neet-coaching-mathura" },
    secondaryCta: { label: "Explore Foundation", href: "/foundation-coaching-mathura" },
    counsellingCta: { label: "Book Free Counselling", href: "#counselling" },
  },

  trustIntro: {
    heading: "Best IIT-JEE & NEET Coaching in Mathura",
    paragraph1:
      "Since 2011, Emprise Academy has been transforming aspirations into achievements and shaping the careers of thousands of students in Mathura. Over the years, the academy has earned a strong reputation as one of the leading IIT-JEE and NEET coaching institutes in Mathura and a trusted name for competitive examination preparation.",
    paragraph2:
      "Over the years, Emprise Academy has built a strong and structured culture of academic excellence, competitive preparation, and personalised student care. With an experienced team of IITians and Doctors, the academy focuses on conceptual clarity, disciplined learning, individual attention, and consistent performance improvement.",
    paragraph:
      "Since 2011, Emprise Academy has been transforming aspirations into achievements and shaping the careers of thousands of students in Mathura. Over the years, the academy has earned a strong reputation as one of the leading IIT-JEE and NEET coaching institutes in Mathura and a trusted name for competitive examination preparation. Over the years, Emprise Academy has built a strong and structured culture of academic excellence, competitive preparation, and personalised student care. With an experienced team of IITians and Doctors, the academy focuses on conceptual clarity, disciplined learning, individual attention, and consistent performance improvement.",
    stats: [
      {
        index: "01",
        value: "15+ Years",
        label: "of Academic Excellence",
        description: "Mentoring students in Mathura since 2011.",
        accent: "blue",
        iconName: "Trophy",
      },
      {
        index: "02",
        value: "JEE + NEET",
        label: "Competitive Focus",
        description: "Specialized engineering & medical entrance streams.",
        accent: "blue",
        iconName: "Target",
      },
      {
        index: "03",
        value: "7+ National",
        label: "Education Awards",
        description: "A strong record of academic recognition and institutional achievement.",
        accent: "gold",
        iconName: "Award",
      },
      {
        index: "04",
        value: "5000+",
        label: "Students Mentored",
        description: "Guiding students through structured learning, competitive preparation and personalised academic support.",
        accent: "blue",
        iconName: "Users",
      },
      {
        index: "05",
        value: "700+",
        label: "Students Qualified",
        description: "Supporting students through disciplined preparation, testing and consistent performance improvement.",
        accent: "success",
        iconName: "CheckCircle2",
      },
      {
        index: "06",
        value: "IITians & Doctors",
        label: "Faculty",
        description: "Experienced academic guidance from IITians and Doctors.",
        accent: "academic",
        iconName: "Stethoscope",
      },
    ] as AcademicStatItem[],
  },

  trustMetrics: [
    {
      value: "15+",
      label: "Years of Academic Excellence",
      sublabel: "Mentoring students in Mathura since 2011",
      isVerified: true,
    },
    {
      value: "100+",
      label: "IITians & Doctors",
      sublabel: "Mentored under our academic leadership",
      isVerified: true,
    },
    {
      value: "5000+",
      label: "Students Mentored",
      sublabel: "Students guided through structured academic and competitive preparation.",
      isVerified: true,
    },
    {
      value: "700+",
      label: "JEE & NEET Selections",
      sublabel: "Students who have successfully qualified through focused preparation and academic guidance.",
      isVerified: true,
    },
  ] as TrustMetric[],

  courses: [
    {
      id: "iit-jee",
      title: "IIT-JEE Preparation",
      badge: "Engineering Stream",
      targetClasses: "Classes 11, 12 & Droppers",
      targetExams: "JEE Main & JEE Advanced",
      description: "Become Engineer with IITians Faculty.",
      keyBenefit: "Daily DPPs with one-on-one doubt resolution and CBT test practice.",
      features: [
        "In-depth Physics, Chemistry & Mathematics pedagogy",
        "Graded Daily Practice Problem (DPP) sheets",
        "Part & Full-Syllabus Mock Tests with rank analysis",
        "Director-led problem solving and time management clinics",
      ],
      ctaLabel: "Explore IIT-JEE →",
      ctaHref: "/iit-jee-coaching-mathura",
      iconName: "Atom",
      accentColor: "navy",
    },
    {
      id: "neet-ug",
      title: "NEET-UG Preparation",
      badge: "Medical Stream",
      targetClasses: "Classes 11, 12 & Droppers",
      targetExams: "NEET-UG (Medical Entrance)",
      description: "Your First Step Towards Becoming Doctor.",
      keyBenefit: "100% NCERT alignment with error-analysis loops for medical entrance.",
      features: [
        "NCERT line-by-line Biology revision modules",
        "Conceptual clarity and numerical mastery in Physics & Chemistry",
        "Timed OMR test simulations mimicking actual exam conditions",
        "Personalized teacher feedback & performance monitoring",
      ],
      ctaLabel: "Explore NEET →",
      ctaHref: "/neet-coaching-mathura",
      iconName: "Stethoscope",
      accentColor: "orange",
    },
    {
      id: "foundation",
      title: "Foundation Classes 8–10",
      badge: "Junior Foundation",
      targetClasses: "Classes 8, 9 & 10",
      targetExams: "School Boards, Olympiads & Early Base",
      description: "Build Your Strong Base with experts at Emprise.",
      keyBenefit: "Dual advantage: school syllabus mastery plus competitive foundation.",
      features: [
        "Core science & mathematics fundamentals reinforcement",
        "Logical reasoning and mental ability for Olympiads",
        "Perfect synchronization with school curriculum & board exams",
        "Early competitive exam temperament without academic overload",
      ],
      ctaLabel: "Explore Foundation →",
      ctaHref: "/foundation-coaching-mathura",
      iconName: "GraduationCap",
      accentColor: "gold",
    },
    {
      id: "digital-learning",
      title: "Digital Learning & Study Resources",
      badge: "Digital Learning",
      tagline: "Learn Online. Practice Smart. Succeed with Emprise.",
      targetClasses: "Learn Online. Practice Smart. Succeed with Emprise.",
      targetExams: "JEE Main, JEE Advanced, NEET (UG) & Foundation",
      description: "",
      keyBenefit:
        "Complete digital practice ecosystem combining online testing, structured study material and daily practice.",
      features: [
        "JEE Main — Online Test Series",
        "JEE Advanced — Online Test Series",
        "NEET (UG) — Online Test Series",
        "Study Material — Structured, exam-oriented resources",
        "DPPs (Daily Practice Problems) — Regular practice for stronger concepts and better performance",
      ],
      ctaLabel: "View All Courses →",
      ctaHref: "/courses",
      iconName: "Laptop",
      accentColor: "navy",
    },
  ] as CourseCardData[],

  corePrograms: [
    {
      id: "iit-jee",
      title: "IIT-JEE",
      badge: "Engineering Stream",
      targetClasses: "Class 11 | Class 12 | Droppers",
      targetExams: "JEE Main & JEE Advanced",
      description:
        "Concept-based preparation for JEE Main & JEE Advanced with rigorous problem-solving, daily practice sheets, and national level testing.",
      features: [
        "In-depth coverage of Physics, Chemistry & Mathematics",
        "Daily Practice Problems (DPPs) with step-by-step doubt resolution",
        "Regular Part-Syllabus and Full-Syllabus Mock Tests with rank analysis",
        "Personalized strategy sessions for speed, accuracy & negative marking",
      ],
      ctaLabel: "Explore JEE →",
      ctaHref: "/iit-jee-coaching-mathura",
      accentColor: "navy",
    },
    {
      id: "neet-ug",
      title: "NEET-UG",
      badge: "Medical Stream",
      targetClasses: "Class 11 | Class 12 | Droppers",
      targetExams: "NEET-UG (Medical Entrance)",
      description:
        "Structured preparation in Physics, Chemistry & Biology with absolute NCERT line-by-line mastery and high-speed mock test simulations.",
      features: [
        "Complete NCERT-focused Biology revision modules with diagrams",
        "Conceptual clarity and numerical mastery in Physics & Chemistry",
        "Timed OMR test simulations mimicking actual NEET examination conditions",
        "Regular error analysis and personalized teacher feedback loops",
      ],
      ctaLabel: "Explore NEET →",
      ctaHref: "/neet-coaching-mathura",
      accentColor: "orange",
    },
    {
      id: "foundation",
      title: "FOUNDATION",
      badge: "Classes 8, 9 & 10",
      targetClasses: "Classes 8 | 9 | 10",
      targetExams: "School Boards, Olympiads & Early JEE/NEET Base",
      description:
        "Strong fundamentals, analytical thinking and problem-solving skills to build early academic confidence and competitive temperament.",
      features: [
        "Strengthening core fundamentals in Science & Mathematics",
        "Developing logical reasoning and mental ability for Olympiads",
        "Seamless synchronization with school curriculum and board exams",
        "Early exposure to competitive exam patterns without stress",
      ],
      ctaLabel: "Explore Foundation →",
      ctaHref: "/foundation-coaching-mathura",
      accentColor: "gold",
    },
  ],

  etseFeature: {
    heading: "Emprise Talent Search Examination 2026",
    subheading: "A standardized benchmark to test conceptual aptitude, discover academic potential, and earn merit scholarships.",
    examDate: ETSE_CONFIG.examDateDisplay,
    registrationDeadline: ETSE_CONFIG.registrationEndDateDisplay,
    examTime: "10:00 AM – 12:00 PM",
    reportingTime: "09:30 AM",
    eligibility: "Students currently in Classes 7th, 8th, 9th & 10th",
    fee: "100% FREE (Zero Registration Fee)",
    centre: "Emprise Academy Campus, Near Tera Tower, Bhuteshwar Road, Mathura",
    ctaRegister: { label: "Register for ETSE 2026", href: "/etse-2026#register" },
    ctaAdmitCard: { label: "Download Admit Card", href: "/student/admit-cards" },
  },

  whyEmprise: [
    {
      id: "directors-teaching",
      number: "01",
      title: "Director-Led Teaching, Mentorship & Care",
      description: "Our academic directors actively teach in classrooms and personally monitor every student's learning trajectory.",
      iconName: "ShieldCheck",
    },
    {
      id: "faculty-credentials",
      number: "02",
      title: "IITians & Doctors as Faculty",
      description: "Subject matter taught by educators with deep domain expertise and competitive entrance credentials.",
      iconName: "GraduationCap",
    },
    {
      id: "batch-size",
      number: "03",
      title: "Small Batches. Maximum Attention.",
      description: "Class sizes capped at 35–40 students to ensure every doubt is heard and resolved without hesitation.",
      iconName: "Users",
    },
    {
      id: "study-materials",
      number: "04",
      title: "Research-Driven Study Material & DPPs",
      description: "Carefully calibrated Daily Practice Problems (DPPs) graded from core fundamentals to advanced level questions.",
      iconName: "BookOpen",
    },
    {
      id: "testing-system",
      number: "05",
      title: "Rigorous Testing & Performance Analysis",
      description: "Regular chapter-wise, part-syllabus, and full-length simulated tests with deep analytical feedback.",
      iconName: "TrendingUp",
    },
    {
      id: "board-harmony",
      number: "06",
      title: "School & Board Excellence Alongside Competitive",
      description: "Harmonized schedule that strengthens board exam percentages while advancing competitive entrance skills.",
      iconName: "Award",
    },
    {
      id: "library-facility",
      number: "07",
      title: "Dedicated Library Facility",
      description: "Quiet, resource-rich self-study library with curated reference books and uninterrupted study environments.",
      iconName: "Library",
    },
    {
      id: "doubt-counters",
      number: "08",
      title: "Structured Doubt Resolution",
      description: "Dedicated daily doubt clearance counters allowing students to resolve conceptual bottlenecks promptly.",
      iconName: "HelpCircle",
    },
    {
      id: "personal-care",
      number: "09",
      title: "Personalised Academic Care",
      description: "Regular student check-ins, study planner reviews, and individual mentoring tailored to each student's pace.",
      iconName: "HeartHandshake",
    },
    {
      id: "legacy-trust",
      number: "10",
      title: "15+ Years of Academic Legacy",
      description: "Serving the Mathura and Western UP student community with consistent integrity, discipline, and dedication since 2011.",
      iconName: "Sparkles",
    },
  ] as WhyEmpriseItem[],

  whyChoose: [
    {
      id: "leadership",
      title: "Experienced Academic Leadership",
      description:
        "Founded and guided by engineering graduates from the University of Derby (UK) with rich professional and Kota coaching experience.",
      iconName: "ShieldCheck",
    },
    {
      id: "concept",
      title: "Concept-Based Learning",
      description:
        "Focus on understanding core scientific principles rather than rote learning, developing robust problem-solving ability.",
      iconName: "BrainCircuit",
    },
    {
      id: "mentorship",
      title: "Personalised Mentorship",
      description:
        "Continuous academic guidance, student monitoring, and individual support to ensure steady academic progress.",
      iconName: "Users",
    },
    {
      id: "testing",
      title: "Regular Testing System",
      description:
        "Chapter-wise, part-syllabus, and full-syllabus assessments conducted on strict exam simulation patterns.",
      iconName: "FileCheck2",
    },
    {
      id: "analysis",
      title: "Performance Analysis & Feedback",
      description:
        "Detailed test analytics provided after every exam to pinpoint student weaknesses and guide targeted improvement.",
      iconName: "TrendingUp",
    },
    {
      id: "doubts",
      title: "Structured Doubt Resolution",
      description:
        "Dedicated doubt resolution counters where faculty members help students clear conceptual bottlenecks daily.",
      iconName: "HelpCircle",
    },
    {
      id: "expertise",
      title: "JEE + NEET Expertise",
      description:
        "Specialized pedagogical systems, study materials, and question banks tailored specifically for engineering and medical exams.",
      iconName: "Award",
    },
    {
      id: "legacy",
      title: "15+ Years of Academic Legacy",
      description:
        "Serving the student community of Mathura and Western UP since 2011 with an unwavering commitment to excellence.",
      iconName: "GraduationCap",
    },
  ],

  empriseSystem: [
    {
      stepNumber: "01",
      title: "Integrated Subject Learning",
      subtitle: "Foundational Clarity",
      description: "Interactive classroom pedagogy breaking complex physics, chemistry, biology, and math concepts into first principles.",
      iconName: "BookOpen",
      phase: "Phase 1: Concept & Theory",
      benefits: [
        "First-principles conceptual derivation across Physics, Chemistry, Math & Biology.",
        "Graded Daily Practice Problems (DPPs) synchronized with daily classroom lectures.",
        "Multi-subject faculty coordination to prevent conceptual bottlenecks and learning gaps.",
      ],
    },
    {
      stepNumber: "02",
      title: "Competitive Exam Testing System",
      subtitle: "Exam Simulation",
      description: "Strictly timed objective and numerical testing conforming exactly to current NTA JEE & NEET blueprint patterns.",
      iconName: "ClipboardCheck",
      phase: "Phase 2: Exam Simulation",
      benefits: [
        "Strict NTA JEE & NEET blueprint testing with authentic negative marking dynamics.",
        "Part-syllabus and cumulative full-syllabus national mock examinations.",
        "All-Mathura percentile benchmarking with detailed rank-prediction analytics.",
      ],
    },
    {
      stepNumber: "03",
      title: "Success Planner",
      subtitle: "Daily Execution",
      description: "Structured self-study roadmaps and micro-schedules helping students distribute study hours and practice consistently.",
      iconName: "Compass",
      phase: "Phase 3: Execution Framework",
      benefits: [
        "Micro-scheduled daily study hours balanced across all subjects and revisions.",
        "Continuous syllabus completion tracking with weekly milestone checkpoints.",
        "Structured self-study roadmaps eliminating last-minute exam cramming.",
      ],
    },
    {
      stepNumber: "04",
      title: "Board & School Exam Preparation",
      subtitle: "Dual Excellence",
      description: "Dedicated descriptive writing guidance and textbook exercises ensuring outstanding performance in school boards.",
      iconName: "GraduationCap",
      phase: "Phase 4: Dual Excellence",
      benefits: [
        "Subjective answer-writing guidance with authentic board step-marking evaluation.",
        "Comprehensive NCERT line-by-line coverage and textbook exercises practice.",
        "Harmonized schedule eliminating conflict between board scores and competitive prep.",
      ],
    },
    {
      stepNumber: "05",
      title: "Online & CBT-Based Test Practice",
      subtitle: "Digital Readiness",
      description: "Computer-Based Test simulations familiarizing students with digital screen navigation, timers, and test ergonomics.",
      iconName: "MonitorPlay",
      phase: "Phase 5: Digital Preparedness",
      benefits: [
        "Authentic digital examination interface with virtual timers and question palettes.",
        "Speed, accuracy, and screen-fatigue optimization drills under exam pressure.",
        "Instant post-exam analytical breakdown and step-by-step solution explanations.",
      ],
    },
    {
      stepNumber: "06",
      title: "Regular PTM & Parent Feedback",
      subtitle: "Transparent Tracking",
      description: "Scheduled Parent-Teacher Meetings with complete attendance and progress data to align home and classroom support.",
      iconName: "Users",
      phase: "Phase 6: Holistic Tracking",
      benefits: [
        "One-on-one progress review meetings with subject faculty and academic directors.",
        "Transparent attendance records, DPP submission tracking, and test score reports.",
        "Constructive personalized action plans for targeted academic improvement at home.",
      ],
    },
    {
      stepNumber: "07",
      title: "Surprise Tests & Review Tests",
      subtitle: "Retention Check",
      description: "Periodic unannounced assessments that test long-term retention and reinforce continuous daily revision.",
      iconName: "RefreshCcw",
      phase: "Phase 7: Retention Audit",
      benefits: [
        "Periodic unannounced assessments cultivating proactive daily revision habits.",
        "Comprehensive concept retention audits covering previously taught chapters.",
        "Rapid identification and targeted remediation of dormant conceptual weaknesses.",
      ],
    },
    {
      stepNumber: "08",
      title: "Counselling & Motivation Sessions",
      subtitle: "Mindset & Focus",
      description: "Director-led motivational talks and stress-management guidance keeping aspirants confident, positive, and focused.",
      iconName: "HeartHandshake",
      phase: "Phase 8: Mentorship & Temperament",
      benefits: [
        "Director-led motivational sessions on competitive temperament and stress management.",
        "Individual academic counselling to overcome performance plateaus and fatigue.",
        "Sustained positive mindset, discipline, and emotional focus throughout the year.",
      ],
    },
  ] as EmpriseSystemStep[],

  methodology: {
    heading: "Our Teaching Methodology",
    subheading:
      "Strong preparation is built through a disciplined academic cycle—not through one-time study.",
    steps: [
      {
        stepNumber: "01",
        title: "Concept Building",
        subtitle: "Strong Conceptual Foundation",
        description:
          "Mastering fundamental principles through interactive classroom lectures, real-world examples, and visual derivations.",
      },
      {
        stepNumber: "02",
        title: "Practice",
        subtitle: "Daily Problem Solving",
        description:
          "Solving graded Daily Practice Problem (DPP) sheets ranging from basic formula application to multi-concept problems.",
      },
      {
        stepNumber: "03",
        title: "Testing",
        subtitle: "Regular Assessments",
        description:
          "Simulated examination tests on exact JEE/NEET patterns with strict time constraints and negative marking.",
      },
      {
        stepNumber: "04",
        title: "Performance Analysis",
        subtitle: "Identifying Weak Areas",
        description:
          "Deep-dive analytics on subject accuracy, time spent per question, unattempted questions, and silly mistakes.",
      },
      {
        stepNumber: "05",
        title: "Improvement",
        subtitle: "Targeted Remedial Support",
        description:
          "One-on-one doubt clarification, re-practice of missed concepts, and targeted remedial question sets.",
      },
      {
        stepNumber: "06",
        title: "Revision",
        subtitle: "Systematic Final Preparation",
        description:
          "Comprehensive revision cycles, formula cheat sheets, previous years' questions (PYQs), and full-length mock drills.",
      },
    ] as EmpriseSystemStep[],
  },

  directors: [
    {
      id: DIRECTORS_DATA.sushilDagur.id,
      name: DIRECTORS_DATA.sushilDagur.name,
      role: DIRECTORS_DATA.sushilDagur.designation,
      qualification: DIRECTORS_DATA.sushilDagur.qualification,
      institution: DIRECTORS_DATA.sushilDagur.institution,
      highlights: DIRECTORS_DATA.sushilDagur.professionalJourney.map(
        (p) => `${p.companyOrContext}: ${p.roleSummary}`
      ),
      messageSnippet: DIRECTORS_DATA.sushilDagur.quote,
      photoUrl: DIRECTORS_DATA.sushilDagur.photoUrl,
    },
    {
      id: DIRECTORS_DATA.rakeshKumar.id,
      name: DIRECTORS_DATA.rakeshKumar.name,
      role: DIRECTORS_DATA.rakeshKumar.designation,
      qualification: DIRECTORS_DATA.rakeshKumar.qualification,
      institution: DIRECTORS_DATA.rakeshKumar.institution,
      highlights: DIRECTORS_DATA.rakeshKumar.professionalJourney.map(
        (p) => `${p.companyOrContext}: ${p.roleSummary}`
      ),
      messageSnippet: DIRECTORS_DATA.rakeshKumar.quote,
      photoUrl: DIRECTORS_DATA.rakeshKumar.photoUrl,
    },
  ],

  studentAchievers: [
    {
      name: "Atul Dagur",
      exam: "JEE Advanced",
      academicYear: "2026",
      rank: "AIR 642",
      achievement: "Qualified JEE Advanced with Top Math & Physics Scores",
      program: "2-Year Classroom Program",
      badge: "JEE Advanced",
    },
    {
      name: "Govind Gupta",
      exam: "NEET-UG",
      academicYear: "2026",
      rank: "685 / 720",
      achievement: "Top Medical Score with 350+ in Biology",
      program: "1-Year Target Medical",
      badge: "NEET Top Score",
    },
    {
      name: "Utkarsh Pandey",
      exam: "JEE Main",
      academicYear: "2026",
      rank: "99.4 Percentile",
      achievement: "Exceptional speed and precision in Physics & Math",
      program: "2-Year Classroom Program",
      badge: "99+ Percentile",
    },
    {
      name: "Sharvan",
      exam: "JEE Advanced",
      academicYear: "2025",
      rank: "AIR 1280",
      achievement: "Consistently ranked Top 3 in Institutional Test Series",
      program: "Target Classroom Program",
      badge: "JEE Achiever",
    },
    {
      name: "Umesh Yadav",
      exam: "NEET-UG",
      academicYear: "2025",
      rank: "668 / 720",
      achievement: "High Precision in Organic & Inorganic Chemistry",
      program: "2-Year Medical Batch",
      badge: "NEET Achiever",
    },
    {
      name: "Tanisha",
      exam: "Foundation Olympiad",
      academicYear: "2026",
      rank: "State Rank 4",
      achievement: "Junior Science & Mathematics Olympiad Qualifier",
      program: "Foundation Class 10",
      badge: "Olympiad Winner",
    },
  ] as StudentAchiever[],

  galleryItems: [
    {
      id: "gal-1",
      title: "Interactive Smart Classrooms",
      category: "Classrooms",
      caption: "Spacious, well-ventilated academic classrooms equipped for focused teaching and problem solving.",
      aspect: "landscape",
    },
    {
      id: "gal-2",
      title: "Campus Facade & Mentorship Centre",
      category: "Campus",
      caption: "Emprise Academy campus near Tera Tower, Bhuteshwar Road, Mathura.",
      aspect: "landscape",
    },
    {
      id: "gal-3",
      title: "Dedicated Self-Study Library",
      category: "Campus",
      caption: "Silent reference library facility for uninterrupted self-study and problem practice.",
      aspect: "landscape",
    },
    {
      id: "gal-4",
      title: "Simulated Examination Hall",
      category: "Events",
      caption: "Students participating in ETSE and mock tests under strict examination discipline.",
      aspect: "landscape",
    },
    {
      id: "gal-5",
      title: "Faculty Doubt Clearance Desk",
      category: "Students",
      caption: "Daily one-on-one doubt clarification sessions with subject experts.",
      aspect: "landscape",
    },
    {
      id: "gal-6",
      title: "Annual Orientation & Motivation Session",
      category: "Activities",
      caption: "Academic goal-setting and strategy seminar led by the directors.",
      aspect: "landscape",
    },
  ] as GalleryItem[],

  latestUpdates: [
    {
      id: "up-1",
      date: ETSE_CONFIG.shortDateDisplay,
      category: "ETSE",
      title: "ETSE 2026 Examination Date Confirmed",
      preview: `Emprise Talent Search Examination will be conducted offline at the Mathura campus on ${ETSE_CONFIG.examDateDisplay}. Free registration is open until ${ETSE_CONFIG.registrationEndDateDisplay}.`,
      href: "/etse-2026",
      isImportant: true,
    },
    {
      id: "up-2",
      date: "Session 2026–27",
      category: "Admissions",
      title: "New Batches Announced for JEE & NEET",
      preview: "Admissions open for Class 11, Class 12, and Dropper target batches. Direct and scholarship-based admissions available.",
      href: "/admissions",
      isImportant: true,
    },
    {
      id: "up-3",
      date: "Active Notice",
      category: "Notices",
      title: "Digital Admit Cards Issued for Registered ETSE Candidates",
      preview: "Candidates registered for ETSE 2026 can download their official verified admit card with seat number and QR token from the Student Portal.",
      href: "/student/admit-cards",
    },
  ] as LatestUpdateItem[],

  scholarship: {
    heading: "Scholarships for Aspiring Achievers",
    subheading: "Financial constraints must never hinder pure academic merit.",
    features: [
      "Up to 100% tuition fee waiver via ETSE merit score.",
      "Special scholarship considerations for school toppers & Olympiad rankers.",
      "Merit retention awards for consistent test performers.",
    ],
    ctaLabel: "Apply for ETSE 2026",
    ctaHref: "/etse-2026",
  },

  admissionsCta: {
    heading: "Take the First Step Toward Your Dream College",
    subheading: "Speak with our academic counsellors in Mathura for batch availability and personalised study roadmaps.",
    phone: CANONICAL_BUSINESS_CONFIG.contact.phone_primary,
    email: CANONICAL_BUSINESS_CONFIG.contact.email,
  },

  faqs: [
    {
      id: 1,
      question: "Why is Emprise Academy a trusted choice for IIT-JEE and NEET preparation in Mathura?",
      answer:
        "Since 2011, Emprise Academy has earned the trust of thousands of students and families across Mathura through consistent academic guidance and successful results.\n\n• 15+ Years of Academic Legacy in Mathura.\n• Students from across Mathura and surrounding areas have trusted Emprise for their competitive-exam preparation.\n• Every year, Emprise students achieve strong ranks and selections in IITs, NITs, IIITs, AIIMS, Government Medical Colleges and other prestigious institutions.\n• A proven combination of experienced faculty, structured preparation, rigorous testing, personalised mentorship and continuous student care.\n• A long-standing legacy of helping students turn their aspirations into IITians, Doctors, Engineers and other successful professionals.\n\nThis continued success and the trust of thousands of students and parents make Emprise Academy one of Mathura’s most trusted names for IIT-JEE & NEET preparation.",
      lead: "Since 2011, Emprise Academy has earned the trust of thousands of students and families across Mathura through consistent academic guidance and successful results.",
      bullets: [
        "15+ Years of Academic Legacy in Mathura.",
        "Students from across Mathura and surrounding areas have trusted Emprise for their competitive-exam preparation.",
        "Every year, Emprise students achieve strong ranks and selections in IITs, NITs, IIITs, AIIMS, Government Medical Colleges and other prestigious institutions.",
        "A proven combination of experienced faculty, structured preparation, rigorous testing, personalised mentorship and continuous student care.",
        "A long-standing legacy of helping students turn their aspirations into IITians, Doctors, Engineers and other successful professionals.",
      ],
      closing:
        "This continued success and the trust of thousands of students and parents make Emprise Academy one of Mathura’s most trusted names for IIT-JEE & NEET preparation.",
    },
    {
      id: 2,
      question: "Which is the best IIT-JEE coaching in Mathura?",
      answer:
        "Emprise Academy is the Best IIT-JEE coaching institute in Mathura, offering structured preparation for JEE Main and JEE Advanced with experienced faculty, regular testing, performance analysis, personalised mentorship, and dedicated doubt support. By delivering consistent and reliable results in the JEE exams, Emprise holds the title of best JEE Coaching in Mathura.",
    },
    {
      id: 3,
      question: "How is Emprise Academy different from other JEE and NEET coaching institutes in Mathura?",
      answer:
        "Emprise Academy stands apart through a structured, highly personalised, and student-focused academic system:\n\n• Strong & Experienced Faculty Pool — 3–4 dedicated faculty members for each subject Physics, Chemistry, Mathematics & Biology, ensuring better academic availability, faster doubt resolution and individual attention.\n• Regular Classes in All Major Subjects — Daily classes in Physics, Chemistry, Mathematics & Biology maintain learning continuity and help students build strong connections between concepts and subjects.\n• Complete Academic System — Concept building, daily practice, DPPs, objective & subjective tests, performance analysis, revision, doubt resolution, personalised mentorship and parent feedback.\n• Personalised Student Care — Close monitoring and individual academic support to identify learning gaps and guide every student towards improvement.\n• Safe & Study-Friendly Campus — A secure, disciplined and focused learning environment designed to minimise distractions and support productive study.\n• Director-Led Teaching & Mentorship — The Director personally teaches, guides, mentors, motivates and cares for students, ensuring direct academic supervision and stronger student connect.\n\nMore Faculty. More Attention. More Care. A Better Academic Environment.",
      lead: "Emprise Academy stands apart through a structured, highly personalised, and student-focused academic system:",
      bullets: [
        "Strong & Experienced Faculty Pool — 3–4 dedicated faculty members for each subject Physics, Chemistry, Mathematics & Biology, ensuring better academic availability, faster doubt resolution and individual attention.",
        "Regular Classes in All Major Subjects — Daily classes in Physics, Chemistry, Mathematics & Biology maintain learning continuity and help students build strong connections between concepts and subjects.",
        "Complete Academic System — Concept building, daily practice, DPPs, objective & subjective tests, performance analysis, revision, doubt resolution, personalised mentorship and parent feedback.",
        "Personalised Student Care — Close monitoring and individual academic support to identify learning gaps and guide every student towards improvement.",
        "Safe & Study-Friendly Campus — A secure, disciplined and focused learning environment designed to minimise distractions and support productive study.",
        "Director-Led Teaching & Mentorship — The Director personally teaches, guides, mentors, motivates and cares for students, ensuring direct academic supervision and stronger student connect.",
      ],
      closing: "More Faculty. More Attention. More Care. A Better Academic Environment.",
    },
    {
      id: 4,
      question: "Does Emprise Academy have experienced IITians and Doctors as faculty?",
      answer:
        "Yes. Emprise has an experienced academic team that includes IITians, Doctors, and experienced educators, bringing strong subject expertise and competitive-exam guidance.",
    },
    {
      id: 5,
      question: "Does Emprise Academy have a proven JEE and NEET track record?",
      answer:
        "Absolutely. Since 2011, Emprise Academy, Mathura has built a strong legacy of producing IITians and Doctors. Over the years, 200+ Emprise students have achieved success as IITians and Doctors, while 700+ students have successfully cleared various competitive examinations and secured admissions to prestigious institutions across India.\n\nOur students have gone on to pursue their dreams at institutions including IITs, NITs, IIITs, GFTIs, AIIMS, BITS Pilani, and leading colleges for MBBS, BDS, BAMS, BHMS and other professional programmes.\n\nThis long-standing journey reflects Emprise Academy's commitment to quality teaching, disciplined preparation, personalised mentorship, continuous assessment, and student-focused academic care—creating a legacy of successful IITians, Doctors and other accomplished professionals from Mathura.\n\nEmprise continues to build on this legacy with a clear focus on strong foundations, competitive-exam excellence, and long-term student success.\n\nThe institute showcases its results, selections, and top ranks as key indicators of its academic performance.",
      paragraphs: [
        "Absolutely. Since 2011, Emprise Academy, Mathura has built a strong legacy of producing IITians and Doctors. Over the years, 200+ Emprise students have achieved success as IITians and Doctors, while 700+ students have successfully cleared various competitive examinations and secured admissions to prestigious institutions across India.",
        "Our students have gone on to pursue their dreams at institutions including IITs, NITs, IIITs, GFTIs, AIIMS, BITS Pilani, and leading colleges for MBBS, BDS, BAMS, BHMS and other professional programmes.",
        "This long-standing journey reflects Emprise Academy's commitment to quality teaching, disciplined preparation, personalised mentorship, continuous assessment, and student-focused academic care—creating a legacy of successful IITians, Doctors and other accomplished professionals from Mathura.",
        "Emprise continues to build on this legacy with a clear focus on strong foundations, competitive-exam excellence, and long-term student success.",
        "The institute showcases its results, selections, and top ranks as key indicators of its academic performance.",
      ],
    },
    {
      id: 6,
      question: "Who are the toppers from Emprise Academy Mathura?",
      answer:
        "Emprise Academy has a strong track record of students achieving excellent results in IIT-JEE and NEET and progressing to premier institutions across India.\n\nRecent achievers include:\n\n• 2026 IIT-JEE Topper — Atul Dagur, now pursuing Computer Science at IIT-Bombay.\n• 2025 IIT-JEE Topper — Govind Gupta: AIR 404, now pursuing studies at IIT-Bombay.\n• 2024 IIT-JEE Topper — Utkarsh Pandey, now pursuing studies at IIT-Dhanbad.\n• 2023 IIT-JEE Topper — Sharvan, AIR-92 (Cat.), now pursuing studies at IIT-Kanpur.\n• 2022 IIT-JEE Topper — Umesh Yadav, AIR-645, now pursuing studies at IIT-Delhi.\n• 2025 NEET Topper — Anil Yadav: AIR 4,460, now studying MBBS at GMC.\n• 2024 NEET Topper — Tanisha: AIR 458, now studying MBBS at AIIMS Rae Bareli.\n• 2023 NEET Topper — Aayan: AIR 850, now studying MBBS at AIIMS Gorakhpur.\n• 2022 NEET Topper — Shobhit, now pursuing MBBS at AIIMS Jodhpur.\n\nAlong with these achievers, many Emprise students have secured top ranks and admissions every year in IITs, NITs, IIITs, AIIMS, and leading Government Medical Colleges across India.\n\nEmprise Academy showcases its successful students and toppers through its Results and Student Testimonials sections. Students and parents can refer to these sections for the latest available results and verified achievements.",
      lead: "Emprise Academy has a strong track record of students achieving excellent results in IIT-JEE and NEET and progressing to premier institutions across India.",
      subheading: "Recent achievers include:",
      achievers: [
        {
          yearExam: "2026 IIT-JEE Topper",
          student: "Atul Dagur",
          detail: "now pursuing Computer Science at IIT-Bombay.",
        },
        {
          yearExam: "2025 IIT-JEE Topper",
          student: "Govind Gupta",
          detail: "AIR 404, now pursuing studies at IIT-Bombay.",
        },
        {
          yearExam: "2024 IIT-JEE Topper",
          student: "Utkarsh Pandey",
          detail: "now pursuing studies at IIT-Dhanbad.",
        },
        {
          yearExam: "2023 IIT-JEE Topper",
          student: "Sharvan",
          detail: "AIR-92 (Cat.), now pursuing studies at IIT-Kanpur.",
        },
        {
          yearExam: "2022 IIT-JEE Topper",
          student: "Umesh Yadav",
          detail: "AIR-645, now pursuing studies at IIT-Delhi.",
        },
        {
          yearExam: "2025 NEET Topper",
          student: "Anil Yadav",
          detail: "AIR 4,460, now studying MBBS at GMC.",
        },
        {
          yearExam: "2024 NEET Topper",
          student: "Tanisha",
          detail: "AIR 458, now studying MBBS at AIIMS Rae Bareli.",
        },
        {
          yearExam: "2023 NEET Topper",
          student: "Aayan",
          detail: "AIR 850, now studying MBBS at AIIMS Gorakhpur.",
        },
        {
          yearExam: "2022 NEET Topper",
          student: "Shobhit",
          detail: "now pursuing MBBS at AIIMS Jodhpur.",
        },
      ],
      closingParagraphs: [
        "Along with these achievers, many Emprise students have secured top ranks and admissions every year in IITs, NITs, IIITs, AIIMS, and leading Government Medical Colleges across India.",
        "Emprise Academy showcases its successful students and toppers through its Results and Student Testimonials sections. Students and parents can refer to these sections for the latest available results and verified achievements.",
      ],
    },
    {
      id: 7,
      question: "Does Emprise Academy prepare students for Board Exams along with JEE and NEET?",
      answer:
        "Yes. Board and school examinations are an important part of the academic system at Emprise. Students receive subjective-format tests, written-answer practice, and PYQ practice alongside competitive-exam preparation.",
    },
    {
      id: 8,
      question: "Does Emprise Academy provide online or CBT-based test practice?",
      answer:
        "Yes. Students receive online and computer-based test practice, helping them become familiar with digital examination environments and improve their exam readiness.",
    },
    {
      id: 9,
      question: "Does Emprise provide doubt-solving and personalised mentorship?",
      answer:
        "Yes. Regular doubt resolution, faculty guidance, performance monitoring, and individual academic support are integral parts of the Emprise academic system.",
    },
    {
      id: 10,
      question: "Does the Director personally teach and mentor students?",
      answer:
        "Yes. At Emprise, the Director is directly involved in academics and personally teaches, guides, mentors, and interacts with students, helping maintain close academic supervision and student care.",
    },
    {
      id: 11,
      question: "Does Emprise Academy conduct Parent-Teacher Meetings (PTMs)?",
      answer:
        "Yes. Regular Parent–Teacher Meetings (PTMs) are conducted to discuss student performance, strengths, areas of improvement, and faculty feedback with parents.",
    },
    {
      id: 12,
      question: "Does Emprise Academy offer Foundation Classes for Classes 8–10?",
      answer:
        "Yes. Emprise offers Foundation programmes for Classes 8–10, designed to strengthen conceptual foundations and prepare students for future competitive examinations.",
    },
    {
      id: 13,
      question: "Where is Emprise Academy located in Mathura?",
      answer:
        "Emprise Academy's Mathura Corporate Centre is located near Tera Tower, Bhuteshwar Road, Mathura.",
      highlight: "Near Tera Tower, Bhuteshwar Road, Mathura",
    },
  ] as HomepageFAQ[],

  contactCampus: {
    addressLine1: "Near Tera Tower, Bhuteshwar Road",
    addressLine2: "Mathura, Uttar Pradesh, 281004",
    phoneDisplay: "+91 7247889955",
    phoneSecondaryDisplay: "+91 9634448800",
    phoneHref: "tel:+917247889955",
    whatsappHref: "https://wa.me/919808912829",
    email: "info@empriseacademy.com",
    hours: "10:00 AM – 7:00 PM (Monday to Saturday)",
    directionsUrl: "https://maps.google.com/?q=Emprise+Academy+Mathura",
  },
};
