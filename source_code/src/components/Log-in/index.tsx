import React, { useEffect, useRef, useState } from 'react';
import Input from '../Generics/Inputs/Input';
import { Field, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    savingLoggedUserDetails,
    SavingLoginData,
    SavingPermission,
} from '../../redux/slice/getUserPermission/getUserPermissionSlice';
import { getUserProfileDataCall } from '../../redux/slice/UserProfileData/userProfileDataSlice';
import { ROUTES } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Generics/Button';
import loginApi from '../../api/services/login.service';
import getUserPermissions from '../../api/services/getUserPermission.service';
import view from '../../assets/img/GridIcons/view.svg';
import hide from '../../assets/img/crossEye.svg';
import verifyOTPAPI from '../../api/services/OTP/verifyOTP.service';
import sendOTPAPI from '../../api/services/OTP/sendOTP.service';
import { debounce } from 'lodash';
interface Values {
    username: string;
    password: string;
    otp: any;
}
export default function Login(): React.JSX.Element {
    const navigate = useNavigate();
    const formikRef = useRef<any>(null);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorOTP, setIsErrorOTP] = useState(false);
    const [errorMsg, setIsErrorMsg] = useState('');
    const [errorMsgOTP, setIsErrorMsgOTP] = useState('');
    const [captchaError, setCaptchaError] = useState(false);
    const [showCaptchaError, setShowCaptchaError] = useState('');
    const [formDisable, setFormDisable] = useState(false);
    const [captchaValid, setCaptchaValid] = useState(false); // State to track CAPTCHA validity
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [verifyStatus, setVerifyStatus] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dispatch = useDispatch<any>();
    const { login } = useAuth();
    const userExist = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const access_token =
        localStorage?.access_token != undefined
            ? JSON.parse(localStorage?.access_token)
            : '';
    const initialValues: Values = {
        username: '',
        password: '',
        otp: '',
    };
    const disableMsg =
        'You have entered the wrong password 5 times. Please wait for 30 minutes to unlock your account or contact the administrator for assistance.';
    const errorMassage =
        'Your account is locked. Please wait for 30 minutes to unlock your account or contact your administrator to reset your password.';
    const generateCaptcha = (): void => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const chars =
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let captcha = '';
                for (let i = 0; i < 6; i++) {
                    captcha += chars.charAt(
                        Math.floor(Math.random() * chars.length)
                    );
                }
                ctx.font = '30px Arial';
                ctx.fillStyle = '#000';
                const xOffset = 25; // Increase this value to control the horizontal spacing
                const yOffset = 30; // Vertical position of the text
                for (let i = 0; i < captcha.length; i++) {
                    const rotation = (Math.random() - 0.5) * 0.2; // Slightly tilt each character
                    ctx.save();
                    ctx.translate(10 + i * xOffset, yOffset); // Adjust starting position
                    ctx.rotate(rotation);
                    ctx.fillText(captcha[i], 0, 0);
                    ctx.restore();
                }
                setCaptchaText(captcha);
                setCaptchaValid(false); // Reset CAPTCHA validity
            }
        }
    };
    useEffect(() => {
        generateCaptcha();
    }, []);
    const handleCaptchaChange = (e: any): void => {
        setUserInput(e.target.value);
        setCaptchaValid(e.target.value === captchaText);
    };
    const handleRedirection = (loginDetails: any): void => {
        if (loginDetails?.isTwoFactorAuthentication) {
            return;
        } else if (loginDetails?.isResetPassword) {
            return;
        } else {
            if (loginDetails?.isDuplicateOrganization) {
                navigate(ROUTES.OrganizationPage);
            } else {
                navigate(ROUTES.LandingPage);
            }
        }
    };
    const handleResendotp = async (): Promise<any> => {
        const payloadData = {
            username: userExist?.user?.username,
            organizationId: userExist?.value?.data?.orgId,
            password: formikRef?.current?.values?.password,
        };
        const res = await sendOTPAPI.sendOTP(payloadData);
        if (!res?.data?.error) {
            // Handle success
        } else {
            return res;
        }
    };
    const handleVerfiyotp = async (): Promise<any> => {
        const payloadData = {
            userId: userExist?.value?.data?.userId,
            username: userExist?.user?.username,
            otp: formikRef?.current?.values?.otp,
            organizationId: userExist?.value?.data?.orgId,
            isRestPassword: userExist?.value?.data?.isResetPassword,
            userLoginId: userExist?.value?.data?.userLoginId,
        };
        const res = await verifyOTPAPI.verifyOTP(payloadData);
        if (!res?.data?.error) {
            localStorage.setItem(
                'access_token',
                JSON.stringify(res.data?.data)
            );
            if (!userExist?.value?.data?.isDuplicateOrganization) {
                const res1 = await getUserPermissions.userPermission();
                if (!res1?.data?.error) {
                    dispatch(SavingPermission(res1?.data));
                }
                login().then(() => {
                    dispatch(getUserProfileDataCall());
                });
            }
            setTimeout(() => {
                navigate(
                    userExist?.value?.data?.isDuplicateOrganization
                        ? ROUTES.OrganizationPage
                        : userExist?.value?.data?.isTwoFactorAuthentication
                          ? ROUTES.LandingPage
                          : ROUTES.changePassword
                );
                setVerifyStatus(false);
            }, 1000);
        } else {
            setIsErrorMsgOTP(res?.data?.description);
            setIsErrorOTP(true);
            setVerifyStatus(false);
            return res;
        }
    };
    const handleLogin = async (loginDetails: any): Promise<void> => {
        if (
            !loginDetails?.isDuplicateOrganization &&
            !loginDetails?.isResetPassword
        ) {
            const res = await getUserPermissions.userPermission();
            if (!res?.data?.error) {
                handleRedirection(loginDetails);
                dispatch(SavingPermission(res?.data));
            }
            login().then(() => {
                dispatch(getUserProfileDataCall());
            });
        } else {
            handleRedirection(loginDetails);
        }
    };
    const debouncedDisableForm = debounce(() => {
        setFormDisable(false);
    }, 1800000);
    const handleSubmitForm = async (values: Values): Promise<void> => {
        if (!captchaValid) {
            setCaptchaError(true);
            setShowCaptchaError(
                'The captcha you entered is incorrect. Please try again.'
            );
            generateCaptcha(); // Regenerate CAPTCHA on error
            return; // Prevent API call
        }
        dispatch(savingLoggedUserDetails({ username: values?.username }));
        const data = {
            username: values?.username,
            password: values?.password,
        };
        const res = await loginApi.userLogin(data);
        if (!res?.data?.error) {
            handleLogin(res.data?.data);
            localStorage.setItem(
                'access_token',
                JSON.stringify(res.data?.data)
            );
        } else {
            if (
                res?.data?.description === disableMsg ||
                res?.data?.description === errorMassage
            ) {
                setFormDisable(true);
                debouncedDisableForm();
            }
            setIsError(true);
            setIsErrorMsg(res?.data?.description);
        }
        dispatch(SavingLoginData(res?.data));
    };
    const handleKeyPress = async (e: any, values: Values): Promise<any> => {
        if (e?.key === 'Enter') {
            if (e.target.value?.length !== 0 && captchaValid) {
                dispatch(
                    savingLoggedUserDetails({ username: values?.username })
                );
                const data = {
                    username: values?.username,
                    password: values?.password,
                };
                const res = await loginApi.userLogin(data);
                if (!res?.data?.error) {
                    handleLogin(res.data?.data);
                    localStorage.setItem(
                        'access_token',
                        JSON.stringify(res.data?.data)
                    );
                }
                dispatch(SavingLoginData(res?.data));
            }
        }
    };
    useEffect(() => {
        if (userExist?.value?.data?.userId || access_token?.userId) {
            handleRedirection(
                userExist?.value?.data ? userExist?.value?.data : access_token
            );
        }
    }, [0]);
    return (
        <div
            className={`w-1/3 flex items-center justify-center`}
            data-testid="login-page"
        >
            <div className="bg-[#FAFAFA] mr-8 rounded-[2rem] w-full shadow-2xl border-2 border-[#45D2F5] md:mr-20 lg:mr-40">
                <div className="p-4 mx-4 md:mx-8">
                    <div className="flex flex-col space-y-6 w-full md:w-[30rem]">
                        <h1 className="font-['Lato'] leading-tight text-3xl font-semibold">
                            Welcome Back!
                        </h1>
                        <span className="font-['Lato'] leading-tight text-medium font-medium">
                            Sign in with your email address and password.
                        </span>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitForm}
                        innerRef={formikRef}
                    >
                        {(props: any) => {
                            const {
                                values,
                                handleSubmit,
                                handleChange,
                                isSubmitting,
                                setSubmitting,
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <div className="my-3 space-y-5">
                                        {!formDisable && (
                                            <Field
                                                className={`email bg-[#FAFAFA] border border-gray-800 font-['Lato'] text-md p-3 py-4 focus:ring-transparent`}
                                                autoComplete="off"
                                                isRequired={false}
                                                id="username"
                                                name="username"
                                                component={Input}
                                                value={values.username}
                                                onChange={handleChange}
                                                placeholder="Email Address"
                                                label="Email"
                                                hideLabel={true}
                                                autoFocus={true}
                                                data-testid="username"
                                            />
                                        )}
                                        {!formDisable && (
                                            <div
                                                className={`flex relative items-center border border-black rounded-md `}
                                            >
                                                <Field
                                                    className="password bg-[#FAFAFA] font-['Lato'] border-none text-lg p-3 py-4 focus:ring-transparent pr-10"
                                                    autoComplete="off"
                                                    label=" Password"
                                                    isRequired={false}
                                                    id="password"
                                                    name="password"
                                                    component={Input}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    data-testid="password-field"
                                                    onKeyDown={(e: any) => {
                                                        handleKeyPress(
                                                            e,
                                                            values
                                                        );
                                                        if (
                                                            e?.key ===
                                                                'Enter' &&
                                                            e?.target?.value !==
                                                                0 &&
                                                            captchaValid
                                                        ) {
                                                            setSubmitting(true);
                                                        }
                                                    }}
                                                    onCopy={(e: any) =>
                                                        e.preventDefault()
                                                    }
                                                    onPaste={(e: any) =>
                                                        e.preventDefault()
                                                    }
                                                    placeholder="Password"
                                                    type={
                                                        visiblePassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    hideLabel={true}
                                                />
                                                <Button
                                                    className=""
                                                    type="secondary"
                                                    onClick={() =>
                                                        setVisiblePassword(
                                                            !visiblePassword
                                                        )
                                                    }
                                                >
                                                    <img
                                                        className="absolute end-2 cursor-pointer"
                                                        src={
                                                            visiblePassword
                                                                ? hide
                                                                : view
                                                        }
                                                        alt="view"
                                                        data-testid="password-field-img"
                                                    />
                                                </Button>
                                            </div>
                                        )}
                                        <div className="flex justify-end ">
                                            <Link
                                                to={ROUTES.sendEmail}
                                                className="font-medium text-gray-400 text-xs hover:text-[#45D2F5]"
                                            >
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        {isError && (
                                            <div className="errorMsg w-[26rem] text-red-700 text-xs text-center my-6 font-[lato]">
                                                {errorMsg}
                                            </div>
                                        )}
                                        {(userExist?.value?.data
                                            ?.isResetPassword ||
                                            userExist?.value?.data
                                                ?.isTwoFactorAuthentication) && (
                                            <div className="flex flex-col space-y-2">
                                                <span className="font-['Lato'] leading-tight text-medium font-medium">
                                                    Submit the OTP received on
                                                    the registered email address
                                                </span>
                                                <Field
                                                    className=" bg-[#FAFAFA] border border-gray-800 font-['Lato'] text-md p-3 py-4 focus:ring-transparent"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="otp"
                                                    name="otp"
                                                    component={Input}
                                                    value={values.otp}
                                                    onChange={handleChange}
                                                    placeholder="Enter One Time Password"
                                                    label="otp"
                                                    hideLabel={true}
                                                    autoFocus={true}
                                                    data-testid="otp"
                                                    onKeyDown={(
                                                        e: React.KeyboardEvent<HTMLInputElement>
                                                    ) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault(); // Prevent form submission if needed
                                                            handleVerfiyotp();
                                                        }
                                                    }}
                                                />
                                                {isErrorOTP && (
                                                    <label className="font-['Lato'] leading-tight text-red-800 text-sm font-medium">
                                                        {errorMsgOTP}
                                                    </label>
                                                )}
                                                <div className="text-center mt-1">
                                                    <Button
                                                        className=""
                                                        type="secondary"
                                                        onClick={() => {
                                                            handleResendotp();
                                                        }}
                                                    >
                                                        <span
                                                            data-testid="on-click-resend-otp"
                                                            className="font-['Lato'] text-medium font-semibold text-primary-700 hover:underline cursor-pointer"
                                                        >
                                                            Resend OTP
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {/* CAPTCHA Integration */}
                                    {!formDisable &&
                                        !(
                                            userExist?.value?.data
                                                ?.isResetPassword ||
                                            userExist?.value?.data
                                                ?.isTwoFactorAuthentication
                                        ) && (
                                            <div className="flex flex-col  space-y-2">
                                                <div className="flex items-center">
                                                    <canvas
                                                        ref={canvasRef}
                                                        width="200"
                                                        height="50"
                                                        className="ml-[11rem]"
                                                    ></canvas>
                                                </div>
                                                <Field
                                                    className=" bg-[#FAFAFA] border border-gray-800 font-['Lato'] text-md p-3 py-4 focus:ring-transparent"
                                                    autoComplete="off"
                                                    isRequired={false}
                                                    id="captcha"
                                                    name="captcha"
                                                    component={Input}
                                                    value={userInput}
                                                    onChange={(e: any) => {
                                                        handleCaptchaChange(e);
                                                        setCaptchaError(false);
                                                    }}
                                                    placeholder="Enter CAPTCHA"
                                                    label=""
                                                    hideLabel={true}
                                                    data-testid="captcha-field"
                                                    onKeyDown={(
                                                        e: React.KeyboardEvent<HTMLInputElement>
                                                    ) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault(); // Prevent form submission if needed
                                                            handleSubmit();
                                                        }
                                                    }}
                                                />
                                                {captchaError && (
                                                    <div className="text-red-700 text-xs">
                                                        {showCaptchaError}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    <div className="flex justify-center mt-10">
                                        <span className="font-['Lato'] leading-tight text-sm font-medium">
                                            By logging in you agree to the terms
                                            of service.
                                        </span>
                                    </div>
                                    {userExist?.value?.data?.isResetPassword ||
                                    userExist?.value?.data
                                        ?.isTwoFactorAuthentication ? (
                                        <div
                                            className={`flex justify-center ${formDisable ? 'pointer-events-none opacity-40' : ''}`}
                                        >
                                            <Button
                                                type="button"
                                                loading={verifyStatus}
                                                onClick={() => {
                                                    handleVerfiyotp();
                                                    setVerifyStatus(true);
                                                }}
                                                disabled={isSubmitting}
                                                data-testid="login-button"
                                                className="submitButton my-3 py-2 w-1/2 text-2xl font-semibold rounded-md border
                                                        border-transparent bg-[#45D2F5] text-white hover:bg-transparent hover:border hover:border-[#45D2F5] hover:text-[#45D2F5] hover:-translate-y-1 hover:transition hover:duration-500 disabled:opacity-50
                                                        disabled:bg-secondary-200 disabled:pointer-events-none"
                                            >
                                                Verify OTP
                                            </Button>
                                        </div>
                                    ) : (
                                        <div
                                            className={`flex justify-center ${formDisable ? 'pointer-events-none opacity-40' : ''}`}
                                        >
                                            <Button
                                                type="button"
                                                loading={isSubmitting}
                                                onClick={() => {
                                                    setSubmitting(true);
                                                    handleSubmit();
                                                }}
                                                disabled={isSubmitting} // Disable button if CAPTCHA is not valid
                                                data-testid="login-button"
                                                className="submitButton my-3 py-2 w-1/2 text-2xl font-semibold rounded-md border
                                                                border-transparent bg-[#45D2F5] text-white hover:bg-transparent hover:border hover:border-[#45D2F5] hover:text-[#45D2F5] hover:-translate-y-1 hover:transition hover:duration-500 disabled:opacity-50
                                                                disabled:bg-secondary-200 disabled:pointer-events-none"
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    )}
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
