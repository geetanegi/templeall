import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, FormikHelpers, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
// assets import
import TikTok from "../assets/images/TikTok.svg";
import aceCampLogo from "../assets/images/aceCamp_logo.png";

import FormikControl from "../Formik/components/FormikControl";
import OtpScreen from "../components/OtpScreen";
import SuccessScreen from "../components/SuccessScreen";
import apiService from "../services/apiService";
import moment from "moment";
import { setLoading } from "../reducers/loader/loader";
import { ToastError, ToastSuccess } from "../components/Toast";
import { ROUTES } from "../utils/routesPath";
import InstagramLoginComponent from "../components/social-login/InstagramLoginComponent";
import FacebookLoginComponent from "../components/social-login/FacebookLoginComponent";
import GoogleLoginComponent from "../components/social-login/GoogleLoginComponent";
import { API_URL } from "../services/enums";
import dayjs from "dayjs";
import { PasswordRegex } from "../utils/passwordValidation";
import { ALPHANUMERIC_REGEX } from "../utils/RegexPatterns";
import TermsAndConditionsPdf from "../assets/Pdf/AceCamGolf_TermsAndConditions.pdf";
import privacyPolicyPdf from "../assets/Pdf/AceCamGolf_PrivacyPolicy.pdf";

import { downloadFile } from "../utils/downloadUtils";
import { Colors } from "../utils/colorEnum";

