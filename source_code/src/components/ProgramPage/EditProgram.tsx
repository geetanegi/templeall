import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import add from '../../assets/img/add.svg';
import editProgram from '../../assets/img/editProgram.svg';
import targetAdd from '../../assets/img/targetAdd.svg';
import libAdd from '../../assets/img/libAdd.svg';
import AddProgramModal from '../AddProgramModal';
import progAdd from '../../assets/img/progAdd.svg';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { clearingData } from '../../redux/slice/template/templateSlice';
import AddTargetModal from '../AddTargetModal';
import {
    clearingTargetData,
    savingClickedTargetData,
    setIsFromTarget,
} from '../../redux/slice/getTarget/getTargetByProgramId';
import {
    savingTemplateData,
    setDataType,
    setIsModalClick,
    setMasteryCriteriaName,
    setPhaseValue,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import {
    clearMasteryCriteriaName,
    savingProgramTemplateId,
    setMasteryCriteria,
} from '../../redux/slice/CreateProgram/createProgram';
import {
    clearGetMasteryData,
    savingGetMasteryCriteriaTemplateData,
} from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import {
    resetState,
    savingProgramData,
} from '../../redux/slice/RenameProgram/renameProgram';
import { savingGetMasteryCriteriaTemplateDataById } from '../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import AddFromLibrary from '../AddFromLibrary';
import ProgramDetailsModal from '../ProgramDetailsModal';
export default function EditProgram(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [, onEditProgramClick] = useState(false);
    const [openProgramModal, setOpenProgramModal] = useState(false);
    const [openTargetModal, setOpenTargetModal] = useState(false);
    const [openLibraryModal, setOpenLibraryModal] = useState(false);
    const [openProgramDetailsModal, setOpenProgramDetailsModal] =
        useState(false);
    const successNotification = useSelector(
        ({ notifications }: any) => notifications
    );
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    const handleOpenProgramModal = (): void => {
        setOpenProgramModal(true);
        dispatch(clearingData());
        onEditProgramClick(true);
        setOpenTargetModal(false);
        dispatch(clearGetMasteryData());
    };
    const handleOpenTargetModal = (): void => {
        setOpenTargetModal(true);
        dispatch(savingClickedTargetData({}));
        setOpenProgramModal(false);
        dispatch(resetState());
        dispatch(clearingData());
        dispatch(savingTemplateData([]));
        dispatch(setIsFromTarget(true));
        dispatch(setIsModalClick(true));
        dispatch(clearingTargetData());
        dispatch(setDataType(''));
    };
    const handleCancelModal = (): void => {
        setOpenTargetModal(false);
        setOpenProgramModal(false);
        dispatch(setIsModalClick(false));
        dispatch(setIsFromTarget(false));
        dispatch(setPhaseValue(''));
        dispatch(savingProgramData([]));
        dispatch(resetState());
        dispatch(savingProgramTemplateId(''));
        dispatch(setMasteryCriteriaName(''));
        dispatch(savingTemplateData([]));
        dispatch(clearingData());
        dispatch(setMasteryCriteria(false));
        dispatch(clearMasteryCriteriaName([]));
        dispatch(clearGetMasteryData());
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
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
    const viewMode = useSelector(
        ({ ViewOnly }: any) => ViewOnly?.viewOnlyValue
    );
    const disable = viewMode;
    return (
        <>
            <div className="flex justify-between bg-white shadow-md rounded-md px-8 py-2 shadow-[0_1px_3px_-2px_gray]">
                <div className="flex cursor-pointer flex-col">
                    <div
                        className={`flex flex-col ${disable || editProgramData?.programData?.programType === 'Task Analysis' ? 'cursor-not-allowed opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                        onClick={!disable ? handleOpenTargetModal : undefined}
                        data-testid="open-target-modal"
                    >
                        <div className="pl-[2.5rem]">
                            <img src={targetAdd}></img>
                        </div>
                        <div className="flex items-center justify-evenly">
                            <div>
                                <img src={add}></img>
                            </div>
                            <div>
                                <label className="text cursor-pointer-black font-light text-sm font-medium">
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
                        className={`flex ${
                            disable ||
                            editProgramData?.programData?.programType ===
                                'Task Analysis'
                                ? 'cursor-not-allowed opacity-50 pointer-events-none'
                                : 'cursor-pointer'
                        }`}
                        onClick={
                            !disable
                                ? () => setOpenLibraryModal(true)
                                : undefined
                        }
                        data-testid="open-lib-modal"
                    >
                        <div className="ml-20">
                            <div className="pl-[3rem]">
                                <img src={libAdd}></img>
                            </div>
                            <div className="flex items-center justify-evenly">
                                <div>
                                    <img src={add}></img>
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
                <div
                    className={`flex ${disable ? 'cursor-not-allowed opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                    onClick={!disable ? handleOpenProgramModal : undefined}
                    data-testid="open-program-modal"
                >
                    <div className="ml-20">
                        <div className="pl-[3rem]">
                            <img src={progAdd}></img>
                        </div>
                        <div className="flex items-center justify-evenly">
                            <div>
                                <img src={editProgram}></img>
                            </div>
                            <div>
                                <label className="text-black font-light text-sm font-medium">
                                    Edit Program{' '}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`flex flex-col ${disable ? 'cursor-not-allowed opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                    onClick={() => setOpenProgramDetailsModal(true)}
                    data-testid="open-program-details-modal"
                >
                    <div className="pl-[2rem]">
                        <img src={progAdd}></img>
                    </div>
                    <div className="flex items-center mt-1 justify-evenly">
                        <div>
                            <label className="text-black font-light text-sm font-medium">
                                Program Details{' '}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
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
                    onClose={() => setOpenLibraryModal(false)}
                />
            ) : null}
            {openProgramDetailsModal && (
                <ProgramDetailsModal
                    open={openProgramDetailsModal}
                    onClose={() => setOpenProgramDetailsModal(false)}
                />
            )}
        </>
    );
}
