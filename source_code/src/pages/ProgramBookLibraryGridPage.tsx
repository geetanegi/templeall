import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import ProgramBookLibraryGrid from '../components/ProgramBookLibraryGrid';

function ProgramBookLibraryGridPage(): React.JSX.Element {
    return <ProgramBookLibraryGrid />;
}

export default withLayout(ProgramBookLibraryGridPage);
