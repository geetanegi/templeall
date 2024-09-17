import * as React from 'react';
import ForgotPassword from '../components/Log-in/forgotPassword';
import withLayout from '../containers/LoginLayoutContainer';

function ForgotPasswordPage(): React.JSX.Element {
    return <ForgotPassword />;
}
export default withLayout(ForgotPasswordPage);
