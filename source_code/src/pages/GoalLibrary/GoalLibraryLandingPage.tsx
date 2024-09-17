import React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import GoalLibraryLanding from '../../components/GoalLibrary/GoalLibraryLanding';

function GoalLibraryLandingPage(): React.JSX.Element {
    return <GoalLibraryLanding />;
}

export default withLayout(GoalLibraryLandingPage);
