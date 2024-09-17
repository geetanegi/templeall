import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import MasterCriteriaLandingPageComponents from '../components/MasterCriteriaLandingPageComponents';

function MasterCriteriaLandingPage(): React.JSX.Element {
    return <MasterCriteriaLandingPageComponents />;
}

export default withLayout(MasterCriteriaLandingPage);
