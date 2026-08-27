import React, { useEffect, useState } from "react";
import { Flame, Rocket, Sparkles } from "lucide-react";

type IntroState = "waiting" | "armed" | "launching" | "gone";

export default function GlassBreakIntro() {
  const [introState, setIntroState] = useState<IntroState>("waiting");
  const isActive = introState !== "gone";
  const isArmed = introState === "armed";
  const isLaunching = introState === "launching";

  useEffect(() => {
    if (!isActive) return;

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [isActive]);

  useEffect(() => {
    if (!isLaunching) return;

    const timer = window.setTimeout(() => setIntroState("gone"), 1350);
    return () => window.clearTimeout(timer);
  }, [isLaunching]);

  const igniteRocket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIntroState("armed");
  };

  const launchRocket = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isArmed) setIntroState("launching");
  };

  if (introState === "gone") return null;

  return (
    <div className={`glass-break-intro rocket-intro-${introState}`} role="presentation">
      <div className="intro-moon" aria-hidden="true" />
      <div className="rocket-intro-copy">
        <div className={`rocket-flight ${isLaunching ? "is-launching" : ""}`} aria-hidden="true">
          <div className="rocket-body">
            <Rocket className="rocket-icon" strokeWidth={1.6} />
            <div className={`rocket-fire ${isArmed ? "is-ignited" : ""}`}>
              <Flame strokeWidth={1.8} />
            </div>
          </div>
        </div>

        <div className="rocket-console">
          <div className="rocket-intro-mark"><Sparkles className="h-5 w-5" /></div>
          <p>{isLaunching ? "Entering the website universe" : isArmed ? "Systems hot. Destination locked." : "Prepare for lift-off"}</p>
          <button type="button" className="rocket-button rocket-ignite-button" onClick={igniteRocket} disabled={introState !== "waiting"}>
            Ignite
          </button>
          <button type="button" className="rocket-button rocket-launch-button" onClick={launchRocket} disabled={!isArmed}>
            Launch the Rocket
          </button>
        </div>
      </div>
    </div>
  );
}