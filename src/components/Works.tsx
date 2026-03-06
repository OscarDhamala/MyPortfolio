
import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { ExternalLink } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const { isTerminal } = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  useEffect(() => {
    if (inView) {
      const showProjects = () => {
        const newVisibleProjects = [...visibleProjects];
        const allProjectIds = projects.map(p => p.id);
        const remainingProjects = allProjectIds.filter(id => !visibleProjects.includes(id));
        
        if (remainingProjects.length > 0) {
          newVisibleProjects.push(remainingProjects[0]);
          setVisibleProjects(newVisibleProjects);
        }
      };
      
      if (visibleProjects.length < projects.length) {
        const interval = setInterval(showProjects, 200);
        return () => clearInterval(interval);
      }
    }
  }, [inView, visibleProjects]);

  return (
    <section id="works" className="py-10 relative" ref={ref}>
      {/* Background decorative elements */}
      {!isTerminal && (
        <>
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-black/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 rounded-full blur-3xl"></div>
        </>
      )}
      
      {/* Terminal mode background elements */}
      {isTerminal && (
        <>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 opacity-10 text-terminal-green font-mono text-xs animate-fade-in">
              {Array(20).fill(0).map((_, i) => (
                <div key={i} className="my-8">
                  {Array(Math.floor(Math.random() * 5) + 1).fill(0).map((_, j) => (
                    <div key={j}>
                      {Array(Math.floor(Math.random() * 40) + 10).fill(0).map((_, k) => (
                        Math.random() > 0.5 ? '1' : '0'
                      )).join('')}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      <div className="section-container">
        <h2 className={`section-heading text-center transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {isTerminal ? '> Recent_Projects' : 'My Work'}
        </h2>
        
        {/* Mobile Carousel View */}
        <div className={`md:hidden mb-12 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.2s' }}>
          <Carousel className="w-full">
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id}>
                  <div
                    className={`group overflow-hidden rounded-xl transition-all ${
                      isTerminal
                        ? 'bg-terminal-dark border border-terminal-green'
                        : 'bg-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <div
                        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-102"
                        style={{ backgroundImage: `url(${project.image})` }}
                      />
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center gap-4 ${
                        isTerminal ? 'bg-black/80' : 'bg-white/80'
                      }`}>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`cursor-target p-3 rounded-full ${
                            isTerminal
                              ? 'bg-terminal-green text-black hover:bg-terminal-green/80'
                              : 'bg-black text-white hover:bg-black/80'
                          } hover-translate`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-2 ${
                        isTerminal ? 'font-mono text-terminal-green' : 'text-gradient'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`mb-4 ${
                        isTerminal ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-3 py-1 rounded-full ${
                              isTerminal
                                ? 'bg-terminal-dark border border-terminal-green text-terminal-green'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={`${isTerminal ? 'border-terminal-green text-terminal-green' : ''}`} />
            <CarouselNext className={`${isTerminal ? 'border-terminal-green text-terminal-green' : ''}`} />
          </Carousel>
        </div>
        
        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group overflow-hidden rounded-xl transition-all transform ${
                isTerminal
                  ? 'bg-terminal-dark border border-terminal-green'
                  : 'bg-white shadow-lg hover:shadow-xl'
              } ${
                visibleProjects.includes(project.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              } hover-translate`}
              style={{ transitionDuration: '0.7s', transitionDelay: `${0.2 + (visibleProjects.indexOf(project.id) * 0.1)}s` }}
            >
              <div className="relative overflow-hidden aspect-video">
                <div
                  className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-102"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center gap-4 ${
                  isTerminal ? 'bg-black/80' : 'bg-white/80'
                }`}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`cursor-target p-3 rounded-full ${
                      isTerminal
                        ? 'bg-terminal-green text-black hover:bg-terminal-green/80'
                        : 'bg-black text-white hover:bg-black/80'
                    } hover-translate`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  isTerminal ? 'font-mono text-terminal-green' : 'text-gradient'
                }`}>
                  {project.title}
                </h3>
                <p className={`mb-4 ${
                  isTerminal ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-3 py-1 rounded-full ${
                        isTerminal
                          ? 'bg-terminal-dark border border-terminal-green text-terminal-green'
                          : 'bg-gray-100 text-gray-800'
                      } hover:scale-102 transition-transform`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
