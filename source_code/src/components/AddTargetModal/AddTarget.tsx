/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { Field, FieldProps, useFormikContext } from 'formik';
import Input from '../Generics/Inputs/Input';
import { useSelector, useDispatch } from 'react-redux';
import { getProgramsByDomainIdCall } from '../../redux/slice/GetProgramsByDomainId/getProgramsByDomainId';
import {
    radioTypesTargetLocation,
    TaskAnalysisType,
} from '../../constants/AddTarget';
import Accuracy from '../MasterCriteriaForm/Accuracy';
import { useParams } from 'react-router-dom';
import {
    getMasteryCriteriaName,
    getProgramType,
    getTemplateName,
} from '../../redux/slice/CreateProgram/createProgram';
import {
    clearName,
    returnInitialStateCard,
    savingTemplateData,
    setDataType,
    setMasteryCriteriaName,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import {
    getProgramById,
    resetState,
} from '../../redux/slice/RenameProgram/renameProgram';
import { savingGetMasteryCriteriaTemplateDataById } from '../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import {
    clearGetMasteryData,
    savingGetMasteryCriteriaTemplateData,
} from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import { clearingData } from '../../redux/slice/template/templateSlice';
import ShowBadges from '../MasterCriteriaForm/TemplateForm/ShowBadges';
import PromptsInput from '../MasterCriteriaForm/TemplateForm/PromptsInput';
import PromptModal from '../MasterCriteriaForm/PromptModal';
import { taskAnalysis } from '../../api/services/TaskAnalysis/TaskAnalysisApi';
import Button from '../Generics/Button';
import { Plus } from 'lucide-react';
import StepsComponent from '../AddProgramModal/ProgramSteps';
export default function AddTarget({
    formRef,
    isDuplicateKey,
    isEdit,
    setonChangeTargetType,
    stepData,
    setStepData,
    setOnchangeCallId,
    setProgramId,
}: {
    formRef: any;
    isDuplicateKey: any;
    isEdit: any;
    setonChangeTargetType: any;
    stepData?: any;
    setStepData?: any;
    setOnchangeCallId: any;
    setProgramId: any;
}): React.JSX.Element {
    const params = useParams();
    const [programNameData, setProgramNameData] = useState<any>([]);
    const activeTab = useSelector(
        ({ getDomainById }: any) => getDomainById?.currentTab
    );
    const domainNames = useSelector(
        ({ getDomainById }: any) => getDomainById?.value?.[params.id!]?.data
    );
    const programDataList = useSelector(
        ({ getProgramsByDomainId }: any) => getProgramsByDomainId?.value
    );
    const programDataTypes = useSelector(
        ({ createProgram }: any) => createProgram?.programTypes?.data
    );
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const folderData = useSelector(
        ({ saveProgramBookLibraryDomainFolderData }: any) =>
            saveProgramBookLibraryDomainFolderData?.value?.data
    );
    const targetData = useSelector(({ getTarget }: any) => getTarget);
    const targetDataByIdClicked = useSelector(
        ({ getTarget }: any) => getTarget?.clickedTarget?.data
    );
    const pinnedData = useSelector(({ quickLook }: any) => quickLook);
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const [addTask, setAddTask] = useState<any>(false);
    const [count, setCount] = useState<any>(1);
    const [isEditStep, setIsEditStep] = useState<boolean>(false);
    const [addToAll, setAddToAll] = useState<any>(false);
    const [orderStep, setOrderStep] = useState<any>(null);
    const [stepName, setStepName] = useState<string>('');
    const [badges, setBadges] = useState<any>([]);
    const [currentData, setCurrentData] = useState<any>({});
    const [openPromptsModal, setOpenPromptsModal] = useState(false);
    const [badgesProps, setBadgesProps] = useState<any>([]);
    const dispatch = useDispatch<any>();
    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        submitForm,
        setFieldTouched,
        setFieldValue,
        touched,
        errors,
    }: {
        values: any;
        handleChange: any;
        handleBlur: any;
        handleSubmit: any;
        submitForm: any;
        setFieldTouched: any;
        setFieldValue: any;
        touched: any;
        errors: any;
    } = useFormikContext();
    const changeDomain = (e: any): void => {
        const selectedDomainId = (folderData || domainNames).find(
            (item: any) => item?.id == e.target.value
        );
        const data = {
            domainId: selectedDomainId?.id,
            phase: activeTab,
            isNonTaskAnalysisProgram: true,
            isTargetPinned: pinnedData?.addQuickLook,
            quickLookId: pinnedData?.clickedQuickLook,
        };
        dispatch(getProgramsByDomainIdCall(data));
        setOnchangeCallId(selectedDomainId?.id);
        setProgramId('');
        handleChange(e);
    };
    const changeProgram = (e: any): void => {
        handleChange(e);
    };
    const changeSdInstructions = (e: any): void => {
        handleChange(e);
        setonChangeTargetType(true);
    };
    const changeProgramDispatch = (e: any): void => {
        dispatch(resetState());
        dispatch(clearingData());
        dispatch(savingTemplateData([]));
        dispatch(
            getProgramById({
                id: parseInt(e?.target?.value),
                isTarget: targetData?.isFromTarget ? true : false,
            })
        );
        setProgramId(e?.target?.value);
    };
    useEffect(() => {
        const data = {
            type: 'GUIDELINE_TEMPLATE',
            publishStatus: 'Published',
        };
        const data2 = {
            type: 'INSTRUCTION_TEMPLATE',
        };
        dispatch(getTemplateName(data));
        dispatch(getProgramType(data2));
    }, []);
    useEffect(() => {
        submitForm();
    }, [values]);
    useEffect(() => {
        if (programDataList?.[values?.domainName]) {
            const programs = programDataList[values.domainName].filter(
                (item: any) => {
                    return item?.programType !== 'Task Analysis';
                }
            );
            setProgramNameData(programs);
        }
    }, [programDataList, values?.domainName]);
    useEffect(() => {
        if (targetDataByIdClicked?.steps) {
            const countData = targetDataByIdClicked?.steps?.length;
            const stepPromptsArray = targetDataByIdClicked?.steps?.map(
                (item: any) => ({
                    ...item,
                    stepPrompts: JSON.parse(item.stepPrompts),
                })
            );
            if (stepPromptsArray?.[0]?.addToAllSteps) {
                setBadges(stepPromptsArray?.[0]?.stepPrompts);
                setAddToAll(stepPromptsArray?.[0]?.addToAllSteps);
            }
            if (stepPromptsArray) {
                setAddTask(true);
            }
            setCount(() => countData + 1);
            setStepData(stepPromptsArray || []);
        }
    }, [targetDataByIdClicked?.steps]);
    const handleCancel = (): void => {
        setStepName('');
        setIsEditStep(false);
        setOrderStep(null);
        setCurrentData({});
    };
    const handleOpenModal = (): void => {
        setOpenPromptsModal(true);
    };
    const handleCheckBox = (): void => {
        if (!addToAll && (count === 1 || orderStep === 1)) {
            setBadgesProps(badges);
        } else {
            setBadgesProps([]);
            setStepData((prev: any) =>
                prev.map((step: any) => ({
                    ...step,
                    stepPrompts: '',
                }))
            );
        }
        setAddToAll(!addToAll);
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
    const AddNewStep = (): void => {
        setStepData((prev: any) => [
            ...prev,
            {
                id: currentData?.id,
                order: count,
                stepDescription: stepName,
                stepPrompts: badges,
                addToAllSteps: addToAll,
            },
        ]);
        if (addToAll) {
            setStepData((prev: any) =>
                prev.map((step: any) => ({
                    ...step,
                    stepPrompts: badges,
                }))
            );
            setBadges(badgesProps);
        } else {
            setBadges([]);
        }
        setCount(count + 1);
        setStepName('');
    };
    const updateStep = (res?: any): void => {
        if (currentData?.id || currentData?.order) {
            setStepData((prev: any) =>
                prev.map((step: any) =>
                    step.order === currentData?.order
                        ? {
                              ...step,
                              stepDescription: stepName,
                              stepPrompts: badges,
                          }
                        : step
                )
            );
        } else {
            setStepData((prev: any) => [
                ...prev,
                {
                    id: res?.data?.id || res?.step?.id,
                    order: count,
                    stepDescription: stepName,
                    stepPrompts: badges,
                    addToAllSteps: addToAll,
                },
            ]);
            setCount(count + 1);
        }
        if (addToAll) {
            setStepData((prev: any) =>
                prev.map((step: any) => ({
                    ...step,
                    stepPrompts: badges,
                }))
            );
            setBadges(badgesProps);
        } else {
            setBadges([]);
        }
        setOrderStep(null);
        setStepName('');
        setIsEditStep(false);
        setCurrentData({});
    };
    const saveEditStep = async (): Promise<void> => {
        if (targetDataByIdClicked?.id || isEditStep) {
            if (targetDataByIdClicked?.id) {
                const payloadData = {
                    id: currentData?.id,
                    stepDescription: stepName,
                    stepPrompts: JSON.stringify(badges),
                    programId: targetDataByIdClicked?.programId,
                    order: currentData?.order ? currentData?.order : count,
                    targetId: targetDataByIdClicked?.id,
                    addToAllSteps: addToAll,
                };
                if (!addToAll) {
                    const res = await taskAnalysis.editSteps(payloadData);
                    updateStep(res?.data?.data);
                } else {
                    const res =
                        await taskAnalysis.editStepsAddTToAll(payloadData);
                    updateStep(res?.data?.data);
                }
            } else {
                updateStep();
            }
        } else {
            AddNewStep();
        }
    };
    const handleAddTask = (): void => {
        setAddTask(true);
    };
    return (
        <>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-5 flex justify-between items-end">
                    <div className="w-1/2">
                        <label
                            htmlFor="hs-validation-name-error"
                            className="block text-sm font-medium mr-2 mb-1"
                        >
                            <span className="text-red-500 mr-1">*</span>
                            {!params?.id && 'Select'} Domain
                            {/* domain */}
                        </label>
                        <div className="relative">
                            <Field
                                as="select"
                                label={'Select Domain'}
                                name={'domainName'}
                                id={'domainName'}
                                value={values.domainName}
                                className={
                                    'peer pe-0 block w-full ps-3 pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                                }
                                placeholder={'Select Domain'}
                                isRequired={true}
                                onChange={(e: any) => {
                                    changeDomain(e);
                                    isEdit && setFieldValue('programName', '');
                                }}
                                onBlur={handleBlur}
                            >
                                <option value="" disabled>
                                    Select a domain
                                </option>
                                {(folderData || domainNames)?.map(
                                    (itemDomain: any) => (
                                        <option
                                            key={itemDomain?.id}
                                            value={itemDomain?.id}
                                        >
                                            {itemDomain?.name}
                                        </option>
                                    )
                                )}
                            </Field>
                        </div>
                    </div>
                </div>
                <div className="mb-5 flex justify-between items-end">
                    <div className="w-1/2">
                        <label
                            htmlFor="hs-validation-name-error"
                            className="block text-sm font-medium mr-2 mb-1"
                        >
                            <span className="text-red-500 mr-1">*</span>
                            {!params?.programId?.length && 'Select'} Program
                        </label>
                        <div className="relative">
                            <Field
                                as="select"
                                label={'Select Program'}
                                name={'programName'}
                                id={'programName'}
                                value={values?.programName}
                                className={
                                    'peer pe-0 block w-full ps-3 pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                                }
                                placeholder={'Select program'}
                                isRequired={true}
                                onChange={(e: any) => {
                                    changeProgram(e);
                                    changeProgramDispatch(e);
                                    dispatch(clearGetMasteryData());
                                    dispatch(clearName());
                                }}
                                onBlur={handleBlur}
                            >
                                <option value="" disabled selected>
                                    Select a program
                                </option>
                                {(!editProgramData?.isEdit
                                    ? programNameData
                                    : programDataList?.[values?.domainName]
                                )?.map((item: any) => (
                                    <option key={item?.id} value={item?.id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </Field>
                        </div>
                    </div>
                </div>
                <div className="mb-5 w-1/2">
                    <label
                        htmlFor="hs-validation-name-error"
                        className="block text-sm font-medium mr-2 mb-1"
                    >
                        <span className="text-red-500 mr-1">*</span>
                        Target Name
                    </label>
                    <Field
                        name={'targetName'}
                        id={'targetName'}
                        value={values.targetName}
                        component={Input}
                        className={
                            'peer pe-0 ps-3 block pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-1 border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                        }
                        placeholder={'Target Name'}
                        onChange={(e: any) => {
                            handleChange(e);
                        }}
                        onBlur={handleBlur}
                    />
                    {isDuplicateKey && (
                        <label className="text-red-500 text-sm">
                            Please provide an unique Target name{' '}
                        </label>
                    )}
                </div>
                <div className="items-end mb-5 w-full">
                    <label
                        htmlFor="hs-validation-name-error"
                        className="block text-sm font-medium mb-2"
                    >
                        Target Goal
                    </label>
                    <div className="items-end flex">
                        <Field
                            as={'textarea'}
                            rows={2}
                            label={'Target Goal'}
                            name={'targetGoal'}
                            id={'targetGoal'}
                            value={values.targetGoal}
                            className={
                                'peer pe-0 ps-3 block w-4/5  rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                            }
                            placeholder={'Target Description'}
                            isRequired={true}
                            onChange={(e: any) => {
                                setonChangeTargetType(true);
                                setFieldTouched('targetGoal');
                                handleChange(e);
                            }}
                            onBlur={handleBlur}
                            form={{
                                touched,
                                errors: !values?.targetGoal
                                    ? {
                                          errors,
                                      }
                                    : errors,
                            }}
                        />
                    </div>
                    {errors && errors?.targetGoal?.length && (
                        <label className="text-red-500 text-sm absolute">
                            {errors?.targetGoal}
                        </label>
                    )}
                </div>
                <div className=" mt-4 w-1/2">
                    <label
                        htmlFor="quantity-input"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Target Type
                    </label>
                    <Field
                        as="select"
                        label={'Select Target Type'}
                        name={'targetType'}
                        style={
                            targetDataByIdClicked?.isEditable === false
                                ? { cursor: 'not-allowed' }
                                : {}
                        }
                        value={values.targetType}
                        className={`${targetDataByIdClicked?.isEditable === false ? 'cursor-not-allowed' : ''}peer pe-0 block w-full ps-3 pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0
                                `}
                        disabled={
                            targetDataByIdClicked?.isEditable === false ||
                            targetDataByIdClicked?.targetType ===
                                'Task Analysis'
                                ? true
                                : false
                        }
                        placeholder={'Select Program Type'}
                        isRequired={true}
                        onChange={(e: any) => {
                            handleChange(e);
                            dispatch(returnInitialStateCard());
                            setonChangeTargetType(true);
                            dispatch(
                                getMasteryCriteriaName({
                                    dataType: e.target.value,
                                    publishStatus: 'Published',
                                })
                            );
                            dispatch(setMasteryCriteriaName(''));
                            dispatch(savingGetMasteryCriteriaTemplateData([]));
                            dispatch(
                                savingGetMasteryCriteriaTemplateDataById([])
                            );
                            dispatch(setDataType(e?.target?.value));
                        }}
                        onBlur={handleBlur}
                    >
                        <option value="" disabled selected>
                            Select a program type{' '}
                        </option>
                        {programDataTypes?.map((item: any) => (
                            <option key={item?.id} value={item?.name}>
                                {item?.name}
                            </option>
                        ))}
                    </Field>
                </div>
                <div
                    className={`w-[65rem] ${!targetDataByIdClicked?.isEditable && targetDataByIdClicked?.id ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    {values?.targetType === 'Task Analysis' ? (
                        <div className="mt-5 w-full">
                            <div>
                                <label
                                    htmlFor="quantity-input"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Task Analysis Type
                                    <span className="text-red-500 ml-1">*</span>
                                </label>
                            </div>
                            <div className="flex space-x-4 mt-3">
                                {TaskAnalysisType?.map(
                                    (item: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="flex space-x-2 items-center"
                                            >
                                                <Field
                                                    type="radio"
                                                    name="taskAnalysisType"
                                                    value={item}
                                                />
                                                <label
                                                    htmlFor="add"
                                                    className="text-[#394148] text-sm font-sm"
                                                >
                                                    {item}
                                                </label>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    ) : null}
                    {values?.targetType === 'Task Analysis' && !addTask ? (
                        <div>
                            <div className="items-center mt-7">
                                <div className="flex space-x-4 mt-4">
                                    <Button
                                        type={'primary'}
                                        onClick={handleAddTask}
                                        className={
                                            'w-40 h-9 flex justify-between items-center'
                                        }
                                    >
                                        <Plus className={'mr-3'} />
                                        Add step
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {values?.targetType == 'Task Analysis' && addTask ? (
                        <div>
                            <div className="flex mt-4">
                                <div className="w-3/5 h-56 bg-white border overflow-x-scroll shadow-md rounded-md">
                                    <div className="mb-5 ml-5 mt-2 w-96">
                                        <Field
                                            label={
                                                isEditStep
                                                    ? `Edit Step - ${orderStep ? ` ${orderStep}` : count}`
                                                    : `Step ${orderStep ? ` ${orderStep}` : count}`
                                            }
                                            name={'stepDescription'}
                                            id={'stepDescription'}
                                            value={stepName}
                                            component={Input}
                                            className={
                                                'peer pe-0 block pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-1 border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                                            }
                                            placeholder={'Enter'}
                                            isRequired={false}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setStepName(e?.target?.value);
                                            }}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="ml-5">
                                        <div>
                                            <label className="text-sm font-medium">
                                                Prompts:
                                            </label>
                                        </div>
                                        <div className="flex">
                                            <div className="w-96">
                                                <PromptsInput
                                                    phase={''}
                                                    handleOpenModal={
                                                        handleOpenModal
                                                    }
                                                    badges={badges}
                                                    setBadges={setBadges}
                                                    criteriaData={criteriaData}
                                                    fromProgram={true}
                                                />
                                            </div>
                                            {count === 1 || orderStep === 1 ? (
                                                <div className="flex mt-3 ml-4">
                                                    <Field
                                                        onChange={() => {
                                                            handleCheckBox();
                                                        }}
                                                        checked={addToAll}
                                                        type="checkbox"
                                                        className="shrink-0 border-b-3 border-gray-800 rounded checked:bg-theme-lightBlue1 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                        id="addToAllSteps"
                                                        name="addToAllSteps"
                                                    />
                                                    <label
                                                        htmlFor="hs-default-checkbox"
                                                        className="text-sm font-sm ms-1"
                                                    >
                                                        Add to all Steps
                                                    </label>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <ShowBadges
                                                badges={badges}
                                                setBadges={setBadges}
                                                handleBadgeClick={
                                                    handleBadgeClick
                                                }
                                            />
                                        </div>
                                        <div className="mt-2 mb-2 mr-4">
                                            <div className="flex justify-end items-center gap-x-2">
                                                <button
                                                    onClick={handleCancel}
                                                    type="button"
                                                    className="py-2 px-7 w-[100px] inline-flex items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    className="py-2 px-9 w-[100px] inline-flex items-center gap-x-2 text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                                                    onClick={saveEditStep}
                                                    disabled={
                                                        stepName?.length === 0
                                                    }
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <StepsComponent
                                        stepData={stepData}
                                        setCurrentData={setCurrentData}
                                        setBadges={setBadges}
                                        setStepName={setStepName}
                                        setOrderStep={setOrderStep}
                                        setIsEdit={setIsEditStep}
                                        setStepData={setStepData}
                                        setCount={setCount}
                                        count={count}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="flex">
                    {values?.targetType == 'Time Sampling' ? (
                        <div className="flex items-center flex-row py-3 mr-4 rounded-md">
                            <div className="mt-4 flex">
                                <div className="mt-4">
                                    <label
                                        htmlFor="hs-validation-name-error"
                                        className="block text-sm font-medium "
                                    >
                                        Time per Interval
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>
                                </div>
                                <div className="mt-2 flex space-x-2 ml-8">
                                    <Field
                                        autoComplete="off"
                                        isRequired={false}
                                        name="timeSamplingMinutes"
                                        id={'timeSamplingMinutes'}
                                        value={values?.timeSamplingMinutes}
                                    >
                                        {({ field, form }: FieldProps) => (
                                            <Accuracy
                                                value={0}
                                                field={field}
                                                form={form}
                                            />
                                        )}
                                    </Field>
                                    <label
                                        htmlFor="quantity-input"
                                        className="text-sm font-medium mt-2 ml-0"
                                    >
                                        Minutes
                                    </label>
                                </div>
                                <div className="mt-2 flex space-x-2 ml-5">
                                    <Field
                                        autoComplete="off"
                                        isRequired={false}
                                        name="timeSamplingSeconds"
                                        id={'timeSamplingSeconds'}
                                        value={values?.timeSamplingSeconds}
                                    >
                                        {({ field, form }: FieldProps) => (
                                            <Accuracy
                                                value={0}
                                                field={field}
                                                form={form}
                                            />
                                        )}
                                    </Field>
                                    <label
                                        htmlFor="quantity-input"
                                        className="text-sm font-medium mt-2"
                                    >
                                        Seconds
                                    </label>
                                </div>
                            </div>
                            <div className="mt-4 ml-16 flex">
                                <div className="mt-5">
                                    <label
                                        htmlFor="hs-validation-name-error"
                                        className="block text-sm font-medium mb-2"
                                    >
                                        Intervals
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>
                                </div>
                                <div className="ml-5 mt-3">
                                    <Field
                                        autoComplete="off"
                                        isRequired={false}
                                        name="timeSamplingIntervals"
                                        id={'timeSamplingIntervals'}
                                        value={values?.timeSamplingIntervals}
                                    >
                                        {({ field, form }: FieldProps) => (
                                            <Accuracy
                                                value={0}
                                                field={field}
                                                form={form}
                                            />
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center ml-5 mt-7">
                                <div>
                                    <label
                                        htmlFor="quantity-input"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Target Location
                                    </label>
                                </div>
                                <div className="flex space-x-4">
                                    {radioTypesTargetLocation?.map(
                                        (item: any, index: any) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex space-x-2 items-center"
                                                >
                                                    <Field
                                                        type="radio"
                                                        name="targetLocation"
                                                        value={item}
                                                    />
                                                    <label
                                                        htmlFor="add"
                                                        className="text-[#394148] text-sm font-sm"
                                                    >
                                                        {item}
                                                    </label>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center flex-row w-4/6 justify-between  py-3 mr-4 rounded-md">
                            <div className="flex items-center flex-row justify-between  py-3 mr-4 rounded-md">
                                {/* <div className="flex space-x-5 items-center ml-5">
                                    <label
                                        htmlFor="quantity-input"
                                        className="text-sm font-medium"
                                    >
                                        Minimum Trials
                                    </label>
                                    <Field
                                        autoComplete="off"
                                        isRequired={false}
                                        name="minimumTrails"
                                    >
                                        {({ field, form }: FieldProps) => (
                                            <Accuracy
                                                value={
                                                    targetDataByIdClicked?.minTrials ||
                                                    0
                                                }
                                                field={field}
                                                form={form}
                                            />
                                        )}
                                    </Field>
                                </div> */}
                                <div className="flex space-x-5 items-center ml-5">
                                    <label
                                        htmlFor="quantity-input"
                                        className="text-sm font-medium"
                                    >
                                        Maximum Trials
                                    </label>
                                    <Field
                                        autoComplete="off"
                                        isRequired={false}
                                        name="maximumTrails"
                                    >
                                        {({ field, form }: FieldProps) => (
                                            <Accuracy
                                                value={
                                                    targetDataByIdClicked?.maxTrials ||
                                                    0
                                                }
                                                field={field}
                                                form={form}
                                            />
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center ml-5">
                                <div>
                                    <label
                                        htmlFor="quantity-input"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Target Location
                                    </label>
                                </div>
                                <div className="flex space-x-4">
                                    {radioTypesTargetLocation?.map(
                                        (item: any, index: any) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex space-x-2 items-center"
                                                >
                                                    <Field
                                                        type="radio"
                                                        className="cursor-pointer"
                                                        name="targetLocation"
                                                        value={item}
                                                    />
                                                    <label
                                                        htmlFor="add"
                                                        className="text-[#394148] text-sm font-sm"
                                                    >
                                                        {item}
                                                    </label>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-6 flex w-3/4">
                    <div className="flex items-center flex-row w-2/5 justify-between px-5 py-3 mr-4 bg-white border  shadow-md rounded-md">
                        <label className="text-black font-light text-sm mr-1">
                            SD Instructions
                        </label>
                        <div className="relative inline-block">
                            <Field
                                onChange={(e: any) => {
                                    changeSdInstructions(e);
                                }}
                                checked={values?.sdInstructionsAllowed}
                                type="checkbox"
                                name="sdInstructionsAllowed"
                                id={'sdInstructionsAllowed'}
                                className="toggle-checkbox relative block appearance-none peer relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-none checked:border-blue-600 focus:checked:border-blue-600
  before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-white checked:bg-theme-lightBlue1 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
                            />
                            <label
                                htmlFor="hs-default-switch-with-icons"
                                className="sr-only"
                            >
                                switch
                            </label>
                            <span className="peer-checked:text-white text-white w-6 h-6 absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
                                <label className="text-[0.6rem]">On</label>
                            </span>
                            <span className="peer-checked:text-white text-gray-500 w-6 h-6 absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
                                <label className="text-[0.6rem]">Off</label>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center flex-row w-2/5 justify-between px-5 py-3 mr-4 bg-white border  shadow-md rounded-md">
                        <label className="text-black font-light text-sm mr-1">
                            Comments
                        </label>
                        <div className="relative inline-block">
                            <Field
                                onChange={(e: any) => {
                                    handleChange(e);
                                }}
                                checked={values?.addCommentsToChild}
                                type="checkbox"
                                name="addCommentsToChild"
                                id={'addCommentsToChild'}
                                className="toggle-checkbox  block appearance-none peer relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-none checked:border-blue-600 focus:checked:border-blue-600
  before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-white checked:bg-theme-lightBlue1 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
                            />
                            <label
                                htmlFor="hs-default-switch-with-icons"
                                className="sr-only"
                            >
                                switch
                            </label>
                            <span className="peer-checked:text-white text-white w-6 h-6 absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
                                <label className="text-[0.6rem]">On</label>
                            </span>
                            <span className="peer-checked:text-white text-gray-500 w-6 h-6 absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
                                <label className="text-[0.6rem]">Off</label>
                            </span>
                        </div>
                    </div>
                </div>
                {values?.sdInstructionsAllowed && (
                    <div className="mb-5 w-2/3 mt-5">
                        <Field
                            label={'SD Instructions'}
                            name={'sdInstructions'}
                            id={'sdInstructions'}
                            value={values.sdInstructions}
                            component={Input}
                            className={
                                'peer pe-0 ps-3 block pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-1 border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                            }
                            placeholder={'Please enter instructions here'}
                            isRequired={false}
                            onChange={(e: any) => {
                                setonChangeTargetType(true);
                                setFieldTouched('sdInstructions');
                                handleChange(e);
                            }}
                            onBlur={handleBlur}
                        />
                    </div>
                )}
            </form>
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
