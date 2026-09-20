import { EXPERIENCE } from "@/data/portfolioData";

const Journey = () => {
  return (
    <section id="journey" className="mx-auto max-w-[1180px] scroll-mt-28 px-6 py-16 min-[900px]:py-24">
      <div className="mb-10 flex flex-col gap-3.5">
        <span className="font-mono text-xs uppercase tracking-wider text-accent">Career</span>
        <h2 className="text-[38px] font-black leading-[1.05] tracking-tight text-balance sm:text-5xl">
          How I got here.
        </h2>
        <p className="max-w-[64ch] text-lg leading-relaxed text-muted-foreground">
          Five phases, from a student startup pitch to shipping production software.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-border">
        {EXPERIENCE.map((step) => (
          <div key={step.phase} className="flex flex-col gap-3.5 py-7 first:pt-0 min-[900px]:flex-row min-[900px]:gap-7">
            <div className="flex flex-row items-center gap-3.5 min-[900px]:w-[140px] min-[900px]:flex-shrink-0 min-[900px]:flex-col min-[900px]:items-start min-[900px]:gap-1.5">
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-accent">{step.phase}</span>
              <span className="font-mono text-[10.5px] text-muted-foreground">{step.period}</span>
              {step.live && (
                <span className="inline-flex w-fit items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3fa15e]" />
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#3fa15e]">Live</span>
                </span>
              )}
            </div>
            <div className="hidden w-px flex-shrink-0 self-stretch bg-border min-[900px]:block" />
            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
              <div className="flex flex-wrap items-baseline gap-2.5">
                <h3 className="text-xl font-extrabold">{step.title}</h3>
                <span className="text-[13.5px] text-muted-foreground">&mdash; {step.org}</span>
              </div>
              <p className="max-w-[70ch] text-[14.5px] leading-relaxed text-muted-foreground">{step.description}</p>
              <ul className="flex list-disc flex-col gap-1.5 pl-[18px]">
                {step.points.map((point) => (
                  <li key={point} className="text-[13.5px] leading-relaxed text-muted-foreground">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Journey;
