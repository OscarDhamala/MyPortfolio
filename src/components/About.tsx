
import React from "react";
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Rocket } from "lucide-react";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Code,
      title: "Clean Code",
      description: "I believe in writing clean, maintainable code that stands the test of time."
    },
    {
      icon: Palette,
      title: "Modern and Aesthetic Design",
      description: "Passionate about creating beautiful and functional user interfaces."
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Focused on building fast, efficient applications that users love."
    }
  ];

  return (
    <section id="about" ref={ref} className="py-10 relative overflow-hidden">
      <div className="orb orb-indigo"></div>
      <div className="absolute top-1/4 right-[15%] h-8 w-8 rounded-full border border-cyan-200/25 animate-float"></div>

      <div className="section-container relative z-10">
        <h2 className={`section-heading text-center transition-all duration-700 transform px-2 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          About Me
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Text Content - Slides in from left */}
          <div className={`order-2 lg:order-1 transition-all duration-700 transform px-3 sm:px-0 ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          style={{ transitionDelay: '0.2s' }}>
            <div className="text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6 text-slate-300">
              <p>
                Hi! I'm Oscar, a passionate full-stack developer with experience in building web applications. I love turning problems into simple, beautiful, and intuitive solutions.
              </p>
              
              <p>
                When I'm always learning to code, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while planning my next project.
              </p>

              <p>
                My goal is to create digital experiences that not only look great but also provide real value to users and businesses.
              </p>
            </div>
          </div>
          
          {/* Photo - Slides in from right */}
          <div className={`order-1 lg:order-2 flex justify-center transition-all duration-700 transform ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
          style={{ transitionDelay: '0.4s' }}>
            <div className="relative">
              <div className="profile-orbit"></div>
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 blur-2xl opacity-60"></div>
              <div className="relative w-80 h-80 rounded-[2.5rem] overflow-hidden border border-cyan-200/30 shadow-[0_20px_70px_rgba(14,116,144,0.35)] animate-float-slow hover:-translate-y-2 transition-transform duration-500 profile-planet">
                <img 
                  src="/uploads/3c6fdc70-50f1-4d5b-b622-2239ae5e64d7.png" 
                  alt="Oscar Dhamala" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
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
              className={`text-center p-6 rounded-2xl transition-all duration-700 transform hover:-translate-y-2 glass-panel space-card ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${0.6 + index * 0.2}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-[0_12px_28px_rgba(34,211,238,0.35)] ${inView ? 'animate-float-slow' : ''}`}
              style={{ animationDelay: `${1.2 + index * 0.3}s` }}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">
                {feature.title}
              </h3>
              <p className="text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
