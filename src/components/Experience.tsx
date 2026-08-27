import React, { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";

const journeySteps = [
  {
    phase: "Phase 01",
    title: "Associate Software Engineer (LeftclickTech)",
    period: "Apr 2026 - Present",
    description:
      "Developed a full-stack, in-house human resources and leave management system.",
    points: [
      "Built check-in/out, automatic invoice generation, email sending, ticketing, leave calendar, and leave balancing features.",
      "Developed automation workflows for AI content generation and bulk email.",
      "Worked closely with different LLMs and AI agents.",
    ],
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
    ],
  },
  {
    phase: "Phase 03",
    title: "AI Content Generator",
    period: "Mar - Jul 2025",
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
    period: "TBC Startup Fest",
    description:
      "Recognized at The British College Startup Fest in Kathmandu for innovation and execution.",
    points: [
      "Selected in Top 50 ideas among 1000+ applicants.",
      "Won first runner-up award.",
    ],
  },
  {
    phase: "Phase 05",
    title: "Education and Certifications",
    period: "2023 - 2026",
    description:
      "Built strong fundamentals through formal study and practical certifications in MERN and Python AI.",
    points: [
      "Bachelor of Computer Science, Taylor's University - IIMS College.",
      "MERN Stack Development Course (80 hours, 2025).",
      "Python with AI, Boardway Infosys (Dec 2024 - Feb 2025).",
    ],
  },
];

const finalCtaIndex = journeySteps.length;

