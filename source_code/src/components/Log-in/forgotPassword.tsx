import React, { useEffect, useState } from 'react';
import Input from '../Generics/Inputs/Input';
import { Field, Formik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import Button from '../Generics/Button';
import forgotPassWord from '../../api/services/ForgotPassword/sendEmail.service';
import { openNotification } from '../../redux/slice/Notification/notifications';
import { useDispatch } from 'react-redux';
import view from '../../assets/img/GridIcons/view.svg';
import hide from '../../assets/img/crossEye.svg';
import checkGreen from '../../assets/img/Login/validationGreen.svg';
import crossRed from '../../assets/img/Login/validationRed.svg';
import * as Yup from 'yup';
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
export default function ForgotPassword(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const location = useLocation();
    const [decodedToken, setDecodedToken] = useState<string | null>(null);
    const [decodedEmail, setDecodedEmail] = useState<string | null>(null);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        const decodeToken = (search: string): void => {
            try {
                const params = new URLSearchParams(search);
                const encodedToken = params.get('token') || '';
                const encodedEmail = params.get('email') || '';
                // Decode the Base64 encoded token and email
                const token = atob(encodedToken);
                const email = atob(encodedEmail);
                setDecodedToken(token);
                setDecodedEmail(email);
            } catch (error) {
                setDecodedToken(null);
                setDecodedEmail(null);
            }
        };
        decodeToken(location.search);
    }, [location.search]);
    const initialValues: any = {
        username: decodedEmail,
        newPassword: '',
        confirmPassword: '',
    };
    interface Values {
        username: string;
        newPassword: string;
        confirmPassword: string;
    }
    const isSubmitDisabled = (values: Values, errors: any): boolean => {
        return (
            !values?.newPassword?.trim() ||
            !values?.confirmPassword?.trim() ||
            (errors?.confirmPassword?.length ? true : false)
        );
    };
    const handleSubmitForm = async (values: Values): Promise<any> => {
        if (values?.newPassword !== values?.confirmPassword) {
            return;
        } else {
            const data = {
                token: decodedToken,
            };
            localStorage.setItem('access_token', JSON.stringify(data));
            const payload = {
                newPassword: values?.newPassword,
            };
            const res = await forgotPassWord.SavePassword(payload);
            if (!res?.data?.error) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'Password Updated Successfully.',
                        description: '',
                    })
                );
                navigate(ROUTES.LoginPage);
            } else {
                setIsError(true);
                setErrorMsg(res?.data?.description);
            }
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
            className={`w-2/5 flex items-center justify-center`}
            data-testid="forgot-password-page"
        >
            <div className="bg-[#FAFAFA] mr-8 rounded-[2rem] w-full shadow-2xl border-2 border-[#45D2F5] md:mr-20 lg:mr-40">
                <div className="p-4 mx-4 md:mx-8">
                    <h1 className="text-zinc-600  font-['Lato'] leading-tight text-3xl  mt-2">
                        Reset Your Password!
                    </h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        validationSchema={ForgotPasswordSchema}
                        enableReinitialize={true}
                    >
                        {(props: any) => {
                            const {
                                values,
                                handleSubmit,
                                handleChange,
                                touched,
                                errors,
                                setFieldTouched,
                            } = props;
                            const validation = validatePassword(
                                values.newPassword
                            );
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="my-5 flex flex-col space-y-5">
                                        <Field
                                            className="email bg-[#FAFAFA] border border-gray-800 font-['Lato'] text-md p-3 py-4 focus:ring-transparent"
                                            autoComplete="off"
                                            isRequired={false}
                                            id="username"
                                            name="username"
                                            component={Input}
                                            value={values.username}
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                            label="Email"
                                            disabled={true}
                                            hideLabel={true}
                                            data-testid="username"
                                        />
                                        <div className="flex relative items-center border border-black rounded-md">
                                            <Field
                                                className="newPassword font-['Lato'] bg-[#FAFAFA] border-none text-lg p-3 py-4 focus:ring-transparent"
                                                autoComplete="off"
                                                isRequired={false}
                                                id="newPassword"
                                                name="newPassword"
                                                component={Input}
                                                value={values.newPassword}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'newPassword',
                                                        true
                                                    );
                                                }}
                                                data-testid="new-password"
                                                placeholder="Password"
                                                onCopy={(e: any) =>
                                                    e.preventDefault()
                                                }
                                                onPaste={(e: any) =>
                                                    e.preventDefault()
                                                }
                                                type={
                                                    showNewPassword
                                                        ? 'text'
                                                        : 'Password'
                                                }
                                                label="New Password"
                                                hideLabel={true}
                                                hideError={true}
                                            />
                                            <img
                                                className="absolute end-3 cursor-pointer"
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        !showNewPassword
                                                    )
                                                }
                                                src={
                                                    showNewPassword
                                                        ? hide
                                                        : view
                                                }
                                                alt="view"
                                                data-testid="new-password-img"
                                            />
                                        </div>
                                        <div className="flex relative items-center border border-black rounded-md">
                                            <Field
                                                className="password font-['Lato'] border-none text-lg p-3 py-4 focus:ring-transparent"
                                                autoComplete="off"
                                                isRequired={false}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                component={Input}
                                                onCopy={(e: any) =>
                                                    e.preventDefault()
                                                }
                                                onPaste={(e: any) =>
                                                    e.preventDefault()
                                                }
                                                value={values.confirmPassword}
                                                onChange={(e: any) => {
                                                    handleChange(e);
                                                    setFieldTouched(
                                                        'confirmPassword',
                                                        true
                                                    );
                                                }}
                                                placeholder="Confirm Password"
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'Password'
                                                }
                                                label="Confirm Password"
                                                hideLabel={true}
                                                hideError={true}
                                                data-testid="confirm-password"
                                            />
                                            <img
                                                className="absolute end-3 cursor-pointer"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                src={
                                                    showConfirmPassword
                                                        ? hide
                                                        : view
                                                }
                                                alt="view"
                                                data-testid="confirm-password-img"
                                            />
                                        </div>
                                        {touched.confirmPassword &&
                                            errors.confirmPassword && (
                                                <div className="text-red-700 text-xs mt-1">
                                                    {'Password does not match'}
                                                </div>
                                            )}
                                        {isError && (
                                            <div className="text-red-700 text-xs mt-1">
                                                {errorMsg}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <>
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
                                                    Password must contain at
                                                    least one uppercase letter
                                                </span>
                                            </div>
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
                                                    Password must contain at
                                                    least one lowercase letter
                                                </span>
                                            </div>
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
                                                    Password must contain at
                                                    least one digit
                                                </span>
                                            </div>
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
                                                    Password must contain at
                                                    least one special character
                                                </span>
                                            </div>
                                        </>
                                    </div>
                                    <div className=" flex justify-center">
                                        <Button
                                            data-testid="forgot-password-button"
                                            type="button"
                                            onClick={() => {
                                                handleSubmit();
                                            }}
                                            className="submitButton my-2 py-2 w-1/2 text-xl font-medium rounded-md border
                                                border-transparent bg-[#45D2F5] text-white hover:bg-transparent hover:border hover:border-[#45D2F5] hover:text-[#45D2F5] hover:-translate-y-1 hover:transition hover:duration-500 disabled:opacity-50
                                                        disabled:bg-secondary-200 disabled:cursor-not-allowed"
                                            disabled={isSubmitDisabled(
                                                values,
                                                errors
                                            )}
                                        >
                                            Reset Password
                                        </Button>
                                    </div>
                                    <div className="text-center font-normal text-xs mb-2 text-black hover:-translate-y-1 hover:transition hover:duration-500">
                                        {`Don't want to reset the password?`}
                                    </div>
                                    <div className="text-center font-normal text-xs mb-5 text-[#45D2F5] hover:-translate-y-1 hover:transition hover:duration-500">
                                        <Link to={ROUTES.LoginPage}>
                                            Return to login
                                        </Link>
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
