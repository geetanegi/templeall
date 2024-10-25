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
import { downloadFile } from "../utils/downloadUtils";
import privacyPolicyPdf from "../assets/Pdf/AceCamGolf_PrivacyPolicy.pdf";
import TermsAndConditionsPdf from "../assets/Pdf/AceCamGolf_TermsAndConditions.pdf";
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
      console.error("Error posting data:", error);
      ToastError("Something went wrong");
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
    downloadFile(privacyPolicyPdf, "privacy-policy.pdf");
  };
  const downloadTermsAndConditionsFunc = () => {
    downloadFile(TermsAndConditionsPdf, "terms-and-conditions.pdf");
  };

  return (
    <div className="w-full ">
      <div
        className={`flex w-full flex-col items-center rounded-xl pb-28 border ${!showSuccessScreen ? "p-11 px-2" : "p-5 px-2"} md:mt-10 md:w-full`}
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
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full rounded-md bg-buttonPrimary border py-2 text-white hover:bg-lime-600`}
                >
                  Send OTP
                </button>
              </Form>
            </Formik>
            <p className="mt-4 text-center">
              <Link
                to={ROUTES.LOGIN}
                className={`text-link hover:underline`}
              >
                Back to login
              </Link>
            </p>
          </>
        )}
        {DisplayScreens()}
        <div>
          <div className="flex md:hidden">
          <p
                onClick={downloadTermsAndConditionsFunc}
                className={`cursor-pointer whitespace-nowrap p-2 text-[13px] text-link hover:underline`}
              >
                Terms and Conditions
              </p>{" "}
              <p className="cursor-pointer whitespace-nowrap p-2 text-[13px] text-[#FFFFFF] hover:underline">
                |
              </p>{" "}
              <p
                className={`cursor-pointer whitespace-nowrap p-2 text-[13px] text-link hover:underline`}
                onClick={downloadPrivacyPolicyFunc}
              >
                {" "}
                Privacy Policy
              </p>
          </div>
          <div className="fixed bottom-14 right-[40px] hidden h-0.5 w-[17%] items-end md:flex">
            <div className="right-1 top-[1px] flex md:absolute">
              <p
                onClick={downloadTermsAndConditionsFunc}
                className={`cursor-pointer whitespace-nowrap p-2 text-[13px] text-link hover:underline`}
              >
                Terms and Conditions
              </p>{" "}
              <p className="cursor-pointer whitespace-nowrap p-2 text-[13px] text-[#FFFFFF] hover:underline">
                |
              </p>{" "}
              <p
                className={`cursor-pointer whitespace-nowrap p-2 text-[13px] text-link hover:underline`}
                onClick={downloadPrivacyPolicyFunc}
              >
                {" "}
                Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
