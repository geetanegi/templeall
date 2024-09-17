import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import AuthorizationCodeGrid from '../components/AuthorizationCode/AuthorizationCodeGrid';

function OrganizationsGridPage(): React.JSX.Element {
    return <AuthorizationCodeGrid />;
}

export default withLayout(OrganizationsGridPage);
