import React from "react";
import { useInView } from 'react-intersection-observer';
import {
  Atom,
  BarChart3,
  Braces,
  Brain,
  BrainCircuit,
  Cloud,
  Container,
  Database,
  FileCode,
  Hexagon,
  Layers,
  Network,
  Server,
  Workflow,
} from "lucide-react";

const techStack = [
  // Row 1 – Frontend
  { label: "React", icon: <Atom className="w-5 h-5" /> },
  { label: "Next.js", icon: <span className="tech-tile-mark">N</span> },
  { label: "Supabase", icon: <Layers className="w-5 h-5" /> },
  { label: "PHP", icon: <FileCode className="w-5 h-5" /> },
  // Row 2 – Backend
  { label: "Node.js", icon: <Hexagon className="w-5 h-5" /> },
  { label: "Python", icon: <Workflow className="w-5 h-5" /> },
  { label: "Docker", icon: <Container className="w-5 h-5" /> },
  { label: "n8n", icon: <Network className="w-5 h-5" /> },
  // Row 3 – Database & Cloud
  { label: "MongoDB", icon: <Database className="w-5 h-5" /> },
  { label: "SQL", icon: <Server className="w-5 h-5" /> },
  { label: "PostgreSQL", icon: <Database className="w-5 h-5" /> },
  { label: "AWS", icon: <Cloud className="w-5 h-5" /> },
  // Row 4 – AI
  { label: "PowerBI", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "TensorFlow", icon: <BrainCircuit className="w-5 h-5" /> },
  { label: "AI Agents", icon: <Brain className="w-5 h-5" /> },
  { label: "REST API", icon: <Braces className="w-5 h-5" /> },
];

export default function TechStack() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" ref={ref} className="py-24 relative">
      <div className="orb orb-blue"></div>

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
          <div className="tech-tile-grid" aria-label="Preferred technology stack">
            {techStack.map((item, index) => (
              <div
                key={item.label}
                className="tech-tile"
                style={
                  {
                    "--delay": `${index * 0.06}s`,
                  } as React.CSSProperties
                }
              >
                <span className="tech-tile-icon">{item.icon}</span>
                <span className="tech-tile-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
