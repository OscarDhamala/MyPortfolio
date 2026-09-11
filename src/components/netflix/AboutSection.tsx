import { BIO_PARAGRAPHS } from "@/data/portfolioData";

export default function AboutSection() {
  return (
    <section className="nx-about-section" id="about">
      <p className="nx-hero-eyebrow">The Creator</p>
      <div className="nx-about-grid">
        <div className="nx-about-photo-wrap">
          <div className="nx-about-photo">
            <img src="/uploads/Profile_Image.png" alt="Oscar Dhamala" />
          </div>
          <div className="nx-about-name">Oscar Dhamala</div>
          <div className="nx-about-role">Software Engineer</div>
        </div>

        <div>
          <div className="nx-about-body">
            {BIO_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
