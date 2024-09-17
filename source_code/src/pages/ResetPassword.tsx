import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik/components/FormikControl";
import { Link } from "react-router-dom";
import aceCampLogo from "../assets/images/aceCamp_logo.png";
import apiService from "../services/apiService";
import SuccessScreen from "../components/SuccessScreen";
import { setLoading } from "../reducers/loader/loader";
import { useDispatch } from "react-redux";
import { ToastError } from "../components/Toast";
import { ROUTES } from "../utils/routesPath";
import { API_URL } from "../services/enums";

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
      .required("Password is Required")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,25}$/,
        "Password must be 8-25 characters long, include at least one letter, one number, and one special character.",
      )
      .max(25, "Password must be less than 25 characters"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "The passwords do not match. Please ensure both password fields are identical",
      )
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      dispatch(setLoading(true));

      const token = localStorage.getItem("tokenForgetPassword");
      const newData = {
        data: {
          token,
          password: values.password,
        },
      };
      const { data, status } = await apiService.post<any>(
        API_URL.resetPassword,
        newData,
      );
      if (status === 200 && data?.data != null && !data?.error) {
        localStorage.removeItem("tokenForgetPassword");
        setShowSuccessScreen(true);
      } else if (status === 200 && data?.error && data?.description) {
        ToastError(data?.description);
      } else {
        ToastError(data?.description);
      }
    } catch (error: string | any) {
      console.error("Error posting data:", error);
      ToastError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="flex w-full flex-col items-center rounded-lg bg-white bg-opacity-60 p-6 md:mt-10 md:w-full">
      {/* // sm:max-h-56 for mobile but not */}
      <img src={aceCampLogo} alt="" className="-mt-24 h-32 w-32" />

      {showSuccessScreen ? (
        <div className="mt-10">
          <SuccessScreen />
        </div>
      ) : (
        <>
          <h1 className="py-5 text-2xl font-semibold text-gray-700">
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
                />
                <FormikControl
                  label="Confirm Password"
                  name="confirmPassword"
                  control="input"
                  className="w-full"
                  placeholder="Confirm Password"
                  type="password"
                  required={true}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-lime-500 py-2 text-white hover:bg-lime-600"
              >
                Reset
              </button>
            </Form>
          </Formik>
          <p className="mt-4 text-center">
            <Link to={ROUTES.LOGIN} className="text-[#1E95C1] hover:underline">
              Back to login
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
