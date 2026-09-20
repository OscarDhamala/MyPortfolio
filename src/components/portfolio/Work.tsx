import { PROJECTS } from "@/data/portfolioData";

const Work = () => {
  return (
    <section id="work" className="mx-auto max-w-[1180px] scroll-mt-28 px-6 py-16 min-[900px]:py-24">
      <div className="mb-11 flex flex-col gap-3.5">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">Selected work</span>
        <h2 className="text-[38px] font-black leading-[1.05] tracking-tight text-balance sm:text-5xl">
          Things I've shipped.
        </h2>
        <p className="max-w-[64ch] text-lg leading-relaxed text-muted-foreground">
          Three products spanning AI tooling, MERN finance apps, and full-stack management systems.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-7 min-[900px]:grid-cols-3">
        {PROJECTS.map((project) => (
          <article key={project.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="aspect-[16/10] overflow-hidden border-b border-border">
              <img src={project.image} alt={`${project.name} product screenshot`} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div>
                <h3 className="text-xl font-extrabold">{project.name}</h3>
                <p className="font-mono text-[11px] text-accent">{project.tagline}</p>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-accent"
              >
                View project &rarr;
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
