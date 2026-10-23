/**
 * Official Emprise Academy Video Gallery Dataset
 * Source: 10 authentic academy video productions & student achiever interviews
 */

export type VideoCategory = "all" | "director-sessions" | "jee-toppers" | "neet-aiims";

export interface VideoCategoryMeta {
  id: VideoCategory;
  label: string;
  badge: string;
}

export const VIDEO_CATEGORIES: VideoCategoryMeta[] = [
  { id: "all", label: "All Videos", badge: "10" },
  { id: "director-sessions", label: "Director Sessions", badge: "Featured" },
  { id: "jee-toppers", label: "JEE Toppers", badge: "IITian Stories" },
  { id: "neet-aiims", label: "NEET & AIIMS Achievers", badge: "Doctor Journeys" },
];

export interface VideoItem {
  id: string;
  title: string;
  studentName: string;
  institution: string;
  category: VideoCategory;
  categoryLabel: string;
  duration: string;
  durationSeconds: number;
  videoSrc: string;
  posterSrc: string;
  description: string;
  isFeatured?: boolean;
  examTag: string;
  originalFileName: string;
  aspectRatio: string;
}

export const OFFICIAL_VIDEOS: VideoItem[] = [
  {
    id: "video-10-director-interview-shobhit-aiims",
    title: "Director's Special Dialogue: Shobhit's Journey to AIIMS Jodhpur",
    studentName: "Shobhit",
    institution: "AIIMS Jodhpur",
    category: "director-sessions",
    categoryLabel: "Director Dialogue & Felicitation",
    duration: "05:02",
    durationSeconds: 302,
    videoSrc: "/videos/video-10-director-interview-shobhit-aiims.mp4",
    posterSrc: "/videos/posters/video-10-director-interview-shobhit-aiims.jpg",
    description:
      "Exclusive candid conversation and felicitation inside the Director's Office, exploring the disciplined preparation strategy, daily routine, doubt resolution, and foundation mentoring that propelled Shobhit to AIIMS Jodhpur.",
    isFeatured: true,
    examTag: "NEET / AIIMS Topper",
    originalFileName: "1023(9).mov",
    aspectRatio: "3/4",
  },
  {
    id: "video-01-sharvan-iit-kanpur",
    title: "Sharvan's Path to IIT Kanpur: 99.59 Percentile Success Story",
    studentName: "Sharvan",
    institution: "IIT Kanpur",
    category: "jee-toppers",
    categoryLabel: "JEE Advanced Topper",
    duration: "00:24",
    durationSeconds: 24,
    videoSrc: "/videos/video-01-sharvan-iit-kanpur.mp4",
    posterSrc: "/videos/posters/video-01-sharvan-iit-kanpur.jpg",
    description:
      "Classroom achiever Sharvan shares his preparation journey, disciplined library hours, and personal guidance from Directors that led him to IIT Kanpur.",
    isFeatured: false,
    examTag: "JEE Advanced (99.59%ile)",
    originalFileName: "1023.mov",
    aspectRatio: "3/4",
  },
  {
    id: "video-02-shobhit-aiims-jodhpur",
    title: "Shobhit on Cracking NEET & Securing AIIMS Jodhpur",
    studentName: "Shobhit",
    institution: "AIIMS Jodhpur",
    category: "neet-aiims",
    categoryLabel: "NEET & AIIMS Achiever",
    duration: "00:52",
    durationSeconds: 52,
    videoSrc: "/videos/video-02-shobhit-aiims-jodhpur.mp4",
    posterSrc: "/videos/posters/video-02-shobhit-aiims-jodhpur.jpg",
    description:
      "Shobhit shares how Emprise Academy's rigorous test series, concept clarity in Biology & Chemistry, and continuous mentorship helped him achieve his dream rank in AIIMS.",
    isFeatured: false,
    examTag: "AIIMS Jodhpur",
    originalFileName: "1023(1).mov",
    aspectRatio: "3/4",
  },
  {
    id: "video-03-utkarsh-pandey-iit-dhanbad",
    title: "Utkarsh Pandey: Foundation to IIT Dhanbad Journey",
    studentName: "Utkarsh Pandey",
    institution: "IIT Dhanbad",
    category: "jee-toppers",
    categoryLabel: "JEE Advanced Achiever",
    duration: "00:28",
    durationSeconds: 28,
    videoSrc: "/videos/video-03-utkarsh-pandey-iit-dhanbad.mp4",
    posterSrc: "/videos/posters/video-03-utkarsh-pandey-iit-dhanbad.jpg",
    description:
      "Foundation batch student Utkarsh reflects on the focused study environment, classroom problem-solving culture, and faculty mentorship at Emprise Academy.",
    isFeatured: false,
    examTag: "IIT (ISM) Dhanbad",
    originalFileName: "1023(2).mov",
    aspectRatio: "3/4",
  },
  {
    id: "video-04-aayan-aiims-gorakhpur",
    title: "Aayan: Cracking NEET to Join AIIMS Gorakhpur",
    studentName: "Aayan",
    institution: "AIIMS Gorakhpur",
    category: "neet-aiims",
    categoryLabel: "NEET & AIIMS Achiever",
    duration: "01:41",
    durationSeconds: 101,
    videoSrc: "/videos/video-04-aayan-aiims-gorakhpur.mp4",
    posterSrc: "/videos/posters/video-04-aayan-aiims-gorakhpur.jpg",
    description:
      "Comprehensive walkthrough of Aayan's preparation strategy, dealing with exam pressure, consistent revision, and high-yield test pattern practice at Emprise Academy.",
    isFeatured: false,
    examTag: "AIIMS Gorakhpur",
    originalFileName: "1023(3).mov",
    aspectRatio: "3/4",
  },
  {
    id: "video-05-champ-pratap-gmc",
    title: "Champ Pratap: Medical Entrance Success & GMC Selection",
    studentName: "Champ Pratap",
    institution: "GMC Saharanpur",
    category: "neet-aiims",
    categoryLabel: "NEET Medical Achiever",
    duration: "00:32",
    durationSeconds: 32,
    videoSrc: "/videos/video-05-champ-pratap-gmc.mp4",
    posterSrc: "/videos/posters/video-05-champ-pratap-gmc.jpg",
    description:
      "Champ Pratap explains how the disciplined academic environment, approachable faculty, and personalized feedback system paved his way to government medical college.",
    isFeatured: false,
    examTag: "GMC Selection",
    originalFileName: "1023(4).mov",
    aspectRatio: "3/4",
  },
  {
    id: "video-06-neet-achiever-interview",
    title: "Medical Aspirant's Journey: Systematic NEET Preparation",
    studentName: "Emprise NEET Achiever",
    institution: "Government Medical College",
    category: "neet-aiims",
    categoryLabel: "NEET Success Story",
    duration: "00:58",
    durationSeconds: 58,
    videoSrc: "/videos/video-06-neet-achiever-interview.mp4",
    posterSrc: "/videos/posters/video-06-neet-achiever-interview.jpg",
    description:
      "Candid student testimonial highlighting classroom teaching quality, faculty dedication, regular test benchmarking, and doubt clearance sessions.",
    isFeatured: false,
    examTag: "NEET Achiever",
    originalFileName: "1023(5).mov",
    aspectRatio: "3/4",
  },
  {
    id: "video-07-ashish-kumar-aiims",
    title: "Ashish Kumar: AIR 59 in AIIMS Medical Entrance",
    studentName: "Ashish Kumar",
    institution: "AIR 59 in AIIMS",
    category: "neet-aiims",
    categoryLabel: "Top AIIMS Ranker",
    duration: "00:20",
    durationSeconds: 20,
    videoSrc: "/videos/video-07-ashish-kumar-aiims.mp4",
    posterSrc: "/videos/posters/video-07-ashish-kumar-aiims.jpg",
    description:
      "National top ranker Ashish Kumar shares insights on conceptual clarity, speed & accuracy balance, and the academic mentorship received at Emprise Academy.",
    isFeatured: false,
    examTag: "AIR 59 (AIIMS)",
    originalFileName: "1023(6).mov",
    aspectRatio: "3/4",
  },
  {
    id: "video-08-medical-achiever-interview",
    title: "Determination to Success: Medical Entrance Journey",
    studentName: "Emprise Medical Achiever",
    institution: "Medical Entrance Selection",
    category: "neet-aiims",
    categoryLabel: "NEET Success Story",
    duration: "00:19",
    durationSeconds: 19,
    videoSrc: "/videos/video-08-medical-achiever-interview.mp4",
    posterSrc: "/videos/posters/video-08-medical-achiever-interview.jpg",
    description:
      "Inspiring student reflection on overcoming challenges, consistent practice, and the unwavering encouragement from Emprise faculty mentors.",
    isFeatured: false,
    examTag: "NEET Journey",
    originalFileName: "1023(7).mov",
    aspectRatio: "3/4",
  },
  {
    id: "video-09-academic-achiever-interview",
    title: "Excellence in Focus: Empriseian Academic Journey",
    studentName: "Emprise Academic Achiever",
    institution: "Premier Engineering Institute",
    category: "jee-toppers",
    categoryLabel: "Academic Excellence",
    duration: "00:20",
    durationSeconds: 20,
    videoSrc: "/videos/video-09-academic-achiever-interview.mp4",
    posterSrc: "/videos/posters/video-09-academic-achiever-interview.jpg",
    description:
      "Achiever testimonial sharing the study habits, regular assessment drills, and personal motivation that made the difference in competitive entrance exams.",
    isFeatured: false,
    examTag: "Academic Excellence",
    originalFileName: "1023(8).mov",
    aspectRatio: "3/4",
  },
];
