import React from 'react';
import withLayout from '../../containers/MasterLayoutContainer';
import LongTermScreen from '../../components/GoalLibrary/LongTermScreen/LongTermScreen';

function LongTermGoalScreen(): React.JSX.Element {
    return <LongTermScreen />;
}

export default withLayout(LongTermGoalScreen);
