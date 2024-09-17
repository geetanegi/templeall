import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import GroupsGrid from '../components/Groups/GroupsGrid';

function OrganizationsGridPage(): React.JSX.Element {
    return <GroupsGrid />;
}

export default withLayout(OrganizationsGridPage);
