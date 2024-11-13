import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { ROUTES } from "../utils/routesPath";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const menuList = useSelector(
    (state: RootState) => state?.auth?.userPermissions?.data?.menuList,
  );

  const userPermisions = useSelector(
    (state: RootState) => state.auth.userPermissions,
  );
  const isSuperAdmin = userPermisions?.data?.permission["is_super_admin"];
  const is_course_admin = userPermisions?.data?.permission["is_course_admin"];

  const location = useLocation();

  // Define static routes to be excluded
  const excludedUserRoutes = [ROUTES.PROFILE];
  const excludedAdminRoutes = [
    ROUTES.PROFILE,
    ROUTES.CREATE_CONTEST,
    ROUTES.UPDFATE_CONTEST,
  ];

  // Define patterns for dynamic excluded routes
  const excludedDynamicRoutes = [
    // /^\/contest\/\d+$/, // Matches /contest/:id
    /^\/update-contest\/[^/]+$/, // Matches /update-contest/:id
  ];

  // Determine the excluded static routes based on role
  const excludedRoutes = () => {
    if (isSuperAdmin || is_course_admin) {
      return excludedAdminRoutes;
    } else {
      return excludedUserRoutes;
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  const currentPath = location.pathname;

  // Check if the current path is in the excluded static routes or matches a dynamic excluded pattern
  const isStaticRouteExcluded = excludedRoutes().includes(currentPath);
  const isDynamicRouteExcluded =
    (isSuperAdmin || is_course_admin) &&
    excludedDynamicRoutes.some((pattern) => pattern.test(currentPath));

  // Allow access if the route is either in the excluded static routes or matches an excluded dynamic route pattern
  if (isStaticRouteExcluded || isDynamicRouteExcluded) {
    return <>{children}</>;
  }

  // Check if the current path exists in the menuList for permitted routes
  const isRouteAllowed = menuList?.some(
    (menu: { routeUrl: string }) => menu.routeUrl === currentPath,
  );

  if (menuList?.length > 0 && !isRouteAllowed) {
    // Redirect to Not Found page if the route is not allowed
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
