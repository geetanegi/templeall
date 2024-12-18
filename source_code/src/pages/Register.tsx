import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import FormikControl from "../Formik/components/FormikControl";
import OtpScreen from "../components/OtpScreen";
import SuccessScreen from "../components/SuccessScreen";
import apiService from "../services/apiService";
import moment from "moment";
import { setLoading } from "../reducers/loader/loader";
import { ToastInfo, ToastSuccess } from "../components/Toast";

import { API_URL } from "../services/enums";
import dayjs from "dayjs";
import { PasswordRegex } from "../utils/passwordValidation";
import { ALPHANUMERIC_REGEX } from "../utils/RegexPatterns";
import TermsAndConditionsPdf from "../assets/Pdf/AceCamGolfTermsandConditions.pdf";

import { viewPdf } from "../utils/downloadUtils";
import { validationConstant } from "../utils/validationEnums";

const Register: React.FC = () => {
  // const stripe = useStripe();
  // const elements = useElements();
  const dispatch = useDispatch();

  interface RegisterFormValues {
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ghin: string;
    nameOnCard: string;
    email: string;
    countryCode: string;
    phone: number | string;
    acceptTerms: boolean;
  }

  const initialValues: RegisterFormValues = {
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    ghin: "",
    nameOnCard: "",
    email: "",
    countryCode: "+1",
    phone: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(validationConstant.firstNameRequired)
      .matches(/^[A-Za-z]+$/, validationConstant.firstNameContains)
      .max(25, validationConstant.firstNameMaxLength),
    lastName: Yup.string()
      .required(validationConstant.lastNameRequired)
      .matches(/^[A-Za-z]+$/, validationConstant.lastNameContains)
      .max(25, validationConstant.lastNameMaxLength),
    username: Yup.string()
      .required(validationConstant.usernameRequired)
      .matches(/^[a-zA-Z0-9]+$/, validationConstant.userNameContains)
      .min(3, validationConstant.usernameMinWordLimit)
      .max(25, validationConstant.userNameMaxWordLimit),
    password: Yup.string()
      .required(PasswordRegex.REQUIRED)
      .matches(PasswordRegex.PATTERN, PasswordRegex.FORMAT)
      .max(25, PasswordRegex.MAX_LENGTH),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], validationConstant.matchingConfirmPassword)
      .required(validationConstant.confirmPasswordRequired),

    email: Yup.string()
      .email(validationConstant.validEmail)
      .required(validationConstant.emailRequired),
    acceptTerms: Yup.bool().oneOf(
      [true],
      validationConstant.agreeTermsAndConditions,
    ),
    phone: Yup.string().required(validationConstant.phoneNumberIsRequired)
    .min(10, validationConstant.validPhone),
    countryCode: Yup.string().required(validationConstant.countryCodeRequired),
    dateOfBirth: Yup.string()
      .nullable()
      .transform((value, originalValue) => {
        // Transform empty string to null
        return originalValue === "" ? null : value;
      })
      .test(
        "not-future",
        validationConstant.DOBCanNotBeInFuture,
        (value) => {
          if (!value) return true; // Allow null or empty
          return moment(value).isSameOrBefore(moment(), "day"); // Ensure it's not in the future
        }
      )
  });

  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (values: RegisterFormValues) => {
    setEmail(values.email);
    dispatch(setLoading(true));
    try {
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        dateOfBirth,
        countryCode,
        phone,
        ghin,
      } = values;

      const newData = {
        username,
        password,
        firstName: firstName,
        lastName: lastName,
        emailId: email,
        countryCode: countryCode,
        ghin: ghin,
        ...(phone && phone.toString().length >= 2
          ? { mobile: `${phone}` }
          : {}),
        ...(dateOfBirth && {
          dateOfBirth: moment.utc(dateOfBirth).format(),
        }),
      };
      const { data, status } = await apiService.post<any>(API_URL.register, {
        data: newData,
      });
      if (status === 200 && data?.data != null && !data?.error) {
        ToastSuccess(
          "Registration successful! Please check your email for a verification link.",
        );
        localStorage.setItem("tokenRegisterPassword", data?.data?.token);

        setUsernameValue(username);
        setShowOtpScreen(true);
      } else if (status === 200 && data?.error && data?.description) {
        ToastInfo(data?.description);
      } else {
        ToastInfo(data?.description);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const DisplayScreens = () => {
    if (showOtpScreen === true) {
      return (
        <div
          className={`flex w-full flex-col items-center rounded-xl ${!showSuccessScreen ? "pb-4" : "p-5 px-2"} md:w-full`}
        >
          {/* <img src={aceCampLogo} alt="" className="w-[220px]" /> */}
          <h1 className={`mb-2 mt-5 text-xl font-semibold text-primaryText`}>
            {showOtpScreen && "OTP Verification"}
            {!showOtpScreen && !showSuccessScreen && "Forgot Your Password"}
          </h1>
          <OtpScreen
            email={email}
            setShowSuccessScreen={setShowSuccessScreen}
            setShowOtpScreen={setShowOtpScreen}
            url={API_URL.verifyRegisterOtp}
            username={usernameValue}
          />
        </div>
      );
    } else if (showSuccessScreen === true) {
      return <SuccessScreen />;
    }
  };

  const downloadTermsAndConditionsFunc = () => {
    viewPdf(TermsAndConditionsPdf);
  };

  return (
    <>
      {!showOtpScreen && !showSuccessScreen && (
        <div className="bg-back-600 mt-[5px] flex h-auto w-full flex-col items-center rounded-xl md:w-full md:p-0">
          {/* <img src={aceCampLogo} alt="" className="mb-[5px] w-[220px]" /> */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => {
              console.log("values", values);
              return (
                <Form className="w-full max-w-md">
                  <div className="mb-4">
                    <FormikControl
                      label=" First Name"
                      name="firstName"
                      control="logIn"
                      className="w-full"
                      placeholder=" Your First Name"
                      type="text"
                      required={true}
                      authFlow={true}
                      maxLength={25}
                    />
                  </div>
                  <div className="mb-4 ">
                    <FormikControl
                      label=" Last Name"
                      name="lastName"
                      control="logIn"
                      className="w-full"
                      placeholder=" Your Last Name"
                      type="text"
                      required={true}
                      authFlow={true}
                      maxLength={25}
                    />
                  </div>
                  <div className="mb-4">
                    <FormikControl
                      label=" Username"
                      name="username"
                      control="logIn"
                      className="w-full"
                      placeholder=" Your Username"
                      type="text"
                      required={true}
                      maxLength={25}
                      validateRegex={ALPHANUMERIC_REGEX}
                      authFlow={true}
                    />
                  </div>
                  <div className="mb-4">
                    <FormikControl
                      label=" Password"
                      name="password"
                      control="logIn"
                      className="w-full"
                      placeholder=" Your Password"
                      type="password"
                      required={true}
                      maxLength={25}
                      authFlow={true}
                    />
                  </div>
                  <div className="mb-4">
                    <FormikControl
                      label="Confirm Password"
                      name="confirmPassword"
                      control="logIn"
                      className="w-full"
                      placeholder="Confirm Your Password"
                      type="password"
                      required={true}
                      maxLength={25}
                      authFlow={true}
                    />
                  </div>
                  <div className="mb-4">
                    <FormikControl
                      label="Date of Birth"
                      name="dateOfBirth"
                      control="date"
                      className="w-full"
                      placeholder="Date of Birth"
                      type="date"
                      maxDate={dayjs()}
                      authFlow={true}
                    />
                  </div>
                  <div className="mb-4">
                    <FormikControl
                      label="Email"
                      name="email"
                      control="logIn"
                      className="w-full"
                      placeholder="Email"
                      type="text"
                      required={true}
                      authFlow={true}
                      maxLength={256}
                    />
                  </div>
                  <div className={`flex gap-2`}>
                    <div className="min-h-[20px] w-40 pr-2">
                      <FormikControl
                        authFlow={true}
                        label="Phone"
                        name="countryCode"
                        control="input"
                        maxLength={4}
                        className="w-full"
                        type="text"
                        required={true}
                      />
                    </div>
                    <div className="min-h-20px] flex w-full flex-col">
                      <FormikControl
                        label="Phone"
                        name="phone"
                        control="number"
                        className="w-full"
                        placeholder="Phone"
                        required={true}
                        authFlow={true}
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <div className="mb-4 text-xs text-[#FFFF00]">
                    (By providing your phone number, you agree to receive text
                    messages from AceCam Golf LLC. Message and data rates may
                    apply. )
                  </div>

                  <div className="mb-4">
                    <FormikControl
                      label="GHIN (Optional)"
                      Placeholder="GHIN"
                      name="ghin"
                      authFlow={true}
                      control="number"
                      className="w-full"
                      placeholder="GHIN"
                      maxLength={7}
                    />
                  </div>

                  <div className="mx-auto max-w-md">
                    <div className="mb-6 flex flex-col">
                      <label className="inline flex justify-center">
                        <Field
                          type="checkbox"
                          name="acceptTerms"
                          className="form-checkbox h-4 w-4 leading-tight text-blue-400 "
                        />
                        <span className={`ml-2 text-[13px] text-primaryText`}>
                          Agreeing to{" "}
                          <Link
                            onClick={downloadTermsAndConditionsFunc}
                            className={`px-1 text-[13px] text-link underline hover:underline`}
                            to=""
                          >
                            Terms and Conditions
                          </Link>
                          of the contest
                        </span>
                      </label>
                      <span
                        style={{
                          color: "#FFFF00",
                          fontSize: "0.875rem",
                        }}
                      >
                        <ErrorMessage
                          name="acceptTerms"
                          component="div"
                          className="text-[13px]"
                        />
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className={`flex h-[36px] w-[200px] items-center justify-center rounded-[12px] border bg-buttonPrimary py-2 text-primaryText hover:bg-lime-600`}
                      disabled={isSubmitting}
                    >
                      Create Account
                    </button>
                  </div>

                  {/* <p
                    className={`mb-6 mt-2 text-center text-primaryText md:text-left`}
                  >
                    Already have an account?{" "}
                    <Link
                      to={ROUTES.LOGIN}
                      className={`text-sm text-link hover:underline`}
                    >
                      Login
                    </Link>
                  </p> */}
                </Form>
              );
            }}
          </Formik>
          {/* <div className="mb-20 block h-[40px] w-full" style={{ zIndex: 1 }}>
            <p className="text-center text-[14px] text-white">
              - or sign in using -{" "}
            </p>
            <div className="flex items-center justify-center gap-8  ">
                <AppleSignInButton />
              <GoogleLoginComponent />
            </div>
          </div> */}
        </div>
      )}
      {showOtpScreen && <div className="my-auto flex">{DisplayScreens()}</div>}
    </>
  );
};

export default Register;
