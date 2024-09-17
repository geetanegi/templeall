import * as React from 'react';
import withUserOnBoardingData from '../containers/userOnBoardingContainer';
import UserAuthorization from '../components/usersOnBoarding/userAuthorization';

function EmployeeAuthorizationPage(): React.JSX.Element {
    return <UserAuthorization />;
}
export default withUserOnBoardingData(EmployeeAuthorizationPage);
