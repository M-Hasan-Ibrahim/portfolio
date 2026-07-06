export default function NavTabs({ activePath, onNavigate, routes }) {
  return (
    <nav className="nav-tabs" aria-label="Portfolio sections">
      {routes.map((route) => (
        <button
          aria-current={activePath === route.path ? "page" : "false"}
          className="nav-tab"
          key={route.path}
          onClick={() => onNavigate(route.path)}
          style={{ "--tab-image": `url('${route.image}')` }}
          type="button"
        >
          <span className="nav-tab__overlay" />
          <span className="nav-tab__content">
            <strong>{route.label}</strong>
            <small>{route.description}</small>
          </span>
        </button>
      ))}
    </nav>
  );
}