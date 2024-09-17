import React, { useEffect } from 'react';
import Modal, { AddFromLibraryModalFooter, ModalBody } from '../Generics/Modal';
import { X } from 'lucide-react';
import LibraryComponent from './LibraryComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProgramBookLibraries } from '../../redux/slice/programBookLibrary/programBookLibrarySlice';
import { useParams } from 'react-router-dom';
import addFromLibraryApis from '../../api/services/addFromLibrary.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { getDomainByIdCall } from '../../redux/slice/GetDomainById/getDomainById';
import {
    addItem,
    addToArrayItem,
    resetStateLibrary,
} from '../../redux/slice/addFromLibrary/addFromLibrarySlice';
import { getProgramsByDomainIdCall } from '../../redux/slice/GetProgramsByDomainId/getProgramsByDomainId';
import { getTargetCall } from '../../redux/slice/getTarget/getTargetByProgramId';
import OverwriteModal from './OverwriteModal';
import OverwriteAndRenameModal from './OverwriteAndRenameModal';
import RenameModal from './RenameModal';

export default function AddFromLibrary({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    useEffect(() => {
        dispatch(getAllProgramBookLibraries());
    }, []);

    const libraries = useSelector(
        (state: any) => state.programBookLibraries.value
    );
    const activeTab = useSelector(
        ({ getDomainById }: any) => getDomainById?.currentTab
    );
    const addFromLibraryData = useSelector(
        (state: any) => state.addFromLibrary.value
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const [openOverwriteModal, setOpenOverwriteModal] = React.useState<any>({});
    const [openRenameModal, setOpenRenameModal] = React.useState<any>({});

    const handleSubmit = (): void => {
        (async () => {
            const data = {
                createdBy: userPermission?.value?.data?.userId || 1,
                programBookLibraryUUID: '1',
                programBookId: params.id || '1',
                domainId: params?.domainId ? parseInt(params?.domainId) : '1',
                programId: params?.programId
                    ? parseInt(params?.programId)
                    : '1',
                itemType: params.programId
                    ? 'program'
                    : params.domainId
                      ? 'domain'
                      : 'programBook',
                configuration: addFromLibraryData.configuration,
            };
            const response = await addFromLibraryApis.addFromLibrary({
                ...data,
            });
            if (response.data.data) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Data added from library successfully.',
                        description: '',
                    })
                );

                onClose();
                dispatch(resetStateLibrary());
                if (params.id) {
                    dispatch(
                        getDomainByIdCall({
                            programBookUUID: params.id,
                            phase: activeTab,
                            isTargetPinned: pinnedData?.addQuickLook,
                            quickLookId: pinnedData?.clickedQuickLook,
                        })
                    );
                }
                if (params.domainId) {
                    dispatch(
                        getProgramsByDomainIdCall({
                            domainId: params.domainId,
                            phase: activeTab,
                            isTargetPinned: pinnedData?.addQuickLook,
                            quickLookId: pinnedData?.clickedQuickLook,
                        })
                    );
                }
                if (params.programId) {
                    dispatch(
                        getTargetCall({
                            programId: params?.programId,
                            isTargetPinned: pinnedData?.addQuickLook,
                            quickLookId: pinnedData?.clickedQuickLook,
                        })
                    );
                }
            }
        })();
    };
    const handleAddToLibrary = (data: any): void => {
        dispatch(addItem(data));
        dispatch(addToArrayItem(data));
        setOpenOverwriteModal({});
    };
    const handleOverwrite = (): void => {
        handleAddToLibrary({
            type: openOverwriteModal.type,
            data: {
                ...openOverwriteModal.data,
                override: true,
            },
        });
    };
    const handleRenameClick = (): void => {
        setOpenRenameModal({ ...openOverwriteModal });
        setOpenOverwriteModal({});
    };

    const handleRename = (values: any): void => {
        handleAddToLibrary({
            type: openRenameModal.type,
            data: {
                ...openRenameModal.data,
                override: false,
                newName: values.newName,
            },
        });
        setOpenRenameModal({});
    };

    const setOverwriteData = (data: any): void => {
        if (data.type === 'target') {
            setOpenRenameModal({
                ...data,
            });
        } else {
            setOpenOverwriteModal({ ...data });
        }
    };

    return (
        <>
            <Modal open={open} id={'add-Client-Doc-modal'} expandModal={false}>
                <ModalBody expandModal={false}>
                    <div className="relative">
                        <div className="w-[90vw]">
                            <div className="flex justify-between p-4 items-center bg-primary-400 font-bold">
                                <div className="flex w-full items-center">
                                    <span className="flex flex-1 justify-start">
                                        Library
                                    </span>
                                    <span className="flex flex-1 justify-start">
                                        Created By
                                    </span>
                                    <span className="flex flex-1 justify-start">
                                        Created on
                                    </span>
                                </div>
                                <div>
                                    <X
                                        className="cursor-pointer"
                                        onClick={onClose}
                                    />
                                </div>
                            </div>
                            {libraries?.length ? (
                                <div>
                                    {libraries.map(
                                        (library: any, index: any) => {
                                            return (
                                                <LibraryComponent
                                                    library={library}
                                                    key={library.id}
                                                    addFromLibraryData={
                                                        addFromLibraryData
                                                    }
                                                    index={index}
                                                    setOverwriteData={
                                                        setOverwriteData
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            ) : (
                                <div className="h-[80vh] flex justify-center items-center">
                                    Loading...
                                </div>
                            )}
                        </div>
                        <AddFromLibraryModalFooter
                            handleSubmit={handleSubmit}
                            submitDisabled={
                                addFromLibraryData.configuration.length === 0
                            }
                            onClose={onClose}
                        />
                    </div>
                </ModalBody>
            </Modal>
            {openRenameModal?.type ? (
                <RenameModal
                    handleSubmitForm={handleRename}
                    handleClose={() => setOpenRenameModal({})}
                    itemName={openRenameModal?.data?.name}
                    itemType={openRenameModal?.type}
                />
            ) : null}
            {openOverwriteModal?.type ? (
                openOverwriteModal?.type === 'target' ||
                openOverwriteModal?.type === 'program' ? (
                    <OverwriteAndRenameModal
                        itemName={openOverwriteModal?.data?.name}
                        onCancel={() => setOpenOverwriteModal({})}
                        onSuccess={handleOverwrite}
                        onSecondaryClick={handleRenameClick}
                        itemType={openOverwriteModal?.type}
                    />
                ) : (
                    <OverwriteModal
                        itemName={openOverwriteModal?.data?.name}
                        onCancel={() => setOpenOverwriteModal({})}
                        onSuccess={handleOverwrite}
                        itemType={openOverwriteModal?.type}
                    />
                )
            ) : null}
        </>
    );
}
