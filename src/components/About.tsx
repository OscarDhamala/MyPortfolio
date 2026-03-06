
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Rocket } from "lucide-react";

export default function About() {
  const { isTerminal } = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Code,
      title: isTerminal ? "clean_code()" : "Clean Code",
      description: isTerminal 
        ? "Writing maintainable && scalable code" 
        : "I believe in writing clean, maintainable code that stands the test of time."
    },
    {
      icon: Palette,
      title: isTerminal ? "aesthetic_design()" : "Modern and Aesthetic Design", 
      description: isTerminal
        ? "Creating beautiful && functional interfaces"
        : "Passionate about creating beautiful and functional user interfaces."
    },
    {
      icon: Rocket,
      title: isTerminal ? "performance()" : "Performance",
      description: isTerminal
        ? "Optimizing for speed && efficiency"
        : "Focused on building fast, efficient applications that users love."
    }
  ];

  return (
    <section id="about" ref={ref} className={`py-10 relative overflow-hidden ${isTerminal ? 'bg-terminal-dark' : 'bg-white'}`}>
      {/* Background decorative elements */}
      {!isTerminal && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-50 to-transparent rounded-full blur-2xl opacity-40"></div>
          
          {/* Floating shapes */}
          <div className="absolute top-1/4 left-1/5 w-4 h-4 bg-blue-300 rounded-full animate-float opacity-30"></div>
          <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-purple-300 rounded-full animate-float-slow opacity-30" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/6 w-3 h-3 bg-pink-300 rounded-full animate-float opacity-30" style={{ animationDelay: '1s' }}></div>
        </>
      )}

      {/* Terminal mode background elements */}
      {isTerminal && (
        <>
          <div className="absolute top-10 right-10 w-40 h-40 border border-terminal-green/10 rounded-lg animate-spin-slow"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 border border-terminal-green/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/5 text-terminal-green/5 text-6xl font-mono animate-pulse">{"{ }"}</div>
        </>
      )}

      <div className="section-container relative z-10">
        <h2 className={`section-heading text-center transition-all duration-700 transform px-2 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {isTerminal ? '> About_Me' : 'About Me'}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Text Content - Slides in from left */}
          <div className={`order-2 lg:order-1 transition-all duration-700 transform px-3 sm:px-0 ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          style={{ transitionDelay: '0.2s' }}>
            <div className={`text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6 ${
              isTerminal ? 'font-mono text-gray-300' : 'text-gray-600'
            }`}>
              <p>
                {isTerminal ? (
                  <>
                    <span className="text-terminal-green">const</span> oscar = &#123;<br/>
                    &nbsp;&nbsp;passion: <span className="text-yellow-400">"building amazing web experiences"</span>,<br/>
                    &nbsp;&nbsp;experience: <span className="text-yellow-400">"1+ years"</span>,<br/>
                    &nbsp;&nbsp;location: <span className="text-yellow-400">"Nepal"</span><br/>
                    &#125;;
                  </>
                ) : (
                  "Hi! I'm Oscar, a passionate full-stack developer with experience in building web applications. I love turning problems into simple, beautiful, and intuitive solutions."
                )}
              </p>
              
              <p>
                {isTerminal ? (
                  <>
                    <span className="text-terminal-green">// Specializing in modern web technologies</span><br/>
                    oscar.skills = [<span className="text-yellow-400">"React"</span>, <span className="text-yellow-400">"Node.js"</span>, <span className="text-yellow-400">"Python"</span>, <span className="text-yellow-400">"TypeScript"</span>];
                  </>
                ) : (
                  "When I'm always learning to code, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while planning my next project."
                )}
              </p>
              
              {!isTerminal && (
                <p>
                  My goal is to create digital experiences that not only look great but also provide real value to users and businesses.
                </p>
              )}
            </div>
          </div>
          
          {/* Photo - Slides in from right */}
          <div className={`order-1 lg:order-2 flex justify-center transition-all duration-700 transform ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
          style={{ transitionDelay: '0.4s' }}>
            <div className="relative">
              {/* Background decoration for photo */}
              <div className={`absolute -inset-4 rounded-full blur-2xl opacity-20 ${
                isTerminal ? 'bg-terminal-green' : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}></div>
              
              <div className={`relative w-80 h-80 rounded-full overflow-hidden border-4 ${
                isTerminal ? 'border-terminal-green' : 'border-black'
              } shadow-2xl hover-translate animate-float-slow`}>
                <img 
                  src="/uploads/3c6fdc70-50f1-4d5b-b622-2239ae5e64d7.png" 
                  alt="Oscar Dhamala" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature boxes - Fade in with staggered timing */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`cursor-target text-center p-6 rounded-xl transition-all duration-700 transform hover:-translate-y-2 ${
                isTerminal 
                  ? 'bg-black border border-terminal-green hover:border-terminal-green/60' 
                  : 'bg-gray-50 hover:bg-gray-100 hover:shadow-lg'
              } ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${0.6 + index * 0.2}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 ${
                isTerminal ? 'bg-terminal-green text-black' : 'bg-black text-white'
              } ${
                inView ? 'animate-float-slow' : ''
              }`}
              style={{ animationDelay: `${1.2 + index * 0.3}s` }}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${
                isTerminal ? 'font-mono text-terminal-green' : ''
              }`}>
                {feature.title}
              </h3>
              <p className={`${
                isTerminal ? 'text-gray-400 font-mono text-sm' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
