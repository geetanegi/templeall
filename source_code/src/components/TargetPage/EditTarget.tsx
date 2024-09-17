import * as React from 'react';
import add from '../../assets/img/add.svg';
import addToSession from '../../assets/img/addToSession.svg';
import editProgram from '../../assets/img/editProgram.svg';
import targetAdd from '../../assets/img/targetAdd.svg';
import AddTargetModal from '../AddTargetModal';
import {
    savingMasterData,
    savingTemplateData,
    setAutoProgress,
    setAutoRegress,
    setIsModalClick,
    setIsProgram,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import { clearingData } from '../../redux/slice/template/templateSlice';
import {
    savingSelectedTargetData,
    setIsFromTarget,
} from '../../redux/slice/getTarget/getTargetByProgramId';
import {
    resetState,
    savingProgramData,
    setIsTargetEdit,
} from '../../redux/slice/RenameProgram/renameProgram';
import { savingGetMasteryCriteriaTemplateData } from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import { savingGetMasteryCriteriaTemplateDataById } from '../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import { useDispatch, useSelector } from 'react-redux';
import TargetDetailsModal from '../TargetDetailsModal';
import AddToSessionModal from '../AddToSession/index';
import Button from '../Generics/Button';
export default function EditTarget(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [openTargetModal, setOpenTargetModal] = React.useState(false);
    const [openSessionModal, setOpenSessionModal] = React.useState(false);
    const [openTargetDetailsModal, setOpenTargetDetailsModal] =
        React.useState(false);
    const handleOpenTargetModal = (): void => {
        setOpenTargetModal(true);
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
        dispatch(setIsTargetEdit(true));
    };
    const handleCancelModal = (): void => {
        dispatch(savingSelectedTargetData({}));
        setOpenTargetModal(false);
        dispatch(setIsFromTarget(false));
        dispatch(setIsModalClick(false));
        dispatch(setIsProgram(false));
        dispatch(savingTemplateData([]));
        dispatch(savingProgramData([]));
        dispatch(clearingData());
        dispatch(resetState());
        dispatch(savingGetMasteryCriteriaTemplateData([]));
    };
    const viewMode = useSelector(
        ({ ViewOnly }: any) => ViewOnly?.viewOnlyValue
    );
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    const disable = viewMode;
    const handleOpenSessionModal = (): void => {
        setOpenSessionModal(true);
    };
    return (
        <>
            <div className="flex justify-between items-center bg-white  rounded-md px-8 py-2 mt-4  shadow-[0_1px_3px_-2px_gray]">
                <Button
                    disabled={disable}
                    className={`flex flex-col ${disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    type={''}
                    data-testid="button-click-edit"
                    onClick={!disable ? handleOpenTargetModal : undefined}
                >
                    <div className="flex flex-col justify-center items-center">
                        <img src={targetAdd} alt="targetAdd" />
                        <span className="flex justify-center items-center">
                            <img src={editProgram} alt="editProgram" />
                            <span> Edit Target</span>
                        </span>
                    </div>
                </Button>

                <Button
                    disabled={disable}
                    className={`flex flex-col ${disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    type={''}
                    data-testid="button-click-target-details"
                    onClick={
                        !disable
                            ? () => setOpenTargetDetailsModal(true)
                            : undefined
                    }
                >
                    <div className="flex flex-col justify-center items-center">
                        <img src={targetAdd} alt="targetAdd" />
                        <span className="flex justify-center items-center">
                            <img src={targetAdd} alt="targetAdd" />
                            <span>Target Details</span>
                        </span>
                    </div>
                </Button>
                {programBookLibrary ? (
                    ''
                ) : (
                    <Button
                        disabled={disable}
                        className={`flex flex-col ${disable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        type={''}
                        onClick={(e: { stopPropagation: () => void }) => {
                            e.stopPropagation(); // Prevent triggering parent onClick
                            handleOpenSessionModal();
                        }}
                    >
                        <div className="flex flex-col justify-center items-center">
                            <img src={addToSession} alt="Add to session" />
                            <span className="flex justify-center items-center">
                                <img src={add} alt="Add" />
                                <span>Add To Session</span>
                            </span>
                        </div>
                    </Button>
                )}
            </div>
            {openTargetModal && (
                <AddTargetModal
                    open={openTargetModal}
                    onClose={handleCancelModal}
                    editProgramClick={false}
                    isEdit={true}
                />
            )}
            {openTargetDetailsModal && (
                <TargetDetailsModal
                    open={openTargetDetailsModal}
                    onClose={() => setOpenTargetDetailsModal(false)}
                />
            )}
            {openSessionModal && (
                <AddToSessionModal
                    open={openSessionModal}
                    onClose={() => setOpenSessionModal(false)}
                />
            )}
        </>
    );
}
