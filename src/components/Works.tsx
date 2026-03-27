
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Rocket } from "lucide-react";
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    id: 1,
    title: "Amplify AI - Your intelligent conversation companion",
    description: "The AI chat application build on React, Typescript, Supabase and Edge function for customized poppy AI integration.",
    tags: ["React", "TypeScript", "Supabase", "Database", "Edge Function", "Poppy AI API"],
    image: "/uploads/Amplify.png",
    link: "https://www.growonyt.com/",
  },
  {
    id: 2,
    title: "GymBuddy - Gym Management System",
    description: "A perfect Gym Management System build using PHP and MySQL database.",
    tags: ["PHP", "MySQL", "Tailwind CSS", "JSON", "AJAX"],
    image: "/uploads/SS2.png",
    link: "https://www.youtube.com/watch?v=YiwaMS80IBo",
  },

    {
    id: 3,
    title: "Clarity - Your AI powered Personal Finance Tracker",
    description: "MERN architecture integrated with AI to automatically categorize the Expense and Income as per user Input.",
    tags: ["React", "Node.js", "Express", "MongoDB", "AI"],
    image: "/uploads/Clarity.png",
    link: "https://clarity-oscar.vercel.app/",
  },
];

export default function Works() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    const interval = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [inView]);

  const activeProject = projects[activeProjectIndex];

  const showNextProject = () => {
    setActiveProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const showPreviousProject = () => {
    setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="works" className="py-10 relative" ref={ref}>
      <div className="orb orb-cyan"></div>
      <div className="absolute -top-12 right-8 w-44 h-44 border border-cyan-200/15 rounded-full"></div>
      <Rocket className="absolute left-[8%] top-24 w-8 h-8 text-amber-300 rocket-fly" />
      
      <div className="section-container">
        <h2 className={`section-heading text-center transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          My Work
        </h2>

        <div
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="hanging-showcase-wrap">
            <div className="hanging-rope"></div>

            <article key={activeProject.id} className="hanging-project-card space-card glass-panel">
              <div className="relative overflow-hidden rounded-2xl hanging-project-media">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="hanging-project-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-4 top-4 p-3 rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-slate-100">
                  {activeProject.title}
                </h3>
                <p className="mb-4 text-slate-300 text-sm md:text-base leading-relaxed">
                  {activeProject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-cyan-200/25 bg-slate-900/70 text-cyan-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <div className="hanging-controls">
              <button
                onClick={showPreviousProject}
                aria-label="Show previous project"
                className="hanging-control-btn"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="hanging-dots">
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => setActiveProjectIndex(index)}
                    className={`hanging-dot ${index === activeProjectIndex ? 'is-active' : ''}`}
                    aria-label={`Show project ${index + 1}`}
                  ></button>
                ))}
              </div>

              <button
                onClick={showNextProject}
                aria-label="Show next project"
                className="hanging-control-btn"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
