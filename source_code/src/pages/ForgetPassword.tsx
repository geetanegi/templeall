// forget-password.tsx
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik/components/FormikControl";
import { Link } from "react-router-dom";
import aceCampLogo from "../assets/images/aceCamp_logo.png";

import OtpScreen from "../components/OtpScreen";
import apiService from "../services/apiService";
import { useDispatch } from "react-redux";
import { setLoading } from "../reducers/loader/loader";
import { ToastError, ToastSuccess } from "../components/Toast";
import { ROUTES } from "../utils/routesPath";
import { API_URL } from "../services/enums";
import { viewPdf } from "../utils/downloadUtils";
import privacyPolicyPdf from "../assets/Pdf/AceCam Golf Privacy Policy.docx.pdf";
import TermsAndConditionsPdf from "../assets/Pdf/AceCam Golf Terms and Conditions.docx.pdf";
const ForgetPassword: React.FC = () => {
  const dispatch = useDispatch();

  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [maskEmailVal, setMaskEmail] = useState<string>("");

  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);

  interface ResetPasswordFormValues {
    username: string;
  }

  /***
   * Initial values of Login Form
   * ***/
  const initialValues: ResetPasswordFormValues = {
    username: "",
  };

  /***
   * Validation Schema of login Form
   * ***/
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is Required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username must contain only alphanumeric characters",
      )
      .min(3, "Username must be at least 3 characters")
      .max(25, "Username must be less than 25 characters"),
  });

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    setUsername(values.username);
    dispatch(setLoading(true));

    try {
      const newData = {
        username: values.username,
        mode: "WEB",
      };

      const { data, status } = await apiService.post<any>(
        API_URL.forgotPassword,
        { data: newData },
      );
      if (status === 200 && data?.data?.message != null && !data?.error) {
        setMaskEmail(data?.data?.maskedEmail);
        ToastSuccess(data?.data?.message);
        setShowOtpScreen(true);
      } else if (status === 200 && data?.error && data?.description) {
        ToastError(data?.description);
      } else {
        ToastError(data?.description);
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
        <OtpScreen
          username={username}
          setShowSuccessScreen={setShowSuccessScreen}
          setShowOtpScreen={setShowOtpScreen}
          maskEmail={maskEmailVal}
        />
      );
    }
  };

  const downloadPrivacyPolicyFunc = () => {
    viewPdf(privacyPolicyPdf);
  };
  const downloadTermsAndConditionsFunc = () => {
    viewPdf(TermsAndConditionsPdf);
  };

  return (
    <div className="w-full">
      <div
        className={`flex w-full flex-col items-center rounded-xl border pb-10 ${!showSuccessScreen ? "p-11 px-2" : "p-5 px-2"} md:mt-10 md:w-full`}
      >
        {/* // sm:max-h-56 for mobile but not */}
        <img src={aceCampLogo} alt="" className="-mt-24 h-32 w-32" />

        <h1 className={`py-5 text-2xl font-semibold text-primaryText`}>
          {showOtpScreen && "OTP Verification"}
          {!showOtpScreen && !showSuccessScreen && "Forgot Your Password"}
        </h1>
        {!showOtpScreen && !showSuccessScreen && (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="w-full max-w-sm md:max-w-md">
                <div className="mb-4">
                  <FormikControl
                    label="Username"
                    name="username"
                    control="input"
                    className="w-full"
                    placeholder="Username"
                    type="text"
                    required={true}
                    maxLength={25}
                    authFlow={true}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full rounded-md border bg-buttonPrimary py-2 text-white hover:bg-lime-600`}
                >
                  Send OTP
                </button>
              </Form>
            </Formik>
            <p className="mt-4 text-center">
              <Link to={ROUTES.LOGIN} className={`text-link hover:underline`}>
                Back to login
              </Link>
            </p>
          </>
        )}
        {DisplayScreens()}
        <div>
          <div className="fixed bottom-14 right-[5px] hidden h-0.5 w-[17%] items-end md:flex">
            <div className="right-1 top-[1px] mt-2 flex gap-2 md:absolute">
              <p
                onClick={downloadTermsAndConditionsFunc}
                className={`cursor-pointer whitespace-nowrap text-[13px] text-link hover:underline`}
              >
                Terms and Conditions
              </p>{" "}
              <p className="cursor-pointer whitespace-nowrap text-[13px] text-[#FFFFFF] hover:underline">
                |
              </p>{" "}
              <p
                className={`cursor-pointer whitespace-nowrap text-[13px] text-link hover:underline`}
                onClick={downloadPrivacyPolicyFunc}
              >
                {" "}
                Privacy Policy
              </p>
              <p className="cursor-pointer whitespace-nowrap text-[13px] text-[#FFFFFF] hover:underline">
                |
              </p>{" "}
              <p
                className={`cursor-pointer whitespace-nowrap text-[13px] text-link hover:underline`}
              >
                <a href="mailto:support@acecamgolf.com">Contact Us</a>
              </p>
            </div>
          </div>
          <div className="fixed bottom-14 left-[80px] hidden h-0.5 w-[17%] items-end md:flex">
            <div className="right-1 top-[1px] flex md:absolute">
              <p className={`whitespace-nowrap p-2 text-[13px] text-white`}>
                © 2024 AceCam
                <sup className="text-[8px]">TM&nbsp;</sup>{" "}
                {/* <span className="align-super text-xs">™&nbsp;</span> */}
                Golf, LLC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
