import React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import InterventionGrid from '../../components/InterventionFiles/InterventionGrid';

function InterventionGridPage(): React.JSX.Element {
    return <InterventionGrid />;
}

export default withLayout(InterventionGridPage);
