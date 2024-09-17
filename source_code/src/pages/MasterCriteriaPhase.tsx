import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import MasterCriteriaForm from '../components/MasterCriteriaForm';

function MasterCriteriaPhase(): React.JSX.Element {
    return <MasterCriteriaForm />;
}

export default withLayout(MasterCriteriaPhase);
