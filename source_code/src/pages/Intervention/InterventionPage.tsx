import React from 'react';
import InterventionLandingPage from '../../components/InterventionFiles/InterventionLanding';
import withLayout from '../../containers/MasterLayoutContainer';

function InterventionPage(): React.JSX.Element {
    return <InterventionLandingPage />;
}

export default withLayout(InterventionPage);
