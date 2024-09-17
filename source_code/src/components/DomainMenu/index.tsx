/* eslint-disable max-len */
/* eslint-disable max-lines */
import * as React from 'react';
import document from '../../assets/img/document.svg';
import domain from '../../assets/img/domain.svg';
import deleteIcon from '../../assets/img/delete.svg';
import { Link, useParams } from 'react-router-dom';
import {
    clearProgramBookTree,
    getDomainByIdCall,
    getDomainByLibraryIdCall,
    savingDomainIndex,
    savingProgramBookTree,
} from '../../redux/slice/GetDomainById/getDomainById';
import { useDispatch, useSelector } from 'react-redux';
import {
    getDomainDataByDomainId,
    getProgramsByDomainIdCall,
    savingData,
    savingDomainName,
} from '../../redux/slice/GetProgramsByDomainId/getProgramsByDomainId';
import TargetList from './TargetList';
import {
    getProgramById,
    resetState,
    savingDataRenameProgram,
    savingOnRename,
    setProgramName,
} from '../../redux/slice/RenameProgram/renameProgram';
import { savingDataDomain } from '../../redux/slice/EditDomain/editDomain';
import { getProgramBookDataByIdCall } from '../../redux/slice/GetProgramBookDataById/getProgramBookDataById';
import {
    clearingTargetData,
    getTargetByIdCall,
    getTargetCall,
    savingClickedTargetData,
    savingSelectedTargetData,
} from '../../redux/slice/getTarget/getTargetByProgramId';
import { addTargetToSession } from '../../redux/slice/session/sessionSlice';
import {
    addItem,
    addToArrayItem,
    removeFromArrayItem,
    removeItem,
} from '../../redux/slice/addFromLibrary/addFromLibrarySlice';
import Checkbox from '../Generics/Inputs/Checkbox';
import { savingOnClickQuickLook } from '../../redux/slice/QuickLook/quickLook';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { openNotification } from '../../redux/slice/Notification/notifications';
import getProgramBookLibraryDataByIdApi from '../../api/services/ProgramBookLibrary/getProgramBookLibraryDataByIdApi.service';
import getProgramByIdAPI from '../../api/services/getProgramById.service';
import cancel from '../../assets/img/close.svg';
import save from '../../assets/img/Tick.svg';
import renameProgramAPI from '../../api/services/renameProgram.service';
import editDomainAPI from '../../api/services/editDomain.service';
import renameTarget from '../../api/services/renameTarget.service';
import {
    renameDomainAPI,
    renameTargetAPI,
    renameProgramLibAPI,
} from '../../api/services/RenameEntityLib/renameEntityLib';
import { ToastContext } from '../../contexts/ToastContext';
import { getPhaseForProgramCall } from '../../redux/slice/programPhase/getPhaseForProgram';
import addFromLibraryApis from '../../api/services/addFromLibrary.service';
import Spinner from '../Generics/Spinner';
export default function DomainMenu({
    programBookUUID,
    sessionPage,
    fromLibrary,
    disableLinks,
    addTargetQuickLook,
    setOverwriteData,
}: {
    programBookUUID?: string;
    sessionPage?: boolean;
    fromLibrary?: boolean;
    disableLinks?: boolean;
    addTargetQuickLook?: any;
    setOverwriteData?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const { addToast } = React.useContext(ToastContext);
    const [open, setOpen] = React.useState(false);
    const [onDelete, setOnDelete] = React.useState<any>({});
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);
    const [modalValues, setModalValues] = React.useState({
        id: '',
        name: '',
        value: '',
        parentId: '',
    });
    const params = useParams();
    const programBookId = programBookUUID ? programBookUUID : params?.id || '';
    const domainNames = useSelector(
        ({ getDomainById }: any) => getDomainById?.value?.[programBookId]?.data
    );
    const addFromLibraryData = useSelector(
        (state: any) => state.addFromLibrary.value
    );
    const isLibraryContent = useSelector(
        (state: any) => state.saveProgramBookLibraryDomainFolderData.library
    );
    const activeTab = useSelector(
        ({ getDomainById }: any) => getDomainById?.currentTab
    );
    const domainLibrary = useSelector(
        ({ saveProgramBookLibraryDomainFolderData }: any) =>
            saveProgramBookLibraryDomainFolderData?.value?.data
    );
    const openFolder = useSelector(({ getDomainById }: any) => getDomainById);
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const programData = useSelector(
        ({ getProgramsByDomainId }: any) => getProgramsByDomainId?.value
    );
    const url = window.location.href;
    const allTargets = useSelector(({ getTarget }: any) => getTarget?.value);
    const [onEditDomain, setOnEditDomain] = React.useState<any>({});
    const [onEditDomainName, setOnEditDomainName] = React.useState<any>({});
    const [onEditProgram, setOnEditProgram] = React.useState<any>({});
    const [onEditProgramName, setOnEditProgramName] = React.useState<any>({});
    const [onEditTarget, setOnEditTarget] = React.useState<any>({});
    const [onEditTargetName, setOnEditTargetName] = React.useState<any>({});
    const [checkClickedId, setCheckClickedId] = React.useState('');
    const handlePreventRedirection = (e: any): void => {
        const tab = url?.includes('mastered') || url?.includes('discontinued');
        if (sessionPage || tab || disableLinks) {
            e.preventDefault();
        }
    };
    const editedDomainData = useSelector(
        ({ editDomain }: any) => editDomain?.value?.data
    );
    const programBookDataById = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    const handleClientDocumentClick = (id: any): void => {
        dispatch(
            savingDomainIndex({
                domainIndex: id,
            })
        );
    };
    const targetData = useSelector(({ getTarget }: any) => getTarget);
    const handleDomainClick = (item: any): void => {
        dispatch(savingSelectedTargetData({}));
        dispatch(savingClickedTargetData({}));
        const data = {
            domainId: item?.id,
            phase: activeTab,
            isTargetPinned: addTargetQuickLook
                ? false
                : pinnedData?.addQuickLook,
            quickLookId: pinnedData?.clickedQuickLook,
        };
        const data2 = {
            domainId: item?.id,
            phase: activeTab,
        };
        dispatch(savingOnRename(true));
        if (fromLibrary === undefined) {
            dispatch(getDomainDataByDomainId(data2));
        }
        dispatch(savingDomainName(item?.name));
        dispatch(getProgramsByDomainIdCall(data));
        dispatch(savingDataDomain({}));
        dispatch(savingData({}));
        dispatch(savingDomainIndex({ domainIndex: item?.id }));
        setOpen(!open);
    };
    const handleProgramClick = (itemProgram: any): void => {
        dispatch(savingSelectedTargetData({}));
        dispatch(savingClickedTargetData({}));
        dispatch(savingOnRename(true));
        dispatch(savingDataRenameProgram({}));
        dispatch(savingDomainIndex({ programIndex: itemProgram?.id }));
        dispatch(getPhaseForProgramCall({ data: '' }));
        dispatch(
            getTargetCall({
                programId: itemProgram?.id,
                hasCriteria: fromLibrary ? false : sessionPage || false,
                isTargetPinned: addTargetQuickLook
                    ? false
                    : pinnedData?.addQuickLook,
                quickLookId: pinnedData?.clickedQuickLook,
            })
        );
        dispatch(resetState());
        const data = {
            id: itemProgram?.id,
            isTarget: targetData?.isFromTarget ? true : false,
        };
        if (fromLibrary === undefined) {
            dispatch(getProgramById(data));
            dispatch(setProgramName(itemProgram?.name));
        }
    };
    React.useEffect(() => {
        const data = {
            programBookUUID: programBookUUID
                ? programBookUUID
                : params?.id
                  ? params?.id
                  : '',
        };
        const domainData = {
            phase: activeTab,
            programBookUUID: programBookUUID
                ? programBookUUID
                : params?.id
                  ? params?.id
                  : '',
            isTargetPinned: addTargetQuickLook
                ? false
                : pinnedData?.addQuickLook,
            quickLookId: pinnedData?.clickedQuickLook,
        };
        if (fromLibrary) {
            dispatch(
                getDomainByLibraryIdCall({
                    programBookLibraryUUID: programBookUUID,
                })
            );
        } else {
            dispatch(getProgramBookDataByIdCall(data));
            if (!pinnedData?.addQuickLook) {
                dispatch(getDomainByIdCall(domainData));
            }
        }
        const data2: any = {
            domainId: params?.domainId,
            phase: activeTab,
            isTargetPinned: addTargetQuickLook
                ? false
                : pinnedData?.addQuickLook,
            quickLookId: pinnedData?.clickedQuickLook,
        };
        dispatch(getProgramsByDomainIdCall(data2));
    }, []);
    const handleAddTarget = (target: any): void => {
        const data = {
            targetId: target?.id,
        };
        if (sessionPage) {
            dispatch(
                addTargetToSession({
                    target,
                    programBookUUID,
                })
            );
        }
        dispatch(savingDomainIndex({ targetIndex: target?.name }));
        dispatch(savingSelectedTargetData(target));
        dispatch(getTargetByIdCall(data));
    };
    const handleAddToLibrary = (data: any): void => {
        dispatch(addItem(data));
        dispatch(addToArrayItem(data));
    };
    const handleRemoveFromLibrary = (data: any): void => {
        dispatch(removeItem(data));
        dispatch(removeFromArrayItem(data));
    };
    const getEntityId = (): any => {
        return params?.id || params?.domainId || params?.programId;
    };
    const handleDomainCheckChange = async (
        e: any,
        id: string,
        name: string
    ): Promise<void> => {
        if (e.target.checked) {
            setCheckClickedId(id);
            const isDuplicateResponse =
                await addFromLibraryApis.checkDuplicateInProgramBookLibrary({
                    name,
                    itemType: 'domain',
                    programBookId: getEntityId(),
                    domainId: '',
                    programId: '',
                });
            if (!isDuplicateResponse.data.data.dataExists) {
                handleAddToLibrary({
                    type: 'domain',
                    data: {
                        id,
                        name,
                        programBookId,
                    },
                });
            } else {
                setOverwriteData({
                    type: 'domain',
                    data: {
                        id,
                        name,
                        programBookId,
                    },
                });
            }
        } else {
            handleRemoveFromLibrary({
                type: 'domain',
                data: {
                    id,
                    name,
                    programBookId,
                },
            });
        }
    };
    const handleProgramCheckChange = async (
        e: any,
        id: string,
        name: string,
        domainId: string
    ): Promise<void> => {
        if (e.target.checked) {
            setCheckClickedId(id);
            const isDuplicateResponse =
                await addFromLibraryApis.checkDuplicateInProgramBookLibrary({
                    name,
                    itemType: 'program',
                    programBookId: getEntityId(),
                    domainId: params?.domainId || domainId,
                    programId: '',
                });
            if (!isDuplicateResponse.data.data.dataExists) {
                handleAddToLibrary({
                    type: 'program',
                    data: {
                        id,
                        domainId,
                        programBookId,
                        name,
                    },
                });
            } else {
                setOverwriteData({
                    type: 'program',
                    data: {
                        id,
                        domainId,
                        programBookId,
                        name,
                    },
                });
            }
        } else {
            handleRemoveFromLibrary({
                type: 'program',
                data: {
                    id,
                    domainId: params?.domainId,
                    programBookId,
                    name,
                },
            });
        }
    };
    const handleTargetCheckChange = async (
        e: any,
        id: string,
        name: string,
        programId: string,
        domainId: string
    ): Promise<void> => {
        if (e.target.checked) {
            setCheckClickedId(id);
            const isDuplicateResponse =
                await addFromLibraryApis.checkDuplicateInProgramBookLibrary({
                    name,
                    itemType: 'target',
                    programBookId: getEntityId(),
                    domainId: params?.domainId || domainId,
                    programId: params?.programId || programId,
                });
            if (!isDuplicateResponse.data.data.dataExists) {
                handleAddToLibrary({
                    type: 'target',
                    data: {
                        id,
                        domainId,
                        programId,
                        programBookId,
                        name,
                    },
                });
            } else {
                setOverwriteData({
                    type: 'target',
                    data: {
                        id,
                        domainId,
                        programId,
                        programBookId,
                        name,
                    },
                });
            }
        } else {
            handleRemoveFromLibrary({
                type: 'target',
                data: {
                    id,
                    domainId,
                    programId,
                    programBookId,
                    name,
                },
            });
        }
    };
    const isDomainChecked = (id: any): boolean => {
        return addFromLibraryData.domains.filter(
            (item: any) => item.id === id.toString()
        ).length
            ? true
            : false;
    };
    const isProgramChecked = (id: any): boolean => {
        return addFromLibraryData.programs.filter(
            (item: any) => item.id === id.toString()
        ).length
            ? true
            : false;
    };
    const isTargetChecked = (id: any): boolean => {
        return addFromLibraryData.targets.filter(
            (item: any) => item.id === id.toString()
        ).length
            ? true
            : false;
    };
    const handleMouseEnter = (id: any): any => {
        if (url?.includes('program-book')) {
            setOnDelete((prevState: any) => ({
                ...prevState,
                [id]: !prevState[id],
            }));
        }
    };
    const onClickOverview = (): any => {
        dispatch(clearProgramBookTree({}));
        dispatch(savingOnClickQuickLook(false));
        const domainData = {
            phase: activeTab,
            programBookUUID: params?.id,
            isTargetPinned: false,
            quickLookId: pinnedData?.clickedQuickLook,
        };
        dispatch(getDomainByIdCall(domainData));
        dispatch(clearingTargetData());
    };
    const handleDeleteDomain = (item: any): any => {
        setOpenConfirmationModalForDelete(true);
        setModalValues({
            id: item?.id,
            name: item?.name,
            value: 'domain',
            parentId: '',
        });
    };
    const handleProgram = (item: any, parentId: any): any => {
        setOpenConfirmationModalForDelete(true);
        setModalValues({
            id: item?.id,
            name: item?.name,
            value: 'program',
            parentId: parentId,
        });
    };
    const handleDeleteCall = async (): Promise<any> => {
        const isDomain = modalValues?.value === 'domain';
        const isProgram = modalValues?.value === 'program';
        const isTarget = modalValues?.value === 'target';
        const payload = {
            type: modalValues?.value.toUpperCase(),
            id: modalValues?.id,
        };
        const res = isLibraryContent
            ? await getProgramBookLibraryDataByIdApi.deleteProgramBookLibraries(
                  payload
              )
            : await getProgramByIdAPI.deleteProgramBook(payload);
        const successMessage = `${modalValues?.value.charAt(0).toUpperCase() + modalValues?.value.slice(1)} deleted successfully`;
        const errorMessage = `Unable to delete this ${modalValues?.value.charAt(0).toUpperCase() + modalValues?.value.slice(1)}`;
        setOpenConfirmationModalForDelete(false);
        setTimeout(() => {
            dispatch(
                openNotification({
                    success: !res?.data?.error,
                    title: res?.data?.error ? errorMessage : successMessage,
                    description: '',
                })
            );
        }, 800);
        if (!res?.data?.error) {
            const commonData = {
                phase: activeTab,
                quickLookId: pinnedData?.clickedQuickLook,
                isTargetPinned: pinnedData?.addQuickLook,
            };
            if (isDomain) {
                dispatch(
                    isLibraryContent
                        ? getDomainByLibraryIdCall({
                              programBookLibraryUUID:
                                  params?.id ?? programBookUUID,
                          })
                        : getDomainByIdCall({
                              ...commonData,
                              programBookUUID: params?.id,
                          })
                );
            } else if (isProgram || isTarget) {
                dispatch(
                    getProgramsByDomainIdCall({
                        ...commonData,
                        domainId: modalValues?.parentId,
                    })
                );
                if (isTarget) {
                    dispatch(
                        getTargetCall({
                            programId: modalValues?.parentId,
                            ...commonData,
                        })
                    );
                }
            }
            return res?.data;
        }
    };
    const showDuplicateErrorMsg = (type: any, desc: any): any => {
        if (
            desc?.includes('already exist') ||
            desc?.includes('already exists')
        ) {
            addToast({
                type: 'error',
                message: `Please provide an unique ${type} name`,
            });
        }
    };
    const showSuccessNotification = (type: any): any => {
        dispatch(
            openNotification({
                success: true,
                title: `${type} renamed successfully.`,
                description: '',
            })
        );
    };
    const handleRename = async (item: any, type: any): Promise<any> => {
        if (type === 'Domain') {
            setOnEditDomain((prevState: any) => ({
                ...prevState,
                [item?.id]: !prevState[item?.id],
            }));
            setOnEditDomainName((prevState: any) => ({
                ...prevState,
                [item?.id]: item?.name,
            }));
        } else if (type === 'Program') {
            setOnEditProgram((prevState: any) => ({
                ...prevState,
                [item?.id]: !prevState[item?.id],
            }));
            setOnEditProgramName((prevState: any) => ({
                ...prevState,
                [item?.id]: item?.name,
            }));
        } else if (type === 'Target') {
            setOnEditTarget((prevState: any) => ({
                ...prevState,
                [item?.id]: !prevState[item?.id],
            }));
            setOnEditTargetName((prevState: any) => ({
                ...prevState,
                [item?.id]: item?.name,
            }));
        }
    };
    const handleRenameTypeLib = async (
        item: any,
        type: string,
        parentId: number,
        domainId: number
    ): Promise<void> => {
        let data: any;
        let res: any;
        switch (type) {
            case 'Domain':
                data = {
                    domainId: item?.id,
                    programBookLibraryUUID: params?.id,
                    modifiedDomainName: onEditDomainName[item?.id]?.trim(),
                };
                res = await renameDomainAPI.renameDomain(data);
                if (!res?.data?.error) {
                    const domainData = {
                        phase: activeTab,
                        programBookUUID: params?.id,
                        isTargetPinned: false,
                        quickLookId: '',
                    };
                    dispatch(getDomainByIdCall(domainData));
                    setOnEditDomain((prevState: any) => ({
                        ...prevState,
                        [item?.id]: !prevState[item?.id],
                    }));
                    showSuccessNotification(type);
                } else {
                    showDuplicateErrorMsg(type, res?.data?.description);
                }
                break;
            case 'Program':
                data = {
                    domainId: parentId,
                    programId: item?.id,
                    modifiedProgramName: onEditProgramName[item?.id]?.trim(),
                };
                res = await renameProgramLibAPI.renameProgram(data);
                if (!res?.data?.error) {
                    const data2 = {
                        domainId: parentId,
                        phase: activeTab,
                        isTargetPinned: pinnedData?.addQuickLook,
                        quickLookId: pinnedData?.clickedQuickLook,
                    };
                    dispatch(getProgramsByDomainIdCall(data2));
                    setOnEditProgram((prevState: any) => ({
                        ...prevState,
                        [item?.id]: !prevState[item?.id],
                    }));
                    showSuccessNotification(type);
                } else {
                    showDuplicateErrorMsg(type, res?.data?.description);
                }
                break;
            case 'Target':
                data = {
                    domainId: domainId,
                    targetId: item?.id,
                    programId: parentId,
                    modifiedTargetName: onEditTargetName[item?.id]?.trim(),
                };
                res = await renameTargetAPI.renameTarget(data);
                if (!res?.data?.error) {
                    const data2 = {
                        programId: parentId,
                        isTargetPinned: pinnedData?.addQuickLook,
                        quickLookId: pinnedData?.clickedQuickLook,
                    };
                    dispatch(getTargetCall(data2));
                    setOnEditTarget((prevState: any) => ({
                        ...prevState,
                        [item?.id]: !prevState[item?.id],
                    }));
                    showSuccessNotification(type);
                } else {
                    showDuplicateErrorMsg(type, res?.data?.description);
                }
                break;
            default:
                break;
        }
    };
    const handleRenameType = async (
        item: any,
        type: string,
        parentId: number
    ): Promise<void> => {
        let payload: any;
        let response: any;
        switch (type) {
            case 'Domain':
                payload = {
                    domainId: item?.id,
                    programBookUUID: params?.id,
                    modifiedDomainName: onEditDomainName[item?.id]?.trim(),
                };
                response = await editDomainAPI.editDomain(payload);
                if (!response?.data?.error) {
                    const domainData = {
                        phase: activeTab,
                        programBookUUID: params?.id,
                        isTargetPinned: false,
                        quickLookId: '',
                    };
                    dispatch(getDomainByIdCall(domainData));
                    setOnEditDomain((prevState: any) => ({
                        ...prevState,
                        [item?.id]: !prevState[item?.id],
                    }));
                    showSuccessNotification(type);
                } else {
                    showDuplicateErrorMsg(type, response?.data?.description);
                }
                break;
            case 'Program':
                payload = {
                    domainId: parentId,
                    programId: item?.id,
                    modifiedProgramName: onEditProgramName[item?.id]?.trim(),
                };
                response = await renameProgramAPI.renameProgram(payload);
                if (!response?.data?.error) {
                    const payloadProg = {
                        domainId: parentId,
                        phase: activeTab,
                        isTargetPinned: pinnedData?.addQuickLook,
                        quickLookId: pinnedData?.clickedQuickLook,
                    };
                    dispatch(getProgramsByDomainIdCall(payloadProg));
                    setOnEditProgram((prevState: any) => ({
                        ...prevState,
                        [item?.id]: !prevState[item?.id],
                    }));
                    showSuccessNotification(type);
                } else {
                    showDuplicateErrorMsg(type, response?.data?.description);
                }
                break;
            case 'Target':
                payload = {
                    targetId: item?.id,
                    programId: parentId,
                    modifiedTargetName: onEditTargetName[item?.id]?.trim(),
                };
                response = await renameTarget.renameTarget(payload);
                if (!response?.data?.error) {
                    const payloadTarget = {
                        programId: parentId,
                        isTargetPinned: pinnedData?.addQuickLook,
                        quickLookId: pinnedData?.clickedQuickLook,
                    };
                    dispatch(getTargetCall(payloadTarget));
                    setOnEditTarget((prevState: any) => ({
                        ...prevState,
                        [item?.id]: !prevState[item?.id],
                    }));
                    showSuccessNotification(type);
                } else {
                    showDuplicateErrorMsg(type, response?.data?.description);
                }
                break;
            default:
                break;
        }
    };
    const handleSaveRename = async (
        item: any,
        type: any,
        parentId: any,
        domainId: any
    ): Promise<any> => {
        if (isLibraryContent) {
            handleRenameTypeLib(item, type, parentId, domainId);
        } else {
            handleRenameType(item, type, parentId);
        }
    };
    const getDomainName = (itemDomain: any): string => {
        if (itemDomain?.id === editedDomainData?.id) {
            return editedDomainData?.name;
        }
        return onEditDomainName?.[itemDomain?.id] || itemDomain?.name;
    };
    const getProgramName = (
        itemProgramId: any,
        itemProgramName: string
    ): string => {
        return onEditProgramName?.[itemProgramId] || itemProgramName;
    };
    const shouldShowSpinner = (id: any): JSX.Element | null => {
        return checkClickedId === id ? <Spinner /> : null;
    };
    const getClassNameDomain = (itemProgramId: any): string => {
        const justifyBetweenClass = fromLibrary ? 'justify-between' : '';
        const programBookTree = openFolder?.programBookTree?.[itemProgramId];
        const bgClass = programBookTree ? 'bg-[#D9D9D9]' : 'hover:bg-[#D9D9D9]';
        return `${justifyBetweenClass} ${bgClass} hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-[1.5rem] hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700`;
    };
    const getIconClassNames = (itemProgramId: any): string => {
        const rotateClass = openFolder?.programBookTree?.[itemProgramId]
            ? 'rotate-180'
            : '';
        return `${rotateClass} hs-accordion-active:hidden block w-4 h-4 cursor-pointer`;
    };
    const getProgramBookTreeClassName = (itemProgramId: any): string => {
        return !openFolder?.programBookTree?.[itemProgramId] ? 'hidden' : '';
    };
    return (
        <>
            {/* <!-- Sidebar --> */}
            <div
                id="application-sidebar"
                className={`${sessionPage ? 'w-full' : 'w-1/5'} ${url?.includes('program-book') ? 'h-[56.4rem]' : ''} z-auto hs-overlay rounded-md hs-overlay-open:translate-x-0 -translate-x-full  transition-all duration-300 transform top-0 start-0 bottom-0 z-[60]  bg-[#F7F7F7] border-e border-gray-200 pb-10  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0`}
            >
                {!sessionPage ? (
                    <div className="px-6 bg-[#47AAC9] py-3 rounded-t-md">
                        <Link to={`/program-book/${params?.id}`}>
                            <label
                                className="flex-none text-xl font-normal text-white cursor-pointer hover:underline"
                                onClick={() => {
                                    onClickOverview();
                                }}
                            >
                                Overview
                            </label>
                        </Link>
                    </div>
                ) : null}
                <nav
                    className={`${url?.includes('program-book') ? 'h-[59.5rem]' : ''} rounded-b-md hs-accordion-group py-1 w-full flex flex-col flex-wrap bg-[#F7F7F7] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-primary-600`}
                >
                    <ul className="space-b-1.5 w-parent">
                        {programBookDataById ? (
                            ''
                        ) : !sessionPage ? (
                            <Link
                                to={`/program-book/${params?.id}/client-document`}
                            >
                                <li
                                    className={`${
                                        openFolder?.domainIndex !== 12
                                            ? 'hover:bg-[#BBBBBB]'
                                            : 'bg-[#BBBBBB]'
                                    } border-b-[0.1rem]  border-solid border-[#394148]`}
                                    onClick={() =>
                                        handleClientDocumentClick(12)
                                    }
                                >
                                    <div className="flex px-6 py-2 ">
                                        <img src={document}></img>
                                        <label className="text-[#333333] font-medium text-md ml-2 ">
                                            Client Documents
                                        </label>
                                    </div>
                                </li>
                            </Link>
                        ) : null}
                        {(domainNames?.length
                            ? domainNames
                            : domainLibrary
                        )?.map(
                            (
                                itemDomain: {
                                    name: string;
                                    id: any;
                                    domainStatus: any;
                                    isTargetExecuted: any;
                                },
                                index: React.Key | null | undefined
                            ) => {
                                return (
                                    <li
                                        className="hs-accordion border-b-[0.1rem] border-solid border-[#394148]"
                                        id="users-accordion"
                                        key={index}
                                    >
                                        <button
                                            onMouseEnter={() => {
                                                handleMouseEnter(
                                                    itemDomain?.id
                                                );
                                            }}
                                            onMouseLeave={() => {
                                                handleMouseEnter(
                                                    itemDomain?.id
                                                );
                                            }}
                                            onClick={() =>
                                                handleDomainClick(itemDomain)
                                            }
                                            onDoubleClick={() => {
                                                handleRename(
                                                    itemDomain,
                                                    'Domain'
                                                );
                                            }}
                                            type="button"
                                            className={`hs-accordion-toggle px-6 py-3 w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 ${
                                                !openFolder?.programBookTree[
                                                    itemDomain?.id
                                                ]
                                                    ? 'hover:bg-[#BBBBBB]'
                                                    : 'bg-[#BBBBBB]'
                                            } hover:bg-[#BBBBBB]`}
                                        >
                                            {fromLibrary &&
                                            !params.domainId &&
                                            !params.programId ? (
                                                <Checkbox
                                                    checked={isDomainChecked(
                                                        itemDomain.id.toString()
                                                    )}
                                                    onChange={(e: any) =>
                                                        handleDomainCheckChange(
                                                            e,
                                                            itemDomain.id.toString(),
                                                            itemDomain.name
                                                        )
                                                    }
                                                />
                                            ) : null}
                                            <img src={domain}></img>
                                            {onEditDomain[itemDomain?.id] ? (
                                                <div className="space-x-2 flex items-end">
                                                    <input
                                                        onChange={(e) => {
                                                            setOnEditDomainName(
                                                                (
                                                                    prevState: any
                                                                ) => ({
                                                                    ...prevState,
                                                                    [itemDomain?.id]:
                                                                        e
                                                                            ?.target
                                                                            ?.value,
                                                                })
                                                            );
                                                        }}
                                                        type="text"
                                                        value={
                                                            onEditDomainName[
                                                                itemDomain?.id
                                                            ]
                                                        }
                                                        className="peer text-[#394148] text-sm font-medium py-1 pe-0 ps-1 block w-full bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-gray-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-0"
                                                    />
                                                    <div className="flex w-[5rem] ml-3 space-x-1">
                                                        <img
                                                            onClick={() =>
                                                                handleSaveRename(
                                                                    itemDomain,
                                                                    'Domain',
                                                                    '',
                                                                    ''
                                                                )
                                                            }
                                                            src={save}
                                                            className="cursor-pointer h-[1rem]"
                                                        ></img>
                                                        <img
                                                            src={cancel}
                                                            onClick={() => {
                                                                setOnEditDomainName(
                                                                    (
                                                                        prevState: any
                                                                    ) => ({
                                                                        ...prevState,
                                                                        [itemDomain?.id]:
                                                                            itemDomain?.name,
                                                                    })
                                                                );
                                                                setOnEditDomain(
                                                                    false
                                                                );
                                                            }}
                                                            className="cursor-pointer h-[1rem] hover:bg-white px-0 rounded-full"
                                                        ></img>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link
                                                    onClick={
                                                        handlePreventRedirection
                                                    }
                                                    to={`/program-book/${params?.id}/domain/${itemDomain?.id}`}
                                                >
                                                    <label className="text-[#333333] font-medium text-md inline-block items-center overflow-hidden text-ellipsis max-w-[150px]">
                                                        {getDomainName(
                                                            itemDomain
                                                        )}
                                                        {shouldShowSpinner(
                                                            itemDomain?.id
                                                        )}
                                                    </label>
                                                </Link>
                                            )}
                                            {onDelete[itemDomain?.id] &&
                                            !itemDomain?.isTargetExecuted ? (
                                                <img
                                                    src={deleteIcon}
                                                    onClick={() =>
                                                        handleDeleteDomain(
                                                            itemDomain
                                                        )
                                                    }
                                                    className="h-[1.2rem] cursor-pointer"
                                                />
                                            ) : (
                                                ''
                                            )}
                                            <svg
                                                onClick={() => {
                                                    dispatch(
                                                        savingProgramBookTree(
                                                            itemDomain?.id
                                                        )
                                                    );
                                                }}
                                                className={`${openFolder?.programBookTree[itemDomain?.id] ? 'rotate-180' : ''} hs-accordion-active:hidden ms-auto block w-4 h-4 cursor-pointer`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </button>
                                        <div
                                            id="users-accordion-sub"
                                            className={`${
                                                !openFolder?.programBookTree[
                                                    itemDomain?.id
                                                ]
                                                    ? 'hidden'
                                                    : ''
                                            } hs-accordion-content w-full overflow-hidden transition-[height] duration-300`}
                                        >
                                            <ul
                                                className="hs-accordion-group"
                                                data-hs-accordion-always-open
                                            >
                                                {programData?.[
                                                    itemDomain.id
                                                ]?.map(
                                                    (
                                                        itemProgram: {
                                                            name: string;
                                                            id: any;
                                                            targetList: any;
                                                            programStatus: any;
                                                            isTargetExecuted: any;
                                                        },
                                                        programIndex:
                                                            | React.Key
                                                            | null
                                                            | undefined
                                                    ) => {
                                                        return (
                                                            <li
                                                                className="hs-accordion"
                                                                id="users-accordion-sub-1"
                                                                key={
                                                                    programIndex
                                                                }
                                                            >
                                                                <button
                                                                    type="button"
                                                                    onMouseEnter={() => {
                                                                        handleMouseEnter(
                                                                            itemProgram?.id
                                                                        );
                                                                    }}
                                                                    onMouseLeave={() => {
                                                                        handleMouseEnter(
                                                                            itemProgram?.id
                                                                        );
                                                                    }}
                                                                    onClick={() => {
                                                                        handleProgramClick(
                                                                            itemProgram
                                                                        );
                                                                        dispatch(
                                                                            savingProgramBookTree(
                                                                                itemProgram?.id
                                                                            )
                                                                        );
                                                                    }}
                                                                    onDoubleClick={() => {
                                                                        handleRename(
                                                                            itemProgram,
                                                                            'Program'
                                                                        );
                                                                    }}
                                                                    className={getClassNameDomain(
                                                                        itemProgram?.id
                                                                    )}
                                                                >
                                                                    <div className="flex space-x-3">
                                                                        {!fromLibrary ? (
                                                                            <>
                                                                                <svg
                                                                                    className={getIconClassNames(
                                                                                        itemProgram?.id
                                                                                    )}
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                >
                                                                                    <path d="m6 9 6 6 6-6" />
                                                                                </svg>
                                                                            </>
                                                                        ) : null}
                                                                        {fromLibrary &&
                                                                        !params.programId ? (
                                                                            <Checkbox
                                                                                checked={isProgramChecked(
                                                                                    itemProgram.id.toString()
                                                                                )}
                                                                                onChange={(
                                                                                    e: any
                                                                                ) =>
                                                                                    handleProgramCheckChange(
                                                                                        e,
                                                                                        itemProgram.id.toString(),
                                                                                        itemProgram.name,
                                                                                        itemDomain.id.toString()
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : null}
                                                                        {onEditProgram[
                                                                            itemProgram
                                                                                ?.id
                                                                        ] ? (
                                                                            <div className="space-x-2 flex items-end">
                                                                                <input
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setOnEditProgramName(
                                                                                            (
                                                                                                prevState: any
                                                                                            ) => ({
                                                                                                ...prevState,
                                                                                                [itemProgram?.id]:
                                                                                                    e
                                                                                                        ?.target
                                                                                                        ?.value,
                                                                                            })
                                                                                        );
                                                                                    }}
                                                                                    type="text"
                                                                                    value={
                                                                                        onEditProgramName[
                                                                                            itemProgram
                                                                                                ?.id
                                                                                        ]
                                                                                    }
                                                                                    className="peer text-[#394148] text-sm font-medium py-1 pe-0 ps-1 block w-full bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-gray-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-0"
                                                                                />
                                                                                <div className="flex w-[5rem] ml-3 space-x-1">
                                                                                    <img
                                                                                        onClick={() =>
                                                                                            handleSaveRename(
                                                                                                itemProgram,
                                                                                                'Program',
                                                                                                itemDomain?.id,
                                                                                                ''
                                                                                            )
                                                                                        }
                                                                                        src={
                                                                                            save
                                                                                        }
                                                                                        className="cursor-pointer h-[1rem]"
                                                                                    ></img>
                                                                                    <img
                                                                                        src={
                                                                                            cancel
                                                                                        }
                                                                                        onClick={() => {
                                                                                            setOnEditProgramName(
                                                                                                (
                                                                                                    prevState: any
                                                                                                ) => ({
                                                                                                    ...prevState,
                                                                                                    [itemProgram?.id]:
                                                                                                        itemProgram?.name,
                                                                                                })
                                                                                            );
                                                                                            setOnEditProgram(
                                                                                                false
                                                                                            );
                                                                                        }}
                                                                                        className="cursor-pointer h-[1rem] hover:bg-white px-0 rounded-full"
                                                                                    ></img>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <Link
                                                                                onClick={
                                                                                    handlePreventRedirection
                                                                                }
                                                                                to={`/program-book/${params?.id}/domain/${itemDomain?.id}/program/${itemProgram?.id}`}
                                                                            >
                                                                                <label className="font-normal flex items-center">
                                                                                    {getProgramName(
                                                                                        itemProgram?.id,
                                                                                        itemProgram?.name
                                                                                    )}
                                                                                    {shouldShowSpinner(
                                                                                        itemProgram?.id
                                                                                    )}
                                                                                </label>
                                                                            </Link>
                                                                        )}
                                                                        {onDelete[
                                                                            itemProgram
                                                                                ?.id
                                                                        ] &&
                                                                        !itemProgram?.isTargetExecuted ? (
                                                                            <img
                                                                                src={
                                                                                    deleteIcon
                                                                                }
                                                                                onClick={() =>
                                                                                    handleProgram(
                                                                                        itemProgram,
                                                                                        itemDomain?.id
                                                                                    )
                                                                                }
                                                                                className="h-[1.2rem] cursor-pointer"
                                                                            />
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                    </div>
                                                                    {fromLibrary ? (
                                                                        <>
                                                                            <svg
                                                                                className={getIconClassNames(
                                                                                    itemProgram?.id
                                                                                )}
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24"
                                                                                height="24"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            >
                                                                                <path d="m6 9 6 6 6-6" />
                                                                            </svg>
                                                                        </>
                                                                    ) : null}
                                                                </button>
                                                                <div
                                                                    id="users-accordion-sub-1-child"
                                                                    className={`${getProgramBookTreeClassName(itemProgram?.id)} droppable hs-accordion-content w-full overflow-hidden transition-[height] duration-300`}
                                                                >
                                                                    <ul className="flex flex-col space-y-2">
                                                                        {allTargets?.[
                                                                            itemProgram
                                                                                .id
                                                                        ]?.data
                                                                            ?.slice()
                                                                            .sort(
                                                                                (
                                                                                    a: any,
                                                                                    b: any
                                                                                ) =>
                                                                                    a.indexCount -
                                                                                    b.indexCount
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    target: any
                                                                                ) => {
                                                                                    return (
                                                                                        <TargetList
                                                                                            checkClickedId={
                                                                                                checkClickedId
                                                                                            }
                                                                                            itemProgram={
                                                                                                itemProgram
                                                                                            }
                                                                                            itemDomain={
                                                                                                itemDomain
                                                                                            }
                                                                                            fromLibrary={
                                                                                                fromLibrary
                                                                                            }
                                                                                            target={
                                                                                                target
                                                                                            }
                                                                                            key={
                                                                                                target?.indexCount
                                                                                            }
                                                                                            handleAddTarget={
                                                                                                handleAddTarget
                                                                                            }
                                                                                            handleTargetCheckChange={
                                                                                                handleTargetCheckChange
                                                                                            }
                                                                                            isTargetChecked={
                                                                                                isTargetChecked
                                                                                            }
                                                                                            handlePreventRedirection={
                                                                                                handlePreventRedirection
                                                                                            }
                                                                                            onDelete={
                                                                                                onDelete
                                                                                            }
                                                                                            handleMouseEnter={
                                                                                                handleMouseEnter
                                                                                            }
                                                                                            fromQuickLook={
                                                                                                addTargetQuickLook
                                                                                            }
                                                                                            setOpenConfirmationModalForDelete={
                                                                                                setOpenConfirmationModalForDelete
                                                                                            }
                                                                                            setModalValues={
                                                                                                setModalValues
                                                                                            }
                                                                                            onEditTarget={
                                                                                                onEditTarget
                                                                                            }
                                                                                            setOnEditTarget={
                                                                                                setOnEditTarget
                                                                                            }
                                                                                            onEditTargetName={
                                                                                                onEditTargetName
                                                                                            }
                                                                                            setOnEditTargetName={
                                                                                                setOnEditTargetName
                                                                                            }
                                                                                            handleRename={
                                                                                                handleRename
                                                                                            }
                                                                                            handleSaveRename={
                                                                                                handleSaveRename
                                                                                            }
                                                                                        />
                                                                                    );
                                                                                }
                                                                            )}
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </nav>
            </div>
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={`Delete ${modalValues?.value.charAt(0).toUpperCase() + modalValues?.value.slice(1)} `}
                    name={modalValues?.name}
                    title={`Are you sure you want to delete this ${modalValues?.value} ?`}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={handleDeleteCall}
                />
            )}
        </>
        //  {/* <!-- End Sidebar --> */}
    );
}
