import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import AddRoles from '../components/AddRoles';

function AddRolesPage(): React.JSX.Element {
    return <AddRoles />;
}
export default withLayout(AddRolesPage);
