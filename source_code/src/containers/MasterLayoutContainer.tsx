import * as React from 'react';
import Navigation from '../components/Navigation';

const withLayout = (WrappedComponent: React.FC) => {
    return function MasterLayoutContainer(props: any) {
        return (
            <div className="max-h-screen">
                <Navigation />
                <WrappedComponent {...props} />
            </div>
        );
    };
};

export default withLayout;
