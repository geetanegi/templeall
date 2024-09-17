import React, { useEffect } from 'react';
import Modal, { AddFromLibraryModalFooter, ModalBody } from '../Generics/Modal';
import { X } from 'lucide-react';
import GoalLibraryComponent from './GoalLibraryComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import addFromLibraryApis from '../../api/services/addFromLibrary.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import {
    addItemToConfiguration,
    getAllGoalLibraries,
    setAddFromGoalLibraryData,
} from '../../redux/slice/addFromGoalLibrary/addFromGoalLibrarySlice';
import {
    getAllInterventionPlanDomainByInterventionId,
    getAllInterventionPlanLongTermByDomainId,
    getAllInterventionPlanShortTermLongTermById,
    getInterventionPlanById,
} from '../../redux/slice/InterventionAll/InterventionSlice';
import OverwriteAndRenameModal from '../AddFromLibrary/OverwriteAndRenameModal';
import OverwriteModal from '../AddFromLibrary/OverwriteModal';
import RenameModal from '../AddFromLibrary/RenameModal';
export default function AddFromGoalLibrary({
    open,
    onClose,
}: {
    open: boolean;
    onClose: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    useEffect(() => {
        dispatch(getAllGoalLibraries());
    }, []);
    const libraries = useSelector(
        (state: any) => state.addFromGoalLibraries.libraries
    );
    const addFromLibraryData = useSelector(
        (state: any) => state.addFromGoalLibraries.value
    );
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const [openOverwriteModal, setOpenOverwriteModal] = React.useState<any>({});
    const [openRenameModal, setOpenRenameModal] = React.useState<any>({});
    const getSubmitData = (): any => {
        return {
            targetId:
                params?.longTermGoalId || params?.domainId || params?.id || '',
            itemType: params.longTermGoalId
                ? 'longTerm'
                : params.domainId
                  ? 'domain'
                  : 'interventionPlan',
            configuration: addFromLibraryData,
        };
    };
    const handleSubmit = (): void => {
        (async () => {
            const data = getSubmitData();
            const response = await addFromLibraryApis.addFromGoalLibrary({
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
                dispatch(
                    setAddFromGoalLibraryData({
                        domains: [],
                        longTermGoal: [],
                        shortTermGoal: [],
                    })
                );

                if (params.longTermGoalId) {
                    dispatch(
                        getInterventionPlanById({ id: params?.interventionId })
                    );
                    dispatch(
                        getAllInterventionPlanDomainByInterventionId({
                            id: params?.interventionId,
                            type: phaseType,
                        })
                    );
                    dispatch(
                        getAllInterventionPlanLongTermByDomainId({
                            id: params?.domainId,
                            type: phaseType,
                        })
                    );
                    dispatch(
                        getAllInterventionPlanShortTermLongTermById({
                            id: params?.longTermGoalId,
                        })
                    );
                } else if (params.domainId) {
                    dispatch(
                        getInterventionPlanById({ id: params.interventionId })
                    );
                    dispatch(
                        getAllInterventionPlanDomainByInterventionId({
                            id: params?.interventionId,
                            type: phaseType,
                        })
                    );
                    dispatch(
                        getAllInterventionPlanLongTermByDomainId({
                            id: params?.domainId,
                            type: phaseType,
                        })
                    );
                } else if (params.id) {
                    dispatch(getInterventionPlanById({ id: params.id }));
                    dispatch(
                        getAllInterventionPlanDomainByInterventionId({
                            id: params?.id,
                            type: phaseType,
                        })
                    );
                }
            }
        })();
    };
    const handleAddToLibrary = (data: any): void => {
        dispatch(addItemToConfiguration(data));
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
        if (data.type === 'shortTermGoal') {
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
                                                <GoalLibraryComponent
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
                                addFromLibraryData.domains.length === 0 &&
                                addFromLibraryData.longTermGoal.length === 0 &&
                                addFromLibraryData.shortTermGoal.length === 0
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
                openOverwriteModal?.type === 'shortTermGoal' ? (
                    <OverwriteAndRenameModal
                        itemName={openOverwriteModal?.data?.name}
                        onCancel={() => setOpenOverwriteModal({})}
                        onSuccess={handleOverwrite}
                        itemType={'short term goal'}
                        onSecondaryClick={handleRenameClick}
                    />
                ) : (
                    <OverwriteModal
                        itemName={openOverwriteModal?.data?.name}
                        onCancel={() => setOpenOverwriteModal({})}
                        itemType={openOverwriteModal?.type}
                        onSuccess={handleOverwrite}
                    />
                )
            ) : null}
        </>
    );
}
