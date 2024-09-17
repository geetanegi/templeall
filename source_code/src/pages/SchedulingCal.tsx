/* eslint-disable max-len */
import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import 'react-calendar/dist/Calendar.css';
import Scheduling from '../components/SchedulingComponents';

function SchedulingCal(): React.JSX.Element {
    return (
        <>
            <Scheduling />
        </>
    );
}
export default withLayout(SchedulingCal);
