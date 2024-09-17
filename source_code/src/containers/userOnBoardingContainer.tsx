import * as React from 'react';
import Navigation from '../components/Navigation';
import ProfileUpload from '../components/usersOnBoarding/profileUpload';

const withUserOnBoardingData = (WrappedComponent: React.FC) => {
    return function userOnBoardingContainer(props: any) {
        return (
            <>
                <Navigation />
                <div className="flex m-5 space-x-6 h-[110vh]">
                    <ProfileUpload />
                    <WrappedComponent {...props} />
                </div>
            </>
        );
    };
};

export default withUserOnBoardingData;
