import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import EditClaims from '../components/ClaimInbox/EditClaim';

function EditClaimPage(): React.JSX.Element {
    return <EditClaims />;
}

export default withLayout(EditClaimPage);
