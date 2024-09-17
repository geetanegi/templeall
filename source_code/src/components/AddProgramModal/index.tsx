/* eslint-disable max-lines */
/* eslint-disable max-len */
import * as React from 'react';
import Modal, {
    CreateProgramModalActions,
    ModalBody,
    ModalHeader,
} from '../Generics/Modal';
import AddProgram from './AddProgram';
import SelectGuidelineTemplate from './SelectGuidelineTemplate';
import TemplateData from './TemplateData';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getProgramsByDomainIdCall } from '../../redux/slice/GetProgramsByDomainId/getProgramsByDomainId';
import {
    savingDomainIndex,
    savingProgramBookTree,
} from '../../redux/slice/GetDomainById/getDomainById';
import { useParams } from 'react-router-dom';
import createProgramAPI from '../../api/services/createProgram.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import editProgramAPI from '../../api/services/editProgram.service';
import {
    clearingData,
    getById,
} from '../../redux/slice/template/templateSlice';
import {
    clearValue,
    savingProgramData,
} from '../../redux/slice/RenameProgram/renameProgram';
import SelectMasteryCriteriaTemplate from './SelectMasteryCriteriaTemplate';
import MasterCriteriaLandingPageComponents from '../MasterCriteriaLandingPageComponents';
import CriteriaForm from '../MasterCriteriaForm/TemplateForm/CriteriaForm';
import {
    returnInitialStateCard,
    setCardCountDuration,
    setCardCountFrequency,
    setCardCount,
    setIsModalClick,
    setIsProgram,
    setMasteryCriteriaName,
    setCardCountScore,
    setCardCountRating,
    setCardCountLat,
    setDataType,
    setCardCountFirst,
    setCardCountRate,
    setCardCountTime,
    setCardCountTask,
    clearName,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import {
    clearCreateProgram,
    getMasteryCriteriaName,
    savingProgramTemplateId,
    setMasteryCriteria,
} from '../../redux/slice/CreateProgram/createProgram';
import {
    editMasteryDataProgram,
    getMasteryCriteriaTemplateCall,
    savingGetMasteryCriteriaTemplateData,
} from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import { setIsFromTarget } from '../../redux/slice/getTarget/getTargetByProgramId';
import { clearTemplateData } from '../../redux/slice/GetTemplate/getTemplate';
import {
    descriptionValidation,
    nameValidation,
} from '../../constants/ValidationMessages';
interface Values {
    programName: string;
    programGoal: string;
    domainSelect: string;
    programType: string;
    addGoalToChild: boolean;
    isCommentsAllowed: boolean;
    addCommentsToChild: boolean;
    isAutoProgressAllowed: boolean;
    addAutoProgressToChild: boolean;
    addToGuideline: boolean;
    addToMasteryCriteria: boolean;
    timeSamplingSeconds: number;
    timeSamplingMinutes: number;
    timeSamplingIntervals: number;
    addTimeSamplingToChild: boolean;
    addToAllSteps: boolean;
}
interface Target {
    id: number;
    name: string;
}
export default function AddProgramModal({
    open,
    onClose,
}: {
    open?: boolean;
    onClose?: any;
}): React.JSX.Element {
    const getMasterCriteriaTemplate = useSelector(
        ({ getMasteryCriteriaTemplate }: any) =>
            getMasteryCriteriaTemplate?.value?.data
    );
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const openFolder = useSelector(
        ({ getDomainById }: any) => getDomainById?.programBookTree
    );
    const [isDuplicate, setIsDuplicate] = React.useState(false);
    const [isChecked, setIsChecked] = React.useState(false);
    const [stepData, setStepData] = React.useState<any>([]);
    const [targets, setTargets] = React.useState<Target[]>([]);
    const params = useParams();
    const [onSubmitDisable, setSubmitDisable] = React.useState(true);
    const [showError, setShowError] = React.useState(false);
    const [addProgramValues, setAddProgramValues] = React.useState<any>({
        programName: '',
        domainSelect: null,
        programType: null,
        timeSamplingSeconds: 0,
        timeSamplingMinutes: 0,
        timeSamplingIntervals: 0,
        addTimeSamplingToChild: 'false',
        taskAnalysisType: null,
    });
    const [guidelineValues, setGuidelineValues] = React.useState<any>({});
    const [savingData, setSavingData] = React.useState<any>({
        Baseline: {},
        Intervention: {},
        Maintenance: {},
    });
    const [editInitialValues, setEditInitialValues] = React.useState<any>({
        programName: '',
        programGoal: '',
        domainSelect: '',
        programType: '',
        addGoalToChild: false,
        isCommentsAllowed: false,
        addCommentsToChild: false,
        isAutoProgressAllowed: false,
        addAutoProgressToChild: false,
        id: '',
        sdInstructionsAllowed: false,
        addSdInstructionsToChild: false,
        sdInstructions: '',
        timeSamplingSeconds: '',
        timeSamplingMinutes: '',
        timeSamplingIntervals: '',
        addTimeSamplingToChild: false,
        taskAnalysisType: '',
    });
    const dispatch = useDispatch<any>();
    const domainNames = useSelector(
        ({ getDomainById }: any) => getDomainById?.value?.[params.id!]?.data
    );
    const templateId = useSelector(
        ({ template }: any) => template?.fullData?.template?.id
    );
    const editData = useSelector(
        ({ getTemplate }: any) => getTemplate?.templateData
    );
    const targetData = useSelector(({ getTarget }: any) => getTarget);
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const isProgramModal = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria?.isFromModal
    );
    const template = useSelector((state: any) => state.template.value);
    const formRef: any = React.useRef<HTMLDivElement>(null);
    const isMasteryEnable = useSelector(
        ({ createProgram }: any) => createProgram?.isMasteryAvailable
    );
    const folderDataVal = useSelector(
        ({ saveProgramBookLibraryDomainFolderData }: any) =>
            saveProgramBookLibraryDomainFolderData?.value?.data
    );
    const masteryId = useSelector(
        ({ createProgram }: any) => createProgram?.templateId
    );
    const tab = useSelector(
        ({ getDomainById }: any) => getDomainById?.currentTab
    );
    const defaultDomainNameForFolder = folderDataVal?.find(
        (item: any) => item.id == params.domainId
    );
    const defaultDomainName = domainNames?.find(
        (item: any) => item.id == params.domainId
    );
    const initialValues: any = {
        programName: '',
        programGoal: '',
        domainSelect:
            defaultDomainName?.id || defaultDomainNameForFolder?.id || '',
        programType: '',
        sdInstructions: '',
        addGoalToChild: false,
        isCommentsAllowed: true,
        addCommentsToChild: true,
        isAutoProgressAllowed: true,
        addAutoProgressToChild: false,
        addToGuideline: false,
        sdInstructionsAllowed: false,
        addSdInstructionsToChild: false,
        addTimeSamplingToChild: false,
        timeSamplingSeconds: 0,
        timeSamplingMinutes: 0,
        timeSamplingIntervals: 0,
        addToAllSteps: false,
        targetName: '',
    };
    React.useEffect(() => {
        setEditInitialValues({
            programName: editProgramData?.programData?.name || '',
            programGoal: editProgramData?.programData?.programGoal || '',
            domainSelect: editProgramData?.programData?.domainId || '',
            programType: editProgramData?.programData?.programType || '',
            addGoalToChild:
                editProgramData?.programData?.addGoalToChild || false,
            isCommentsAllowed:
                editProgramData?.programData?.commentsAllowed || false,
            addCommentsToChild:
                editProgramData?.programData?.addCommentsToChild || false,
            isAutoProgressAllowed:
                editProgramData?.programData?.autoProgressAllowed || false,
            addAutoProgressToChild:
                editProgramData?.programData?.addAutoProgressToChild || false,
            id: editProgramData?.programData?.id || '',
            sdInstructionsAllowed:
                editProgramData?.programData?.sdInstructionsAllowed || false,
            addSdInstructionsToChild:
                editProgramData?.programData?.addSdInstructionsToChild || false,
            sdInstructions: editProgramData?.programData?.sdInstructions || '',
            timeSamplingSeconds:
                editProgramData?.programData?.timeSamplingSeconds || '',
            timeSamplingMinutes:
                editProgramData?.programData?.timeSamplingMinutes || '',
            timeSamplingIntervals:
                editProgramData?.programData?.timeSamplingIntervals || '',
            addTimeSamplingToChild:
                editProgramData?.programData?.addTimeSamplingToChild || false,
            taskAnalysisType:
                editProgramData?.programData?.taskAnalysisType || '',
        });
    }, [editProgramData]);
    const validationSchemaData = Yup.object().shape(
        template?.reduce((schema: any, formObject: any) => {
            if (
                formObject &&
                formObject.validations &&
                formObject.validations.required
            ) {
                schema[formObject.name] = Yup.string().required('Required');
            }
            // Add additional validation for formObject.type
            if (formObject && formObject.name) {
                switch (formObject.name) {
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
    const validationSchema = Yup.object().shape({
        programName: Yup.string()
            .max(150, nameValidation)
            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                'Invalid characters in program name.'
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
        programGoal: Yup.string()
            .max(400, descriptionValidation)
            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                'Invalid characters in program goal.'
            ),
        targetName: Yup.string()
            .max(150, nameValidation)
            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                'Invalid characters in description.'
            ),
    });
    const disableSaveButton = (): any => {
        addProgramValues?.programName &&
        (addProgramValues?.domainSelect ||
            editProgramData?.programData?.domainId) &&
        addProgramValues?.programType &&
        templateId &&
        (addProgramValues?.programType === 'Task Analysis'
            ? addProgramValues?.taskAnalysisType
            : addProgramValues?.programType) &&
        (addProgramValues?.programType === 'Time Sampling'
            ? (addProgramValues?.timeSamplingSeconds != 0 ||
                  addProgramValues?.timeSamplingMinutes != 0) &&
              addProgramValues?.timeSamplingIntervals != 0
            : addProgramValues?.programType) &&
        getMasterCriteriaTemplate?.length
            ? setSubmitDisable(false)
            : setSubmitDisable(true);
    };
    const handleSubmitForm = async (values: Values): Promise<any> => {
        setAddProgramValues(values);
        disableSaveButton();
    };
    React.useEffect(() => {
        disableSaveButton();
    }, [templateId, addProgramValues]);
    React.useEffect(() => {
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
        disableSaveButton();
    }, [getMasterCriteriaTemplate]);
    React.useEffect(() => {
        if (
            editProgramData?.programData?.templateForMasteryCriteria?.id &&
            editProgramData?.onRename &&
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
                isProgram: editProgramData?.onRename ? true : false,
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
    const folderData = useSelector(
        ({ saveProgramBookLibraryDomainFolderData }: any) =>
            saveProgramBookLibraryDomainFolderData?.value?.data
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const createProgram = async (
        programValues: any,
        templateData: any
    ): Promise<any> => {
        const domainLibrary = folderData?.find(
            (item: any) => item?.id == programValues?.domainSelect
        );
        const selectedDomainId = domainNames?.find(
            (item: any) => item?.id == programValues?.domainSelect
        );
        const filterValues = Object.values(savingData).slice(0, 2);
        const findMaintenance = savingData['Maintenance'];
        const data = {
            name: programValues?.programName,
            programGoal: programValues?.programGoal,
            addGoalToChild: programValues?.addGoalToChild,
            programType: programValues?.programType,
            isCommentsAllowed: programValues?.isCommentsAllowed,
            addCommentsToChild: programValues?.addCommentsToChild,
            isAutoProgressAllowed: programValues?.isAutoProgressAllowed,
            addAutoProgressToChild: programValues?.addAutoProgressToChild,
            instructionTemplateId: templateId,
            addInstructionTemplateToChild:
                templateData?.addToGuideline || programValues?.addToGuideline,
            instructionTemplateData: JSON?.stringify(templateData),
            createdBy: userPermission?.value?.data?.userId || 1,
            modifiedBy: userPermission?.value?.data?.userId || 1,
            startDate: '',
            domainId:
                selectedDomainId?.id || domainLibrary?.id || params?.domainId,
            programBookUUID: params?.id,
            addMasteryTemplateToChild: isMasteryEnable || false,
            masteryCriteriaTemplateData: findMaintenance
                ? [...filterValues, ...findMaintenance]
                : [],
            templateForMasteryCriteria: masteryId || '',
            addNew: masteryId ? false : true,
            sdInstructionsAllowed: programValues?.sdInstructionsAllowed,
            addSdInstructionsToChild: programValues?.addSdInstructionsToChild,
            sdInstructions: programValues?.sdInstructions,
            timeSamplingSeconds: programValues?.timeSamplingSeconds,
            timeSamplingMinutes: programValues?.timeSamplingMinutes,
            timeSamplingIntervals: programValues?.timeSamplingIntervals,
            addTimeSamplingToChild: programValues?.addTimeSamplingToChild,
            addToAllSteps: false,
            stepData: stepData.map((item: any) => ({
                ...item,
                stepPrompts: JSON.stringify(item.stepPrompts),
            })),
            taskAnalysisType: programValues?.taskAnalysisType,
            targetData: targets,
        };
        const payload = {
            domainId:
                selectedDomainId?.id || domainLibrary?.id || params?.domainId,
        };
        const res = await createProgramAPI.createProgram(data);
        if (!res?.data?.error && res?.data?.data?.id) {
            setGuidelineValues({});
            dispatch(clearingData());
            dispatch(savingProgramTemplateId(''));
            dispatch(setMasteryCriteriaName(''));
            dispatch(setMasteryCriteria(false));
            dispatch(setIsProgram(false));
            return {
                domainPayload: payload,
                res,
            };
        } else {
            return res;
        }
    };
    const editProgram = async (
        programValues: any,
        templateData: any
    ): Promise<any> => {
        const selectedDomainId = domainNames?.find(
            (item: any) => item?.id === editProgramData?.programData?.domainId
        );
        const selectedDomainIdProgram = domainNames?.find(
            (item: any) => item?.name === programValues?.domainSelect
        );
        const filterValues = Object.values(savingData).slice(0, 2);
        const findMaintenance = savingData['Maintenance'];
        const data = {
            id: editProgramData?.programData?.id,
            name:
                programValues?.programName &&
                Object.keys(programValues?.programName).length > 0
                    ? programValues?.programName
                    : editProgramData?.programData?.name,
            programGoal:
                programValues?.programGoal ||
                editProgramData?.programData?.programGoal,
            addGoalToChild:
                programValues?.addGoalToChild ||
                editProgramData?.programData?.addGoalToChild,
            programType:
                programValues?.programType ||
                editProgramData?.programData?.programType,
            isCommentsAllowed:
                programValues?.isCommentsAllowed ||
                editProgramData?.programData?.commentsAllowed,
            addCommentsToChild:
                programValues?.addCommentsToChild ||
                editProgramData?.programData?.addCommentsToChild,
            isAutoProgressAllowed:
                programValues?.isAutoProgressAllowed ||
                editProgramData?.programData?.autoProgressAllowed,
            addAutoProgressToChild:
                programValues?.addAutoProgressToChild ||
                editProgramData?.programData?.addAutoProgressToChild,
            instructionTemplateId:
                templateId || editProgramData?.programData?.templateId?.id,
            instructionTemplateData: JSON?.stringify(templateData),
            addInstructionTemplateToChild:
                templateData?.addToGuideline || programValues?.addToGuideline,
            addMasteryTemplateToChild: isMasteryEnable || false,
            masteryCriteriaTemplateData:
                findMaintenance?.length || filterValues?.length
                    ? [...filterValues, ...findMaintenance]
                    : [],
            createdBy: userPermission?.value?.data?.userId || 1,
            modifiedBy: userPermission?.value?.data?.userId || 1,
            startDate: '',
            domainId:
                selectedDomainId?.id ||
                selectedDomainIdProgram?.id ||
                params?.domainId,
            addNew: masteryId ? false : true,
            templateForMasteryCriteria: masteryId
                ? masteryId
                : editProgramData?.programData?.templateForMasteryCriteria?.id
                  ? editProgramData?.programData?.templateForMasteryCriteria?.id
                  : '',
            programBookUUID: editProgramData?.programData?.id,
            sdInstructionsAllowed:
                programValues?.sdInstructionsAllowed ||
                editProgramData?.programData?.sdInstructionsAllowed,
            addSdInstructionsToChild: programValues?.addSdInstructionsToChild,
            sdInstructions:
                programValues?.sdInstructions ||
                editProgramData?.programData?.sdInstructions,
            timeSamplingSeconds:
                programValues?.timeSamplingSeconds ||
                editProgramData?.programData?.timeSamplingSeconds,
            timeSamplingMinutes:
                programValues?.timeSamplingMinutes ||
                editProgramData?.programData?.timeSamplingMinutes,
            timeSamplingIntervals:
                programValues?.timeSamplingIntervals ||
                editProgramData?.programData?.timeSamplingIntervals,
            addTimeSamplingToChild: programValues?.addTimeSamplingToChild,
            taskAnalysisType: programValues?.taskAnalysisType,
        };
        const payload = {
            domainId: selectedDomainId?.id,
        };
        const res = await editProgramAPI.editProgram(data);
        if (!res?.data?.error && res?.data?.data?.id) {
            setGuidelineValues({});
            dispatch(clearingData());
            dispatch(savingProgramTemplateId(''));
            dispatch(setMasteryCriteriaName(''));
            dispatch(setMasteryCriteria(false));
            return {
                domainPayload: payload,
                res,
            };
        } else {
            return res;
        }
    };
    const handleCancel = (): any => {
        onClose();
        dispatch(savingGetMasteryCriteriaTemplateData([]));
    };
    const name = template?.map((item: { name: any }) => item?.name);

    const validateRequiredFields = (): boolean => {
        let allRequiredFieldsFilled = true;

        template.forEach((item: any) => {
            const fieldName = `${item.name}-${item.index}`;
            const fieldValue = guidelineValues[fieldName];
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

    const setInitialValues = (): { [key: string]: string } => {
        if (
            editProgramData?.programData?.templateId?.id &&
            editProgramData?.onRename &&
            editProgramData?.programData?.addInstructionTemplateToChild
        ) {
            const values = editProgramData?.programData?.instructionTemplateData
                ? JSON.parse(
                      editProgramData?.programData?.instructionTemplateData
                  )
                : '';
            return values;
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
        return {
            ...value,
            ...savingData,
            addToMasteryCriteria: editProgramData?.programData
                ?.addMasteryTemplateToChild
                ? true
                : isChecked,
        };
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
    const handleSubmitSave = async (): Promise<any> => {
        const response = editProgramData?.onRename
            ? await editProgram(addProgramValues, guidelineValues)
            : await createProgram(addProgramValues, guidelineValues);
        const dataDomain: any = {
            domainId: response?.domainPayload?.domainId,
            phase: tab,
            isTargetPinned: pinnedData?.addQuickLook,
            quickLookId: pinnedData?.clickedQuickLook,
        };
        setTimeout(() => {
            dispatch(getProgramsByDomainIdCall(dataDomain));
        }, 1000);
        if (editProgramData?.onRename) {
            dispatch(savingProgramData(response?.res?.data?.data));
        }
        if (response?.res?.data?.data?.id) {
            onClose();
            const title = editProgramData?.onRename
                ? 'Program details edited successfully'
                : 'Program created successfully';
            dispatch(
                openNotification({
                    success: true,
                    title: title,
                    description: '',
                })
            );
            dispatch(savingGetMasteryCriteriaTemplateData([]));
        }
        if (response?.data?.error) {
            setIsDuplicate(true);
        }
        dispatch(
            savingDomainIndex({
                domainIndex: response?.res?.data?.data?.domainId?.id,
                programIndex: response?.res?.data?.data?.id,
            })
        );
        if (
            openFolder[response?.res?.data?.data?.domainId] === false ||
            openFolder[response?.res?.data?.data?.domainId] === undefined
        ) {
            dispatch(
                savingProgramBookTree(response?.res?.data?.data?.domainId)
            );
        }
        if (
            openFolder[response?.res?.data?.data?.id] === false ||
            openFolder[response?.res?.data?.data?.id] === undefined
        ) {
            dispatch(savingProgramBookTree(response?.res?.data?.data?.id));
        }
    };
    const [activeTab, setActiveTab] = React.useState(1);
    const handleTabClick = (tabNumber: number): void => {
        setActiveTab(tabNumber);
    };
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
        dispatch(setIsFromTarget(false));
        const data3 = {
            templateId: editProgramData?.programData?.templateId?.id,
            organizationId: '1',
            type: 'GUIDELINE_TEMPLATE',
        };
        if (editProgramData?.onRename) {
            if (editProgramData?.programData?.addInstructionTemplateToChild) {
                dispatch(getById(data3));
            }

            dispatch(setIsModalClick(true));
            dispatch(setIsProgram(true));
            dispatch(setDataType(editProgramData?.programData?.programType));
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
            dispatch(
                getMasteryCriteriaName({
                    dataType:
                        criteriaData?.dataType ||
                        editProgramData?.programData?.programType,
                    publishStatus: 'Published',
                })
            );
        }
        if (!editProgramData?.onRename) {
            dispatch(clearValue());
            dispatch(setDataType(''));
            dispatch(clearTemplateData());
            dispatch(clearCreateProgram());
            dispatch(clearName());
        }
    }, []);
    React.useEffect(() => {
        if (
            editProgramData?.onRename &&
            !editProgramData?.programData?.addMasteryTemplateToChild
        ) {
            dispatch(clearCreateProgram());
        }
    }, [editProgramData?.programData?.addMasteryTemplateToChild]);
    return (
        <Modal open={open} id={'add-program-modal'} expandModal={true}>
            <ModalHeader
                title={
                    editProgramData?.onRename
                        ? 'Edit Program'
                        : 'Create Program'
                }
                icon={false}
                onExpand={undefined}
            />
            <ModalBody expandModal={false}>
                <div className="px-8 w-full min-w-[67rem]">
                    <Formik
                        initialValues={
                            editProgramData?.onRename
                                ? editInitialValues
                                : initialValues
                        }
                        onSubmit={handleSubmitForm}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        validateOnChange={true}
                    >
                        <AddProgram
                            isDuplicateKey={isDuplicate}
                            setIsDuplicate={setIsDuplicate}
                            stepData={stepData}
                            setStepData={setStepData}
                            formRef={formRef}
                            targets={targets}
                            setTargets={setTargets}
                            setShowError={setShowError}
                        />
                    </Formik>
                    <div>
                        <div className="flex space-x-4 border-b-2 border-gray-300">
                            <button
                                className={`px-4 py-2 ${activeTab === 1 ? ' border-b-4 rounded-sm border-theme-lightBlue1' : 'text-gray-600'}`}
                                onClick={() => handleTabClick(1)}
                                data-testid="tab-click-mastery"
                            >
                                Guideline Template
                                <span className="text-red-500 ml-1">*</span>
                            </button>
                            <button
                                className={`px-4 py-2 ${activeTab === 2 ? ' border-b-4 rounded-sm border-theme-lightBlue1' : 'text-gray-600'}`}
                                onClick={() => handleTabClick(2)}
                                data-testid="tab-click-guideline"
                            >
                                Mastery Criteria Template
                                <span className="text-red-500 ml-1">*</span>
                            </button>
                        </div>
                        {activeTab === 1 && (
                            <div>
                                <Formik
                                    initialValues={setInitialValues()}
                                    validationSchema={validationSchemaData}
                                    onSubmit={handleGuidelineTemplateSubmit}
                                    validateOnChange
                                    enableReinitialize={true}
                                >
                                    {(props: any) => {
                                        const { handleSubmit } = props;
                                        return (
                                            <>
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        handleSubmit();
                                                    }}
                                                >
                                                    <SelectGuidelineTemplate
                                                        disableSave={
                                                            disableSaveButton
                                                        }
                                                    />
                                                    <div
                                                        className="relative mt-5 pl-2"
                                                        data-testId="template-data"
                                                    >
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
                                {/* mastery criteria */}
                                <Formik
                                    initialValues={setMasteryCriteriaTemplate()}
                                    onSubmit={() => {}}
                                    enableReinitialize={true}
                                >
                                    {() => {
                                        return (
                                            <>
                                                <SelectMasteryCriteriaTemplate
                                                    disableSave={
                                                        disableSaveButton
                                                    }
                                                    setIsChecked={setIsChecked}
                                                />
                                                {/* mastery criteria */}
                                                <div className="relative mt-5 pl-2">
                                                    {isProgramModal ? (
                                                        <MasterCriteriaLandingPageComponents />
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
                        <CreateProgramModalActions
                            expandModal={false}
                            onClose={handleCancel}
                            handleSubmit={handleSubmitSave}
                            onSubmitDisable={
                                !validateRequiredFields() ||
                                onSubmitDisable ||
                                showError
                            }
                        />
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
