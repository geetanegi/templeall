/* eslint-disable max-lines */
import React, { useEffect, useRef, useState } from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../Generics/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';
import Input from '../../Generics/Inputs/Input';
import { callShortInProgressGoals } from '../../../redux/slice/Intervention/InProgressShortTermLongTerm';
import { setStatusShortTermGoal } from '../../../redux/slice/Intervention/getShortTermGoalById';
import {
    clearGoalLibraryShortTermById,
    getAllGoalLibraryLongTermByDomainId,
    getAllGoalLibraryShortTermLongTermById,
    getGoalLibraryShortTermById,
    setActiveDomainId,
    setActiveLongTermId,
    toggleExpandedDomain,
    toggleExpandedLongTerm,
} from '../../../redux/slice/GoalLibrary/GoalLibraryData';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import GoalLibraryDataApi from '../../../api/services/GoalLibrary/GoalLibraryDataApi.service';
import { useParams } from 'react-router-dom';
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
    interventionPlanLongTermGoalId: string;
}
export default function AddShortTermGoalModal({
    open,
    onClose,
    isCreatedFromSessionNote,
    goalLibrarySlice,
    isEdit,
}: {
    readonly open: boolean;
    readonly onClose: any;
    readonly isCreatedFromSessionNote?: boolean;
    readonly goalLibrarySlice?: any;
    readonly isEdit?: any;
}): React.JSX.Element {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const formikRef = useRef<any>(null);
    const LongTermId = params.longTermGoalId ?? '';
    const initialValues: Values = {
        interventionPlanDomainId: isEdit
            ? goalLibrarySlice?.goalLibraryLongTermById?.[LongTermId]
                  ?.interventionPlanDomainId?.id
            : '',
        name: isEdit ? goalLibrarySlice?.goalLibraryShortTermById?.name : '',
        description: isEdit
            ? goalLibrarySlice.goalLibraryLongTermById?.[
                  params?.longTermGoalId ?? ''
              ]?.id
            : '',
        interventionPlanLongTermGoalId: isEdit
            ? goalLibrarySlice?.goalLibraryShortTermById?.description
            : '',
    };
    const [valuesData, setValuesData] = useState<any>({});
    const [showError, setShowError] = useState<string | null>(null);
    const [domainId, setDomainId] = useState<string | null>(null);
    const labels = ['-2', '-1', '0', '+1', '+2'];
    const appointment = useSelector((state: any) => state?.appointment?.value);
    const optionDomain =
        goalLibrarySlice?.allGoalLibraryDomainByGoalLibraryId?.[
            params?.goalLibraryId ?? params?.id ?? ''
        ]?.map((item: any) => ({
            label: item.name,
            value: item.id,
        })) || [];
    const optionsLongTerm =
        (domainId &&
            goalLibrarySlice?.allGoalLibraryLongTermByDomainId?.[domainId]?.map(
                (item: any) => ({
                    label: item.name,
                    value: item.id,
                })
            )) ||
        [];
    const optionsGoalType =
        goalLibrarySlice?.TypesValue.map((item: any) => ({
            label: item.name,
            value: item.id,
        })) || [];
    const optionsGoalScore =
        goalLibrarySlice?.GoalsValue.map((item: any) => ({
            label: item.name,
            value: item.id,
        })) || [];
    const getError = (data: any): any => {
        if (data?.error) {
            setShowError(data?.description);
            dispatch(clearGoalLibraryShortTermById());
            return;
        }
    };
    const createdFromSessionNote = (): any => {
        if (isCreatedFromSessionNote) {
            onClose(false);
            const payload = {
                providerId: appointment?.primaryProvider?.id || '',
                clientId: appointment?.appointmentWith?.id || '',
            };
            dispatch(callShortInProgressGoals(payload));
            dispatch(setStatusShortTermGoal());
        }
    };
    const showNotificationEdit = (): any => {
        dispatch(
            openNotification({
                success: true,
                title: 'Short Term Goal Edited successfully.',
                description: '',
            })
        );
        dispatch(clearGoalLibraryShortTermById());
        dispatch(
            getGoalLibraryShortTermById({
                id: params.shortTermGoalId,
            })
        );
        dispatch(
            getAllGoalLibraryShortTermLongTermById({
                id: goalLibrarySlice.goalLibraryShortTermById
                    ?.interventionPlanLongTermGoalId?.id,
            })
        );
    };
    const showNotification = (): any => {
        dispatch(
            openNotification({
                success: true,
                title: 'Short Term Goal created successfully.',
                description: '',
            })
        );
        dispatch(clearGoalLibraryShortTermById());
    };
    const toggleDomain = (values: any): any => {
        if (
            !goalLibrarySlice?.expandedDomains.includes(
                values?.interventionPlanDomainId?.value
            )
        ) {
            dispatch(
                toggleExpandedDomain(values?.interventionPlanDomainId?.value)
            );
            dispatch(
                setActiveDomainId(values?.interventionPlanDomainId?.value)
            );
        }
    };
    const toggleLongTerm = (values: any): any => {
        if (
            !goalLibrarySlice?.expandedLongTerms.includes(
                values?.interventionPlanLongTermGoalId
            )
        ) {
            dispatch(
                toggleExpandedLongTerm(values?.interventionPlanLongTermGoalId)
            );
            dispatch(
                setActiveLongTermId(values?.interventionPlanLongTermGoalId)
            );
        }
    };
    const handleSubmitForm = async (values: any): Promise<void> => {
        const data = {
            interventionPlanShortTermGoalId: isEdit
                ? goalLibrarySlice?.goalLibraryShortTermById?.id
                : '',
            interventionLibraryId:
                goalLibrarySlice?.goalLibraryById?.[
                    params?.id || params?.goalLibraryId || ''
                ]?.id,
            interventionPlanDomainId: values?.interventionPlanDomainId,
            interventionPlanLongTermGoalId:
                values?.interventionPlanLongTermGoalId,
            name: values.name.trim(),
            description: values.description,
            isCreatedFromSessionNote,
            attainmentScalingData: valuesData,
            scoreType: values?.scoreType,
            goalScore: values?.goalScore,
        };
        try {
            const res = await GoalLibraryDataApi?.createGoalShortTerm(data);
            getError(res?.data);
            createdFromSessionNote();
            if (isEdit) {
                showNotificationEdit();
            } else {
                showNotification();
            }
            toggleDomain(values);
            toggleLongTerm(values);
            dispatch(
                getAllGoalLibraryShortTermLongTermById({
                    id:
                        values?.interventionPlanLongTermGoalId ||
                        params?.longTermGoalId,
                })
            );
            onClose();
        } catch (error: any) {
            if (error.response && error.response.status === 500) {
                onClose();
                dispatch(
                    openNotification({
                        success: false,
                        title: 'An internal server error occurred. Please try again later.',
                        description: '',
                    })
                );
                dispatch(clearGoalLibraryShortTermById());
            } else {
                setShowError(
                    error.message ||
                        'An unexpected error occurred. Please try again later.'
                );
                dispatch(clearGoalLibraryShortTermById());
            }
        }
    };
    const getGoals = (id: any): void => {
        const domainID = id?.value || id || '';
        setDomainId(domainID);
        dispatch(getAllGoalLibraryLongTermByDomainId({ id: domainID }));
        formikRef?.current?.setFieldValue('interventionPlanLongTermGoalId', '');
    };
    const changeDropdown = (data: any, item: any): void => {
        setValuesData((prev: any) => ({ ...prev, [item]: data }));
    };
    const setValue = (): any => {
        if (goalLibrarySlice.goalLibraryShortTermById?.attainmentScalingData) {
            setValuesData(
                JSON.parse(
                    goalLibrarySlice.goalLibraryShortTermById
                        ?.attainmentScalingData
                ) || {}
            );
        }
    };
    const setValueInterventionPlanDomainId = (): any => {
        if (
            goalLibrarySlice.goalLibraryShortTermById?.interventionPlanDomainId
                ?.name
        ) {
            formikRef.current?.setFieldValue(
                'interventionPlanDomainId',
                goalLibrarySlice.goalLibraryShortTermById
                    ?.interventionPlanDomainId?.id
            );
            setDomainId(
                goalLibrarySlice.goalLibraryShortTermById
                    ?.interventionPlanDomainId?.id
            );
        }
    };
    const setValueInterventionPlanLongTermGoalId = (): any => {
        if (
            goalLibrarySlice.goalLibraryShortTermById
                ?.interventionPlanLongTermGoalId?.name
        ) {
            formikRef.current?.setFieldValue(
                'interventionPlanLongTermGoalId',
                goalLibrarySlice.goalLibraryShortTermById
                    ?.interventionPlanLongTermGoalId?.id
            );
        }
    };
    const setValueScoreType = (): any => {
        if (goalLibrarySlice?.goalLibraryShortTermById) {
            formikRef?.current?.setFieldValue(
                'scoreType',
                goalLibrarySlice?.goalLibraryShortTermById?.scoreType?.id
            );
            formikRef?.current?.setFieldValue(
                'goalScore',
                goalLibrarySlice?.goalLibraryShortTermById?.goalScore?.id
            );
        }
    };
    const setValueInterventionPlanDomainId2 = (): any => {
        if (
            goalLibrarySlice.goalLibraryDomainById?.[params?.domainId || '']
                ?.name
        ) {
            formikRef.current?.setFieldValue(
                'interventionPlanDomainId',
                goalLibrarySlice.goalLibraryDomainById?.[params?.domainId || '']
                    ?.id
            );
            setDomainId(params?.domainId || '');
        }
    };
    const setValueInterventionPlanLongTermGoalId2 = (): any => {
        if (
            goalLibrarySlice.goalLibraryDomainById?.[params?.domainId || '']?.id
        ) {
            if (
                goalLibrarySlice.goalLibraryLongTermById?.[
                    params?.longTermGoalId ?? ''
                ]?.name
            ) {
                formikRef.current?.setFieldValue(
                    'interventionPlanLongTermGoalId',
                    goalLibrarySlice.goalLibraryLongTermById?.[
                        params?.longTermGoalId ?? ''
                    ]?.id
                );
            }
        }
    };
    useEffect(() => {
        if (isEdit) {
            setValue();
            setValueInterventionPlanDomainId();
            setValueInterventionPlanLongTermGoalId();
            setValueScoreType();
        } else {
            setValueInterventionPlanDomainId2();
            setValueInterventionPlanLongTermGoalId2();
        }
    }, [
        goalLibrarySlice.goalLibraryDomainById,
        goalLibrarySlice.goalLibraryLongTermById,
        goalLibrarySlice.goalLibraryShortTermById,
        isEdit,
        params?.domainId,
        params?.longTermGoalId,
    ]);
    const handleCancel = (): void => {
        onClose();
        dispatch(clearGoalLibraryShortTermById());
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
            nameValidation
        ),
        description: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/,
            descriptionValidation
        ),
    });
    return (
        <Modal open={open} id={'add-domain-modal'} expandModal={false}>
            <ModalHeader
                title={isEdit ? 'Edit Short Term Goal' : 'Add Short Term Goal'}
                onExpand={undefined}
                icon={false}
            />
            <ModalBody expandModal={false}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitForm}
                    innerRef={formikRef}
                    validateOnChange
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
                                        onChange={(id: any) => {
                                            setFieldValue(
                                                'interventionPlanDomainId',
                                                id?.[0]
                                            );
                                            getGoals(id?.[0]);
                                        }}
                                        options={optionDomain}
                                    />
                                </div>
                                <div className=" w-[45rem] px-3 mt-4">
                                    <Field
                                        label={'Long Term Goal'}
                                        className="border-none"
                                        name="interventionPlanLongTermGoalId"
                                        autoComplete="off"
                                        id="interventionPlanLongTermGoalId"
                                        isRequired={true}
                                        value={
                                            values?.interventionPlanLongTermGoalId
                                        }
                                        component={Select}
                                        onChange={(id: any) => {
                                            setFieldValue(
                                                'interventionPlanLongTermGoalId',
                                                id?.[0]
                                            );
                                        }}
                                        options={optionsLongTerm}
                                    />
                                </div>
                                <div className="firstName w-[45rem] mt-4 px-3">
                                    <Field
                                        isRequired={true}
                                        className="py-3 px-4  block w-full border-gray-200 rounded-lg outline-none text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        label="Name"
                                        type=""
                                        autoComplete="off"
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
                                {showError && (
                                    <p
                                        className="text-xs text-red-600 pt-2 ps-4"
                                        id="hs-validation-name-error-helper"
                                    >
                                        {showError}
                                    </p>
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
                                <div className=" w-[45rem] px-3 mt-4">
                                    <Field
                                        label={'Score Type'}
                                        className="border-none"
                                        name="scoreType"
                                        autoComplete="off"
                                        id="scoreType"
                                        isRequired={false}
                                        value={values?.scoreType}
                                        component={Select}
                                        onChange={(id: any) => {
                                            setFieldValue('scoreType', id?.[0]);
                                        }}
                                        options={optionsGoalType}
                                    />
                                </div>
                                {values?.scoreType === 69 && (
                                    <div className=" w-[45rem] px-3 mt-4">
                                        <Field
                                            label={'Goal Score'}
                                            className="border-none"
                                            name="goalScore"
                                            autoComplete="off"
                                            id="goalScore"
                                            isRequired={false}
                                            value={values?.goalScore}
                                            component={Select}
                                            onChange={(id: any) => {
                                                setFieldValue(
                                                    'goalScore',
                                                    id?.[0] || id
                                                );
                                            }}
                                            options={optionsGoalScore}
                                        />
                                    </div>
                                )}
                                {values?.scoreType === 70 && (
                                    <div className="flex border rounded-lg mt-4 w-[45rem] border-black">
                                        {labels?.map((item, index) => {
                                            const value = JSON.parse(
                                                isEdit
                                                    ? goalLibrarySlice
                                                          ?.goalLibraryShortTermById
                                                          ?.attainmentScalingData ||
                                                          '{}'
                                                    : '{}'
                                            );
                                            return (
                                                <div
                                                    className="flex-col p-4 border-r-2 justify-center border-black w-1/5"
                                                    key={index}
                                                >
                                                    <label className="text-sm font-medium">
                                                        {item}
                                                    </label>
                                                    <div className="input">
                                                        <Field
                                                            className="border-b-2 border-neutral-400 w-28 border-x-0 border-t-0 border-b-1 outline-0 h-6 p-0 rounded-none"
                                                            label={item}
                                                            type=""
                                                            autoComplete="off"
                                                            isRequired={false}
                                                            id={item}
                                                            name={item}
                                                            value={
                                                                (valuesData &&
                                                                    valuesData[
                                                                        item
                                                                    ]) ||
                                                                (value &&
                                                                    value[item])
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) =>
                                                                changeDropdown(
                                                                    e?.target
                                                                        ?.value,
                                                                    item
                                                                )
                                                            }
                                                            placeholder="Enter"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                                <CreateClientModalActions
                                    onClose={() => handleCancel()}
                                    handleSubmit={handleSubmit}
                                    isDisabled={
                                        !values.name ||
                                        !values?.interventionPlanDomainId ||
                                        !values?.interventionPlanLongTermGoalId
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
