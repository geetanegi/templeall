/* eslint-disable max-lines */
import React, { useRef, useEffect } from 'react';
import { Field, Formik, FormikErrors } from 'formik';
import Input from '../../Generics/Inputs/Input';
import dollar from '../../../assets/img/userOnBoarding/dollar.svg';
import {
    insurerResponsibility,
    Frequency,
    Status,
} from '../../../constants/userOnboarding';
import { getClientInsuranceCall } from '../../../redux/slice/GetClientInquiryDetails/getClientInquiryDetails';
import { useDispatch, useSelector } from 'react-redux';
import Datepicker from 'react-tailwindcss-datepicker';
import { EmployeeOnboardingFormActionModal } from '../../Generics/Modal';
import { ROUTES } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import {
    clearChildInfo,
    clearData,
    getChildCall,
    insurancePlanCall,
} from '../../../redux/slice/ClientInsurance/ClientInsurance';
import saveInsuranceApi from '../../../api/services/Users/saveClientInsurance.service';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import SubscriberDetails from './subscriberDetails';
import PatientDetails from './patientDetails';
import {
    clearInsuranceData,
    isInsuranceCopied,
} from '../../../redux/slice/Insurance/insurance';
import { State } from 'country-state-city';
import Select from '../../Generics/Select';
import * as Yup from 'yup';
import { AppDispatch } from '../../../redux/store';

