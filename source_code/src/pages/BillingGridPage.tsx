import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import BillingGrid from '../components/Billing/BillingGrid';

function RateGridPage(): React.JSX.Element {
    return <BillingGrid />;
}
export default withLayout(RateGridPage);
