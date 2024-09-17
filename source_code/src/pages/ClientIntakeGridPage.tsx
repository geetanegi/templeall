import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import ClientIntakeGrid from '../components/ClientIntake/ClientIntakeGrid';

function ClientIntakeGridPage(): React.JSX.Element {
    return <ClientIntakeGrid />;
}
export default withLayout(ClientIntakeGridPage);
