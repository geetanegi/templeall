import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import SessionGrid from '../components/SessionComponents/SessionGrid';

function SessionGridPage(): React.JSX.Element {
    return <SessionGrid />;
}

export default withLayout(SessionGridPage);
