/* eslint-disable max-lines */
import * as React from 'react';
import { Field, Formik, FormikErrors } from 'formik';
import Input from '../Generics/Inputs/Input';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { saveAuthorizationCode } from '../../api/services/saveAuthorizationCode.service';
import Select from '../Generics/Select';
import axios from 'axios';
import { descriptionValidation } from '../../constants/ValidationMessages';
import { editAuthorizationCodeCall } from '../../redux/slice/EditAuthorizationCode/editAuthorizationCode';
import LoaderComponent from '../LoaderComponent';
interface Values {
    name: any;
    groupId: string[];
    code: any;
    description: any;
    codeType: any;
    therapy: string[];
    enforceRate: any;
    calculationType: any;
    defaultUnits: any;
    defaultServiceLocation: any;
    minutesPerUnit: any;
    roundAtHalfway: any;
    defaultMinutes: any;
    modifiers: any;
    visitVerification: false;
    serviceLocation: any;
    serviceAddress: any;
    procedureInformation: any;
    driveTimeAndMiles: any;
    serviceNotes: any;
    adminNotes: any;
    providerSignature: any;
    clientSignature: any;
    clientSignatureFrom: any;
    requiresAuthorization: any;
    enforceSingleTimesheetConversion: false;
    requireScheduleConversion: false;
    basedOnStartTime: false;
    basedOnEndTime: false;
    clientRate: false;
    lockGracePeriod: any;
}
export default function AuthorizationCodeForm(): React.JSX.Element {
    const params = useParams();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const editAuth = useSelector(
        ({ editAuthorizationCode }: any) => editAuthorizationCode
    );
    const optionsData = useSelector(
        ({ metaDataAuthorization }: any) => metaDataAuthorization?.value
    );
    const getDropdownValue = (key: any): any => {
        const data = optionsData?.[key]?.find(
            (item: any) => item.id === editAuth?.value?.[key]?.id
        );
        return data?.id;
    };
    const [dropDown, setDropDown] = React.useState('');

    const groupIdOptions = editAuth?.value?.groupId
        ? editAuth?.value.groupId.map((item: any) => item.id)
        : [];
    const therapyOptions = editAuth?.value?.therapy
        ? editAuth?.value.therapy.map((item: any) => item.id)
        : [];
    const initialValues: any = {
        name: editAuth?.value?.name || '',
        groupId: groupIdOptions || '',
        therapy: therapyOptions || '',
        code: editAuth?.value?.code || '',
        description: editAuth?.value?.description || '',
        codeType: getDropdownValue('codeType') || '',
        enforceRate: getDropdownValue('enforceRate') || '',
        calculationType: getDropdownValue('calculationType') || '',
        defaultUnits: editAuth?.value?.defaultUnits || '',
        defaultServiceLocation:
            getDropdownValue('defaultServiceLocation') || '',
        minutesPerUnit: editAuth?.value?.minutesPerUnit || '',
        roundAtHalfway: getDropdownValue('codeType') || '',
        defaultMinutes: editAuth?.value?.defaultMinutes || '',
        modifiers: editAuth?.value?.modifiers || '',
        visitVerification: editAuth?.value?.visitVerification || '',
        serviceLocation: getDropdownValue('serviceLocation') || '',
        serviceAddress: getDropdownValue('serviceAddress') || '',
        procedureInformation: getDropdownValue('procedureInformation') || '',
        driveTimeAndMiles: getDropdownValue('driveTimeAndMiles') || '',
        serviceNotes: getDropdownValue('serviceNotes') || '',
        adminNotes: getDropdownValue('adminNotes') || '',
        providerSignature: getDropdownValue('providerSignature') || '',
        clientSignature: getDropdownValue('clientSignature') || '',
        clientSignatureFrom: getDropdownValue('clientSignatureFrom') || '',
        requiresAuthorization: getDropdownValue('requiresAuthorization') || '',
        enforceSingleTimesheetConversion:
            editAuth?.value?.enforceSingleTimesheetConversion || '',
        requireScheduleConversion:
            editAuth?.value?.requireScheduleConversion || '',
        basedOnStartTime: editAuth?.value?.basedOnStartTime || '',
        basedOnEndTime: editAuth?.value?.basedOnStartTime || '',
        clientRate: editAuth?.value?.clientRate || '',
        lockGracePeriod: editAuth?.value?.lockGracePeriod || '',
    };
    const validationSchema = Yup.object().shape({
        homePhone: Yup.number().integer('please enter number'),
        code: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{1,10}$/,
            'Input cannot exceed the maximum length of 10 characters.'
        ),
        description: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{1,400}$/,
            descriptionValidation
        ),
    });
    const onClose = async (): Promise<any> => {
        navigate(ROUTES.authorizationCodeGrid);
    };
    const handleSubmitForm = async (values: Values): Promise<any> => {
        const saveData = {
            authorizationCodeId: editAuth?.value?.id,
            groupId: values?.groupId?.map((group: any) => ({ id: group })),
            name: '',
            code: values?.code,
            description: values?.description,
            codeType: values?.codeType?.[0],
            therapy:
                values?.codeType?.[0] === 27
                    ? values?.therapy?.map((data: any) => ({ id: data }))
                    : [],
            enforceRate: values?.enforceRate?.[0],
            calculationType: values?.calculationType?.[0],
            defaultUnits: values?.defaultUnits,
            defaultServiceLocation: values?.defaultServiceLocation?.[0],
            minutesPerUnit: values?.minutesPerUnit,
            roundAtHalfway: values?.roundAtHalfway?.[0],
            defaultMinutes: values?.defaultMinutes,
            modifiers: values?.modifiers,
            visitVerification: values?.visitVerification,
            serviceLocation: values?.serviceLocation?.[0],
            serviceAddress: values?.serviceAddress?.[0],
            procedureInformation: values?.procedureInformation?.[0],
            driveTimeAndMiles: values?.driveTimeAndMiles?.[0],
            serviceNotes: values?.serviceNotes?.[0],
            adminNotes: values?.adminNotes?.[0],
            providerSignature: values?.providerSignature?.[0],
            clientSignature: values?.clientSignature?.[0],
            clientSignatureFrom: values?.clientSignatureFrom?.[0],
            requiresAuthorization: values?.requiresAuthorization?.[0],
            enforceSingleTimesheetConversion:
                values?.enforceSingleTimesheetConversion,
            requireScheduleConversion: values?.requireScheduleConversion,
            basedOnStartTime: values?.basedOnStartTime,
            basedOnEndTime: values?.basedOnEndTime,
            clientRate: values?.clientRate,
            lockGracePeriod: values?.lockGracePeriod,
        };
        try {
            const res =
                await saveAuthorizationCode.saveAuthorizationCodeApi(saveData);
            if (!res?.data?.error) {
                onClose();
                const title = editAuth?.value?.id
                    ? 'Billing Code edited successfully'
                    : 'Billing Code created successfully';
                dispatch(
                    openNotification({
                        success: true,
                        title: title,
                        description: '',
                    })
                );
            } else {
                // Handle any specific error messages returned in the response
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Error',
                        description:
                            res.data.error.message || 'An error occurred',
                    })
                );
            }
        } catch (error: unknown) {
            let errorMessage = 'An unexpected error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }

            // Handle network errors or 500 status codes
            if (axios.isAxiosError(error) && error.response?.status === 500) {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Server Error',
                        description:
                            'There was a problem with the server. Please try again later.',
                    })
                );
            } else {
                dispatch(
                    openNotification({
                        success: false,
                        title: 'Error',
                        description: errorMessage,
                    })
                );
            }
        }
    };
    React.useEffect(() => {
        if (params?.id) {
            dispatch(
                editAuthorizationCodeCall({ authorizationCodeId: params?.id })
            );
        }
    }, [dispatch]);
    return (
        <div className="onboardingForm" data-testid="authorization-code-page">
            <Formik
                onSubmit={handleSubmitForm}
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {(props: any) => {
                    const {
                        handleSubmit,
                        values,
                        setFieldValue,
                        handleChange,
                        setFieldTouched,
                        errors,
                    } = props;
                    function hasErrors(
                        errorVal: FormikErrors<Values>
                    ): boolean {
                        return Object.values(errorVal).some(
                            (error) =>
                                typeof error === 'string' && error.length > 0
                        );
                    }
                    const shouldDisable = hasErrors(errors);
                    return (
                        <>
                            {optionsData ? (
                                <form onSubmit={handleSubmit}>
                                    <div
                                        className={`${editAuth?.viewMode ? 'opacity-70 pointer-events-none' : 'flex mx-5 my-5 shadow-[0_3px_8px_rgb(0,0,0,0.2)] rounded-tl-2xl'}`}
                                    >
                                        <div className="w-4/5  shadow-b-0">
                                            <div className="m-8">
                                                <h1 className="font-[lato] font-semibold">
                                                    Create New Billing Code
                                                </h1>
                                                <div className="bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                                <div className="firstName w-[45rem] mt-4">
                                                    <label className="Name  text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Code
                                                    </label>
                                                    <Field
                                                        data-testid="code-input"
                                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-6 p-0
                                         rounded-none"
                                                        label=""
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        id="code"
                                                        name="code"
                                                        component={Input}
                                                        value={values.code}
                                                        onChange={(
                                                            e: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            handleChange(e);
                                                            setFieldTouched(
                                                                'code',
                                                                true,
                                                                false
                                                            );
                                                        }}
                                                        placeholder="code"
                                                        autoFocus={true}
                                                    />
                                                </div>
                                                <div className="firstName w-[45rem] mt-3">
                                                    <label className="Name  text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Description
                                                    </label>
                                                    <Field
                                                        data-testid="description-input"
                                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-6 p-0
                                         rounded-none"
                                                        label=""
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        id="description"
                                                        name="description"
                                                        component={Input}
                                                        value={
                                                            values.description
                                                        }
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
                                                        placeholder="Please enter description here"
                                                    />
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Code Type
                                                    </label>
                                                    <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                        *
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="codeType"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    true
                                                                }
                                                                options={optionsData?.codeType?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'codeType',
                                                                        fieldValue
                                                                    );
                                                                    setDropDown(
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                value={
                                                                    field.value
                                                                }
                                                                multi={false}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                {Number(dropDown) === 27 && (
                                                    <div className=" w-[45rem] my-1 mt-3">
                                                        <Field
                                                            showSearch={true}
                                                            inputClassName={
                                                                'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                            }
                                                            multi={true}
                                                            label={'Therapies'}
                                                            className="border-none"
                                                            name="therapy"
                                                            autoComplete="off"
                                                            id="therapy"
                                                            isRequired={true}
                                                            value={
                                                                values?.therapy
                                                            }
                                                            component={Select}
                                                            onChange={(
                                                                fieldValue: any
                                                            ) => {
                                                                setFieldValue(
                                                                    'therapy',
                                                                    fieldValue
                                                                );
                                                            }}
                                                            options={
                                                                optionsData?.therapy?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                ) || []
                                                            }
                                                        />
                                                    </div>
                                                )}

                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <Field
                                                        placeholder={'Select'}
                                                        label={'Group'}
                                                        inputClassName={
                                                            'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                        }
                                                        name="groupId"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values?.groupId}
                                                        component={Select}
                                                        showSearch={true}
                                                        multi={true}
                                                        onChange={(
                                                            selectedOption: any
                                                        ) => {
                                                            setFieldValue(
                                                                'groupId',
                                                                selectedOption
                                                            );
                                                        }}
                                                        options={optionsData?.group?.map(
                                                            (data: any) => ({
                                                                label: data?.name,
                                                                value: data?.id,
                                                            })
                                                        )}
                                                    />
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Enforce Rate
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="enforceRate"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    true
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'enforceRate',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                options={optionsData?.enforceRate?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Calculation Type
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="calculationType"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    true
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'calculationType',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.calculationType?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className="firstName w-[45rem] mt-3">
                                                    <label className="Name  text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Default Unit
                                                    </label>
                                                    <Field
                                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-6 p-0
                                         rounded-none"
                                                        label=""
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        id="defaultUnits"
                                                        name="defaultUnits"
                                                        component={Input}
                                                        value={
                                                            values.defaultUnits
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Please enter default unit here"
                                                    />
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Default Service Location
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="defaultServiceLocation"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'defaultServiceLocation',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.defaultServiceLocation?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className="flex">
                                                    <div className="firstName w-[15rem] mt-3">
                                                        <label className="Name  text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                            Minutes Per Unit
                                                        </label>
                                                        <Field
                                                            type="number"
                                                            className=" border-neutral-400  outline-0 h-8 p-0 rounded"
                                                            label=""
                                                            autoComplete="off"
                                                            isRequired={false}
                                                            id="minutesPerUnit"
                                                            name="minutesPerUnit"
                                                            component={Input}
                                                            value={
                                                                values.minutesPerUnit
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <h1 className="font-[lato] font-semibold mt-4">
                                                    Validation
                                                </h1>
                                                <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                                <div className="flex items-center mt-2 h-8 focus:outline-none">
                                                    <label className="text-sm mt-4">
                                                        {'Visit Verification'}
                                                    </label>
                                                    <Field
                                                        className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] mx-3 mt-4"
                                                        type="checkbox"
                                                        autoComplete="off"
                                                        id={'visitVerification'}
                                                        name={
                                                            'visitVerification'
                                                        }
                                                        checked={
                                                            values?.visitVerification
                                                        }
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Service Location
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="serviceLocation"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'serviceLocation',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.serviceLocation?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Service Address
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="serviceAddress"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'serviceAddress',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.serviceAddress?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Procedure Information
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="procedureInformation"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'procedureInformation',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.procedureInformation?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Drive Times and Miles
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="driveTimeAndMiles"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'driveTimeAndMiles',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.driveTimeAndMiles?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Service Notes
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="serviceNotes"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'serviceNotes',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.serviceNotes?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Admin Notes
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="adminNotes"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'adminNotes',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.adminNotes?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Provider Signature
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="providerSignature"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'providerSignature',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.providerSignature?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Client Signature
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="clientSignature"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'clientSignature',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.clientSignature?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className=" w-[45rem] my-1 mt-3">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Client Signature From
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="clientSignatureFrom"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'clientSignatureFrom',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.clientSignatureFrom?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <h1 className="font-[lato] font-semibold mt-4">
                                                    Restrictions
                                                </h1>
                                                <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                                <div className=" w-[45rem] my-1 mt-4">
                                                    <label className="Name mt-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Requires Authorization
                                                    </label>
                                                    <Field
                                                        className="border-none"
                                                        name="requiresAuthorization"
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        value={values}
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Select
                                                                showSearch={
                                                                    false
                                                                }
                                                                multi={false}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={(
                                                                    fieldValue: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        'requiresAuthorization',
                                                                        fieldValue
                                                                    );
                                                                }}
                                                                placeholder={
                                                                    'Select'
                                                                }
                                                                inputClassName={
                                                                    'border-0 border-b border-gray-400 focus:border-blue-500 focus:ring-0'
                                                                }
                                                                options={optionsData?.requiresAuthorization?.map(
                                                                    (
                                                                        data: any
                                                                    ) => ({
                                                                        label: data?.name,
                                                                        value: data?.id,
                                                                    })
                                                                )}
                                                                label={''}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                                <div className="flex  items-center mt-2 h-8 focus:outline-none">
                                                    <label className="text-sm mx-1 mt-1">
                                                        {
                                                            'Enforce Time Sheet Conversion'
                                                        }
                                                    </label>
                                                    <Field
                                                        className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] mx-3"
                                                        type="checkbox"
                                                        autoComplete="off"
                                                        id={
                                                            'enforceSingleTimesheetConversion'
                                                        }
                                                        name={
                                                            'enforceSingleTimesheetConversion'
                                                        }
                                                        checked={
                                                            values?.enforceSingleTimesheetConversion
                                                        }
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex  items-center mt-2 h-8 focus:outline-none">
                                                    <label className="text-sm mx-1 mt-1">
                                                        {
                                                            'Required Schedule Conversion'
                                                        }
                                                    </label>
                                                    <Field
                                                        className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] mx-3"
                                                        type="checkbox"
                                                        autoComplete="off"
                                                        id={
                                                            'requireScheduleConversion'
                                                        }
                                                        name={
                                                            'requireScheduleConversion'
                                                        }
                                                        checked={
                                                            values?.requireScheduleConversion
                                                        }
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex  items-center mt-2 h-8 focus:outline-none">
                                                    <label className="text-sm mx-1 mt-1">
                                                        {
                                                            'Restrict Early Time Sheet Conversion'
                                                        }
                                                    </label>
                                                    <Field
                                                        className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] mx-3"
                                                        type="checkbox"
                                                        autoComplete="off"
                                                        id={'basedOnStartTime'}
                                                        name={
                                                            'basedOnStartTime'
                                                        }
                                                        checked={
                                                            values?.basedOnStartTime
                                                        }
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex  items-center mt-2 h-8 focus:outline-none">
                                                    <label className="text-sm mx-1 mt-1">
                                                        {
                                                            'Restrict Early Time Sheet Conversion'
                                                        }
                                                    </label>
                                                    <Field
                                                        className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] mx-3"
                                                        type="checkbox"
                                                        autoComplete="off"
                                                        id={'basedOnEndTime'}
                                                        name={'basedOnEndTime'}
                                                        checked={
                                                            values?.basedOnEndTime
                                                        }
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex  items-center mt-2 h-8 focus:outline-none">
                                                    <label className="text-sm mx-1 mt-1">
                                                        {'Show Client Rate'}
                                                    </label>
                                                    <Field
                                                        className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] mx-3"
                                                        type="checkbox"
                                                        autoComplete="off"
                                                        id={'clientRate'}
                                                        name={'clientRate'}
                                                        checked={
                                                            values?.clientRate
                                                        }
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>
                                                <div className="firstName w-[45rem] mt-3">
                                                    <label className="Name  text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                        Lock Grace Period
                                                    </label>
                                                    <Field
                                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-6 p-0
                                         rounded-none"
                                                        label=""
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        id="lockGracePeriod"
                                                        name="lockGracePeriod"
                                                        component={Input}
                                                        value={
                                                            values.lockGracePeriod
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Please enter lockGracePeriod here"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center h-20">
                                        <button
                                            data-testid="cancel-button"
                                            type="button"
                                            className="py-2 px-3 mr-5  inline-flex items-center  text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            data-testid="save-button"
                                            type="button"
                                            className="py-2 px-9  mr-5  w-[110px] inline-flex items-center  text-sm font-normal rounded-md border border-transparent bg-[#48ABCA] text-white hover:bg-[#48ABCA]-700 disabled:bg-secondary-200 disabled:opacity-50  disabled:cursor-not-allowed"
                                            onClick={() =>
                                                handleSubmitForm(values)
                                            }
                                            disabled={
                                                (values?.codeType?.[0] === 27
                                                    ? !values?.therapy?.[0] ||
                                                      !values?.codeType?.[0]
                                                    : !values?.codeType?.[0] ||
                                                      editAuth?.viewMode) ||
                                                shouldDisable
                                            }
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <LoaderComponent />
                            )}
                        </>
                    );
                }}
            </Formik>
        </div>
    );
}
