/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Field, FieldProps, FormikErrors, useFormikContext } from 'formik';
import Input from '../Generics/Inputs/Input';
import { useSelector, useDispatch } from 'react-redux';
import {
    getMasteryCriteriaName,
    getProgramType,
    getTemplateName,
} from '../../redux/slice/CreateProgram/createProgram';
import { useParams } from 'react-router-dom';
import { setDataType } from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import { savingGetMasteryCriteriaTemplateData } from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import { savingGetMasteryCriteriaTemplateDataById } from '../../redux/slice/GetMasteryCriteriaTemplateById/getMasteryCriteriaTemplateById';
import Accuracy from '../MasterCriteriaForm/Accuracy';
import { TaskAnalysisType } from '../../constants/AddTarget';
import Button from '../Generics/Button';
import { Plus } from 'lucide-react';
import PromptsInput from '../MasterCriteriaForm/TemplateForm/PromptsInput';
import PromptModal from '../MasterCriteriaForm/PromptModal';
import ShowBadges from '../MasterCriteriaForm/TemplateForm/ShowBadges';
import { taskAnalysis } from '../../api/services/TaskAnalysis/TaskAnalysisApi';
import { setHideAddToAll } from '../../redux/slice/getTarget/getTargetByProgramId';
import StepsComponent from './ProgramSteps';
import AddBulkingTarget from './AddBulkingTarget';
interface FormErrors {
    programName?: string;
    sdInstructions?: string;
    targetGoal?: string;
    programGoal?: string;
}
export default function AddProgram({
    isDuplicateKey,
    setIsDuplicate,
    stepData,
    setStepData,
    formRef,
    targets,
    setTargets,
    setShowError,
}: {
    isDuplicateKey?: any;
    setIsDuplicate?: any;
    stepData?: any;
    setStepData?: any;
    formRef: any;
    targets?: any;
    setTargets?: any;
    setShowError?: (arg0: boolean) => void;
}): React.JSX.Element {
    const params = useParams();
    const [stepName, setStepName] = React.useState<string>('');
    const [currentData, setCurrentData] = React.useState<any>({});
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [badges, setBadges] = React.useState<any>([]);
    const [addTask, setAddTask] = React.useState<any>(false);
    const [count, setCount] = React.useState<any>(1);
    const [orderStep, setOrderStep] = React.useState<any>(null);
    const [addToAll, setAddToAll] = React.useState<any>(false);
    const [showAddTargetForm, setShowAddTargetForm] =
        React.useState<boolean>(false);

    const [openPromptsModal, setOpenPromptsModal] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [badgesProps, setBadgesProps] = React.useState<any>([]);
    const domainNames = useSelector(
        ({ getDomainById }: any) => getDomainById?.value?.[params.id!]?.data
    );
    const programDataTypes = useSelector(
        ({ createProgram }: any) => createProgram?.programTypes?.data
    );
    const editProgramData = useSelector(
        ({ renameProgram }: any) => renameProgram
    );
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const folderData = useSelector(
        ({ saveProgramBookLibraryDomainFolderData }: any) =>
            saveProgramBookLibraryDomainFolderData?.value?.data
    );
    const dispatch = useDispatch<any>();
    const defaultDomainName = domainNames?.find(
        (item: any) => item.id == params.domainId
    );
    const formRefBulking: any = React.useRef<HTMLDivElement>(null);

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        submitForm,
        setFieldTouched,
        touched,
        errors,
    }: {
        values: any;
        handleChange: any;
        handleBlur: any;
        handleSubmit: any;
        submitForm: any;
        setFieldTouched: any;
        touched: any;
        errors: FormErrors;
    } = useFormikContext();
    React.useEffect(() => {
        if (defaultDomainName) {
            values.domainSelect = defaultDomainName.id;
        }
    }, [defaultDomainName]);
    React.useEffect(() => {
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
    function hasErrors(errorVal: FormikErrors<FormErrors>): boolean {
        return Object.values(errorVal).some(
            (error) => typeof error === 'string' && error.length > 0
        );
    }
    const shouldDisable = hasErrors(errors);
    React.useEffect(() => {
        if (setShowError) {
            if (shouldDisable) {
                setShowError(true);
            } else {
                setShowError(false);
            }
        }
    }, [errors]);

    const setType = (e: any): void => {
        if (e?.target?.value?.length) {
            dispatch(setDataType(e?.target?.value));
        }
    };
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
    const handleAddTask = (): void => {
        setAddTask(true);
    };
    const handleCheckBox = (): void => {
        if (!addToAll && (count === 1 || orderStep === 1)) {
            setBadgesProps(badges);
        } else {
            setBadgesProps([]);
        }
        setAddToAll(!addToAll);
    };
    React.useEffect(() => {
        if (editProgramData?.programData?.steps) {
            const countData = editProgramData?.programData?.steps?.length;
            const stepPromptsArray = editProgramData?.programData?.steps?.map(
                (item: any) => ({
                    ...item,
                    stepPrompts: JSON.parse(item.stepPrompts),
                })
            );
            setCount(() => countData + 1);
            setStepData(stepPromptsArray || []);
            if (stepPromptsArray?.[0]?.addToAllSteps) {
                setBadges(stepPromptsArray?.[0]?.stepPrompts);
                setAddToAll(stepPromptsArray?.[0]?.addToAllSteps);
            }
            if (stepPromptsArray) {
                setAddTask(true);
            }
        }
    }, [editProgramData?.programData?.steps]);
    React.useEffect(() => {
        submitForm();
    }, [values]);
    React.useEffect(() => {
        if (values?.programType != 'Task Analysis') {
            setAddTask(false);
        }
        dispatch(
            setHideAddToAll(
                values?.programType === 'Task Analysis' ? false : true
            )
        );
    }, [values.programType]);

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
        setIsEdit(false);
        setCurrentData({});
    };
    const handleCancel = (): void => {
        setStepName('');
        setIsEdit(false);
        setOrderStep(null);
        setCurrentData({});
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
    const saveEditStep = async (): Promise<void> => {
        if (editProgramData?.programData?.id || isEdit) {
            if (editProgramData?.programData?.id) {
                const payloadData = {
                    id: currentData?.id,
                    order: currentData?.order ? currentData?.order : count,
                    stepDescription: stepName,
                    stepPrompts: JSON.stringify(badges),
                    programId: editProgramData?.programData?.id,
                    targetId: '',
                    addToAllSteps: addToAll,
                };
                if (!addToAll) {
                    const res = await taskAnalysis.editSteps(payloadData);
                    updateStep(res?.data?.data);
                } else {
                    {
                        const res =
                            await taskAnalysis.editStepsAddTToAll(payloadData);
                        updateStep(res?.data?.data);
                    }
                }
            } else {
                updateStep();
            }
        } else {
            AddNewStep();
        }
    };

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                ref={formRef}
            >
                <div className="pb-6" data-testid="add-program-button">
                    <div
                        className={`mb-5 flex justify-between items-end ${defaultDomainName ? ' disabled:opacity-40 disabled:cursor-not-allowed' : ''}`}
                    >
                        <div className="w-2/3">
                            <label
                                htmlFor="hs-validation-name-error"
                                className="block text-sm font-medium mr-2 mb-1"
                            >
                                {!defaultDomainName && 'Select'} Domain
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <Field
                                    as="select"
                                    label={'Select Domain'}
                                    name={'domainSelect'}
                                    id={'domainSelect'}
                                    value={values.domainSelect}
                                    className={
                                        'peer pe-0 block w-full ps-3 pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                                    }
                                    placeholder={'Select Domain'}
                                    isRequired={true}
                                    onChange={(e: any) => {
                                        handleChange(e);
                                        submitForm();
                                    }}
                                    data-testid="domainSelect"
                                    onBlur={handleBlur}
                                >
                                    <option value="" disabled selected>
                                        Select a domain
                                    </option>
                                    {domainNames?.map((itemDomain: any) => (
                                        <option
                                            key={itemDomain?.id}
                                            value={itemDomain?.id}
                                        >
                                            {itemDomain?.name}
                                        </option>
                                    ))}
                                    {folderData?.map((itemDomain: any) => (
                                        <option
                                            key={itemDomain?.id}
                                            value={itemDomain?.id}
                                        >
                                            {itemDomain?.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                        </div>
                        <div className="pr-2 flex border-b-[1px] border-[#A0A0A0]">
                            <label
                                htmlFor="hs-validation-name-error"
                                className="block text-sm font-medium"
                            >
                                Start Date:
                            </label>
                            <label className="text-sm font-light pl-2">
                                02/02/2024
                            </label>
                        </div>
                    </div>

                    <div className="mb-5 w-2/3">
                        <Field
                            label={'Program Name'}
                            name={'programName'}
                            id={'programName'}
                            value={values.programName}
                            component={Input}
                            data-testId={'Program-Name'}
                            className={
                                'peer pe-0 ps-3 block pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-1 border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                            }
                            placeholder={'Program Name'}
                            isRequired={true}
                            onChange={(e: any) => {
                                setFieldTouched('programName');
                                handleChange(e);

                                setIsDuplicate(false);
                            }}
                            onBlur={handleBlur}
                        />
                        {isDuplicateKey && (
                            <label className="text-red-500 text-sm">
                                Please provide an unique Program name{' '}
                            </label>
                        )}
                    </div>

                    <div className="items-end mb-5 w-full">
                        <label
                            htmlFor="hs-validation-name-error"
                            className="block text-sm font-medium mb-2"
                        >
                            Program Goal
                        </label>
                        <div className="items-end flex">
                            <div className="flex-col  w-2/3 ">
                                <Field
                                    as={'textarea'}
                                    rows={2}
                                    label={'Program Goal'}
                                    name={'programGoal'}
                                    id={'programGoal'}
                                    value={values.programGoal}
                                    data-testId="Program Goal"
                                    className={
                                        'peer pe-0 ps-3 block pt-1 px-4 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none w-full'
                                    }
                                    form={{
                                        touched,
                                        errors: !values?.programGoal
                                            ? {
                                                  errors,
                                              }
                                            : errors,
                                    }}
                                    placeholder={'Goal Description'}
                                    isRequired={true}
                                    onChange={(e: any) => {
                                        handleChange(e);
                                    }}
                                />
                                {errors && errors?.programGoal?.length && (
                                    <label className="text-red-500 text-sm absolute">
                                        {errors?.programGoal}
                                    </label>
                                )}
                            </div>

                            {values?.programType != 'Task Analysis' ? (
                                <div className="flex ml-12">
                                    <Field
                                        type="checkbox"
                                        name="addGoalToChild"
                                        id="addGoalToChild"
                                        checked={values?.addGoalToChild}
                                        onChange={(e: any) => {
                                            handleChange(e);
                                        }}
                                        data-testId="addGoalToChild"
                                    />

                                    <label
                                        htmlFor="hs-default-checkbox"
                                        className="text-sm font-sm ms-2"
                                    >
                                        Add to all targets
                                    </label>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-3 w-2/3">
                        <label
                            htmlFor="hs-validation-name-error"
                            className="block text-sm font-medium mb-2"
                        >
                            Program Type
                            <span className="text-red-500 ml-1">*</span>
                        </label>

                        <div className="relative">
                            <Field
                                as="select"
                                label={'Select Program Type'}
                                name={'programType'}
                                id={'programType'}
                                value={values.programType}
                                disabled={
                                    editProgramData?.programData
                                        ?.programType === 'Task Analysis'
                                        ? true
                                        : false
                                }
                                className={
                                    'peer pe-0 block w-full ps-3 pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-[1px] border-x-transparent border-b-[#A0A0A0] text-sm focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
                                }
                                placeholder={'Select Program Type'}
                                isRequired={true}
                                onChange={(e: any) => {
                                    handleChange(e);

                                    dispatch(
                                        savingGetMasteryCriteriaTemplateData([])
                                    );
                                    dispatch(
                                        savingGetMasteryCriteriaTemplateDataById(
                                            []
                                        )
                                    );
                                    dispatch(
                                        getMasteryCriteriaName({
                                            dataType: e.target.value,
                                            publishStatus: 'Published',
                                        })
                                    );
                                    setType(e);
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
                    </div>
                    {values?.programType !== 'Task Analysis' &&
                        !editProgramData?.onRename && (
                            <div>
                                <div className="items-center mt-7">
                                    <AddBulkingTarget
                                        formRefBulking={formRefBulking}
                                        targets={targets}
                                        setTargets={setTargets}
                                        isFromTarget={true}
                                        errorMessage={errorMessage}
                                        setErrorMessage={setErrorMessage}
                                        showAddTargetForm={showAddTargetForm}
                                        setShowAddTargetForm={
                                            setShowAddTargetForm
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    {values?.programType == 'Task Analysis' ? (
                        <div className="mt-5">
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
                    {values?.programType == 'Task Analysis' && !addTask ? (
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
                    {values?.programType == 'Task Analysis' && addTask ? (
                        <div>
                            <div className="flex mt-4">
                                <div className="w-3/5 h-56 bg-white border overflow-x-scroll shadow-md rounded-md">
                                    <div className="mb-5 ml-5 mt-2 w-96">
                                        <Field
                                            label={
                                                isEdit
                                                    ? `Edit Step - ${orderStep ? ` ${orderStep}` : count}`
                                                    : `Step ${orderStep ? ` ${orderStep}` : count}`
                                            }
                                            name={'stepDescription'}
                                            id={'stepDescription'}
                                            value={stepName}
                                            component={Input}
                                            className={
                                                'peer pe-0 block pt-1 rounded-none pb-1 pr-0 bg-transparent border-t-transparent border-b-1 border-x-transparent border-b-[#A0A0A0]  focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none'
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
                                        setIsEdit={setIsEdit}
                                        setStepData={setStepData}
                                        setCount={setCount}
                                        count={count}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {values?.programType == 'Time Sampling' ? (
                        <div className="flex items-center flex-row  justify-between mt-4 px-5 py-3 mr-4 bg-white border  shadow-md rounded-md">
                            <div className=" flex">
                                <div className="">
                                    <label
                                        htmlFor="hs-validation-name-error"
                                        className="block text-sm font-medium mt-2"
                                    >
                                        Time per Interval
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>
                                </div>
                                <div className="flex space-x-2 ml-8">
                                    <Field
                                        autoComplete="off"
                                        isRequired={false}
                                        name="timeSamplingMinutes"
                                        id={'timeSamplingMinutes'}
                                        value={values?.timeSamplingMinutes}
                                        onChange={(e: any) => {
                                            handleChange(e);
                                        }}
                                    >
                                        {({ field, form }: FieldProps) => (
                                            <Accuracy
                                                value={
                                                    values?.timeSamplingMinutes
                                                }
                                                field={field}
                                                form={form}
                                            />
                                        )}
                                    </Field>
                                    <label
                                        htmlFor="quantity-input"
                                        className="text-sm font-medium  ml-0 mt-2"
                                    >
                                        Minutes
                                    </label>
                                </div>
                                <div className="flex space-x-2 ml-5">
                                    <Field
                                        autoComplete="off"
                                        isRequired={false}
                                        name="timeSamplingSeconds"
                                        id={'timeSamplingSeconds'}
                                        value={values?.timeSamplingSeconds}
                                    >
                                        {({ field, form }: FieldProps) => (
                                            <Accuracy
                                                value={
                                                    values?.timeSamplingMinutes
                                                }
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
                            <div className="ml-20 flex">
                                <div className="mt-2">
                                    <label
                                        htmlFor="hs-validation-name-error"
                                        className="block text-sm font-medium"
                                    >
                                        Intervals
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </label>
                                </div>
                                <div className="ml-5">
                                    <Field
                                        autoComplete="off"
                                        isRequired={false}
                                        name="timeSamplingIntervals"
                                        id={'timeSamplingIntervals'}
                                        value={values?.timeSamplingIntervals}
                                    >
                                        {({ field, form }: FieldProps) => (
                                            <Accuracy
                                                value={
                                                    values?.timeSamplingIntervals
                                                }
                                                field={field}
                                                form={form}
                                            />
                                        )}
                                    </Field>
                                </div>
                            </div>
                            {values?.programType != 'Task Analysis' ? (
                                <div className="flex ml-10">
                                    <Field
                                        onChange={(e: any) => {
                                            handleChange(e);
                                        }}
                                        checked={values?.addTimeSamplingToChild}
                                        type="checkbox"
                                        className="shrink-0 mt-0.5 border-b-3 border-gray-800 rounded checked:bg-theme-lightBlue1 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        id="addTimeSamplingToChild"
                                        name="addTimeSamplingToChild"
                                    />
                                    <label
                                        htmlFor="hs-default-checkbox"
                                        className="text-sm font-sm ms-1"
                                    >
                                        Add to all targets
                                    </label>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    ) : null}
                    <div className="mt-6 flex">
                        <div className="flex items-center flex-row w-2/5 justify-between px-5 py-3 mr-4 bg-white border  shadow-md rounded-md">
                            <label className="text-black font-light text-sm mr-1">
                                SD Instructions
                            </label>
                            <div className="relative inline-block">
                                <Field
                                    onChange={(e: any) => {
                                        handleChange(e);
                                    }}
                                    checked={values?.sdInstructionsAllowed}
                                    type="checkbox"
                                    name="sdInstructionsAllowed"
                                    id={'sdInstructionsAllowed'}
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
                            {values?.programType != 'Task Analysis' ? (
                                <div className="flex ml-3">
                                    <Field
                                        onChange={(e: any) => {
                                            handleChange(e);
                                        }}
                                        checked={
                                            values?.addSdInstructionsToChild
                                        }
                                        type="checkbox"
                                        className="shrink-0 mt-0.5 border-b-3 border-gray-800 rounded checked:bg-theme-lightBlue1 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        id="addSdInstructionsToChild"
                                        name="addSdInstructionsToChild"
                                    />
                                    <label
                                        htmlFor="hs-default-checkbox"
                                        className="text-sm font-sm ms-1"
                                    >
                                        Add to all targets
                                    </label>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="flex items-center flex-row w-1/3 justify-between px-6 py-3 mr-4 bg-white border  shadow-md rounded-md">
                            <label className="text-black font-light text-sm mr-1">
                                Comments
                            </label>
                            <div className="relative inline-block">
                                <Field
                                    onChange={(e: any) => {
                                        handleChange(e);
                                    }}
                                    type="checkbox"
                                    checked={values?.isCommentsAllowed}
                                    name={'isCommentsAllowed'}
                                    id={'isCommentsAllowed'}
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
                            {values?.programType != 'Task Analysis' ? (
                                <div className="flex ml-3">
                                    <Field
                                        type="checkbox"
                                        name="addCommentsToChild"
                                        id="addCommentsToChild"
                                        checked={values?.addCommentsToChild}
                                        onChange={(e: any) => {
                                            handleChange(e);
                                        }}
                                    />
                                    <label
                                        htmlFor="hs-default-checkbox"
                                        className="text-sm font-sm ms-1"
                                    >
                                        Add to all targets
                                    </label>
                                </div>
                            ) : null}
                        </div>

                        <div className="flex items-center flex-row w-2/5 justify-between px-5 py-3 mr-4 bg-white border  shadow-md rounded-md">
                            <label className="text-black font-light text-sm mr-1">
                                Auto progress targets
                            </label>
                            <div className="relative inline-block">
                                <Field
                                    onChange={(e: any) => {
                                        handleChange(e);
                                    }}
                                    checked={values?.isAutoProgressAllowed}
                                    type="checkbox"
                                    name="isAutoProgressAllowed"
                                    id={'isAutoProgressAllowed'}
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
                                    setFieldTouched(
                                        'sdInstructions',
                                        true,
                                        false
                                    );
                                    handleChange(e);
                                }}
                            />
                        </div>
                    )}
                </div>
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
