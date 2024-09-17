import * as React from 'react';
import customMade from '../../assets/img/customMade.svg';
import descriptionGreen from '../../assets/img/descriptionGreen.svg';
import checked from '../../assets/img/checkedGreen.svg';
import onEnter from '../../assets/img/onEnter.svg';
import { Field, Formik, FormikHelpers, FormikValues } from 'formik';
import Input from '../Generics/Inputs/Input';
import * as Yup from 'yup';
import saveCriteriaTemplateAPI from '../../api/services/MasterCriteriaTemplate/saveCriteriaTemplate.service';
import {
    savingMasterData,
    setDataType,
} from '../../redux/slice/MasterCriteriaSave/masterCriteriaSave';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GeneralCriteriaModal from '../MasterCriteriaForm/GeneralCriteriaForm/GeneralCriteriaModal';
import {
    clearGetMasteryData,
    getMasteryCriteriaTemplateCall,
} from '../../redux/slice/GetMasterCriteriaTemplate/getMasteryCriteriaTemplate';
import {
    descriptionValidation,
    nameValidation,
} from '../../constants/ValidationMessages';
interface Values {
    criteriaName: string;
    criteriaDescription: string;
}
export default function SaveCriteria(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const criteriaData = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria
    );
    const editData = useSelector(
        ({ getTemplate }: any) => getTemplate?.templateData
    );
    const templateId = useSelector(
        ({ saveMasterCriteria }: any) => saveMasterCriteria.value
    );
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const [activeCheckIcon, setActiveCheckIcon] = React.useState({
        name: '',
    });
    const [activeDescIcon, setActiveDescIcon] = React.useState({
        description: '',
    });
    const [isEnter, setIsEnter] = React.useState(true);
    const [isDesc, setIsDesc] = React.useState(true);
    const [isloading, setIsloading] = React.useState(false);
    const [isGeneralModalOpen, setIsGeneralModalOpen] = React.useState(false);
    const [isFromGeneralCriteria, setIsFromGeneralCriteria] =
        React.useState(false);
    const initialValues: any = {
        criteriaName: '',
        criteriaDescription: '',
    };
    const initialValuesAfterSave: any = {
        criteriaName: criteriaData?.value?.name,
        criteriaDescription: criteriaData?.value?.description,
    };
    const validationSchema = Yup.object().shape({
        criteriaName: Yup.string()
            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
                nameValidation
            )
            .test(
                'checkDuplicateCriteriaName',
                'Please provide a unique Criteria name',
                async function (value: any) {
                    if (value) {
                        const isDuplicate = criteriaData?.value?.isDuplicate;
                        return !isDuplicate;
                    }
                    return true;
                }
            ),
        criteriaDescription: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/,
            descriptionValidation
        ),
    });
    const saveFormApi = async (values: any): Promise<any> => {
        const data = {
            templateId: criteriaData?.value?.id
                ? criteriaData?.value?.id
                : editData?.id,
            type: 'MASTERY_CRITERIA_TEMPLATE',
            isSystemGenerated: false,
            name: values?.criteriaName
                ? values?.criteriaName
                : criteriaData?.value?.name,
            description: criteriaData?.value?.description
                ? null
                : values?.criteriaDescription,
            createdBy:
                userPermission?.value?.data?.userId || userPermission?.userId,
            modifiedBy:
                userPermission?.value?.data?.userId || userPermission?.userId,
        };
        const res = await saveCriteriaTemplateAPI.saveCriteriaTemplate(data);
        dispatch(savingMasterData(res?.data?.data));
        if (!res?.data?.error) {
            setIsloading(false);
            setActiveCheckIcon({
                name: values?.criteriaName,
            });
            return res?.data;
        } else {
            setIsloading(true);
            return 'error';
        }
    };
    const displayIcon = (): any => {
        if (isEnter) {
            return (
                <div className="absolute inset-y-0 end-0">
                    <img src={onEnter} alt="onEnter" />
                </div>
            );
        } else if (isloading) {
            return (
                <div className="absolute inset-y-0 end-0">
                    <div
                        className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-[#48ABCA]  rounded-full"
                        role="status"
                        aria-label="loading"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else if (
            activeCheckIcon?.name?.length &&
            !criteriaData?.value?.isDuplicate
        ) {
            return (
                <div className="absolute inset-y-0 end-0">
                    <img src={checked} alt="descriptionGreen" />
                </div>
            );
        }
    };
    const descIcon = (): any => {
        if (isDesc) {
            return (
                <div className="absolute inset-y-0 end-0">
                    <img src={onEnter} alt="onEnter" />
                </div>
            );
        } else if (activeDescIcon?.description?.length) {
            return (
                <div className="absolute inset-y-0 end-0">
                    <img src={checked} alt="descriptionGreen" />
                </div>
            );
        }
    };
    const handleKeyPress = async (
        e: any,
        values: FormikValues,
        submitForm: any
    ): Promise<any> => {
        if (e.key == 'Enter') {
            if (e.target.value?.length !== 0) {
                setIsEnter(false);
                setIsloading(true);
                submitForm();
                setTimeout(() => {
                    saveFormApi(values);
                }, 1000);
            }
        }
    };
    const handleKeyDesc = async (
        e: any,
        values: FormikValues,
        submitForm: any
    ): Promise<any> => {
        if (e.key == 'Enter') {
            if (e.target.value?.length !== 0) {
                setIsDesc(false);
                setActiveDescIcon({ description: values?.criteriaDescription });
                submitForm();
                setTimeout(() => {
                    saveFormApi(values);
                }, 1000);
            }
        }
    };
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<any> => {
        setSubmitting(true);
    };
    const handleGeneralModal = (): any => {
        dispatch(clearGetMasteryData());
        dispatch(setDataType('General'));
        setIsGeneralModalOpen(true);
        setIsFromGeneralCriteria(true);
    };
    return (
        <Formik
            initialValues={
                criteriaData?.value?.id
                    ? initialValuesAfterSave
                    : criteriaData?.onEditCriteria
                      ? {
                            criteriaName: editData?.name || '',
                            criteriaDescription: editData?.description || '',
                        }
                      : initialValues
            }
            onSubmit={handleSubmitForm}
            validationSchema={validationSchema}
        >
            {(props: any) => {
                const { values, handleSubmit, submitForm, setFieldTouched } =
                    props;
                return (
                    <>
                        <form
                            onSubmit={handleSubmit}
                            data-testid="save-criteria"
                        >
                            <div className="flex py-4 justify-between">
                                <div className="name flex">
                                    <div className="mr-5">
                                        <div className="flex">
                                            <img
                                                className="w-3 mr-2"
                                                src={customMade}
                                                alt=""
                                            />
                                            <label className="block text-sm font-medium">
                                                Name
                                                <span className="text-red-500 ml-1">
                                                    *
                                                </span>
                                            </label>
                                        </div>
                                        <div className="relative flex">
                                            <Field
                                                hideLabel={true}
                                                autoFocus={true}
                                                label="Name"
                                                isRequired={true}
                                                disabled={
                                                    params?.mode === 'view' ||
                                                    criteriaData?.onViewCriteria
                                                        ? true
                                                        : false
                                                }
                                                id="criteriaName"
                                                name="criteriaName"
                                                data-testid="criteria-name"
                                                className="border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-5 pb-1 outline-none"
                                                component={Input}
                                                value={values?.criteriaName}
                                                onKeyDown={(e: any) => {
                                                    handleKeyPress(
                                                        e,
                                                        values,
                                                        submitForm
                                                    );
                                                    setFieldTouched(
                                                        'criteriaName',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                placeholder="Name"
                                            />
                                            {displayIcon()}
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="flex">
                                            <img
                                                className="w-3 mr-3"
                                                src={descriptionGreen}
                                                alt="descriptionGreen"
                                            />
                                            <label className="block text-sm font-medium">
                                                Description
                                            </label>
                                        </div>
                                        <div className="relative flex">
                                            <Field
                                                hideLabel={true}
                                                isRequired={false}
                                                disabled={
                                                    params?.mode === 'view' ||
                                                    criteriaData?.onViewCriteria
                                                        ? true
                                                        : false
                                                }
                                                id="criteriaDescription"
                                                name="criteriaDescription"
                                                data-testid="criteria-description"
                                                className="border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0 px-6 pb-1 outline-none"
                                                component={Input}
                                                value={
                                                    values?.criteriaDescription
                                                }
                                                onKeyDown={(e: any) => {
                                                    handleKeyDesc(
                                                        e,
                                                        values,
                                                        submitForm
                                                    );
                                                    setFieldTouched(
                                                        'criteriaDescription',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                placeholder="Description"
                                            />
                                            {descIcon()}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`${criteriaData?.value?.id || criteriaData?.onEditCriteria || isFromGeneralCriteria ? '' : 'opacity-20 cursor-not-allowed pointer-events-none'} flex items-end flex-col justify-end `}
                                >
                                    <label
                                        className="block text-base text-md font-bold text-[#1A99C1] cursor-pointer "
                                        onClick={() => handleGeneralModal()}
                                        data-testid="open-general-modal"
                                    >
                                        General Mastery Criteria
                                    </label>
                                    <span>
                                        Fill General Criteria and apply it to
                                        all data types before selecting data
                                        type
                                    </span>
                                </div>
                            </div>
                        </form>
                        {isGeneralModalOpen && (
                            <GeneralCriteriaModal
                                onClose={() => {
                                    dispatch(setDataType('Percent'));
                                    setIsGeneralModalOpen(false);
                                    setIsFromGeneralCriteria(false);
                                    const payload = {
                                        templateId:
                                            criteriaData?.value?.id ||
                                            editData?.id ||
                                            templateId,
                                        dataType: 'Percent',
                                        isProgram: criteriaData?.isProgram
                                            ? true
                                            : false,
                                        temporaryId:
                                            criteriaData?.templateData
                                                ?.temporaryId || '',
                                        addNew:
                                            criteriaData?.value?.id ||
                                            editData?.id ||
                                            templateId?.length
                                                ? false
                                                : true,
                                        isTarget: false,
                                        programId: '',
                                        targetId: '',
                                    };
                                    dispatch(
                                        getMasteryCriteriaTemplateCall(payload)
                                    );
                                }}
                                isFromGeneralCriteria={isFromGeneralCriteria}
                                setIsFromGeneralCriteria={
                                    setIsFromGeneralCriteria
                                }
                                isGeneralModalOpen={isGeneralModalOpen}
                            />
                        )}
                    </>
                );
            }}
        </Formik>
    );
}
