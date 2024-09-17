import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import RateGrid from '../components/Rate/rateGrid';

function RateGridPage(): React.JSX.Element {
    return <RateGrid />;
}
export default withLayout(RateGridPage);
