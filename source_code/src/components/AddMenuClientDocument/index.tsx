import * as React from 'react';
import currentBIP from '../../assets/img/currentBIP.svg';
import clientFacesheet from '../../assets/img/clientFacesheet.svg';
import clientNAP from '../../assets/img/clientNAP.svg';
import evalution from '../../assets/img/evalution.svg';
import plus from '../../assets/img/plus.svg';
import archieve from '../../assets/img/archieve.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getDocumentCall } from '../../redux/slice/GetClientDocument/getClientDocument';
import AddMenuClientDocumentModal from '../AddMenuClientDocumentModal';

export default function AddMenuClientDocument(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [idData, setIdData] = React.useState({});
    const [openClientModal, setOpenClientModal] = React.useState(false);
    const [titleData, setTitleData] = React.useState('');
    const [titleValue, setTitleValue] = React.useState('');
    const [clientDocumentIconDynamicDiv, setClientDocumentIconDynamicDiv] =
        React.useState<Array<any>>([]);
    const documentData = useSelector(
        ({ getAllDocument }: any) => getAllDocument?.value
    );
    const editDocumentData = useSelector(
        ({ getClientDocument }: any) =>
            getClientDocument?.value?.data?.description
    );

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
    const addNewType = (objectValue: any): void => {
        if (objectValue?.type?.indexOf('NEW_TYPE') !== -1) {
            let tempData = [];
            tempData = clientDocumentIconDynamicDiv;
            let check = true,
                updateData = false;
            const tempData1 = tempData.map((data) => {
                if (data?.type === objectValue?.type) {
                    check = false;
                    if (data?.name != objectValue?.name) {
                        updateData = true;
                        return {
                            ...data,
                            name: objectValue.name,
                        };
                    } else {
                        return data;
                    }
                } else {
                    return data;
                }
            });
            if (tempData1.length < 2 && check) {
                tempData1.push(objectValue);
                setClientDocumentIconDynamicDiv(tempData1);
            }
            if (updateData) {
                setClientDocumentIconDynamicDiv(tempData1);
            }
        }
    };

    React.useEffect(() => {
        documentData?.data?.map((data: any) => {
            if (data?.type?.indexOf('NEW_TYPE') !== -1) {
                if (
                    clientDocumentIconDynamicDiv.length ||
                    clientDocumentIconDynamicDiv[0]?.type !== data?.type ||
                    clientDocumentIconDynamicDiv[1]?.type !== data?.type
                )
                    addNewType(data);
            }
        });
    }, [documentData?.data, clientDocumentIconDynamicDiv]);
    const viewMode = useSelector(
        ({ ViewOnly }: any) =>
            ViewOnly?.viewOnlyValue || ViewOnly?.viewOnlyValueLibrary
    );
    const disable = viewMode;

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

    return (
        <>
            <div className="mt-[-16px]">
                <div className="flex justify-between items-center">
                    <div className="w-[55vw] rounded-t-md bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                    <div>
                        <button
                            type="submit"
                            className="py-2 px-[3rem] w-[12vw] justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-primary-700 text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
                            onClick={() =>
                                handleOpenModal(
                                    'Add New Document',
                                    clientDocumentIconDynamicDiv?.length
                                        ? 'NEW_TYPE2'
                                        : 'NEW_TYPE1'
                                )
                            }
                            disabled={
                                clientDocumentIconDynamicDiv?.length < 2
                                    ? disable
                                        ? true
                                        : false
                                    : true
                            }
                        >
                            <img src={plus}></img>
                            Add New
                        </button>
                    </div>
                </div>

                <div className="flex flex-col rounded-b-md bg-white shadow-md pl-10 shadow-[0_1px_3px_-2px_gray]">
                    <div className="flex justify-between pr-[10rem] pt-4">
                        {clientDocumentIconDiv(
                            currentBIP,
                            'Current BIP',
                            'Current BIP',
                            'CURRENT_BIP'
                        )}
                        {clientDocumentIconDiv(
                            clientFacesheet,
                            'Client Face Sheet',
                            'Client Face Sheet',
                            'CLIENT_FACESHEET'
                        )}
                        {clientDocumentIconDiv(
                            clientNAP,
                            'Client NAP Protocol',
                            'Client NAP Protocol',
                            'CURRENT_NAP_PROTOCOL'
                        )}
                        {clientDocumentIconDiv(
                            evalution,
                            'Evaluation Plan',
                            'Evaluation Plan',
                            'EVALUATION_PLAN'
                        )}
                        {clientDocumentIconDynamicDiv.map((data) =>
                            clientDocumentIconDiv(
                                evalution,
                                data?.name,
                                data?.name,
                                data?.type
                            )
                        )}
                    </div>
                    <div
                        className="flex justify-flex-end pr-3 pb-2"
                        style={{ justifyContent: 'flex-end' }}
                    >
                        <img src={archieve}></img>
                    </div>
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
                    addNewType={addNewType}
                />
            ) : null}
        </>
    );
}