import {
    descriptionValidation,
    nameValidation,
} from '../../../constants/ValidationMessages';
interface RootState {
    getAllClientInquiryDetailsCall: {
        value: { data: string | undefined | any };
    };
    clientInsurance: {
        child: any;
        parent: {
            parentGender: string;
            parentDateOfBirth: string;
            state: string;
            parentFirstName: string;
            parentLastName: string;
            primaryAddress1: string;
            city: string;
            postalCode: string;
            primaryAddress2: string;
        };
        childInfo: { id: number };
    };
    getEmployeeById: { value: { userId: number } };
    authorization: { view: boolean };
    insurance: {
        clientId: number;
        copyInsurance: string;
        insuranceById: {
            coverageFrom: string;
            coverageTo: string;
            frequency: string;
            name: string;
            description: string;
            payerId: string;
            insurerAddressLine1: string;
            insurerAddressLine2: string;
            insurerCity: string;
            insurerState: string;
            insurerZipCode: string;
            insurerResponsibility: string;
            patientResponsibilityAmount: string;
            insuranceContactPhone: string;
            status: string;
            insuranceContactPerson: string;
            insuredId: string;
            id: number;
            insuranceProvider: { id: string };
            userChildId: {
                childGender: string;
                childDateOfBirth: string;
                id: number;
                firstName: string;
                lastName: string;
            };
            subscriberId: {
                relationshipWithSubscriber: string;
                gender: string;
                dob: string;
                state: string;
                id: number;
                policyGroupFeca: string;
                groupName: string;
                useParentDetails: string;
                insuredId: string;
                firstName: string;
                lastName: string;
                addressLine1: string;
                addressLine2: string;
                city: string;
                postalCode: string;
            };
        };
    };
}
export default function AddInsurance(): React.JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const formikRef: any = useRef<HTMLFormElement>(null);
    const allState = State?.getStatesOfCountry('US');
    const insurances = useSelector(
        ({ getAllClientInquiryDetailsCall }: RootState) =>
            getAllClientInquiryDetailsCall?.value?.data
    );
    const insurancePlan = useSelector(
        ({ clientInsurance }: RootState) => clientInsurance
    );
    const parentInfo = useSelector(
        ({ clientInsurance }: RootState) => clientInsurance?.parent
    );
    const modeView = useSelector(
        ({ authorization }: RootState) => authorization?.view
    );
    const childInfo = useSelector(
        ({ clientInsurance }: RootState) => clientInsurance?.child
    );
    const userId = useSelector(
        ({ getEmployeeById }: RootState) => getEmployeeById?.value?.userId
    );
    const insuranceDetail = useSelector(
        ({ insurance }: RootState) => insurance
    );
    interface Values {
        name: string;
        description: string;
        insuranceProviderId: string;
        insurerResponsibility: string;
        frequency: string;
        patientResponsibilityAmount: string;
        coverageFrom: string;
        coverageTo: string;
        insuranceContactPerson: string;
        insuranceContactPhone: number;
        status: string;
        subscriberFirstName: string;
        subscriberLastName: string;
        subscriberGender: string;
        subscriberDob: string;
        insuredId: number;
        policyGroupFeca: string;
        groupName: string;
        subscriberAddressLine1: string;
        subscriberAddressLine2: string;
        subscriberCity: string;
        subscriberState: string;
        subscriberPostalCode: string;
        relationWithSubscriber: string;
        subscriberInsuredId: string;
        userChildId: string;
        childFirstName: string;
        childLastName: string;
        childGender: string;
        ChildDob: string;
        useParentDetails: boolean;
        payerId: number;
        insurerAddressLine1: string;
        insurerAddressLine2: string;
        insurerCity: string;
        insurerState: string;
        insurerZipCode: string;
    }
    const relationshipWithSubscriberObj = insuranceDetail?.insuranceById
        ?.subscriberId?.relationshipWithSubscriber
        ? insuranceDetail?.insuranceById?.subscriberId
              ?.relationshipWithSubscriber
        : '';
    const childData =
        childInfo?.length <= 1
            ? childInfo?.find((data: string) => data)
            : childInfo?.find(
                  (data: { id: number }) =>
                      data?.id === insurancePlan?.childInfo?.id
              );
    const subscriberGenderObj = insuranceDetail?.insuranceById?.subscriberId
        ? insuranceDetail?.insuranceById?.subscriberId?.gender
        : parentInfo?.parentGender
          ? parentInfo?.parentGender
          : '';
    const subscriberDob = insuranceDetail?.insuranceById?.subscriberId
        ? {
              startDate: insuranceDetail?.insuranceById?.subscriberId?.dob,
              endDate: insuranceDetail?.insuranceById?.subscriberId?.dob,
          }
        : parentInfo?.parentDateOfBirth
          ? {
                startDate: parentInfo?.parentDateOfBirth,
                endDate: parentInfo?.parentDateOfBirth,
            }
          : null;
    const childGenderObj = insuranceDetail?.insuranceById?.userChildId
        ?.childGender
        ? insuranceDetail?.insuranceById?.userChildId?.childGender
        : childData?.gender
          ? childData?.gender
          : '';
    const childDob = insuranceDetail?.insuranceById?.userChildId
        ?.childDateOfBirth
        ? {
              startDate:
                  insuranceDetail?.insuranceById?.userChildId?.childDateOfBirth,
              endDate:
                  insuranceDetail?.insuranceById?.userChildId?.childDateOfBirth,
          }
        : childData?.dateOfBirth
          ? {
                startDate: childData?.dateOfBirth,
                endDate: childData?.dateOfBirth,
            }
          : '';
    const subscriberStateObj = insuranceDetail?.insuranceById?.subscriberId
        ? insuranceDetail?.insuranceById?.subscriberId?.state
        : parentInfo?.state
          ? parentInfo?.state
          : '';
    const userChildIdObj = childData?.id
        ? childData?.id
        : insuranceDetail?.insuranceById?.userChildId?.id
          ? insuranceDetail?.insuranceById?.userChildId?.id
          : '';
    const coverageFromObj = insuranceDetail?.insuranceById
        ? {
              startDate: insuranceDetail?.insuranceById?.coverageFrom,
              endDate: insuranceDetail?.insuranceById?.coverageFrom,
          }
        : '';
    const coverageToObj = insuranceDetail?.insuranceById
        ? {
              startDate: insuranceDetail?.insuranceById?.coverageTo,
              endDate: insuranceDetail?.insuranceById?.coverageTo,
          }
        : '';
    const relationWithSubscriber = insuranceDetail?.insuranceById?.subscriberId
        ?.relationshipWithSubscriber
        ? insuranceDetail?.insuranceById?.subscriberId
              ?.relationshipWithSubscriber
        : '';
    const frequencyObj = insuranceDetail?.insuranceById?.frequency
        ? insuranceDetail?.insuranceById?.frequency
        : '';
    const initialValues: any = {
        name: insuranceDetail?.insuranceById?.name || '',
        description: insuranceDetail?.insuranceById?.description || '',
        insuranceProviderId:
            insuranceDetail?.insuranceById?.insuranceProvider?.id || '',
        payerId: insuranceDetail?.insuranceById?.payerId || '',
        insurerAddressLine1:
            insuranceDetail?.insuranceById?.insurerAddressLine1 || '',
        insurerAddressLine2:
            insuranceDetail?.insuranceById?.insurerAddressLine2 || '',
        insurerCity: insuranceDetail?.insuranceById?.insurerCity || '',
        insurerState: insuranceDetail?.insuranceById?.insurerState || '',
        insurerZipCode: insuranceDetail?.insuranceById?.insurerZipCode || '',
        insurerResponsibility:
            insuranceDetail?.insuranceById?.insurerResponsibility || '',
        frequency: frequencyObj,
        patientResponsibilityAmount:
            insuranceDetail?.insuranceById?.patientResponsibilityAmount || '',
        coverageFrom: coverageFromObj,
        coverageTo: coverageToObj,
        insuranceContactPerson:
            insuranceDetail?.insuranceById?.insuranceContactPerson || '',
        insuranceContactPhone:
            insuranceDetail?.insuranceById?.insuranceContactPhone || '+1',
        status: insuranceDetail?.insuranceById?.status || '',
        subscriberFirstName: parentInfo?.parentFirstName || '',
        subscriberLastName: parentInfo?.parentLastName || '',
        subscriberGender: subscriberGenderObj,
        subscriberDob: subscriberDob,
        insuredId: insuranceDetail?.insuranceById?.insuredId || '',
        policyGroupFeca:
            insuranceDetail?.insuranceById?.subscriberId?.policyGroupFeca || '',
        groupName:
            insuranceDetail?.insuranceById?.subscriberId?.groupName || '',
        subscriberAddressLine1: parentInfo?.primaryAddress1 || '',
        subscriberAddressLine2: parentInfo?.primaryAddress2 || '',
        subscriberCity: parentInfo?.city || '',
        subscriberState: subscriberStateObj,
        subscriberPostalCode: parentInfo?.postalCode || '',
        relationWithSubscriber: relationWithSubscriber,
        subscriberInsuredId:
            insuranceDetail?.insuranceById?.subscriberId?.insuredId || '',
        userChildId: userChildIdObj,
        childFirstName: childData?.firstName || '',
        childLastName: childData?.lastName || '',
        childGender: childGenderObj,
        ChildDob: childDob,
        useParentDetails:
            insuranceDetail?.insuranceById?.subscriberId?.useParentDetails ||
            false,
    };
    useEffect(() => {
        dispatch(getClientInsuranceCall({ type: 'ORGANIZATION_DATA' }));
        dispatch(insurancePlanCall());
        dispatch(
            getChildCall({
                parentUserId: userId || insuranceDetail?.clientId,
            })
        );
    }, [dispatch, insuranceDetail?.clientId]);
    const onClose = async (): Promise<any> => {
        navigate(ROUTES.payor);
        dispatch(clearData());
        dispatch(clearInsuranceData());
        dispatch(clearChildInfo());
        dispatch(isInsuranceCopied(false));
    };
    const isSubmitDisabled = (values: Values): boolean => {
        return (
            !values?.insuranceProviderId ||
            !values?.insurerResponsibility ||
            !values?.coverageFrom ||
            !values?.coverageTo ||
            !values?.relationWithSubscriber ||
            !values?.subscriberFirstName ||
            !values?.subscriberLastName ||
            !values?.subscriberAddressLine1 ||
            !values?.subscriberCity ||
            !values?.subscriberState ||
            !values?.subscriberPostalCode ||
            !values?.childFirstName ||
            !values?.childLastName ||
            !values?.childGender ||
            !values?.ChildDob ||
            !values?.insurerAddressLine1 ||
            !values?.insurerCity ||
            !values?.insurerState ||
            !values?.insurerZipCode
        );
    };
    const handleRateChange = (
        e: { target: { value: string } },
        handleChange: (arg0: { target: { value: string } }) => void
    ): void => {
        const value = e.target.value;
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (regex.test(value)) {
            handleChange(e);
        }
    };
    const handleNumber = (
        e: { target: { value: string } },
        handleChange: (arg0: { target: { value: string } }) => void
    ): void => {
        const value = e.target.value;
        const regex = /^[0-9\+\(\)\-\s]*$/;
        if (regex.test(value)) {
            handleChange(e);
        }
    };
    const setOtherFormData = (): void => {
        if (formikRef.current) {
            formikRef?.current?.setFieldValue(
                'name',
                insuranceDetail?.insuranceById?.name
                    ? insuranceDetail?.insuranceById?.name
                    : ''
            );
            formikRef.current.setFieldValue(
                'description',
                insuranceDetail?.insuranceById?.description
                    ? insuranceDetail?.insuranceById?.description
                    : ''
            );
            formikRef.current.setFieldValue(
                'payerId',
                insuranceDetail?.insuranceById?.payerId
                    ? insuranceDetail?.insuranceById?.payerId
                    : ''
            );
            formikRef.current.setFieldValue(
                'insuranceProviderId',
                insuranceDetail?.insuranceById?.insuranceProvider?.id || ''
            );
            formikRef.current.setFieldValue(
                'insurerResponsibility',
                insuranceDetail?.insuranceById?.insurerResponsibility
                    ? insuranceDetail?.insuranceById?.insurerResponsibility
                    : ''
            );
            formikRef.current.setFieldValue(
                'patientResponsibilityAmount',
                insuranceDetail?.insuranceById?.patientResponsibilityAmount
                    ? insuranceDetail?.insuranceById
                          ?.patientResponsibilityAmount
                    : ''
            );
            formikRef.current.setFieldValue('frequency', frequencyObj);
            formikRef.current.setFieldValue('coverageFrom', coverageFromObj);
            formikRef.current.setFieldValue('coverageTo', coverageToObj);
            formikRef.current.setFieldValue(
                'insuranceContactPerson',
                insuranceDetail?.insuranceById?.insuranceContactPerson
                    ? insuranceDetail?.insuranceById?.insuranceContactPerson
                    : ''
            );
            formikRef.current.setFieldValue(
                'insuranceContactPhone',
                insuranceDetail?.insuranceById?.insuranceContactPhone
                    ? insuranceDetail?.insuranceById?.insuranceContactPhone
                    : '+1'
            );
            formikRef.current.setFieldValue(
                'status',
                insuranceDetail?.insuranceById?.status || ''
            );
            formikRef.current.setFieldValue(
                'insurerAddressLine1',
                insuranceDetail?.insuranceById?.insurerAddressLine1
                    ? insuranceDetail?.insuranceById?.insurerAddressLine1
                    : ''
            );
            formikRef.current.setFieldValue(
                'insurerAddressLine2',
                insuranceDetail?.insuranceById?.insurerAddressLine2
                    ? insuranceDetail?.insuranceById?.insurerAddressLine2
                    : ''
            );
            formikRef.current.setFieldValue(
                'insurerCity',
                insuranceDetail?.insuranceById?.insurerCity
                    ? insuranceDetail?.insuranceById?.insurerCity
                    : ''
            );
            formikRef.current.setFieldValue(
                'insurerState',
                insuranceDetail?.insuranceById?.insurerState || ''
            );
            formikRef.current.setFieldValue(
                'insurerZipCode',
                insuranceDetail?.insuranceById?.insurerZipCode
                    ? insuranceDetail?.insuranceById?.insurerZipCode
                    : ''
            );
            formikRef.current.setFieldValue(
                'insuredId',
                insuranceDetail?.insuranceById?.insuredId
                    ? insuranceDetail?.insuranceById?.insuredId
                    : ''
            );
        }
    };
    const setFormData = (): void => {
        if (formikRef.current) {
            formikRef.current.setFieldValue(
                'subscriberFirstName',
                parentInfo?.parentFirstName
                    ? parentInfo?.parentFirstName
                    : insuranceDetail?.insuranceById?.subscriberId?.firstName
            );
            formikRef.current.setFieldValue(
                'subscriberLastName',
                parentInfo?.parentLastName
                    ? parentInfo?.parentLastName
                    : insuranceDetail?.insuranceById?.subscriberId?.lastName
            );
            formikRef.current.setFieldValue(
                'subscriberAddressLine1',
                parentInfo?.primaryAddress1
                    ? parentInfo?.primaryAddress1
                    : insuranceDetail?.insuranceById?.subscriberId?.addressLine1
            );
            formikRef.current.setFieldValue(
                'subscriberAddressLine2',
                parentInfo?.primaryAddress2
                    ? parentInfo?.primaryAddress2
                    : insuranceDetail?.insuranceById?.subscriberId?.addressLine2
            );
            formikRef.current.setFieldValue(
                'subscriberCity',
                parentInfo?.city
                    ? parentInfo?.city
                    : insuranceDetail?.insuranceById?.subscriberId?.city
            );
            formikRef.current.setFieldValue(
                'subscriberState',
                subscriberStateObj
            );
            formikRef.current.setFieldValue(
                'subscriberPostalCode',
                parentInfo?.postalCode
                    ? parentInfo?.postalCode
                    : insuranceDetail?.insuranceById?.subscriberId?.postalCode
            );
            formikRef.current.setFieldValue(
                'subscriberGender',
                subscriberGenderObj
            );
            formikRef.current.setFieldValue('subscriberDob', subscriberDob);
            formikRef.current.setFieldValue(
                'policyGroupFeca',
                insuranceDetail?.insuranceById?.subscriberId?.policyGroupFeca
                    ? insuranceDetail?.insuranceById?.subscriberId
                          ?.policyGroupFeca
                    : ''
            );
            formikRef.current.setFieldValue(
                'groupName',
                insuranceDetail?.insuranceById?.subscriberId?.groupName
                    ? insuranceDetail?.insuranceById?.subscriberId?.groupName
                    : ''
            );
            formikRef.current.setFieldValue(
                'subscriberInsuredId',
                insuranceDetail?.insuranceById?.subscriberId?.insuredId
                    ? insuranceDetail?.insuranceById?.subscriberId?.insuredId
                    : ''
            );
        }
    };
    const setChildFormData = (): void => {
        if (formikRef.current) {
            formikRef.current.setFieldValue('userChildId', userChildIdObj);
            formikRef.current.setFieldValue(
                'childFirstName',
                childData?.firstName
                    ? childData?.firstName
                    : insuranceDetail?.insuranceById?.userChildId?.firstName
            );
            formikRef.current.setFieldValue(
                'childLastName',
                childData?.lastName
                    ? childData?.lastName
                    : insuranceDetail?.insuranceById?.userChildId?.lastName
            );
            formikRef.current.setFieldValue('childGender', childGenderObj);
            formikRef.current.setFieldValue('ChildDob', childDob);
            formikRef.current.setFieldValue(
                'relationWithSubscriber',
                relationshipWithSubscriberObj
            );
            formikRef.current.setFieldValue(
                'useParentDetails',
                insuranceDetail?.insuranceById?.subscriberId?.useParentDetails
            );
        }
    };
    useEffect(() => {
        setOtherFormData();
    }, [dispatch, insuranceDetail?.insuranceById]);
    useEffect(() => {
        setFormData();
    }, [dispatch, parentInfo, insuranceDetail?.insuranceById]);
    useEffect(() => {
        setChildFormData();
    }, [dispatch, childData, insuranceDetail?.insuranceById?.userChildId]);
    const handleSubmitForm = async (values: Values): Promise<any> => {
        const payload = {
            ...values,
            id: insuranceDetail?.copyInsurance
                ? ''
                : insuranceDetail?.insuranceById?.id || '',
            parentId: userId || insuranceDetail?.clientId,
            insuranceProviderId: values?.insuranceProviderId[0],
            frequency: values?.frequency,
            coverageFrom: (values?.coverageFrom as any).startDate,
            coverageTo: (values?.coverageTo as any).endDate,
            status: values?.status,
            subscriberGender: values?.subscriberGender,
            subscriberDob: (values?.subscriberDob as any).startDate,
            subscriberState: values?.subscriberState,
            userChildId: values?.userChildId?.[0],
            relationWithSubscriber: values?.relationWithSubscriber,
            insurerState: values?.insurerState,
        };
        const res = await saveInsuranceApi.saveClientInsurance(payload);
        if (!res?.data?.error) {
            if (insuranceDetail?.insuranceById?.id) {
                if (insuranceDetail?.copyInsurance) {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Insurance details copied successfully.',
                            description: '',
                        })
                    );
                } else {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Insurance details edited successfully.',
                            description: '',
                        })
                    );
                }
            } else {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Insurance details added successfully.',
                        description: '',
                    })
                );
            }
            dispatch(isInsuranceCopied(false));
            dispatch(clearInsuranceData());
            dispatch(clearData());
            dispatch(clearChildInfo());
            setTimeout(() => {
                navigate(ROUTES.payor);
            }, 2000);
        } else {
            return res;
        }
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(
                /^[a-zA-Z0-9\s@#$%^&*()_+\-=\[\]{};:'",.<>/?\\|`~]*$/,
                'Input can include letters, numbers, spaces, and  special characters'
            )
            .max(150, nameValidation),
        description: Yup.string()
            .matches(/^[a-zA-Z0-9\s.,-_/]*$/, descriptionValidation)
            .max(400, descriptionValidation),
        insuranceContactPerson: Yup.string()
            .matches(/^[a-zA-Z\s]*$/, 'Input can include letters and spaces')
            .max(150, nameValidation),
        insuranceContactPhone: Yup.string().matches(
            /^\+1[\d\-]{1,12}$/,
            'Contact number must start with +1 and contain up to 13 characters including digits and -'
        ),
        city: Yup.string()
            .matches(
                /^[a-zA-Z]+$/,
                'Input cannot exceed the maximum length of 20 characters.'
            )
            .max(
                20,
                'Input cannot exceed the maximum length of 20 characters.'
            ),
        insurerAddressLine1: Yup.string()
            .matches(
                /^[a-zA-Z\s]*$/,
                'Input cannot exceed the maximum length of 50 characters.'
            )
            .max(
                50,
                'Input cannot exceed the maximum length of 50 characters.'
            ),
        insurerZipCode: Yup.string().matches(
            /^\d{1,10}$/,
            'Input cannot exceed the maximum length of 10 characters.'
        ),
        childFirstName: Yup.string()
            .matches(/^[a-zA-Z]+$/, nameValidation)
            .max(150, nameValidation),
        childLastName: Yup.string()
            .matches(/^[a-zA-Z]+$/, nameValidation)
            .max(150, nameValidation),
    });
    const currentYear = new Date().getFullYear();
    const twelveYearsAgo = currentYear - 12;
    const minDate = new Date(twelveYearsAgo, 0, 1); // January 1 of twelve years ago
    const maxDate = new Date(currentYear, 11, 31);
    return (
        <div className="addInsurance w-3/4 " data-testid="add-insurance-page">
            <h1 className="flex font-[lato] font-bold my-2">
                <img src={dollar} alt="Insurance" />
                Insurance
            </h1>
            <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
            <Formik
                onSubmit={handleSubmitForm}
                initialValues={initialValues}
                innerRef={formikRef}
                validateOnChange={true}
                validateOnBlur={true}
                validationSchema={validationSchema}
            >
                {(props: any) => {
                    const {
                        handleSubmit,
                        values,
                        handleChange,
                        setFieldValue,
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
                        <form onSubmit={handleSubmit}>
                            <div className="w-full h-[60rem] my-3 shadow-b-0 overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                <div className="otherInformation w-[50rem]">
                                    <Field
                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                                        label="Name"
                                        autoComplete="off"
                                        isRequired={false}
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
                                        placeholder="Enter name"
                                        disabled={modeView}
                                    />
                                    <Field
                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                                        label="Description"
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
                                        placeholder="Enter description"
                                        disabled={modeView}
                                    />
                                    <div
                                        className={`Insurance Provider  w-[50rem] my-3  ${insuranceDetail?.insuranceById?.id ? (insuranceDetail?.copyInsurance ? '' : 'pointer-events-none') : ''}`}
                                    >
                                        <Field
                                            label={'Insurance Provider'}
                                            autoComplete="off"
                                            isRequired={true}
                                            id="insuranceProviderId"
                                            name="insuranceProviderId"
                                            inputClassName={
                                                'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                            }
                                            component={Select}
                                            value={values?.insuranceProviderId}
                                            isDisabled={
                                                insuranceDetail?.insuranceById
                                                    ?.id
                                                    ? insuranceDetail?.copyInsurance &&
                                                      !modeView
                                                        ? false
                                                        : true
                                                    : false
                                            }
                                            options={insurances?.map(
                                                (data: {
                                                    name: string;
                                                    id: number;
                                                }) => ({
                                                    label: data?.name,
                                                    value: data?.id,
                                                })
                                            )}
                                            onChange={(
                                                selectedOption: string
                                            ) => {
                                                setFieldValue(
                                                    'insuranceProviderId',
                                                    selectedOption
                                                );
                                            }}
                                        ></Field>
                                    </div>
                                    <Field
                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                                        label="Payor ID"
                                        autoComplete="off"
                                        isRequired={false}
                                        id="payerId"
                                        name="payerId"
                                        component={Input}
                                        value={values.payerId}
                                        onChange={handleChange}
                                        placeholder="Enter payor id"
                                        disabled={
                                            insuranceDetail?.insuranceById?.id
                                                ? insuranceDetail?.copyInsurance &&
                                                  !modeView
                                                    ? false
                                                    : true
                                                : false
                                        }
                                    />
                                    <Field
                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                                        label="Address Line 1"
                                        autoComplete="off"
                                        isRequired={true}
                                        id="insurerAddressLine1"
                                        name="insurerAddressLine1"
                                        component={Input}
                                        value={values.insurerAddressLine1}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            handleChange(e);
                                            setFieldTouched(
                                                'insurerAddressLine1',
                                                true,
                                                false
                                            );
                                        }}
                                        placeholder="Enter address"
                                        disabled={
                                            insuranceDetail?.insuranceById?.id
                                                ? insuranceDetail?.copyInsurance &&
                                                  !modeView
                                                    ? false
                                                    : true
                                                : false
                                        }
                                    />
                                    <Field
                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                                        label="Address Line 2"
                                        autoComplete="off"
                                        isRequired={false}
                                        id="insurerAddressLine2"
                                        name="insurerAddressLine2"
                                        component={Input}
                                        value={values.insurerAddressLine2}
                                        onChange={handleChange}
                                        placeholder="Enter address"
                                        disabled={
                                            insuranceDetail?.insuranceById?.id
                                                ? insuranceDetail?.copyInsurance &&
                                                  !modeView
                                                    ? false
                                                    : true
                                                : false
                                        }
                                    />
                                    <div className=" location flex my-3 w-[70rem]">
                                        <Field
                                            className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-7 rounded-none focus:ring-transparent mb-6"
                                            label="City"
                                            autoComplete="off"
                                            isRequired={true}
                                            id="insurerCity"
                                            name="insurerCity"
                                            component={Input}
                                            value={values.insurerCity}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                handleChange(e);
                                                setFieldTouched(
                                                    'child',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Enter city"
                                            disabled={
                                                insuranceDetail?.insuranceById
                                                    ?.id
                                                    ? insuranceDetail?.copyInsurance &&
                                                      !modeView
                                                        ? false
                                                        : true
                                                    : false
                                            }
                                        />
                                        <div
                                            className={`w-[17rem] mx-8 ${insuranceDetail?.insuranceById?.id ? (insuranceDetail?.copyInsurance ? '' : 'pointer-events-none') : ''}`}
                                        >
                                            <Field
                                                label={'State'}
                                                autoComplete="off"
                                                placeholder="Select state"
                                                isRequired={true}
                                                showSearch={true}
                                                id="insurerState"
                                                name="insurerState"
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 h-7 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                }
                                                value={values?.insurerState}
                                                component={Select}
                                                isDisabled={
                                                    insuranceDetail
                                                        ?.insuranceById?.id
                                                        ? insuranceDetail?.copyInsurance &&
                                                          !modeView
                                                            ? false
                                                            : true
                                                        : false
                                                }
                                                onChange={(
                                                    selectedStateValue: any[]
                                                ) => {
                                                    setFieldValue(
                                                        'insurerState',
                                                        selectedStateValue[0]
                                                    );
                                                }}
                                                options={allState?.map(
                                                    (data) => ({
                                                        label: data?.name,
                                                        value: data?.name,
                                                    })
                                                )}
                                            />
                                        </div>
                                        <Field
                                            className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-7 rounded-none focus:ring-transparent mb-6"
                                            label="Zip/Postal Code"
                                            autoComplete="off"
                                            isRequired={true}
                                            id="insurerZipCode"
                                            name="insurerZipCode"
                                            component={Input}
                                            value={values.insurerZipCode}
                                            onChange={(e: {
                                                target: { value: string };
                                            }) => {
                                                handleRateChange(
                                                    e,
                                                    handleChange
                                                );
                                                setFieldTouched(
                                                    'insurerZipCode',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Enter zip code"
                                            disabled={
                                                insuranceDetail?.insuranceById
                                                    ?.id
                                                    ? insuranceDetail?.copyInsurance &&
                                                      !modeView
                                                        ? false
                                                        : true
                                                    : false
                                            }
                                        />
                                    </div>
                                    <div className="Insurer Responsibility my-4">
                                        <label className="mb-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                            Insurer Responsibility
                                        </label>
                                        <label className="text-red-700 text-lg font-normal font-['Lato']">
                                            *
                                        </label>
                                        <div className="flex">
                                            {insurerResponsibility?.map(
                                                (data, index) => (
                                                    <div
                                                        key={index}
                                                        className="mx-2"
                                                    >
                                                        <Field
                                                            className="focus:ring-transparent"
                                                            type="radio"
                                                            id={`insurerResponsibility-${data.name}`}
                                                            name="insurerResponsibility"
                                                            value={data?.name}
                                                            checked={
                                                                values.insurerResponsibility ===
                                                                data.name
                                                            }
                                                            onChange={() => {
                                                                setFieldValue(
                                                                    'insurerResponsibility',
                                                                    data?.name
                                                                );
                                                            }}
                                                            disabled={modeView}
                                                        />
                                                        <label
                                                            className="text-sm  text-zinc-600 font-['lato'] m-2"
                                                            htmlFor={`insurerResponsibility-${data.name}`}
                                                        >
                                                            {data?.name}
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <Field
                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-5"
                                        label="Patient Responsibility Amount $"
                                        autoComplete="off"
                                        isRequired={false}
                                        id="patientResponsibilityAmount"
                                        name="patientResponsibilityAmount"
                                        component={Input}
                                        value={
                                            values.patientResponsibilityAmount
                                        }
                                        onChange={(e: {
                                            target: { value: string };
                                        }) => handleRateChange(e, handleChange)}
                                        placeholder="Enter amount"
                                        disabled={modeView}
                                    />
                                    <div className="Frequency w-[50rem] my-3">
                                        <Field
                                            label={'Frequency'}
                                            autoComplete="off"
                                            isRequired={false}
                                            id="frequency"
                                            name="frequency"
                                            value={values?.frequency}
                                            component={Select}
                                            inputClassName={
                                                'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                            }
                                            options={Frequency?.map((data) => ({
                                                label: data?.name,
                                                value: data?.name,
                                            }))}
                                            onChange={(
                                                selectedOption: string[]
                                            ) =>
                                                setFieldValue(
                                                    'frequency',
                                                    selectedOption[0]
                                                )
                                            }
                                            isDisabled={modeView}
                                        ></Field>
                                    </div>
                                    <div className="flex Coverage my-4">
                                        <div className="CoverageForm w-[17rem] mt-2">
                                            <label className="mb-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                Valid From
                                            </label>
                                            <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                *
                                            </label>
                                            <Field
                                                className="border "
                                                label="Coverage From"
                                                name="coverageFrom"
                                                id="coverageFrom"
                                                isRequired={false}
                                                onChange={handleChange}
                                            >
                                                {() => (
                                                    <Datepicker
                                                        toggleClassName="absolute rounded-r-lg text-blue-500 left-0 h-full px-3 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                                                        inputClassName="outline-none py-[0.5rem] px-[2rem] w-[13rem] px-3 border-2 h-10 border-neutral-300 rounded-md text-sm"
                                                        value={
                                                            values?.coverageFrom
                                                        }
                                                        placeholder="yyyy/mm/dd"
                                                        onChange={(date) => {
                                                            const newValues = {
                                                                ...values,
                                                                coverageFrom:
                                                                    date,
                                                            };
                                                            props.setValues(
                                                                newValues
                                                            );
                                                        }}
                                                        popoverDirection="down"
                                                        minDate={minDate}
                                                        maxDate={maxDate}
                                                        useRange={false}
                                                        asSingle={true}
                                                        disabled={modeView}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="CoverageTo w-[18rem]  mt-2 ml-3">
                                            <label className="mb-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                Valid To
                                            </label>
                                            <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                *
                                            </label>
                                            <Field
                                                className="border "
                                                label="Coverage To"
                                                name="coverageTo"
                                                id="coverageTo"
                                                isRequired={false}
                                                onChange={handleChange}
                                            >
                                                {() => (
                                                    <Datepicker
                                                        toggleClassName="absolute rounded-r-lg text-blue-500
                                                        left-0 h-full px-3 focus:outline-none
                                                         disabled:opacity-40 disabled:cursor-not-allowed "
                                                        inputClassName="outline-none py-[0.5rem] px-[2rem] w-[13rem] px-3 border-2 h-10 border-neutral-300 rounded-md text-sm"
                                                        value={
                                                            values?.coverageTo
                                                        }
                                                        placeholder="  yy/mm/dd"
                                                        onChange={(date) => {
                                                            const newValues = {
                                                                ...values,
                                                                coverageTo:
                                                                    date,
                                                            };
                                                            props.setValues(
                                                                newValues
                                                            );
                                                        }}
                                                        popoverDirection="down"
                                                        minDate={minDate}
                                                        maxDate={maxDate}
                                                        useRange={false}
                                                        asSingle={true}
                                                        disabled={
                                                            !values
                                                                ?.coverageFrom
                                                                ?.startDate ||
                                                            modeView
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                    <Field
                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                                        label="Insurance Contact Person"
                                        autoComplete="off"
                                        isRequired={false}
                                        id="insuranceContactPerson"
                                        name="insuranceContactPerson"
                                        component={Input}
                                        value={values.insuranceContactPerson}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            handleChange(e);
                                            setFieldTouched(
                                                'insuranceContactPerson',
                                                true,
                                                false
                                            );
                                        }}
                                        placeholder="Enter name"
                                        disabled={modeView}
                                    />
                                    <Field
                                        className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-6"
                                        label="Insurance Contact Phone"
                                        autoComplete="off"
                                        isRequired={false}
                                        id="insuranceContactPhone"
                                        name="insuranceContactPhone"
                                        component={Input}
                                        value={values.insuranceContactPhone}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            handleNumber(e, handleChange);
                                            setFieldTouched(
                                                'insuranceContactPhone',
                                                true,
                                                false
                                            );
                                        }}
                                        placeholder="Enter number"
                                        maxLength={13}
                                        disabled={modeView}
                                    />
                                    <div className="Status  w-[50rem] my-3">
                                        <Field
                                            label={'Status'}
                                            autoComplete="off"
                                            isRequired={false}
                                            id="status"
                                            name="status"
                                            value={values?.status}
                                            component={Select}
                                            inputClassName={
                                                'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                            }
                                            options={Status?.map((data) => ({
                                                label: data?.name,
                                                value: data?.name,
                                            }))}
                                            onChange={(
                                                selectedStatus: string[]
                                            ) => {
                                                setFieldValue(
                                                    'status',
                                                    selectedStatus[0]
                                                );
                                            }}
                                            isDisabled={modeView}
                                        ></Field>
                                    </div>
                                </div>
                                <SubscriberDetails
                                    values={values}
                                    handleChange={handleChange}
                                    props={props}
                                    handleSubmit={handleSubmit}
                                    setFieldValue={setFieldValue}
                                    isDisabled={modeView}
                                />
                                <PatientDetails
                                    values={values}
                                    handleChange={handleChange}
                                    props={props}
                                    handleSubmit={handleSubmit}
                                    setFieldValue={setFieldValue}
                                    isDisabled={modeView}
                                />
                            </div>
                            <div className="buttons mr-4 my-3 float-right ">
                                <EmployeeOnboardingFormActionModal
                                    handleSubmit={handleSubmit}
                                    onClose={onClose}
                                    isDisabled={
                                        isSubmitDisabled(values) ||
                                        modeView ||
                                        shouldDisable
                                    }
                                />
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}
