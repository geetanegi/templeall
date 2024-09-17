/* eslint-disable max-lines */
/* eslint-disable max-len */
import * as React from 'react';
import CommonGrid from '../Generics/Grid';
import Tooltip from '../Generics/Tooltip';
import { Link } from 'react-router-dom';
//Icons Import
import edit from '../../assets/img/GridIcons/edit.svg';
import copy from '../../assets/img/GridIcons/copy.svg';
import view from '../../assets/img/GridIcons/view.svg';
import activateIcon from '../../assets/img/activateCode.svg';
import inactiveIcon from '../../assets/img/inactivateCode.svg';
import publish from '../../assets/img/publish.svg';
import unpublished from '../../assets/img/unpublished.svg';
import ConstColumnDiv, {
    CustomDate,
    CustomName,
    CustomStatusGuideline,
    CustomStatusGuidelinePublish,
} from '../Generics/Grid/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import {
    savingMasterData,
    setAutoProgress,
    setAutoRegress,
    setCardCount,
    setCardCountDuration,
    setCardCountFirst,
    setCardCountFrequency,
    setCardCountLat,
    setCardCountRate,
    setCardCountRating,
    setCardCountScore,
    setCardCountTime,
    setCardCountTask,
    setDataType,
    setOnEdit,
    setOnView,
    setCardCountGeneral,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import { getTemplateData } from '../../redux/slice/GetTemplate/getTemplate';
