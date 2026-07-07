import PageShell from "../components/PageShell.jsx";
import { certificates } from "../data/profile.js";

export default function Certificates() {
  return (
    <PageShell eyebrow="Credentials" title="Certificates">
      <div className="certificate-grid">
        {certificates.map((certificate) => (
          <article className="certificate-card" key={certificate.title}>
            <div>
              <span>{certificate.issuer}</span>
              <h2>{certificate.title}</h2>
            </div>
            <a href={certificate.badgeUrl} target="_blank" rel="noreferrer">
              View badge
            </a>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
