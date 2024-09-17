/* eslint-disable max-lines */
import * as React from 'react';
import { Field, Formik } from 'formik';
import Input from '../Generics/Inputs/Input';
import Datepicker from 'react-tailwindcss-datepicker';
import { EmployeeOnboardingFormActionModal } from '../Generics/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
    getAllRolesCall,
    getSecondaryRolesCall,
} from '../../redux/slice/GetAllRoles/getAllRolesSlice';
import saveEmployeeApi from '../../api/services/saveEmployee.service';
import { useEffect, useState } from 'react';
import { openNotification } from '../../redux/slice/Notification/notifications';
import {
    clearDataById,
    getEmployeeByIdCall,
} from '../../redux/slice/GetEmployeeById/getEmployeeById';
import { serviceTypeByInterventionCall } from '../../redux/slice/ServiceTypeByInterventionType/serviceTypeByIntervention';
import {
    getClientTherapyCall,
    savingValue,
} from '../../redux/slice/users/usersSlice';
import {
    savingClientId,
    savingUserId,
} from '../../redux/slice/Insurance/insurance';
import {
    clearValue,
    savingRoleName,
    setValue,
} from '../../redux/slice/ClientInsurance/ClientInsurance';
import { Gender, statusData } from '../../constants/userOnboarding';
import { getPrimaryProvider } from '../../redux/slice/SchedulingRedux/Scheduling';
import AddUserChild from './addUserChild';
import AddUserLocation from './addUserLocation';
import { ToastContext } from '../../contexts/ToastContext';
import Select1 from '../Generics/Select';
import moment from 'moment';
import { nameValidation } from '../../constants/ValidationMessages';
import { AppDispatch, IRootState } from '../../redux/store';
import {
    account,
    clearAccountData,
} from '../../redux/slice/UserAccount/UserAccount';
import { getUserProfileDataCall } from '../../redux/slice/UserProfileData/userProfileDataSlice';
import { setOnView } from '../../redux/slice/Authorizations/authorization';
interface Values {
    employeeType: string;
    secondaryRoleId: string[];
    firstName: string;
    lastName: string;
    username: string;
    dateOfBirth: string;
    personalCity: string;
    personalState: string;
    personalPostalCode: string;
    cellPhone: string;
    homePhone: string;
    workPhone: string;
    workCity: string;
    workState: string;
    workPostalCode: string;
    status: string;
    primaryAddress1: string;
    primaryAddress2: string;
    mailingAddress1: string;
    mailingAddress2: string;
    gender: string;
    therapySkill: string;
    userChildren: {
        therapyData: string[];
        childFirstName: string;
        childLastName: string;
        childGender: string;
        childDateOfBirth: string;
        referringProvider: string;
        referringProviderCellPhone: string;
        referringProviderFaxNumber: string;
    }[];
    npiNumber: number;
    credentials: string;
    availabilityFrom: any;
    availabilityTo: any;
}
interface RootState {
    getUserPermission: {
        value: {
            data: {
                userId: string;
                orgId: string;
            };
        };
        userId: string;
        orgId: string;
    };
    getEmployeeById: {
        value: {
            roleId: string;
            secondaryRoles: string[];
            dateOfBirth: string;
            id: string;
            status: boolean;
            organizationServiceId: string;
            availabilityFrom: string;
            availabilityTo: string;
            userChildren: string[];
            firstName: string;
            lastName: string;
            email: string;
            personalCity: string;
            personalState: string;
            personalPostalCode: string;
            cellPhone: string;
            homePhone: string;
            workPhone: string;
            workCity: string;
            workState: string;
            workPostalCode: string;
            primaryAddress1: string;
            primaryAddress2: string;
            mailingAddress1: string;
            mailingAddress2: string;
            gender: string;
            npiNumber: string;
            credentials: string;
            imageData: string;
            length: number;
            userId: string;
        };
    };
    clientInsurance: { isDisabled: boolean };
    users: {
        profileData: string;
    };
}

