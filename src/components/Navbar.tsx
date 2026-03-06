
import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "TechStack", href: "#skills" },
  { name: "Works", href: "#works" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isTerminal } = useTheme();

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? isTerminal 
            ? 'bg-black/90 border-terminal-green' 
            : 'bg-white/90 shadow-md backdrop-blur-sm border-gray-300' 
          : 'bg-transparent border-gray-400/60'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#home" className={`cursor-target text-xl md:text-2xl font-bold ${isTerminal ? 'font-mono text-terminal-green terminal-shadow' : ''}`}>
            {isTerminal ? "> OSCAR_DHAMALA" : "Oscar Dhamala"}
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className={`cursor-target text-sm font-medium hover:text-primary/80 transition-colors duration-200 ${
                  isTerminal ? 'font-mono hover:text-terminal-green' : ''
                }`}
              >
                {isTerminal ? `/${link.name.toLowerCase()}` : link.name}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="cursor-target p-2 rounded-md"
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
        <div className={`md:hidden ${
          isTerminal ? 'bg-black border-t border-terminal-green' : 'bg-white'
        }`}>
          <div className="flex flex-col py-4 space-y-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`cursor-target text-lg font-medium ${
                  isTerminal ? 'font-mono text-terminal-green' : ''
                }`}
              >
                {isTerminal ? `/${link.name.toLowerCase()}` : link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
