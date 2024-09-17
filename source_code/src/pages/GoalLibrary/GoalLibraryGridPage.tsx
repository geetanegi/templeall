import * as React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import GoalLibraryGrid from '../../components/GoalLibrary/GoalLibraryGrid';

function GoalLibraryGridPage(): React.JSX.Element {
    return <GoalLibraryGrid />;
}

export default withLayout(GoalLibraryGridPage);
