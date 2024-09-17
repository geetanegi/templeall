import * as React from 'react';
import withLayout from '../containers/ProgramsContainer';
import DomainMenu from '../components/DomainMenu';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProgramBookTabs from '../components/ProgramBookTabs';
import empty from '../assets/img/Empty_state_diagram.svg';
import { clearProgramBookTree } from '../redux/slice/GetDomainById/getDomainById';

function ProgramBookPageMastered(): React.JSX.Element {
    const programBookData = useSelector(
        ({ getProgramBookDataById }: any) => getProgramBookDataById?.value?.data
    );
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibrary }: any) => saveProgramBookLibrary?.value?.data
    );
    const viewModelibraryName = useSelector(
        ({ ViewOnly }: any) => ViewOnly?.libraryName
    );
    const params = useParams();
    const dispatch = useDispatch<any>();
    return (
        <div
            className="bg-[#FFFFFF]-50 flex flex-col px-4 pb-1"
            data-testid="program-book-mastered-page"
        >
            {/* <!-- ========== MAIN CONTENT ========== --> */}
            <div className="flex flex-col pr-3 pt-2">
                <div className="pb-1 flex justify-between ">
                    <Link to={`/program-book/${params?.id}`}>
                        <label
                            onClick={() => {
                                dispatch(clearProgramBookTree({}));
                            }}
                            className="text-[#18868D] font-semibold text-md cursor-pointer hover:underline"
                        >
                            {programBookData?.name?.charAt(0).toUpperCase() +
                                programBookData?.name?.slice(1) ||
                                programBookLibrary?.name
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    programBookLibrary?.name?.slice(1) ||
                                viewModelibraryName?.charAt(0).toUpperCase() +
                                    viewModelibraryName?.slice(1)}
                        </label>
                    </Link>
                </div>
                <div
                    className="w-1/2 bg-gradient-to-r from-[#48ABCA]
                from-0% to-transparent h-[0.2rem] rounded-t-md"
                ></div>
            </div>
            <div className="flex justify-between pr-3 pt-1 pb-2">
                {programBookLibrary ? '' : <ProgramBookTabs />}
            </div>
            <div className="flex h-[31.5rem]">
                <DomainMenu />

                <div className="flex flex-col text-center items-center pt-[10rem] w-full space-y-3">
                    <img src={empty} />
                    <label className="font-light text-2xl">
                        There are currently no entities selected
                    </label>
                    <label className="font-medium text-medium text-primary-700">
                        Click on any entity to view details
                    </label>
                </div>
            </div>
            {/* <!-- ========== END MAIN CONTENT ========== --> */}
        </div>
    );
}
export default withLayout(ProgramBookPageMastered);
