import PageShell from "../components/PageShell.jsx";
import { projects } from "../data/profile.js";

export default function Projects() {
  return (
    <PageShell eyebrow="Selected Work" title="Projects">
      <div className="item-grid">
        {projects.map((project) => (
          <article className="item-card" key={project.title}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
