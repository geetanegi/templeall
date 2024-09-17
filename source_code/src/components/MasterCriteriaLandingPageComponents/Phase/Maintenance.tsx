/* eslint-disable max-lines */
/* eslint-disable max-len */
import * as React from 'react';
import addCriteria from '../../../assets/img/addCriteria.svg';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getMasteryCriteriaTemplateByIdCall,
    savingGetMasteryCriteriaTemplateDataById,
} from '../../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import {
    getFormData,
    getMasteryCriteriaTemplateCall,
    setAutoRegressId,
    setCardIndex,
} from '../../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import deleteIcon from '../../../assets/img/GridIcons/delete.svg';
import {
    savingTemplateData,
    setCardCount,
    setCardCountDuration,
    setIsModalClick,
    setPhaseValue,
    setCardCountFrequency,
    delMaintenanceCardPer,
    delMaintenanceCardFre,
    delMaintenanceCardDur,
    delMaintenanceCardScore,
    setMaintenanceCardPer,
    setMaintenanceCardFre,
    setMaintenanceCardDur,
    setCardCountScore,
    setMaintenanceCardScore,
    setCardCountLat,
    setMaintenanceCardLat,
    delMaintenanceCardLat,
    setCardCountRating,
    delMaintenanceCardRating,
    setMaintenanceCardRating,
    setMaintenanceCardFirst,
    setCardCountFirst,
    delMaintenanceCardFirst,
    setMaintenanceCardRate,
    setCardCountRate,
    delMaintenanceCardRate,
    setMaintenanceCardTime,
    setCardCountTime,
    delMaintenanceCardTime,
    setCardCountTask,
    setMaintenanceCardTask,
    delmaintenanceCardTask,
    setMaintenanceCardGeneral,
    setCardCountGeneral,
    delMaintenanceCardGeneral,
} from '../../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import Tooltip from '../../Generics/Tooltip';
import ConfirmationModal from '../../Generics/ConfirmationModal';
import Notifications from '../../Generics/Notifications';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import saveMasteryCriteriaTemplateAPI from '../../../api/services/MasterCriteriaTemplate/saveMasteryCriteriaTemplate.service';
export default function Maintenance({
    isFromGeneralCriteria,
    setIsFromGeneralCriteria,
}: {
    isFromGeneralCriteria?: any;
    setIsFromGeneralCriteria?: any;
}): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const criteriaTemplateData = useSelector(
        ({ getMasteryCriteriaTemplate }: any) =>
            getMasteryCriteriaTemplate?.value?.data
    );
    const targetDataByIdClicked = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    const editData = useSelector(
        ({ getTemplate }: any) => getTemplate?.templateData
    );
    const [openConfirmationModalForDelete, setOpenConfirmationModalForDelete] =
        React.useState(false);
    const [showNotification, setShowNotification] = React.useState(false);
    const [event, setEvent] = React.useState({
        name: '',
        item: '',
    });
    const targetData = useSelector(({ getTarget }: any) => getTarget);
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const templateId = useSelector(
        ({ createProgram }: any) => createProgram?.templateId
    );
    const maintenanceData: any = Array.isArray(criteriaTemplateData)
        ? criteriaTemplateData?.filter(
              (item: any) => item?.phase?.name === 'Maintenance'
          )
        : null;
    const blankCardData =
        criteriaData?.dataType === 'Percent'
            ? criteriaData?.maintenanceCardPer
            : criteriaData?.dataType === 'General'
              ? criteriaData?.maintenanceCardGeneral
              : criteriaData?.dataType === 'Frequency'
                ? criteriaData?.maintenanceCardFre
                : criteriaData?.dataType === 'Score'
                  ? criteriaData?.maintenanceCardScore
                  : criteriaData?.dataType === 'Duration'
                    ? criteriaData?.maintenanceCardDur
                    : criteriaData?.dataType === 'Latency'
                      ? criteriaData?.maintenanceCardLat
                      : criteriaData?.dataType === 'Rating Scale'
                        ? criteriaData?.maintenanceCardRating
                        : criteriaData?.dataType === 'First Probe'
                          ? criteriaData?.maintenanceCardFirst
                          : criteriaData?.dataType === 'Rate'
                            ? criteriaData?.maintenanceCardRate
                            : criteriaData?.dataType === 'Task Analysis'
                              ? criteriaData?.maintenanceCardTask
                              : criteriaData?.maintenanceCardTime;
    const handleClickAdd = (): any => {
        const newData: any = {
            id: maintenanceData?.length
                ? maintenanceData?.length + 1
                : criteriaData?.dataType === 'Percent'
                  ? criteriaData?.maintenanceCardPer?.length + 1
                  : criteriaData?.dataType === 'General'
                    ? criteriaData?.maintenanceCardGeneral?.length + 1
                    : criteriaData?.dataType === 'Frequency'
                      ? criteriaData?.maintenanceCardFre?.length + 1
                      : criteriaData?.dataType === 'Score'
                        ? criteriaData?.maintenanceCardScore?.length + 1
                        : criteriaData?.dataType === 'Duration'
                          ? criteriaData?.maintenanceCardDur?.length + 1
                          : criteriaData?.dataType === 'Latency'
                            ? criteriaData?.maintenanceCardLat?.length + 1
                            : criteriaData?.dataType === 'Rating Scale'
                              ? criteriaData?.maintenanceCardRating?.length + 1
                              : criteriaData?.dataType === 'First Probe'
                                ? criteriaData?.maintenanceCardFirst?.length + 1
                                : criteriaData?.dataType === 'Rate'
                                  ? criteriaData?.maintenanceCardRate?.length +
                                    1
                                  : criteriaData?.dataType === 'Task Analysis'
                                    ? criteriaData?.maintenanceCardTask
                                          ?.length + 1
                                    : criteriaData?.maintenanceCardTime
                                          ?.length + 1,
            label: 'No values here',
            value: 'Start Adding Criteria',
        };
        if (criteriaData?.dataType === 'Percent') {
            dispatch(setMaintenanceCardPer(newData));
            dispatch(setCardCount(1));
        } else if (criteriaData?.dataType === 'Frequency') {
            dispatch(setMaintenanceCardFre(newData));
            dispatch(setCardCountFrequency(1));
        } else if (criteriaData?.dataType === 'Duration') {
            dispatch(setMaintenanceCardDur(newData));
            dispatch(setCardCountDuration(1));
        } else if (criteriaData?.dataType === 'Score') {
            dispatch(setMaintenanceCardScore(newData));
            dispatch(setCardCountScore(1));
        } else if (criteriaData?.dataType === 'Latency') {
            dispatch(setMaintenanceCardLat(newData));
            dispatch(setCardCountLat(1));
        } else if (criteriaData?.dataType === 'Rating Scale') {
            dispatch(setMaintenanceCardRating(newData));
            dispatch(setCardCountRating(1));
        } else if (criteriaData?.dataType === 'First Probe') {
            dispatch(setMaintenanceCardFirst(newData));
            dispatch(setCardCountFirst(1));
        } else if (criteriaData?.dataType === 'Rate') {
            dispatch(setMaintenanceCardRate(newData));
            dispatch(setCardCountRate(1));
        } else if (criteriaData?.dataType === 'Task Analysis') {
            dispatch(setMaintenanceCardTask(newData));
            dispatch(setCardCountTask(1));
        } else if (criteriaData?.dataType === 'General') {
            dispatch(setMaintenanceCardGeneral(newData));
            dispatch(setCardCountGeneral(1));
        } else {
            dispatch(setMaintenanceCardTime(newData));
            dispatch(setCardCountTime(1));
        }
    };
    const onClickCard = (item: any, index: any): any => {
        const data = {
            id: item?.id,
        };
        dispatch(getMasteryCriteriaTemplateByIdCall(data));
        dispatch(getFormData(item));
        dispatch(setAutoRegressId(item));
        dispatch(setCardIndex(index));
        dispatch(setIsModalClick(false));
        if (isFromGeneralCriteria) {
            setIsFromGeneralCriteria(false);
        }
        dispatch(setPhaseValue('Maintenance'));
    };
    const addMaintenanceCriteria = (index: any): any => {
        dispatch(setCardIndex(index));
        dispatch(getFormData(''));
        dispatch(savingTemplateData([]));
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
        dispatch(setIsModalClick(false));
        if (isFromGeneralCriteria) {
            setIsFromGeneralCriteria(false);
        }
        dispatch(setPhaseValue('Maintenance'));
    };
    const isDisabled =
        targetDataByIdClicked?.targetStatus === 'Mastered' &&
        !targetDataByIdClicked?.isEditable;
    React.useEffect(() => {
        if (maintenanceData?.length >= 1) {
            if (criteriaData?.dataType === 'Percent') {
                if (criteriaData?.cardCount > 1) {
                    const toDelete: any = maintenanceData?.length;
                    dispatch(delMaintenanceCardPer(toDelete));
                    dispatch(setCardCount(1));
                }
            } else if (criteriaData?.dataType === 'Frequency') {
                if (criteriaData?.cardCountFreq > 1) {
                    const toDelete: any = maintenanceData?.length;
                    dispatch(delMaintenanceCardFre(toDelete));
                    dispatch(setCardCountFrequency(1));
                }
            } else if (criteriaData?.dataType === 'Duration') {
                if (criteriaData?.cardCountDuration > 1) {
                    const toDelete: any = maintenanceData?.length;
                    dispatch(delMaintenanceCardDur(toDelete));
                    dispatch(setCardCountDuration(1));
                }
            } else if (criteriaData?.dataType === 'Score') {
                if (criteriaData?.cardCountScore > 1) {
                    const toDelete: any = maintenanceData?.length;
                    dispatch(delMaintenanceCardScore(toDelete));
                    dispatch(setCardCountScore(1));
                }
            } else if (criteriaData?.dataType === 'Latency') {
                if (criteriaData?.cardCountLat > 1) {
                    const toDelete: any = maintenanceData?.length;
                    dispatch(delMaintenanceCardLat(toDelete));
                    dispatch(setCardCountLat(1));
                }
            } else if (criteriaData?.dataType === 'Rating Scale') {
                if (criteriaData?.cardCountRating > 1) {
                    const toDelete: any = maintenanceData?.length;
                    dispatch(delMaintenanceCardRating(toDelete));
                    dispatch(setCardCountRating(1));
                }
            } else if (criteriaData?.dataType === 'First Probe') {
                if (criteriaData?.cardCountFirst > 1) {
                    const toDelete: any = maintenanceData?.length;
                    dispatch(delMaintenanceCardFirst(toDelete));
                    dispatch(setCardCountFirst(1));
                }
            } else if (criteriaData?.dataType === 'Rate') {
                if (criteriaData?.cardCountRate > 1) {
                    const toDelete: any = maintenanceData?.length;
                    dispatch(delMaintenanceCardRate(toDelete));
                    dispatch(setCardCountRate(1));
                }
            } else if (criteriaData?.dataType === 'Task Analysis') {
                if (criteriaData?.cardCountTask > 1) {
                    const toDelete: any = maintenanceData?.length;
                    dispatch(delmaintenanceCardTask(toDelete));
                    dispatch(setCardCountTask(1));
                }
            } else {
                if (criteriaData?.cardCountTime > 1) {
                    const toDelete: any = maintenanceData?.length;
                    dispatch(delMaintenanceCardTime(toDelete));
                    dispatch(setCardCountTime(1));
                }
            }
        }
    }, [maintenanceData?.[0]?.id, maintenanceData?.length]);
    React.useEffect(() => {
        if (maintenanceData?.length >= 1) {
            if (criteriaData?.dataType === 'General') {
                dispatch(setCardCountGeneral(1));
                maintenanceData.forEach((item: any) => {
                    dispatch(delMaintenanceCardGeneral(item.indexCount));
                });
            }
        }
    }, [maintenanceData?.length, criteriaData?.cardCountGeneral]);
    const handleDeletion = (e: any, item: any): void => {
        setOpenConfirmationModalForDelete(true);
        setEvent({
            name: e,
            item: item,
        });
    };
    const deleteMaintenance = async (): Promise<any> => {
        setShowNotification(true);
        const a: any = event?.item;
        const payload = {
            masteryCriteriaTemplateId: a?.masteryCriteriaTemplateId || '',
            type: targetData?.isFromTarget
                ? 'target'
                : editProgramData?.programData?.id
                  ? 'program'
                  : 'template',
            dataType:
                criteriaData?.dataType ||
                targetData?.clickedTarget?.data?.targetType ||
                editProgramData?.programData?.programType,
        };
        const res =
            await saveMasteryCriteriaTemplateAPI.deleteMaintenance(payload);
        if (!res?.data?.error) {
            setTimeout(() => {
                dispatch(
                    openNotification({
                        success: true,
                        title: `Maintenance ${event.name} deleted successfully`,
                        description: '',
                    })
                );
            }, 800);
            setOpenConfirmationModalForDelete(false);
            const data = {
                templateId:
                    criteriaData?.value?.id ||
                    editData?.id ||
                    templateId ||
                    editProgramData?.programData?.templateForMasteryCriteria
                        ?.id ||
                    targetData?.clickedTarget?.data?.templateForMasteryCriteria
                        ?.id,
                dataType:
                    criteriaData?.dataType ||
                    targetData?.clickedTarget?.data?.targetType ||
                    editProgramData?.programData?.programType,
                isProgram: criteriaData?.isProgram ? true : false,
                temporaryId: criteriaData?.templateData?.temporaryId || '',
                addNew:
                    criteriaData?.value?.id ||
                    editData?.id ||
                    templateId?.length
                        ? false
                        : true,
                isTarget: targetData?.isFromTarget ? true : false,
                programId: targetData?.isFromTarget
                    ? editProgramData?.programData?.id ||
                      targetData?.clickedTarget?.data?.programBookId ||
                      ''
                    : params?.programId || '',
                targetId: targetData?.clickedTarget?.data?.id,
            };
            dispatch(getMasteryCriteriaTemplateCall(data));
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
    const closeNotification = (): any => {
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };
    return (
        <>
            <div
                className={`Baseline w-1/3 text-[#35ADB5] text-lg font-semibold font-['Lato'] leading-normal mt-5 ml-3 ${
                    isDisabled ? 'cursor-not-allowed pointer-events-none' : ''
                }`}
            >
                {'Maintenance'}
                <div className="flex items-center relative">
                    <div className="bg-gradient-to-r from-[#35ADB5] from-60% to-transparent w-full h-[0.2rem] rounded-t-md"></div>
                    <div
                        className="absolute end-0 cursor-pointer"
                        onClick={() => handleClickAdd()}
                        data-testid="maintenence-card"
                    >
                        <img className="" src={addCriteria} alt="" />
                    </div>
                </div>
                <div className="Rectangle2533 overflow-y-auto h-[30rem] px-6 pt-6 bg-gradient-to-b from-zinc-100 to-transparent ">
                    {Array.isArray(maintenanceData) &&
                        maintenanceData.length > 0 &&
                        maintenanceData?.map((item: any, index: any) => {
                            return (
                                <Link
                                    to={`${criteriaData?.isFromModal || isFromGeneralCriteria ? '' : '/master-criteria-template/Maintenance'}`}
                                    onClick={() => onClickCard(item, index + 1)}
                                    key={index}
                                    className={`${
                                        targetDataByIdClicked?.targetStatus ===
                                            'Maintenance' &&
                                        !targetDataByIdClicked?.isEditable &&
                                        index + 1 <
                                            targetDataByIdClicked?.masteryCriteriaIndexCount
                                            ? 'cursor-not-allowed pointer-events-none'
                                            : ''
                                    }`}
                                >
                                    <div className="hover:-translate-y-1 hover:transition hover:duration-500 hover:border-3 mb-3 hover:border-[#35ADB5] bg-white border shadow-lg rounded-xl">
                                        <div className="p-2 md:px-4 md:py-3">
                                            <div className="flex justify-between">
                                                <label className="text-[#35ADB5] text-xl font-semibold">
                                                    {`#${index + 1}`}
                                                </label>
                                                {index > 0 && (
                                                    <Tooltip title="Delete">
                                                        <div
                                                            className={`${
                                                                targetDataByIdClicked?.isEditable ===
                                                                false
                                                                    ? 'cursor-not-allowed  '
                                                                    : ''
                                                            } relative inline-block`}
                                                        >
                                                            <img
                                                                src={deleteIcon}
                                                                alt="delete"
                                                                className={`${
                                                                    targetDataByIdClicked?.isEditable ===
                                                                    false
                                                                        ? 'cursor-not-allowed  pointer-events-none '
                                                                        : ''
                                                                }`}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();
                                                                    setEvent({
                                                                        name:
                                                                            index +
                                                                            1,
                                                                        item: item,
                                                                    });
                                                                    handleDeletion(
                                                                        index +
                                                                            1,
                                                                        item
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </Tooltip>
                                                )}
                                            </div>
                                            {maintenanceData?.length > 0 && (
                                                <div className="py-3 pb-4 space-y-1">
                                                    <div className="flex space-x-2">
                                                        <label className="text-sm text-[#394148]">
                                                            Time Frame:
                                                        </label>
                                                        <label className="text-sm font-light text-gray-500">
                                                            {item?.timeFrame
                                                                ?.name || ''}
                                                        </label>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <label className="text-sm text-[#394148]">
                                                            Time Period:
                                                        </label>
                                                        <label className="text-sm font-light text-gray-500">
                                                            {item?.timePeriod ||
                                                                ''}
                                                        </label>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <label className="text-sm text-[#394148]">
                                                            Operation Type:
                                                        </label>
                                                        <label className="text-sm font-light text-gray-500">
                                                            {item?.operationType ||
                                                                ''}
                                                        </label>
                                                    </div>
                                                    {[
                                                        'Frequency',
                                                        'Rate',
                                                    ].includes(
                                                        criteriaData?.dataType
                                                    ) && (
                                                        <div className="flex space-x-2">
                                                            <label className="text-sm text-[#394148]">
                                                                Frequency:
                                                            </label>
                                                            <label className="text-sm font-light text-gray-500">
                                                                {item?.frequency ||
                                                                    ''}
                                                            </label>
                                                        </div>
                                                    )}
                                                    {criteriaData?.dataType ===
                                                        'Latency' && (
                                                        <div className="flex space-x-2">
                                                            <label className="text-sm text-[#394148]">
                                                                Latency:
                                                            </label>
                                                            <label className="text-sm font-light text-gray-500">
                                                                {item?.latencyMinutes ||
                                                                item?.latencySeconds
                                                                    ? `${item?.latencyMinutes || 0} minutes ${item?.latencySeconds || 0} seconds`
                                                                    : ''}
                                                            </label>
                                                        </div>
                                                    )}
                                                    {criteriaData?.dataType ===
                                                        'Rate' && (
                                                        <div className="flex space-x-2">
                                                            <label className="text-sm text-[#394148]">
                                                                Time:
                                                            </label>
                                                            <label className="text-sm font-light text-gray-500">
                                                                {`${item?.rateHour || 0} hour ${item?.rateMinutes || 0} minutes ${item?.rateSeconds || 0} seconds`}
                                                            </label>
                                                        </div>
                                                    )}
                                                    {criteriaData?.dataType ===
                                                        'Score' && (
                                                        <div className="flex space-x-2">
                                                            <label className="text-sm text-[#394148]">
                                                                Score:
                                                            </label>
                                                            <label className="text-sm font-light text-gray-500">
                                                                {item?.score ||
                                                                    ''}
                                                            </label>
                                                        </div>
                                                    )}
                                                    {criteriaData?.dataType ===
                                                        'Time Sampling' && (
                                                        <div className="flex space-x-2">
                                                            <label className="text-sm text-[#394148]">
                                                                Percent of
                                                                Intervals:
                                                            </label>
                                                            <label className="text-sm font-light text-gray-500">
                                                                {item?.timeSamplingInterval ||
                                                                    ''}
                                                            </label>
                                                        </div>
                                                    )}
                                                    {criteriaData?.dataType ===
                                                        'Rating Scale' && (
                                                        <div className="flex space-x-2">
                                                            <label className="text-sm text-[#394148]">
                                                                Rating:
                                                            </label>
                                                            <label className="text-sm font-light text-gray-500">
                                                                {item?.ratingScale ||
                                                                    ''}
                                                            </label>
                                                        </div>
                                                    )}
                                                    {[
                                                        'Percent',
                                                        'Duration',
                                                        'First Probe',
                                                        'Task Analysis',
                                                    ].includes(
                                                        criteriaData?.dataType
                                                    ) && (
                                                        <div className="flex space-x-2">
                                                            <label className="text-sm text-[#394148]">
                                                                {[
                                                                    'Percent',
                                                                    'First Probe',
                                                                    'Task Analysis',
                                                                ].includes(
                                                                    criteriaData?.dataType
                                                                )
                                                                    ? 'Accuracy Threshold:'
                                                                    : 'Duration Requirement:'}
                                                            </label>
                                                            <label className="text-sm font-light text-gray-500">
                                                                {[
                                                                    'Percent',
                                                                    'First Probe',
                                                                    'Task Analysis',
                                                                ].includes(
                                                                    criteriaData?.dataType
                                                                )
                                                                    ? item?.accuracy ||
                                                                      ''
                                                                    : `${item?.durationMinutes || 0} minutes ${item?.durationSeconds || 0} seconds`}
                                                            </label>
                                                        </div>
                                                    )}
                                                    <div className="flex space-x-2">
                                                        <label className="text-sm text-[#394148]">
                                                            {item?.autoProgress
                                                                ?.name
                                                                ? 'Auto Progress:'
                                                                : ''}
                                                        </label>
                                                        <label className="text-sm font-light text-gray-500">
                                                            {item?.autoProgress
                                                                ?.name
                                                                ? `${item.autoProgress.name} - ${item.autoProgress.name === 'Intervention' ? '' : item.autoProgress.indexCount}`
                                                                : ''}
                                                        </label>
                                                    </div>
                                                    {item?.autoRegress && (
                                                        <div className="flex space-x-2">
                                                            <label className="text-sm text-[#394148]">
                                                                Auto Regress:
                                                            </label>
                                                            <label className="text-sm font-light text-gray-500">
                                                                {item
                                                                    .autoRegress
                                                                    .name ===
                                                                'Intervention'
                                                                    ? item
                                                                          .autoRegress
                                                                          .name ||
                                                                      ''
                                                                    : `${item.autoRegress.name || ''} - ${item.autoRegress.indexCount || ''}`}
                                                            </label>
                                                        </div>
                                                    )}
                                                    <div className="flex space-x-2">
                                                        <label className="text-sm text-[#394148]">
                                                            {item
                                                                ?.autoProgressPhase
                                                                ?.name ===
                                                            'Remove from session'
                                                                ? 'Remove from session:'
                                                                : item?.autoProgressPhase
                                                                  ? 'Mark as goal mastered:'
                                                                  : ''}
                                                        </label>
                                                        <label className="text-sm font-light text-gray-500">
                                                            {item
                                                                ?.autoProgressPhase
                                                                ?.name ===
                                                            'Remove from session'
                                                                ? 'Yes'
                                                                : item?.autoProgressPhase
                                                                  ? 'Yes'
                                                                  : ''}
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    {/* second add */}
                    {(criteriaData?.dataType === 'Percent'
                        ? criteriaData?.cardCount >= 1
                        : criteriaData?.dataType === 'General'
                          ? criteriaData?.cardCountGeneral >= 1
                          : criteriaData?.dataType === 'Frequency'
                            ? criteriaData?.cardCountFreq >= 1
                            : criteriaData?.dataType === 'Duration'
                              ? criteriaData?.cardCountDuration >= 1
                              : criteriaData?.dataType === 'Score'
                                ? criteriaData?.cardCountScore >= 1
                                : criteriaData?.dataType === 'Latency'
                                  ? criteriaData?.cardCountLat >= 1
                                  : criteriaData?.dataType === 'Rating Scale'
                                    ? criteriaData?.cardCountRating >= 1
                                    : criteriaData?.dataType === 'First Probe'
                                      ? criteriaData?.cardCountFirst >= 1
                                      : criteriaData?.dataType === 'Rate'
                                        ? criteriaData?.cardCountRate >= 1
                                        : criteriaData?.dataType ===
                                            'Task Analysis'
                                          ? criteriaData?.cardCountTask >= 1
                                          : criteriaData?.cardCountTime >= 1) &&
                        blankCardData?.map((item: any, index: any) => {
                            return (
                                <div
                                    key={index}
                                    className="hover:-translate-y-1 hover:transition hover:duration-500 hover:border-3 mb-3 hover:border-[#35ADB5] bg-white border shadow-lg rounded-xl"
                                >
                                    <div className="p-2 md:px-4 md:py-3">
                                        <div className="flex justify-between">
                                            <label className="text-[#35ADB5] text-xl font-semibold">
                                                {`#${item?.id}`}
                                            </label>
                                            {item?.id > 1 && (
                                                <Tooltip title="Delete">
                                                    <div
                                                        className={`${
                                                            targetDataByIdClicked?.isEditable ===
                                                            false
                                                                ? 'cursor-not-allowed  '
                                                                : ''
                                                        }relative inline-block`}
                                                    >
                                                        <img
                                                            src={deleteIcon}
                                                            alt="delete"
                                                            className={`${
                                                                targetDataByIdClicked?.isEditable ===
                                                                false
                                                                    ? 'cursor-not-allowed  pointer-events-none'
                                                                    : ''
                                                            }`}
                                                            onClick={() => {
                                                                setEvent({
                                                                    name:
                                                                        index +
                                                                        1,
                                                                    item: item,
                                                                });
                                                                handleDeletion(
                                                                    index + 1,
                                                                    item
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </Tooltip>
                                            )}
                                        </div>
                                        <div className=" flex flex-col text-center md:pt-4 md:pb-10">
                                            <label className="text-lg font-medium text-gray-800">
                                                {item?.label}
                                            </label>
                                            <Link
                                                to={`${criteriaData?.isFromModal || isFromGeneralCriteria ? '' : '/master-criteria-template/Maintenance'}`}
                                                onClick={() => {
                                                    addMaintenanceCriteria(
                                                        item?.id
                                                    );
                                                }}
                                            >
                                                <label className="mt-1 text-theme-lightBlue1 font-medium hover:underline cursor-pointer">
                                                    {item?.value}
                                                </label>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            {openConfirmationModalForDelete && (
                <ConfirmationModal
                    header={'Delete Maintenance'}
                    name={''}
                    title={`Are you sure you want to delete this maintenance ${event?.name} ?`}
                    open={openConfirmationModalForDelete}
                    onClose={() => setOpenConfirmationModalForDelete(false)}
                    handleStop={deleteMaintenance}
                />
            )}
            {showNotification && (
                <Notifications
                    open={true}
                    title={`Maintenance ${event?.name} deleted successfully`}
                    success={true}
                    onClose={closeNotification}
                />
            )}
        </>
    );
}
