import * as React from 'react';
import DomainPage from '../components/DomainPage';
import AddMenuDomain from '../components/AddMenuDomain';
import DomainGraphMenu from '../components/DomainGraphMenu';
import { useSelector } from 'react-redux';
function SelectedDomainPage(): React.JSX.Element {
    const programBookDataById = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    return (
        <div
            className="pt-1 pl-3 sm:pl-4 md:pl-4 w-full"
            data-testid="selected-domain-page"
        >
            {/* <!-- Page Heading --> */}
            <DomainPage />
            <AddMenuDomain />
            {programBookDataById ? null : <DomainGraphMenu />}
            {/* <!-- End Page Heading --> */}
        </div>
    );
}
export default SelectedDomainPage;
