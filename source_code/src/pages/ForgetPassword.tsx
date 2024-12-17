// forget-password.tsx
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik/components/FormikControl";
import { Link } from "react-router-dom";

import OtpScreen from "../components/OtpScreen";
import apiService from "../services/apiService";
import { useDispatch } from "react-redux";
import { setLoading } from "../reducers/loader/loader";
import { ToastInfo, ToastSuccess } from "../components/Toast";
import { ROUTES } from "../utils/routesPath";
import { API_URL } from "../services/enums";
import { validationConstant } from "../utils/validationEnums";

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
    username: Yup.string().required(validationConstant.mandatoryField),
    // .matches(
    //   /^[a-zA-Z0-9]+$/,
    //   validationConstant.userNameContains,
    // )
    // .min(3, validationConstant.usernameMinWordLimit)
    // .max(25, validationConstant.userNameMaxWordLimit),
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
        <OtpScreen
          username={username}
          setShowSuccessScreen={setShowSuccessScreen}
          setShowOtpScreen={setShowOtpScreen}
          maskEmail={maskEmailVal}
        />
      );
    }
  };

  return (
    <div className={`${showOtpScreen ? "w-full py-4" : "mb-[50px] w-full"} `}>
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl">
        {/* <img src={aceCampLogo} alt="" className="mb-[5px] w-[220px]" />  */}
        <h1 className={`my-3 text-xl font-semibold text-primaryText`}>
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
                <div className="text-center text-[#ffffff]">
                  Enter your username, email, or phone number. We'll send a
                  secure one-time password (OTP) to help you reset your
                  password. Please ensure the mobile number must include a
                  country code, e.g., +1xxxxxxxxxx.
                </div>
                <div className="mb-4 md:w-full">
                  <FormikControl
                    label="Username / Email ID / Phone"
                    name="username"
                    control="logIn"
                    className="w-full"
                    placeholder="Username"
                    type="text"
                    required={true}
                    maxLength={25}
                    authFlow={true}
                    labelMarginRight={4}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className={`flex h-[36px] w-[200px] items-center justify-center rounded-[12px] border bg-buttonPrimary py-2 text-primaryText hover:bg-lime-600`}
                  >
                    Send OTP
                  </button>
                </div>
              </Form>
            </Formik>
            <p className="mt-4 text-center">
              <Link to={ROUTES.LOGIN} className={`text-link hover:underline`}>
                Back to login
              </Link>
            </p>
          </>
        )}
        <div className="px-0 md:w-full">{DisplayScreens()}</div>
      </div>
    </div>
  );
};
export default ForgetPassword;
