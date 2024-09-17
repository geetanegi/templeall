import * as React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import DiagnosisCodeGrid from '../../components/MetaDataManagement/diagnosisCodeGrid';

function diagnosisCodeGridPage(): React.JSX.Element {
    return <DiagnosisCodeGrid />;
}
export default withLayout(diagnosisCodeGridPage);
