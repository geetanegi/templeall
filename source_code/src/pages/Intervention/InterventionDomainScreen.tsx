import React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import InterventionDomainScreen from '../../components/InterventionFiles/DomainScreen/DomainScreen';

function InterventionDomainScreenPage(): React.JSX.Element {
    return <InterventionDomainScreen />;
}

export default withLayout(InterventionDomainScreenPage);
