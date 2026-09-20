import { useEffect } from "react";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import Work from "@/components/portfolio/Work";
import Stack from "@/components/portfolio/Stack";
import Journey from "@/components/portfolio/Journey";
import Contact from "@/components/portfolio/Contact";
import SiteFooter from "@/components/portfolio/SiteFooter";
import GridBackground from "@/components/portfolio/GridBackground";
import { useActiveSection } from "@/hooks/use-active-section";
import { SECTION_IDS } from "@/data/portfolioData";

const Index = () => {
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    document.title = "Oscar Dhamala";
  }, []);

  return (
    <div className="relative min-h-screen text-foreground">
      <GridBackground />
      <Nav active={active} />
      <main className="pt-[104px]">
        <Hero />
        <Journey />
        <Stack />
        <Work />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
