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

const techRows = [
  [
    { label: "React", icon: <Atom className="w-5 h-5" /> },
    { label: "Next.js", icon: <span className="tech-pill-mark">N</span> },
    { label: "Node.js", icon: <Hexagon className="w-5 h-5" /> },
    { label: "Laravel", icon: <FileCode className="w-5 h-5" /> },
  ],
  [
    { label: "Python", icon: <Workflow className="w-5 h-5" /> },
    { label: "Docker", icon: <Container className="w-5 h-5" /> },
    { label: "Supabase", icon: <Layers className="w-5 h-5" /> },
    { label: "AWS", icon: <Cloud className="w-5 h-5" /> },
    { label: "MongoDB", icon: <Database className="w-5 h-5" /> },
  ],
  [
    { label: "PostgreSQL", icon: <Server className="w-5 h-5" /> },
    { label: "REST API", icon: <Braces className="w-5 h-5" /> },
    { label: "PowerBI", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "TensorFlow", icon: <BrainCircuit className="w-5 h-5" /> },
  ],
];

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
          <div className="tech-pill-board">
            {techRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className="tech-pill-row"
                style={{ animationDelay: `${rowIndex * 0.12}s` }}
              >
                {row.map((item, itemIndex) => (
                  <div
                    key={item.label}
                    className="tech-pill"
                    style={{ animationDelay: `${(rowIndex * 5 + itemIndex) * 0.06}s` }}
                  >
                    <span className="tech-pill-icon">{item.icon}</span>
                    <span className="tech-pill-label">{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="tech-pill-glow"></div>
            <div className="tech-pill-glow tech-pill-glow-alt"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
