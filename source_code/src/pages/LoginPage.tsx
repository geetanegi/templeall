import * as React from 'react';
import withLayout from '../containers/LoginLayoutContainer';
import Login from '../components/Log-in';
function LoginPage(): React.JSX.Element {
    return <Login />;
}
export default withLayout(LoginPage);
