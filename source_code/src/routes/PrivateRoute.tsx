import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store"; // Import RootState
import { ROUTES } from "../utils/routesPath";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Use the typed state selector
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const menuList = useSelector(
    (state: RootState) => state?.auth?.userPermissions?.data?.menuList,
  );
  const location = useLocation();

  // Define routes to be excluded from permission checks
  const excludedRoutes = [ROUTES.PROFILE];

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  const currentPath = location.pathname;

  // Check if the current path is in the excludedRoutes
  if (excludedRoutes.includes(currentPath)) {
    return <>{children}</>; // Allow access to excluded routes directly
  }

  // Check if the current path exists in the menuList for permitted routes
  const isRouteAllowed = menuList?.some(
    (menu: { routeUrl: string }) => menu.routeUrl === currentPath,
  );

  if (menuList?.length > 0 && !isRouteAllowed) {
    // Redirect to Not Found page if the route is not allowed
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return <>{children}</>; // Wrap children in a React fragment
};

export default PrivateRoute;
