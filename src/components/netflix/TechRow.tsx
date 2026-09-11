import { CSSProperties, useState } from "react";
import Row from "./Row";
import { TECH_GROUPS } from "@/data/portfolioData";
import { TECH_ICON_MAP } from "@/data/techIcons";

interface TechRowProps {
  searchQuery: string;
}

export default function TechRow({ searchQuery }: TechRowProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const query = searchQuery.trim().toLowerCase();
  const categories = ["All", ...TECH_GROUPS.map((group) => group.category)];

  return (
    <Row
      id="tech"
      title="Tech I Work With"
      subtitle="16 titles"
      trackClassName="nx-tech-track"
      extraHeader={
        <div className="nx-chip-row">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`nx-chip ${activeCategory === category ? "nx-active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      }
    >
      {TECH_GROUPS.flatMap((group) =>
        group.items.map((label) => {
          const categoryOk = activeCategory === "All" || activeCategory === group.category;
          const searchOk = !query || label.toLowerCase().includes(query);
          if (!categoryOk || !searchOk) return null;
          const iconDef = TECH_ICON_MAP[label];
          const Icon = iconDef?.icon;
          const color = iconDef?.color ?? group.color;
          return (
            <div key={label} className="nx-tech-tile" style={{ "--cat-color": color } as CSSProperties}>
              {Icon && <Icon size={26} color={color} />}
              <span className="nx-tech-label">{label}</span>
            </div>
          );
        })
      )}
    </Row>
  );
}
