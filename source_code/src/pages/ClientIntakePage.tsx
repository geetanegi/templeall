import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import ClientIntakeView from '../components/ClientIntakeDetails/ClientIntakeView';
function ClientIntakePage(): React.JSX.Element {
    return <ClientIntakeView />;
}
export default withLayout(ClientIntakePage);
