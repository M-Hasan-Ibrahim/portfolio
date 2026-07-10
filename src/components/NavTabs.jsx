const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const tabBackground = asset("assets/images/profile_background.png");

const tabBackgrounds = {
  "/": asset("assets/images/Home_BG.png"),
  "/projects": asset("assets/images/Project_BG.png"),
  "/courses": asset("assets/images/Courses_BG.png"),
  "/certificates": asset("assets/images/Certificates_BG.png"),
  "/contacts": asset("assets/images/Contact_BG.png"),
  "/cv": asset("assets/images/CV_BG.png"),
  "/content": asset("assets/images/profile_background.png"),
};

export default function NavTabs({ activePath, onNavigate, routes }) {
  const isHome = activePath === "/";

  return (
    <nav className="nav-tabs" aria-label="Portfolio sections">
      {routes.map((route) => (
        <button
          aria-current={activePath === route.path ? "page" : "false"}
          className="nav-tab"
          key={route.path}
          onClick={() => onNavigate(route.path)}
          style={{ "--tab-image": `url('${isHome ? tabBackground : tabBackgrounds[route.path]}')` }}
          type="button"
        >
          <span className="nav-tab__overlay" />
          <span className="nav-tab__content">
            <strong>{route.label}</strong>
            {isHome && <small>{route.description}</small>}
          </span>
        </button>
      ))}
    </nav>
  );
}
