import { useState } from "react";
import TopNav from "./TopNav";
import HeroBanner from "./HeroBanner";
import ExperienceRow from "./ExperienceRow";
import ProjectsRow from "./ProjectsRow";
import TechRow from "./TechRow";
import ContactBanner from "./ContactBanner";
import DetailModal from "./DetailModal";
import Footer from "@/components/Footer";
import { ModalState, ProfileDef, RowKey } from "@/data/portfolioData";

const EYEBROW: Record<string, string> = {
  oscar: "OSCAR DHAMALA ORIGINAL",
  recruiter: "RECOMMENDED FOR RECRUITERS",
  developer: "RECOMMENDED FOR DEVELOPERS",
  guest: "OSCAR DHAMALA ORIGINAL",
};

interface AppExperienceProps {
  profile: ProfileDef;
  onSwitchProfile: (id: string) => void;
  onBackToProfiles: () => void;
}

export default function AppExperience({ profile, onSwitchProfile, onBackToProfiles }: AppExperienceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState<ModalState>(null);

  const renderRow = (key: Exclude<RowKey, "about">) => {
    if (key === "experience") {
      return <ExperienceRow key="experience" onOpen={(step) => setModal({ type: "experience", data: step })} />;
    }
    if (key === "projects") {
      return (
        <ProjectsRow
          key="projects"
          searchQuery={searchQuery}
          onOpen={(project) => setModal({ type: "project", data: project })}
        />
      );
    }
    return <TechRow key="tech" searchQuery={searchQuery} />;
  };

  return (
    <div className="nx-app">
      <TopNav
        profile={profile}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSwitchProfile={onSwitchProfile}
        onBackToProfiles={onBackToProfiles}
      />
      <HeroBanner eyebrow={EYEBROW[profile.id] ?? EYEBROW.oscar} onInfo={() => setModal({ type: "about" })} />
      {profile.order
        .filter((key): key is Exclude<RowKey, "about"> => key !== "about")
        .map((key) => renderRow(key))}
      <ContactBanner />
      <Footer />
      <DetailModal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}
