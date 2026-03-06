
import React, { useEffect } from "react";
import { ThemeProvider } from "@/hooks/useTheme";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <TechStack />
          <Works />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
