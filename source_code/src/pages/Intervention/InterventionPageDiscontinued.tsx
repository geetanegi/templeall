import React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import InterventionDiscontinued from '../../components/InterventionFiles/InterventionDiscontinued';
function InterventionPageDiscontinued(): React.JSX.Element {
    return <InterventionDiscontinued />;
}
export default withLayout(InterventionPageDiscontinued);
