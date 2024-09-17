import React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import IntakeForm from '../../components/ClientIntakeDetails/IntakeForm';

function SentForInformationPage(): React.JSX.Element {
    return <IntakeForm />;
}

export default withLayout(SentForInformationPage);
