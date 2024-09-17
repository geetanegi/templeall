import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import AddNewGroup from '../components/Groups/addNewGroup';

function AddNewGroupPage(): React.JSX.Element {
    return <AddNewGroup />;
}
export default withLayout(AddNewGroupPage);
