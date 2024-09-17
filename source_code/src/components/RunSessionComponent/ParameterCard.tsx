import React, { useEffect, useState } from 'react';
import CurrentBIP from '../../assets/img/sessionScreen/CurrentBIP.svg';
import FaceSheet from '../../assets/img/sessionScreen/ClientFaceSheet.svg';
import evalution from '../../assets/img/evalution.svg';
import { useSelector, useDispatch } from 'react-redux';
import NAP from '../../assets/img/clientNAP.svg';
import AddMenuClientDocumentModal from '../AddMenuClientDocumentModal';
import { getDocumentCall } from '../../redux/slice/GetClientDocument/getClientDocument';
import { getAllDocumentByProgramBookIdCall } from '../../redux/slice/GetDocumentById/getAllDocument';
export default function ParameterCard(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [titleData, setTitleData] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [idData, setIdData] = useState({});
    const [openClientModal, setOpenClientModal] = useState(false);
    const [clientDocumentIconDynamicDiv, setClientDocumentIconDynamicDiv] =
        useState<Array<any>>([]);
    const documentData = useSelector(
        ({ getAllDocument }: any) => getAllDocument?.value
    );
    const editDocumentData = useSelector(
        ({ getClientDocument }: any) =>
            getClientDocument?.value?.data?.description
    );
    const programBookId = useSelector(
        ({ runSession }: any) =>
            runSession?.value?.sessionData?.programBookId?.id
    );
    const disable = false;
    const openModal = (keyValue: string): void => {
        const temp = documentData?.data?.find((e: any) => e.type === keyValue);
        setIdData(temp?.id);
        const data = {
            id: temp?.id,
        };
        dispatch(getDocumentCall(data));
    };
    const handleOpenModal = (newValue: string, keyValue: string): void => {
        setTitleData(newValue);
        setTitleValue(keyValue);
        openModal(keyValue);
        setTimeout(() => {
            setOpenClientModal(true);
        }, 3000);
    };
    const clientDocumentIconDiv = (
        icon: any,
        text: string,
        modalArg1: string,
        modalArg2: string
    ): any => {
        return (
            <div className="flex cursor-pointer flex-col">
                <div
                    className={`flex flex-col items-center ${disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    onClick={
                        !disable
                            ? () => handleOpenModal(modalArg1, modalArg2)
                            : undefined
                    } // Use undefined instead of null
                >
                    <div className="">
                        <img src={icon}></img>
                    </div>
                    <div>
                        <label className="text-black font-light text-sm font-medium">
                            {text}
                        </label>
                    </div>
                </div>
            </div>
        );
    };
    useEffect(() => {
        dispatch(
            getAllDocumentByProgramBookIdCall({ programBookId: programBookId })
        );
    }, [programBookId]);
    useEffect(() => {
        const otherDocuments = documentData?.data?.filter((item: any) =>
            item?.type?.includes('NEW_TYPE')
        );
        setClientDocumentIconDynamicDiv(otherDocuments);
    }, [documentData?.data]);
    return (
        <>
            <div className=" bg-white w-3/4 flex flex-col ml-3 ">
                <div className="w-[55vw] rounded-t-md bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                <div className="flex justify-evenly items-center h-full">
                    {clientDocumentIconDiv(
                        CurrentBIP,
                        'Current BIP',
                        'Current BIP',
                        'CURRENT_BIP'
                    )}
                    {clientDocumentIconDiv(
                        FaceSheet,
                        'Client Face Sheet',
                        'Client Face Sheet',
                        'CLIENT_FACESHEET'
                    )}
                    {clientDocumentIconDiv(
                        NAP,
                        'Client NAP Protocol',
                        'Client NAP Protocol',
                        'CURRENT_NAP_PROTOCOL'
                    )}
                    {clientDocumentIconDiv(
                        FaceSheet,
                        'Evaluation Plan',
                        'Evaluation Plan',
                        'EVALUATION_PLAN'
                    )}
                    {clientDocumentIconDynamicDiv?.map((data) =>
                        clientDocumentIconDiv(
                            evalution,
                            data?.name,
                            data?.name,
                            data?.type
                        )
                    )}
                </div>
            </div>
            {openClientModal ? (
                <AddMenuClientDocumentModal
                    open={openClientModal}
                    titleData={titleData}
                    titleValue={titleValue}
                    onClose={() => setOpenClientModal(false)}
                    id={idData}
                    editDocumentData={
                        editDocumentData ? JSON.parse(editDocumentData) : ''
                    }
                />
            ) : null}
        </>
    );
}
