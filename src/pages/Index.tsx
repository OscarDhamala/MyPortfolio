
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import SpaceBackdrop from "@/components/SpaceBackdrop";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      <SpaceBackdrop />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Works />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
