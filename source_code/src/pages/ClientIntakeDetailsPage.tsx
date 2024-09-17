import * as React from 'react';

import withLayout from '../containers/MasterLayoutContainer';
import ClientIntakeDetailsGrid from '../components/ClientIntakeDetails';

function ClientIntakeDetailsPage(): React.JSX.Element {
    return <ClientIntakeDetailsGrid />;
}
export default withLayout(ClientIntakeDetailsPage);