const Register: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
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
      .required("First Name is required ")
      .matches(
        /^[A-Za-z]+$/,
        "First Name must contain only alphabetic characters",
      )
      .max(100, "First Name must be less than 100 characters"),
    lastName: Yup.string()
      .required("Last Name is required ")
      .matches(
        /^[A-Za-z]+$/,
        "Last Name must contain only alphabetic characters",
      )
      .max(100, "Last Name must be less than 100 characters"),
    username: Yup.string()
      .required("Username is Required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username must contain only alphanumeric characters",
      )
      .min(3, "Username must be at least 3 characters")
      .max(25, "Username must be less than 25 characters"),
    password: Yup.string()
      .required(PasswordRegex.REQUIRED)
      .matches(PasswordRegex.PATTERN, PasswordRegex.FORMAT)
      .max(25, PasswordRegex.MAX_LENGTH),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "The passwords do not match. Please ensure both password fields are identical",
      )
      .required("Confirm password is Required"),

    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is Required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "You must agree to the Terms and Conditions to proceed",
    ),
    phone: Yup.string().required("Phone is Required"),
    dateOfBirth: Yup.date()
      .nullable() // Allows the field to be empty (null)
      .test(
        "not-future-date",
        "Date cannot be in the future",
        (value) => !value || moment(value).isSameOrBefore(moment(), "day"),
      ),
  });

  const [cardError, setCardError] = useState<string | null>(null);
  const [isCardEmpty, setIsCardEmpty] = useState(true); // Track if CardElement is empty
  const [cardTouched, setCardTouched] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>,
  ) => {
    setEmail(values.email);
    dispatch(setLoading(true));
    setCardTouched(false);
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
      } = values;

      const newData = {
        username,
        password,
        firstName: firstName,
        lastName: lastName,
        emailId: email,
        countryCode: countryCode,
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
        ToastError(data?.description);
      } else {
        ToastError(data?.description);
      }
    } catch (error) {
      ToastError("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    if ((cardTouched && !cardNumberElement) || isCardEmpty) {
      setCardError("Card details are required");
      setSubmitting(false);
      setIsCardEmpty(true);
      return;
    }
  };

  const DisplayScreens = () => {
    if (showOtpScreen === true) {
      return (
        <OtpScreen
          email={email}
          setShowSuccessScreen={setShowSuccessScreen}
          setShowOtpScreen={setShowOtpScreen}
          url={API_URL.verifyRegisterOtp}
          username={usernameValue}
        />
      );
    } else if (showSuccessScreen === true) {
      return <SuccessScreen />;
    }
  };

  const downloadTermsAndConditionsFunc = () => {
    downloadFile(TermsAndConditionsPdf, "terms-and-conditions.pdf");
  };

  const downloadPrivacyPolicyFunc = () => {
    downloadFile(privacyPolicyPdf, "privacy-policy.pdf");
  };

  return (
    <>
      {!showOtpScreen && !showSuccessScreen && (
        <div className="bg-back-600 my-10 flex h-auto  w-full flex-col border items-center rounded-xl p-2 md:w-full md:p-8"
        style={{
          background: Colors.backgroundDark2
        }}
        >
          <img src={aceCampLogo} alt="" className="-mt-24 h-32 w-32" />
          <div className="flex gap-5">
            <InstagramLoginComponent />
            <FacebookLoginComponent
              appId="490090883627586"
              redirectUri={API_URL.fbRedirectUI}
            />
            <img src={TikTok} alt="" />
            <GoogleLoginComponent  />
          </div>
          <h2 className={`my py-2 my-8 font-semibold text-primaryText`}>-OR-</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full max-w-md">
                <div className="mb-4 flex gap-4">
                  <div className="flex w-1/2 flex-col pr-2">
                    <FormikControl
                      label=" First Name"
                      name="firstName"
                      control="input"
                      className="w-full"
                      placeholder=" Your First Name"
                      type="text"
                      required={true}
                    />
                  </div>
                  <div className="flex w-1/2 flex-col pl-2">
                    <FormikControl
                      label=" Last Name"
                      name="lastName"
                      control="input"
                      className="w-full"
                      placeholder=" Your Last Name"
                      type="text"
                      required={true}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <FormikControl
                    label=" Username"
                    name="username"
                    control="input"
                    className="w-full"
                    placeholder=" Your Username"
                    type="text"
                    required={true}
                    maxLength={25}
                    validateRegex={ALPHANUMERIC_REGEX}
                  />
                </div>
                <div className="mb-4">
                  <FormikControl
                    label=" Password"
                    name="password"
                    control="input"
                    className="w-full"
                    placeholder=" Your Password"
                    type="password"
                    required={true}
                    maxLength={25}
                  />
                </div>
                <div className="mb-4">
                  <FormikControl
                    label="Confirm Password"
                    name="confirmPassword"
                    control="input"
                    className="w-full"
                    placeholder="Confirm Your Password"
                    type="password"
                    required={true}
                    maxLength={25}
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
                  />
                </div>
                <div className="mb-4">
                  <FormikControl
                    label="Email"
                    name="email"
                    control="input"
                    className="w-full"
                    placeholder="Email"
                    type="text"
                    required={true}
                  />
                </div>
                <div className="mb-4 flex">
                  <div className="flex w-20 pr-2">
                    <FormikControl
                      name="countryCode"
                      control="input"
                      className="w-full"
                      type="text"
                    />
                  </div>
                  <div className="flex w-full pl-2">
                    <FormikControl
                      label="Phone"
                      name="phone"
                      control="number"
                      className="w-full"
                      placeholder="Phone"
                      required={true}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <FormikControl
                    label="GHIN"
                    name="ghin"
                    control="number"
                    className="w-full"
                    placeholder="GHIN"
                  />
                </div>
                <div className="mx-auto max-w-md">
                  <h2 className={`mb-4 text-xl text-primaryText font-semibold `}>
                    Card Information
                  </h2>
                  <div className="mb-4 flex flex-col">
                    <div
                      className={`mb-5 rounded border-2 bg-black-opacity-50 p-4 ${
                        cardTouched && cardError
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <CardNumberElement
                        options={{
                          placeholder: "Card Number",
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#fff",
                              "::placeholder": {
                                color: "#fff",
                              },
                            },
                            invalid: {
                              color: "red",
                            },
                          },
                        }}
                      />
                    </div>

                    <div
                      className={`mb-5 rounded border-2 bg-black-opacity-50 p-4 ${
                        cardTouched && cardError
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <CardExpiryElement
                        options={{
                          placeholder: "Expiry Date",
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#fff",
                              "::placeholder": {
                                color: "#fff",
                              },
                            },
                            invalid: {
                              color: "red",
                            },
                          },
                        }}
                      />
                    </div>
                    <div
                      className={`rounded border-2 bg-black-opacity-50 p-4 ${
                        cardTouched && cardError
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <CardCvcElement
                        options={{
                          placeholder: "CVV",
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#fff",
                              "::placeholder": {
                                color: "#fff",
                              },
                            },
                            invalid: {
                              color: "red",
                            },
                          },
                        }}
                      />
                    </div>
                    {cardTouched && cardError ? (
                      <div className="mt-2 text-sm text-red-500">
                        {cardError}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-4 flex gap-4"></div>
                  <div>
                    <FormikControl
                      label="Name On Card"
                      name="nameOnCard"
                      id="nameOnCard"
                      control="input"
                      className="w-full"
                      placeholder="Enter Your Name"
                      type="text"
                    />
                  </div>
                  <div className="mb-6 flex flex-col">
                    <label className="inline-flex items-center">
                      <Field
                        type="checkbox"
                        name="acceptTerms"
                        className="form-checkbox h-4 w-4 leading-tight text-blue-400"
                      />
                      <span className={`ml-2 text-primaryText`}>
                        Agreeing to{" "}
                        <Link
                          onClick={downloadTermsAndConditionsFunc}
                          className={`px-1 text-sm text-link underline hover:underline`}
                          to=""
                        >
                          Terms and Conditions
                        </Link>
                        of the contest
                      </span>
                    </label>
                    <ErrorMessage
                      name="acceptTerms"
                      component="span"
                      className="block text-sm text-red-600"
                    />
                  </div>
                  {/* 
                  <div className="mb-4">
                    <label className="inline-flex items-center">
                      <Field
                        type="checkbox"
                        name="acceptTerms"
                        className="form-checkbox h-4 w-4 text-[#1E95C1]"
                      />
                      <span className="ml-2 text-gray-700">
                        I agree to Terms & Conditions and Privacy Policy
                      </span>
                    </label>
                    <ErrorMessage
                      name="acceptTerms"
                      component="span"
                      className="text-sm text-red-600"
                    />
                  </div> */}
                </div>

                <button
                  type="submit"
                  className={`w-full rounded-md bg-buttonPrimary border py-2 text-white hover:bg-lime-600`}
                  disabled={isSubmitting}
                >
                  Create Account
                </button>

                <p className={`mb-6 mt-2 text-center text-primaryText md:text-left`}>
                  Already have an account?{" "}
                  <Link
                    to={ROUTES.LOGIN}
                    className={`text-sm text-link hover:underline`}
                  >
                    Login
                  </Link>
                </p>
              </Form>
            )}
          </Formik>

          <div>
            <div className="-mt-5 md:hidden">
              <p
                className={`cursor-pointer text-link hover:underline`}
                onClick={downloadPrivacyPolicyFunc}
              >
                Privacy Policy
              </p>
            </div>
            <div className="fixed bottom-14 right-[70px] hidden h-0.5 w-[17%] items-end md:flex">
              <div className="right-1 top-[1px] md:absolute">
                <p
                  className={`cursor-pointer p-2 text-link hover:underline`}
                  onClick={downloadPrivacyPolicyFunc}
                >
                  Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showOtpScreen && (
        <div className="bg-back-600 flex h-auto w-full flex-col items-center rounded-xl bg-[#ffffff] bg-opacity-50 p-6 md:w-full md:p-8">
          {DisplayScreens()}
        </div>
      )}
    </>
  );
};

export default Register;
