import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../Generics/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import Input from '../../Generics/Inputs/Input';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import { savingProgramBookTree } from '../../../redux/slice/GetDomainById/getDomainById';
import { callLongInProgressGoals } from '../../../redux/slice/Intervention/InProgressShortTermLongTerm';
import { setStatusLongTermGoal } from '../../../redux/slice/Intervention/getShortTermGoalById';
import AddBulkingTarget from '../../AddProgramModal/AddBulkingTarget';
import {
    getAllInterventionPlanLongTermByDomainId,
    getInterventionPlanLongTermById,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import InterventionDataById from '../../../api/services/Intervention/Service/InterventionDataById.service';
import Select from '../../Generics/Select';
import * as Yup from 'yup';
import {
    descriptionValidation,
    nameValidation,
} from '../../../constants/ValidationMessages';

interface Values {
    interventionPlanDomainId: string;
    name: string;
    description: string;
}
interface Target {
    id: number;
    name: string;
}
export default function AddLongTermGoalModal({
    isEdit,
    open,
    onClose,
    isCreatedFromSessionNote,
    interventionData,
}: {
    readonly isEdit?: boolean;
    readonly open: boolean;
    readonly onClose: any;
    readonly isCreatedFromSessionNote?: boolean;
    readonly interventionData?: any;
}): React.JSX.Element {
    const [optionsData, setOptionsData] = useState<any>([]);
    const [showError, setShowError] = useState<any>();
    const [targets, setTargets] = useState<Target[]>([]);
    const [showAddTargetForm, setShowAddTargetForm] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const dispatch = useDispatch<any>();
    const formikRef: any = useRef<any>(null);
    const initialValues: Values = {
        interventionPlanDomainId: isEdit
            ? interventionData?.interventionPlanLongTermById
                  ?.interventionPlanDomainId?.id
            : '',
        name: isEdit
            ? interventionData?.interventionPlanLongTermById?.name
            : '',
        description: isEdit
            ? interventionData?.interventionPlanLongTermById?.description
            : '',
    };
    const formRefBulking: any = React.useRef<HTMLDivElement>(null);
    const appointment = useSelector((state: any) => state?.appointment?.value);
    const domainData = useSelector(
        ({ interventionDomains }: any) => interventionDomains?.value
    );
    const InProgressDomainData = useSelector(
        ({ DomainsByUserType }: any) => DomainsByUserType?.domain
    );
    const openFolder = useSelector(
        ({ getDomainById }: any) => getDomainById?.programBookTree
    );
    const interventionDomainsData = useSelector(
        (state: any) => state?.interventionSlice?.interventionPlanDomainById
    );
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const updateOptions = useCallback(
        (key: any): void => {
            const Data1 =
                interventionData?.allInterventionPlanDomainByInterventionId ||
                domainData ||
                InProgressDomainData ||
                [];
            const Data = Data1?.map((item: any) => ({
                value: item?.id,
                label: item?.name,
            }));
            setOptionsData((prev: any) => ({
                ...prev,
                [key]: Data,
            }));
        },
        [
            interventionData?.allInterventionPlanDomainByInterventionId,
            domainData,
            InProgressDomainData,
        ]
    );
    useEffect(() => {
        if (interventionDomainsData?.name && !isCreatedFromSessionNote) {
            formikRef?.current?.setFieldValue(
                'interventionPlanDomainId',
                interventionDomainsData?.id
            );
        }
        updateOptions('domain');
    }, [interventionDomainsData, isCreatedFromSessionNote, updateOptions]);
    const createGoal = async (values: any): Promise<any> => {
        const data = {
            interventionPlanLongTermGoalId: isEdit
                ? interventionData?.interventionPlanLongTermById?.id
                : '',
            interventionPlanDomainId: values?.interventionPlanDomainId,
            name: values?.name,
            description: values?.description,
            isCreatedFromSessionNote,
            shortTermGoalData: targets,
        };
        const res = await InterventionDataById.createGoal(data);
        if (!res?.data?.error) {
            if (isCreatedFromSessionNote) {
                const payload = {
                    providerId: appointment?.primaryProvider?.id || '',
                    clientId: appointment?.appointmentWith?.id || '',
                };
                dispatch(callLongInProgressGoals(payload));
                dispatch(setStatusLongTermGoal());
            } else {
                if (
                    openFolder[res?.data?.data?.id] === false ||
                    openFolder[res?.data?.data?.id] === undefined
                ) {
                    dispatch(savingProgramBookTree(res?.data?.data?.id));
                }
                if (
                    openFolder[
                        res?.data?.data?.interventionPlanDomainId?.id
                    ] === false ||
                    openFolder[
                        res?.data?.data?.interventionPlanDomainId?.id
                    ] === undefined
                ) {
                    dispatch(
                        savingProgramBookTree(
                            res?.data?.data?.interventionPlanDomainId?.id
                        )
                    );
                }
                dispatch(
                    getAllInterventionPlanLongTermByDomainId({
                        id: values?.interventionPlanDomainId,
                        type: phaseType,
                    })
                );
                dispatch(
                    getAllInterventionPlanLongTermByDomainId({
                        id: interventionData?.interventionPlanLongTermById
                            ?.interventionPlanDomainId?.id,
                        type: phaseType,
                    })
                );
            }
            onClose(false);
            if (isEdit) {
                dispatch(
                    getInterventionPlanLongTermById({
                        id: interventionData?.interventionPlanLongTermById?.id,
                    })
                );
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Long Term Goal Edited Successfully.',
                        description: '',
                    })
                );
            } else {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Long Term Goal Created Successfully.',
                        description: '',
                    })
                );
            }
        } else {
            setShowError(res?.data?.description);
        }
    };
    const handleSubmitForm = (values: any): void => {
        createGoal(values);
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string()

            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
                nameValidation
            ),
        description: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/,
            descriptionValidation
        ),
        targetName: Yup.string()
            .max(150, nameValidation)
            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
                'Invalid characters in description'
            ),
    });
    return (
        <Modal
            open={open}
            id={'add-domain-modal'}
            expandModal={showAddTargetForm ? true : false}
        >
            <ModalHeader
                title={isEdit ? 'Edit Long Term Goal' : 'Add Long Term Goal'}
                onExpand={undefined}
                icon={false}
            />
            <ModalBody expandModal={false}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitForm}
                    validateOnChange={true}
                    validateOnBlur={true}
                    innerRef={formikRef}
                    validationSchema={validationSchema}
                >
                    {(props: any) => {
                        const {
                            values,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            setFieldTouched,
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className=" w-[45rem] px-3">
                                    <Field
                                        label={'Domain'}
                                        className="border-none"
                                        name="interventionPlanDomainId"
                                        autoComplete="off"
                                        id="interventionPlanDomainId"
                                        isRequired={true}
                                        value={values?.interventionPlanDomainId}
                                        component={Select}
                                        onChange={(id: any) =>
                                            setFieldValue(
                                                'interventionPlanDomainId',
                                                id?.[0]
                                            )
                                        }
                                        options={optionsData.domain}
                                    />
                                </div>
                                <div className="firstName w-[45rem] mt-4 px-3">
                                    <Field
                                        className="py-3 px-4  block w-full border-gray-200 rounded-lg outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        label="Name"
                                        type=""
                                        autoComplete="off"
                                        isRequired={true}
                                        id="name"
                                        name="name"
                                        component={Input}
                                        value={values.name}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            handleChange(e);
                                            setFieldTouched(
                                                'name',
                                                true,
                                                false
                                            );
                                        }}
                                        placeholder="Name"
                                    />
                                </div>
                                {showError ? (
                                    <p
                                        className="text-xs text-red-600 pt-2 ps-4"
                                        id="hs-validation-name-error-helper"
                                    >
                                        {showError}
                                    </p>
                                ) : (
                                    ''
                                )}
                                <div className="firstName w-[45rem] mt-4 px-3">
                                    <Field
                                        className="py-3 px-4  block w-full border-gray-200 rounded-lg outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        label="Description"
                                        type=""
                                        autoComplete="off"
                                        isRequired={false}
                                        id="description"
                                        name="description"
                                        component={Input}
                                        value={values.description}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            handleChange(e);
                                            setFieldTouched(
                                                'description',
                                                true,
                                                false
                                            );
                                        }}
                                        placeholder="Description"
                                    />
                                </div>
                                {!isEdit && (
                                    <AddBulkingTarget
                                        formRefBulking={formRefBulking}
                                        targets={targets}
                                        setTargets={setTargets}
                                        isFromTarget={false}
                                        errorMessage={errorMessage}
                                        setErrorMessage={setErrorMessage}
                                        showAddTargetForm={showAddTargetForm}
                                        setShowAddTargetForm={
                                            setShowAddTargetForm
                                        }
                                    />
                                )}
                                <CreateClientModalActions
                                    onClose={onClose}
                                    handleSubmit={handleSubmit}
                                    isDisabled={
                                        !values.name ||
                                        !values?.interventionPlanDomainId
                                    }
                                />
                            </form>
                        );
                    }}
                </Formik>
            </ModalBody>
        </Modal>
    );
}
