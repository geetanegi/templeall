import * as React from 'react';
import ProgramPage from '../components/ProgramPage';
import { useSelector, useDispatch } from 'react-redux';
import { getPhaseForProgramCall } from '../redux/slice/programPhase/getPhaseForProgram';
import ProgramGraphMenu from '../components/programMenuGraph';
function SelectedProgramPage(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const programBookDataById = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    React.useEffect(() => {
        dispatch(getPhaseForProgramCall({ data: '' }));
    }, []);
    return (
        <div
            className="pt-1 pl-3 sm:pl-4 md:pl-4 w-3/4"
            data-testid="selected-program-page"
        >
            {/* <!-- Page Heading --> */}
            <ProgramPage />
            {programBookDataById ? null : <ProgramGraphMenu />}
            {/* <!-- End Page Heading --> */}
        </div>
    );
}
export default SelectedProgramPage;
