import * as React from 'react';
import SendEmail from '../components/Log-in/sendEmailForForgotPassword';
import withLayout from '../containers/LoginLayoutContainer';
function SendEmailPage(): React.JSX.Element {
    return <SendEmail />;
}
export default withLayout(SendEmailPage);
