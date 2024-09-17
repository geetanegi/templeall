import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import add from '../../assets/img/add.svg';
import domainAdd from '../../assets/img/domainAdd.svg';
import progAdd from '../../assets/img/progAdd.svg';
import targetAdd from '../../assets/img/targetAdd.svg';
import libAdd from '../../assets/img/libAdd.svg';
import AddDomainModal from '../AddDomainModal';
import AddProgramModal from '../AddProgramModal';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { clearingData } from '../../redux/slice/template/templateSlice';
import AddTargetModal from '../AddTargetModal';
import {
    resetState,
    savingOnRename,
    savingProgramData,
} from '../../redux/slice/RenameProgram/renameProgram';
import {
    savingMasterData,
    savingTemplateData,
    setAutoProgress,
    setAutoRegress,
    setDataType,
    setIsModalClick,
    setIsProgram,
    setMasteryCriteriaName,
    setPhaseValue,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import {
    clearingTargetData,
    savingClickedTargetData,
    setIsFromTarget,
} from '../../redux/slice/getTarget/getTargetByProgramId';
import {
    savingProgramTemplateId,
    setMasteryCriteria,
    clearMasteryCriteriaName,
} from '../../redux/slice/CreateProgram/createProgram';
import {
    clearGetMasteryData,
    savingGetMasteryCriteriaTemplateData,
} from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import { savingGetMasteryCriteriaTemplateDataById } from '../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import { resetStateLibrary } from '../../redux/slice/addFromLibrary/addFromLibrarySlice';
import AddFromLibrary from '../AddFromLibrary';

export default function AddMenu(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [openDomainModal, setOpenDomainModal] = useState(false);
    const [openProgramModal, setOpenProgramModal] = useState(false);
    const [openTargetModal, setOpenTargetModal] = useState(false);
    const [openLibraryModal, setOpenLibraryModal] = useState(false);

    // Remove query string parameters
    // const cleanUrl = url.split('?')[0];

    // Redirect to the clean URL
    // window.location.href = cleanUrl;

    const successNotification = useSelector(
        ({ notifications }: any) => notifications
    );
    const viewMode = useSelector(
        ({ ViewOnly }: any) =>
            ViewOnly?.viewOnlyValue || ViewOnly?.viewOnlyValueLibrary
    );
    const disable = viewMode;
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    const handleOpenModal = (): void => {
        setOpenDomainModal(true);
    };

    const handleOpenProgramModal = (): void => {
        setOpenProgramModal(true);
        dispatch(savingOnRename(false));
        dispatch(setIsModalClick(true));
        dispatch(setIsProgram(true));
        dispatch(savingMasterData([]));
        dispatch(savingTemplateData([]));
        dispatch(setAutoProgress([]));
        dispatch(setAutoRegress([]));
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(clearGetMasteryData());
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
        dispatch(clearMasteryCriteriaName([]));
        dispatch(clearingData());
    };
    const handleOpenTargetModal = (): void => {
        setOpenTargetModal(true);
        dispatch(savingClickedTargetData({}));
        dispatch(setIsProgram(false));
        dispatch(clearingData());
        dispatch(setIsFromTarget(true));
        dispatch(setIsModalClick(true));
        dispatch(savingProgramData([]));
        dispatch(savingMasterData([]));
        dispatch(savingTemplateData([]));
        dispatch(resetState());
        dispatch(setAutoProgress([]));
        dispatch(setAutoRegress([]));
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
        dispatch(clearingTargetData());
        dispatch(setDataType(''));
    };
    const handleCancelModal = (): void => {
        setOpenTargetModal(false);
        setOpenDomainModal(false);
        setOpenProgramModal(false);
        dispatch(setIsFromTarget(false));
        dispatch(setIsModalClick(false));
        dispatch(setPhaseValue(''));
        dispatch(setIsProgram(false));
        dispatch(savingProgramTemplateId(''));
        dispatch(setMasteryCriteriaName(''));
        dispatch(savingTemplateData([]));
        dispatch(savingProgramData([]));
        dispatch(clearingData());
        dispatch(resetState());
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(setMasteryCriteria(false));
        dispatch(clearMasteryCriteriaName([]));
        dispatch(clearGetMasteryData());
    };

    React.useEffect(() => {
        if (
            successNotification?.isOpenDomain ||
            successNotification?.isOpenProgram
        ) {
            setTimeout(() => {
                if (successNotification?.isOpenDomain) {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Domain created successfully',
                            description: '',
                        })
                    );
                } else if (successNotification?.isOpenProgram) {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Program created successfully',
                            description: '',
                        })
                    );
                }
            }, 6000);
        }
    }, [successNotification?.isOpenDomain, successNotification?.isOpenProgram]);

    return (
        <>
            <div className="flex bg-white shadow-md rounded-md px-8 py-4 mt-5 justify-evenly shadow-[0_1px_3px_-2px_gray]">
                <div
                    className={`flex ${disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    onClick={!disable ? handleOpenModal : undefined} // Use undefined instead of null
                >
                    <div className="ml-6">
                        <div className="pl-[3.5rem]">
                            <img src={domainAdd} alt="Domain Add" />
                        </div>

                        <div className="flex items-center justify-evenly">
                            <div>
                                <img src={add} alt="Add Icon" />
                            </div>
                            <div>
                                <label className="text-black font-light text-sm font-medium">
                                    Add Domain
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`flex ${disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    onClick={!disable ? handleOpenProgramModal : undefined}
                >
                    <div className="ml-16">
                        <div className="pl-[3.5rem]">
                            <img src={progAdd} alt="Program Add" />
                        </div>

                        <div className="flex items-center  justify-evenly">
                            <div>
                                <img src={add} alt="Add Icon" />
                            </div>
                            <div>
                                <label
                                    className="text-black font-light text-sm font-medium"
                                    data-testid="add-program-button"
                                >
                                    Add Program{' '}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`flex flex-col ${disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    onClick={!disable ? handleOpenTargetModal : undefined}
                >
                    <div className="ml-16">
                        <div className="pl-[3rem]">
                            <img src={targetAdd} alt="Target Add" />
                        </div>

                        <div className="flex items-center  justify-evenly">
                            <div>
                                <img src={add} alt="Add Icon" />
                            </div>
                            <div>
                                <label
                                    className={`text ${disable ? 'cursor-not-allowed' : 'cursor-pointer'} black font-light text-sm font-medium`}
                                >
                                    Add Target{' '}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {programBookLibrary ? (
                    ''
                ) : (
                    <div
                        className={`flex ${disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        onClick={
                            !disable
                                ? () => setOpenLibraryModal(true)
                                : undefined
                        }
                    >
                        <div className="ml-16">
                            <div className="pl-[3.5rem]">
                                <img src={libAdd} alt="Library Add" />
                            </div>

                            <div className="flex items-center justify-evenly">
                                <div>
                                    <img src={add} alt="Add Icon" />
                                </div>
                                <div>
                                    <label className="text-black font-light text-sm font-medium">
                                        Add From Library{' '}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {openDomainModal ? (
                <AddDomainModal
                    open={openDomainModal}
                    onClose={handleCancelModal}
                />
            ) : null}

            {openProgramModal ? (
                <AddProgramModal
                    open={openProgramModal}
                    onClose={handleCancelModal}
                />
            ) : null}
            {openTargetModal && (
                <AddTargetModal
                    open={openTargetModal}
                    onClose={handleCancelModal}
                    editProgramClick={false}
                    isEdit={false}
                />
            )}
            {openLibraryModal ? (
                <AddFromLibrary
                    open={openLibraryModal}
                    onClose={() => {
                        dispatch(resetStateLibrary());
                        setOpenLibraryModal(false);
                    }}
                />
            ) : null}
        </>
    );
}
