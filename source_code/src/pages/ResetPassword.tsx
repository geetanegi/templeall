import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik/components/FormikControl";
import { Link } from "react-router-dom";
import apiService from "../services/apiService";
import SuccessScreen from "../components/SuccessScreen";
import { setLoading } from "../reducers/loader/loader";
import { useDispatch } from "react-redux";
import { ToastInfo, ToastSuccess } from "../components/Toast";
import { ROUTES } from "../utils/routesPath";
import { API_URL } from "../services/enums";
import { PasswordRegex } from "../utils/passwordValidation";
import { encryptData, secretKey } from "../utils/encrypt";
import { validationConstant } from "../utils/validationEnums";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();

  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);
  interface ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
  }

  /***
   * Initial values of Login Form
   * ***/
  const initialValues: ResetPasswordFormValues = {
    password: "",
    confirmPassword: "",
  };

  /***
   * Validation Schema of login Form
   * ***/
  const validationSchema = Yup.object({
    password: Yup.string()
      .required(PasswordRegex.REQUIRED)
      .matches(PasswordRegex.PATTERN, PasswordRegex.FORMAT)
      .max(25, PasswordRegex.MAX_LENGTH),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        validationConstant.passWordMatching,
      )
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      dispatch(setLoading(true));

      const token = localStorage.getItem("tokenForgetPassword");
      const payloadData = {
        password: values.password,
      };
      const encreptedpayload = await encryptData(
        JSON.stringify(payloadData),
        secretKey,
      );
      const newData = {
        data: {
          token,
          payload: encreptedpayload,
          mode: "WEB",
        },
      };
      const { data, status } = await apiService.post<any>(
        API_URL.resetPassword,
        newData,
      );
      if (status === 200 && data?.data != null && !data?.error) {
        localStorage.removeItem("tokenForgetPassword");
        ToastSuccess(data?.data?.message);
        setShowSuccessScreen(true);
      } else if (status === 200 && data?.error && data?.description) {
        ToastInfo(data?.description);
      } else {
        ToastInfo(data?.description);
      }
    } catch (error: string | any) {
      console.error("Error posting data:", error);
      ToastInfo(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex w-full mt-6 mb-[-50px] flex-col items-center rounded-lg">
      {/* // sm:max-h-56 for mobile but not */}
      {/* <img src={aceCampLogo} alt="" className="mb-[5px] w-[220px]" /> */}

      {showSuccessScreen ? (
        <div className="mt-10">
          <SuccessScreen />
        </div>
      ) : (
        <>
          <h1
            className={`py-2 text-xl font-semibold text-primaryText md:py-5 md:text-2xl`}
          >
            Reset Your Password
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="w-full max-w-sm md:max-w-md">
              <div className="mb-4">
                <FormikControl
                  label="Password"
                  name="password"
                  control="input"
                  className="w-full"
                  placeholder="Password"
                  type="password"
                  required={true}
                  authFlow={true}
                />
                <FormikControl
                  label="Confirm Password"
                  name="confirmPassword"
                  control="input"
                  className="w-full"
                  placeholder="Confirm Password"
                  type="password"
                  required={true}
                  authFlow={true}
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className={`flex h-[36px] w-[200px] items-center justify-center rounded-[12px] border bg-buttonPrimary py-2 text-primaryText hover:bg-lime-600`}
                >
                  Reset Password
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
    </div>
  );
};

export default ResetPassword;
