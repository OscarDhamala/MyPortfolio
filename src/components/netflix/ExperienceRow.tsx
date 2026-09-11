import { Check } from "lucide-react";
import Row from "./Row";
import { EXPERIENCE, ExperienceStep } from "@/data/portfolioData";

interface ExperienceRowProps {
  onOpen: (step: ExperienceStep) => void;
}

export default function ExperienceRow({ onOpen }: ExperienceRowProps) {
  return (
    <Row id="experience" title="Continue Watching: My Journey" subtitle="5 episodes">
      {EXPERIENCE.map((step, index) => {
        const hue = 355 - index * 18;
        return (
          <article
            key={step.phase}
            className="nx-exp-card"
            onClick={() => onOpen(step)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") onOpen(step);
            }}
          >
            <div
              className="nx-exp-media"
              style={{ background: `linear-gradient(150deg, hsl(${hue} 70% 22%), hsl(${hue - 20} 55% 12%))` }}
            >
              <div className="nx-exp-phase">{step.phase}</div>
              {step.live ? (
                <span className="nx-exp-live">
                  <span className="nx-dot" />
                  Now Streaming
                </span>
              ) : (
                <span className="nx-exp-live nx-exp-done">
                  <Check size={12} />
                  Completed
                </span>
              )}
              <div className="nx-exp-title-big">{step.title}</div>
            </div>
            <div className="nx-exp-progress">
              <div className="nx-exp-progress-fill" style={{ width: `${step.progress}%` }} />
            </div>
            <div className="nx-exp-info">
              <div className="nx-exp-period">
                {step.period} &middot; {step.org}
              </div>
              <div className="nx-exp-role">{step.title}</div>
            </div>
          </article>
        );
      })}
    </Row>
  );
}
