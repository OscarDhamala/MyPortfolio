import { Play } from "lucide-react";

interface GateScreenProps {
  onEnter: () => void;
  leaving: boolean;
}

export default function GateScreen({ onEnter, leaving }: GateScreenProps) {
  return (
    <div className={`nx-screen nx-gate nx-noisy ${leaving ? "nx-leaving" : ""}`}>
      <p className="nx-gate-eyebrow">An Original Portfolio Experience</p>
      <div className="nx-gate-logo">OSCAR DHAMALA</div>
      <p className="nx-gate-tag">Software Engineer &middot; Full&#8209;Stack &middot; Kathmandu, Nepal</p>

      <button className="nx-gate-enter" type="button" onClick={onEnter}>
        <Play size={20} fill="currentColor" />
        Enter Experience
      </button>
    </div>
  );
}
