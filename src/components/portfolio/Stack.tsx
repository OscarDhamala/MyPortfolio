import { TECH_GROUPS } from "@/data/portfolioData";

const Stack = () => {
  return (
    <section id="stack" className="mx-auto max-w-[1180px] scroll-mt-28 px-6 py-16 min-[900px]:py-24">
      <div className="mb-11 flex flex-col gap-3.5">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">Toolkit</span>
        <h2 className="text-[38px] font-black leading-[1.05] tracking-tight text-balance sm:text-5xl">
          What I build with.
        </h2>
        <p className="max-w-[64ch] text-lg leading-relaxed text-muted-foreground">
          The languages, frameworks, and platforms behind the projects on this site.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TECH_GROUPS.map((group) => (
          <div key={group.category} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: group.color }} />
              <span className="text-[15px] font-bold">{group.category}</span>
            </div>
            <div className="flex flex-col gap-2">
              {group.items.map((item) => (
                <div key={item} className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
