import { Github, Info, Linkedin, Play } from "lucide-react";
import { CV_PATH, SOCIAL } from "@/data/portfolioData";

interface HeroBannerProps {
  eyebrow: string;
  onInfo: () => void;
}

export default function HeroBanner({ eyebrow, onInfo }: HeroBannerProps) {
  return (
    <section className="nx-hero" id="home">
      <div className="nx-hero-bg">
        <div className="nx-orb nx-hero-orb-1" />
        <div className="nx-orb nx-hero-orb-2" />
        <img src="/uploads/Profile_Image_cutout.png" alt="" />
        <div className="nx-hero-scrim" />
      </div>

      <div className="nx-hero-content">
        <p className="nx-hero-eyebrow">{eyebrow}</p>
        <h1 className="nx-hero-title">Oscar Dhamala</h1>
        <p className="nx-hero-role">Software Engineer</p>

        <div className="nx-hero-meta">
          <span className="nx-meta-chip">FS</span>
          <span className="nx-meta-chip">AI</span>
          <span>2026</span>
          <span>&middot;</span>
          <span>Full&#8209;Stack</span>
          <span>&middot;</span>
          <span>Kathmandu, NP</span>
        </div>

        <p className="nx-hero-desc">
          Hi, I&rsquo;m Oscar &mdash; a full-stack engineer who loves turning problems into simple, beautiful, intuitive
          solutions. Explore my journey, projects and stack below.
        </p>

        <div className="nx-hero-actions">
          <a className="nx-btn nx-btn-play" href={CV_PATH} target="_blank" rel="noopener noreferrer">
            <Play size={20} fill="currentColor" />
            Play CV
          </a>
          <button className="nx-btn nx-btn-info" type="button" onClick={onInfo}>
            <Info size={20} />
            More Info
          </button>
          <div className="nx-hero-social">
            <a className="nx-circle-btn" href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a className="nx-circle-btn" href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
