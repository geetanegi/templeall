import * as React from 'react';
import withLayout from '../containers/ClientDocumentsLayoutContainer';
import DomainMenu from '../components/DomainMenu';
import AddMenuClientDocument from '../components/AddMenuClientDocument';
import ClientDocumentsSection from '../components/ClientDocuments';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllDocumentByIdCall } from '../redux/slice/GetDocumentById/getAllDocument';
import ProgramBookTabs from '../components/ProgramBookTabs';
function ClientDocuments(): React.JSX.Element {
    const programBookData = useSelector(
        ({ getProgramBookDataById }: any) => getProgramBookDataById?.value?.data
    );
    const programBookDataById = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );

    const documentData = useSelector(
        ({ getAllDocument }: any) => getAllDocument?.value
    );
    const params = useParams();
    const [idData, setIdData] = React.useState<any>('');
    const dispatch = useDispatch<any>();
    React.useEffect(() => {
        if (params?.id != idData) {
            const data = {
                programBookUUID: params?.id,
            };
            setIdData(params?.id);
            dispatch(getAllDocumentByIdCall(data));
        }
    }, [dispatch, params?.id, documentData]);

    return (
        <div
            className="bg-[#FFFFFF]-50 flex flex-col px-4 pb-1"
            data-testid="client-documents-page"
        >
            {/* <!-- ========== MAIN CONTENT ========== --> */}
            <div className="flex flex-col pr-3 pt-2">
                <div className="pb-1 flex justify-between ">
                    <label className="text-[#18868D] font-semibold text-md">
                        {programBookData?.name?.charAt(0).toUpperCase() +
                            programBookData?.name?.slice(1)}
                    </label>
                </div>
                <div className="w-1/2 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
            </div>
            <div className="flex justify-between pr-3 pt-1 pb-2">
                {programBookDataById ? '' : <ProgramBookTabs />}
            </div>
            <div className="flex h-[31.5rem]">
                <DomainMenu />
                {/* <!-- Content --> */}
                <div className="pt-1 pl-3 sm:pl-4 md:pl-4 w-full">
                    {/* <!-- Page Heading --> */}
                    {documentData?.hasOwnProperty('data') ? (
                        <AddMenuClientDocument />
                    ) : (
                        ''
                    )}
                    <ClientDocumentsSection />
                    {/* <!-- End Page Heading --> */}
                </div>
                {/* <!-- End Content --> */}
            </div>
            {/* <!-- ========== END MAIN CONTENT ========== --> */}
        </div>
    );
}
export default withLayout(ClientDocuments);
