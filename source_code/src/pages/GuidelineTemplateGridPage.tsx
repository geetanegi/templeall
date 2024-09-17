import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import GuidelineTemplateGrid from '../components/GuidelineTemplateGrid';

function GuidelineTemplateGridPage(): React.JSX.Element {
    return <GuidelineTemplateGrid />;
}

export default withLayout(GuidelineTemplateGridPage);