import { savingGetMasteryCriteriaTemplateData } from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import {
    getActiveAsync,
    savingTabData,
} from '../../redux/slice/MineSlice/getMine';
import CommonSubHeader from '../SubHeader/CommonSubHeader';
import saveMasteryCriteriaTemplateAPI from '../../api/services/MasterCriteriaTemplate/saveMasteryCriteriaTemplate.service';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { openNotification } from '../../redux/slice/Notification/notifications';
import CopyTemplateModal from '../CopyTemplate';
import checkDuplicateTemplateAPI from '../../api/services/checkDuplicateTemplateName.service';
import { usePermission } from '../../hooks/usePermission';
const ActionTemplateGrid = (
    e: any,
    setOpenConfirmationModal: any,
    setEvent: any,
    setOnClickAction: any,
    setOpenConfirmationCopyModal: any,
    setValue: any,
    setOpenConfirmationModalForActivateCode: any,
    setOpenConfirmationModalForInactiveCode: any
): any => {
    const { permissions } = usePermission({
        itemsToCheck: [
            'copy_mastery_criteria_template',
            'create_mastery_criteria_template',
            'delete_mastery_criteria_template',
            'publish_mastery_criteria_template',
            'view_mastery_criteria_template',
            'unpublish_mastery_criteria_template',
        ],
    });
    const dispatch = useDispatch<any>();
    const onClickEdit = (): any => {
        if (permissions?.create_mastery_criteria_template) {
            dispatch(savingMasterData([]));
            dispatch(savingGetMasteryCriteriaTemplateData([]));
            dispatch(getTemplateData(e));
            dispatch(setOnEdit(true));
            dispatch(setDataType('Percent'));
            dispatch(setAutoProgress(''));
            dispatch(setAutoRegress(''));
            dispatch(setCardCount(3));
            dispatch(setCardCountDuration(3));
            dispatch(setCardCountFrequency(3));
            dispatch(setCardCountScore(3));
            dispatch(setCardCountLat(3));
            dispatch(setCardCountRating(3));
            dispatch(setCardCountFirst(3));
            dispatch(setCardCountRate(3));
            dispatch(setCardCountTime(3));
            dispatch(setCardCountTask(3));
            dispatch(setCardCountGeneral(3));
            dispatch(setOnView(false));
        }
    };
    const onClickView = (): any => {
        if (permissions?.view_mastery_criteria_template) {
            dispatch(savingMasterData([]));
            dispatch(savingGetMasteryCriteriaTemplateData([]));
            dispatch(getTemplateData(e));
            dispatch(setOnEdit(true));
            dispatch(setOnView(true));
            dispatch(setDataType('Percent'));
            dispatch(setCardCount(3));
            dispatch(setCardCountDuration(3));
            dispatch(setCardCountFrequency(3));
            dispatch(setCardCountScore(3));
            dispatch(setCardCountLat(3));
            dispatch(setCardCountRating(3));
            dispatch(setCardCountFirst(3));
            dispatch(setCardCountRate(3));
            dispatch(setCardCountTime(3));
            dispatch(setCardCountTask(3));
            dispatch(setCardCountGeneral(3));
        }
    };
    const onPublish = (): any => {
        if (permissions?.publish_mastery_criteria_template) {
            setOpenConfirmationModal(true);
            setOnClickAction('Publish');
            setEvent({ id: e?.id, name: e?.name });
        }
    };
    const onUnpublish = (): any => {
        if (permissions?.unpublish_mastery_criteria_template) {
            setOpenConfirmationModal(true);
            setOnClickAction('UnPublish');
            setEvent({ id: e?.id, name: e?.name });
        }
    };
    const onCopy = (): any => {
        if (permissions?.copy_mastery_criteria_template) {
            setValue(`${e?.name}-Copy`);
            setOpenConfirmationCopyModal(true);
            setEvent({ id: e?.id, name: e?.name });
        }
    };
    const activateCode = (): any => {
        setEvent({
            id: e?.id,
            name: e?.name,
        });
        setOpenConfirmationModalForActivateCode(true);
    };
    const inactiveCode = (): any => {
        setEvent({
            id: e?.id,
            name: e?.name,
        });
        setOpenConfirmationModalForInactiveCode(true);
    };
    return (
        <div className="flex ml-[-2rem] justify-evenly items-start">
            <Tooltip title="View" placement="middle">
                <Link
                    data-testid="View-element"
                    to={`/master-criteria-template/${e?.name}/${e?.id}/view`}
                    className={` cursor-pointer ${!permissions?.view_mastery_criteria_template ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
                    onClick={() => onClickView()}
                >
                    <img src={view} alt="view" />
                </Link>
            </Tooltip>
            <Tooltip title="Edit" placement="middle">
                <Link
                    to={`/master-criteria-template/${e?.name}/${e?.id}`}
                    className={`${e?.status?.name === 'Published' || e?.isSystemGenerated || !permissions?.create_mastery_criteria_template ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => onClickEdit()}
                >
                    <img src={edit} alt="edit"></img>
                </Link>
            </Tooltip>
            <Tooltip title="Copy" placement="middle">
                <img
                    src={copy}
                    alt="copy"
                    className={`${e?.status?.name === 'Published' || e?.isSystemGenerated || !permissions?.copy_mastery_criteria_template ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => onCopy()}
                />
            </Tooltip>
            <Tooltip title="Publish" placement="middle">
                <img
                    src={publish}
                    className={`${e?.status?.name === 'Published' || e?.isSystemGenerated || !permissions?.publish_mastery_criteria_template || e?.activeStatus === 'Inactive' ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
                    alt="publish"
                    onClick={() => onPublish()}
                />
            </Tooltip>
            <Tooltip title="Unpublish" placement="middle">
                <img
                    src={unpublished}
                    className={`${e?.status?.name === 'Unpublished' || e?.status?.name === 'Draft' || !permissions?.unpublish_mastery_criteria_template || e?.isSystemGenerated ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
                    alt="unpublished"
                    onClick={() => onUnpublish()}
                />
            </Tooltip>
            <Tooltip title="Active">
                <img
                    src={activateIcon}
                    alt="activateIcon"
                    onClick={activateCode}
                    className={`${e?.activeStatus === 'Active' ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'cursor-pointer'} ml-1 `}
                />
            </Tooltip>
            <Tooltip title="Inactive">
                <img
                    src={inactiveIcon}
                    alt="inactiveIcon"
                    onClick={inactiveCode}
                    className={`${e?.activeStatus === 'Inactive' || e?.status?.name === 'Published' ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'cursor-pointer'} ml-1`}
                />
            </Tooltip>
        </div>
    );
};
export default function MasteryCriteriaTemplateGrid(): React.JSX.Element {
    const getGridData = useSelector(({ getMine }: any) => getMine);
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission?.value?.data
    );
    const [openConfirmationModal, setOpenConfirmationModal] =
        React.useState(false);
    const [event, setEvent] = React.useState({ id: '', name: '' });
    const [showError, setShowError] = React.useState(false);
    const [onClickAction, setOnClickAction] = React.useState('');
    const [openConfirmationCopyModal, setOpenConfirmationCopyModal] =
        React.useState(false);
    const [value, setValue] = React.useState('');
    const [
        openConfirmationModalForActivateCode,
        setOpenConfirmationModalForActivateCode,
    ] = React.useState(false);
    const [
        openConfirmationModalForInactiveCode,
        setOpenConfirmationModalForInactiveCode,
    ] = React.useState(false);
    const dispatch = useDispatch<any>();
    const data = {
        heading: getGridData?.heading,
        roleId: userPermission?.userRoles?.data?.roleId,
        type: 'MASTERY_CRITERIA_TEMPLATE',
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
        dispatch(savingTabData({ tab: 'MASTERY_CRITERIA_TEMPLATE' }));
    }, [dispatch]);
    const handlePublishCall = async (): Promise<any> => {
        const payload = {
            templateId: event?.id,
        };
        const res =
            await saveMasteryCriteriaTemplateAPI.publishMasteryCriteriaNameCall(
                payload
            );
        if (!res?.data?.error) {
            setOpenConfirmationModal(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Mastery Criteria Template published successfully',
                        description: '',
                    })
                );
            }, 800);
            return res?.data;
        } else {
            return 'error';
        }
    };
    const handleUnPublishCall = async (): Promise<any> => {
        const payload = {
            templateId: event?.id,
        };
        const res =
            await saveMasteryCriteriaTemplateAPI.unPublishMasteryCriteriaNameCall(
                payload
            );
        if (!res?.data?.error) {
            setOpenConfirmationModal(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Mastery Criteria Template unpublished successfully',
                        description: '',
                    })
                );
            }, 800);
            return res?.data;
        } else {
            return 'error';
        }
    };
    const copyTemplate = async (): Promise<any> => {
        const copyData = {
            templateId: event?.id,
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
                await saveMasteryCriteriaTemplateAPI.copyMasteryCriteriaNameCall(
                    copyData
                );
            if (!res?.data?.error) {
                setOpenConfirmationCopyModal(false);
                dispatch(getActiveAsync(data));
                setTimeout(() => {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Mastery Criteria Template copied successfully.',
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
    const handleActivateCode = async (): Promise<any> => {
        const payload = {
            templateId: event?.id,
            status: 'Active',
        };
        const res =
            await saveMasteryCriteriaTemplateAPI.checkStatusActiveAndInactive(
                payload
            );
        if (!res?.data?.error) {
            setOpenConfirmationModalForActivateCode(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Mastery criteria template activated successfully',
                        description: '',
                    })
                );
            }, 800);
            return res?.data;
        } else {
            setOpenConfirmationModalForActivateCode(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Unable to activate this record',
                        description: '',
                    })
                );
            }, 800);
        }
    };
    const handleInactiveCode = async (): Promise<any> => {
        const payload = {
            templateId: event?.id,
            status: 'Inactive',
        };
        const res =
            await saveMasteryCriteriaTemplateAPI.checkStatusActiveAndInactive(
                payload
            );
        if (!res?.data?.error) {
            setOpenConfirmationModalForInactiveCode(false);
            dispatch(getActiveAsync(data));
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Mastery criteria template is inactive now.',
                        description: '',
                    })
                );
            }, 800);
            return res?.data;
        } else {
            setOpenConfirmationModalForInactiveCode(false);
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Unable to inactive this record',
                        description: '',
                    })
                );
            }, 800);
        }
    };
    const columnDefinitionsTemplateGrid = [
        {
            header: ConstColumnDiv('', getGridData, ''),
            headerName: '',
            width: '40px',
            body: () => CustomName('', ''),
        },
        {
            body: (e: any) => CustomStatusGuideline(e?.isSystemGenerated),
        },
        {
            header: ConstColumnDiv('Name', getGridData, 'name'),
            body: (e: any) => CustomName(e?.name, ''),
        },
        {
            header: ConstColumnDiv(
                'Published Status',
                getGridData,
                'status.name'
            ),
            body: (e: any) => CustomStatusGuidelinePublish(e?.status?.name),
        },
        {
            header: ConstColumnDiv(
                'Active Status',
                getGridData,
                'activeStatus'
            ),
            body: (e: any) => CustomName(e?.activeStatus, ''),
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
            header: ConstColumnDiv(
                'Published By',
                getGridData,
                'publishedBy.username'
            ),
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
            width: '17rem',
            body: (e: any) =>
                ActionTemplateGrid(
                    e,
                    setOpenConfirmationModal,
                    setEvent,
                    setOnClickAction,
                    setOpenConfirmationCopyModal,
                    setValue,
                    setOpenConfirmationModalForActivateCode,
                    setOpenConfirmationModalForInactiveCode
                ),
        },
    ];
    const title = 'Mastery Criteria Templates';
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
                    name={event?.name}
                    open={openConfirmationModal}
                    onClose={() => setOpenConfirmationModal(false)}
                    handleStop={
                        onClickAction === 'Publish'
                            ? handlePublishCall
                            : handleUnPublishCall
                    }
                />
            )}
            {openConfirmationCopyModal && (
                <CopyTemplateModal
                    header={'Copy Template'}
                    title={'Are you sure you want to copy this template?'}
                    name={event?.name}
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
            {openConfirmationModalForActivateCode && (
                <ConfirmationModal
                    header={'Activate Mastery Criteria'}
                    name={event?.name}
                    title={`Are you sure you want to activate this mastery criteria template ${event?.name} ?`}
                    open={openConfirmationModalForActivateCode}
                    onClose={() =>
                        setOpenConfirmationModalForActivateCode(false)
                    }
                    handleStop={handleActivateCode}
                />
            )}
            {openConfirmationModalForInactiveCode && (
                <ConfirmationModal
                    header={'Inactive Mastery Criteria'}
                    name={event?.name}
                    title={`Are you sure you want to make this mastery criteria template inactive ${event?.name} ?`}
                    open={openConfirmationModalForInactiveCode}
                    onClose={() =>
                        setOpenConfirmationModalForInactiveCode(false)
                    }
                    handleStop={handleInactiveCode}
                />
            )}
        </>
    );
}
