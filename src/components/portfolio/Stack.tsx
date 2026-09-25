import { TECH_GROUPS } from "@/data/portfolioData";
import { TECH_ICON_MAP } from "@/data/techIcons";
import DriftWall, { type DriftWallItem } from "@/components/portfolio/DriftWall";

const Stack = () => {
  const wallItems: DriftWallItem[] = TECH_GROUPS.flatMap((group) =>
    group.items.flatMap((item) => {
      const definition = TECH_ICON_MAP[item];
      return definition
        ? [{ label: item, category: group.category, color: definition.color, icon: definition.icon }]
        : [];
    })
  );

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

      <DriftWall
        items={wallItems}
        columns={5}
        height={440}
        tileWidth={168}
        tileHeight={124}
        gap={16}
        radius={12}
        speed={28}
        direction="up"
        parallax={0.55}
        lift={24}
        dim={0.82}
      />
    </section>
  );
};

export default Stack;
