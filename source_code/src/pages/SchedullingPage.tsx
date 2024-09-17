import * as React from 'react';
import AddNewEvent from '../components/AddNewEvent';
import withLayout from '../containers/SchedullingContainer';

function SchedullingPage(): React.JSX.Element {
    return (
        <div className=" w-full flex flex-col justify-center">
            {/* <!-- Page Heading --> */}
            <AddNewEvent />

            {/* <!-- End Page Heading --> */}
        </div>
    );
}
export default withLayout(SchedullingPage);
