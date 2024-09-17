/* eslint-disable max-len */
import * as React from 'react';
import CommonGrid from '../Generics/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '../Generics/Tooltip';
import { Link } from 'react-router-dom';
//Icons Import
import edit from '../../assets/img/GridIcons/edit.svg';
import copy from '../../assets/img/GridIcons/copy.svg';
import view from '../../assets/img/GridIcons/view.svg';
import deleteIcon from '../../assets/img/GridIcons/delete.svg';
import publish from '../../assets/img/publish.svg';
import unpublished from '../../assets/img/unpublished.svg';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
    CustomStatusGuideline,
    CustomStatusGuidelinePublish,
} from '../Generics/Grid/CommonFunction';
import { ROUTES } from '../../constants';
import { GuidelineTemplate } from '../../types/gridInterface';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import { usePermission } from '../../hooks/usePermission';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import ConfirmationModal from '../Generics/ConfirmationModal';
import publishGuidelineTemplateAPI from '../../api/services/GuidelineTemplateGrid/publishGuidelineTemplate.service';
import unpublishGuidelineTemplateAPI from '../../api/services/GuidelineTemplateGrid/unpublishGuidelineTemplate.service';
import CopyTemplateModal from '../CopyTemplate';
import { openNotification } from '../../redux/slice/Notification/notifications';
import checkDuplicateTemplateAPI from '../../api/services/checkDuplicateTemplateName.service';
import copyGuidelineTemplateAPI from '../../api/services/GuidelineTemplateGrid/copyGuidlineTemplate.service';
import deleteGuidelineTemplateAPI from '../../api/services/GuidelineTemplateGrid/deleteGuidelineTemplate.service';
import Button from '../Generics/Button';
export default function GuidelineTemplateGrid(): React.JSX.Element {
    const { permissions } = usePermission({
        itemsToCheck: [
            'copy_guideline_template',
            'create_guideline_template',
            'delete_guideline_template',
            'publish_guideline_template',
            'view_guideline_template',
            'unpublish_guideline_template',
        ],
    });
    const title = 'Guideline Templates';
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const [openConfirmationModal, setOpenConfirmationModal] =
        React.useState(false);
    const [openConfirmationCopyModal, setOpenConfirmationCopyModal] =
        React.useState(false);
    const [showError, setShowError] = React.useState(false);
    const [onClickAction, setOnClickAction] = React.useState('');
    const [templateName, setTemplateName] = React.useState<any>({});
    const [value, setValue] = React.useState('');
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);
    const dispatch = useDispatch<any>();
    const data = {
        heading: '',
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'GUIDELINE_TEMPLATE',
        assignedTo: userPermission?.userId,
        pagination: { startIndex: 0, noOfRecords: 19 },
        order: '',
        name: '',
        filterValue: '',
        appointmentWith: '1',
        publishStatus: 'Published',
    };
    React.useEffect(() => {
        dispatch(getActiveAsync(data));
        dispatch(savingTabData({ tab: 'GUIDELINE_TEMPLATE' }));
    }, [dispatch]);
    const copyGuideline = (e: any): void => {
        if (permissions?.copy_guideline_template) {
            setTemplateName(e);
            setValue(`${e?.name}-Copy`);
            setOpenConfirmationCopyModal(true);
        }
    };
    const publishGuideline = (e: any): void => {
        if (permissions?.publish_guideline_template) {
            setOpenConfirmationModal(true);
            setOnClickAction('Publish');
            setTemplateName(e);
        }
    };
    const unpublishGuideline = (e: any): void => {
        if (permissions?.unpublish_guideline_template) {
            setOpenConfirmationModal(true);
            setOnClickAction('Unpublish');
            setTemplateName(e);
        }
    };
    const ActionTemplateGrid = (
        e: GuidelineTemplate,
        setEvent: any
    ): React.JSX.Element => {
        const deleteGuidelineTemplate = (): void => {
            setEvent({
                id: e?.id,
                name: e?.name,
            });
            setOpenConfirmationModalForDelete(true);
        };
        return (
            <div className="w-44 flex justify-between items-center">
                <Tooltip title="View">
                    <Link
                        to={
                            permissions?.view_guideline_template
                                ? ROUTES.guidelineTemplate + '/view/' + e?.id
                                : ''
                        }
                        className={`${!permissions?.view_guideline_template || e?.status?.name === 'Published' || e?.isSystemGenerated ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img data-testid="view-btn" src={view} alt="view" />
                    </Link>
                </Tooltip>
                <Tooltip title="Edit">
                    <Link
                        to={
                            permissions?.create_guideline_template
                                ? ROUTES.guidelineTemplate + '/' + e?.id
                                : ''
                        }
                        className={`${!permissions?.create_guideline_template || e?.status?.name === 'Published' || e?.isSystemGenerated ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <img data-testid="Edit-btn" src={edit} alt="edit" />
                    </Link>
                </Tooltip>
                <Tooltip title="Copy">
                    <Button
                        onClick={() => {
                            copyGuideline(e);
                        }}
                        className={`${e?.isSystemGenerated || !permissions?.copy_guideline_template ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} `}
                        type={''}
                    >
                        <img data-testid="copy-btn" src={copy} alt="copy" />
                    </Button>
                </Tooltip>
                <Tooltip title="Publish">
                    <Button
                        onClick={() => {
                            publishGuideline(e);
                        }}
                        className={`${e?.status?.name === 'Published' || e?.isSystemGenerated || !permissions?.publish_guideline_template ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                        type={''}
                    >
                        <img
                            data-testid="publish-btn"
                            src={publish}
                            alt="publish"
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Unpublish">
                    <Button
                        onClick={() => {
                            unpublishGuideline(e);
                        }}
                        className={`${e?.status?.name === 'Unpublished' || e?.status?.name === 'Draft' || e?.isSystemGenerated || !permissions?.unpublish_guideline_template ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                        type={''}
                    >
                        <img
                            data-testid="unpublished-btn"
                            src={unpublished}
                            alt="unpublished"
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Delete">
                    <Button
                        onClick={deleteGuidelineTemplate}
                        className={`${e?.isSystemGenerated || e?.status?.name === 'Published' || !permissions?.delete_guideline_template ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} `}
                        type={''}
                    >
                        <img
                            data-testid="deleteIcon-btn"
                            src={deleteIcon}
                            alt="deleteIcon"
                        />
                    </Button>
                </Tooltip>
            </div>
        );
    };
    const [event, setEvent] = React.useState({
        id: '',
        name: '',
    });
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            width: '40px',
            body: () => CustomName('', ''),
        },
        {
            // field: 'status.type',
            body: (e: any) => CustomStatusGuideline(e?.isSystemGenerated),
        },
        {
            header: ConstColumnDiv('Name', getGridData, 'name'),
            width: '40px',
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv('Status', getGridData, 'status.name'),
            // field: 'status.type',
            body: (e: any) => CustomStatusGuidelinePublish(e?.status?.name),
        },
        {
            header: ConstColumnDiv(
                'Created By',
                getGridData,
                'createdBy.firstName'
            ),
            // field: 'createdBy.username',
            body: (e: any) =>
                CustomName(
                    e?.createdBy?.firstName,
                    e?.createdBy?.lastName,
                    e?.createdBy
                ),
        },
        {
            header: ConstColumnDiv('Created On', getGridData, 'createdDate'),
            // field: 'createdDate',
            body: (e: any) => CustomDate(e?.createdDate),
        },
        {
            header: ConstColumnDiv(
                'Published By',
                getGridData,
                'publishedBy.username'
            ),
            // field: 'publishedBy.username',
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
            // field: 'publishedOn',
            body: (e: any) => CustomDate(e?.publishedOn),
        },
        {
            header: ConstColumnDiv('Actions', getGridData, ''),

            body: (e: any) => ActionTemplateGrid(e, setEvent),
        },
    ];
    const publishTemplate = async (): Promise<any> => {
        const publishData = {
            templateId: templateName?.id,
        };
        const res =
            await publishGuidelineTemplateAPI.publishGuidelineTemplate(
                publishData
            );
        if (!res?.data?.error) {
            setOpenConfirmationModal(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Guideline Template published successfully.',
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
            await unpublishGuidelineTemplateAPI.unpublishGuidelineTemplate(
                unpublishData
            );
        if (!res?.data?.error) {
            setOpenConfirmationModal(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Guideline Template unpublished successfully.',
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
            const res =
                await copyGuidelineTemplateAPI.copyGuidelineTemplate(copyData);
            if (!res?.data?.error) {
                setOpenConfirmationCopyModal(false);
                dispatch(getActiveAsync(data));
                setTimeout(() => {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Guideline Template copied successfully.',
                            description: '',
                        })
                    );
                }, 800);
            } else {
                return res;
            }
        } else {
            setShowError(true);
        }
    };
    const handleDeleteCall = async (): Promise<any> => {
        const payload = {
            templateId: event?.id,
        };
        const res =
            await deleteGuidelineTemplateAPI.deleteGuidelineTemplate(payload);
        if (!res?.data?.error) {
            setOpenConfirmationModalForDelete(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Guideline Template deleted successfully',
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
                    header={'Delete Guideline Template'}
                    name={event?.name}
                    title={`Are you sure you want to delete this guideline template ${event?.name} ?`}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={handleDeleteCall}
                />
            )}
        </>
    );
}
