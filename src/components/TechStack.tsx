import React from "react";
import { useInView } from 'react-intersection-observer';
import {
  Atom,
  BarChart3,
  Braces,
  BrainCircuit,
  Cloud,
  Container,
  Database,
  FileCode,
  Hexagon,
  Layers,
  Server,
  Workflow,
} from "lucide-react";

const techStack = [
  { label: "React", icon: <Atom className="w-5 h-5" />, orbit: "outer" },
  { label: "Next.js", icon: <span className="tech-orbit-mark">N</span>, orbit: "outer" },
  { label: "Node.js", icon: <Hexagon className="w-5 h-5" />, orbit: "outer" },
  { label: "PHP", icon: <FileCode className="w-5 h-5" />, orbit: "outer" },
  { label: "Python", icon: <Workflow className="w-5 h-5" />, orbit: "outer" },
  { label: "Docker", icon: <Container className="w-5 h-5" />, orbit: "outer" },
  { label: "Supabase", icon: <Layers className="w-5 h-5" />, orbit: "outer" },
  { label: "AWS", icon: <Cloud className="w-5 h-5" />, orbit: "inner" },
  { label: "MongoDB", icon: <Database className="w-5 h-5" />, orbit: "inner" },
  { label: "SQL", icon: <Server className="w-5 h-5" />, orbit: "inner" },
  { label: "REST API", icon: <Braces className="w-5 h-5" />, orbit: "inner" },
  { label: "PowerBI", icon: <BarChart3 className="w-5 h-5" />, orbit: "inner" },
  { label: "TensorFlow", icon: <BrainCircuit className="w-5 h-5" />, orbit: "inner" },
];

const outerTech = techStack.filter((item) => item.orbit === "outer");
const innerTech = techStack.filter((item) => item.orbit === "inner");

export default function TechStack() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" ref={ref} className="py-24 relative">
      <div className="orb orb-blue"></div>
      <div className="tech-orbit-ring"></div>
      <div className="absolute top-12 left-8 w-36 h-36 rounded-full border border-cyan-200/20 animate-spin-slow opacity-40"></div>
      <div className="absolute bottom-10 right-12 w-28 h-28 rounded-[1.2rem] border border-indigo-200/20 rotate-12 animate-float opacity-40"></div>

      <div className="section-container relative z-10">
        <h2 className="section-heading text-center tech-stack-heading">
          Preferred Tech Stack
        </h2>

        <div 
          className={`transition-all duration-700 transform ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="tech-orbit-stage" aria-label="Preferred technology stack">
            <div className="tech-orbit-glow"></div>
            <div className="tech-orbit-track tech-orbit-track-outer"></div>
            <div className="tech-orbit-track tech-orbit-track-inner"></div>

            <div className="tech-orbit-center">
              <BrainCircuit className="tech-orbit-center-icon" aria-hidden="true" />
            </div>

            <div className="tech-orbit tech-orbit-outer">
              {outerTech.map((item, index) => (
                <div
                  key={item.label}
                  className="tech-orbit-slot"
                  style={
                    {
                      "--angle": `${(360 / outerTech.length) * index}deg`,
                      "--delay": `${index * 0.08}s`,
                    } as React.CSSProperties
                  }
                >
                  <div className="tech-orbit-card">
                    <span className="tech-orbit-icon">{item.icon}</span>
                    <span className="tech-orbit-label">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="tech-orbit tech-orbit-inner">
              {innerTech.map((item, index) => (
                <div
                  key={item.label}
                  className="tech-orbit-slot"
                  style={
                    {
                      "--angle": `${(360 / innerTech.length) * index}deg`,
                      "--delay": `${0.28 + index * 0.08}s`,
                    } as React.CSSProperties
                  }
                >
                  <div className="tech-orbit-card">
                    <span className="tech-orbit-icon">{item.icon}</span>
                    <span className="tech-orbit-label">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
