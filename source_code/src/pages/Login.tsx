import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, loginWithoutRemember } from "../reducers/login/login";
import TikTok from "../assets/images/TikTok.svg";
import aceCampLogo from "../assets/images/logo (1).png";
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
import { viewPdf } from "../utils/downloadUtils";
import privacyPolicyPdf from "../assets/Pdf/AceCam Golf Privacy Policy.docx.pdf";
import TermsAndConditionsPdf from "../assets/Pdf/AceCam Golf Terms and Conditions.docx.pdf";
import moment from "moment";
import { decryptData, encryptData, secretKey } from "../utils/encrypt";

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
        ? decryptData(userInfo.password, secretKey) || ""
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
      const payloadData = { username, password };
      const encryptedPasword: string = await encryptData(password, secretKey);
      const loginObj = { username, password: encryptedPasword, mode: "WEB" };
      const encryptedpayload = await encryptData(
        JSON.stringify(payloadData),
        secretKey,
      );
      const newData = { payload: encryptedpayload, mode: "WEB" };
      const { data, status } = await apiService.post<any>(API_URL.login, {
        data: newData,
      });
      if (status === 200 && data?.data != null && !data?.error) {
        // Update expiration time
        const expirationTime = moment()
          .add(8, "hours")
          .format("YYYY-MM-DD HH:mm:ss");
        localStorage.setItem("expirationTime", expirationTime);
        if (rememberme === true) {
          dispatch(
            login({
              token: data?.data?.token,
              userInfo: { ...loginObj, userId: data?.data?.userId },
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
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const downloadPrivacyPolicyFunc = () => {
    viewPdf(privacyPolicyPdf);
  };

  const downloadTermsAndConditionsFunc = () => {
    viewPdf(TermsAndConditionsPdf);
    // const pdfUrl = TermsAndConditionsPdf; // URL of your PDF
    // window.open(pdfUrl, "_blank");
  };

  return (
    <>
      <div className="flex w-full flex-col items-center gap-2 rounded-xl border p-2 md:mt-10 md:w-full">
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
        <h3 className="my-5 py-3 text-[14px] font-semibold text-[#FFFFFF] md:my-1">
          -OR-
        </h3>
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
                authFlow={true}
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
                authFlow={true}
              />
            </div>
            <div className="mb-4"></div>
            <div className="mb-3 flex items-center justify-between">
              <div className="">
                <label className="inline-flex items-center">
                  <Field
                    type="checkbox"
                    name="rememberme"
                    className="form-checkbox h-4 w-4 border border-[#0077B6] accent-[#0077B6]"
                  />
                  <span className="ml-2 text-[14px] text-[#FFFFFF]">
                    Remember me ?
                  </span>
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
              className={`w-full rounded-md border bg-buttonPrimary py-2 text-primaryText hover:bg-lime-600`}
            >
              Login
            </button>
          </Form>
        </Formik>
        <div className="f mt-2 flex w-full max-w-sm gap-1 text-[14px] sm:justify-between md:max-w-md">
          <p className={`text-[14px] text-primaryText`}>
            Don't have an account?{" "}
            <Link
              to={ROUTES.SIGNUP}
              className={`text-[14px] text-link hover:underline`}
            >
              Sign Up
            </Link>
          </p>
          <Link
            to={ROUTES.FORGET_PASSWORD}
            className={`text-[14px] text-link hover:underline`}
          >
            Forgot Password?
          </Link>
        </div>
        <div>
          <div className="fixed bottom-14 right-[5px] hidden h-0.5 w-[17%] items-end md:flex">
            <div className="right-4 top-[1px] mt-2 flex gap-2 md:absolute">
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
            <div className="right-0 top-[1px] flex md:absolute">
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
    </>
  );
};
export default Login;
