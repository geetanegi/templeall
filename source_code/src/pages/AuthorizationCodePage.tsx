import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import AuthorizationCodeForm from '../components/AuthorizationCode';

function AuthorizationCodePage(): React.JSX.Element {
    return <AuthorizationCodeForm />;
}
export default withLayout(AuthorizationCodePage);
