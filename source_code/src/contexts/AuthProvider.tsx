import * as React from 'react';
import { useAuth } from '../hooks/useAuth';

const authContext = React.createContext({});

export function AuthProvider({ children }: { children: any }): any {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer(): any {
    return React.useContext(authContext);
}
