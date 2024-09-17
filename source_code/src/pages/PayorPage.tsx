import * as React from 'react';
import withUserOnBoardingData from '../containers/userOnBoardingContainer';
import Payor from '../components/usersOnBoarding/ClientInsurance/payors';

function PayorPage(): React.JSX.Element {
    return <Payor />;
}
export default withUserOnBoardingData(PayorPage);
