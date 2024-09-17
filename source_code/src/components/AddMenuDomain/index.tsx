import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import add from '../../assets/img/add.svg';
import progAdd from '../../assets/img/progAdd.svg';
import targetAdd from '../../assets/img/targetAdd.svg';
import libAdd from '../../assets/img/libAdd.svg';
import AddDomainModal from '../AddDomainModal';
import AddProgramModal from '../AddProgramModal';
import { openNotification } from '../../redux/slice/Notification/notifications';
import {
    clearProgramData,
    getProgramById,
    resetState,
    savingOnRename,
    savingProgramData,
} from '../../redux/slice/RenameProgram/renameProgram';
import { clearingData } from '../../redux/slice/template/templateSlice';
import AddTargetModal from '../AddTargetModal';
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
import { useParams } from 'react-router-dom';
import AddFromLibrary from '../AddFromLibrary';

export default function AddMenuDomain(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [openDomainModal, setOpenDomainModal] = useState(false);
    const [openProgramModal, setOpenProgramModal] = useState(false);
    const [openTargetModal, setOpenTargetModal] = useState(false);
    const [openLibraryModal, setOpenLibraryModal] = useState(false);

    const successNotification = useSelector(
        ({ notifications }: any) => notifications
    );
    const targetData = useSelector(({ getTarget }: any) => getTarget);
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );

    const params = useParams();

    const handleOpenProgramModal = (): void => {
        setOpenProgramModal(true);
        dispatch(clearingData());
        dispatch(savingOnRename(false));
        dispatch(setIsModalClick(true));
        dispatch(setIsProgram(true));
        dispatch(savingMasterData([]));
        dispatch(savingTemplateData([]));
        dispatch(setAutoProgress([]));
        dispatch(setAutoRegress([]));
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
        dispatch(clearMasteryCriteriaName([]));
        dispatch(clearGetMasteryData());
        // dispatch(clearProgramData());
    };
    const handleOpenTargetModal = (): void => {
        setOpenTargetModal(true);
        dispatch(setIsProgram(false));
        dispatch(savingClickedTargetData({}));
        dispatch(clearingData());
        dispatch(setIsFromTarget(true));
        dispatch(setIsModalClick(true));
        dispatch(savingMasterData([]));
        dispatch(savingTemplateData([]));
        dispatch(setAutoProgress([]));
        dispatch(setAutoRegress([]));
        dispatch(savingProgramData([]));
        dispatch(resetState());
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
        dispatch(clearMasteryCriteriaName([]));
        // dispatch(clearProgramData());
        dispatch(clearingTargetData());
        dispatch(setDataType(''));

        if (params?.programId) {
            const data = {
                id: params?.programId,
                isTarget: targetData?.isFromTarget ? true : false,
            };
            dispatch(getProgramById(data));
        }
    };
    const handleCancelModal = (): void => {
        setOpenTargetModal(false);
        setOpenDomainModal(false);
        setOpenProgramModal(false);
        dispatch(setIsModalClick(false));
        dispatch(setIsFromTarget(false));
        dispatch(setIsProgram(false));
        dispatch(setPhaseValue(''));
        dispatch(savingProgramTemplateId(''));
        dispatch(setMasteryCriteriaName(''));
        dispatch(savingTemplateData([]));
        dispatch(savingProgramData([]));
        dispatch(resetState());
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(clearingData());
        dispatch(setMasteryCriteria(false));
        dispatch(clearMasteryCriteriaName([]));
        dispatch(clearGetMasteryData());
        dispatch(clearProgramData());
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
            <div className="flex bg-white  shadow-md rounded-md  py-2 mt-5  shadow-[0_1px_3px_-2px_gray]">
                <div
                    className={`flex ${disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    onClick={!disable ? handleOpenProgramModal : undefined}
                >
                    <div className="ml-6">
                        <div className="pl-[3.5rem]">
                            <img src={progAdd}></img>
                        </div>

                        <div className="flex items-center  justify-evenly">
                            <div>
                                <img src={add}></img>
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
                    <div className="ml-20">
                        <div className="pl-[3rem]">
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
                        className={`flex ${disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        onClick={
                            !disable
                                ? () => setOpenLibraryModal(true)
                                : undefined
                        }
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
                    onClose={() => setOpenLibraryModal(false)}
                />
            ) : null}
        </>
    );
}
