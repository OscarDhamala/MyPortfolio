import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface GateScreenProps {
  onEnter: () => void;
  leaving: boolean;
}

const ENTER_SOUND_SRC = encodeURI("/uploads/Netflix New Logo Animation 2019 - Netflix.mp3");
// Fallback in case autoplay is blocked or the file fails to load — matches the clip's real length.
const ENTER_SOUND_FALLBACK_MS = 4200;

export default function GateScreen({ onEnter, leaving }: GateScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const handleEnter = () => {
    if (entering) return;
    setEntering(true);

    const fallback = window.setTimeout(onEnter, ENTER_SOUND_FALLBACK_MS);

    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.onended = () => {
      window.clearTimeout(fallback);
      onEnter();
    };
    audio.play().catch(() => {
      // Autoplay blocked — the fallback timer above still carries us into the profile screen.
    });
  };

  return (
    <div className={`nx-screen nx-gate nx-noisy ${leaving ? "nx-leaving" : ""}`}>
      <audio ref={audioRef} src={ENTER_SOUND_SRC} preload="auto" />
      <p className="nx-gate-eyebrow">An Original Portfolio Experience</p>
      <div className={`nx-gate-logo ${entering ? "nx-gate-logo-boom" : ""}`}>OSCAR DHAMALA</div>
      <p className="nx-gate-tag">Software Engineer &middot; Full&#8209;Stack &middot; Kathmandu, Nepal</p>

      <button className="nx-gate-enter" type="button" onClick={handleEnter} disabled={entering}>
        <Play size={20} fill="currentColor" />
        {entering ? "Loading…" : "Enter Experience"}
      </button>
    </div>
  );
}
