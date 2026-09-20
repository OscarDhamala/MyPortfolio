import { CV_PATH, HERO, PROFILE_IMAGE, SOCIAL } from "@/data/portfolioData";
import { IconGithub, IconLinkedIn } from "@/components/portfolio/icons";
import SiteSearch from "@/components/portfolio/SiteSearch";

const Hero = () => {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-[calc(100vh-104px)] max-w-[1180px] scroll-mt-28 flex-col items-center justify-center gap-11 px-6 pb-16 pt-12 min-[900px]:flex-row min-[900px]:items-center min-[900px]:pb-24 min-[900px]:pt-16"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <h1 className="font-sans text-[44px] font-black leading-[0.98] tracking-tight text-balance sm:text-[58px] min-[900px]:text-[80px]">
          {HERO.headline.map((line, i) => (
            <span key={line} className={`block ${i === HERO.headline.length - 1 ? "text-accent" : ""}`}>
              {line}
            </span>
          ))}
        </h1>

        <p className="max-w-[520px] text-lg leading-relaxed text-muted-foreground">{HERO.body}</p>

        <SiteSearch />

        <div className="flex flex-wrap items-center gap-3.5 pt-1">
          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-4 text-[15px] font-semibold text-background transition-opacity hover:opacity-85"
          >
            View CV
          </a>
          <a
            href="#work"
            className="inline-flex items-center rounded-full border border-foreground px-5 py-4 text-[15px] font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            View work
          </a>
        </div>
      </div>

      <div className="flex w-full max-w-[380px] flex-shrink-0 -translate-y-4 flex-col items-center gap-7 min-[900px]:w-[420px] min-[900px]:max-w-none min-[900px]:-translate-y-8">
        <div className="relative w-full max-w-[340px]">
          <div className="absolute -inset-6 -z-10 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
          <div className="glass-frame relative aspect-square w-full rounded-full p-2.5">
            <div className="relative h-full w-full overflow-hidden rounded-full shadow-inner">
              <img
                src={PROFILE_IMAGE}
                alt="Portrait of Oscar Dhamala"
                className="h-full w-full object-cover [filter:grayscale(12%)_contrast(1.03)]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="glass flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-transform hover:-translate-y-0.5"
          >
            <IconLinkedIn className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="glass flex h-12 w-12 items-center justify-center rounded-full text-foreground transition-transform hover:-translate-y-0.5"
          >
            <IconGithub className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
