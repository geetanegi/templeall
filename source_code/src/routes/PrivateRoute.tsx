import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';

export default function PrivateRoute({
    children,
}: {
    children: any;
}): React.JSX.Element {
    const { authed } = useAuth();
    const location = useLocation();

    return authed ? (
        children
    ) : (
        <Navigate
            to={ROUTES.LoginPage}
            replace
            state={{ path: location.pathname }}
        />
    );
}
