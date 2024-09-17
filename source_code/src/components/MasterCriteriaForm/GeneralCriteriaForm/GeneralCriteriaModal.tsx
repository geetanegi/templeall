/* eslint-disable max-len */
import * as React from 'react';
import MasterCriteriaLandingPageComponents from '../../MasterCriteriaLandingPageComponents';
import CriteriaForm from '../TemplateForm/CriteriaForm';
import Modal, { ModalBody, ModalHeader } from '../../Generics/Modal';
import ConfirmationModal from '../../Generics/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearNotification,
    clearNotificationForCriteriaModal,
    masteryCardsAvailable,
    overrideAll,
    setCopyModal,
    setGeneralCriteriaToggle,
} from '../../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import { getMasteryCriteriaTemplateCall } from '../../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import saveMasteryCriteriaTemplateAPI from '../../../api/services/MasterCriteriaTemplate/saveMasteryCriteriaTemplate.service';
import Notifications from '../../Generics/Notifications';
export default function GeneralCriteriaModal({
    onClose,
    isFromGeneralCriteria,
    setIsFromGeneralCriteria,
    isGeneralModalOpen,
}: {
    onClose?: any;
    isFromGeneralCriteria?: any;
    setIsFromGeneralCriteria?: any;
    isGeneralModalOpen?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [openConfirmationModal, setOpenConfirmationModal] =
        React.useState(false);
    const templateId = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria.value
    );
    const getMasterCriteriaTemplate = useSelector(
        ({ getMasteryCriteriaTemplate }: any) =>
            getMasteryCriteriaTemplate?.formData
    );
    const isGeneralSave = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria.isGeneralSave
    );
    const isCopied = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria.generalCriteriaModal
    );
    const countOfMasteryCards = useSelector(
        ({ saveMasterCriteria }: any) =>
            saveMasterCriteria.masteryCardsAvailable?.data
    );
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const editData = useSelector(
        ({ getTemplate }: any) => getTemplate?.value?.data
    );
    const criteriaTemplateData = useSelector(
        ({ getMasteryCriteriaTemplate }: any) =>
            getMasteryCriteriaTemplate?.value?.data
    );
    const maintenanceData: any = Array.isArray(criteriaTemplateData)
        ? criteriaTemplateData?.filter(
              (item: any) => item?.phase?.name === 'Maintenance'
          )
        : null;
    const [isChecked, setIsChecked] = React.useState(false);
    const handleToggleChange = (): void => {
        setIsChecked(true);
        const checked: any = isChecked;
        dispatch(setGeneralCriteriaToggle(checked));
        setOpenConfirmationModal(true);
    };
    React.useEffect(() => {
        const data = { templateId: templateId?.id || editData?.id };
        dispatch(masteryCardsAvailable(data));
        const payload = {
            templateId: criteriaData?.value?.id || editData?.id || templateId,
            dataType: criteriaData?.dataType,
            isProgram: criteriaData?.isProgram ? true : false,
            temporaryId: criteriaData?.templateData?.temporaryId || '',
            addNew:
                criteriaData?.value?.id || editData?.id || templateId?.length
                    ? false
                    : true,
            isTarget: false,
            programId: '',
            targetId: '',
        };
        dispatch(getMasteryCriteriaTemplateCall(payload));
    }, []);
    const apiCall = async (): Promise<any> => {
        const payload1 = {
            templateId: criteriaData?.value?.id || editData?.id || templateId,
            isSynchronized: isChecked,
        };
        const res =
            await saveMasteryCriteriaTemplateAPI.isToggleChange(payload1);
        if (!res.data.error) {
            if (
                maintenanceData?.length >= 1 &&
                criteriaData?.generalCriteriaToggle
            ) {
                maintenanceData.forEach((item: any) => {
                    dispatch(overrideAll(item.indexCount));
                });
            }
            setOpenConfirmationModal(false);
            dispatch(setCopyModal());
        } else {
        }
    };
    const closeModal = (): any => {
        setOpenConfirmationModal(false);
    };
    const clearNotificationForGeneralCriteria = (): any => {
        setTimeout(() => {
            dispatch(clearNotificationForCriteriaModal());
        }, 2000);
    };
    const closeNotification = (): any => {
        setTimeout(() => {
            dispatch(clearNotification());
        }, 2000);
    };
    return (
        <Modal open={() => {}} id={'add-target-modal'} expandModal={false}>
            <ModalHeader
                title={''}
                icon={false}
                onExpand={undefined}
                onClose={() => {
                    onClose();
                }}
                closeIcon={true}
                isGradientNotVisible={true}
            />
            <ModalBody expandModal={false}>
                <div
                    className="w-[90rem]"
                    data-testid="general-master-criteria-modal"
                >
                    {isFromGeneralCriteria && (
                        <div className="flex items-center w-2/7  mr-4 bg-white float-right">
                            <label className="text-black font-light text-sm mr-1 pr-3">
                                Apply Criteria to all Data Types
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={handleToggleChange}
                                    className=" relative h-[2.5rem] w-32   flex justify-evenly items-center font-normal text-sm rounded border border-transparent bg-[#47AAC9] text-white hover:bg-[#47AAC9] disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    Override
                                </button>
                            </div>
                        </div>
                    )}
                    {isFromGeneralCriteria ? (
                        <MasterCriteriaLandingPageComponents
                            isFromGeneralCriteria={isFromGeneralCriteria}
                            setIsFromGeneralCriteria={setIsFromGeneralCriteria}
                        />
                    ) : (
                        <CriteriaForm
                            isGeneralModalOpen={isGeneralModalOpen}
                            setIsFromGeneralCriteria={setIsFromGeneralCriteria}
                        />
                    )}
                    {openConfirmationModal && (
                        <ConfirmationModal
                            header={''}
                            title={
                                countOfMasteryCards?.isMasteryCriteriaAvailable
                                    ? 'Do you want to override criteria ?'
                                    : 'Are you sure you want to copy general criteria to all data type ?'
                            }
                            name={''}
                            open={openConfirmationModal}
                            onClose={() => {
                                closeModal();
                            }}
                            handleStop={() => {
                                apiCall();
                            }}
                        />
                    )}
                    {isGeneralSave && (
                        <Notifications
                            open={true}
                            title={
                                getMasterCriteriaTemplate?.id
                                    ? 'Criteria updated successfully'
                                    : 'Criteria added successfully'
                            }
                            success={true}
                            onClose={closeNotification}
                        />
                    )}
                    {isCopied && (
                        <Notifications
                            open={true}
                            title={
                                'General Criteria copied to all data type successfully.'
                            }
                            success={true}
                            onClose={clearNotificationForGeneralCriteria}
                        />
                    )}
                </div>
            </ModalBody>
        </Modal>
    );
}
