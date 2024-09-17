import * as React from 'react';
import Navigation from '../components/Navigation';

const withSchedullingData = (WrappedComponent: React.FC) => {
    return function SchedullingContainer(props: any) {
        return (
            <div className="">
                <Navigation />
                <WrappedComponent {...props} />
            </div>
        );
    };
};

export default withSchedullingData;
