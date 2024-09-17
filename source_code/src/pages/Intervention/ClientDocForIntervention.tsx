import React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import ClientDoc from '../../components/InterventionFiles/ClientDoc/ClientDoc';

function ClientDocForIntervention(): React.JSX.Element {
    return <ClientDoc />;
}

export default withLayout(ClientDocForIntervention);
