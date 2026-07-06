import NavTabs from "../components/NavTabs.jsx";

export default function PortfolioLayout({
  activePath,
  children,
  onNavigate,
  routes,
}) {
  const isHome = activePath === "/";
  const nav = (
    <NavTabs
      activePath={activePath}
      routes={routes}
      onNavigate={onNavigate}
    />
  );
  const content = <div className="portfolio-content">{children}</div>;

  return (
    <div className={`app-shell ${isHome ? "app-shell--home" : "app-shell--inner"}`}>
      <main className={`portfolio-stage ${isHome ? "portfolio-stage--home" : "portfolio-stage--inner"}`}>
        {isHome ? (
          <>
            {content}
            {nav}
          </>
        ) : (
          <>
            {nav}
            {content}
          </>
        )}
      </main>
    </div>
  );
}