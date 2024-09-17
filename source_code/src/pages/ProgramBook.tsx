/* eslint-disable max-len */
import * as React from 'react';
import withLayout from '../containers/MasterLayoutContainer';
import CardsMenu from '../components/CardsMenu';
import PinnedLooks from '../components/PinnedLooks';
import AddMenu from '../components/AddMenu';
import GraphMenu from '../components/GraphMenu';
import DomainMenu from '../components/DomainMenu';
import { useSelector } from 'react-redux';
import RenameProgramBookComponent from '../components/RenameProgramBookComponent';
import ProgramBookTabs from '../components/ProgramBookTabs';
import { Link } from 'react-router-dom';
import ABCModal from '../components/ABC/ABCModal';
function ProgramBook(): React.JSX.Element {
    const [openModal, setOpenModal] = React.useState(false);
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    const viewMode = useSelector(
        ({ ViewOnly }: any) => ViewOnly?.viewOnlyValueLibrary
    );
    const handleABCModal = (): void => {
        setOpenModal(true);
    };
    const disable = viewMode;
    return (
        <div
            className="bg-[#FFFFFF]-50 mt-2 flex flex-col px-4 pb-1"
            data-testid="program-book-landing-page"
        >
            {/* <!-- ========== MAIN CONTENT ========== --> */}
            <RenameProgramBookComponent />
            <div className="flex justify-between pr-3 pt-1 pb-2">
                {programBookLibrary || disable ? '' : <ProgramBookTabs />}
                <div onClick={handleABCModal} data-testid="click-on-route">
                    <Link to={''} className="text-md font-bold text-[#1A99C1]">
                        {'Antecedent Behavior Consequence Data'}
                    </Link>
                </div>
            </div>
            <div className="flex">
                <DomainMenu />
                {/* <!-- Content --> */}
                <div className="pt-1 pl-3 sm:pl-4 md:pl-4 w-4/5">
                    {/* <!-- Page Heading --> */}
                    {programBookLibrary || disable ? '' : <CardsMenu />}
                    {programBookLibrary || disable ? '' : <PinnedLooks />}
                    <AddMenu />
                    {programBookLibrary || disable ? '' : <GraphMenu />}
                    {/* <!-- End Page Heading --> */}
                </div>
                {/* <!-- End Content --> */}
            </div>
            {/* <!-- ========== END MAIN CONTENT ========== --> */}
            {openModal && (
                <ABCModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                />
            )}
        </div>
    );
}
export default withLayout(ProgramBook);
