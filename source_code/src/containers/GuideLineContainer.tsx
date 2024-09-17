import * as React from 'react';
import Navigation from '../components/Navigation';

const withGuideLineData = (WrappedComponent: React.FC) => {
    return function GuideLineContainer(props: any) {
        return (
            <div className="">
                <Navigation />
                <WrappedComponent {...props} />
            </div>
        );
    };
};

export default withGuideLineData;
