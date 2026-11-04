export default function PageShell({ children, eyebrow, title }) {
  return (
    <section className="page-shell">
      <p className="eyebrow" data-reveal="up">
        {eyebrow}
      </p>
      <h1 data-reveal="up">{title}</h1>
      {children}
    </section>
  );
}
