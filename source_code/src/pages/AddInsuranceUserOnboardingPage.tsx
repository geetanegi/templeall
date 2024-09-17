import * as React from 'react';
import withUserOnBoardingData from '../containers/userOnBoardingContainer';
import AddInsurance from '../components/usersOnBoarding/ClientInsurance/addInsurance';

function AddInsurancePage(): React.JSX.Element {
    return <AddInsurance />;
}
export default withUserOnBoardingData(AddInsurancePage);
