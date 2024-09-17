/* eslint-disable max-lines */
import * as React from 'react';
import SelectExistingNoteGrid from '../SelectExistingNoteGrid';
import SignatureModal from '../SignatureModal';
import AddNewNote from '../AddNewNote';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearNote,
    clearSummary,
    clearingData,
    // clearingData,
    getClientProviderDetails,
    getNameOfNote,
    getNewNoteCode,
    getNoteById,
    savingNote,
    setIsEditingGrid,
    setMultipleCodes,
    setSaveNoteByCodeData,
} from '../../redux/slice/template/templateSlice';
import { signData, signDataName } from '../../redux/slice/Signature/Signature';
import Tooltip from '../Generics/Tooltip';
import edit from '../../assets/img/GridIcons/edit.svg';
import view from '../../assets/img/GridIcons/view.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import appointmentSubmitted from '../../assets/img/appointmentSubmitted.svg';
import ConfirmationModal from '../Generics/ConfirmationModal';
import sessionApis from '../../api/services/session.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import ListOfSessionNoteTemplate from '../AddNewNote/ListOfSessionNoteTemplate';
import schedulingApis from '../../api/services/scheduling.service';
import Button from '../Generics/Button';
import { clearRowData } from '../../redux/slice/session/sessionSlice';
import { usePermission } from '../../hooks/usePermission';
import { setCompleteScheduleEvent } from '../../redux/slice/SchedulingRedux/Scheduling';
import { CustomDate } from '../Generics/Grid/CommonFunction';
import { ToastContext } from '../../contexts/ToastContext';
export default function NoteAndSignature({
    isViewMode,
}: {
    isViewMode?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const [note, setNote] = React.useState(false);
    const [newNote, setNewNote] = React.useState(false);
    const [name, setName] = React.useState(true);
    const [isEdit, setIsEdit] = React.useState(false);
    const [isClosable, setIsClosable] = React.useState(false);
    const appointment = useSelector((state: any) => state?.appointment?.value);
    const noteName = useSelector((state: any) => state?.template?.name?.data);
    const saveNoteId = useSelector(
        (state: any) => state?.scheduling?.saveNoteId
    );
    const fullDataOfTemplate = useSelector(
        (state: any) => state.template.fullData
    );
    const { permissions } = usePermission({
        itemsToCheck: [
            'add_provider_signature',
            'delete_provider_signature',
            'cancel_appointment',
            'edit_session_note',
            'submit_session_note',
        ],
    });
    const [signature, setSignature] = React.useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] =
        React.useState(false);
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);
    const [mode, setMode] = React.useState('');
    const signatureData = useSelector(
        ({ SignatureRedex }: any) => SignatureRedex
    );
    const isEditingGrid = useSelector(
        (state: any) => state.template.isGridEdit
    );
    const code = useSelector((state: any) => state?.scheduling?.codeAfterEdit);
    const codeWithNonBilable = useSelector(
        (state: any) => state?.scheduling?.setCodes
    );
    const completeScheduleEvent = useSelector(
        (state: any) => state?.scheduling?.completeScheduleEvent
    );
    const [isMultipleSession, setIsMultipleSession] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { addToast } = React.useContext(ToastContext);
    const onClose = (): any => {
        setNote(false);
        setSignature(false);
        setNewNote(false);
        if (!isEditingGrid) {
            dispatch(clearSummary());
            dispatch(clearRowData());
        }
        dispatch(savingNote(''));
    };
    const onCloseEditModal = (): any => {
        setIsEdit(false);
        if (!isEditingGrid) {
            dispatch(clearSummary());
            dispatch(clearRowData());
        }
    };
    const handleClickProviderSign = (): void => {
        if (permissions?.add_provider_signature) {
            setSignature(true);
        }
    };
    const deleteConfirmation = (): void => {
        if (permissions?.delete_provider_signature) {
            setOpenConfirmationModal(true);
        }
    };
    const handleCompleteAppointment = async (): Promise<any> => {
        const payload = {
            appointmentId: appointment.id,
            sessionNotesDataId:
                noteName?.id || fullDataOfTemplate?.template?.id,
        };
        const res = await schedulingApis.completeScheduleEvent(payload);
        if (!res?.data?.error) {
            if (res?.data?.data?.isAuthorizationExpired) {
                addToast({
                    type: 'error',
                    message: `Cannot complete this appointment as billing code used in the appointment is expired.`,
                });
            } else {
                setTimeout(() => {
                    if (res?.data?.data?.sessionNoteBilling) {
                        dispatch(
                            setCompleteScheduleEvent(
                                res?.data?.data?.sessionNoteBilling
                            )
                        );
                        dispatch(
                            openNotification({
                                success: true,
                                title: 'Appointment Completed',
                                description: '',
                            })
                        );
                    }
                }, 800);
            }
            return res?.data;
        } else {
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Unable to complete this appoitment',
                        description: '',
                    })
                );
            }, 800);
        }
    };
    const handleClearButton = (): void => {
        dispatch(dispatch(signData('')));
        dispatch(signDataName(0));
        setOpenConfirmationModal(false);
    };
    const deleteSessionNote = async (): Promise<any> => {
        const payload = {
            sessionNoteDataId: noteName?.id || fullDataOfTemplate?.template?.id,
        };
        const res = await sessionApis.deleteSession(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Session note deleted successfully',
                        description: '',
                    })
                );
            }, 800);
            dispatch(clearNote());
            dispatch(clearingData());
            setName(true);
            return res?.data;
        } else {
            return 'error';
        }
    };
    const handleDeletionNote = (): void => {
        setOpenConfirmationModalForDelete(true);
        if (codeWithNonBilable?.length > 0) {
            const allCodes = codeWithNonBilable?.filter(
                (item: any) =>
                    item?.codeType === 'Billable' ||
                    item?.codeType?.name === 'Billable'
            );
            dispatch(
                getNameOfNote({
                    authorizationCode: allCodes?.[0]?.id,
                    appointmentId: appointment.id,
                    sessionNotesDataId:
                        saveNoteId || appointment?.sessionNotesDataId || '',
                })
            );
        } else {
            dispatch(
                getNameOfNote({
                    authorizationCode:
                        code?.id ||
                        appointment?.authorizationCodes?.[0]?.authorizationCode
                            ?.id,
                    appointmentId: appointment.id,
                    sessionNotesDataId:
                        saveNoteId || appointment?.sessionNotesDataId || '',
                })
            );
        }
        dispatch(setIsEditingGrid(false));
    };
    const EditData = (editMode: string): void => {
        if (permissions?.edit_session_note) {
            setMode(editMode);
            const payload = {
                providerId: appointment?.primaryProvider?.id || '',
                clientId: appointment?.appointmentWith?.id || '',
                appointmentId: appointment?.id || '',
            };
            dispatch(getClientProviderDetails(payload));
            setNote(false);
            const data = {
                sessionNoteDataId: noteName?.id,
            };
            dispatch(setSaveNoteByCodeData(false)); // edit to edit
            dispatch(getNoteById(data));
            dispatch(setIsEditingGrid(true));
            setTimeout(() => {
                setIsEdit(true);
            }, 1500);
        }
    };
    const openModalById = (e: any): void => {
        const payload = {
            providerId: appointment?.primaryProvider?.id || '',
            clientId: appointment?.appointmentWith?.id || '',
            appointmentId: appointment?.id || '',
        };
        const payloadVal = {
            sessionNoteTemplateId: e,
        };
        dispatch(getNewNoteCode(payloadVal));
        setNewNote(true);
        dispatch(getClientProviderDetails(payload));
    };
    const multipleSession = async (): Promise<void> => {
        if (codeWithNonBilable) {
            const allCodes = codeWithNonBilable?.filter(
                (item: any) =>
                    item?.codeType === 'Billable' ||
                    item?.codeType?.name === 'Billable'
            );
            const data = {
                authorizationCode:
                    allCodes?.[0]?.code ||
                    code?.code ||
                    appointment?.authorizationCodes?.[0]?.authorizationCode
                        ?.code,
            };
            const res = await schedulingApis.getMultipleNoteByCode(data);
            if (res?.data?.data?.length > 1) {
                setLoading(false);
                setIsMultipleSession(true);
                dispatch(setMultipleCodes(res?.data));
            } else {
                setLoading(false);
                openModalById(res?.data?.data?.[0]?.id);
                dispatch(setMultipleCodes(res?.data));
            }
        }
    };
    const addNew = (): void => {
        if (permissions?.submit_session_note) {
            setLoading(true);
            setTimeout(() => {
                multipleSession();
            }, 500);
            dispatch(clearSummary());
            dispatch(clearRowData());
        }
    };
    const renderNoteButton = (): JSX.Element => {
        const isDisabled =
            !appointment?.authorizationCodes?.[0]?.authorizationCode?.code ||
            !permissions?.submit_session_note;
        return (
            <Button
                onClick={addNew}
                type="submit"
                loading={loading}
                disabled={isDisabled}
                className="py-2 mb-2 px-[3rem] w-[15vw] justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-primary-700 text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
            >
                New Note
            </Button>
        );
    };
    const renderNoteIcons = (): JSX.Element => (
        <>
            <Tooltip title="View">
                <img
                    src={view}
                    alt="view"
                    onClick={() => EditData('view')}
                    className="mt-2"
                />
            </Tooltip>
            <Tooltip title="Edit">
                <img
                    src={edit}
                    alt="edit"
                    className={`${isViewMode === 'view' || !permissions?.edit_session_note ? 'pointer-events-none' : ''} mt-2`}
                    onClick={() => EditData('')}
                />
            </Tooltip>
            <Tooltip title="Delete">
                <img
                    src={deleteIcon}
                    alt="delete"
                    onClick={handleDeletionNote}
                    className={`${isViewMode === 'view' ? 'pointer-events-none' : ''} mt-2`}
                />
            </Tooltip>
        </>
    );
    const renderNoteInfo = (): JSX.Element => (
        <div className="flex flex-col space-y-2 mb-2">
            <div className="flex space-x-2">
                <label className="text-base font-semibold">
                    {isEdit
                        ? fullDataOfTemplate?.sessionTemplateId?.templateId
                              ?.name
                        : noteName?.name ||
                          fullDataOfTemplate?.templateId?.name ||
                          fullDataOfTemplate?.sessionTemplateId?.templateId
                              ?.name}
                </label>
                {renderNoteIcons()}
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="font-light flex text-xs w-full ">
                    Submitted By: {noteName?.createdBy} &nbsp;{' '}
                    {CustomDate(noteName?.createdDate)}
                </span>
            </div>
        </div>
    );

    const renderNoteContent = (): JSX.Element => {
        if (!noteName?.name?.length && name) {
            return renderNoteButton();
        } else {
            return renderNoteInfo();
        }
    };
    const getTemplateName = (): string | undefined => {
        if (isEdit) {
            return fullDataOfTemplate?.sessionTemplateId?.templateId?.name;
        } else {
            return (
                noteName?.name ||
                fullDataOfTemplate?.templateId?.name ||
                fullDataOfTemplate?.sessionTemplateId?.templateId?.name
            );
        }
    };
    const getClassNameEdit = (): string => {
        const baseClass = 'mt-2';
        const isPointerEventsDisabled =
            isViewMode === 'view' || !permissions?.edit_session_note;
        return `${isPointerEventsDisabled ? 'pointer-events-none ' : ''}${baseClass}`;
    };
    const getClassNameDelete = (): string => {
        const baseClass = 'mt-2';
        const isPointerEventsDisabled = isViewMode === 'view';
        return `${isPointerEventsDisabled ? 'pointer-events-none ' : ''}${baseClass}`;
    };
    const existingNoteBtnDisable = (): any => {
        if (
            !noteName?.name?.length &&
            name &&
            appointment?.authorizationCodes?.[0]
        ) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <div>
            <div className="flex mt-5" data-testid="note-signature-page">
                <div className="main flex flex-col">
                    <label className="text-sm mb-2">Add Note</label>
                    <div className="btn flex flex-col w-82 float-end">
                        {!noteName?.name?.length && name ? (
                            renderNoteContent()
                        ) : (
                            <div className="flex flex-col space-y-2 mb-2">
                                <div className="flex space-x-2">
                                    <label className="text-base font-semibold">
                                        {getTemplateName()}
                                    </label>
                                    <Tooltip title="View">
                                        <img
                                            src={view}
                                            alt="view"
                                            onClick={() => {
                                                EditData('view');
                                            }}
                                            className="mt-2"
                                        />
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <img
                                            src={edit}
                                            alt="edit"
                                            className={getClassNameEdit()}
                                            onClick={() => {
                                                EditData('');
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <img
                                            src={deleteIcon}
                                            alt="delete"
                                            onClick={handleDeletionNote}
                                            className={getClassNameDelete()}
                                        />
                                    </Tooltip>
                                </div>
                                <div className="flex items-center space-x-2 whitespace-nowrap">
                                    <span className="font-light flex text-xs w-full ">
                                        Submitted By: {noteName?.createdBy}
                                        &nbsp;
                                        {CustomDate(noteName?.createdDate)}
                                    </span>
                                </div>
                            </div>
                        )}
                        <button
                            className={`text-sm ' ${
                                !noteName?.name?.length &&
                                name &&
                                appointment?.authorizationCodes?.[0]
                                    ?.authorizationCode?.code
                                    ? 'cursor-pointer text-primary-700'
                                    : 'cursor-not-allowed text-primary-700'
                            }`}
                            onClick={() => setNote(true)}
                            type="submit"
                            disabled={existingNoteBtnDisable()}
                        >
                            Select Existing Notes
                        </button>
                    </div>
                </div>
                <div
                    className={`${isViewMode === 'view' ? 'pointer-events-none' : ''} h-[5.8rem] border-l border-gray-300 mx-14`}
                ></div>
                <div className="flex justify-between space-x-10">
                    <div
                        className={`${isViewMode === 'view' ? 'pointer-events-none' : ''} main flex flex-col`}
                    >
                        <label className="text-sm mb-2">
                            Provider Signature
                        </label>
                        <div className="btn flex flex-col w-72 flex-end">
                            {signatureData?.Sign ||
                            signatureData?.Sign === '{}' ? (
                                <div className="signNDelete flex">
                                    <div className="nameAndSign border-b-2">
                                        <div className="border-2">
                                            <img
                                                src={signatureData?.Sign}
                                                alt="Signature"
                                                style={{
                                                    maxWidth: '100%',
                                                    height: 'auto',
                                                }}
                                            />
                                        </div>
                                        <span className="text-[12px]">
                                            {signatureData?.nameOfSignature}
                                        </span>
                                    </div>
                                    <Tooltip title="Delete" placement="middle">
                                        <img
                                            onClick={deleteConfirmation}
                                            src={deleteIcon}
                                            className={`h-[5rem] w-[5rem] ${!permissions?.delete_provider_signature ? 'opacity-50 pointer-events-none' : ''}`}
                                            alt="deleteIcon"
                                        />
                                    </Tooltip>
                                </div>
                            ) : (
                                <button
                                    onClick={handleClickProviderSign}
                                    type="submit"
                                    disabled={
                                        !appointment?.authorizationCodes?.[0]
                                            ?.authorizationCode?.code ||
                                        !permissions?.add_provider_signature
                                            ? true
                                            : false
                                    }
                                    className="py-2 mb-2 w-[16vw] justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-primary-700 text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
                                >
                                    Provider Signature
                                </button>
                            )}
                        </div>
                    </div>
                    <div
                        className={`${isViewMode === 'view' ? 'pointer-events-none' : ''} main flex flex-col`}
                    >
                        {completeScheduleEvent ||
                        appointment?.sessionNoteBilling ? (
                            <div className="btn flex flex-col w-100 flex-end mt-10">
                                <div className="flex ">
                                    <button
                                        type="submit"
                                        disabled={
                                            completeScheduleEvent ||
                                            appointment?.sessionNoteBilling
                                        }
                                        className="py-2 mb-2 px-[3rem] w-[30vw] justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-primary-700 text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
                                    >
                                        Appointment Completed
                                    </button>
                                    <img
                                        src={appointmentSubmitted}
                                        alt="appointmentSubmitted"
                                        className="ml-2"
                                    />
                                </div>
                                <span className="text-sm mt-2">
                                    Clicking here will send this appointment for
                                    billing and generate a billing record
                                </span>
                            </div>
                        ) : (
                            <div className="btn flex flex-col w-100 flex-end mt-[25px]">
                                <button
                                    onClick={handleCompleteAppointment}
                                    type="submit"
                                    disabled={
                                        !(
                                            (noteName?.id ||
                                                fullDataOfTemplate?.template
                                                    ?.id) &&
                                            signatureData?.nameOfSignature &&
                                            signatureData.nameOfSignature
                                                .length > 0
                                        )
                                    }
                                    className="py-2 mb-2 px-[3rem] w-[20vw] justify-evenly inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-primary-700 text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:bg-secondary-200 disabled:cursor-not-allowed"
                                >
                                    Complete Appointment
                                </button>
                                <span className="text-sm mt-2">
                                    Clicking here will send this appointment for
                                    billing and generate a billing record
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {note && (
                <SelectExistingNoteGrid
                    onClose={onClose}
                    first={note}
                    setIsEdit={setIsEdit}
                    setNote={setNote}
                    setMode={setMode}
                />
            )}
            {(newNote || isEdit) && (
                <AddNewNote
                    onClose={isEdit ? onCloseEditModal : onClose}
                    isOpen={newNote || isEdit}
                    setNewNote={setNewNote}
                    setName={setName}
                    isEdit={isEdit}
                    mode={mode}
                    isClosable={isClosable}
                    setIsClosable={setIsClosable}
                />
            )}
            {isMultipleSession && (
                <ListOfSessionNoteTemplate
                    openModalById={openModalById}
                    onClose={() => {
                        setIsMultipleSession(false);
                    }}
                    setIsMultipleSession={setIsMultipleSession}
                    isOpen={isMultipleSession}
                />
            )}
            {signature && (
                <SignatureModal
                    onClose={onClose}
                    first={signature}
                    codeAfterEdit={code}
                />
            )}
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Note'}
                    name={
                        isEdit
                            ? fullDataOfTemplate?.sessionTemplateId?.templateId
                                  ?.name
                            : noteName?.name ||
                              fullDataOfTemplate?.templateId?.name ||
                              fullDataOfTemplate?.sessionTemplateId?.templateId
                                  ?.name
                    }
                    title={'Are you sure you want to delete this note ?'}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={deleteSessionNote}
                />
            )}
            {openConfirmationModal && (
                <ConfirmationModal
                    header={''}
                    name={''}
                    title={
                        "Are you sure you want to delete provider's signature ?"
                    }
                    open={openConfirmationModal}
                    onClose={() => setOpenConfirmationModal(false)}
                    handleStop={handleClearButton}
                />
            )}
        </div>
    );
}
