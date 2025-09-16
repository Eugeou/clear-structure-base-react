import { Suspense, useEffect } from "react";
import { useRoutes, useNavigate, type RouteObject } from "react-router-dom";
import { routePaths } from "./route-path";
import { Loading } from "../shared-components";

// Dynamically import all module routes
const moduleRoutes = import.meta.glob<{ default: RouteObject[] }>(
  "/src/modules/*/routes/routes.tsx",
  { eager: true }
);

const NotFoundRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page
    navigate(routePaths.home, { replace: true });
  }, [navigate]);

  return <Loading showSpinner={true} />;
};

const fallbackRoute: RouteObject = {
  path: "*",
  element: <NotFoundRedirect />,
};

const routes = [
  ...Object.values(moduleRoutes).flatMap((module) => module.default),
  fallbackRoute,
];

const DynamicRouters: React.FC = () => {
  const routers = useRoutes(routes);
  return routers;
};

const Routers: React.FC = () => {
  useEffect(() => {
    const startPreloadAfterSeconds = 300;
    preloadAfter(routes, startPreloadAfterSeconds);
  });
  return (
    <Suspense
      fallback={
        <Loading
          showSpinner={true}
        />
      }
    >
      <DynamicRouters />
    </Suspense>
  );
};

export default Routers;

function preloadAfter(routes: RouteObject[], seconds: number) {
  setTimeout(() => {
    let i = 0;
    for (const route of routes) {
      preloadRouteComponent(route, i * 300);
      i++;
    }
  }, seconds);
}
function preloadRouteComponent(route: RouteObject, delaySecond: number) {
  setTimeout(() => {
    const element = route.element as any;
    const isPreloadable = element && element.type && element.type.preload;
    if (isPreloadable) element.type.preload();
  }, delaySecond);
}
