import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import SessionNoteGrid from '../components/SessionComponents/SessionNoteGrid';

function SessionNoteGridPage(): React.JSX.Element {
    return <SessionNoteGrid />;
}

export default withLayout(SessionNoteGridPage);
