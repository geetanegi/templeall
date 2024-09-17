/* eslint-disable max-lines */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CommonGrid from '../Generics/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
//Icons Import
import edit from '../../assets/img/GridIcons/edit.svg';
import draft from '../../assets/img/draft.svg';
import publish from '../../assets/img/publish.svg';
import unpublished from '../../assets/img/unpublished.svg';
import copy from '../../assets/img/GridIcons/copy.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import unpublishSessionNoteAPI from '../../api/services/SessionNoteTemplateGrid/unpublishSessionNote.service';
import publishSessionNoteAPI from '../../api/services/SessionNoteTemplateGrid/publishSessionNote.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import CopyTemplateModal from '../CopyTemplate';
import copySessionNoteAPI from '../../api/services/SessionNoteTemplateGrid/copySessionNote.service';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import checkDuplicateTemplateAPI from '../../api/services/checkDuplicateTemplateName.service';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
    CustomStatusSessionNote,
} from '../Generics/Grid/CommonFunction';
import ConfirmationModal from '../Generics/ConfirmationModal';
import deleteSessionNoteAPI from '../../api/services/SessionNoteTemplateGrid/deleteSessionNote.service';
import { usePermission } from '../../hooks/usePermission';

export default function SessionNoteGrid(): React.JSX.Element {
    const { permissions } = usePermission({
        itemsToCheck: [
            'create_session_note_template',
            'delete_session_note_template',
            'publish_session_note_template',
            'unpublish_session_note_template',
            'view_session_note_template',
            'copy_session_note_template',
        ],
    });
    const title = 'Session Note';
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const [openConfirmationCopyModal, setOpenConfirmationCopyModal] =
        useState(false);
    const [value, setValue] = useState('');

    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [onClickAction, setOnClickAction] = useState('');
    const [showError, setShowError] = useState(false);
    const [templateName, setTemplateName] = useState<any>({});
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        useState(false);
    const dispatch = useDispatch<any>();
    const data = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'allNote',
        assignedTo: userPermission?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
    };
    useEffect(() => {
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'allNote' }));
    }, [dispatch]);

    const ActionTemplateGrid = (e: any, setEvent: any): any => {
        const deleteSession = (): void => {
            if (permissions?.delete_session_note_template) {
                setEvent({
                    id: e?.id,
                    name: e?.name,
                    providerId: e?.providerId?.id,
                });
                setOpenConfirmationModalForDelete(true);
            }
        };
        const copySessionNote = (): void => {
            if (permissions?.copy_session_note_template) {
                setTemplateName(e);
                setValue(`${e?.name}-Copy`);
                setOpenConfirmationCopyModal(true);
            }
        };
        const unpublishedSessionNote = (): void => {
            if (permissions?.unpublish_session_note_template) {
                setOpenConfirmationModal(true);
                setOnClickAction('Unpublish');
                setTemplateName(e);
            }
        };
        const publishSessionNote = (): void => {
            if (permissions?.publish_session_note_template) {
                setOpenConfirmationModal(true);
                setOnClickAction('Publish');
                setTemplateName(e);
            }
        };

        return (
            <div className="flex ml-[-2rem] justify-evenly items-start">
                <Tooltip title="Edit" placement="middle">
                    <Link
                        className={`${e?.status?.name === 'Published' || e?.isSystemGenerated || !permissions?.create_session_note_template ? 'opacity-50 pointer-events-none' : ''}`}
                        to={
                            permissions?.create_session_note_template
                                ? ROUTES.sessionNote + '/' + e?.id
                                : ''
                        }
                        data-testid="edit-goal-mode-button"
                    >
                        <img src={edit} alt="edit" />
                    </Link>
                </Tooltip>
                <Tooltip title="Copy">
                    <img
                        data-testid="copy-goal-mode-button"
                        src={copy}
                        alt="copy"
                        className={`${e?.isSystemGenerated || !permissions?.copy_session_note_template ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                        onClick={copySessionNote}
                    />
                </Tooltip>
                <Tooltip title="Publish">
                    <img
                        data-testid="publish-goal-mode-button"
                        src={publish}
                        className={`${e?.status?.name === 'Published' || e?.isSystemGenerated || !permissions?.publish_session_note_template ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                        alt="publish"
                        onClick={publishSessionNote}
                    />
                </Tooltip>
                <Tooltip title="Unpublish" placement="middle">
                    <img
                        data-testid="unpublished-goal-mode-button"
                        src={unpublished}
                        className={`${e?.status?.name === 'Unpublished' || e?.status?.name === 'Draft' || e?.isSystemGenerated || !permissions?.unpublish_session_note_template ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                        alt="unpublished"
                        onClick={unpublishedSessionNote}
                    />
                </Tooltip>
                <Tooltip title="Create Draft" placement="middle">
                    <img
                        data-testid="Draft-goal-mode-button"
                        src={draft}
                        alt="Draft"
                        className={`${e?.status?.name === 'Draft' || e?.isSystemGenerated || !permissions?.view_guideline_template ? 'opacity-50 pointer-none' : 'cursor-pointer'}`}
                    />
                </Tooltip>
                <Tooltip title="Delete">
                    <img
                        data-testid="deleteIcon-goal-mode-button"
                        src={deleteIcon}
                        alt="deleteIcon"
                        onClick={deleteSession}
                        className={`${e?.isSystemGenerated || e?.status?.name === 'Published' || !permissions?.delete_session_note_template ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} `}
                    />
                </Tooltip>
            </div>
        );
    };
    const [event, setEvent] = useState({
        id: '',
        name: '',
        providerId: '',
        billingCode: '',
    });
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            headerName: '',
            width: '40px',
            body: () => CustomName('', ''),
        },
        {
            header: ConstColumnDiv('Session Note', getGridData, 'name'),
            headerName: 'Session Name',
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv('Status', getGridData, 'status.name'),
            body: (e: any) => CustomStatusSessionNote(e?.status?.name),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getGridData,
                'createdBy.firstName'
            ),
            body: (e: any) =>
                CustomName(
                    e?.createdBy?.firstName,
                    e?.createdBy?.lastName,
                    e?.createdBy
                ),
        },
        {
            header: ConstColumnDiv('Created On', getGridData, 'createdDate'),
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv('Published By', getGridData, 'publishedBy'),
            body: (e: any) =>
                e.publishedBy === null || undefined
                    ? CustomName('', '')
                    : CustomName(
                          e?.publishedBy?.firstName,
                          e?.publishedBy?.lastName,
                          e?.publishedBy
                      ),
        },
        {
            header: ConstColumnDiv('Published On', getGridData, 'publishedOn'),
            body: (e: any) => CustomDate(e?.publishedOn),
        },

        {
            header: ConstColumnDiv('Actions', getGridData, ''),
            field: '',
            body: (e: any) => ActionTemplateGrid(e, setEvent),
        },
        {
            header: ConstColumnDiv('', getGridData, ''),
            headerName: '',
            width: '40px',
            body: () => CustomName('', ''),
        },
    ];
    const publishTemplate = async (): Promise<any> => {
        const publishData = {
            templateId: templateName?.id,
        };
        const res = await publishSessionNoteAPI.publishSessionNote(publishData);
        if (!res?.data?.error) {
            setOpenConfirmationModal(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Session Note Template published successfully.',
                        description: '',
                    })
                );
            }, 800);
        } else {
            return res;
        }
    };
    const unpublishTemplate = async (): Promise<any> => {
        const unpublishData = {
            templateId: templateName?.id,
        };
        const res =
            await unpublishSessionNoteAPI.unpublishSessionNote(unpublishData);
        if (!res?.data?.error) {
            setOpenConfirmationModal(false);

            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Session Note Template unpublished successfully.',
                        description: '',
                    })
                );
            }, 800);
        } else {
            return res;
        }
    };
    const copyTemplate = async (): Promise<any> => {
        const copyData = {
            templateId: templateName?.id,
            name: value,
        };
        const copyPayload = {
            templateName: value,
            templateId: '',
        };
        const checkRes =
            await checkDuplicateTemplateAPI.checkDuplicateTemplate(copyPayload);
        if (!checkRes?.data?.error) {
            if (!checkRes?.data?.data?.isDuplicate) {
                const res = await copySessionNoteAPI.copySessionNote(copyData);
                if (!res?.data?.error) {
                    setOpenConfirmationCopyModal(false);

                    dispatch(getActiveAsync(data));
                    setTimeout(() => {
                        dispatch(
                            openNotification({
                                success: true,
                                title: 'Session Note Template copied successfully.',
                                description: '',
                            })
                        );
                    }, 800);
                } else {
                    return res;
                }
            }
        } else {
            setShowError(true);
        }
    };
    const handleDeleteCall = async (): Promise<any> => {
        const payload = {
            templateId: event?.id,
        };
        const res = await deleteSessionNoteAPI.deleteSessionNote(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Session Note Template delete successfully',
                        description: '',
                    })
                );
            }, 800);
            return res?.data;
        } else {
            setOpenConfirmationModalForDelete(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Unable to delete this record',
                        description: '',
                    })
                );
            }, 800);
        }
    };
    return (
        <>
            <CommonSubHeader title={title} />
            <CommonGrid
                getGridData={getGridData}
                columnOfGrid={columnDefinitionsTemplateGrid}
            />
            {openConfirmationModal && (
                <ConfirmationModal
                    header={
                        onClickAction === 'Publish'
                            ? 'Publish Template'
                            : 'Unpublish Template'
                    }
                    title={
                        onClickAction === 'Publish'
                            ? 'Are you sure you want to publish this template?'
                            : 'Are you sure you want to unpublish this template?'
                    }
                    name={
                        templateName?.name?.charAt(0)?.toUpperCase() +
                        templateName?.name?.slice(1)
                    }
                    open={openConfirmationModal}
                    onClose={() => setOpenConfirmationModal(false)}
                    handleStop={() => {
                        onClickAction === 'Publish'
                            ? publishTemplate()
                            : unpublishTemplate();
                    }}
                />
            )}
            {openConfirmationCopyModal && (
                <CopyTemplateModal
                    header={'Copy Template'}
                    title={'Are you sure you want to copy this template?'}
                    name={templateName?.name}
                    open={openConfirmationCopyModal}
                    onClose={() => setOpenConfirmationCopyModal(false)}
                    handleStop={() => {
                        copyTemplate();
                    }}
                    value={value}
                    setValue={setValue}
                    showError={showError}
                />
            )}
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Session Note Template'}
                    name={event?.name}
                    title={`Are you sure you want to delete this session note template ${event?.name} ?`}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={handleDeleteCall}
                />
            )}
        </>
    );
}
