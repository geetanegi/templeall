import * as React from 'react';
import Navigation from '../components/Navigation';

const withLayout = (WrappedComponent: React.FC) => {
    return function DomainsContainer(props: any) {
        return (
            <div className="">
                <Navigation />
                <WrappedComponent {...props} />
            </div>
        );
    };
};

export default withLayout;
