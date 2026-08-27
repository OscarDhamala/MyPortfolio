import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

const socialLinks = [
  {
    id: "email",
    icon: <Mail className="w-4 h-4" />,
    label: "Email",
    value: "oscardhamala117@gmail.com",
    href: "mailto:oscardhamala117@gmail.com",
  },
  {
    id: "phone",
    icon: <Phone className="w-4 h-4" />,
    label: "Phone",
    value: "+977-9869112525",
    href: "tel:+9779869112525",
  },
  {
    id: "location",
    icon: <MapPin className="w-4 h-4" />,
    label: "Location",
    value: "Nepal",
    href: "https://maps.google.com/?q=Nepal",
  },
  {
    id: "whatsapp",
    icon: <MessageCircle className="w-4 h-4" />,
    label: "WhatsApp",
    value: "+977-9869112525",
    href: "https://wa.me/9779869112525",
  },
];

export default function SocialSidebar() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [revealKey, setRevealKey] = useState(0);

  const handleIconClick = (id: string) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
      setRevealKey((k) => k + 1);
    }
  };

  return (
    <div className="social-sidebar" aria-label="Contact links">
      <div className="social-sidebar-inner">
        {socialLinks.map((link) => {
          const isOpen = activeId === link.id;
          return (
            <div key={link.id} className="social-sidebar-item">
              <button
                onClick={() => handleIconClick(link.id)}
                className={`social-sidebar-link ${isOpen ? "active" : ""}`}
                aria-label={link.label}
                title={link.label}
                aria-expanded={isOpen}
              >
                {link.icon}
              </button>
              <div className={`social-sidebar-reveal ${isOpen ? "open" : ""}`}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-sidebar-value"
                >
                  {isOpen &&
                    link.value.split("").map((char, i) => (
                      <span
                        key={`${revealKey}-${i}`}
                        className="social-sidebar-char"
                        style={{ animationDelay: `${i * 0.035}s` }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                </a>
              </div>
            </div>
          );
        })}
        <div className="social-sidebar-line" />
      </div>
    </div>
  );
}
