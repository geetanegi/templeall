import React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import GoalLibraryDomainScreen from '../../components/GoalLibrary/DomainScreen/DomainScreen';

function InterventionDomainScreenPage(): React.JSX.Element {
    return <GoalLibraryDomainScreen />;
}

export default withLayout(InterventionDomainScreenPage);
