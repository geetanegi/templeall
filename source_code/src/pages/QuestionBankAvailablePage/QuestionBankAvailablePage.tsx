import * as React from 'react';
import QuestionBankAvailable from '../../components/QuestionBankAvailable';
import withLayout from '../../containers/MasterLayoutContainer';

function QuestionBankAvailablePage(): React.JSX.Element {
    return <QuestionBankAvailable />;
}
export default withLayout(QuestionBankAvailablePage);
