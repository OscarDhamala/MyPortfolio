import { Info, Play } from "lucide-react";
import Row from "./Row";
import { PROJECTS, Project } from "@/data/portfolioData";

interface ProjectsRowProps {
  searchQuery: string;
  onOpen: (project: Project) => void;
}

export default function ProjectsRow({ searchQuery, onOpen }: ProjectsRowProps) {
  const query = searchQuery.trim().toLowerCase();
  const filtered = PROJECTS.filter(
    (project) => !query || `${project.name} ${project.tagline} ${project.tags.join(" ")}`.toLowerCase().includes(query)
  );

  return (
    <Row id="projects" title="Featured Projects" subtitle={`${PROJECTS.length} titles`}>
      {filtered.length === 0 ? (
        <p className="nx-row-empty">No matches found.</p>
      ) : (
        filtered.map((project) => (
          <article
            key={project.id}
            className="nx-card"
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") onOpen(project);
            }}
          >
            <div className="nx-card-media">
              <img src={project.image} alt={project.name} loading="lazy" />
              <span className="nx-card-badge">Live</span>
            </div>
            <div className="nx-card-info">
              <div className="nx-card-name">{project.name}</div>
              <div className="nx-card-tagline">{project.tagline}</div>
              <div className="nx-card-actions">
                <button
                  className="nx-card-icon-btn nx-play"
                  type="button"
                  aria-label="Visit live project"
                  onClick={(event) => {
                    event.stopPropagation();
                    window.open(project.link, "_blank", "noopener");
                  }}
                >
                  <Play size={15} fill="currentColor" />
                </button>
                <button
                  className="nx-card-icon-btn"
                  type="button"
                  aria-label="More info"
                  onClick={(event) => {
                    event.stopPropagation();
                    onOpen(project);
                  }}
                >
                  <Info size={15} />
                </button>
              </div>
              <div className="nx-card-tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="nx-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))
      )}
    </Row>
  );
}
