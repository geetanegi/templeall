import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import MasteryCriteriaTemplateGrid from '../components/MasteryCriteriaTemplateGrid';

function MasteryCriteriaTemplateGridPage(): React.JSX.Element {
    return <MasteryCriteriaTemplateGrid />;
}

export default withLayout(MasteryCriteriaTemplateGridPage);
