import React from "react";
import { useInView } from "react-intersection-observer";
import { BrainCircuit, BriefcaseBusiness, GraduationCap, Trophy } from "lucide-react";

const journeySteps = [
  {
    phase: "Phase 01",
    title: "AI Content Generator",
    period: "Mar - Jul 2025",
    description:
      "Generated and optimized AI content while improving response quality through practical prompt engineering.",
    points: [
      "Generated and optimized content using AI workflows.",
      "Built prompt patterns for accurate and consistent responses.",
      "Researched market trends and tools for better output quality.",
    ],
    icon: BrainCircuit,
    tone: "amber",
  },
  {
    phase: "Phase 02",
    title: "Software Developer (Amplify Views)",
    period: "Jun - Dec 2025",
    description:
      "Built an AI-powered web platform focused on smooth user interactions and reliable backend integrations.",
    points: [
      "Developed an interactive AI conversation platform.",
      "Integrated external AI APIs for dynamic real-time responses.",
      "Implemented secure authentication and upload workflows.",
      "Collaborated with team and client to ship scalable features.",
    ],
    icon: BriefcaseBusiness,
    tone: "blue",
  },
  {
    phase: "Phase 03",
    title: "Achievements",
    period: "TBC Startup Fest",
    description:
      "Recognized at The British College Startup Fest in Kathmandu for innovation and execution.",
    points: [
      "Selected in Top 50 ideas among 1000+ applicants.",
      "Won first runner-up award.",
    ],
    icon: Trophy,
    tone: "indigo",
  },
  {
    phase: "Phase 04",
    title: "Education and Certifications",
    period: "2023 - 2026",
    description:
      "Built strong fundamentals through formal study and practical certifications in MERN and Python AI.",
    points: [
      "Bachelor of Computer Science, Taylor's University - IIMS College.",
      "MERN Stack Development Course (80 hours, 2025).",
      "Python with AI, Boardway Infosys (Dec 2024 - Feb 2025).",
    ],
    icon: GraduationCap,
    tone: "emerald",
  },
];

export default function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" ref={ref} className="py-16 relative overflow-hidden">
      <div className="orb orb-indigo"></div>
      <div className="absolute top-[9%] left-[8%] w-36 h-36 rounded-full border border-amber-300/20 animate-float opacity-40"></div>

      <div className="section-container relative z-10">
        <h2
          className={`section-heading text-center journey-heading transition-all duration-700 transform ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          My Proven Experience
        </h2>

        <p
          className={`max-w-3xl mx-auto text-center text-slate-300 mb-14 transition-all duration-700 transform ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.12s" }}
        >
          A focused timeline of my real-world journey from AI content systems to full-stack product delivery.
        </p>

        <div className="journey-timeline">
          <div className="journey-axis"></div>

          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            const sideClass = index % 2 === 0 ? "left" : "right";

            return (
              <article
                key={step.title}
                className={`journey-stage ${sideClass} ${step.tone} transition-all duration-700 transform ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${0.18 + index * 0.14}s` }}
              >
                <span className="journey-node" aria-hidden="true"></span>

                <div className="journey-card-shell glass-panel space-card">
                  <div className="journey-meta">
                    <div className="journey-icon-box">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="journey-phase">{step.phase}</span>
                  </div>

                  <div className="journey-header-row">
                    <h3 className="journey-title">{step.title}</h3>
                    <span className="journey-period">{step.period}</span>
                  </div>

                  <p className="journey-description">{step.description}</p>

                  <ul className="journey-points">
                    {step.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/uploads/OscarDhamala_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center rounded-full"
          >
            View Full CV
          </a>
        </div>
      </div>
    </section>
  );
}
