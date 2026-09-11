import { NAV_LINKS } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer className="nx-footer" aria-label="Footer">
      <div className="nx-footer-brand">OSCAR DHAMALA</div>
      <div className="nx-footer-links">
        {NAV_LINKS.map((link) => (
          <a key={link.id} href={`#${link.id}`}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
