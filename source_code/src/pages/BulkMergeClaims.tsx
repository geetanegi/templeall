import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import MergeClaims from '../components/Billing/MergeClaims';
function BulkMergeClaims(): React.JSX.Element {
    return <MergeClaims />;
}
export default withLayout(BulkMergeClaims);
