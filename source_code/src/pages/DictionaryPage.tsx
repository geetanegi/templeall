import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import Dictionary from '../components/Dictionary';
function DictionaryPage(): React.JSX.Element {
    return <Dictionary />;
}
export default withLayout(DictionaryPage);
