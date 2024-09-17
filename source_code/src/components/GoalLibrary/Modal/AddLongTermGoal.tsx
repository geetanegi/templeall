import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../Generics/Modal';
import { useDispatch } from 'react-redux';
import { Formik, Field, FormikProps } from 'formik';
import Input from '../../Generics/Inputs/Input';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import GoalLibraryDataApi from '../../../api/services/GoalLibrary/GoalLibraryDataApi.service';
import { useParams } from 'react-router-dom';
import {
    getAllGoalLibraryDomainByGoalLibraryId,
    getAllGoalLibraryLongTermByDomainId,
    getGoalLibraryLongTermById,
    setActiveDomainId,
    setActiveLongTermId,
    toggleExpandedDomain,
} from '../../../redux/slice/GoalLibrary/GoalLibraryData';
import Select from '../../Generics/Select';
import * as Yup from 'yup';
import {
    descriptionValidation,
    nameValidation,
} from '../../../constants/ValidationMessages';

interface Values {
    interventionPlanDomainId: string | number | any;
    name: string;
    description: string;
}

interface AddLongTermGoalModalProps {
    isEdit?: boolean;
    open: boolean;
    onClose: () => void;
    isCreatedFromSessionNote?: boolean;
    goalLibrarySlice?: any;
}

const AddLongTermGoalModal: React.FC<AddLongTermGoalModalProps> = ({
    isEdit,
    open,
    onClose,
    isCreatedFromSessionNote,
    goalLibrarySlice,
}) => {
    const params = useParams();
    const [optionsData, setOptionsData] = useState<
        Record<string, { value: string; label: string }[]>
    >({});
    const [showError, setShowError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const formikRef = useRef<FormikProps<Values>>(null);
    const LongTermId = params.longTermGoalId ?? '';
    const GoalLibraryLongTermData =
        goalLibrarySlice.goalLibraryLongTermById?.[LongTermId];

    const initialValues: Values = {
        interventionPlanDomainId: isEdit
            ? goalLibrarySlice?.goalLibraryLongTermById?.[LongTermId]
                  ?.interventionPlanDomainId?.id
            : '',
        name: isEdit
            ? goalLibrarySlice?.goalLibraryLongTermById?.[LongTermId]?.name
            : '',
        description: isEdit
            ? goalLibrarySlice?.goalLibraryLongTermById?.[LongTermId]
                  ?.description
            : '',
    };

    const updateOptions = useCallback(
        (key: string) => {
            const data1 =
                goalLibrarySlice?.allGoalLibraryDomainByGoalLibraryId?.[
                    params?.goalLibraryId || params?.id || ''
                ] || [];
            const data = data1.map((item: { id: any; name: any }) => ({
                value: item?.id,
                label: item?.name,
            }));

            setOptionsData((prev) => ({
                ...prev,
                [key]: data,
            }));
        },
        [goalLibrarySlice?.allGoalLibraryDomainByGoalLibraryId, params]
    );

    useEffect(() => {
        if (isEdit) {
            if (GoalLibraryLongTermData?.interventionPlanDomainId) {
                formikRef.current?.setFieldValue(
                    'interventionPlanDomainId',
                    GoalLibraryLongTermData?.interventionPlanDomainId?.id
                );
            }
        } else {
            if (
                goalLibrarySlice?.goalLibraryDomainById &&
                goalLibrarySlice?.goalLibraryDomainById[
                    goalLibrarySlice?.activeDomainId
                ] &&
                !isCreatedFromSessionNote
            ) {
                const domainData =
                    goalLibrarySlice.goalLibraryDomainById[
                        goalLibrarySlice.activeDomainId
                    ];

                formikRef.current?.setFieldValue(
                    'interventionPlanDomainId',
                    domainData?.id
                );

                // Check if GoalLibraryLongTermData is defined before setting values
                if (GoalLibraryLongTermData) {
                    formikRef.current?.setFieldValue(
                        'name',
                        GoalLibraryLongTermData.name || ''
                    );
                    formikRef.current?.setFieldValue(
                        'description',
                        GoalLibraryLongTermData.description || ''
                    );
                }
            }
        }

        updateOptions('domain');
    }, [
        GoalLibraryLongTermData,
        goalLibrarySlice.activeDomainId,
        goalLibrarySlice.goalLibraryDomainById,
        isCreatedFromSessionNote,
        isEdit,
        updateOptions,
    ]);

    const createGoal = async (values: Values): Promise<void> => {
        const data = {
            interventionPlanLongTermGoalId: isEdit
                ? GoalLibraryLongTermData?.id
                : '',
            interventionLibraryId:
                goalLibrarySlice?.goalLibraryById?.[
                    params?.id || params?.goalLibraryId || ''
                ]?.id,
            interventionPlanDomainId: values.interventionPlanDomainId,
            name: values.name,
            description: values.description,
            isCreatedFromSessionNote,
        };
        const domainId = values.interventionPlanDomainId;
        const res = await GoalLibraryDataApi.createGoal(data);

        if (!res?.data?.error) {
            if (isEdit) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Long Term Goal Edited  Successfully.',
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
            dispatch(
                getAllGoalLibraryDomainByGoalLibraryId({
                    id: params?.goalLibraryId || params?.id,
                }) as any
            );
            if (!(goalLibrarySlice?.expandedDomains ?? []).includes(domainId)) {
                dispatch(toggleExpandedDomain(domainId));
                dispatch(setActiveDomainId(values.interventionPlanDomainId));
                dispatch(setActiveLongTermId(null));
            }
            dispatch(
                getGoalLibraryLongTermById({
                    id: GoalLibraryLongTermData?.id as number,
                }) as any
            );
            dispatch(
                getAllGoalLibraryLongTermByDomainId({
                    id: values.interventionPlanDomainId as number,
                }) as any
            );
            dispatch(
                getAllGoalLibraryLongTermByDomainId({
                    id: GoalLibraryLongTermData?.interventionPlanDomainId
                        ?.id as number,
                }) as any
            );
            onClose();
        } else {
            setShowError(res?.data?.description);
        }
    };

    const handleSubmitForm = (values: Values): void => {
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
    });

    return (
        <Modal open={open} id="add-domain-modal" expandModal={false}>
            <ModalHeader
                title={isEdit ? 'Edit Long Term Goal' : 'Add Long Term Goal'}
                onExpand={undefined}
                icon={false}
            />
            <ModalBody expandModal={false}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitForm}
                    validateOnChange
                    innerRef={formikRef}
                    validationSchema={validationSchema}
                >
                    {(props) => {
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
};

export default AddLongTermGoalModal;
