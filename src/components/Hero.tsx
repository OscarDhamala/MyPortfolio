
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import Terminal from "./Terminal";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { isTerminal } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const fullText = isTerminal ? "Hello_World()" : "Hello, I'm Oscar Dhamala";
  const terminalCommands = [
    "whoami",
    "cat profile.json",
    "skills --list",
  ];

  useEffect(() => {
    // Reset animation state when terminal mode changes
    setDisplayText("");
    setCurrentIndex(0);
    setIsTypingComplete(false);
    setIsSubtitleVisible(false);
  }, [isTerminal]);

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
    <section 
      id="home" 
      className="min-h-screen relative overflow-hidden flex items-center"
      ref={heroRef}
    >
      {/* 3D Floating Elements - Only in normal mode */}
      {!isTerminal && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-black/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          
          <div className="absolute top-1/3 right-1/5 w-16 h-16 border-2 border-black/70 rounded-lg animate-float-fast" style={{ transform: 'rotate(12deg)' }}></div>
          <div className="absolute bottom-1/3 left-1/5 w-24 h-24 border-2 border-black/70 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
          
          <div className="absolute top-1/2 right-1/3 w-12 h-12 border border-black/70 animate-float-fast" style={{ transform: 'rotate(45deg)' }}></div>
        </>
      )}
      
      {/* Terminal Background Elements */}
      {isTerminal && (
        <>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-terminal-green/30 rounded-sm animate-spin-slow opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-terminal-green/20 rounded-sm animate-spin-medium opacity-20" style={{ animationDirection: 'reverse' }}></div>
          
          <div className="absolute top-1/3 right-1/5 w-16 h-16 bg-terminal-green/5 rounded-sm animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 left-1/5 w-24 h-24 bg-terminal-green/5 rounded-sm animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </>
      )}
      
      <div className="section-container grid md:grid-cols-2 gap-12 items-center z-10">
        <div className="text-center md:text-left">
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${isTerminal ? 'font-mono text-terminal-green terminal-shadow' : 'text-shine'}`}>
            {displayText}
            <span className={`typed-cursor ${isTerminal ? 'bg-terminal-green' : 'bg-black'}`}></span>
          </h1>
          
          <h2 
            className={`text-2xl md:text-3xl mb-8 transition-opacity duration-700 ${isTypingComplete ? 'opacity-100' : 'opacity-0'} ${isTerminal ? 'font-mono text-gray-400 cursor-terminal' : 'text-gradient'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            {isTerminal 
              ? '<FullStackDeveloper/>' 
              : 'Full Stack Developer'}
          </h2>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start transition-all duration-700 ${isSubtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.7s' }}
          >
            <a 
              href="https://www.linkedin.com/in/oscar-dhamala-3b800a246/" 
              className={`cursor-target btn-primary hover-translate ${isTerminal ? 'bg-terminal-green text-black hover:bg-terminal-green/80' : ''}`}
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/200-ui" 
              className="cursor-target btn-outline hover-translate"
            >
              GitHub
            </a>
          </div>
        </div>
        
        <div className="hidden md:block">
          {isTerminal ? (
            <div 
              className="transition-all duration-700 transform" 
              style={{ 
                opacity: isTypingComplete ? 1 : 0, 
                transform: isTypingComplete ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '0.8s'
              }}
            >
              <Terminal 
                commands={terminalCommands} 
                className="h-80"
              />
            </div>
          ) : (
            <div 
              className="transition-all duration-700 transform"
              style={{ 
                opacity: isTypingComplete ? 1 : 0, 
                transform: isTypingComplete ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '0.8s'
              }}
            >
              {/* Hanging Business Card */}
              <div className="relative w-full flex justify-center">
                {/* Extended Hanging String */}
                <div 
                  className="absolute top-0 left-1/2 w-1 h-40 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-400 transform -translate-x-0.5 shadow-sm"
                  style={{
                    transformOrigin: 'top center',
                    animation: 'stringSwing 4s ease-in-out infinite',
                    top: '-55px' // Extends way up to connect with navbar Skills
                  }}
                ></div>
                
                {/* Real ID Card - Tall Professional Format */}
                <div 
                  className="relative mt-10 w-80 h-96 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-2xl transform origin-top overflow-hidden"
                  style={{
                    transformOrigin: 'center top',
                    animation: 'cardSwing 0s ease-in-out infinite',
                    boxShadow: '0 35px 80px -12px rgba(0, 0, 0, 0.4)',
                    border: '3px solid transparent',
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%) border-box'
                  }}
                >
                  {/* Card Header - Premium Tall Format */}
                  <div className="bg-gradient-to-r from-red-600 via-blue-600 to-indigo-600 h-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                    <div className="relative z-10 p-6 flex items-center justify-between text-white">
                      <div>
                        <h3 className="text-2xl font-bold tracking-wide">DEVELOPER</h3>
                        <p className="text-sm opacity-90 font-medium">DIGITAL ID CARD</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                        <span className="text-3xl">👨‍💻</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Body - Tall Professional Format */}
                  <div className="p-6 space-y-5 bg-gradient-to-br from-gray-50/50 to-white/80 backdrop-blur-sm h-72">
                    {/* Photo and Name Section */}
                    <div className="text-center border-b border-gray-200/80 pb-4">
                      
                      <h2 className="text-2xl font-bold text-gray-800 tracking-wide">Oscar Dhamala</h2>
                      <p className="text-blue-600 font-semibold text-lg">Full Stack Developer</p>
                    </div>
                    
                    {/* Main Info Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/60 p-3 rounded-lg border border-gray-200/50">
                        <span className="text-gray-500 text-xs block font-medium uppercase tracking-wider">DEPARTMENT</span>
                        <span className="font-bold text-gray-800 text-base">Development</span>
                      </div>
                      <div className="bg-white/60 p-3 rounded-lg border border-gray-200/50">
                        <span className="text-gray-500 text-xs block font-medium uppercase tracking-wider">ID</span>
                        <span className="font-bold font-mono text-gray-800 text-base">#DEV001</span>
                      </div>
                      <div className="bg-white/60 p-3 rounded-lg border border-gray-200/50">
                        <span className="text-gray-500 text-xs block font-medium uppercase tracking-wider">STATUS</span>
                        <span className="text-green-600 font-bold flex items-center text-base">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                          Active
                        </span>
                      </div>
                      <div className="bg-white/60 p-3 rounded-lg border border-gray-200/50">
                        <span className="text-gray-500 text-xs block font-medium uppercase tracking-wider">LEVEL</span>
                        <span className="font-bold text-gray-800 text-base">Intermediate</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Shine Effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full"
                    style={{
                      animation: 'shine 4s ease-in-out infinite'
                    }}
                  ></div>
                                                    
                  {/* Holographic Strip */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-32 bg-gradient-to-b from-purple-400 via-blue-400 to-green-400 opacity-30 rounded-l-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <a 
        href="#about" 
        className="cursor-target absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover-translate z-10"
      >
        <ChevronDown className={`w-10 h-10 ${isTerminal ? 'text-terminal-green' : ''}`} />
      </a>
    </section>
  );
}
