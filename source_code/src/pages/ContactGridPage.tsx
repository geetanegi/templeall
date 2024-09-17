import * as React from 'react';
import ContactGrid from '../components/usersOnBoarding/usersGrid';
import withLayout from '../containers/MasterLayoutContainer';

function ContactGridPage(): React.JSX.Element {
    return <ContactGrid />;
}
export default withLayout(ContactGridPage);
