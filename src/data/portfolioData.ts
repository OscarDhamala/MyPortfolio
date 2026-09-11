export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface ExperienceStep {
  phase: string;
  title: string;
  org: string;
  period: string;
  live: boolean;
  progress: number;
  description: string;
  points: string[];
}

export interface TechGroup {
  category: string;
  color: string;
  items: string[];
}

export type RowKey = "experience" | "projects" | "tech" | "about";

export interface ProfileDef {
  id: string;
  name: string;
  image?: string;
  initials?: string;
  className?: string;
  order: RowKey[];
}

export interface NavLink {
  label: string;
  id: string;
}

export type ModalState =
  | { type: "project"; data: Project }
  | { type: "experience"; data: ExperienceStep }
  | { type: "about" }
  | null;

export const BIO_PARAGRAPHS: string[] = [
  "Hi! I'm Oscar, a full-stack engineer with experience in building web applications. I love turning problems into simple, beautiful, and intuitive solutions.",
  "When I'm not learning to code, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while planning my next project.",
  "My goal is to create digital experiences that not only look great but also provide real value to users and businesses.",
];

export const PROJECTS: Project[] = [
  {
    id: "amplify",
    name: "Amplify AI",
    tagline: "Your intelligent conversation companion",
    description:
      "The AI chat application built on React, TypeScript, Supabase and Edge Functions for customized Poppy AI integration.",
    tags: ["React", "TypeScript", "Supabase", "Database", "Edge Function", "Poppy AI API"],
    image: "/uploads/Amplify.png",
    link: "https://www.growonyt.com/",
  },
  {
    id: "gymbuddy",
    name: "GymBuddy",
    tagline: "Gym Management System",
    description: "A perfect gym management system built using PHP and a MySQL database.",
    tags: ["PHP", "MySQL", "Tailwind CSS", "JSON", "AJAX"],
    image: "/uploads/SS2.png",
    link: "https://www.youtube.com/watch?v=YiwaMS80IBo",
  },
  {
    id: "clarity",
    name: "Clarity",
    tagline: "Your AI-powered personal finance tracker",
    description:
      "MERN architecture integrated with AI to automatically categorize expenses and income as per user input.",
    tags: ["React", "Node.js", "Express", "MongoDB", "AI"],
    image: "/uploads/Clarity.png",
    link: "https://clarity-oscar.vercel.app/",
  },
];

export const TECH_GROUPS: TechGroup[] = [
  { category: "Frontend", color: "#5ec8ff", items: ["React", "Next.js", "Supabase", "PHP"] },
  { category: "Backend", color: "#3fd67a", items: ["Node.js", "Python", "Docker", "n8n"] },
  { category: "Data & Cloud", color: "#e8b000", items: ["MongoDB", "SQL", "PostgreSQL", "AWS"] },
  { category: "AI", color: "#a78bfa", items: ["PowerBI", "TensorFlow", "AI Agents", "REST API"] },
];

export const EXPERIENCE: ExperienceStep[] = [
  {
    phase: "Phase 01",
    title: "Associate Software Engineer",
    org: "LeftclickTech",
    period: "Apr 2026 - Present",
    live: true,
    progress: 62,
    description: "Developed a full-stack, in-house human resources and leave management system.",
    points: [
      "Built check-in/out, automatic invoice generation, email sending, ticketing, leave calendar, and leave balancing features.",
      "Developed automation workflows for AI content generation and bulk email.",
      "Worked closely with different LLMs and AI agents.",
    ],
  },
  {
    phase: "Phase 02",
    title: "Software Developer",
    org: "Amplify Views",
    period: "Jun - Dec 2025",
    live: false,
    progress: 100,
    description:
      "Built an AI-powered web platform focused on smooth user interactions and reliable backend integrations.",
    points: [
      "Developed an interactive AI conversation platform.",
      "Integrated external AI APIs for dynamic real-time responses.",
      "Implemented secure authentication and upload workflows.",
    ],
  },
  {
    phase: "Phase 03",
    title: "AI Content Generator",
    org: "Freelance",
    period: "Mar - Jul 2025",
    live: false,
    progress: 100,
    description:
      "Generated and optimized AI content while improving response quality through practical prompt engineering.",
    points: [
      "Generated and optimized content using AI workflows.",
      "Built prompt patterns for accurate and consistent responses.",
      "Researched market trends and tools for better output quality.",
    ],
  },
  {
    phase: "Phase 04",
    title: "Achievements",
    org: "TBC Startup Fest",
    period: "Kathmandu",
    live: false,
    progress: 100,
    description: "Recognized at The British College Startup Fest in Kathmandu for innovation and execution.",
    points: ["Selected in Top 50 ideas among 1000+ applicants.", "Won first runner-up award."],
  },
  {
    phase: "Phase 05",
    title: "Education & Certifications",
    org: "Taylor's University · IIMS",
    period: "2023 - 2026",
    live: false,
    progress: 100,
    description:
      "Built strong fundamentals through formal study and practical certifications in MERN and Python AI.",
    points: [
      "Bachelor of Computer Science, Taylor's University - IIMS College.",
      "MERN Stack Development Course (80 hours, 2025).",
      "Python with AI, Boardway Infosys (Dec 2024 - Feb 2025).",
    ],
  },
];

export const PROFILES: ProfileDef[] = [
  { id: "oscar", name: "Oscar", image: "/uploads/Profile_Image.png", order: ["experience", "projects", "tech", "about"] },
  { id: "recruiter", name: "Recruiter", initials: "R", className: "nx-avatar-recruiter", order: ["experience", "about", "projects", "tech"] },
  { id: "developer", name: "Developer", initials: "D", className: "nx-avatar-developer", order: ["projects", "tech", "experience", "about"] },
  { id: "guest", name: "Just Browsing", initials: "G", className: "nx-avatar-guest", order: ["experience", "projects", "tech", "about"] },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", id: "home" },
  { label: "Experience", id: "experience" },
  { label: "Tech Stack", id: "tech" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/oscar-dhamala-3b800a246/",
  github: "https://github.com/200-ui",
  whatsapp: "https://wa.me/9779869112525",
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=oscardhamala117@gmail.com",
};

export const CV_PATH = "/uploads/OscarDhamala_CV.pdf";

export const PROFILE_STORAGE_KEY = "oscarflix_profile";
