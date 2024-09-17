import * as React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import OrganizationsGrid from '../../components/Organizations/OrganizationsGrid';

function OrganizationsGridPage(): React.JSX.Element {
    return <OrganizationsGrid />;
}

export default withLayout(OrganizationsGridPage);
