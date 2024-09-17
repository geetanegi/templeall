import * as React from 'react';
import withLayout from '../../containers/LoginLayoutContainer';
import SelectOrganization from '../../components/Log-in/SelectOrganization';
function OrganizationPage(): React.JSX.Element {
    return (
        <>
            <SelectOrganization />
        </>
    );
}
export default withLayout(OrganizationPage);
