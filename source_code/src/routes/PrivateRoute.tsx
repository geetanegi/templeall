  import React from 'react';
  import { Navigate, useLocation } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  import type { RootState } from '../store'; // Import RootState
import { ROUTES } from '../utils/routesPath';

  interface PrivateRouteProps {
    children: React.ReactNode;
  }

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    // Use the typed state selector
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Accessing state.auth
    const location = useLocation();

    if (!isAuthenticated) {
      return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return <>{children}</>; // Wrap children in a React fragment
  };

  export default PrivateRoute;
