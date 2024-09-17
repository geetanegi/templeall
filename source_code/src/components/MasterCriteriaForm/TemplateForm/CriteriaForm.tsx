/* eslint-disable max-lines */
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import PromptModal from '../PromptModal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Accuracy from '../Accuracy';
import {
    getAutoProgressOrRegressByPhase_Progress,
    getAutoProgressOrRegressByPhase_Regress,
    getTimeFrameCall,
    savingTemplateData,
    setCardCount,
    setCardCountDuration,
    setIsModalClick,
    setCardCountFrequency,
    setCardCountScore,
    setCardCountLat,
    setCardCountRating,
    setCardCountFirst,
    setCardCountRate,
    setCardCountTime,
    setCardCountTask,
    setStatusNotification,
    setCardCountGeneral,
} from '../../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import { useDispatch, useSelector } from 'react-redux';
import PromptsInput from './PromptsInput';
import ShowBadges from './ShowBadges';
import {
    radioTypesBaseline,
    radioTypesOperation,
    timePeriod,
    ratings,
} from '../../../constants/MasterCriteriaTemplate';
import TemplateHeader from './TemplateHeader';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import saveMasteryCriteriaTemplateAPI from '../../../api/services/MasterCriteriaTemplate/saveMasteryCriteriaTemplate.service';
import Input from '../../Generics/Inputs/Input';
import SelectComponent from '../../Generics/Inputs/Select';
import getMasteryCriteriaTemplateAPI from '../../../api/services/MasterCriteriaTemplate/getMasteryCriteriaTemplate.service';
import { savingGetMasteryCriteriaTemplateDataById } from '../../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
interface Values {
    timePeriod: any;
    timeFrame: any;
    operationType: any;
    accuracyTerm: any;
    progressTo: any;
    elseOption: any;
    autoRegress: any;
    frequency: any;
    score: any;
    ratingScale: any;
    timeSamplingInterval: any;
}
function CriteriaForm({
    setSavingData,
    isGeneralModalOpen,
    setIsFromGeneralCriteria,
}: {
    setSavingData?: any;
    isGeneralModalOpen?: any;
    setIsFromGeneralCriteria?: any;
}): React.JSX.Element {
    const navigate = useNavigate();
    const getMasterCriteriaTemplate = useSelector(
        ({ getMasteryCriteriaTemplate }: any) =>
            getMasteryCriteriaTemplate?.formData
    );
    const targetData = useSelector(({ getTarget }: any) => getTarget);
    const getMasteryCriteriaTemplateData = useSelector(
        ({ getMasteryCriteriaTemplateById }: any) =>
            getMasteryCriteriaTemplateById?.value?.data
    );
    const [options, setOptions] = useState({
        time: [],
        autoProgressData: [],
        autoRegressData: [],
    });
    const formikRef = useRef<any>(null);
    const [badges, setBadges] = useState<any>([]);
    const [openPromptsModal, setOpenPromptsModal] = useState(false);
    const params = useParams();
    const dispatch = useDispatch<any>();
    const time = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria.timeFrame
    );
    const dataType = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria?.dataType
    );
    const autoProgressData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria.autoProgress
    );
    const autoRegressData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria.autoRegress
    );
    const initialData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria.value
    );
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const cardCount = useSelector(
        ({ getMasteryCriteriaTemplate }: any) =>
            getMasteryCriteriaTemplate.cardIndex
    );
    const editData = useSelector(
        ({ getTemplate }: any) => getTemplate?.templateData
    );
    const templateId = useSelector(
        ({ createProgram }: any) => createProgram?.templateId
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const accuracyValue =
        criteriaData?.dataType === 'Task Analysis' &&
        (params?.phase === 'Baseline' ||
            criteriaData?.phaseValue === 'Baseline')
            ? 100
            : 80;
    const route = `${
        !criteriaData?.isFromModal && !params?.phase?.length
            ? ''
            : '/mastery-criteria-template'
    }`;
    const autoProgressValue =
        params?.phase === 'Baseline' || criteriaData?.phaseValue === 'Baseline'
            ? 'Intervention'
            : 'Maintenance - 1';
    const autoProgressBaselineValue =
        params?.phase === 'Baseline' || criteriaData?.phaseValue === 'Baseline'
            ? 'Maintenance - 1'
            : '';
    const dataTypeCheck =
        dataType === 'Percent' ||
        dataType === 'First Probe' ||
        dataType === 'Time Sampling' ||
        dataType === 'Task Analysis';
    const checkForBaselineIntervention =
        params?.phase === 'Baseline' ||
        criteriaData?.phaseValue === 'Baseline' ||
        params?.phase === 'Intervention' ||
        criteriaData?.phaseValue === 'Intervention';
    const checkForBaseline =
        params?.phase === 'Baseline' || criteriaData?.phaseValue === 'Baseline';
    const checkForIntervention =
        params?.phase === 'Intervention' ||
        criteriaData?.phaseValue === 'Intervention';
    const checkForMaintenance =
        params?.phase === 'Maintenance' ||
        criteriaData?.phaseValue === 'Maintenance';
    const updateOptions = (data: any, key: any): void => {
        if (data && data.data) {
            const optionsData = data.data.map((dataItem: any) => ({
                value:
                    dataItem?.name === 'Maintenance'
                        ? `${dataItem?.id}`
                        : dataItem?.id,
                label:
                    dataItem?.name === 'Maintenance'
                        ? `${dataItem?.name} - ${dataItem?.indexCount}`
                        : dataItem?.name,
            }));
            setOptions((prev) => ({
                ...prev,
                [key]: optionsData,
            }));
        }
    };
    useEffect(() => {
        updateOptions(autoProgressData, 'autoProgressData');
    }, [autoProgressData]);
    useEffect(() => {
        updateOptions(time, 'time');
    }, [time]);
    useEffect(() => {
        updateOptions(autoRegressData, 'autoRegressData');
    }, [autoRegressData]);
    useEffect(() => {
        if (getMasteryCriteriaTemplateData?.id) {
            setBadges(JSON.parse(getMasteryCriteriaTemplateData?.prompts));
        }
    }, [getMasteryCriteriaTemplateData]);
    const handleOpenModal = (): void => {
        setOpenPromptsModal(true);
    };
    const handleBadgeClick = (
        badge: string,
        selectedBadges: any,
        setSelectedBadges: any
    ): void => {
        const isBadgeSelected = selectedBadges.includes(badge);
        if (isBadgeSelected) {
            setSelectedBadges((prevSelected: any) =>
                prevSelected.filter(
                    (selectedBadge: any) => selectedBadge !== badge
                )
            );
        } else {
            setSelectedBadges((prevSelected: any) => [...prevSelected, badge]);
        }
    };
    const getTimeFrame = (): any => {
        const foundItem = time?.data?.find(
            (item: any) =>
                item.name === getMasterCriteriaTemplate?.timeFrame?.name
        );
        if (foundItem) {
            const result = {
                value: foundItem.id,
                label: foundItem.name,
            };
            return result;
        } else {
            return '';
        }
    };
    const getApi = async (): Promise<any> => {
        const data1 = {
            templateId:
                criteriaData?.value?.id ||
                editData?.id ||
                templateId ||
                editProgramData?.programData?.templateForMasteryCriteria?.id ||
                targetData?.clickedTarget?.data?.templateForMasteryCriteria?.id,
            dataType:
                criteriaData?.dataType ||
                targetData?.clickedTarget?.data?.targetType ||
                editProgramData?.programData?.programType,
            isProgram: criteriaData?.isProgram ? true : false,
            temporaryId: criteriaData?.templateData?.temporaryId || '',
            addNew:
                criteriaData?.value?.id || editData?.id || templateId?.length
                    ? false
                    : true,
            isTarget: targetData?.isFromTarget ? true : false,
            programId: targetData?.isFromTarget
                ? editProgramData?.programData?.id ||
                  targetData?.clickedTarget?.data?.programId ||
                  ''
                : params?.programId || '',
            targetId: targetData?.clickedTarget?.data?.id,
        };
        if (
            criteriaData?.templateData?.temporaryId ||
            criteriaData?.value?.id ||
            editData?.id ||
            templateId
        ) {
            const res =
                await getMasteryCriteriaTemplateAPI.getMasteryCriteriaTemplate(
                    data1
                );
            if (!res?.data?.error) {
                setTimeout(() => {
                    navigate('/mastery-criteria-template');
                }, 2000);
            } else {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Criteria data not updated ',
                        description: '',
                    })
                );
            }
        }
    };
    const handleShowNotification = async (): Promise<any> => {
        if (getMasterCriteriaTemplate?.id && dataType !== 'General') {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Criteria updated successfully',
                    description: '',
                })
            );
        } else if (dataType !== 'General') {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Criteria created successfully',
                    description: '',
                })
            );
        } else {
            dispatch(setStatusNotification());
        }
    };
    const handleOpenModals = async (): Promise<any> => {
        if (
            criteriaData?.phaseValue?.length &&
            !isGeneralModalOpen &&
            !params?.phase?.length
        ) {
            dispatch(setIsModalClick(true));
        } else if (isGeneralModalOpen && dataType === 'General') {
            setIsFromGeneralCriteria(true);
        } else {
            getApi();
        }
    };
    const handleSetCounts = async (dataTypes: string): Promise<any> => {
        switch (dataTypes) {
            case 'Percent':
                dispatch(setCardCount(2));
                break;
            case 'Frequency':
                dispatch(setCardCountFrequency(2));
                break;
            case 'Duration':
                dispatch(setCardCountDuration(2));
                break;
            case 'Score':
                dispatch(setCardCountScore(2));
                break;
            case 'Latency':
                dispatch(setCardCountLat(2));
                break;
            case 'Rating Scale':
                dispatch(setCardCountRating(2));
                break;
            case 'First Probe':
                dispatch(setCardCountFirst(2));
                break;
            case 'Rate':
                dispatch(setCardCountRate(2));
                break;
            case 'Time Sampling':
                dispatch(setCardCountTime(2));
                break;
            case 'Task Analysis':
                dispatch(setCardCountTask(2));
                break;
            case 'General':
                dispatch(setCardCount(2));
                dispatch(setCardCountDuration(2));
                dispatch(setCardCountFrequency(2));
                dispatch(setCardCountScore(2));
                dispatch(setCardCountLat(2));
                dispatch(setCardCountRating(2));
                dispatch(setCardCountFirst(2));
                dispatch(setCardCountRate(2));
                dispatch(setCardCountTime(2));
                dispatch(setCardCountTask(2));
                dispatch(setCardCountGeneral(2));
                break;
            default:
                console.warn(`Unhandled dataType: ${dataTypes}`);
                break;
        }
    };
    const getTemplateId = (): string | undefined => {
        return (
            initialData?.id ||
            editData?.id ||
            templateId ||
            targetData?.clickedTarget?.data?.templateForMasteryCriteria?.id
        );
    };
    const getAccuracyValue = (
        accuracyTerm: number | undefined
    ): number | undefined => {
        if (accuracyTerm !== undefined) {
            return accuracyTerm;
        }
        if (
            criteriaData?.dataType === 'Task Analysis' &&
            (params?.phase === 'Baseline' ||
                criteriaData?.phaseValue === 'Baseline')
        ) {
            return 100;
        }
        return 80;
    };
    const getIndexCount = (): any => {
        return params?.phase === 'Maintenance' ||
            criteriaData?.phaseValue === 'Maintenance'
            ? cardCount
            : '';
    };
    const getProgramId = (): string | undefined => {
        return criteriaData?.isProgram || targetData?.isFromTarget
            ? params?.programId || editProgramData?.programData?.id
            : '';
    };
    const shouldAddNew = (): boolean => {
        return initialData?.id || editData?.id || templateId ? false : true;
    };
    const onSuccessResponse = (res: any): string | undefined => {
        handleShowNotification();
        handleOpenModals();
        if (!getMasterCriteriaTemplate?.id && checkForMaintenance) {
            handleSetCounts(dataType);
        }
        return res?.data;
    };
    const isProgram = (): any => !!criteriaData?.isProgram;
    const isTarget = (): any => !!targetData?.isFromTarget;
    const maintenanceCase = (): any => {
        if (checkForMaintenance) {
            dispatch(
                getAutoProgressOrRegressByPhase_Regress({
                    templateId: initialData?.id || editData?.id || templateId,
                    dataType: dataType,
                    phase: params?.phase || criteriaData?.phaseValue,
                    timeFrame: getMasterCriteriaTemplate?.timeFrame?.name,
                    id:
                        getMasterCriteriaTemplate?.id ||
                        getMasteryCriteriaTemplateData?.id,
                    indexCount: getIndexCount(),
                    autoProgress: false,
                    temporaryId: criteriaData?.templateData?.temporaryId,
                    isProgram: isProgram(),
                    addNew: shouldAddNew(),
                    isTarget: isTarget(),
                    programId: getProgramId(),
                })
            );
        }
    };
    const saveFormApi = async (values: any): Promise<any> => {
        const data = {
            templateId: getTemplateId(),
            createdBy: userPermission?.value?.data?.userId || '1',
            modifiedBy: userPermission?.value?.data?.userId || '1',
            phase: params?.phase || criteriaData?.phaseValue || '',
            timeFrame: values?.timeFrame?.value,
            dataType: dataType,
            timePeriod: values?.timePeriod?.label,
            operationType: values?.operationType,
            accuracy: getAccuracyValue(values?.accuracyTerm),
            timeSamplingInterval: values?.timeSamplingInterval,
            autoProgressId: values?.progressTo?.value,
            autoRegressId: values?.autoRegress?.value,
            autoProgressPhase: values?.elseOption,
            prompts: JSON.stringify(badges),
            durationMinutes: values?.durationMinutes || '00',
            durationSeconds: values?.durationSeconds || '00',
            latencyMinutes: values?.latencyMinutes || '00',
            latencySeconds: values?.latencySeconds || '00',
            rateHour: values?.rateHour || '00',
            rateMinutes: values?.rateMinutes || '00',
            rateSeconds: values?.rateSeconds || '00',
            frequency: values?.frequency || '',
            score: values?.score,
            ratingScale: values?.ratingScale?.label,
            requireTwoProviders: values?.requireProviders,
            masteryCriteriaTemplateId:
                getMasteryCriteriaTemplateData?.masteryCriteriaTemplateId ||
                getMasteryCriteriaTemplateData?.id ||
                '',
            indexCount: getIndexCount(),
            isProgram: isProgram(),
            addNew: shouldAddNew(),
            temporaryId: criteriaData?.templateData?.temporaryId,
            isTarget: isTarget(),
            targetId: targetData?.clickedTarget?.data?.id,
            programId: getProgramId(),
        };
        const res =
            await saveMasteryCriteriaTemplateAPI.saveMasterCriteriaTemplate(
                data
            );
        dispatch(savingTemplateData(res?.data?.data));
        if (!res?.data?.error) {
            onSuccessResponse(res);
            dispatch(savingGetMasteryCriteriaTemplateDataById([]));
        } else {
            return 'error';
        }
    };
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        if (setSavingData) {
            setSavingData((prev: any) => {
                if (criteriaData?.phaseValue === 'Maintenance') {
                    return {
                        ...prev,
                        [criteriaData?.phaseValue]: [
                            ...prev[criteriaData?.phaseValue],
                            values,
                        ],
                    };
                } else {
                    return {
                        ...prev,
                        [criteriaData?.phaseValue]: {
                            ...values,
                            promptsName: badges,
                        },
                    };
                }
            });
        }
        setSubmitting(true);
        saveFormApi(values);
    };

    const handleCancel = (): any => {
        if (isGeneralModalOpen) {
            setIsFromGeneralCriteria(true);
        } else {
            !params?.phase?.length && dispatch(setIsModalClick(true));
        }
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
    };
    const titleData = (): string => {
        if (checkForBaseline) {
            return 'Baseline';
        } else if (checkForIntervention) {
            return 'Intervention';
        } else {
            return 'Maintenance';
        }
    };
    const handleDisabledFields = (): boolean => {
        return criteriaData?.dataType === 'Task Analysis' && checkForBaseline
            ? true
            : false;
    };

    const handleDisabled = (values: any): any => {
        if (criteriaData?.onViewCriteria) {
            return true;
        } else if (dataType === 'Percent') {
            if (
                params?.phase === 'Intervention' ||
                criteriaData?.phaseValue === 'Intervention'
            ) {
                return (
                    !values?.timeFrame?.value ||
                    !values?.timePeriod?.value ||
                    !values?.operationType ||
                    !badges?.length
                );
            } else {
                return (
                    !values?.timeFrame?.value ||
                    !values?.timePeriod?.value ||
                    !values?.operationType
                );
            }
        } else if (dataType === 'Frequency') {
            return (
                !values?.timeFrame?.value ||
                !values?.timePeriod?.value ||
                !values?.operationType ||
                !values?.frequency
            );
        } else if (dataType === 'Score') {
            if (
                params?.phase === 'Intervention' ||
                criteriaData?.phaseValue === 'Intervention'
            ) {
                return (
                    !values?.timeFrame?.value ||
                    !values?.timePeriod?.value ||
                    !values?.operationType ||
                    !badges?.length ||
                    !values?.score
                );
            } else {
                return (
                    !values?.timeFrame?.value ||
                    !values?.timePeriod?.value ||
                    !values?.operationType ||
                    !values?.score
                );
            }
        } else if (dataType === 'Duration') {
            const hasDuration =
                parseInt(values?.durationMinutes) > 0 ||
                parseInt(values?.durationSeconds) > 0;
            return (
                !values?.timeFrame?.value ||
                !values?.timePeriod?.value ||
                !values?.operationType ||
                !hasDuration
            );
        } else if (dataType === 'Latency') {
            const hasLatency =
                parseInt(values?.latencyMinutes) > 0 ||
                parseInt(values?.latencySeconds) > 0;
            return (
                !values?.timeFrame?.value ||
                !values?.timePeriod?.value ||
                !values?.operationType ||
                !hasLatency
            );
        } else if (dataType === 'Rating Scale') {
            return (
                !values?.timeFrame?.value ||
                !values?.timePeriod?.value ||
                !values?.operationType ||
                !values?.ratingScale
            );
        } else if (
            dataType === 'First Probe' ||
            dataType === 'Time Sampling' ||
            dataType === 'Task Analysis'
        ) {
            return (
                !values?.timeFrame?.value ||
                !values?.timePeriod?.value ||
                !values?.operationType
            );
        } else if (dataType === 'Rate') {
            const hasRate =
                parseInt(values?.rateHour) > 0 ||
                parseInt(values?.rateSeconds) > 0 ||
                parseInt(values?.rateSeconds) > 0;
            return (
                !values?.timeFrame?.value ||
                !values?.timePeriod?.value ||
                !values?.operationType ||
                !hasRate
            );
        } else if (dataType === 'General') {
            if (criteriaData?.phaseValue === 'Intervention') {
                return (
                    !values?.timeFrame?.value ||
                    !values?.timePeriod?.value ||
                    !values?.operationType ||
                    !badges?.length
                );
            } else {
                return (
                    !values?.timeFrame?.value ||
                    !values?.timePeriod?.value ||
                    !values?.operationType
                );
            }
        }
    };
    const getAutoProgressData = (): any => {
        const foundItem = getMasterCriteriaTemplate?.autoProgress;
        if (foundItem) {
            if (foundItem?.indexCount) {
                const result = {
                    value: foundItem?.id,
                    label: `${foundItem?.name} - ${foundItem?.indexCount}`,
                };
                return result;
            } else {
                const result = {
                    value: foundItem?.id,
                    label: `${foundItem?.name}`,
                };
                return result;
            }
        } else {
            return '';
        }
    };
    const getAutoRegressData = (): any => {
        const foundItem = getMasterCriteriaTemplate?.autoRegress;
        if (foundItem) {
            if (foundItem?.indexCount) {
                const result = {
                    value: foundItem?.id,
                    label: `${foundItem?.name} - ${foundItem?.indexCount}`,
                };
                return result;
            } else {
                const result = {
                    value: foundItem?.id,
                    label: `${foundItem?.name}`,
                };
                return result;
            }
        } else {
            return '';
        }
    };
    const getFrequency = (): any => {
        return getMasterCriteriaTemplate?.frequency
            ? getMasterCriteriaTemplate?.frequency
            : '';
    };
    const getScore = (): any => {
        return getMasterCriteriaTemplate?.score
            ? getMasterCriteriaTemplate?.score
            : '';
    };
    const getRatingScale = (): any => {
        return (
            ratings?.find(
                (item: any) =>
                    item.label ===
                    getMasterCriteriaTemplate?.ratingScale?.toString()
            ) || ''
        );
    };
    const getTimePeriod = (templateTimePeriod?: any): any => {
        return (
            timePeriod?.find(
                (item: any) => item.label === templateTimePeriod?.toString()
            ) || ''
        );
    };
    const getAllValues = (): any => {
        return {
            timePeriod: getTimePeriod(getMasterCriteriaTemplate?.timePeriod),
            timeFrame: getMasterCriteriaTemplate?.timeFrame
                ? getTimeFrame()
                : '',
            operationType: getMasterCriteriaTemplate?.operationType || '',
            accuracyTerm: getMasterCriteriaTemplate?.accuracy,
            timeSamplingInterval:
                getMasterCriteriaTemplate?.timeSamplingInterval || 80,
            progressTo: getMasterCriteriaTemplate?.autoProgress
                ? getAutoProgressData()
                : '',
            elseOption: getMasterCriteriaTemplate?.autoProgressPhase,
            autoRegress: getMasterCriteriaTemplate?.autoRegress
                ? getAutoRegressData()
                : '',
            durationMinutes: getMasterCriteriaTemplate?.durationMinutes || '00',
            durationSeconds: getMasterCriteriaTemplate?.durationSeconds || '00',
            latencyMinutes: getMasterCriteriaTemplate?.latencyMinutes || '00',
            latencySeconds: getMasterCriteriaTemplate?.latencySeconds || '00',
            rateHour: getMasterCriteriaTemplate?.rateHour || '00',
            rateSeconds: getMasterCriteriaTemplate?.rateSeconds || '00',
            rateMinutes: getMasterCriteriaTemplate?.rateMinutes || '00',
            requireProviders:
                getMasterCriteriaTemplate?.requireTwoProviders || false,
            frequency: getFrequency(),
            score: getScore(),
            ratingScale: getRatingScale(),
        };
    };
    const callAutoRegress = (value: any): any => {
        if (checkForMaintenance) {
            dispatch(
                getAutoProgressOrRegressByPhase_Regress({
                    templateId: getTemplateId(),
                    dataType: dataType,
                    phase: params?.phase || criteriaData?.phaseValue,
                    timeFrame: value?.value,
                    id:
                        getMasterCriteriaTemplate?.id ||
                        getMasteryCriteriaTemplateData?.id,
                    indexCount: getIndexCount(),
                    autoProgress: false,
                    isProgram: criteriaData?.isProgram ? true : false,
                    addNew: shouldAddNew(),
                    temporaryId: criteriaData?.templateData?.temporaryId,
                    isTarget: targetData?.isFromTarget ? true : false,
                    programId: getProgramId(),
                })
            );
        }
    };
    const callAutoProgress = (value: any): any => {
        dispatch(
            getAutoProgressOrRegressByPhase_Progress({
                templateId: initialData?.id || editData?.id || templateId,
                dataType: dataType,
                phase: params?.phase || criteriaData?.phaseValue,
                timeFrame: value?.value,
                id:
                    getMasterCriteriaTemplate?.id ||
                    getMasteryCriteriaTemplateData?.id,
                indexCount: getIndexCount(),
                autoProgress: true,
                temporaryId: criteriaData?.templateData?.temporaryId,
                isProgram: criteriaData?.isProgram ? true : false,
                addNew: shouldAddNew(),
                isTarget: targetData?.isFromTarget ? true : false,
                programId: getProgramId(),
            })
        );
    };
    useEffect(() => {
        dispatch(
            getTimeFrameCall({
                type: 'MASTERY_CRITERIA_TIMEFRAME',
                dataType: dataType,
                id: getMasteryCriteriaTemplateData?.id,
                temporaryId: criteriaData?.templateData?.temporaryId,
                isTarget: targetData?.isFromTarget ? true : false,
            })
        );
        // edit case
        if (getMasterCriteriaTemplate?.id || editData?.id) {
            dispatch(
                getAutoProgressOrRegressByPhase_Progress({
                    templateId: initialData?.id || editData?.id || templateId,
                    dataType: dataType,
                    phase: params?.phase || criteriaData?.phaseValue,
                    timeFrame: getMasterCriteriaTemplate?.timeFrame?.name,
                    id:
                        getMasterCriteriaTemplate?.id ||
                        getMasteryCriteriaTemplateData?.id,
                    indexCount: getIndexCount(),
                    autoProgress: true,
                    temporaryId: criteriaData?.templateData?.temporaryId,
                    isProgram: isProgram(),
                    addNew: shouldAddNew(),
                    isTarget: isTarget(),
                    programId: getProgramId(),
                })
            );
            maintenanceCase();
        }
    }, []);
    React.useEffect(() => {
        if (criteriaData?.dataType === 'Task Analysis' && checkForBaseline) {
            formikRef?.current?.setFieldValue('timePeriod', {
                value: 'option1',
                label: '1',
            });
            formikRef?.current?.setFieldValue('timeFrame', {
                value: 16,
                label: 'Session',
            });
            formikRef?.current?.setFieldValue('operationType', 'Equals to');
        }
    }, [criteriaData?.dataType]);
    return (
        <>
            <div className={`main w-full`} data-testid="criteria-form">
                <Formik
                    initialValues={getAllValues()}
                    onSubmit={handleSubmitForm}
                    enableReinitialize={true}
                    innerRef={formikRef}
                >
                    {(props: any) => {
                        const {
                            values,
                            handleSubmit,
                            setFieldValue,
                            touched,
                            errors,
                            setFieldTouched,
                        } = props;
                        return (
                            <form
                                className="px-5 py-1 space-y-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="selectedPromptsMain">
                                    <TemplateHeader title={titleData()} />
                                    {(dataType === 'Percent' ||
                                        dataType === 'Score' ||
                                        isGeneralModalOpen) && (
                                        <PromptsInput
                                            badges={badges}
                                            setBadges={setBadges}
                                            handleOpenModal={handleOpenModal}
                                            phase={
                                                params?.phase ||
                                                criteriaData?.phaseValue
                                            }
                                            criteriaData={criteriaData}
                                        />
                                    )}
                                    <div className="bg-[#F8F8F8] pr-1 pl-8 rounded-lg space-y-5 py-2">
                                        <div className="space-y-4">
                                            <div
                                                className={`${criteriaData?.onViewCriteria ? 'pointer-events-none' : ''} space-y-5`}
                                            >
                                                <div className="flex flex-col space-y-2">
                                                    <ShowBadges
                                                        badges={badges}
                                                        setBadges={setBadges}
                                                        handleBadgeClick={
                                                            handleBadgeClick
                                                        }
                                                    />
                                                </div>
                                                <div className="flex space-x-20 w-full items-start">
                                                    <div className="w-1/4 space-y-1">
                                                        <Field
                                                            autoComplete="off"
                                                            isRequired={false}
                                                            name="timePeriod"
                                                            value={
                                                                values?.timePeriod
                                                            }
                                                        >
                                                            {({
                                                                field,
                                                                form,
                                                            }: FieldProps) => (
                                                                <SelectComponent
                                                                    isSearchable={
                                                                        false
                                                                    }
                                                                    isRequired={
                                                                        true
                                                                    }
                                                                    label="Time Period"
                                                                    options={
                                                                        timePeriod
                                                                    }
                                                                    isDisabled={handleDisabledFields()}
                                                                    field={{
                                                                        value: field.value,
                                                                        name: field.name,
                                                                        onChange:
                                                                            (
                                                                                value
                                                                            ) => {
                                                                                form.setFieldValue(
                                                                                    field.name,
                                                                                    value
                                                                                );
                                                                                setTimeout(
                                                                                    () => {
                                                                                        form.setFieldError(
                                                                                            field.name,
                                                                                            ''
                                                                                        );
                                                                                    },
                                                                                    0
                                                                                );
                                                                            },
                                                                    }}
                                                                    form={{
                                                                        touched,
                                                                        errors,
                                                                    }}
                                                                    handleBlur={
                                                                        setFieldTouched
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </div>
                                                    <div className="w-1/4 space-y-1">
                                                        <Field
                                                            autoComplete="off"
                                                            isRequired={false}
                                                            name="timeFrame"
                                                            id={time?.data?.id}
                                                        >
                                                            {({
                                                                field,
                                                                form,
                                                            }: FieldProps) => (
                                                                <SelectComponent
                                                                    isDisabled={handleDisabledFields()}
                                                                    isSearchable={
                                                                        false
                                                                    }
                                                                    isRequired={
                                                                        true
                                                                    }
                                                                    label={
                                                                        'Time Frame for Consecutive'
                                                                    }
                                                                    options={
                                                                        options?.time
                                                                    }
                                                                    field={{
                                                                        value: field.value,
                                                                        name: field.name,
                                                                        onChange:
                                                                            (
                                                                                value
                                                                            ) => {
                                                                                form.setFieldValue(
                                                                                    field.name,
                                                                                    value
                                                                                );
                                                                                setTimeout(
                                                                                    () => {
                                                                                        form.setFieldError(
                                                                                            field.name,
                                                                                            ''
                                                                                        );
                                                                                    },
                                                                                    0
                                                                                );
                                                                                callAutoProgress(
                                                                                    value
                                                                                );
                                                                                callAutoRegress(
                                                                                    value
                                                                                );
                                                                            },
                                                                    }}
                                                                    form={{
                                                                        touched,
                                                                        errors,
                                                                    }}
                                                                    handleBlur={
                                                                        setFieldTouched
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium flex">
                                                            Operation Type
                                                            <span className="text-red-500 ml-1">
                                                                *
                                                            </span>
                                                        </label>
                                                        <div className="grid grid-cols-3 gap-y-3 w-[40rem]">
                                                            {radioTypesOperation?.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="flex space-x-2 items-center"
                                                                        >
                                                                            <Field
                                                                                type="radio"
                                                                                disabled={handleDisabledFields()}
                                                                                name="operationType"
                                                                                value={
                                                                                    item
                                                                                }
                                                                            />
                                                                            <label
                                                                                htmlFor="add"
                                                                                className="text-[#394148] text-sm font-sm"
                                                                            >
                                                                                {
                                                                                    item
                                                                                }
                                                                            </label>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                {dataTypeCheck &&
                                                    !isGeneralModalOpen && (
                                                        <div className="flex space-x-5 items-center">
                                                            <label
                                                                htmlFor="quantity-input"
                                                                className="text-sm font-medium flex"
                                                            >
                                                                {dataType ===
                                                                'Time Sampling'
                                                                    ? 'Percent of Intervals'
                                                                    : ' Accuracy Threshold'}
                                                            </label>
                                                            <Field
                                                                autoComplete="off"
                                                                isRequired={
                                                                    false
                                                                }
                                                                name={
                                                                    dataType ===
                                                                    'Time Sampling'
                                                                        ? 'timeSamplingInterval'
                                                                        : 'accuracyTerm'
                                                                }
                                                            >
                                                                {({
                                                                    field,
                                                                    form,
                                                                }: FieldProps) => (
                                                                    <Accuracy
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={
                                                                            form
                                                                        }
                                                                        value={
                                                                            accuracyValue
                                                                        }
                                                                        isDisabled={handleDisabledFields()}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </div>
                                                    )}
                                                {(dataType === 'Duration' ||
                                                    dataType === 'Latency') && (
                                                    <div className="flex space-x-5  items-center">
                                                        <div className="mr-4">
                                                            <label
                                                                htmlFor="quantity-input"
                                                                className="text-sm font-medium flex"
                                                            >
                                                                {dataType ===
                                                                'Duration'
                                                                    ? 'Duration Requirement'
                                                                    : 'Latency'}
                                                            </label>
                                                        </div>
                                                        <div className="flex space-x-5">
                                                            <div className="items-center flex space-x-2">
                                                                <Field
                                                                    autoComplete="off"
                                                                    isRequired={
                                                                        false
                                                                    }
                                                                    name={
                                                                        dataType ===
                                                                        'Duration'
                                                                            ? 'durationMinutes'
                                                                            : 'latencyMinutes'
                                                                    }
                                                                >
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }: FieldProps) => (
                                                                        <Accuracy
                                                                            field={
                                                                                field
                                                                            }
                                                                            form={
                                                                                form
                                                                            }
                                                                            value={
                                                                                0
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <label className="text-sm font-medium">
                                                                    Minutes
                                                                </label>
                                                            </div>
                                                            <div className="items-center flex space-x-2">
                                                                <Field
                                                                    autoComplete="off"
                                                                    isRequired={
                                                                        false
                                                                    }
                                                                    name={
                                                                        dataType ===
                                                                        'Duration'
                                                                            ? 'durationSeconds'
                                                                            : 'latencySeconds'
                                                                    }
                                                                >
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }: FieldProps) => (
                                                                        <Accuracy
                                                                            field={
                                                                                field
                                                                            }
                                                                            form={
                                                                                form
                                                                            }
                                                                            value={
                                                                                0
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <label className="text-sm font-medium">
                                                                    Seconds
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {(dataType === 'Frequency' ||
                                                    dataType === 'Rate') && (
                                                    <div className="flex space-y-2 items-center w-full">
                                                        <Field
                                                            type={'number'}
                                                            component={Input}
                                                            label={'Frequency'}
                                                            name={'frequency'}
                                                            id={'frequency'}
                                                            placeholder={
                                                                'Frequency'
                                                            }
                                                            value={
                                                                values?.frequency
                                                            }
                                                            isRequired={false}
                                                            className={`outline-none ps-3`}
                                                            onChange={(
                                                                e: any
                                                            ) => {
                                                                setFieldValue(
                                                                    'frequency',
                                                                    e?.target
                                                                        ?.value
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                {dataType === 'Rate' && (
                                                    <div className="flex space-x-5  items-center">
                                                        <div className="mr-4">
                                                            <label
                                                                htmlFor="quantity-input"
                                                                className="text-sm font-medium flex"
                                                            >
                                                                Time
                                                            </label>
                                                        </div>
                                                        <div className="flex space-x-5">
                                                            <div className="items-center flex space-x-2">
                                                                <Field
                                                                    autoComplete="off"
                                                                    isRequired={
                                                                        false
                                                                    }
                                                                    name={
                                                                        'rateHour'
                                                                    }
                                                                >
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }: FieldProps) => (
                                                                        <Accuracy
                                                                            field={
                                                                                field
                                                                            }
                                                                            form={
                                                                                form
                                                                            }
                                                                            value={
                                                                                0
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <label className="text-sm font-medium">
                                                                    Hour
                                                                </label>
                                                            </div>
                                                            <div className="items-center flex space-x-2">
                                                                <Field
                                                                    autoComplete="off"
                                                                    isRequired={
                                                                        false
                                                                    }
                                                                    name={
                                                                        'rateMinutes'
                                                                    }
                                                                >
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }: FieldProps) => (
                                                                        <Accuracy
                                                                            field={
                                                                                field
                                                                            }
                                                                            form={
                                                                                form
                                                                            }
                                                                            value={
                                                                                0
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <label className="text-sm font-medium">
                                                                    Minutes
                                                                </label>
                                                            </div>
                                                            <div className="items-center flex space-x-2">
                                                                <Field
                                                                    autoComplete="off"
                                                                    isRequired={
                                                                        false
                                                                    }
                                                                    name={
                                                                        'rateSeconds'
                                                                    }
                                                                >
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }: FieldProps) => (
                                                                        <Accuracy
                                                                            field={
                                                                                field
                                                                            }
                                                                            form={
                                                                                form
                                                                            }
                                                                            value={
                                                                                0
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <label className="text-sm font-medium">
                                                                    Seconds
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {dataType === 'Score' && (
                                                    <div className="flex space-y-2 items-center w-full">
                                                        <Field
                                                            type={'number'}
                                                            component={Input}
                                                            label={'Score'}
                                                            name={'score'}
                                                            id={'score'}
                                                            placeholder={
                                                                'Score'
                                                            }
                                                            value={
                                                                values?.score
                                                            }
                                                            isRequired={true}
                                                            className={`outline-none border-gray-400 border-b-1 bg-transparent border-t-0 rounded-none border-l-0 border-r-0 ps-1 `}
                                                            onChange={(
                                                                e: any
                                                            ) => {
                                                                setFieldValue(
                                                                    'score',
                                                                    e?.target
                                                                        ?.value
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                {dataType ===
                                                    'Rating Scale' && (
                                                    <div className="w-1/4 space-y-1">
                                                        <Field
                                                            autoComplete="off"
                                                            isRequired={false}
                                                            name="ratingScale"
                                                            value={
                                                                values?.ratingScale
                                                            }
                                                        >
                                                            {({
                                                                field,
                                                                form,
                                                            }: FieldProps) => (
                                                                <SelectComponent
                                                                    isSearchable={
                                                                        false
                                                                    }
                                                                    isRequired={
                                                                        false
                                                                    }
                                                                    label="Rating"
                                                                    options={
                                                                        ratings
                                                                    }
                                                                    field={{
                                                                        value: field.value,
                                                                        name: field.name,
                                                                        onChange:
                                                                            (
                                                                                value
                                                                            ) => {
                                                                                form.setFieldValue(
                                                                                    field.name,
                                                                                    value
                                                                                );
                                                                                setTimeout(
                                                                                    () => {
                                                                                        form.setFieldError(
                                                                                            field.name,
                                                                                            ''
                                                                                        );
                                                                                    },
                                                                                    0
                                                                                );
                                                                            },
                                                                    }}
                                                                    form={{
                                                                        touched,
                                                                        errors,
                                                                    }}
                                                                    handleBlur={
                                                                        setFieldTouched
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </div>
                                                )}
                                                <div className="input flex w-full items-center space-x-10 pb-1">
                                                    {checkForBaseline && (
                                                        <>
                                                            <div className="flex space-x-7 items-center">
                                                                {radioTypesBaseline?.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="flex space-x-2 items-center"
                                                                            >
                                                                                <Field
                                                                                    type="checkbox"
                                                                                    name="elseOption"
                                                                                    id="elseOption"
                                                                                >
                                                                                    {({
                                                                                        field,
                                                                                        form,
                                                                                    }: FieldProps) => (
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            id="elseOption"
                                                                                            name="elseOption"
                                                                                            checked={
                                                                                                field.value
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) => {
                                                                                                form.setFieldValue(
                                                                                                    'elseOption',
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked
                                                                                                );
                                                                                                form.setFieldValue(
                                                                                                    'progressTo',
                                                                                                    ''
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                </Field>
                                                                                <label
                                                                                    htmlFor="add"
                                                                                    className="text-[#394148] text-sm font-sm"
                                                                                >
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </label>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}
                                                                <div>
                                                                    <label className="text-[#979797] text-sm font-sm">
                                                                        or
                                                                    </label>
                                                                </div>
                                                                <div className="space-y-1 w-[20rem]">
                                                                    <label className="text-sm font-medium">
                                                                        {
                                                                            'Auto Progress To'
                                                                        }
                                                                    </label>
                                                                    <Field
                                                                        id="progressTo"
                                                                        name="progressTo"
                                                                        disabled="true"
                                                                        className="w-full bg-transparent ps-1 border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-0 ps-0 pb-1 outline-none  disabled:opacity-50 disabled:pointer-events-none"
                                                                        component={
                                                                            Input
                                                                        }
                                                                        value={
                                                                            autoProgressBaselineValue
                                                                        }
                                                                        autoComplete="off"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[#979797] text-sm font-sm">
                                                                        Else
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                    {checkForBaselineIntervention && (
                                                        <div className="">
                                                            <label className="text-sm font-medium">
                                                                {
                                                                    'Auto Progress To'
                                                                }
                                                            </label>
                                                            <Field
                                                                id="progressTo"
                                                                name="progressTo"
                                                                disabled="true"
                                                                className="w-full bg-transparent ps-1 border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-0 ps-0 pb-1 outline-none  disabled:opacity-50 disabled:pointer-events-none"
                                                                component={
                                                                    Input
                                                                }
                                                                value={
                                                                    autoProgressValue
                                                                }
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    )}
                                                    {checkForMaintenance && (
                                                        <>
                                                            <div className="space-y-1 w-1/4">
                                                                <Field
                                                                    autoComplete="off"
                                                                    isRequired={
                                                                        false
                                                                    }
                                                                    name="autoRegress"
                                                                >
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }: FieldProps) => (
                                                                        <SelectComponent
                                                                            isSearchable={
                                                                                false
                                                                            }
                                                                            isRequired={
                                                                                false
                                                                            }
                                                                            label={
                                                                                'Auto Regress To'
                                                                            }
                                                                            options={
                                                                                options?.autoRegressData
                                                                            }
                                                                            field={{
                                                                                value: field.value,
                                                                                name: field.name,
                                                                                onChange:
                                                                                    (
                                                                                        value
                                                                                    ) => {
                                                                                        form.setFieldValue(
                                                                                            field.name,
                                                                                            value
                                                                                        );
                                                                                        setTimeout(
                                                                                            () => {
                                                                                                form.setFieldError(
                                                                                                    field.name,
                                                                                                    ''
                                                                                                );
                                                                                            },
                                                                                            0
                                                                                        );
                                                                                    },
                                                                            }}
                                                                            form={{
                                                                                touched,
                                                                                errors,
                                                                            }}
                                                                            handleBlur={
                                                                                setFieldTouched
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </div>
                                                            <div>
                                                                <label className="text-[#979797] text-sm font-sm">
                                                                    Else
                                                                </label>
                                                            </div>
                                                            <div className="space-y-1 w-1/4">
                                                                <Field
                                                                    autoComplete="off"
                                                                    isRequired={
                                                                        false
                                                                    }
                                                                    name="progressTo"
                                                                >
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }: FieldProps) => (
                                                                        <SelectComponent
                                                                            isSearchable={
                                                                                false
                                                                            }
                                                                            isRequired={
                                                                                false
                                                                            }
                                                                            label={
                                                                                'Auto Progress To'
                                                                            }
                                                                            options={
                                                                                options?.autoProgressData
                                                                            }
                                                                            field={{
                                                                                value: field.value,
                                                                                name: field.name,
                                                                                onChange:
                                                                                    (
                                                                                        value
                                                                                    ) => {
                                                                                        form.setFieldValue(
                                                                                            field.name,
                                                                                            value
                                                                                        );
                                                                                        setTimeout(
                                                                                            () => {
                                                                                                form.setFieldError(
                                                                                                    field.name,
                                                                                                    ''
                                                                                                );
                                                                                            },
                                                                                            0
                                                                                        );
                                                                                        form.setFieldValue(
                                                                                            'elseOption',
                                                                                            ''
                                                                                        );
                                                                                    },
                                                                            }}
                                                                            form={{
                                                                                touched,
                                                                                errors,
                                                                            }}
                                                                            handleBlur={
                                                                                setFieldTouched
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </div>
                                                            <div className="flex space-x-5">
                                                                <div>
                                                                    <label className="text-[#979797] text-sm font-sm">
                                                                        {'or'}
                                                                    </label>
                                                                </div>
                                                                {radioTypesBaseline?.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="flex space-x-2 items-center"
                                                                            >
                                                                                <Field
                                                                                    type="checkbox"
                                                                                    name="elseOption"
                                                                                    id="elseOption"
                                                                                >
                                                                                    {({
                                                                                        field,
                                                                                        form,
                                                                                    }: FieldProps) => (
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            id="elseOption"
                                                                                            name="elseOption"
                                                                                            checked={
                                                                                                field.value
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) => {
                                                                                                form.setFieldValue(
                                                                                                    'elseOption',
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked
                                                                                                );
                                                                                                form.setFieldValue(
                                                                                                    'progressTo',
                                                                                                    ''
                                                                                                );
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                </Field>
                                                                                <label
                                                                                    htmlFor="add"
                                                                                    className="text-[#394148] text-sm font-sm"
                                                                                >
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </label>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex">
                                                    <label
                                                        htmlFor="quantity-input"
                                                        className="text-sm font-medium mr-3"
                                                    >
                                                        Require Two Providers
                                                    </label>
                                                    <Field
                                                        type="checkbox"
                                                        name="requireProviders"
                                                        id="requireProviders"
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: FieldProps) => (
                                                            <input
                                                                type="checkbox"
                                                                id="requireProviders"
                                                                name="requireProviders"
                                                                checked={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="flex justify-end items-center gap-x-2 pb-2">
                                                <Link to={route}>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            handleCancel();
                                                        }}
                                                        className="py-2 px-8 w-[110px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-transparent text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                                        data-hs-overlay="#hs-slide-down-animation-modal"
                                                    >
                                                        Cancel
                                                    </button>
                                                </Link>
                                                <button
                                                    type="submit"
                                                    onSubmit={handleSubmit}
                                                    disabled={handleDisabled(
                                                        values
                                                    )}
                                                    className="py-2 px-9 w-[110px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            </div>
            {openPromptsModal && (
                <PromptModal
                    open={openPromptsModal}
                    badges={badges}
                    setBadges={setBadges}
                    setOpenDomainModal={setOpenPromptsModal}
                    handleBadgeClick={handleBadgeClick}
                />
            )}
        </>
    );
}
export default CriteriaForm;
