import * as React from 'react';
import EmployeeOnBoardingForm from '../components/usersOnBoarding';
import withUserOnBoardingData from '../containers/userOnBoardingContainer';

function EmployeeOnBoardingFormPage(): React.JSX.Element {
    return <EmployeeOnBoardingForm />;
}
export default withUserOnBoardingData(EmployeeOnBoardingFormPage);
