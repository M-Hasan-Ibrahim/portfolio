import { useEffect, useMemo, useState } from "react";
import PortfolioLayout from "./layouts/PortfolioLayout.jsx";
import { routes } from "./routes/routeConfig.js";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

const stripBasePath = (pathname) => {
  if (!basePath) return pathname;
  if (!pathname.startsWith(basePath)) return pathname;

  return pathname.slice(basePath.length) || "/";
};

const routeFromLocation = () => {
  const pathname = stripBasePath(window.location.pathname);
  const routeExists = routes.some((route) => route.path === pathname);

  return routeExists ? pathname : "/";
};

const browserPathForRoute = (path) => {
  if (!basePath) return path;
  return `${basePath}${path === "/" ? "/" : path}`;
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(routeFromLocation);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(routeFromLocation());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const activeRoute = useMemo(
    () => routes.find((route) => route.path === currentPath) ?? routes[0],
    [currentPath],
  );

  const navigate = (path) => {
    if (path === currentPath) return;
    window.history.pushState({}, "", browserPathForRoute(path));
    setCurrentPath(path);
  };

  return (
    <PortfolioLayout
      activePath={activeRoute.path}
      routes={routes}
      onNavigate={navigate}
    >
      <activeRoute.Component />
    </PortfolioLayout>
  );
}
