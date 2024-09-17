/* eslint-disable max-lines */
import * as React from 'react';
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
import { callShortInProgressGoals } from '../../../redux/slice/Intervention/InProgressShortTermLongTerm';
import { setStatusShortTermGoal } from '../../../redux/slice/Intervention/getShortTermGoalById';
import {
    getAllInterventionPlanLongTermByDomainId,
    getAllInterventionPlanShortTermLongTermById,
    getInterventionPlanShortTermById,
    toggleExpandedDomain,
    toggleExpandedLongTerm,
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
    interventionPlanLongTermGoalId: string;
    scoreType: any;
}
export default function AddShortTermGoalModal({
    open,
    onClose,
    isCreatedFromSessionNote,
    interventionData,
    isEdit,
}: {
    open: boolean;
    onClose: any;
    isCreatedFromSessionNote?: boolean;
    interventionData?: any;
    isEdit?: any;
}): React.JSX.Element {
    const formikRef: any = React.useRef<any>(null);
    const dispatch = useDispatch<any>();
    const [valuesData, setValuesData] = React.useState<any>({});
    const [showError, setShowError] = React.useState<any>();
    const [domainId, setDomainId] = React.useState<string | null>(null);
    const interventionDataSlice = useSelector(
        (state: any) => state.interventionSlice
    );
    const openFolder = useSelector(
        ({ getDomainById }: any) => getDomainById?.programBookTree
    );
    const InProgressDomainData = useSelector(
        ({ DomainsByUserType }: any) => DomainsByUserType?.domain
    );
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );

    const initialValues: Values = {
        interventionPlanDomainId: '',
        name: isEdit
            ? interventionDataSlice?.interventionPlanShortTermById?.name
            : '',
        description: isEdit
            ? interventionDataSlice?.interventionPlanShortTermById?.description
            : '',
        interventionPlanLongTermGoalId: isEdit
            ? interventionData?.interventionPlanLongTermById?.id ||
              interventionDataSlice?.interventionPlanLongTermById?.id
            : '',
        scoreType:
            interventionData?.interventionPlanShortTermById?.scoreType?.id,
    };
    const optionDomain =
        (InProgressDomainData?.length > 0
            ? InProgressDomainData || []
            : interventionDataSlice?.allInterventionPlanDomainByInterventionId ||
              []
        ).map((item: any) => ({
            label: item.name,
            value: item.id,
        })) || [];
    const optionsLongTerm =
        ((domainId || interventionData?.interventionPlanDomainById?.id) &&
            interventionDataSlice?.allInterventionPlanLongTermByDomainId?.[
                domainId || interventionData?.interventionPlanDomainById?.id
            ]?.map((item: any) => ({
                label: item.name,
                value: item.id,
            }))) ||
        [];
    const goalScores =
        (interventionDataSlice?.GoalsValue &&
            interventionDataSlice?.GoalsValue?.map((item: any) => ({
                label: item.name,
                value: item.id,
            }))) ||
        [];
    const goalTypes =
        (interventionDataSlice?.GoalsValue &&
            interventionDataSlice?.TypesValue?.map((item: any) => ({
                label: item.name,
                value: item.id,
            }))) ||
        [];
    const labels = ['-2', '-1', '0', '+1', '+2'];
    const appointment = useSelector((state: any) => state?.appointment?.value);
    const createGoal = async (values: any): Promise<any> => {
        const data = {
            interventionPlanShortTermGoalId: isEdit
                ? interventionDataSlice?.interventionPlanShortTermById?.id
                : null,
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
        const res = await InterventionDataById?.createShortGoal(data);
        if (!res?.data?.error) {
            if (isCreatedFromSessionNote) {
                onClose(false);
                const payload = {
                    providerId: appointment?.primaryProvider?.id || '',
                    clientId: appointment?.appointmentWith?.id || '',
                };
                dispatch(callShortInProgressGoals(payload));
                dispatch(setStatusShortTermGoal());
            } else {
                if (
                    openFolder[
                        res?.data?.data?.interventionPlanLongTermGoalId?.id
                    ] === false ||
                    openFolder[
                        res?.data?.data?.interventionPlanLongTermGoalId?.id
                    ] === undefined
                ) {
                    dispatch(
                        savingProgramBookTree(
                            res?.data?.data?.interventionPlanLongTermGoalId?.id
                        )
                    );
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
                dispatch(savingProgramBookTree(res?.data?.data?.id));
                dispatch(
                    getAllInterventionPlanShortTermLongTermById({
                        id: values?.interventionPlanLongTermGoalId,
                    })
                );
                dispatch(
                    getAllInterventionPlanShortTermLongTermById({
                        id: interventionData?.interventionPlanShortTermById
                            ?.interventionPlanLongTermGoalId?.id,
                    })
                );
                dispatch(
                    getAllInterventionPlanShortTermLongTermById({
                        id: interventionData?.interventionPlanLongTermById?.id,
                    })
                );
                dispatch(
                    getInterventionPlanShortTermById({
                        id: interventionDataSlice?.interventionPlanShortTermById
                            ?.id,
                    })
                );
                onClose(false);
                if (isEdit) {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Short Term Goal Edited Successfully.',
                            description: '',
                        })
                    );
                    if (
                        !interventionDataSlice?.expandedDomains?.includes(
                            values?.interventionPlanDomainId?.value
                        )
                    ) {
                        dispatch(
                            toggleExpandedDomain(
                                values?.interventionPlanDomainId?.value
                            )
                        );
                        dispatch(
                            toggleExpandedLongTerm(
                                values?.interventionPlanLongTermGoalId
                            )
                        );
                    }
                } else {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Short Term Goal Created Successfully.',
                            description: '',
                        })
                    );
                }
            }
        } else {
            setShowError(res.data.description);
        }
    };
    const handleSubmitForm = (values: any): void => {
        createGoal(values);
    };
    const getGoals = (id: any): void => {
        if (id && (typeof id === 'string' || Array.isArray(id)) && id.length) {
            console.log(true);

            dispatch(
                getAllInterventionPlanLongTermByDomainId({
                    id: id,
                    type: phaseType,
                })
            );
            formikRef?.current?.setFieldValue(
                'interventionPlanLongTermGoalId',
                ''
            );
        } else if (typeof id === 'number') {
            setDomainId(id.toString());
            console.log(true);

            dispatch(
                getAllInterventionPlanLongTermByDomainId({
                    id: id.toString(),
                    type: phaseType,
                })
            );
            formikRef?.current?.setFieldValue(
                'interventionPlanLongTermGoalId',
                ''
            );
        } else {
            console.log(false);
        }
    };
    const changeDropdown = (data: any, item: any): void => {
        setValuesData((prev: any) => ({
            ...prev,
            [item]: data,
        }));
    };
    React.useEffect(() => {
        if (isEdit) {
            if (
                interventionData?.interventionPlanShortTermById
                    ?.attainmentScalingData
            ) {
                setValuesData(
                    JSON.parse(
                        interventionDataSlice?.interventionPlanShortTermById
                            ?.attainmentScalingData || '{}'
                    )
                );
            }
            if (
                interventionData?.interventionPlanShortTermById
                    ?.interventionPlanDomainId
            ) {
                formikRef?.current?.setFieldValue(
                    'interventionPlanDomainId',
                    interventionData?.interventionPlanShortTermById
                        ?.interventionPlanDomainId?.id
                );
            }
            if (
                interventionData?.interventionPlanShortTermById
                    ?.interventionPlanLongTermGoalId
            ) {
                formikRef?.current?.setFieldValue(
                    'interventionPlanLongTermGoalId',
                    interventionDataSlice?.interventionPlanLongTermById?.id ||
                        interventionData?.interventionPlanShortTermById
                            ?.interventionPlanLongTermGoalId?.id
                );
            }
            if (interventionData?.interventionPlanShortTermById) {
                formikRef?.current?.setFieldValue(
                    'scoreType',
                    interventionData?.interventionPlanShortTermById?.scoreType
                        ?.id
                );
                formikRef?.current?.setFieldValue(
                    'goalScore',
                    interventionData?.interventionPlanShortTermById?.goalScore
                        ?.id
                );
            }
        } else {
            if (interventionData?.interventionPlanDomainById) {
                formikRef?.current?.setFieldValue(
                    'interventionPlanDomainId',
                    interventionData?.interventionPlanDomainById?.id
                );
            }
            if (interventionData?.interventionPlanLongTermById) {
                formikRef?.current?.setFieldValue(
                    'interventionPlanLongTermGoalId',
                    interventionDataSlice?.interventionPlanLongTermById?.id ||
                        interventionData?.interventionPlanShortTermById
                            ?.interventionPlanLongTermGoalId?.id
                );
            }
        }
    }, [
        interventionData?.interventionPlanDomainById,
        interventionData?.interventionPlanLongTermById,
        interventionData?.interventionPlanShortTermById,
        interventionDataSlice?.interventionPlanLongTermById?.id,
        interventionDataSlice?.interventionPlanShortTermById
            ?.attainmentScalingData,
        isEdit,
    ]);
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
                    validateOnChange={true}
                    validateOnBlur={true}
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
                                <div className="  w-[45rem] px-3">
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
                                <div className="  w-[45rem] px-3 mt-4">
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
                                                'name',
                                                true,
                                                false
                                            );
                                        }}
                                        placeholder="Description"
                                    />
                                </div>
                                <div className="  w-[45rem] px-3 mt-4">
                                    <Field
                                        label={'Score Type'}
                                        className="border-none"
                                        name="scoreType"
                                        autoComplete="off"
                                        id="scoreType"
                                        isRequired={true}
                                        value={values?.scoreType}
                                        component={Select}
                                        onChange={(id: any) => {
                                            setFieldValue('scoreType', id?.[0]);
                                        }}
                                        options={goalTypes}
                                    />
                                </div>
                                {values?.scoreType === 69 && (
                                    <div className="  w-[45rem] px-3 mt-4">
                                        <Field
                                            label={'Goal score'}
                                            className="border-none"
                                            name="goalScore"
                                            autoComplete="off"
                                            id="goalScore"
                                            isRequired={true}
                                            value={values?.goalScore}
                                            component={Select}
                                            onChange={(id: any) => {
                                                setFieldValue(
                                                    'goalScore',
                                                    id?.[0]
                                                );
                                            }}
                                            options={goalScores}
                                        />
                                    </div>
                                )}
                                {values?.scoreType === 70 && (
                                    <div className="flex border rounded-lg mt-4 w-[45rem] border-black">
                                        {labels?.map((item, index) => {
                                            const value = JSON.parse(
                                                isEdit
                                                    ? interventionDataSlice
                                                          ?.interventionPlanShortTermById
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
                                                            label=""
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
                                    onClose={onClose}
                                    handleSubmit={handleSubmit}
                                    isDisabled={
                                        !values.name ||
                                        !values?.interventionPlanDomainId ||
                                        !values?.interventionPlanLongTermGoalId ||
                                        (values?.scoreType === 70
                                            ? false
                                            : !values?.goalScore)
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
