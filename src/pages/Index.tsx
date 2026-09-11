import { useEffect, useState } from "react";
import GateScreen from "@/components/netflix/GateScreen";
import ProfileScreen from "@/components/netflix/ProfileScreen";
import AppExperience from "@/components/netflix/AppExperience";
import { PROFILE_STORAGE_KEY, PROFILES, ProfileDef } from "@/data/portfolioData";

type Stage = "gate" | "profiles" | "app";

const TRANSITION_MS = 550;

const Index = () => {
  const [stage, setStage] = useState<Stage>("gate");
  const [exitingStage, setExitingStage] = useState<Stage | null>(null);
  const [profile, setProfile] = useState<ProfileDef | null>(null);

  const goTo = (next: Stage) => {
    setExitingStage(stage);
    window.setTimeout(() => {
      setStage(next);
      setExitingStage(null);
    }, TRANSITION_MS);
  };

  useEffect(() => {
    document.body.style.overflow = stage === "app" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  const handleSelectProfile = (selected: ProfileDef) => {
    setProfile(selected);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, selected.id);
    } catch {
      // localStorage unavailable — profile still applies for this session.
    }
    goTo("app");
  };

  const handleSwitchProfile = (id: string) => {
    const next = PROFILES.find((item) => item.id === id);
    if (!next) return;
    setProfile(next);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, next.id);
    } catch {
      // localStorage unavailable — profile still applies for this session.
    }
  };

  const handleBackToProfiles = () => setStage("profiles");

  const showGate = stage === "gate" || exitingStage === "gate";
  const showProfiles = stage === "profiles" || exitingStage === "profiles";

  return (
    <div className="nx-root">
      {showGate && <GateScreen onEnter={() => goTo("profiles")} leaving={exitingStage === "gate"} />}
      {showProfiles && <ProfileScreen leaving={exitingStage === "profiles"} onSelect={handleSelectProfile} />}
      {stage === "app" && profile && (
        <AppExperience profile={profile} onSwitchProfile={handleSwitchProfile} onBackToProfiles={handleBackToProfiles} />
      )}
    </div>
  );
};

export default Index;
