import { useEffect, useMemo, useRef, useState } from "react";
import PageShell from "../components/PageShell.jsx";
import { projects } from "../data/profile.js";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTools, setSelectedTools] = useState([]);
  const filterRef = useRef(null);

  const tools = useMemo(
    () => [...new Set(projects.flatMap((project) => project.technologies ?? []))],
    [],
  );

  const filteredProjects = useMemo(() => {
    if (selectedTools.length === 0) return projects;

    return projects.filter((project) =>
      selectedTools.every((tool) => project.technologies?.includes(tool)),
    );
  }, [selectedTools]);

  const toggleTool = (tool) => {
    setSelectedTools((currentTools) =>
      currentTools.includes(tool)
        ? currentTools.filter((currentTool) => currentTool !== tool)
        : [...currentTools, tool],
    );
  };

  useEffect(() => {
    if (!isFilterOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!filterRef.current?.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isFilterOpen]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <PageShell eyebrow="University Work" title="Projects">
      <div className="project-filter" ref={filterRef}>
        <button
          aria-expanded={isFilterOpen}
          className="project-filter__trigger"
          onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
          type="button"
        >
          Filter
          {selectedTools.length > 0 && (
            <span>{selectedTools.length} selected</span>
          )}
        </button>

        {isFilterOpen && (
          <div className="project-filter__panel" aria-label="Filter projects by tools">
            <div className="project-filter__panel-header">
              <span>Tools used</span>
              {selectedTools.length > 0 && (
                <button
                  className="project-filter__clear"
                  onClick={() => setSelectedTools([])}
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="project-filter__options">
              {tools.map((tool) => (
                <button
                  aria-pressed={selectedTools.includes(tool)}
                  className="project-filter__button"
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  type="button"
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="item-grid project-grid">
        {filteredProjects.map((project) => (
          <button
            className="item-card project-card"
            key={project.title}
            onClick={() => setSelectedProject(project)}
            type="button"
          >
            <div className="project-card__header">
              <h2>{project.title}</h2>
              <span>{project.date}</span>
            </div>
            <p>{project.description}</p>
            {project.technologies?.length > 0 && (
              <ul
                className="project-card__stack"
                aria-label={`${project.title} technologies`}
              >
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            )}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="project-filter__empty">No projects match those tools yet.</p>
      )}

      {selectedProject && (
        <div
          className="project-modal"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <section
            aria-labelledby="project-modal-title"
            aria-modal="true"
            className="project-modal__window"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="project-modal__content">
              <div className="project-modal__intro">
                <span>{selectedProject.date}</span>
                <h2 id="project-modal-title">{selectedProject.title}</h2>
                <p>{selectedProject.description}</p>
              </div>

              <div className="project-modal__github">
                <span>GitHub</span>
                {selectedProject.githubLink ? (
                  <a href={selectedProject.githubLink}>Open repository</a>
                ) : (
                  <span className="project-modal__placeholder">
                    GitHub link placeholder
                  </span>
                )}
              </div>

              {selectedProject.details?.length > 0 && (
                <ul className="project-modal__details">
                  {selectedProject.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}

              <div className="project-modal__images">
                <span>Project images</span>
                {selectedProject.images?.length > 0 ? (
                  <div className="project-modal__image-grid">
                    {selectedProject.images.map((image) => (
                      <img alt="" key={image} src={image} />
                    ))}
                  </div>
                ) : (
                  <div className="project-modal__image-placeholder">
                    Image gallery placeholder
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </PageShell>
  );
}
