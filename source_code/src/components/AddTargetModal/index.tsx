/* eslint-disable max-lines */
import * as React from 'react';
import Modal, {
    CreateClientModalActions,
    ModalBody,
    ModalHeader,
} from '../Generics/Modal';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../redux/slice/Notification/notifications';
import SelectGuidelineTemplate from '../AddProgramModal/SelectGuidelineTemplate';
import TemplateData from '../AddProgramModal/TemplateData';
import { saveTargetCall } from '../../redux/slice/saveTarget/saveTarget';
import {
    getById,
    savingTemplateId,
} from '../../redux/slice/template/templateSlice';
import checkDuplicateTarget from '../../api/services/checkDuplicateTarget.service';
import SelectMasteryCriteriaTemplate from '../AddProgramModal/SelectMasteryCriteriaTemplate';
import { getProgramsByDomainIdCall } from '../../redux/slice/GetProgramsByDomainId/getProgramsByDomainId';
import {
    savingDomainIndex,
    savingProgramBookTree,
} from '../../redux/slice/GetDomainById/getDomainById';
import MasterCriteriaLandingPageComponents from '../MasterCriteriaLandingPageComponents';
import CriteriaForm from '../MasterCriteriaForm/TemplateForm/CriteriaForm';
import { getMasteryCriteriaName } from '../../redux/slice/CreateProgram/createProgram';
import {
    editMasteryDataProgram,
    getMasteryCriteriaTemplateCall,
    savingGetMasteryCriteriaTemplateData,
} from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import {
    getProgramById,
    resetState,
    setIsTargetEdit,
} from '../../redux/slice/RenameProgram/renameProgram';
import {
    returnInitialStateCard,
    setCardCountDuration,
    setCardCountFrequency,
    setCardCount,
    savingTemplateData,
    setIsProgram,
    setCardCountScore,
    setCardCountLat,
    setCardCountRating,
    setCardCountFirst,
    setCardCountRate,
    setCardCountTime,
    setCardCountTask,
    setDataType,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import { savingGetMasteryCriteriaTemplateDataById } from '../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import { getTargetCall } from '../../redux/slice/getTarget/getTargetByProgramId';
import AddTarget from './AddTarget';
import {
    descriptionValidation,
    nameValidation,
} from '../../constants/ValidationMessages';
export default function AddTargetModal({
    open,
    onClose,
    isEdit,
}: {
    open?: any;
    onClose?: any;
    editProgramClick?: any;
    isEdit?: any;
}): React.JSX.Element {
    const [targetValues, setTargetValues] = React.useState<any>(null);
    const [programValues, setProgramValues] = React.useState<any>(null);
    const [onChangeTargetType, setonChangeTargetType] =
        React.useState<any>(false);
    const [isDuplicate, setIsDuplicate] = React.useState<any>(null);
    const [guidelineValues, setGuidelineValues] = React.useState({});
    const [onSubmitDisable, setSubmitDisable] = React.useState(true);
    const [onchangeCallId, setOnchangeCallId] = React.useState<any>(null);
    const [programId, setProgramId] = React.useState<any>('');
    const [stepData, setStepData] = React.useState<any>([]);
    const [savingData, setSavingData] = React.useState<any>({
        Baseline: {},
        Intervention: {},
        Maintenance: [],
    });
    const [initialValues, setInitialValues2] = React.useState<any>({
        domainName: '',
        programName: '',
        targetName: '',
        targetGoal: '',
        initiatedDate: '',
        targetType: '',
        minimumTrails: '',
        maximumTrails: '',
        targetLocation: 'Target List',
        addCommentsToChild: false,
        addAutoProgressToChild: false,
        sdInstructions: '',
        sdInstructionsAllowed: false,
        timeSamplingSeconds: '',
        timeSamplingMinutes: '',
        timeSamplingIntervals: '',
        taskAnalysisType: '',
    });
    const dispatch = useDispatch<any>();
    const openFolder = useSelector(
        ({ getDomainById }: any) => getDomainById?.programBookTree
    );
    const tab = useSelector(
        ({ getDomainById }: any) => getDomainById?.currentTab
    );
    const programDataList = useSelector(
        ({ getProgramsByDomainId }: any) => getProgramsByDomainId?.value
    );
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const getMasterCriteriaTemplate = useSelector(
        ({ getMasteryCriteriaTemplate }: any) =>
            getMasteryCriteriaTemplate?.value?.data
    );
    const folderData = useSelector(
        ({ saveProgramBookLibraryDomainFolderData }: any) =>
            saveProgramBookLibraryDomainFolderData?.value?.data
    );
    const templateId = useSelector(
        ({ template }: any) => template?.fullData?.template?.id
    );
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );

    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const targetData = useSelector(({ getTarget }: any) => getTarget);
    const templateData = useSelector(({ template }: any) => template?.fullData);
    const formRef: any = React.useRef<HTMLDivElement>(null);
    const formikRef: any = React.useRef<any>(null);
    const params = useParams();
    React.useEffect(() => {
        setOnchangeCallId(params.domainId);
        setProgramId(params?.programId || editProgramData?.programData?.id);
    }, []);
    const domainNames = useSelector(
        ({ getDomainById }: any) => getDomainById?.value?.[params.id!]?.data
    );
    const defaultDomainName = domainNames?.find(
        (item: any) => item.id == onchangeCallId
    );
    const defaultDomainNameLib = folderData?.find(
        (item: any) => item.id == onchangeCallId
    );
    const editData = useSelector(
        ({ getTemplate }: any) => getTemplate?.templateData
    );
    const setFormData = (): void => {
        if (programDataList?.[targetValues?.domainName]) {
            const selectedProgram = editProgramData?.programData;
            dispatch(
                setDataType(
                    criteriaData?.dataType ||
                        editProgramData?.programData?.programType ||
                        targetData?.clickedTarget?.data?.targetType
                )
            );
            setProgramValues(selectedProgram);
            if (formikRef.current) {
                formikRef.current.setFieldValue(
                    'targetGoal',
                    targetData?.clickedTarget?.data?.targetGoal
                        ? targetData?.clickedTarget?.data?.targetGoal
                        : editProgramData?.programData?.programGoal
                );
                formikRef.current.setFieldValue(
                    'addAutoProgressToChild',
                    targetData?.clickedTarget?.data?.autoProgressAllowed
                        ? targetData?.clickedTarget?.data?.autoProgressAllowed
                        : (editProgramData?.programData?.autoProgressAllowed ??
                              false)
                );
                formikRef.current.setFieldValue(
                    'addCommentsToChild',
                    targetData?.clickedTarget?.data?.commentsAllowed
                        ? targetData?.clickedTarget?.data?.commentsAllowed
                        : (editProgramData?.programData?.commentsAllowed ??
                              false)
                );
                formikRef.current.setFieldValue(
                    'sdInstructions',
                    targetData?.clickedTarget?.data?.sdInstructions
                        ? targetData?.clickedTarget?.data?.sdInstructions
                        : editProgramData?.programData?.sdInstructions
                );
                formikRef.current.setFieldValue(
                    'sdInstructionsAllowed',
                    targetData?.clickedTarget?.data?.sdInstructionsAllowed
                        ? targetData?.clickedTarget?.data?.sdInstructionsAllowed
                        : editProgramData?.programData?.addSdInstructionsToChild
                          ? editProgramData?.programData
                                ?.addSdInstructionsToChild
                          : false
                );
                formikRef.current.setFieldValue(
                    'targetType',
                    targetData?.clickedTarget?.data?.targetType
                        ? targetData?.clickedTarget?.data?.targetType
                        : editProgramData?.programData?.programType
                );
                formikRef.current.setFieldValue(
                    'timeSamplingSeconds',
                    targetData?.clickedTarget?.data?.timeSamplingSeconds
                        ? targetData?.clickedTarget?.data?.timeSamplingSeconds
                        : editProgramData?.programData?.timeSamplingSeconds
                );
                formikRef.current.setFieldValue(
                    'timeSamplingMinutes',
                    targetData?.clickedTarget?.data?.timeSamplingMinutes
                        ? targetData?.clickedTarget?.data?.timeSamplingMinutes
                        : editProgramData?.programData?.timeSamplingMinutes
                );
                formikRef.current.setFieldValue(
                    'timeSamplingIntervals',
                    targetData?.clickedTarget?.data?.timeSamplingIntervals
                        ? targetData?.clickedTarget?.data?.timeSamplingIntervals
                        : editProgramData?.programData?.timeSamplingIntervals
                );
                formikRef.current.setFieldValue(
                    'targetLocation',
                    targetData?.clickedTarget?.data?.targetLocation ||
                        'Target List'
                );
            }
            if (
                selectedProgram?.programType?.length ||
                targetData?.clickedTarget?.data?.targetType?.length
            ) {
                dispatch(
                    getMasteryCriteriaName({
                        dataType:
                            selectedProgram?.programType ||
                            targetData?.clickedTarget?.data?.targetType,
                        publishStatus: 'Published',
                    })
                );
                dispatch(
                    setDataType(
                        targetData?.clickedTarget?.data?.targetType
                            ? targetData?.clickedTarget?.data?.targetType
                            : editProgramData?.programData?.programType
                    )
                );
            }
        }
    };
    const template = useSelector((state: any) => state.template.value);
    React.useEffect(() => {
        setInitialValues2({
            domainName:
                defaultDomainName?.id ||
                defaultDomainNameLib?.id ||
                editProgramData?.programData?.domainId ||
                targetData?.clickedTarget?.data?.domainId ||
                '',
            programName: programId,
            targetName: targetData?.clickedTarget?.data?.name || '',
            targetGoal: targetData?.clickedTarget?.data?.targetGoal
                ? targetData?.clickedTarget?.data?.targetGoal
                : editProgramData?.programData?.programGoal || '',
            initiatedDate: '',
            targetType: targetData?.clickedTarget?.data?.targetType
                ? targetData?.clickedTarget?.data?.targetType
                : editProgramData?.programData?.programType || '',
            minimumTrails: targetData?.clickedTarget?.data?.minTrials
                ? targetData?.clickedTarget?.data?.minTrials
                : '',
            maximumTrails: targetData?.clickedTarget?.data?.maxTrials
                ? targetData?.clickedTarget?.data?.maxTrials
                : '',
            targetLocation:
                targetData?.clickedTarget?.data?.targetLocation ||
                'Target List',
            addCommentsToChild: targetData?.clickedTarget?.data?.commentsAllowed
                ? targetData?.clickedTarget?.data?.commentsAllowed
                : editProgramData?.programData?.commentsAllowed
                  ? editProgramData?.programData?.commentsAllowed
                  : false,
            addAutoProgressToChild: targetData?.clickedTarget?.data
                ?.autoProgressAllowed
                ? targetData?.clickedTarget?.data?.autoProgressAllowed
                : editProgramData?.programData?.autoProgressAllowed
                  ? editProgramData?.programData?.autoProgressAllowed
                  : false,
            sdInstructions:
                targetData?.clickedTarget?.data?.sdInstructions ||
                editProgramData?.programData?.sdInstructions ||
                '',
            sdInstructionsAllowed: targetData?.clickedTarget?.data
                ?.sdInstructionsAllowed
                ? targetData?.clickedTarget?.data?.sdInstructionsAllowed
                : editProgramData?.programData?.addSdInstructionsToChild
                  ? editProgramData?.programData?.addSdInstructionsToChild
                  : false,
            timeSamplingSeconds:
                targetData?.clickedTarget?.data?.timeSamplingSeconds ||
                editProgramData?.programData?.timeSamplingSeconds ||
                '',
            timeSamplingMinutes:
                targetData?.clickedTarget?.data?.timeSamplingMinutes ||
                editProgramData?.programData?.timeSamplingMinutes ||
                '',
            timeSamplingIntervals:
                targetData?.clickedTarget?.data?.timeSamplingIntervals ||
                editProgramData?.programData?.timeSamplingIntervals ||
                '',
            taskAnalysisType:
                targetData?.clickedTarget?.data?.taskAnalysisType ||
                editProgramData?.programData?.taskAnalysisType,
        });
        setFormData();
    }, [
        defaultDomainName,
        defaultDomainNameLib,
        editProgramData,
        targetData,
        programId,
    ]);
    const validationSchema = Yup.object().shape({
        targetName: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
            nameValidation
        ),
        targetGoal: Yup.string()
            .max(400, descriptionValidation)
            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                'Invalid characters in program goal.'
            ),
        sdInstructions: Yup.string()
            .max(
                100,
                'Input cannot exceed the maximum length of 100 characters.'
            )
            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                'Invalid characters in SD instructions.'
            ),
    });
    React.useEffect(() => {
        if (
            (editProgramData?.programData?.templateForMasteryCriteria?.id ||
                targetData?.clickedTarget?.data?.templateForMasteryCriteria
                    ?.id) &&
            editProgramData?.programData?.addMasteryTemplateToChild
        ) {
            const data = {
                templateId:
                    editProgramData?.programData?.templateForMasteryCriteria
                        ?.id ||
                    criteriaData?.value?.id ||
                    editData?.id ||
                    templateId ||
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
        }
    }, [
        editProgramData?.programData?.templateForMasteryCriteria?.id,
        editProgramData?.programData?.addMasteryTemplateToChild,
    ]);
    const handleSubmitForm = (values: FormikValues): void => {
        setTargetValues(values);
    };
    React.useEffect(() => {
        if (!onChangeTargetType) {
        }
    }, [params?.programId, editProgramData?.programData, handleSubmitForm]);
    const validateRequiredFields = (): boolean => {
        let allRequiredFieldsFilled = true;

        template.forEach((item: any) => {
            const fieldName = `${item.name}-${item.index}`;
            const fieldValue = targetValues[fieldName];
            if (item?.validations?.required) {
                // Handle different types of field values
                if (
                    fieldValue === undefined || // Check for undefined values
                    fieldValue === null || // Check for null values
                    (typeof fieldValue === 'string' &&
                        fieldValue.trim() === '') || // Check for empty strings
                    (Array.isArray(fieldValue) && fieldValue.length === 0) || // Check for empty arrays (dropdown/multiselect)
                    (typeof fieldValue === 'number' && isNaN(fieldValue)) // Check if number is NaN
                ) {
                    allRequiredFieldsFilled = false;
                }
            }
        });

        return allRequiredFieldsFilled;
    };
    const disableSaveButton = (): any => {
        targetValues?.domainName &&
        targetValues?.programName &&
        targetValues?.targetName &&
        (targetValues?.taskAnalysisType === 'Task Analysis'
            ? targetValues?.taskAnalysisType
            : true)
            ? setSubmitDisable(false)
            : setSubmitDisable(true);
    };
    React.useEffect(() => {
        if (getMasterCriteriaTemplate) {
            const baseline = getMasterCriteriaTemplate?.find(
                (item: any) => 'Baseline' === item.phase.name
            );
            const intervention = getMasterCriteriaTemplate?.find(
                (item: any) => 'Intervention' === item.phase.name
            );
            const maintenance = getMasterCriteriaTemplate?.filter(
                (item: any) => 'Maintenance' === item.phase.name
            );
            setSavingData({
                Baseline: baseline || {},
                Intervention: intervention || {},
                Maintenance: maintenance || {},
            });
        }
        disableSaveButton();
    }, [getMasterCriteriaTemplate]);
    React.useEffect(() => {
        if (params?.programId && !targetData?.clickedTarget?.data?.id) {
            const data = {
                id: params?.programId,
                isTarget: targetData?.isFromTarget ? true : false,
            };
            dispatch(getProgramById(data));
        }
    }, [params?.programId]);
    const saveTarget = async (): Promise<any> => {
        const filterValues = Object.values(savingData).slice(0, 2);
        const findMaintenance = savingData['Maintenance'];
        const data = {
            domainName: targetValues?.domainName,
            programName: targetValues?.programName,
            targetName: targetValues?.targetName,
            targetGoal: targetValues?.targetGoal,
            initiatedTime: targetValues?.initiatedDate?.startDate,
            minTrials: targetValues.minimumTrails,
            maxTrials: targetValues.maximumTrails,
            targetType: targetValues.targetType,
            targetLocation: targetValues.targetLocation,
            isCommentsAllowed: targetValues.addCommentsToChild,
            isAutoProgressAllowed: targetValues.addAutoProgressToChild,
            targetId:
                targetData?.SelectedTarget?.id ||
                targetData?.clickedTarget?.data?.id ||
                '',
            createdBy: programValues?.createdBy?.id || '1',
            modifiedBy: programValues?.modifiedBy?.id || '1',
            templateData: JSON.stringify(guidelineValues),
            domainId: programValues?.domainId?.id || targetValues?.domainName,
            programId: programValues?.id || targetValues?.programName,
            guidelineTemplateId: templateData?.instructionTemplate?.id,
            masteryCriteriaTemplateData: findMaintenance
                ? [...filterValues, ...findMaintenance]
                : [],
            isEdit,
            sdInstructions: targetValues?.sdInstructions,
            sdInstructionsAllowed: targetValues?.sdInstructionsAllowed,
            addTimeSamplingToChild: targetValues?.addTimeSamplingToChild,
            timeSamplingSeconds: targetValues?.timeSamplingSeconds,
            timeSamplingMinutes: targetValues?.timeSamplingMinutes,
            timeSamplingIntervals: targetValues?.timeSamplingIntervals,
            stepData: stepData.map((item: any) => ({
                ...item,
                stepPrompts: JSON.stringify(item.stepPrompts),
            })),
            taskAnalysisType:
                targetValues?.taskAnalysisType ||
                programValues?.taskAnalysisType,
        };
        setTimeout(() => {
            dispatch(
                getTargetCall({
                    programId: targetData?.clickedTarget?.data?.programId,
                    isTargetPinned: pinnedData?.addQuickLook,
                    quickLookId: pinnedData?.clickedQuickLook,
                })
            );
        }, 2000);
        dispatch(
            savingDomainIndex({
                programIndex: programValues?.id,
                domainIndex: programValues?.domainId?.id,
            })
        );
        if (
            openFolder[programValues?.id] === false ||
            openFolder[programValues?.id] === undefined
        ) {
            dispatch(savingProgramBookTree(programValues?.id));
        }
        if (
            openFolder[programValues?.domainId?.id] === false ||
            openFolder[programValues?.domainId?.id] === undefined
        ) {
            dispatch(savingProgramBookTree(programValues?.domainId?.id));
        }
        dispatch(resetState());
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(savingGetMasteryCriteriaTemplateDataById([]));
        dispatch(savingTemplateData([]));
        dispatch(saveTargetCall(data));
        dispatch(setIsTargetEdit(false));
        setTimeout(() => {
            dispatch(
                getTargetCall({
                    programId: programValues?.id || targetValues?.programName,
                    isTargetPinned: pinnedData?.addQuickLook,
                    quickLookId: pinnedData?.clickedQuickLook,
                })
            );
        }, 4000);
    };
    const handleCancel = (): any => {
        onClose();
        dispatch(savingGetMasteryCriteriaTemplateData([]));
        dispatch(setIsTargetEdit(false));
    };
    React.useEffect(() => {
        if (editProgramData?.programData?.templateId?.id) {
            const data = {
                templateId:
                    editProgramData?.programData?.templateId?.id ||
                    targetData?.clickedTarget?.data?.guidelineTemplateId?.id,
                organizationId: programValues?.organizationId?.id,
                type: 'GUIDELINE_TEMPLATE',
            };
            dispatch(getById(data));
            if (
                editProgramData?.programData?.masteryCriteriaTemplates?.length
            ) {
                dispatch(
                    editMasteryDataProgram({
                        data: editProgramData?.programData
                            ?.masteryCriteriaTemplates,
                    })
                );
            }
        }
    }, [programValues, editProgramData]);
    React.useEffect(() => {
        dispatch(returnInitialStateCard());

        setTimeout(() => {
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
        }, 500);
        dispatch(setIsProgram(false));
        if (targetData?.clickedTarget?.data?.guidelineTemplateId?.id) {
            const data = {
                templateId:
                    targetData?.clickedTarget?.data?.guidelineTemplateId?.id,
                organizationId: '1',
                type: 'GUIDELINE_TEMPLATE',
            };
            dispatch(getById(data));
            dispatch(
                savingTemplateId(
                    targetData?.clickedTarget?.data?.guidelineTemplateId?.id
                )
            );
        }
        dispatch(
            getMasteryCriteriaName({
                dataType:
                    editProgramData?.programData?.programType ||
                    targetData?.clickedTarget?.data?.targetType,
                publishStatus: 'Published',
            })
        );
    }, []);

    const isProgramModal = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria?.isFromModal
    );
    const name = template?.map((item: { name: any }) => item?.name);
    const setInitialValues = (): { [key: string]: string } => {
        if (
            programValues?.templateId?.id &&
            programValues?.id &&
            !isEdit &&
            programValues?.templateId?.id === templateId
        ) {
            const values = programValues?.instructionTemplateData
                ? JSON.parse(programValues?.instructionTemplateData)
                : '{}';
            return { ...values, ...guidelineValues };
        } else if (
            targetData?.clickedTarget?.data?.guidelineTemplateId?.id ===
                templateId &&
            targetData?.clickedTarget?.data?.templateData
        ) {
            const values = JSON.parse(
                targetData?.clickedTarget?.data?.templateData
            );
            return { ...values, ...guidelineValues };
        } else {
            const value: { [key: string]: string } = {};
            name?.forEach((key: any, index: any) => {
                value[`${key}-${index}`] = '';
            });
            return { ...value, ...guidelineValues };
        }
    };
    const setMasteryCriteriaTemplate = (): { [key: string]: string } => {
        const value: { [key: string]: string } = {};
        name?.forEach((key: any) => {
            value[key] = '';
        });
        return { ...value, ...savingData };
    };
    const handleGuidelineTemplateSubmit = async (
        values: FormikValues
    ): Promise<any> => {
        const value = setInitialValues();
        const responseObj: any = {};
        Object.keys(value).forEach((keyName) => {
            if (values[keyName]) {
                responseObj[keyName] = values[keyName];
            } else {
                responseObj[keyName] = value[keyName];
            }
        });
        setGuidelineValues(responseObj);
    };
    const handleMasteryCriteriaSubmit = async (): Promise<any> => {};
    const handleSave = async (): Promise<any> => {
        const data = {
            targetName: targetValues?.targetName,
            programId: programValues?.id || targetValues?.programName,
            domainId:
                programValues?.domainId?.id ||
                params?.domainId ||
                targetData?.clickedTarget?.data?.domainId,
            targetId: targetData?.clickedTarget?.data?.id,
        };
        const res = await checkDuplicateTarget.checkDuplicateTarget(data);
        if (!res?.data?.error) {
            setIsDuplicate(!res?.data?.error);
            saveTarget();
            onClose();
            const data2 = {
                domainId: programValues?.domainId?.id || params?.domainId,
                phase: tab,
                isTargetPinned: pinnedData?.addQuickLook,
                quickLookId: pinnedData?.clickedQuickLook,
            };
            setTimeout(() => {
                dispatch(
                    savingDomainIndex({ targetIndex: targetValues?.targetName })
                );
                dispatch(getProgramsByDomainIdCall(data2));
            }, 2000);
            const title = isEdit
                ? 'Target details edited successfully'
                : 'Target created successfully';
            dispatch(
                openNotification({
                    success: true,
                    title: title,
                    description: isDuplicate?.description,
                })
            );
        } else {
            setIsDuplicate(res?.data?.error);
        }
    };
    const validationSchemaData = Yup.object().shape(
        template?.reduce((schema: any, formObject: any) => {
            if (
                formObject &&
                formObject.validations &&
                formObject.validations.required
            ) {
                schema[formObject.name] = Yup.string().required('Required');
            }
            if (formObject && formObject.type) {
                switch (formObject.type) {
                    case 'smallText':
                        schema[formObject.name] = Yup.string().matches(
                            /^[a-zA-Z\s]*$/,
                            `Only small letters (a-z) are allowed for ${formObject.label}`
                        );
                        break;
                    case 'number':
                        schema[formObject.name] = Yup.number().integer(
                            `Only numbers are allowed for ${formObject.label}`
                        );
                        break;
                    case 'decimal':
                        schema[formObject.name] = Yup.number().typeError(
                            `Only decimal numbers are allowed for ${formObject.label}`
                        );
                        break;
                    case 'calender':
                        schema[formObject.name] = Yup.date().typeError(
                            `Please provide a valid date for ${formObject.label}`
                        );
                        break;
                    default:
                        break;
                }
            }
            return schema;
        }, {})
    );
    const [activeTab, setActiveTab] = React.useState(1);
    const handleTabClick = (tabNumber: number): void => {
        setActiveTab(tabNumber);
    };
    React.useEffect(() => {
        disableSaveButton();
    }, [targetValues]);
    return (
        <Modal open={open} id={'add-target-modal'} expandModal={true}>
            <ModalHeader
                title={isEdit ? 'Edit Target' : 'Create Target'}
                icon={false}
                onExpand={undefined}
            />
            <ModalBody expandModal={false}>
                <div className="px-8 ">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validationSchema={validationSchema}
                        innerRef={formikRef}
                        enableReinitialize={true}
                    >
                        <AddTarget
                            formRef={formRef}
                            isDuplicateKey={isDuplicate}
                            isEdit={isEdit}
                            setonChangeTargetType={setonChangeTargetType}
                            stepData={stepData}
                            setStepData={setStepData}
                            setOnchangeCallId={setOnchangeCallId}
                            setProgramId={setProgramId}
                        />
                    </Formik>
                    <div>
                        <div className="flex space-x-4 border-b-2 border-gray-300">
                            <button
                                className={`px-4 py-2 ${activeTab === 1 ? ' border-b-4 rounded-sm border-theme-lightBlue1' : 'text-gray-600'}`}
                                onClick={() => handleTabClick(1)}
                                data-testid="tab-click-guideline"
                            >
                                Guideline Template
                            </button>
                            <button
                                className={`px-4 py-2 ${activeTab === 2 ? ' border-b-4 rounded-sm border-theme-lightBlue1' : 'text-gray-600'}`}
                                onClick={() => handleTabClick(2)}
                                data-testid="tab-click-mastery"
                            >
                                Mastery Criteria Template
                            </button>
                        </div>
                        {activeTab === 1 && (
                            <div>
                                <Formik
                                    initialValues={setInitialValues()}
                                    onSubmit={handleGuidelineTemplateSubmit}
                                    validationSchema={validationSchemaData}
                                    enableReinitialize={true}
                                >
                                    {(props: any) => {
                                        const { handleSubmit } = props;
                                        return (
                                            <>
                                                <form onSubmit={handleSubmit}>
                                                    <SelectGuidelineTemplate
                                                        disableSave={() => {}}
                                                    />
                                                    <div className="relative mt-5 pl-2">
                                                        {template?.map(
                                                            (
                                                                obj: any,
                                                                index: number
                                                            ) => (
                                                                <>
                                                                    <TemplateData
                                                                        preventSubmit={
                                                                            false
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        index={
                                                                            index
                                                                        }
                                                                        name={
                                                                            obj.name
                                                                        }
                                                                        label={
                                                                            obj?.label
                                                                        }
                                                                        instruction={
                                                                            obj?.instructions
                                                                        }
                                                                        isRequired={
                                                                            obj
                                                                                ?.validations
                                                                                ?.required ||
                                                                            false
                                                                        }
                                                                        htmlType={
                                                                            obj?.htmlType
                                                                        }
                                                                        options={
                                                                            obj?.options
                                                                        }
                                                                        type={
                                                                            obj.type
                                                                        }
                                                                        setGuidelineValues={
                                                                            setGuidelineValues
                                                                        }
                                                                    />
                                                                </>
                                                            )
                                                        )}
                                                    </div>
                                                </form>
                                            </>
                                        );
                                    }}
                                </Formik>
                            </div>
                        )}
                        {activeTab === 2 && (
                            <div>
                                <Formik
                                    initialValues={setMasteryCriteriaTemplate()}
                                    onSubmit={handleMasteryCriteriaSubmit}
                                    validateOnChange
                                    enableReinitialize={true}
                                >
                                    {() => {
                                        return (
                                            <>
                                                <SelectMasteryCriteriaTemplate
                                                    disableSave={
                                                        disableSaveButton
                                                    }
                                                />
                                                {/* mastery criteria */}
                                                <div className="relative mt-5 pl-2">
                                                    {isProgramModal ? (
                                                        <MasterCriteriaLandingPageComponents
                                                            editTarget={
                                                                targetData
                                                                    ?.clickedTarget
                                                                    ?.data
                                                            }
                                                        />
                                                    ) : (
                                                        <CriteriaForm
                                                            setSavingData={
                                                                setSavingData
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </>
                                        );
                                    }}
                                </Formik>
                            </div>
                        )}
                        <CreateClientModalActions
                            onClose={handleCancel}
                            handleSubmit={handleSave}
                            isDisabled={
                                !validateRequiredFields() || onSubmitDisable
                            }
                        />
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
