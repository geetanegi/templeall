import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, loginWithoutRemember } from "../reducers/login/login";
import TikTok from "../assets/images/TikTok.svg";
import aceCampLogo from "../assets/images/aceCamp_logo.png";
import FormikControl from "../Formik/components/FormikControl";
import FocusError from "../Formik/components/FocusError";
import FacebookLoginComponent from "../components/social-login/FacebookLoginComponent";
import GoogleLoginComponent from "../components/social-login/GoogleLoginComponent";
import InstagramLoginComponent from "../components/social-login/InstagramLoginComponent";
import apiService from "../services/apiService";
import { RootState } from "../store";
import { setLoading } from "../reducers/loader/loader";
import { ToastError } from "../components/Toast";
import { ROUTES } from "../utils/routesPath";
import { API_URL } from "../services/enums";
import { PasswordRegex } from "../utils/passwordValidation";
import { ALPHANUMERIC_REGEX } from "../utils/RegexPatterns";
import { downloadFile } from "../utils/downloadUtils";
import privacyPolicyPdf from "../assets/Pdf/AceCamGolf_PrivacyPolicy.pdf";
import { Colors } from "../utils/colorEnum";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  interface LoginFormValues {
    username: string;
    password: string;
    rememberme: boolean;
  }

  /***
   * Initial values of Login Form
   * ***/
  const initialValues: LoginFormValues = {
    username:
      typeof userInfo === "object" && userInfo !== null
        ? userInfo.username || ""
        : "",
    password:
      typeof userInfo === "object" && userInfo !== null
        ? userInfo.password || ""
        : "",
    rememberme: userInfo !== null,
  };

  /***
   * Validation Schema of login Form
   * ***/
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is Required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username must contain only alphanumeric characters  ",
      )
      .min(3, "Username must be at least 3 characters")
      .max(25, "Username must be less than 25 characters"),
    password: Yup.string()
      .required(PasswordRegex.REQUIRED)
      .matches(PasswordRegex.PATTERN, PasswordRegex.FORMAT)
      .max(25, PasswordRegex.MAX_LENGTH),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    dispatch(setLoading(true));
    try {
      const { username, password, rememberme } = values;
      const newData = { username, password, mode: "WEB" };
      const { data, status } = await apiService.post<any>(API_URL.login, {
        data: newData,
      });
      if (status === 200 && data?.data != null && !data?.error) {
        if (rememberme === true) {
          dispatch(
            login({
              token: data?.data?.token,
              userInfo: { ...newData, userId: data?.data?.userId },
            }),
          );
          navigate("/dashboard");
        } else {
          dispatch(loginWithoutRemember({ token: data?.data?.token }));
          navigate("/dashboard");
        }
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
  };

  const downloadPrivacyPolicyFunc = () => {
    downloadFile(privacyPolicyPdf, "privacy-policy.pdf");
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 items-center rounded-xl border p-2 md:mt-10 md:w-full md:p-6"
       style={{
        background: Colors.backgroundDark2
      }}
      >
        <img src={aceCampLogo} alt="" className="h-32 w-32 sm:-mt-20" />
        <div className="flex gap-5">
          <InstagramLoginComponent />
          <FacebookLoginComponent
            appId="490090883627586"
            redirectUri={API_URL.fbRedirectUI}
          />
          <img src={TikTok} alt="" />
          <GoogleLoginComponent />
        </div>
        <h3 className="py-3 font-semibold my-5 text-[#FFFFFF] md:my-1">-OR-</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="w-full max-w-sm md:max-w-md">
            <FocusError />
            <div className="mb-4">
              <FormikControl
                label="Username"
                name="username"
                control="input"
                className="w-full"
                placeholder="userName"
                type="text"
                required={true}
                maxLength={25}
                validateRegex={ALPHANUMERIC_REGEX}
              />
            </div>
            <div className="mb-4">
              <FormikControl
                label="Password"
                name="password"
                control="input"
                className="w-full"
                placeholder="Password"
                type="password"
                required={true}
                maxLength={25}
              />
            </div>
            <div className="mb-4"></div>
            <div className="mb-3 flex items-center justify-between">
              <div className="">
                <label className="inline-flex items-center">
                  <Field
                    type="checkbox"
                    name="rememberme"
                    className="form-checkbox h-4 w-4 leading-tight text-blue-400"
                  />
                  <span className="ml-2 text-[#FFFFFF]">Remember me ?</span>
                </label>
                <ErrorMessage
                  name="rememberme"
                  component="span"
                  className="block text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full rounded-md bg-buttonPrimary border py-2 text-primaryText hover:bg-lime-600`}
            >
              Login
            </button>
          </Form>
        </Formik>
        <div className="f mt-2 flex w-full max-w-sm gap-1 text-sm sm:justify-between md:max-w-md">
          <p className={`text-primaryText`}>
            Don't have an account?{" "}
            <Link
              to={ROUTES.SIGNUP}
              className={`text-sm text-link hover:underline`}
            >
              Sign Up
            </Link>
          </p>
          <Link
            to={ROUTES.FORGET_PASSWORD}
            className={`text-sm text-link hover:underline`}
          >
            Forgot Password?
          </Link>
        </div>
        <div>
          <div className="md:hidden">
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
    </>
  );
};
export default Login;
