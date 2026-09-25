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

export const SECTION_IDS = ["home", "journey", "stack", "work", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export interface NavLink {
  label: string;
  id: SectionId;
}

export const HERO = {
  headline: ["Builder.", "Brewer.", "Explorer."],
  body: "I'm a full-stack engineer who turns messy product and UX problems into software that ships, converts, and scales — with a habit of automating the boring parts.",
};

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
  { category: "Frontend", color: "#5ec8ff", items: ["React", "Next.js"] },
  { category: "Backend", color: "#3fd67a", items: ["PHP", "Node.js", "Python", "REST API"] },
  { category: "Data & Cloud", color: "#e8b000", items: ["Supabase", "Docker", "MongoDB", "SQL", "PostgreSQL", "AWS", "Power BI"] },
  { category: "AI & Automation", color: "#a78bfa", items: ["n8n", "TensorFlow", "AI Agents"] },
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

export const NAV_LINKS: NavLink[] = [
  { label: "Home", id: "home" },
  { label: "Journey", id: "journey" },
  { label: "Stack", id: "stack" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export const PROFILE_IMAGE = "/uploads/Profile_Image.png";

export const CV_PATH = "/uploads/OscarDhamala_CV.pdf";

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/oscar-dhamala-3b800a246/",
  github: "https://github.com/200-ui",
  whatsapp: "https://wa.me/9779869112525",
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=oscardhamala117@gmail.com",
};

export interface SearchItem {
  id: string;
  label: string;
  sublabel: string;
  sectionId: SectionId;
  keywords: string;
}

const toKeywords = (...parts: string[]) => parts.join(" ").toLowerCase();

export const SEARCH_INDEX: SearchItem[] = [
  ...NAV_LINKS.map((link): SearchItem => ({
    id: `nav-${link.id}`,
    label: link.label,
    sublabel: "Section",
    sectionId: link.id,
    keywords: toKeywords(link.label, "section", "page"),
  })),
  ...PROJECTS.map((project): SearchItem => ({
    id: `project-${project.id}`,
    label: project.name,
    sublabel: project.tagline,
    sectionId: "work",
    keywords: toKeywords(project.name, project.tagline, project.description, ...project.tags),
  })),
  ...TECH_GROUPS.flatMap((group) =>
    group.items.map((item): SearchItem => ({
      id: `tech-${group.category}-${item}`,
      label: item,
      sublabel: `${group.category} · Stack`,
      sectionId: "stack",
      keywords: toKeywords(item, group.category, "stack", "tech", "toolkit"),
    }))
  ),
  ...EXPERIENCE.map((step): SearchItem => ({
    id: `experience-${step.phase}`,
    label: step.title,
    sublabel: `${step.org} · Journey`,
    sectionId: "journey",
    keywords: toKeywords(step.title, step.org, step.phase, step.description),
  })),
  {
    id: "contact-email",
    label: "Email",
    sublabel: "Get in touch",
    sectionId: "contact",
    keywords: toKeywords("email", "contact", "mail", "get in touch"),
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    sublabel: "Get in touch",
    sectionId: "contact",
    keywords: toKeywords("linkedin", "contact", "social"),
  },
  {
    id: "contact-github",
    label: "GitHub",
    sublabel: "Get in touch",
    sectionId: "contact",
    keywords: toKeywords("github", "contact", "code", "social"),
  },
];

