import React from "react";
import { useTheme } from "@/hooks/useTheme";
import GlassIcons from "./GlassIcons";
import { useInView } from 'react-intersection-observer';

// Tech stack icons - using simple SVG paths for better compatibility
const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 2L4.5 20L12 22L19.5 20L21 2H3ZM17.5 6H8L8.5 10H17L16.5 14L12 15.5L7.5 14L7.25 12H9.75L9.88 13L12 13.5L14.13 13L14.25 11H7L6 5H18L17.5 6Z"/>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 10.11C13.03 10.11 13.87 10.95 13.87 12C13.87 13.05 13.03 13.89 12 13.89C10.97 13.89 10.13 13.05 10.13 12C10.13 10.95 10.97 10.11 12 10.11M7.37 20C8.11 18.75 9.69 17.24 12 16.08C14.31 17.24 15.89 18.75 16.63 20C15.89 21.25 14.31 22.76 12 23.92C9.69 22.76 8.11 21.25 7.37 20M12 23.92C9.69 22.76 8.11 21.25 7.37 20C8.11 18.75 9.69 17.24 12 16.08C14.31 17.24 15.89 18.75 16.63 20C15.89 21.25 14.31 22.76 12 23.92M20 12C18.75 11.26 17.24 9.68 16.08 7.37C17.24 5.06 18.75 3.44 20 2.68C21.25 3.44 22.76 5.06 23.92 7.37C22.76 9.68 21.25 11.26 20 12M23.92 7.37C22.76 5.06 21.25 3.44 20 2.68C18.75 3.44 17.24 5.06 16.08 7.37C17.24 9.68 18.75 11.26 20 12C21.25 11.26 22.76 9.68 23.92 7.37M4 12C5.25 11.26 6.76 9.68 7.92 7.37C6.76 5.06 5.25 3.44 4 2.68C2.75 3.44 1.24 5.06 0.08 7.37C1.24 9.68 2.75 11.26 4 12M0.08 7.37C1.24 5.06 2.75 3.44 4 2.68C5.25 3.44 6.76 5.06 7.92 7.37C6.76 9.68 5.25 11.26 4 12C2.75 11.26 1.24 9.68 0.08 7.37M7.37 4C8.11 5.25 9.69 6.76 12 7.92C14.31 6.76 15.89 5.25 16.63 4C15.89 2.75 14.31 1.24 12 0.08C9.69 1.24 8.11 2.75 7.37 4M12 0.08C14.31 1.24 15.89 2.75 16.63 4C15.89 5.25 14.31 6.76 12 7.92C9.69 6.76 8.11 5.25 7.37 4C8.11 2.75 9.69 1.24 12 0.08Z"/>
  </svg>
);

const JavaScriptIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3H21V21H3V3M7.73 18.04C8.13 18.89 8.92 19.59 10.27 19.59C11.77 19.59 12.8 18.79 12.8 17.04V11.26H11.1V17C11.1 17.86 10.75 18.08 10.2 18.08C9.62 18.08 9.38 17.68 9.11 17.21L7.73 18.04M13.71 17.86C14.21 18.84 15.22 19.59 16.8 19.59C18.4 19.59 19.6 18.76 19.6 17.23C19.6 15.82 18.79 15.19 17.35 14.57L16.93 14.39C16.2 14.08 15.89 13.87 15.89 13.45C15.89 13.10 16.16 12.81 16.57 12.81C16.97 12.81 17.25 13.00 17.44 13.45L18.68 12.67C18.16 11.74 17.66 11.26 16.59 11.26C15.22 11.26 14.23 12.14 14.23 13.43C14.23 14.82 15.04 15.45 16.28 15.97L16.70 16.15C17.20 16.38 17.49 16.62 17.49 17.04C17.49 17.5 17.09 17.81 16.58 17.81C15.95 17.81 15.54 17.46 15.31 16.98L13.71 17.86Z"/>
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1.85C11.73,1.85 11.45,1.92 11.22,2.05L3.78,6.35C3.32,6.61 3.03,7.12 3.03,7.67V16.33C3.03,16.88 3.32,17.39 3.78,17.65L5.73,18.77C6.68,19.23 7.17,19.24 7.79,19.24C9.5,19.24 10.5,18.2 10.5,16.42V7.96C10.5,7.8 10.37,7.67 10.21,7.67H9.04C8.88,7.67 8.75,7.8 8.75,7.96V16.42C8.75,17.2 8.29,17.65 7.79,17.65C7.58,17.65 7.15,17.65 6.5,17.27L4.95,16.33C4.78,16.22 4.78,16.11 4.78,16.11V7.67C4.78,7.67 4.78,7.56 4.95,7.45L12.05,3.35C12.22,3.24 12.78,3.24 12.95,3.35L20.05,7.45C20.22,7.56 20.22,7.67 20.22,7.67V16.33C20.22,16.33 20.22,16.44 20.05,16.55L12.95,20.65C12.78,20.76 12.22,20.76 12.05,20.65L10.32,19.56C10.14,19.45 9.95,19.45 9.95,19.45C9.5,19.45 9.41,19.85 9.77,20.05L12,21.15C12.27,21.28 12.55,21.35 12.82,21.35C13.09,21.35 13.37,21.28 13.64,21.15L20.77,16.85C21.23,16.59 21.52,16.08 21.52,15.53V8.87C21.52,8.32 21.23,7.81 20.77,7.55L13.64,3.25C13.41,3.12 13.14,3.05 12.87,3.05L12,1.85Z"/>
  </svg>
);

const SupabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.362 9.354H12.848C10.539 9.354 9.095 7.126 10.152 5.206L15.49 -4.667C15.788 -5.174 16.488 -5.174 16.786 -4.667L22.124 5.206C23.181 7.126 21.737 9.354 19.428 9.354H21.362ZM2.638 14.646H11.152C13.461 14.646 14.905 16.874 13.848 18.794L8.51 28.667C8.212 29.174 7.512 29.174 7.214 28.667L1.876 18.794C0.819 16.874 2.263 14.646 4.572 14.646H2.638Z"/>
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.585,11.692h4.328c2.022,0,3.624-1.657,3.624-3.692V4.308 c0-2.242-1.892-3.927-4.134-4.222C12.457,0.024,11.514,0,10.641,0C9.767,0,8.824,0.024,7.878,0.087 C5.636,0.381,3.744,2.066,3.744,4.308V6h4.328v0.615H2.457c-2.022,0-3.788,1.215-4.341,3.523C-2.343,11.835-2.4,12.800-2.4,13.692 c0,0.891,0.057,1.857,0.516,3.554C-1.33,19.502-0.013,20.769,2.009,20.769h2.286v-3.031C4.295,15.434,6.469,13.231,9.585,11.692z M7.693,2.615c-0.688,0-1.249-0.568-1.249-1.269s0.561-1.269,1.249-1.269s1.249,0.568,1.249,1.269S8.381,2.615,7.693,2.615z"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,3C7.58,3 4,4.79 4,7V17C4,19.21 7.59,21 12,21C16.41,21 20,19.21 20,17V7C20,4.79 16.42,3 12,3M18,17C18,17.5 15.87,19 12,19C8.13,19 6,17.5 6,17V14.77C7.61,15.55 9.72,16 12,16C14.28,16 16.39,15.55 18,14.77V17M18,12.45C16.7,13.4 14.42,14 12,14C9.58,14 7.3,13.4 6,12.45V9.64C7.47,10.47 9.61,11 12,11C14.39,11 16.53,10.47 18,9.64V12.45M12,9C8.13,9 6,7.5 6,7C6,6.5 8.13,5 12,5C15.87,5 18,6.5 18,7C18,7.5 15.87,9 12,9Z"/>
  </svg>
);

const techStackItems = [
  { icon: <HtmlIcon />, color: 'red', label: 'HTML/CSS' },
  { icon: <JavaScriptIcon />, color: 'orange', label: 'JavaScript' },
  { icon: <ReactIcon />, color: 'blue', label: 'React' },
  { icon: <NodeIcon />, color: 'green', label: 'Node.js' },
  { icon: <PythonIcon />, color: 'indigo', label: 'Python' },
  { icon: <DatabaseIcon />, color: 'purple', label: 'Database' },
  { icon: <TailwindIcon />, color: 'cyan', label: 'Tailwind' },
  { icon: <SupabaseIcon />, color: 'teal', label: 'Supabase' },
];

export default function TechStack() {
  const { isTerminal } = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" ref={ref} className={`py-24 relative ${isTerminal ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Background decorative elements */}
      {!isTerminal && (
        <>
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-black/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-black/5 rounded-full blur-3xl"></div>
        </>
      )}
      
      {/* Terminal mode background elements */}
      {isTerminal && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-20 opacity-20 border-b border-terminal-green/20"></div>
            <div className="absolute bottom-0 left-0 w-full h-20 opacity-20 border-t border-terminal-green/20"></div>
            <div className="absolute top-10 left-10 w-40 h-40 border border-terminal-green/20 animate-spin-slow opacity-10"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 border border-terminal-green/20 animate-spin-medium opacity-10"></div>
          </div>
        </>
      )}

      <div className="section-container relative z-10">
        <h2 className="section-heading text-center">
          {isTerminal ? '> Tech_Stack' : 'Tech Stack'}
        </h2>
        
        <div className="text-center mb-12">
          <p className={`text-lg ${
            isTerminal ? 'text-gray-400 font-mono' : 'text-gray-600'
          }`}>
          </p>
        </div>

        {/* Tech Stack Glass Icons */}
        <div 
          className={`transition-all duration-700 transform ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div style={{ height: '300px', position: 'relative' }}>
            <GlassIcons 
              items={techStackItems} 
              className={isTerminal ? 'terminal-theme' : ''}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
