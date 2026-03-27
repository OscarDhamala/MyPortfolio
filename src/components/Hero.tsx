
import React, { useState, useEffect } from "react";
import { ChevronDown, Rocket } from "lucide-react";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const fullText = "Hello, I'm Oscar Dhamala";

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsTypingComplete(false);
    setIsSubtitleVisible(false);
  }, []);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + fullText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
      setTimeout(() => {
        setIsSubtitleVisible(true);
      }, 500);
    }
  }, [currentIndex, fullText]);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center">
      <div className="orb orb-cyan"></div>
      <div className="orb orb-indigo"></div>
      <div className="orb orb-blue"></div>
      <div className="absolute top-24 right-[12%] h-20 w-20 rounded-2xl border border-cyan-200/25 rotate-12 animate-float"></div>
      <div className="absolute bottom-24 left-[10%] h-14 w-14 rounded-full border border-indigo-200/30 animate-float-slow"></div>
      <Rocket className="absolute top-20 left-[14%] w-8 h-8 text-amber-300 rocket-fly" />
      
      <div className="section-container grid md:grid-cols-2 gap-12 items-center z-10">
        <div className="text-center md:text-left">
          <div className="space-badge mb-5 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            Mission Control: Building Digital Products
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 hero-title">
            {displayText}
            <span className="typed-cursor"></span>
          </h1>
          
          <h2
            className={`text-2xl md:text-3xl mb-8 transition-opacity duration-700 text-cyan-100/85 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: "0.5s" }}
          >
            Full Stack Developer
          </h2>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start transition-all duration-700 ${isSubtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: "0.7s" }}
          >
            <a 
              href="https://www.linkedin.com/in/oscar-dhamala-3b800a246/" 
              className="btn-primary"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/200-ui" 
              className="btn-outline"
            >
              GitHub
            </a>
          </div>
        </div>
        
        <div className="block">
          <div
            className="transition-all duration-700 transform"
            style={{
              opacity: isTypingComplete ? 1 : 0,
              transform: isTypingComplete ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "0.8s",
            }}
          >
            <div className="hero-visual-wrap">
              <div className="workstation-3d" aria-label="3D desktop workstation scene">
                <div className="ws-wall-glow"></div>

                <div className="ws-monitor">
                  <div className="ws-monitor-screen">
                    <span className="ws-line ws-line-1"></span>
                    <span className="ws-line ws-line-2"></span>
                    <span className="ws-line ws-line-3"></span>
                  </div>
                </div>
                <div className="ws-monitor-stand"></div>
                <div className="ws-desk"></div>

                <div className="ws-character">
                  <div className="ws-head"></div>
                  <div className="ws-body"></div>
                  <div className="ws-arm"></div>
                </div>

                <div className="ws-chair">
                  <div className="ws-chair-back"></div>
                  <div className="ws-chair-seat"></div>
                  <div className="ws-chair-leg"></div>
                </div>

                <div className="ws-floor-shadow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 text-cyan-300 hover:text-cyan-200 transition-colors"
      >
        <ChevronDown className="w-10 h-10" />
      </a>
    </section>
  );
}
