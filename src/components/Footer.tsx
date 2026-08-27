import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer relative z-10" aria-label="Footer">
      <div className="site-footer-signature" aria-label="Oscar Dhamala">
        Oscar Dhamala
      </div>
      <p className="site-footer-caption">Building for you</p>
      <p className="site-footer-copyright">© {new Date().getFullYear()} Oscar Dhamala</p>
    </footer>
  );
}
