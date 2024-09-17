import React, { useState, useEffect } from 'react';

interface Props {
    children: any;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (
            error: Error,
            errorInfo: React.ErrorInfo
        ): void => {
            setHasError(true);
            console.log(error, errorInfo);
        };

        const handleComponentError = (
            error: Event | Error,
            errorInfo: string | React.ErrorInfo
        ): void => {
            handleError(error as Error, errorInfo as React.ErrorInfo);
        };

        window.addEventListener('error', handleComponentError as EventListener);
        window.addEventListener(
            'unhandledrejection',
            handleComponentError as EventListener
        );

        return () => {
            window.removeEventListener(
                'error',
                handleComponentError as EventListener
            );
            window.removeEventListener(
                'unhandledrejection',
                handleComponentError as EventListener
            );
        };
    }, []);

    if (hasError) {
        return <h1>Something went wrong.</h1>;
    }

    return children as React.ReactElement<any>;
};

export default ErrorBoundary;
