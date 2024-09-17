import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ROUTES } from '../../constants';
import { openNotification } from '../../redux/slice/Notification/notifications';
import changePasswordApi from '../../api/services/changePassword.service';
import view from '../../assets/img/GridIcons/view.svg';
import hide from '../../assets/img/crossEye.svg';
import checkGreen from '../../assets/img/Login/validationGreen.svg';
import crossRed from '../../assets/img/Login/validationRed.svg';
import Input from '../Generics/Inputs/Input';
interface Values {
    password: string;
    newPassword: string;
    confirmPassword: string;
}
const ForgotPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(10, 'Password must be at least 10 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one digit')
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            'Password must contain at least one special character'
        )
        .required('New Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm Password is required'),
});
export default function ChangePassword(): React.JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const [showError, setShowError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const initialValues: Values = {
        password: '',
        newPassword: '',
        confirmPassword: '',
    };
    const userData = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const handleSubmitForm = async (values: Values): Promise<void> => {
        if (values?.newPassword === values?.confirmPassword) {
            const data = {
                username: userData?.user?.username,
                password: values?.password,
                updatedPassword: values?.confirmPassword,
            };
            const res = await changePasswordApi.changePassword(data);
            if (!res?.data?.error) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Password updated successfully',
                        description: '',
                    })
                );
                navigate(ROUTES.LandingPage);
            } else {
                setShowError(res?.data?.description);
            }
        } else {
            setShowError('Password does not match.');
        }
    };
    const validatePassword = (password: string): any => {
        return {
            length: password.length >= 10,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            digit: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
    };
    return (
        <div
            className={`w-1/3 flex items-center justify-center`}
            data-testid="change-password-page"
        >
            <div className="bg-[#FAFAFA] mr-8 rounded-[2rem] w-full shadow-2xl border-2 border-[#45D2F5] md:mr-20 lg:mr-40">
                <div className="p-4 mx-4 md:mx-8">
                    <h1 className="text-zinc-600 font-['Lato'] leading-tight text-3xl mt-5">
                        Change Password
                    </h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validationSchema={ForgotPasswordSchema}
                        validateOnChange={true}
                        validateOnBlur={false}
                    >
                        {({
                            values,
                            handleSubmit,
                            handleChange,
                            touched,
                            errors,
                            handleBlur,
                            setFieldTouched,
                        }) => {
                            const validation = validatePassword(
                                values.newPassword
                            );
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="my-5 space-y-3">
                                        <div className="flex relative items-center border border-black rounded-md w-[28rem]">
                                            <Field
                                                name="password"
                                                id="password"
                                                label="Current Password"
                                                component={Input}
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="Current Password"
                                                hideLabel={true}
                                                className="password bg-[#FAFAFA] font-['Lato'] w-[30rem] border-none text-lg p-3 py-4 focus:ring-transparent"
                                                isRequired={false}
                                                onBlur={handleBlur}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'password',
                                                        true
                                                    );
                                                }}
                                                showError={true}
                                                data-testid="current-password"
                                            />
                                            <img
                                                className="mt-3 absolute end-2 cursor-pointer"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                src={showPassword ? hide : view}
                                                alt="view"
                                                data-testid="show-password-img"
                                            />
                                        </div>
                                        {touched.password &&
                                            errors.password && (
                                                <div className="text-red-700 text-xs mt-1">
                                                    {errors.password}
                                                </div>
                                            )}
                                        <div className="flex relative items-center border border-black rounded-md w-[28rem]">
                                            <Field
                                                name="newPassword"
                                                id="newPassword"
                                                label="New Password"
                                                component={Input}
                                                type={
                                                    showNewPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="New Password"
                                                hideLabel={true}
                                                className="password bg-[#FAFAFA] font-['Lato'] w-[30rem] border-none text-lg p-3 py-4 focus:ring-transparent"
                                                isRequired={false}
                                                onBlur={handleBlur}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'newPassword',
                                                        true
                                                    );
                                                }}
                                                hideError={true}
                                                onCopy={(e: any) =>
                                                    e.preventDefault()
                                                }
                                                onPaste={(e: any) =>
                                                    e.preventDefault()
                                                }
                                                data-testid="new-password"
                                            />
                                            <img
                                                className="mt-5 absolute end-2 cursor-pointer"
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        !showNewPassword
                                                    )
                                                }
                                                data-testid="new-password-img"
                                                src={
                                                    showNewPassword
                                                        ? hide
                                                        : view
                                                }
                                                alt="view"
                                            />
                                        </div>
                                        {touched.newPassword &&
                                            errors.newPassword && (
                                                <div className="text-red-700 text-xs mt-1">
                                                    {errors.newPassword}
                                                </div>
                                            )}
                                        <div className="flex relative items-center border border-black rounded-md w-[28rem]">
                                            <Field
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                label="Confirm Password"
                                                component={Input}
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="Confirm Password"
                                                hideLabel={true}
                                                className="password bg-[#FAFAFA] font-['Lato'] w-[30rem] border-none text-lg p-3 py-4 focus:ring-transparent"
                                                isRequired={false}
                                                onBlur={handleBlur}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'confirmPassword',
                                                        true
                                                    );
                                                }}
                                                hideError={true}
                                                onCopy={(e: any) =>
                                                    e.preventDefault()
                                                }
                                                onPaste={(e: any) =>
                                                    e.preventDefault()
                                                }
                                                data-testid="confirm-password"
                                            />
                                            <img
                                                className="mt-5 absolute end-2 cursor-pointer"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                data-testid="confirm-password-img"
                                                src={
                                                    showConfirmPassword
                                                        ? hide
                                                        : view
                                                }
                                                alt="view"
                                            />
                                        </div>
                                        {touched.confirmPassword &&
                                            errors.confirmPassword && (
                                                <div className="text-red-700 text-xs mt-1">
                                                    {errors.confirmPassword}
                                                </div>
                                            )}
                                        {showError?.length ? (
                                            <div className="errorMsg text-red-700 text-xs text-center my-6 font-[lato]">
                                                {showError}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        {/* Length Check */}
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={
                                                    validation.length
                                                        ? checkGreen
                                                        : crossRed
                                                }
                                                alt="length"
                                            />
                                            <span
                                                className={
                                                    validation.length
                                                        ? 'text-green-600 text-sm'
                                                        : values.newPassword
                                                          ? 'text-red-600 text-sm'
                                                          : 'text-black text-sm'
                                                }
                                            >
                                                Password must be at least 10
                                                characters long
                                            </span>
                                        </div>
                                        {/* Uppercase Check */}
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={
                                                    validation.uppercase
                                                        ? checkGreen
                                                        : crossRed
                                                }
                                                alt="uppercase"
                                            />
                                            <span
                                                className={
                                                    validation.uppercase
                                                        ? 'text-green-600 text-sm'
                                                        : values.newPassword
                                                          ? 'text-red-600 text-sm'
                                                          : 'text-black text-sm'
                                                }
                                            >
                                                Password must contain at least
                                                one uppercase letter
                                            </span>
                                        </div>
                                        {/* Lowercase Check */}
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={
                                                    validation.lowercase
                                                        ? checkGreen
                                                        : crossRed
                                                }
                                                alt="lowercase"
                                            />
                                            <span
                                                className={
                                                    validation.lowercase
                                                        ? 'text-green-600 text-sm'
                                                        : values.newPassword
                                                          ? 'text-red-600 text-sm'
                                                          : 'text-black text-sm'
                                                }
                                            >
                                                Password must contain at least
                                                one lowercase letter
                                            </span>
                                        </div>
                                        {/* Digit Check */}
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={
                                                    validation.digit
                                                        ? checkGreen
                                                        : crossRed
                                                }
                                                alt="digit"
                                            />
                                            <span
                                                className={
                                                    validation.digit
                                                        ? 'text-green-600 text-sm'
                                                        : values.newPassword
                                                          ? 'text-red-600 text-sm'
                                                          : 'text-black text-sm'
                                                }
                                            >
                                                Password must contain at least
                                                one digit
                                            </span>
                                        </div>
                                        {/* Special Character Check */}
                                        <div className="flex items-center space-x-2">
                                            <img
                                                src={
                                                    validation.specialChar
                                                        ? checkGreen
                                                        : crossRed
                                                }
                                                alt="specialChar"
                                            />
                                            <span
                                                className={
                                                    validation.specialChar
                                                        ? 'text-green-600 text-sm'
                                                        : values.newPassword
                                                          ? 'text-red-600 text-sm'
                                                          : 'text-black text-sm'
                                                }
                                            >
                                                Password must contain at least
                                                one special character
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            data-testid="change-password-button"
                                            type="submit"
                                            disabled={
                                                values.password === '' ||
                                                values.confirmPassword === '' ||
                                                values.newPassword === '' ||
                                                (errors?.confirmPassword?.length
                                                    ? true
                                                    : false)
                                            }
                                            className="submitButton my-3 py-2 w-1/2 text-2xl font-semibold rounded-md border border-transparent bg-[#45D2F5] text-white hover:bg-transparent hover:border hover:border-[#45D2F5] hover:text-[#45D2F5] hover:-translate-y-1 hover:transition hover:duration-500 disabled:opacity-50 disabled:bg-secondary-200 disabled:pointer-events-none"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
