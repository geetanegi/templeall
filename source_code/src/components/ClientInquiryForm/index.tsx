/* eslint-disable max-lines */
import { Field, FieldArray, Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import Input from '../Generics/Inputs/Input';
import Datepicker from 'react-tailwindcss-datepicker';
import { CreateClientInquiryModalAction } from '../Generics/Modal';
import { useDispatch, useSelector } from 'react-redux';
import saveClientInquiryForm from '../../api/services/saveClientInquiryForm.service';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { State } from 'country-state-city';
import Select from '../Generics/Select';
import add from '../../assets/img/addLocation.svg';
import deleteIcon from '../../assets/img/deleteLocation.svg';
import { Gender } from '../../constants/userOnboarding';
import ISO6391 from 'iso-639-1';
import { nameValidation } from '../../constants/ValidationMessages';
import { AppDispatch } from '../../redux/store';
import {
    getOrganizationCall,
    organizationInsurancesByCodeCall,
    organizationLocationByCodeCall,
    organizationServicesByCodeCall,
} from '../../redux/slice/organizationName/organization';
import LogoWhite from '../../assets/img/logos/IrisInsights_white.svg';
import organizationLinkApi from '../../api/services/organizationLink.service';
interface Values {
    parentFirstName: string;
    parentLastName: string;
    cellPhone: number;
    workPhone: number;
    homePhone: number;
    dateOfBirth: any;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    primaryLanguage: string;
    userChildren: {
        childFirstName: string;
        childLastName: string;
        childGender: string;
        childDateOfBirth: string;
        clientAvailability: string;
        services: string[];
        location: string;
        primaryInsurance: string;
        secondaryInsurance: string[];
        isInterestedInPrivatePay: any;
    }[];
}
interface RootState {
    organization: {
        organization: {
            name: string;
        };
        services: string[];
        location: string[];
        insurances: string[];
    };
    organizationLocation: string[];
    getUserPermission: {
        value: {
            data: {
                userId: string;
            };
        };
    };
}
export default function ClientInquiryForm(): React.JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const initialValues: any = {
        parentFirstName: '',
        parentLastName: '',
        cellPhone: '+1',
        workPhone: '+1',
        homePhone: '+1',
        dateOfBirth: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        primaryLanguage: 'English',
        userChildren: [
            {
                childFirstName: '',
                childLastName: '',
                childGender: '',
                childDateOfBirth: '',
                services: null,
                clientAvailability: '',
                location: '',
                primaryInsurance: '',
                secondaryInsurance: '',
                isInterestedInPrivatePay: false,
            },
        ],
    };
    const Language = ISO6391.getAllNames();
    const allState: any = State?.getStatesOfCountry('US');
    const userPermission = useSelector(
        ({ getUserPermission }: RootState) => getUserPermission
    );
    const organizationData = useSelector(
        ({ organization }: RootState) => organization
    );
    const clientAvailability = [
        { time: 'Daytime (8 AM - 1 PM)' },
        { time: 'Afternoon (1 PM - 5 PM)' },
        { time: 'Evening (3 PM - 6 PM)' },
        { time: 'Open Hours ( 8 AM - 6 PM)' },
    ];
    useEffect(() => {
        const payload = {
            code: params?.id,
        };
        dispatch(organizationLocationByCodeCall(payload));
        dispatch(organizationServicesByCodeCall(payload));
        dispatch(organizationInsurancesByCodeCall(payload));
        dispatch(getOrganizationCall(payload));
    }, [dispatch]);
    const emailRegex =
        /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
    const isSubmitDisabled = (values: Values): boolean => {
        const phoneNumber = values?.cellPhone?.toString()?.trim();
        const areUserChildrenFieldsFilled = values.userChildren?.every(
            (child: any) =>
                child.childFirstName?.trim() &&
                child.childLastName?.trim() &&
                child.childGender &&
                child.childDateOfBirth &&
                child.clientAvailability &&
                child.location &&
                (child.primaryInsurance || child.isInterestedInPrivatePay)
        );
        const areAnyFieldsEmpty =
            !values?.parentFirstName.trim() ||
            !values?.parentLastName.trim() ||
            !values?.email.trim() ||
            !phoneNumber ||
            !values?.dateOfBirth ||
            !values?.addressLine1.trim() ||
            !values?.city.trim() ||
            !values?.zipCode.trim() ||
            !values?.state ||
            !areUserChildrenFieldsFilled;
        return areAnyFieldsEmpty;
    };
    const handleSubmitForm = async (values: Values): Promise<any> => {
        const clientData = {
            ...values,
            state: values?.state,
            primaryLanguage: values?.primaryLanguage[0],
            dateOfBirth: (values?.dateOfBirth as any)?.startDate,
            status: 1,
            createdBy: userPermission?.value?.data?.userId,
            userChildren: values?.userChildren?.map((data: any) => ({
                ...data,
                childGender: data?.childGender[0],
                services: data?.services?.map((item: any) => item),
                secondaryInsurance: data?.secondaryInsurance?.map(
                    (insurance: any) => insurance
                ),
                childDateOfBirth: data?.childDateOfBirth?.startDate,
            })),
            code: params?.id,
        };
        const res =
            await saveClientInquiryForm.saveClientInquiryForm(clientData);
        if (!res?.data?.error) {
            setTimeout(() => {
                navigate(ROUTES.postSubmissionIntakeFormPage);
            }, 2000);
        } else {
            return res;
        }
    };
    const handleKeyPress = async (
        e: any,
        values: Values,
        setSubmitting: any
    ): Promise<any> => {
        if (e?.key == 'Enter') {
            if (!isSubmitDisabled(values)) {
                setSubmitting(true);
                handleSubmitForm(values);
            }
        }
    };
    const handleAddChild = (push: any): void => {
        push({
            childFirstName: '',
            childLastName: '',
            childGender: '',
            childDateOfBirth: '',
            services: null,
            clientAvailability: '',
            location: '',
            primaryInsurance: '',
            secondaryInsurance: null,
            isInterestedInPrivatePay: false,
        });
    };
    const twelveYearsAgo = new Date();
    const today = new Date();
    twelveYearsAgo.setFullYear(twelveYearsAgo.getFullYear() - 12);
    const validationSchema = Yup.object({
        parentFirstName: Yup.string()
            .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
            .max(150, nameValidation),
        parentLastName: Yup.string()
            .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
            .max(150, nameValidation),
        email: Yup.string().matches(emailRegex, {
            message:
                'Invalid email format. Ensure it follows the format: username@domain.com',
        }),
        cellPhone: Yup.string().matches(
            /^\+1[0-9-]{1,13}$/,
            'Invalid phone number format'
        ),
        addressLine1: Yup.string().max(
            50,
            'Input cannot exceed the maximum length of 50 characters.'
        ),
        addressLine2: Yup.string().max(
            50,
            'Input cannot exceed the maximum length of 50 characters.'
        ),
        city: Yup.string()
            .matches(/^[a-zA-Z\s]*$/, 'Only alphabets are allowed')
            .max(
                20,
                'Input cannot exceed the maximum length of 20 characters.'
            ),
        zipCode: Yup.string()
            .matches(/^\d{1,10}$/, 'Invalid characters')
            .max(10, 'Input cannot exceed the maximum length of 10 characters'),
        userChildren: Yup.array().of(
            Yup.object({
                childFirstName: Yup.string()
                    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
                    .max(150, nameValidation),
                childLastName: Yup.string()
                    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
                    .max(150, nameValidation),
            })
        ),
        dateOfBirth: Yup.object({
            startDate: Yup.date()
                .min(twelveYearsAgo, `Date shouldn't exceed 12 years ago.`)
                .max(today, `Date cannot be after today's date.`)
                .nullable(),
            endDate: Yup.date()
                .min(
                    twelveYearsAgo,
                    `Date cannot be earlier than 12 years ago.`
                )
                .max(today, `Date shouldn't exceed 12 years ago.`)
                .nullable(),
        })
            .nullable()
            .test(
                'dates-match',
                `Date must be within the last 12 years.`,
                function (value) {
                    if (!value) return true;
                    const { startDate, endDate } = value;
                    if (!startDate || !endDate) return true;
                    // Parse the dates to avoid any issues with string comparison
                    const startDateParsed = new Date(startDate);
                    const endDateParsed = new Date(endDate);
                    // Ensure both dates match and are within the allowed range
                    return (
                        startDateParsed.getTime() === endDateParsed.getTime() &&
                        startDateParsed >= twelveYearsAgo &&
                        endDateParsed <= today
                    );
                }
            ),
    });
    const handleError = async (): Promise<void> => {
        try {
            const res = await organizationLinkApi?.organizationName({
                code: params?.id,
            });
            if (res?.data?.error) {
                navigate(ROUTES.error404);
            }
        } catch (err) {}
    };
    useEffect(() => {
        handleError();
    }, []);
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitForm}
                validationSchema={validationSchema}
            >
                {(props: any) => {
                    const {
                        values,
                        handleSubmit,
                        handleChange,
                        setSubmitting,
                        setFieldValue,
                        setFieldTouched,
                        errors,
                    } = props;
                    function hasErrors(
                        errorVal: FormikErrors<Values>
                    ): boolean {
                        // Exclude non-mandatory fields from error check
                        const nonMandatoryFields = ['homePhone', 'workPhone'];
                        return Object.keys(errorVal).some((field) => {
                            // Only consider fields that are not in the non-mandatory list
                            if (!nonMandatoryFields.includes(field)) {
                                const error =
                                    errorVal[
                                        field as keyof FormikErrors<Values>
                                    ];
                                return (
                                    typeof error === 'string' &&
                                    error.length > 0
                                );
                            }
                            return false;
                        });
                    }
                    const shouldDisable = hasErrors(errors);
                    return (
                        <div data-testid="client-inquiry-form-page">
                            <div
                                className="sticky top-0 z-50 w-full h-16 flex justify-between
                                        items-center bg-gradient-to-r
                                        from-[#47AAC9] from-50% to-transparent"
                            >
                                <div className="ml-4">
                                    <div className=" text-sm font-semibold text-white">
                                        <div className="Branding w-32">
                                            <img
                                                src={LogoWhite}
                                                alt="Branding"
                                                width="150"
                                                height="150"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="intakeForm my-6 mx-12">
                                <h1 className="font-[lato] font-semibold items-center text-center">{`Welcome to ${organizationData?.organization?.name}`}</h1>
                                <form onSubmit={handleSubmit} className="mt-4">
                                    <div className="form h-[32.5rem] shadow-b-0 overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                        <h1 className=" text-lg font-semibold">
                                            Parent/Guardian Details
                                        </h1>
                                        <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                        <div className="mt-5">
                                            <label className="ParentName  text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                Parent/Guardian Name
                                            </label>
                                            <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                *
                                            </label>
                                            <div className="flex ">
                                                <div className="w-[20rem]">
                                                    <Field
                                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0
                                            rounded-none h-5 focus:ring-transparent"
                                                        label=""
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        id="parentFirstName"
                                                        name="parentFirstName"
                                                        component={Input}
                                                        value={
                                                            values.parentFirstName
                                                        }
                                                        onChange={(
                                                            e: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            handleChange(e);
                                                            setFieldTouched(
                                                                'parentFirstName',
                                                                true,
                                                                false
                                                            );
                                                        }}
                                                        placeholder="First Name"
                                                    />
                                                </div>
                                                <div className=" w-[20rem]">
                                                    <Field
                                                        className="  border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0
                                         rounded-none ml-7 h-5 focus:ring-transparent"
                                                        label=""
                                                        autoComplete="off"
                                                        isRequired={false}
                                                        id="parentLastName"
                                                        name="parentLastName"
                                                        component={Input}
                                                        value={
                                                            values.parentLastName
                                                        }
                                                        onChange={(
                                                            e: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            handleChange(e);
                                                            setFieldTouched(
                                                                'parentLastName',
                                                                true,
                                                                false
                                                            );
                                                        }}
                                                        placeholder="Last Name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="email w-[42rem] my-5 ">
                                                <label className="Name text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                    Email Address
                                                </label>
                                                <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                    *
                                                </label>
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0
                                             rounded-none h-9 focus:ring-transparent"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="email"
                                                    name="email"
                                                    component={Input}
                                                    value={values.email}
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        handleChange(e);
                                                        setFieldTouched(
                                                            'email',
                                                            true,
                                                            false
                                                        );
                                                    }}
                                                    placeholder="Enter email"
                                                />
                                            </div>
                                            <div className="DOB w-80 my-5 ml-14">
                                                <label
                                                    htmlFor=""
                                                    className="Name text-zinc-700 text-sm font-bold font-['Lato'] leading-tight"
                                                >
                                                    Date of Birth
                                                </label>
                                                <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                    *
                                                </label>
                                                <Field
                                                    className="border text-"
                                                    label="Dob"
                                                    name="dateOfBirth"
                                                    id="dateOfBirth"
                                                    isRequired={false}
                                                    onChange={handleChange}
                                                >
                                                    {() => (
                                                        <Datepicker
                                                            toggleClassName="absolute rounded-r-lg text-blue-500
                                                left-0 h-full px-3 focus:outline-none
                                                 disabled:opacity-40 disabled:cursor-not-allowed "
                                                            inputClassName="outline-none py-[0.5rem] px-[2rem]  w-[20rem] px-3 border-2 h-10 border-neutral-300 rounded-md text-sm"
                                                            value={
                                                                values?.dateOfBirth
                                                            }
                                                            placeholder="  Select Date"
                                                            onChange={(
                                                                date
                                                            ) => {
                                                                const newValues =
                                                                    {
                                                                        ...values,
                                                                        dateOfBirth:
                                                                            date,
                                                                    };
                                                                props.setValues(
                                                                    newValues
                                                                );
                                                            }}
                                                            popoverDirection="down"
                                                            useRange={false}
                                                            asSingle={true}
                                                            maxDate={new Date()}
                                                            minDate={
                                                                twelveYearsAgo
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                                {errors &&
                                                errors?.dateOfBirth &&
                                                typeof errors?.dateOfBirth !==
                                                    'object' &&
                                                errors?.dateOfBirth?.length ? (
                                                    <label className="text-red-500 text-sm ">
                                                        {errors?.dateOfBirth}
                                                    </label>
                                                ) : (
                                                    <label className="text-red-500 text-sm ">
                                                        {
                                                            errors?.dateOfBirth
                                                                ?.endDate
                                                        }
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-4 w-[66rem]  ">
                                            <div className="celPhone w-[20rem]  mt-1 ">
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                    label="Cell Phone"
                                                    autoComplete="off"
                                                    isRequired={true}
                                                    id="cellPhone"
                                                    name="cellPhone"
                                                    component={Input}
                                                    value={values.cellPhone}
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        handleChange(e);
                                                        setFieldTouched(
                                                            'cellPhone',
                                                            true,
                                                            false
                                                        );
                                                    }}
                                                    onKeyDown={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        handleKeyPress(
                                                            e,
                                                            values,
                                                            setSubmitting
                                                        );
                                                    }}
                                                    placeholder="Enter number"
                                                    maxLength={13}
                                                />
                                            </div>
                                            <div className="homePhone w-[20rem] mx- mt-1">
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                    label="Home Phone"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="homePhone"
                                                    name="homePhone"
                                                    component={Input}
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        handleChange(e);
                                                        setFieldTouched(
                                                            'homePhone',
                                                            true,
                                                            false
                                                        );
                                                    }}
                                                    onKeyDown={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        handleKeyPress(
                                                            e,
                                                            values,
                                                            setSubmitting
                                                        );
                                                    }}
                                                    placeholder="Enter number"
                                                    maxLength={13}
                                                />
                                            </div>
                                            <div className="workPhone w-[20rem] mt-1">
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                    label=" Work Phone"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="workPhone"
                                                    name="workPhone"
                                                    component={Input}
                                                    value={values.workPhone}
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        handleChange(e);
                                                        setFieldTouched(
                                                            'workPhone',
                                                            true,
                                                            false
                                                        );
                                                    }}
                                                    onKeyDown={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        handleKeyPress(
                                                            e,
                                                            values,
                                                            setSubmitting
                                                        );
                                                    }}
                                                    placeholder="Enter number"
                                                    maxLength={13}
                                                />
                                            </div>
                                        </div>
                                        <div className="primaryLanguage w-[20rem] my-3">
                                            <Field
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0'
                                                }
                                                placeholder="Select"
                                                label="Primary Language"
                                                options={Language.map(
                                                    (data: any) => ({
                                                        label: data,
                                                        value: data,
                                                    })
                                                )}
                                                onChange={(
                                                    selectedOption: any
                                                ) => {
                                                    setFieldValue(
                                                        'primaryLanguage',
                                                        selectedOption
                                                    );
                                                }}
                                                autoComplete="off"
                                                showSearch={true}
                                                isRequired={true}
                                                id="primaryLanguage"
                                                name="primaryLanguage"
                                                component={Select}
                                                value={values.primaryLanguage}
                                            />
                                        </div>
                                        <h1 className="font-semibold font-[lato]">
                                            Address Details
                                        </h1>
                                        <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                        <div className="addressLine1 w-[42rem] py-2 mt-3">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                label="Address Line 1"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="addressLine1"
                                                name="addressLine1"
                                                component={Input}
                                                value={values.addresLine1}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'addressLine1',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                placeholder="Enter address"
                                            />
                                        </div>
                                        <div className="addressLine2 w-[42rem] py-2 mt-3">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                label="Address Line 2"
                                                autoComplete="off"
                                                isRequired={false}
                                                id="addressLine2"
                                                name="addressLine2"
                                                component={Input}
                                                value={values.addressLine2}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'addressLine2',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                placeholder="Enter address"
                                            />
                                        </div>
                                        <div className="city w-[42rem] py-2 mt-3">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                label="City"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="city"
                                                name="city"
                                                component={Input}
                                                value={values.city}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'city',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                placeholder="Enter city"
                                            />
                                        </div>
                                        <div className="state w-[42rem] my-5">
                                            <Field
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 focus:border-blue-500 rounded-none focus:ring-0 px-0 ps-0'
                                                }
                                                placeholder="Select"
                                                onChange={(
                                                    selectedOption: any
                                                ) => {
                                                    setFieldValue(
                                                        'state',
                                                        selectedOption?.[0]
                                                    );
                                                }}
                                                options={allState.map(
                                                    (data: any) => ({
                                                        label: data?.name,
                                                        value: data?.name,
                                                    })
                                                )}
                                                label={'State'}
                                                component={Select}
                                                autoComplete="off"
                                                isRequired={true}
                                                showSearch={true}
                                                id="state"
                                                name="state"
                                                value={values?.state}
                                            />
                                        </div>
                                        <div className="zipCode w-[42rem] py-2 mt-3">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                label="Zip Code"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="zipCode"
                                                name="zipCode"
                                                component={Input}
                                                value={values.zipCode}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'zipCode',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                placeholder="Enter zip code"
                                            />
                                        </div>
                                        <h1 className="font-semibold font-[lato]">
                                            Child Information
                                        </h1>
                                        <div className="mb-4 bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                        <FieldArray name="userChildren">
                                            {({
                                                push,
                                                remove,
                                            }: {
                                                push: any;
                                                remove: any;
                                            }) => (
                                                <div>
                                                    {values?.userChildren?.map(
                                                        (
                                                            children: any,
                                                            index: any
                                                        ) => (
                                                            <div key={index}>
                                                                {index > 0 && (
                                                                    <div className="w-[80rem]">
                                                                        <p className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></p>
                                                                        <div
                                                                            className="flex float-right mt-2 "
                                                                            onClick={() =>
                                                                                remove(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    deleteIcon
                                                                                }
                                                                                alt="delete"
                                                                                className="h-[1.2rem] w-[1.2rem]"
                                                                            />
                                                                            <button
                                                                                type="button"
                                                                                className="ml-1 text-[#08627E] text-sm,"
                                                                            >
                                                                                Delete
                                                                                Child
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <label className="ParentName text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                                    {`Child's Name`}
                                                                </label>
                                                                <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                                    *
                                                                </label>
                                                                <div className="flex ">
                                                                    <div className="w-[20rem]">
                                                                        <Field
                                                                            className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0
                                            rounded-none h-7 focus:ring-transparent"
                                                                            label=""
                                                                            autoComplete="off"
                                                                            isRequired={
                                                                                false
                                                                            }
                                                                            id={`userChildren.${index}.childFirstName`}
                                                                            name={`userChildren.${index}.childFirstName`}
                                                                            component={
                                                                                Input
                                                                            }
                                                                            value={
                                                                                children?.childFirstName
                                                                            }
                                                                            onChange={(
                                                                                e: React.ChangeEvent<HTMLInputElement>
                                                                            ) => {
                                                                                handleChange(
                                                                                    e
                                                                                );
                                                                                setFieldTouched(
                                                                                    `userChildren.${index}.childFirstName`,
                                                                                    true,
                                                                                    false
                                                                                );
                                                                            }}
                                                                            isExtracted={`userChildren.${index}.childFirstName`}
                                                                            placeholder="First Name"
                                                                        />
                                                                    </div>
                                                                    <div className="w-[20rem]">
                                                                        <Field
                                                                            className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0
                                         rounded-none ml-7 h-7 focus:ring-transparent"
                                                                            label=""
                                                                            autoComplete="off"
                                                                            isRequired={
                                                                                false
                                                                            }
                                                                            id={`userChildren.${index}.childLastName`}
                                                                            name={`userChildren.${index}.childLastName`}
                                                                            component={
                                                                                Input
                                                                            }
                                                                            onChange={(
                                                                                e: React.ChangeEvent<HTMLInputElement>
                                                                            ) => {
                                                                                handleChange(
                                                                                    e
                                                                                );
                                                                                setFieldTouched(
                                                                                    `userChildren.${index}.childLastName`,
                                                                                    true,
                                                                                    false
                                                                                );
                                                                            }}
                                                                            isExtracted={`userChildren.${index}.childLastName`}
                                                                            placeholder="Last Name"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex">
                                                                    <div className="email w-[42rem] mt-7 ">
                                                                        <Field
                                                                            label="Gender"
                                                                            autoComplete="off"
                                                                            isRequired={
                                                                                true
                                                                            }
                                                                            id={`userChildren.${index}.childGender`}
                                                                            name={`userChildren.${index}.childGender`}
                                                                            inputClassName={
                                                                                'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                                            }
                                                                            component={
                                                                                Select
                                                                            }
                                                                            value={
                                                                                values
                                                                                    ?.userChildren[
                                                                                    index
                                                                                ]
                                                                                    ?.childGender
                                                                            }
                                                                            options={Gender?.map(
                                                                                (
                                                                                    data: any
                                                                                ) => ({
                                                                                    label: data?.gender,
                                                                                    value: data?.gender,
                                                                                })
                                                                            )}
                                                                            onChange={(
                                                                                selectedGender: any
                                                                            ) => {
                                                                                if (
                                                                                    selectedGender?.length
                                                                                ) {
                                                                                    setFieldValue(
                                                                                        `userChildren.${index}.childGender`,
                                                                                        selectedGender
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="DOB w-80 my-5 ml-14">
                                                                        <label
                                                                            htmlFor=""
                                                                            className="Name text-zinc-700 text-sm font-bold font-['Lato'] leading-tight"
                                                                        >
                                                                            Date
                                                                            of
                                                                            Birth
                                                                        </label>
                                                                        <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                                            *
                                                                        </label>
                                                                        <Field
                                                                            className="border "
                                                                            label="Date of Birth"
                                                                            name={`userChildren.${index}.childDateOfBirth`}
                                                                            id={`userChildren.${index}.childDateOfBirth`}
                                                                            isRequired={
                                                                                false
                                                                            }
                                                                            onChange={(
                                                                                e: any
                                                                            ) =>
                                                                                handleChange(
                                                                                    e
                                                                                )
                                                                            }
                                                                        >
                                                                            {({
                                                                                form,
                                                                                field,
                                                                            }: {
                                                                                form: any;
                                                                                field: any;
                                                                            }) => (
                                                                                <Datepicker
                                                                                    toggleClassName="absolute rounded-r-lg text-blue-500 left-0 h-full px-3 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed "
                                                                                    inputClassName="outline-none py-[0.5rem] px-[2rem]  w-[18rem] px-3 border-2 h-10 border-neutral-300 rounded-md text-sm"
                                                                                    value={
                                                                                        field?.value
                                                                                    }
                                                                                    placeholder="  yyyy/mm/dd"
                                                                                    onChange={(
                                                                                        date
                                                                                    ) => {
                                                                                        form.setFieldValue(
                                                                                            `userChildren.${index}.childDateOfBirth`,
                                                                                            date
                                                                                        );
                                                                                    }}
                                                                                    popoverDirection="down"
                                                                                    useRange={
                                                                                        false
                                                                                    }
                                                                                    asSingle={
                                                                                        true
                                                                                    }
                                                                                    maxDate={
                                                                                        new Date()
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </Field>
                                                                        {errors &&
                                                                        errors?.dateOfBirth &&
                                                                        typeof errors?.dateOfBirth !==
                                                                            'object' &&
                                                                        errors
                                                                            ?.dateOfBirth
                                                                            ?.length ? (
                                                                            <label className="text-red-500 text-sm ">
                                                                                {
                                                                                    errors?.dateOfBirth
                                                                                }
                                                                            </label>
                                                                        ) : (
                                                                            <label className="text-red-500 text-sm ">
                                                                                {
                                                                                    errors
                                                                                        ?.dateOfBirth
                                                                                        ?.endDate
                                                                                }
                                                                            </label>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex space-x-11">
                                                                    <div className="services w-[25rem] my-3">
                                                                        <Field
                                                                            placeholder="Select"
                                                                            inputClassName={
                                                                                'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                                            }
                                                                            options={organizationData?.services?.map(
                                                                                (
                                                                                    data: any
                                                                                ) => ({
                                                                                    label: data?.name,
                                                                                    value: data?.id,
                                                                                })
                                                                            )}
                                                                            onChange={(
                                                                                selectedOption: any
                                                                            ) => {
                                                                                setFieldValue(
                                                                                    `userChildren.${index}.services`,
                                                                                    selectedOption
                                                                                );
                                                                            }}
                                                                            label="Desired Services"
                                                                            autoComplete="off"
                                                                            component={
                                                                                Select
                                                                            }
                                                                            isRequired={
                                                                                true
                                                                            }
                                                                            multi={
                                                                                true
                                                                            }
                                                                            id={`userChildren.${index}.services`}
                                                                            name={`userChildren.${index}.services`}
                                                                            value={
                                                                                values
                                                                                    ?.userChildren[
                                                                                    index
                                                                                ]
                                                                                    ?.services
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="locations w-[25rem] my-3">
                                                                        <Field
                                                                            placeholder="Select"
                                                                            inputClassName={
                                                                                'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                                            }
                                                                            options={organizationData?.location?.map(
                                                                                (
                                                                                    data: any
                                                                                ) => ({
                                                                                    label: `${data?.addressLine1}, ${data?.city}, ${data?.state}, ${data?.zipCode}`,
                                                                                    value: data?.id,
                                                                                })
                                                                            )}
                                                                            onChange={(
                                                                                selectedOption: any
                                                                            ) => {
                                                                                setFieldValue(
                                                                                    `userChildren.${index}.location`,
                                                                                    selectedOption?.[0]
                                                                                );
                                                                            }}
                                                                            label="Desired Locations"
                                                                            autoComplete="off"
                                                                            component={
                                                                                Select
                                                                            }
                                                                            isRequired={
                                                                                true
                                                                            }
                                                                            id={`userChildren.${index}.location`}
                                                                            name={`userChildren.${index}.location`}
                                                                            value={
                                                                                values
                                                                                    ?.userChildren[
                                                                                    index
                                                                                ]
                                                                                    ?.locations
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="clientAvailability w-[25rem] my-3">
                                                                        <Field
                                                                            placeholder="Select gender"
                                                                            inputClassName={
                                                                                'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                                            }
                                                                            options={clientAvailability?.map(
                                                                                (
                                                                                    data: any
                                                                                ) => ({
                                                                                    label: data?.time,
                                                                                    value: data.time,
                                                                                })
                                                                            )}
                                                                            onChange={(
                                                                                selectedOption: any
                                                                            ) => {
                                                                                setFieldValue(
                                                                                    `userChildren.${index}.clientAvailability`,
                                                                                    selectedOption?.[0]
                                                                                );
                                                                            }}
                                                                            component={
                                                                                Select
                                                                            }
                                                                            label={`Child's Availability`}
                                                                            isRequired={
                                                                                true
                                                                            }
                                                                            id={`userChildren.${index}.clientAvailability`}
                                                                            name={`userChildren.${index}.clientAvailability`}
                                                                            value={
                                                                                values
                                                                                    ?.userChildren[
                                                                                    index
                                                                                ]
                                                                                    ?.clientAvailability
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex space-x-10">
                                                                    <div className="primaryInsurances w-[25rem] my-3">
                                                                        <Field
                                                                            inputClassName={
                                                                                'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                                            }
                                                                            placeholder="Select"
                                                                            options={organizationData?.insurances?.map(
                                                                                (
                                                                                    data: any
                                                                                ) => ({
                                                                                    label: data?.name,
                                                                                    value: data?.id,
                                                                                })
                                                                            )}
                                                                            onChange={(
                                                                                selectedOption: any
                                                                            ) => {
                                                                                setFieldValue(
                                                                                    `userChildren.${index}.primaryInsurance`,
                                                                                    selectedOption?.[0]
                                                                                );
                                                                            }}
                                                                            component={
                                                                                Select
                                                                            }
                                                                            label="Primary Insurance Provider"
                                                                            isRequired={
                                                                                true
                                                                            }
                                                                            id={`userChildren.${index}.primaryInsurance`}
                                                                            name={`userChildren.${index}.primaryInsurance`}
                                                                            value={
                                                                                values
                                                                                    ?.userChildren[
                                                                                    index
                                                                                ]
                                                                                    ?.primaryInsurance
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="insurances w-[25rem] my-3">
                                                                        <Field
                                                                            inputClassName={
                                                                                'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                                            }
                                                                            placeholder="Select"
                                                                            options={organizationData?.insurances?.map(
                                                                                (
                                                                                    data: any
                                                                                ) => ({
                                                                                    label: data?.name,
                                                                                    value: data?.id,
                                                                                })
                                                                            )}
                                                                            onChange={(
                                                                                selectedOption: any
                                                                            ) => {
                                                                                setFieldValue(
                                                                                    `userChildren.${index}.secondaryInsurance`,
                                                                                    selectedOption
                                                                                );
                                                                            }}
                                                                            multi={
                                                                                true
                                                                            }
                                                                            component={
                                                                                Select
                                                                            }
                                                                            label="Secondary Insurance Provider"
                                                                            id={`userChildren.${index}.secondaryInsurance`}
                                                                            name={`userChildren.${index}.secondaryInsurance`}
                                                                            value={
                                                                                values
                                                                                    ?.userChildren[
                                                                                    index
                                                                                ]
                                                                                    ?.secondaryInsurance
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <h1
                                                                    className=" text-zinc-700 text-sm
                                 font-bold font-['Lato'] leading-tight"
                                                                >
                                                                    Are you
                                                                    interested
                                                                    in hearing
                                                                    about
                                                                    private pay?
                                                                </h1>
                                                                <div className="radioButton flex pb-5">
                                                                    <div className="flex gap-x-6">
                                                                        <div className="flex">
                                                                            <label
                                                                                className=" mt-2 text-sm
                                             text-gray-500 ms-2"
                                                                            >
                                                                                <Field
                                                                                    type="radio"
                                                                                    name={`userChildren.${index}.isInterestedInPrivatePay`}
                                                                                    value="true"
                                                                                />{' '}
                                                                                Yes
                                                                            </label>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <label
                                                                                className="text-sm text-gray-500 ms-2
                                                 mt-2"
                                                                            >
                                                                                <Field
                                                                                    type="radio"
                                                                                    name={`userChildren.${index}.isInterestedInPrivatePay`}
                                                                                    value="false"
                                                                                />{' '}
                                                                                No
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                    <button
                                                        className="flex my-7"
                                                        onClick={(
                                                            e: React.MouseEvent<
                                                                HTMLButtonElement,
                                                                MouseEvent
                                                            >
                                                        ) => {
                                                            e.preventDefault();
                                                            handleAddChild(
                                                                push
                                                            );
                                                        }}
                                                        disabled={
                                                            values.userChildren
                                                                .length >= 5
                                                        }
                                                    >
                                                        <img
                                                            src={add}
                                                            alt=""
                                                            className="h-[1.5rem] w-[1.5rem]"
                                                        />
                                                        <h1 className="text-md ml-2 text-[#08627E]">
                                                            Add Child
                                                        </h1>
                                                    </button>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>
                                    <div className="flex py-4 float-right">
                                        <CreateClientInquiryModalAction
                                            handleSubmit={handleSubmit}
                                            isDisabled={
                                                isSubmitDisabled(values) ||
                                                shouldDisable
                                            }
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    );
                }}
            </Formik>
        </>
    );
}
