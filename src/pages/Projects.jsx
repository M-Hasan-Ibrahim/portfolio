import { useEffect, useMemo, useRef, useState } from "react";
import PageShell from "../components/PageShell.jsx";
import { projects } from "../data/data.js";

const projectImageModules = import.meta.glob("../assets/images/projects/*", {
  eager: true,
  import: "default",
});

const projectImages = Object.fromEntries(
  Object.entries(projectImageModules).map(([path, src]) => [
    path.split("/").at(-1),
    src,
  ]),
);

const resolveProjectImage = (image) => projectImages[image] ?? image;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTools, setSelectedTools] = useState([]);
  const filterRef = useRef(null);
  const swipeStartX = useRef(null);

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

  const selectedProjectImages = selectedProject?.images ?? [];
  const selectedProjectImageSources = selectedProjectImages.map(resolveProjectImage);
  const selectedImageCount = selectedProjectImageSources.length;
  const selectedImageSrc =
    selectedImageIndex === null ? "" : selectedProjectImageSources[selectedImageIndex];

  const toggleTool = (tool) => {
    setSelectedTools((currentTools) =>
      currentTools.includes(tool)
        ? currentTools.filter((currentTool) => currentTool !== tool)
        : [...currentTools, tool],
    );
  };

  const closeProject = () => {
    setSelectedImageIndex(null);
    setSelectedProject(null);
  };

  const showPreviousImage = () => {
    if (selectedImageCount < 2) return;

    setSelectedImageIndex((currentIndex) =>
      currentIndex === null
        ? 0
        : (currentIndex - 1 + selectedImageCount) % selectedImageCount,
    );
  };

  const showNextImage = () => {
    if (selectedImageCount < 2) return;

    setSelectedImageIndex((currentIndex) =>
      currentIndex === null ? 0 : (currentIndex + 1) % selectedImageCount,
    );
  };

  const handleLightboxTouchStart = (event) => {
    swipeStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleLightboxTouchEnd = (event) => {
    if (swipeStartX.current === null) return;

    const swipeEndX = event.changedTouches[0]?.clientX ?? swipeStartX.current;
    const swipeDistance = swipeEndX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(swipeDistance) < 40) return;
    if (swipeDistance > 0) {
      showPreviousImage();
    } else {
      showNextImage();
    }
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
      if (selectedImageIndex !== null) {
        if (event.key === "Escape") {
          setSelectedImageIndex(null);
        } else if (event.key === "ArrowLeft") {
          showPreviousImage();
        } else if (event.key === "ArrowRight") {
          showNextImage();
        }
        return;
      }

      if (event.key === "Escape") {
        closeProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, selectedImageIndex, selectedImageCount]);

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
          onClick={closeProject}
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
                  <a href={selectedProject.githubLink} rel="noreferrer" target="_blank">Open repository</a>
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
                {selectedImageCount > 0 ? (
                  <div className="project-modal__image-grid">
                    {selectedProjectImages.map((image, index) => (
                      <button
                        aria-label={`Open project image ${index + 1} of ${selectedImageCount}`}
                        className="project-modal__image-button"
                        key={image}
                        onClick={() => setSelectedImageIndex(index)}
                        type="button"
                      >
                        <img alt="" src={resolveProjectImage(image)} />
                      </button>
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

      {selectedProject && selectedImageIndex !== null && selectedImageSrc && (
        <div
          className="project-lightbox"
          onClick={() => setSelectedImageIndex(null)}
          role="presentation"
        >
          <section
            aria-label="Project image viewer"
            aria-modal="true"
            className="project-lightbox__window"
            onClick={(event) => event.stopPropagation()}
            onTouchEnd={handleLightboxTouchEnd}
            onTouchStart={handleLightboxTouchStart}
            role="dialog"
          >
            <div className="project-lightbox__header">
              <span>{selectedImageIndex + 1}/{selectedImageCount}</span>
              <button
                aria-label="Close image viewer"
                className="project-lightbox__close"
                onClick={() => setSelectedImageIndex(null)}
                type="button"
              >
                X
              </button>
            </div>

            <div className="project-lightbox__stage">
              <button
                aria-label="Previous image"
                className="project-lightbox__nav project-lightbox__nav--previous"
                disabled={selectedImageCount < 2}
                onClick={(event) => {
                  event.stopPropagation();
                  showPreviousImage();
                }}
                type="button"
              >
                {"\u2039"}
              </button>
              <img alt="" src={selectedImageSrc} />
              <button
                aria-label="Next image"
                className="project-lightbox__nav project-lightbox__nav--next"
                disabled={selectedImageCount < 2}
                onClick={(event) => {
                  event.stopPropagation();
                  showNextImage();
                }}
                type="button"
              >
                {"\u203a"}
              </button>
            </div>
          </section>
        </div>
      )}
    </PageShell>
  );
}
