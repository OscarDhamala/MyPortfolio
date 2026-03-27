
import React, { useState, useEffect } from "react";
import { Menu, Orbit, Rocket, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "TechStack", href: "#skills" },
  { name: "Works", href: "#works" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-slate-950/70 shadow-[0_10px_40px_rgba(2,6,23,0.45)] backdrop-blur-xl border-cyan-300/20"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a
            href="#home"
            className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 transition duration-300 hover:text-cyan-300 flex items-center gap-2"
          >
            <Orbit className="w-5 h-5 text-violet-300" />
            Oscar Dhamala
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 nav-shell px-4 py-2 rounded-full">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors duration-200 nav-link-space"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <Rocket className="w-4 h-4 text-amber-300 rocket-fly-slow" />
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-slate-200 hover:text-cyan-300 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-cyan-300/20">
          <div className="flex flex-col py-4 space-y-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="text-lg font-medium text-slate-200 hover:text-cyan-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
