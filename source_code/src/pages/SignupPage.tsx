import * as React from 'react';
import SignUp from '../components/Log-in/signUp';
import withLayout from '../containers/LoginLayoutContainer';

function SignUpPage(): React.JSX.Element {
    return <SignUp />;
}
export default withLayout(SignUpPage);
