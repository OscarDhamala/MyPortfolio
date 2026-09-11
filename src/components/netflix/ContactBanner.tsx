import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { SOCIAL } from "@/data/portfolioData";

export default function ContactBanner() {
  return (
    <section className="nx-contact-banner" id="contact">
      <h2 className="nx-contact-title">Ready to build something great?</h2>
      <p className="nx-contact-sub">Message me directly &mdash; I usually reply within a day.</p>

      <div className="nx-contact-icons">
        <button
          className="nx-contact-item"
          type="button"
          onClick={() => window.open(SOCIAL.whatsapp, "_blank", "noopener")}
        >
          <div className="nx-contact-icon nx-wa">
            <MessageCircle size={26} />
          </div>
          <span>WhatsApp</span>
        </button>
        <button
          className="nx-contact-item"
          type="button"
          onClick={() => window.open(SOCIAL.email, "_blank", "noopener")}
        >
          <div className="nx-contact-icon nx-mail">
            <Mail size={26} />
          </div>
          <span>Email</span>
        </button>
      </div>

      <p className="nx-social-caption">Or connect on</p>
      <div className="nx-social-line">
        <a className="nx-circle-btn" href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a className="nx-circle-btn" href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github size={18} />
        </a>
      </div>
    </section>
  );
}
