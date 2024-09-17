import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import RolesGrid from '../components/RolesGrid';

function RolesGridPage(): React.JSX.Element {
    return <RolesGrid />;
}
export default withLayout(RolesGridPage);
