import tabBackground from "../assets/images/profile_background.png";
import certificatesBackground from "../assets/images/Certificates_BG.png";
import contactsBackground from "../assets/images/Contact_BG.png";
import coursesBackground from "../assets/images/Courses_BG.png";
import cvBackground from "../assets/images/CV_BG.png";
import homeBackground from "../assets/images/Home_BG.png";
import projectsBackground from "../assets/images/Project_BG.png";

const tabBackgrounds = {
  "/": homeBackground,
  "/projects": projectsBackground,
  "/courses": coursesBackground,
  "/certificates": certificatesBackground,
  "/contacts": contactsBackground,
  "/cv": cvBackground,
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