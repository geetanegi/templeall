import React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import InterventionMastered from '../../components/InterventionFiles/InterventionMastered';
function InterventionPageMastered(): React.JSX.Element {
    return <InterventionMastered />;
}
export default withLayout(InterventionPageMastered);
