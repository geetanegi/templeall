import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import aceCampLogo from "../assets/images/Logo_png with heading.png";

import FormikControl from "../Formik/components/FormikControl";
import OtpScreen from "../components/OtpScreen";
import SuccessScreen from "../components/SuccessScreen";
import apiService from "../services/apiService";
import moment from "moment";
import { setLoading } from "../reducers/loader/loader";
import { ToastInfo, ToastSuccess } from "../components/Toast";
import { ROUTES } from "../utils/routesPath";
import GoogleLoginComponent from "../components/social-login/GoogleLoginComponent";
import { API_URL } from "../services/enums";
import dayjs from "dayjs";
import { PasswordRegex } from "../utils/passwordValidation";
import { ALPHANUMERIC_REGEX } from "../utils/RegexPatterns";
import TermsAndConditionsPdf from "../assets/Pdf/AceCamGolfTermsandConditions.pdf";

import { viewPdf } from "../utils/downloadUtils";
import AppleSignInButton from "../components/social-login/AppleSignInButton";

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
    dateOfBirth: Yup.string()
      .nullable() // Allow null values
      .test(
        "valid-date",
        "Invalid date. Expected format: MM/DD/YYYY",
        (value) => {
          // Check if the value is non-null and valid
          if (!value) return true; // If the value is null or empty, don't validate the format
          return moment(value, "MM/DD/YYYY", true).isValid(); // Validate the date using MM/DD/YYYY format
        },
      )
      .test("not-future", "Date cannot be in the future", (value) => {
        // Ensure the date is not in the future
        if (!value) return true; // If value is empty or null, don't validate future date
        return moment(value, "MM/DD/YYYY").isSameOrBefore(moment(), "day");
      }),
  });

  // const [cardError, setCardError] = useState<string | null>(null);
  // const [isCardEmpty, setIsCardEmpty] = useState(true); // Track if CardElement is empty
  // const [cardTouched, setCardTouched] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (
    values: RegisterFormValues,
    // { setSubmitting }: FormikHelpers<RegisterFormValues>,
  ) => {
    setEmail(values.email);
    dispatch(setLoading(true));
    // setCardTouched(false);
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

    // if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet
    //   return;
    // }
    // const cardNumberElement = elements.getElement(CardNumberElement);
    // if ((cardTouched && !cardNumberElement) || isCardEmpty) {
    //   setCardError("Card details are required");
    //   setSubmitting(false);
    //   setIsCardEmpty(true);
    //   return;
    // }
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
    viewPdf(TermsAndConditionsPdf);
  };


  return (
    <>
      {!showOtpScreen && !showSuccessScreen && (
        <div className="bg-back-600 flex h-auto w-full flex-col items-center rounded-xl md:w-full md:p-0">
          <img src={aceCampLogo} alt="" className="mb-[5px] w-[220px]" />
          {/* <div className="flex gap-5">
            <InstagramLoginComponent />
            <FacebookLoginComponent
              appId="490090883627586"
              redirectUri={API_URL.fbRedirectUI}
            />
            <img src={TikTok} alt="" />
            <GoogleLoginComponent />
          </div> */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => {
              console.log("values", values);
              return (
                <Form className="w-full max-w-md">
                  <div className="flex gap-2">
                    <div className="flex w-1/2 flex-col">
                      <FormikControl
                        label=" First Name"
                        name="firstName"
                        control="input"
                        className="w-full"
                        placeholder=" Your First Name"
                        type="text"
                        required={true}
                        authFlow={true}
                      />
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <FormikControl
                        label=" Last Name"
                        name="lastName"
                        control="input"
                        className="w-full"
                        placeholder=" Your Last Name"
                        type="text"
                        required={true}
                        authFlow={true}
                      />
                    </div>
                  </div>
                  <div className="">
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
                      authFlow={true}
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
                      authFlow={true}
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
                      control="input"
                      className="w-full"
                      placeholder="Email"
                      type="text"
                      required={true}
                      authFlow={true}
                      maxLength={256}
                    />
                  </div>
                  <div className="flex items-center h-[70px]">
                    <div className="w-20 pr-2 h-[73px] ">
                      <FormikControl
                        authFlow={true}
                        label="Phone"
                        name="countryCode"
                        control="input"
                        className="w-full"
                        type="text"
                        required={true}
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <FormikControl
                        label="&nbsp;"
                        name="phone"
                        control="number"
                        className="w-full"
                        placeholder="Phone"
                        authFlow={true}
                        maxLength={10}
                      />
                    </div>

                  </div>
                  <div className="text-xs  text-yellow-400 mb-[10px]">(By providing your phone number, you agree to receivetext messages from AceCam Golf LLC.Message and data rates may apply. )</div>


                  <div className="mb-4">
                    <FormikControl
                      label="GHIN (Optional)"
                      Placeholder="GHIN"
                      name="ghin"
                      control="number"
                      className="w-full"
                      placeholder="GHIN"
                    />
                  </div>

                  <div className="mx-auto max-w-md">

                    <div className="mb-6 flex flex-col">
                      <label className="inline-flex items-center">
                        <Field
                          type="checkbox"
                          name="acceptTerms"
                          className="form-checkbox -mt-[1rem] h-4 w-4 leading-tight text-blue-400"
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
                          color: "#FFDE59",
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

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className={`w-[200px] rounded-[12px] border bg-buttonPrimary py-2 text-white hover:bg-lime-600`}
                      disabled={isSubmitting}
                    >
                      Create Account
                    </button>
                  </div>

                  <p
                    className={`mb-6 mt-2 text-center text-primaryText md:text-left`}
                  >
                    Already have an account?{" "}
                    <Link
                      to={ROUTES.LOGIN}
                      className={`text-sm text-link hover:underline`}
                    >
                      Login
                    </Link>
                  </p>
                </Form>
              );
            }}
          </Formik>
          <div className="w-full">
            <p className="mt-[10px] text-center text-[14px] text-white">
              - or sign in using -{" "}
            </p>
            <div className="mt-[10px] flex items-center justify-center">
              <div className="mr-4">
                <GoogleLoginComponent />
              </div>
              <AppleSignInButton />
            </div>
          </div>
        </div>
      )}
      {showOtpScreen && (
        <div className="bg-back-600 flex h-auto w-full flex-col items-center rounded-xl border border-white bg-opacity-50 p-6 md:w-full md:p-8">
          {DisplayScreens()}
        </div>
      )}
    </>
  );
};

export default Register;
