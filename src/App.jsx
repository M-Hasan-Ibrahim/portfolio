import { useEffect, useMemo, useState } from "react";
import PortfolioLayout from "./layouts/PortfolioLayout.jsx";
import { routes } from "./routes/routeConfig.js";

const normalizePath = (pathname) => {
  const routeExists = routes.some((route) => route.path === pathname);
  return routeExists ? pathname : "/";
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(() =>
    normalizePath(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
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
    window.history.pushState({}, "", path);
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
