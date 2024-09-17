import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import LandingPage from '../components/LandingPage';

function ClientDashboardPage(): React.JSX.Element {
    return <LandingPage />;
}
export default withLayout(ClientDashboardPage);
