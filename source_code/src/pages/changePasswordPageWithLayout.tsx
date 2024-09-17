import * as React from 'react';
import ChangePassword from '../components/Log-in/changePassword';
import withLayout from '../containers/LoginLayoutContainer';
function ChangePasswordPageWithLayout(): React.JSX.Element {
    return <ChangePassword />;
}
export default withLayout(ChangePasswordPageWithLayout);
