import { useEffect } from "react";
import { Check, ExternalLink, X } from "lucide-react";
import { BIO_PARAGRAPHS, ModalState } from "@/data/portfolioData";

interface DetailModalProps {
  modal: ModalState;
  onClose: () => void;
}

export default function DetailModal({ modal, onClose }: DetailModalProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const open = modal !== null;

  return (
    <div
      className={`nx-modal-overlay ${open ? "nx-open" : ""}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="nx-modal-panel">
        {modal?.type === "project" && (
          <>
            <div className="nx-modal-media">
              <img src={modal.data.image} alt={modal.data.name} />
              <div className="nx-modal-scrim" />
              <button className="nx-modal-close" type="button" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="nx-modal-body">
              <div className="nx-modal-title">{modal.data.name}</div>
              <div className="nx-modal-meta">
                <span className="nx-match-text">98% Match</span>
                <span>&middot;</span>
                <span>{modal.data.tagline}</span>
              </div>
              <p className="nx-modal-desc">{modal.data.description}</p>
              <div className="nx-modal-tags">
                {modal.data.tags.map((tag) => (
                  <span key={tag} className="nx-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="nx-btn nx-btn-play"
                type="button"
                onClick={() => window.open(modal.data.link, "_blank", "noopener")}
              >
                <ExternalLink size={18} />
                Visit Live Project
              </button>
            </div>
          </>
        )}

        {modal?.type === "experience" && (
          <>
            <div className="nx-modal-media nx-modal-media-exp">
              <button className="nx-modal-close" type="button" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
              <div className="nx-modal-exp-head">
                <div className="nx-exp-phase">{modal.data.phase}</div>
                <div className="nx-exp-title-big nx-modal-exp-title">{modal.data.title}</div>
              </div>
            </div>
            <div className="nx-modal-body">
              <div className="nx-modal-meta nx-modal-meta-exp">
                <span>{modal.data.period}</span>
                <span>&middot;</span>
                <span>{modal.data.org}</span>
              </div>
              <p className="nx-modal-desc">{modal.data.description}</p>
              <ul className="nx-modal-points">
                {modal.data.points.map((point) => (
                  <li key={point}>
                    <Check size={16} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {modal?.type === "about" && (
          <>
            <div className="nx-modal-media">
              <img src="/uploads/Profile_Image.png" alt="Oscar Dhamala" />
              <div className="nx-modal-scrim" />
              <button className="nx-modal-close" type="button" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="nx-modal-body">
              <div className="nx-modal-title">Oscar Dhamala</div>
              <div className="nx-modal-meta">
                <span className="nx-match-text">98% Match</span>
                <span>&middot;</span>
                <span>Software Engineer</span>
                <span>&middot;</span>
                <span>Kathmandu, NP</span>
              </div>
              {BIO_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph} className="nx-modal-desc">
                  {paragraph}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
