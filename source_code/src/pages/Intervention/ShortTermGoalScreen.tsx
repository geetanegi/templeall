import React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import ShortTermScreen from '../../components/InterventionFiles/ShortTermScreen/ShortTermScreen';

function ShortTermGoalScreen(): React.JSX.Element {
    return <ShortTermScreen />;
}

export default withLayout(ShortTermGoalScreen);
