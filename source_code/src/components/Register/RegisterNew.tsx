/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import registerClientApi from '../../api/services/Register/registerClient.service';
import { nameValidation } from '../../constants/ValidationMessages';
import view from '../../assets/img/GridIcons/view.svg';
import hide from '../../assets/img/crossEye.svg';
import getOrganizationViaIntakeApi from '../../api/services/Register/getorganization.service';
import { ParentInfo } from '../../types/Register.type';
import loginBackground from '../../assets/img/loginBackground.svg';
import CopyRightFooter from '../Log-in/copyRightFooter';
import checkGreen from '../../assets/img/Login/validationGreen.svg';
import crossRed from '../../assets/img/Login/validationRed.svg';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { useDispatch, useSelector } from 'react-redux';
interface Values {
    firstName: string;
    lastName: string;
    email: string;
    cellPhone: string;
    homePhone: string;
    gender: string;
    dob: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
}
interface UserPermission {
    getUserPermission: {
        value?: { data?: { orgId?: string } };
        orgId?: string;
    };
}
const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch<any>();
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [intakeResponse, setIntakeResponse] = useState<ParentInfo | null>(
        null
    );
    const userPermission = useSelector(
        ({ getUserPermission }: UserPermission) => getUserPermission
    );
    useEffect(() => {
        const logId = async (
            search:
                | string
                | string[][]
                | Record<string, string>
                | URLSearchParams
                | undefined
        ) => {
            try {
                const paramsData = new URLSearchParams(search);
                const id = paramsData.get('id') || '';
                const payload = {
                    uniqueId: id || params?.id || 'default-unique-id',
                };
                const res =
                    await getOrganizationViaIntakeApi.getOrganizationViaIntake(
                        payload
                    );
                setIntakeResponse(res?.data?.data);
            } catch (error) {
                console.error('Error logging ID:', error);
            }
        };
        logId(window.location.search);
    }, [params?.id]);
    const handleSubmitForm = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ): Promise<void> => {
        try {
            const payload = {
                data: {
                    uniqueId: intakeResponse?.id || 'default-unique-id', // Replace with actual unique ID if available
                    username: values.email || '', // If applicable
                    // organizationId: '', // If applicable
                    organizationId: '',
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    password: values.password,
                    gender: values.gender,
                    cellPhone: values.cellPhone,
                    dateOfBirth: values.dob,
                    policy: values.termsAccepted,
                },
            };
            const res = await registerClientApi
                .saveRegisterClient(payload)
                .then(() => {
                    dispatch(
                        openNotification({
                            success: true,
                            title: 'You are registered successfully.',
                            description: '',
                        })
                    );
                    setTimeout(() => {
                        navigate('/login');
                    }, 500);
                })
                .catch((_err) => {});
            console.log(res);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };
    const regexForName = /^[a-zA-Z\s\-]+$/;
    const formatDate = (date1: string | undefined) => {
        if (!date1) return '';
        const [year, month, day] = date1.split('T')[0].split('-');
        return `${year}-${month}-${day}`;
    };
    const formik = useFormik({
        initialValues: {
            firstName: intakeResponse?.parentFirstname || '',
            lastName: intakeResponse?.parentLastname || '',
            email: intakeResponse?.email || '',
            cellPhone: intakeResponse?.phoneNumber || '+1',
            homePhone: intakeResponse?.homePhone || '+1',
            gender: intakeResponse?.gender || '',
            dob: formatDate(intakeResponse?.dateOfBirth) || '',
            password: '',
            confirmPassword: '',
            termsAccepted: intakeResponse?.policy || false,
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Parent’s First Name is required')
                .matches(
                    regexForName,
                    'Only alphabets including spaces and - are allowed'
                )
                .max(50, nameValidation),
            lastName: Yup.string()
                .required('Parent’s Last Name is required')
                .matches(
                    regexForName,
                    'Only alphabets including spaces and - are allowed'
                )
                .max(50, nameValidation),
            email: Yup.string()
                .required('Email is required')
                .email('Invalid email address'),
            cellPhone: Yup.string()
                .required('Cell Phone is required')
                .matches(/^\+?\d[\d\s-]{8,14}\d$/, 'Invalid cell phone number'),
            homePhone: Yup.string()
                .required('Cell Phone is required')
                .matches(/^\+?\d[\d\s-]{8,14}\d$/, 'Invalid cell phone number'),
            gender: Yup.string().required('Gender is Required'),
            dob: Yup.date().required('Required'),
            password: Yup.string()
                .min(10, 'Must be at least 10 characters')
                .matches(/[0-9]/, 'Must contain a number')
                .matches(/[A-Z]/, 'Must contain an uppercase letter')
                .matches(/[a-z]/, 'Must contain a lowercase letter')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), ''], 'Passwords must match')
                .required('Required'),
            termsAccepted: Yup.boolean()
                .oneOf([true], 'You must accept the terms and conditions')
                .required('Required'),
        }),
        onSubmit: handleSubmitForm,
        enableReinitialize: true,
    });
    const validatePassword = (passwordValidation: string) => {
        return {
            length: passwordValidation.length >= 10,
            number: /\d/.test(passwordValidation),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValidation),
            uppercase: /[A-Z]/.test(passwordValidation),
            lowercase: /[a-z]/.test(passwordValidation),
        };
    };
    const passwordCriteria = validatePassword(formik.values.password);
    return (
        <div
            data-testid="register-page"
            className=""
            style={{
                backgroundImage: `url(${loginBackground})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '120vh',
            }}
        >
            <div className="border h-fit  font-['Lato'] bg-white m-5">
                <div className="flex ml-4 mt-2 flex-col  w-[70rem]">
                    <h1 className="font-['Lato'] leading-tight text-2xl font-semibold">
                        Register
                    </h1>
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2"
                >
                    <div>
                        <input
                            placeholder="Parent's First Name"
                            type="text"
                            name="firstName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            data-testid="first-name-input"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="text-red-500">
                                {formik.errors.firstName}
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <input
                            placeholder="Parent's Last Name"
                            type="text"
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="text-red-500">
                                {formik.errors.lastName}
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <input
                            maxLength={13}
                            placeholder="Cell Phone"
                            type="tel"
                            name="cellPhone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cellPhone}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.cellPhone && formik.errors.cellPhone ? (
                            <div className="text-red-500">
                                {formik.errors.cellPhone}
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <input
                            maxLength={13}
                            placeholder="Home Phone"
                            type="tel"
                            name="homePhone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.homePhone}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.homePhone && formik.errors.homePhone ? (
                            <div className="text-red-500">
                                {formik.errors.homePhone}
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <input
                            placeholder="Work Email"
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500">
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <select
                            name="gender"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.gender}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender ? (
                            <div className="text-red-500">
                                {formik.errors.gender}
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <input
                            type="date"
                            name="dob"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.dob}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.dob && formik.errors.dob ? (
                            <div className="text-red-500">
                                {formik.errors.dob}
                            </div>
                        ) : null}
                    </div>
                    <div></div>
                    <h2 className="text-lg font-bold">Create Password</h2>
                    <div></div>
                    <div>
                        <div className="relative">
                            <input
                                placeholder="Password"
                                type={password ? 'text' : 'password'}
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                data-testid="password-input"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button
                                type="button"
                                onClick={() => setPassword(!password)}
                                data-testid="password-btn"
                                className="absolute inset-y-0 right-0 px-3 flex items-center"
                            >
                                <img
                                    className="cursor-pointer"
                                    src={password ? hide : view}
                                    alt="view"
                                />
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500">
                                {formik.errors.password}
                            </div>
                        ) : null}
                        <div className="flex flex-col space-y-1 mt-4">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={
                                        passwordCriteria.length
                                            ? checkGreen
                                            : crossRed
                                    }
                                    alt="length"
                                />
                                <span
                                    data-testid="password-criteria-span"
                                    className={
                                        passwordCriteria.length
                                            ? 'text-green-600 text-sm'
                                            : formik.values.password
                                              ? 'text-red-600 text-sm'
                                              : 'text-black text-sm'
                                    }
                                >
                                    Password must be at least 10 characters long
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img
                                    src={
                                        passwordCriteria.uppercase
                                            ? checkGreen
                                            : crossRed
                                    }
                                    alt="uppercase"
                                />
                                <span
                                    className={
                                        passwordCriteria.uppercase
                                            ? 'text-green-600 text-sm'
                                            : formik.values.password
                                              ? 'text-red-600 text-sm'
                                              : 'text-black text-sm'
                                    }
                                >
                                    Password must contain at least one uppercase
                                    letter
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img
                                    src={
                                        passwordCriteria.lowercase
                                            ? checkGreen
                                            : crossRed
                                    }
                                    alt="lowercase"
                                />
                                <span
                                    className={
                                        passwordCriteria.lowercase
                                            ? 'text-green-600 text-sm'
                                            : formik.values.password
                                              ? 'text-red-600 text-sm'
                                              : 'text-black text-sm'
                                    }
                                >
                                    Password must contain at least one lowercase
                                    letter
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img
                                    src={
                                        passwordCriteria.number
                                            ? checkGreen
                                            : crossRed
                                    }
                                    alt="digit"
                                />
                                <span
                                    className={
                                        passwordCriteria.number
                                            ? 'text-green-600 text-sm'
                                            : formik.values.password
                                              ? 'text-red-600 text-sm'
                                              : 'text-black text-sm'
                                    }
                                >
                                    Password must contain at least one digit
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img
                                    src={
                                        passwordCriteria.specialChar
                                            ? checkGreen
                                            : crossRed
                                    }
                                    alt="specialChar"
                                />
                                <span
                                    className={
                                        passwordCriteria.specialChar
                                            ? 'text-green-600 text-sm'
                                            : formik.values.password
                                              ? 'text-red-600 text-sm'
                                              : 'text-black text-sm'
                                    }
                                >
                                    Password must contain at least one special
                                    character
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <input
                                placeholder="Confirm Password"
                                type={confirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button
                                className="absolute inset-y-0 right-0 px-3 flex items-center"
                                type="button"
                                data-testid="password-btn2"
                                onClick={() =>
                                    setConfirmPassword(!confirmPassword)
                                }
                            >
                                <img
                                    className="absolute end-3 cursor-pointer"
                                    src={confirmPassword ? hide : view}
                                    alt="view"
                                />
                            </button>
                        </div>
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ? (
                            <div className="text-red-500">
                                {formik.errors.confirmPassword}
                            </div>
                        ) : null}
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                        <label>
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={formik.values.termsAccepted}
                                className="mr-2"
                            />
                            I acknowledge receipt of the privacy policy and
                            terms of use
                        </label>
                        {formik.touched.termsAccepted &&
                        formik.errors.termsAccepted ? (
                            <div className="text-red-500">
                                {formik.errors.termsAccepted}
                            </div>
                        ) : null}
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                        <button
                            type="submit"
                            data-testid="submit-btn-click"
                            className={`w-1/4  p-2 text-white bg-[#45D2F5] rounded ${!formik.isValid && 'opacity-50 cursor-not-allowed'}`}
                            disabled={!formik.isValid}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <CopyRightFooter />
        </div>
    );
};
export default RegistrationForm;
