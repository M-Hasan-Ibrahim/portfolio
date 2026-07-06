export default function PageShell({ children, eyebrow, title }) {
  return (
    <section className="page-shell">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
