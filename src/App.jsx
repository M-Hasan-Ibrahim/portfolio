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
  const hashPath = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : "";
  const pathname = hashPath || window.location.pathname;
  const normalizedPath = pathname === "" ? "/" : pathname;
  const routePath = stripBasePath(normalizedPath);
  const routeExists = routes.some((route) => route.path === routePath);

  return routeExists ? routePath : "/";
};

const browserPathForRoute = (path) => {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;
  return `#${normalizedPath}`;
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(routeFromLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(routeFromLocation());
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const activeRoute = useMemo(
    () => routes.find((route) => route.path === currentPath) ?? routes[0],
    [currentPath],
  );

  const navigate = (path) => {
    const nextPath = path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;
    if (nextPath === currentPath) return;
    window.location.hash = browserPathForRoute(nextPath);
    setCurrentPath(nextPath);
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