export default function EmployeeOnBoardingForm(): React.JSX.Element {
    const [showError, setShowError] = useState(false);
    const { addToast } = React.useContext(ToastContext);
    const userPermission = useSelector(
        ({ getUserPermission }: RootState) => getUserPermission
    );
    const employeeData = useSelector(
        ({ getEmployeeById }: RootState) => getEmployeeById?.value
    );
    const serviceType = useSelector(
        ({ serviceTypeByInterventionType }: any) =>
            serviceTypeByInterventionType?.value
    );
    const buttonValue = useSelector(
        ({ clientInsurance }: RootState) => clientInsurance?.isDisabled
    );
    const profileData = useSelector(
        ({ users }: RootState) => users?.profileData
    );
    const allUserRoles = useSelector(({ getAllRoles }: any) => getAllRoles);
    const accountDetails = useSelector(({ userAccount }: any) => userAccount);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    React.useEffect(() => {
        const data = {
            heading: '',
            type: 'ROLES',
            assignedTo: userPermission?.value?.data?.userId,
            pagination: { startIndex: 0, noOfRecords: 19 },
            order: '',
            name: '',
            filterValue: '',
            isNotPaginated: true,
        };
        dispatch(getAllRolesCall(data));
        dispatch(serviceTypeByInterventionCall());
        dispatch(getClientTherapyCall());
        dispatch(getPrimaryProvider());
    }, [dispatch, userPermission]);

    const roleName = allUserRoles?.value?.find(
        (name: any) => name?.id === employeeData?.roleId
    );
    const dobObj = accountDetails?.userDetails?.dateOfBirth
        ? {
              startDate:
                  accountDetails?.userDetails?.dateOfBirth?.split('T')[0],
              endDate: accountDetails?.userDetails?.dateOfBirth?.split('T')[0],
              disabled: false,
          }
        : employeeData?.dateOfBirth
          ? {
                startDate: employeeData?.dateOfBirth?.split('T')[0],
                endDate: employeeData?.dateOfBirth?.split('T')[0],
                disabled: false,
            }
          : '';
    const twelveYearsAgo = new Date();
    const today = new Date();
    twelveYearsAgo.setFullYear(twelveYearsAgo?.getFullYear() - 12);
    const status = accountDetails?.userDetails?.id
        ? accountDetails?.userDetails?.status === true
            ? 'Active'
            : 'Inactive'
        : employeeData?.id
          ? employeeData?.status === true
              ? 'Active'
              : 'Inactive'
          : '';

    const availabilityFromObj = accountDetails?.userDetails?.availabilityFrom
        ? {
              startDate:
                  accountDetails?.userDetails?.availabilityFrom?.split('T')[0],
              endDate:
                  accountDetails?.userDetails?.availabilityFrom?.split('T')[0],
              disabled: false,
          }
        : employeeData?.availabilityFrom
          ? {
                startDate: employeeData?.availabilityFrom?.split('T')[0],
                endDate: employeeData?.availabilityFrom?.split('T')[0],
                disabled: false,
            }
          : '';
    const availabilityToObj = accountDetails?.userDetails?.availabilityTo
        ? {
              startDate:
                  accountDetails?.userDetails?.availabilityTo?.split('T')[0],
              endDate:
                  accountDetails?.userDetails?.availabilityTo?.split('T')[0],
              disabled: false,
          }
        : employeeData?.availabilityTo
          ? {
                startDate: employeeData?.availabilityTo?.split('T')[0],
                endDate: employeeData?.availabilityTo?.split('T')[0],
                disabled: false,
            }
          : '';
    const userChildrenData = employeeData?.userChildren?.map((data: any) => ({
        childId: data?.id,
        childFirstName: data?.firstName,
        childLastName: data?.lastName,
        childGender: data?.childGender,
        childDateOfBirth: {
            startDate: data?.childDateOfBirth,
            endDate: data?.childDateOfBirth,
        },
        therapyData: data?.therapyData
            ? data?.therapyData.map((item: any) => ({
                  value: item?.id,
                  label: item?.name,
              }))
            : '',
        referringProvider: data?.referringProvider?.id
            ? {
                  value: data?.referringProvider?.id,
                  label: `${data?.referringProvider?.firstName}: ${data?.referringProvider?.lastName}`,
              }
            : '',
        referringProviderCellPhone: data?.referringProviderCellPhone,
        referringProviderFaxNumber: data?.referringProviderFaxNumber,
        edited: false,
    }));
    const childDetails = accountDetails?.userDetails?.userChildren?.map(
        (data: any) => ({
            childId: data?.id,
            childFirstName: data?.firstName,
            childLastName: data?.lastName,
            childGender: data?.childGender,
            childDateOfBirth: {
                startDate: data?.childDateOfBirth,
                endDate: data?.childDateOfBirth,
            },
            therapyData: data?.therapyData
                ? data?.therapyData.map((item: any) => ({
                      value: item?.id,
                      label: item?.name,
                  }))
                : '',
            referringProvider: data?.referringProvider?.id
                ? {
                      value: data?.referringProvider?.id,
                      label: `${data?.referringProvider?.firstName}: ${data?.referringProvider?.lastName}`,
                  }
                : '',
            referringProviderCellPhone: data?.referringProviderCellPhone,
            referringProviderFaxNumber: data?.referringProviderFaxNumber,
            edited: false,
        })
    );

    interface Role {
        secondaryRoleId: number;
    }

    const secondaryRoles: Role[] =
        accountDetails?.userDetails?.secondaryRoles ?? [];

    const secondaryRole = secondaryRoles.map(
        (role: Role) => role.secondaryRoleId
    );

    const secondaryRoleObj = employeeData?.secondaryRoles?.map(
        (item: any) => item?.secondaryRoleId
    );

    const initialValues: any = {
        employeeType:
            roleName?.id || accountDetails?.userDetails?.primaryRoleId || '',
        secondaryRoleId: secondaryRoleObj || secondaryRole || '',
        firstName:
            employeeData?.firstName ||
            accountDetails?.userDetails?.firstName ||
            '',
        lastName:
            employeeData?.lastName ||
            accountDetails?.userDetails.lastName ||
            '',
        username:
            employeeData?.email || accountDetails?.userDetails?.email || '',
        dateOfBirth: dobObj,
        personalCity:
            employeeData?.personalCity ||
            accountDetails?.userDetails?.personalCity ||
            '',
        personalState:
            employeeData?.personalState ||
            accountDetails?.userDetails?.personalState ||
            '',
        personalPostalCode:
            employeeData?.personalPostalCode ||
            accountDetails?.userDetails?.personalPostalCode ||
            '',
        cellPhone:
            employeeData?.cellPhone ||
            accountDetails?.userDetails?.cellPhone ||
            '+1',
        homePhone:
            employeeData?.homePhone ||
            accountDetails?.userDetails?.homePhone ||
            '+1',
        workPhone:
            employeeData?.workPhone ||
            accountDetails?.userDetails?.workPhone ||
            '+1',
        workCity:
            employeeData?.workCity ||
            accountDetails?.userDetails?.workCity ||
            '',
        workState:
            employeeData?.workState ||
            accountDetails?.userDetails?.workState ||
            '',
        workPostalCode:
            employeeData?.workPostalCode ||
            accountDetails?.userDetails?.workPostalCode ||
            '',
        status: status,
        primaryAddress1:
            employeeData?.primaryAddress1 ||
            accountDetails?.userDetails?.primaryAddress1 ||
            '',
        primaryAddress2:
            employeeData?.primaryAddress2 ||
            accountDetails?.userDetails?.primaryAddress2 ||
            '',
        mailingAddress1:
            employeeData?.mailingAddress1 ||
            accountDetails?.userDetails?.mailingAddress1 ||
            '',
        mailingAddress2:
            employeeData?.mailingAddress2 ||
            accountDetails?.userDetails?.mailingAddress2 ||
            '',
        gender:
            employeeData?.gender || accountDetails?.userDetails?.gender || '',
        therapySkill:
            employeeData?.organizationServiceId ||
            accountDetails?.userDetails?.organizationServiceId ||
            '',
        userChildren: userChildrenData ||
            childDetails || [
                {
                    therapyData: null,
                    childFirstName: '',
                    childLastName: '',
                    childGender: '',
                    childDateOfBirth: '',
                    referringProvider: '',
                    referringProviderCellPhone: '',
                    referringProviderFaxNumber: '',
                    edited: false,
                },
            ],
        npiNumber:
            employeeData?.npiNumber ||
            accountDetails?.userDetails.npiNumber ||
            '',
        credentials:
            employeeData?.credentials ||
            accountDetails?.userDetails.credentials ||
            '',
        availabilityFrom: availabilityFromObj,
        availabilityTo: availabilityToObj,
    };
    const addressValidationSchema = Yup.string()
        .matches(
            /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
            'Invalid characters in address'
        )
        .max(50, 'Input cannot exceed the maximum length of 50 characters.');
    const emailRegex =
        /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
    const contactNumberRegex = /^\+1[\d\-]{1,12}$/;
    const validationSchema = Yup.object().shape({
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
        cellPhone: Yup.string().matches(contactNumberRegex, {
            message:
                'Phone number must start with +1 and contain up to 13 characters including digits and -',
        }),
        username: Yup.string().matches(emailRegex, {
            message:
                'Invalid email format. Ensure it follows the format: username@domain.com',
        }),
        firstName: Yup.string()
            .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed')
            .max(150, nameValidation),
        lastName: Yup.string()
            .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed')
            .max(150, nameValidation),
        personalCity: Yup.string()
            .matches(
                /^[a-zA-Z]+$/,
                'Input cannot exceed the maximum length of 20 characters.'
            )
            .max(
                20,
                'Input cannot exceed the maximum length of 20 characters.'
            ),
        primaryAddress1: addressValidationSchema,
        primaryAddress2: addressValidationSchema,
        mailingAddress1: addressValidationSchema,
        mailingAddress2: addressValidationSchema,
        workCity: Yup.string()
            .matches(
                /^[a-zA-Z]+$/,
                'Input cannot exceed the maximum length of 20 characters.'
            )
            .max(
                20,
                'Input cannot exceed the maximum length of 20 characters.'
            ),
        personalPostalCode: Yup.string().matches(
            /^\d{1,10}$/,
            'Input must be a numeric value with a maximum length of 10 digits.'
        ),
        workPostalCode: Yup.string().matches(
            /^\d{1,10}$/,
            'Input must be a numeric value with a maximum length of 10 digits.'
        ),
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
    });
    const isSubmitDisabled = (values: Values): boolean => {
        const roleData = allUserRoles?.value?.find(
            (item: any) => item?.id === values?.employeeType?.[0]
        );
        const isClient =
            roleName?.name === 'Client' ||
            roleData?.name === 'Client' ||
            accountDetails?.userDetails?.roleName === 'Client';
        const isEmployee =
            roleName?.name === 'Clinician' ||
            roleName?.name === 'Technician' ||
            accountDetails?.userDetails?.roleName === 'Technician' ||
            accountDetails?.userDetails?.roleName === 'Clinician' ||
            roleData?.name === 'Clinician' ||
            roleData?.name === 'Technician';
        const isTechnician =
            roleData?.name === 'Technician' ||
            roleName?.name === 'Technician' ||
            accountDetails?.userDetails?.roleName === 'Technician';
        const areUserChildrenFieldsFilled = values.userChildren?.every(
            (child: any) =>
                child.childFirstName?.trim() &&
                child.childLastName?.trim() &&
                child.childGender &&
                child.childDateOfBirth &&
                child.therapyData
        );
        return (
            !values?.firstName.trim() ||
            !values?.lastName.trim() ||
            !values?.username.trim() ||
            !values?.dateOfBirth ||
            !values?.personalCity ||
            !values?.personalState ||
            !values?.personalPostalCode?.toString().trim() ||
            !values?.cellPhone?.toString().trim() ||
            !values?.employeeType ||
            !values?.workCity ||
            !values?.workState ||
            !values?.workPostalCode ||
            !values?.gender ||
            !values?.primaryAddress1.trim() ||
            !values?.mailingAddress1.trim() ||
            (isClient && !areUserChildrenFieldsFilled) ||
            (isEmployee && !values?.therapySkill) ||
            (isTechnician && !values?.availabilityFrom) ||
            (isTechnician && !values?.availabilityTo)
        );
    };
    const handleSubmitForm = async (values: Values): Promise<any> => {
        dispatch(clearDataById());
        const isRole = allUserRoles?.value?.find(
            (item: any) => item?.id === values?.employeeType?.[0]
        );
        const technicianAvailability =
            isRole?.name === 'Technician'
                ? {
                      availabilityFrom: moment(
                          values?.availabilityFrom?.startDate
                      ).format('YYYY-MM-DDTHH:mm:ss'),
                      availabilityTo: moment(
                          values?.availabilityTo?.startDate
                      ).format('YYYY-MM-DDTHH:mm:ss'),
                  }
                : '';
        const childrenDetails =
            isRole?.name === 'Client'
                ? values?.userChildren?.map((data: any) => ({
                      ...data,
                      childGender: data?.childGender[0],
                      therapyData: data?.therapyData?.map((item: any) => item),
                      childDateOfBirth: data?.childDateOfBirth?.startDate,
                      referringProvider: data?.referringProvider?.value,
                      edited: data?.edited,
                  }))
                : [];
        const StatusObj = values?.status[0] === 'Active' ? true : false;
        const formData = {
            ...values,
            ...technicianAvailability,
            imageData: profileData
                ? profileData
                : accountDetails?.userDetails?.imageData
                  ? accountDetails?.userDetails?.imageData
                  : employeeData?.imageData
                    ? employeeData?.imageData
                    : '',
            dateOfBirth: (values?.dateOfBirth as any)?.startDate,
            personalState: values?.personalState,
            workState: values?.workState,
            primaryRoleId: values?.employeeType?.[0],
            secondaryRoleId: values?.secondaryRoleId?.map((role: any) => ({
                id: role,
            })),
            employeeId: accountDetails?.userDetails?.id
                ? accountDetails?.userDetails?.id
                : employeeData?.id,
            status: StatusObj,
            gender: values?.gender,
            organizationServiceId:
                isRole?.name === 'Technician' || isRole?.name === 'Clinician'
                    ? values?.therapySkill?.[0]
                    : '',
            userChildren: childrenDetails,
        };
        if (employeeData?.length === 0 && !accountDetails?.isAccount) {
            const res = await saveEmployeeApi.saveEmployee(formData);
            if (!res?.data?.error) {
                dispatch(savingClientId(res?.data?.data?.id));
                dispatch(setValue(true));
                dispatch(savingValue(true));

                if (isRole?.name === 'Client') {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Client details added. Feel free to add more.',
                            description: '',
                        })
                    );
                } else {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'User created successfully.',
                            description: '',
                        })
                    );
                    setTimeout(() => {
                        navigate(ROUTES.contactGrid);
                    }, 2000);
                }
            } else {
                setShowError(true);
                return res;
            }
        } else {
            const res = await saveEmployeeApi.editEmployee(formData);
            if (!res?.data?.error) {
                dispatch(savingClientId(res?.data?.data?.id));
                dispatch(savingUserId(res?.data?.data?.userId));
                if (isRole?.name === 'Client' && !accountDetails?.isAccount) {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'User details edited successfully.',
                            description: '',
                        })
                    );
                } else if (accountDetails?.isAccount) {
                    dispatch(clearAccountData());
                    dispatch(account(false));
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'Your demographic information edited successfully.',
                            description: '',
                        })
                    );
                    setTimeout(() => {
                        dispatch(setOnView(false));
                        dispatch(getUserProfileDataCall());
                        navigate(ROUTES.LandingPage);
                    }, 2000);
                } else {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'User details edited successfully.',
                            description: '',
                        })
                    );
                    setTimeout(() => {
                        navigate(ROUTES.contactGrid);
                    }, 2000);
                }
            } else {
                return res;
            }
        }
    };
    const onClose = async (): Promise<any> => {
        if (accountDetails?.isAccount) {
            navigate(ROUTES.LandingPage);
        } else {
            navigate(ROUTES.contactGrid);
        }
        dispatch(setOnView(false));
        dispatch(clearAccountData());
        dispatch(account(false));
        dispatch(clearDataById());
        dispatch(clearValue());
        dispatch(savingValue(false));
        dispatch(setValue(false));
    };
    const handleRateChange = (e: any, handleChange: any): void => {
        const value = e.target.value;
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (regex.test(value)) {
            handleChange(e);
        }
    };
    const handleNumber = (e: any, handleChange: any): void => {
        const value = e.target.value;
        const regex = /^[0-9\+\(\)]*$/;
        if (regex.test(value)) {
            handleChange(e);
        }
    };
    const handleKeyPress = async (
        e: any,
        values: Values,
        setSubmitting: any,
        role: any
    ): Promise<any> => {
        if (e?.key == 'Enter') {
            if (buttonValue || !isSubmitDisabled(values)) {
                setSubmitting(true);
                handleSubmitForm(values);
                addToast({
                    type: 'success',
                    message: `Data saving...`,
                });
                if (roleName?.name !== 'Client' || role.name !== 'Client') {
                    dispatch(clearDataById());
                }
            }
        }
    };
    const handleSavingRole = (id: any): void => {
        interface ID {
            id: number;
        }
        const roleData = allUserRoles?.value?.find(
            (item: ID) => item?.id === id[0]
        );
        dispatch(savingRoleName(roleData));
        if (id) {
            dispatch(getSecondaryRolesCall({ roleId: id[0] }));
        }
    };
    const modeView = useSelector(
        ({ authorization }: IRootState) => authorization?.view
    );
    useEffect(() => {
        const data = {
            id: params?.id,
        };
        if (params?.id) {
            dispatch(getEmployeeByIdCall(data));
        }
    }, [dispatch]);
    return (
        <div
            className="onboardingForm w-3/4"
            data-testid="employee-onboarding-form"
        >
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
                        touched,
                        errors,
                        setFieldTouched,
                        setSubmitting,
                    } = props;
                    const role = allUserRoles?.value?.find(
                        (item: any) => item?.id === values?.employeeType?.[0]
                    );
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="w-full h-[103vh] shadow-b-0 overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                <div className="">
                                    {employeeData?.length === 0 ? (
                                        <h1 className="font-[lato] font-semibold">
                                            User Onboarding From
                                        </h1>
                                    ) : (
                                        <h1 className="font-[lato] font-semibold flex">
                                            <h1 className="text-zinc-400">
                                                {modeView ? 'View' : 'Edit'}
                                            </h1>{' '}
                                            - User Onboarding From
                                        </h1>
                                    )}
                                    <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                                    <div className="flex">
                                        <div
                                            className={`employeeType  w-[45rem] my-1 mt-2 ${accountDetails?.isAccount ? 'opacity-80 pointer-events-none' : ''}`}
                                        >
                                            <Field
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                }
                                                label={'Primary Role'}
                                                data-testid="role-dropdown"
                                                name="employeeType"
                                                autoComplete="off"
                                                isRequired={true}
                                                autoFocus={true}
                                                component={Select1}
                                                value={values?.employeeType}
                                                options={allUserRoles?.value?.map(
                                                    (data: any) => ({
                                                        label: data?.name,
                                                        value: data?.id,
                                                    })
                                                )}
                                                onChange={(
                                                    selectedRoles: any
                                                ) => {
                                                    if (selectedRoles?.length) {
                                                        setFieldValue(
                                                            'employeeType',
                                                            selectedRoles
                                                        );
                                                        handleSavingRole(
                                                            selectedRoles
                                                        );
                                                    }
                                                }}
                                                isDisabled={modeView}
                                            />
                                            <h1 className="text-right font-[lato]  text-zinc-400 text-xs font-light">
                                                permissions will be assigned
                                                based on the roles
                                            </h1>
                                        </div>
                                        {(employeeData?.userId ||
                                            accountDetails?.isAccount) && (
                                            <div
                                                className={`status  w-[20rem]  ml-7 my-1 mt-3 ${accountDetails?.isAccount ? 'pointer-events-none opacity-85' : ''} `}
                                            >
                                                <Field
                                                    inputClassName={
                                                        'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                    }
                                                    label={'Status'}
                                                    id="status"
                                                    name="status"
                                                    autoComplete="off"
                                                    value={values?.status}
                                                    component={Select1}
                                                    onChange={(
                                                        selectedStatus: any
                                                    ) => {
                                                        if (
                                                            selectedStatus?.length
                                                        ) {
                                                            setFieldValue(
                                                                'status',
                                                                selectedStatus
                                                            );
                                                        }
                                                    }}
                                                    options={statusData?.map(
                                                        (data: any) => ({
                                                            label: data?.name,
                                                            value: data?.name,
                                                        })
                                                    )}
                                                    isDisabled={modeView}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {!(
                                        role?.name === 'Client' ||
                                        roleName?.name === 'Client'
                                    ) && (
                                        <div
                                            className={`secondary role  w-[45rem] my-1 mt-2  ${accountDetails?.isAccount ? 'opacity-80 pointer-events-none' : ''}`}
                                        >
                                            <Field
                                                inputClassName={
                                                    'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                }
                                                label={'Secondary Role'}
                                                name="secondaryRoleId"
                                                autoComplete="off"
                                                isRequired={false}
                                                multi={true}
                                                component={Select1}
                                                value={values?.secondaryRoleId}
                                                options={allUserRoles?.secondaryRoles?.map(
                                                    (data: any) => ({
                                                        label: data?.name,
                                                        value: data?.id,
                                                    })
                                                )}
                                                onChange={(
                                                    selectedRoles: any
                                                ) => {
                                                    if (selectedRoles?.length) {
                                                        setFieldValue(
                                                            'secondaryRoleId',
                                                            selectedRoles
                                                        );
                                                    }
                                                }}
                                                isDisabled={modeView}
                                            />
                                        </div>
                                    )}
                                    <div className="firstName w-[45rem] mt-2">
                                        <Field
                                            className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                            label="First Name"
                                            autoComplete="off"
                                            isRequired={true}
                                            id="firstName"
                                            name="firstName"
                                            data-testid="firstName-input"
                                            component={Input}
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onKeyDown={(e: any) => {
                                                handleKeyPress(
                                                    e,
                                                    values,
                                                    setSubmitting,
                                                    role
                                                );
                                                setFieldTouched(
                                                    'firstName',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="First Name"
                                            disabled={modeView}
                                        />
                                    </div>
                                    <div className="lastName w-[45rem] py-2 mt-3">
                                        <Field
                                            className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                            label="Last Name"
                                            autoComplete="off"
                                            isRequired={true}
                                            id="lastName"
                                            name="lastName"
                                            data-testid="lastName-input"
                                            component={Input}
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onKeyDown={(e: any) => {
                                                handleKeyPress(
                                                    role,
                                                    e,
                                                    values,
                                                    setSubmitting
                                                );
                                            }}
                                            placeholder="Last Name"
                                            disabled={modeView}
                                        />
                                    </div>
                                    <div className="gender  w-[45rem] my-1 mt-2">
                                        <Field
                                            label={'Gender'}
                                            name="gender"
                                            autoComplete="off"
                                            id="gender"
                                            data-testid="gender-dropdown"
                                            isRequired={true}
                                            value={values?.gender}
                                            component={Select1}
                                            onChange={(selectedOption: any) => {
                                                if (selectedOption?.length) {
                                                    setFieldValue(
                                                        'gender',
                                                        selectedOption[0]
                                                    );
                                                }
                                            }}
                                            options={Gender?.map(
                                                (data: any) => ({
                                                    label: data?.gender,
                                                    value: data?.gender,
                                                })
                                            )}
                                            inputClassName={
                                                'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                            }
                                            isDisabled={modeView}
                                        />
                                    </div>
                                    <div className="DOB w-[20rem] py-3 mt-2">
                                        <label className="mb-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                            Date of Birth
                                        </label>
                                        <label className="text-red-700 text-lg font-normal font-['Lato']">
                                            *
                                        </label>
                                        <Field
                                            className="border "
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
                                                    value={values?.dateOfBirth}
                                                    placeholder="  yyyy/mm/dd"
                                                    onChange={(date) => {
                                                        const newValues = {
                                                            ...values,
                                                            dateOfBirth: date,
                                                        };
                                                        props.setValues(
                                                            newValues
                                                        );
                                                    }}
                                                    popoverDirection="down"
                                                    useRange={false}
                                                    asSingle={true}
                                                    maxDate={new Date()}
                                                    minDate={twelveYearsAgo}
                                                    disabled={modeView}
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
                                                {errors?.dateOfBirth?.endDate}
                                            </label>
                                        )}
                                    </div>
                                    <div className="email w-[45rem] py-2 mt-3">
                                        <Field
                                            className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                            label="Email Address"
                                            autoComplete="off"
                                            isRequired={true}
                                            id="username"
                                            name="username"
                                            data-testid="username-input"
                                            component={Input}
                                            value={values.username}
                                            onChange={(e: any) => {
                                                handleChange(e);
                                                setShowError(false);
                                            }}
                                            placeholder="E-mail"
                                            disabled={
                                                employeeData?.length === 0 &&
                                                !modeView &&
                                                !accountDetails?.isAccount
                                                    ? false
                                                    : true
                                            }
                                        />
                                        <h1 className="text-right font-[lato]  text-zinc-400 text-xs font-light">
                                            Login-information will be sent on
                                            this email
                                        </h1>
                                        {showError && (
                                            <div className="errorMsg text-red-700 text-xs  my-1 font-[lato]">
                                                EmailID should be unique
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between mt-5 w-[67rem]  ">
                                        <div className="celPhone w-[20rem]  mt-1 ">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                label="Cell Phone"
                                                autoComplete="off"
                                                isRequired={true}
                                                id="cellPhone"
                                                name="cellPhone"
                                                data-testid="cellPhone-input"
                                                component={Input}
                                                value={values.cellPhone}
                                                onChange={handleChange}
                                                onKeyDown={(e: any) => {
                                                    handleKeyPress(
                                                        role,
                                                        e,
                                                        values,
                                                        setSubmitting
                                                    );
                                                    setFieldTouched(
                                                        'cellPhone',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                placeholder="e.g - +1(670)954-8263"
                                                maxLength={13}
                                                disabled={modeView}
                                            />
                                        </div>
                                        <div className="homePhone w-[20rem] mx-2 mt-1">
                                            <Field
                                                className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                label="Home Phone"
                                                autoComplete="off"
                                                isRequired={false}
                                                id="homePhone"
                                                name="homePhone"
                                                data-testid="homePhone-input"
                                                component={Input}
                                                value={values.homePhone}
                                                onChange={handleChange}
                                                onKeyDown={(e: any) => {
                                                    handleKeyPress(
                                                        role,
                                                        e,
                                                        values,
                                                        setSubmitting
                                                    );
                                                    setFieldTouched(
                                                        'homePhone',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                placeholder="e.g - +1(670)954-8263"
                                                maxLength={13}
                                                disabled={modeView}
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
                                                data-testid="workPhone-input"
                                                component={Input}
                                                value={values.workPhone}
                                                onChange={handleChange}
                                                onKeyDown={(e: any) => {
                                                    handleKeyPress(
                                                        role,
                                                        e,
                                                        values,
                                                        setSubmitting
                                                    );
                                                    setFieldTouched(
                                                        'workPhone',
                                                        true,
                                                        false
                                                    );
                                                }}
                                                placeholder="e.g - +1(670)954-8263"
                                                maxLength={13}
                                                disabled={modeView}
                                            />
                                        </div>
                                    </div>
                                    {(role?.name === 'Clinician' ||
                                        role?.name === 'Technician') && (
                                        <>
                                            <div className="PrimaryTherapySkill  w-[45rem] py-2 mt-3">
                                                <Field
                                                    label={
                                                        'Primary Therapy Skill'
                                                    }
                                                    inputClassName={
                                                        'border-0 border-b border-gray-400 rounded-none focus:border-blue-500 focus:ring-0 px-0 ps-0'
                                                    }
                                                    name="therapySkill"
                                                    data-testid="therapySkill-dropdown"
                                                    autoComplete="off"
                                                    value={values?.therapySkill}
                                                    component={Select1}
                                                    isRequired={true}
                                                    onChange={(
                                                        selectedTherapyOption: any
                                                    ) => {
                                                        setFieldValue(
                                                            'therapySkill',
                                                            [].concat(
                                                                selectedTherapyOption
                                                            )
                                                        );
                                                    }}
                                                    options={serviceType?.map(
                                                        (data: any) => ({
                                                            label: data?.name,
                                                            value: data?.id,
                                                        })
                                                    )}
                                                    isDisabled={modeView}
                                                />
                                            </div>
                                            <div className="Credentials  w-[45rem] py-3">
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent mb-5"
                                                    label="NPI Number"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="npiNumber"
                                                    name="npiNumber"
                                                    data-testid="npiNumber-input"
                                                    component={Input}
                                                    value={values.npiNumber}
                                                    onChange={(e: any) =>
                                                        handleRateChange(
                                                            e,
                                                            handleChange
                                                        )
                                                    }
                                                    onKeyDown={(e: any) => {
                                                        handleKeyPress(
                                                            role,
                                                            e,
                                                            values,
                                                            setSubmitting
                                                        );
                                                    }}
                                                    placeholder="Enter number"
                                                    disabled={modeView}
                                                />
                                                <Field
                                                    className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent"
                                                    label="Credentials"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="credentials"
                                                    name="credentials"
                                                    data-testid="credentials-input"
                                                    component={Input}
                                                    value={values.credentials}
                                                    onChange={handleChange}
                                                    onKeyDown={(e: any) => {
                                                        handleKeyPress(
                                                            role,
                                                            e,
                                                            values,
                                                            setSubmitting
                                                        );
                                                    }}
                                                    placeholder="Enter credential"
                                                    disabled={modeView}
                                                />
                                            </div>
                                        </>
                                    )}
                                    {role?.name === 'Technician' && (
                                        <div className=" TechnicianAvailability my-4">
                                            <label className="mb-3 text-zinc-700 text-sm font-bold font-['Lato'] leading-tight">
                                                {`Technician's Availability`}
                                            </label>
                                            <label className="text-red-700 text-lg font-normal font-['Lato']">
                                                *
                                            </label>
                                            <div className="flex space-x-4 mt-2">
                                                <div className="flex flex-col space-y-1 ">
                                                    <Field
                                                        name="availabilityFrom"
                                                        autoComplete="off"
                                                        isRequired={true}
                                                        value={{
                                                            startDate:
                                                                values?.availabilityFrom,
                                                        }}
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                        className="w-full"
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Datepicker
                                                                toggleClassName="absolute rounded-r-lg text-blue-500
                                                            left-0 h-full px-3 focus:outline-none
                                                             disabled:opacity-40 disabled:cursor-not-allowed "
                                                                inputClassName="outline-none py-[0.5rem] px-[2rem]  w-[20rem] px-3 border-2 h-10 border-neutral-300 rounded-md text-sm"
                                                                id="availabilityFrom"
                                                                placeholder="  yyyy/mm/dd"
                                                                {...field}
                                                                selected={
                                                                    field.value
                                                                }
                                                                useRange={false}
                                                                asSingle={true}
                                                                onChange={(
                                                                    date: any
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        date
                                                                    );
                                                                }}
                                                                popoverDirection="down"
                                                                disabled={
                                                                    modeView
                                                                }
                                                                maxDate={
                                                                    new Date()
                                                                }
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
                                                    errors?.dateOfBirth
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
                                                <h1 className="my-3">To</h1>
                                                <div className="flex flex-col space-y-1">
                                                    <Field
                                                        name="availabilityTo"
                                                        autoComplete="off"
                                                        isRequired={true}
                                                        value={{
                                                            startDate:
                                                                values?.availabilityTo,
                                                        }}
                                                        onChange={(e: any) => {
                                                            handleChange(e);
                                                        }}
                                                        className="w-full"
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                        }: {
                                                            field: any;
                                                            form: any;
                                                        }) => (
                                                            <Datepicker
                                                                toggleClassName="absolute rounded-r-lg text-blue-500
                                                            left-0 h-full px-3 focus:outline-none
                                                             disabled:opacity-40 disabled:cursor-not-allowed "
                                                                inputClassName="outline-none py-[0.5rem] px-[2rem]  w-[20rem] px-3 border-2 h-10 border-neutral-300 rounded-md text-sm"
                                                                id="availabilityTo"
                                                                placeholder="  yyyy/mm/dd"
                                                                {...field}
                                                                selected={
                                                                    field.value
                                                                }
                                                                useRange={false}
                                                                asSingle={true}
                                                                onChange={(
                                                                    date
                                                                ) => {
                                                                    form.setFieldValue(
                                                                        field.name,
                                                                        date
                                                                    );
                                                                }}
                                                                minDate={
                                                                    values
                                                                        ?.availabilityFrom
                                                                        ?.startDate
                                                                }
                                                                popoverDirection="down"
                                                                disabled={
                                                                    modeView
                                                                }
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {(role?.name === 'Client' ||
                                        roleName?.name === 'Client') && (
                                        <AddUserChild
                                            handleNumber={handleNumber}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            setFieldTouched={setFieldTouched}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                            employeeData={employeeData}
                                            handleSubmit={handleSubmit}
                                            handleKeyPress={handleKeyPress}
                                            setSubmitting={setSubmitting}
                                            isDisabled={modeView}
                                        />
                                    )}
                                    <AddUserLocation
                                        values={values}
                                        handleChange={handleChange}
                                        handleKeyPress={handleKeyPress}
                                        setSubmitting={setSubmitting}
                                        isDisabled={modeView}
                                        setFieldTouched={setFieldTouched}
                                        setFieldValue={setFieldValue}
                                    />
                                </div>
                            </div>
                            <div className="buttons mr-4 my-3 float-right ">
                                <EmployeeOnboardingFormActionModal
                                    handleSubmit={handleSubmit}
                                    onClose={onClose}
                                    isDisabled={
                                        isSubmitDisabled(values) ||
                                        buttonValue ||
                                        modeView
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
