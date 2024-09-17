import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import InboxGrid from '../components/ClaimInbox/inboxGrid';

function InboxGridPage(): React.JSX.Element {
    return <InboxGrid />;
}

export default withLayout(InboxGridPage);