const ExperienceCard = ({
  step,
  index,
  scrollProgress,
}: {
  step: typeof journeySteps[0];
  index: number;
  scrollProgress: number;
}) => {
  const cardProgress = scrollProgress;
  const offset = index - cardProgress;
  const distance = Math.abs(offset);
  const opacity = Math.max(0, 1 - distance * 0.9);
  const scale = 1 - Math.min(distance, 1) * 0.06;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4 transition-[opacity,transform,filter] md:py-10"
      style={{
        opacity,
        transform: `translateY(${offset * 88}%) scale(${scale})`,
        filter: distance > 0.6 ? "blur(5px)" : "blur(0px)",
        pointerEvents: distance < 0.5 ? "auto" : "none",
        transitionDuration: "850ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        className="glass-panel w-full max-h-full overflow-y-auto p-5 sm:p-8 md:p-14 rounded-[2rem] transition-all duration-700"
        style={{
          background: 'linear-gradient(160deg, rgba(28, 25, 23, 0.4), rgba(20, 18, 16, 0.2))',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        <div className="text-stone-500 text-xs md:text-sm tracking-[0.15em] uppercase mb-4 md:mb-6 font-semibold flex flex-wrap items-center gap-3">
          <span>{step.phase}</span>
          <span className="text-stone-700">•</span>
          <span>{step.period}</span>
        </div>

        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-stone-100 mb-6 tracking-tight">
          {step.title}
        </h3>

        <p className="text-stone-400 text-base md:text-lg leading-relaxed mb-6">
          {step.description}
        </p>

        <ul className="space-y-2 mt-6">
          {step.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-stone-400">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-600 mt-2.5 flex-shrink-0"></span>
              <span className="text-sm md:text-base">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const wheelRemainder = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const activeIndexRef = useRef(activeIndex);
  const isAnimatingRef = useRef(false);
  const isSettlingRef = useRef(false);
  const ctaReadyRef = useRef(false);
  const displayedCardIndex = Math.min(activeIndex, journeySteps.length - 1);
  const isCvRevealed = activeIndex === finalCtaIndex;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const sectionIsLockedInView = () => {
      if (!sectionRef.current) return false;
      const rect = sectionRef.current.getBoundingClientRect();
      return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
    };

    const sectionIsReadyToSettle = () => {
      if (!sectionRef.current) return false;
      const rect = sectionRef.current.getBoundingClientRect();
      const settleRange = Math.min(160, window.innerHeight * 0.22);

      return Math.abs(rect.top) <= settleRange;
    };

    const settleSection = () => {
      if (!sectionRef.current || isSettlingRef.current) return;

      isSettlingRef.current = true;
      sectionRef.current.scrollIntoView({ block: "start", behavior: "smooth" });

      window.setTimeout(() => {
        isSettlingRef.current = false;
      }, 420);
    };

    const moveExperience = (direction: 1 | -1) => {
      if (isAnimatingRef.current) return false;

      const nextIndex = activeIndexRef.current + direction;
      if (nextIndex < 0 || nextIndex > finalCtaIndex) return false;

      isAnimatingRef.current = true;
      ctaReadyRef.current = false;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      window.setTimeout(() => {
        isAnimatingRef.current = false;
        ctaReadyRef.current = nextIndex === finalCtaIndex;
      }, 760);

      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      const direction = event.deltaY > 0 ? 1 : -1;
      const atFirst = activeIndexRef.current === 0;
      const atLast = activeIndexRef.current === finalCtaIndex;

      if (!sectionIsLockedInView()) {
        if (
          sectionIsReadyToSettle() &&
          !((direction === 1 && atLast) || (direction === -1 && atFirst))
        ) {
          event.preventDefault();
          settleSection();
        }

        return;
      }

      if ((direction === 1 && atLast) || (direction === -1 && atFirst)) {
        wheelRemainder.current = 0;
        if (isAnimatingRef.current || (direction === 1 && !ctaReadyRef.current)) {
          event.preventDefault();
        }
        return;
      }

      event.preventDefault();
      if (isAnimatingRef.current || isSettlingRef.current) return;

      wheelRemainder.current += Math.abs(event.deltaY);

      if (wheelRemainder.current >= 85) {
        moveExperience(direction);
        wheelRemainder.current = 0;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!sectionIsLockedInView() || touchStartY.current === null) return;

      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined) return;

      const delta = touchStartY.current - currentY;
      if (Math.abs(delta) < 52) return;

      const direction = delta > 0 ? 1 : -1;
      const atFirst = activeIndexRef.current === 0;
      const atLast = activeIndexRef.current === finalCtaIndex;

      if ((direction === 1 && atLast) || (direction === -1 && atFirst)) {
        touchStartY.current = currentY;
        if (isAnimatingRef.current || (direction === 1 && !ctaReadyRef.current)) {
          event.preventDefault();
        }
        return;
      }

      event.preventDefault();
      moveExperience(direction);
      touchStartY.current = currentY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleNavClick = (index: number) => {
    ctaReadyRef.current = false;
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="experience-section relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden py-8 md:py-0">
        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 md:h-[75vh] md:flex-row md:gap-10 lg:gap-24 lg:px-8">
          <div className="experience-sidebar flex h-full w-full flex-col justify-center md:w-1/3">
            <h2 className="section-heading">
              Professional Path
            </h2>
            <p className="mb-12 hidden text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 md:mb-16 md:block">
              Scroll to explore
            </p>

            <div className="relative hidden space-y-8 md:block md:space-y-10">
              <div className="absolute bottom-2 left-[3px] top-2 w-[2px] bg-white/5"></div>

              {journeySteps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => handleNavClick(idx)}
                  className={`relative cursor-pointer pl-8 transition-all duration-700 ${
                    displayedCardIndex === idx
                      ? "translate-x-2 opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  {displayedCardIndex === idx && (
                    <div className="absolute left-[2px] top-1/2 h-8 w-[4px] -translate-y-1/2 rounded-full bg-stone-200 shadow-[0_0_12px_rgba(255,255,255,0.6)]"></div>
                  )}
                  <h4 className="mb-1 text-lg font-medium text-stone-200">
                    {step.title}
                  </h4>
                  <p className="text-sm font-medium text-stone-500">
                    {step.period}
                  </p>
                </div>
              ))}
            </div>

          </div>

          <div className="experience-content flex w-full flex-col items-center md:w-2/3">
            <div className="experience-card-viewport relative mt-56 h-[50vh] w-full overflow-hidden sm:h-[56vh] md:h-[61vh] md:mt-60">
              {journeySteps.map((step, idx) => (
                <ExperienceCard
                  key={idx}
                  step={step}
                  index={idx}
                  scrollProgress={displayedCardIndex}
                />
              ))}
            </div>

            <div
              className="relative flex h-20 items-center justify-center transition-[opacity,transform,filter] duration-700 md:right-12 lg:right-20"
              style={{
                opacity: isCvRevealed ? 1 : 0,
                transform: isCvRevealed
                  ? "translateY(0) scale(1)"
                  : "translateY(18px) scale(0.96)",
                filter: isCvRevealed ? "blur(0px)" : "blur(6px)",
                pointerEvents: isCvRevealed ? "auto" : "none",
              }}
            >
              <a
                href="/uploads/OscarDhamala_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-cyan-200/25 bg-white/[0.07] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-stone-100 shadow-[0_18px_45px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-100/50 hover:bg-white/[0.11] hover:shadow-[0_24px_60px_rgba(34,211,238,0.16)]"
              >
                <Download className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5" />
                View Full CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
