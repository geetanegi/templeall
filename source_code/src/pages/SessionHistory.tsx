import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import SessionHistoryGrid from '../components/SessionComponents/SessionHistory';

function SessionHistoryGridPage(): React.JSX.Element {
    return <SessionHistoryGrid />;
}

export default withLayout(SessionHistoryGridPage);
