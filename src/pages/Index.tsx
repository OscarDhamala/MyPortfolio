import React from "react";
import Navbar from "@/components/Navbar";
import SocialSidebar from "@/components/SocialSidebar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Works from "@/components/Works";
import SpaceBackdrop from "@/components/SpaceBackdrop";
import GlassBreakIntro from "@/components/GlassBreakIntro";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-clip relative">
      <SpaceBackdrop />
      <Navbar />
      <SocialSidebar />
      <main className="flex-grow relative z-10">
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Works />
      </main>
      <Footer />
      <GlassBreakIntro />
    </div>
  );
};

export default Index;
