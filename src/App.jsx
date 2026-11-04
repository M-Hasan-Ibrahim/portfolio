import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import useScrollReveal from "./hooks/useScrollReveal.js";
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
  useScrollReveal();

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

  // Every page opens at the top. Runs before paint so the new page never
  // flashes at the old scroll position, and uses "instant" to bypass the
  // global `scroll-behavior: smooth`.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeRoute.path]);

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
