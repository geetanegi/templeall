import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, loginWithoutRemember } from "../reducers/login/login";
import TikTok from "../assets/images/TikTok.svg";
import aceCampLogo from "../assets/images/Logo_png with heading.png";
import FormikControl from "../Formik/components/FormikControl";
import FocusError from "../Formik/components/FocusError";
import FacebookLoginComponent from "../components/social-login/FacebookLoginComponent";
import GoogleLoginComponent from "../components/social-login/GoogleLoginComponent";
import InstagramLoginComponent from "../components/social-login/InstagramLoginComponent";
import apiService from "../services/apiService";
import { RootState } from "../store";
import { setLoading } from "../reducers/loader/loader";
import { ToastInfo } from "../components/Toast";
import { ROUTES } from "../utils/routesPath";
import { API_URL } from "../services/enums";
import { PasswordRegex } from "../utils/passwordValidation";
import { ALPHANUMERIC_REGEX } from "../utils/RegexPatterns";
import moment from "moment";
// import AppleSignInButton from "../components/social-login/AppleSignInButton";
import { decryptData, encryptData, secretKey } from "../utils/encrypt";
import AppleSignInButton from "../components/social-login/AppleSignInButton";

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

  return (
    <>
      <div className="flex w-full flex-col items-center gap-2 rounded-xl md:mt-20 md:w-full">
        <img src={aceCampLogo} alt="" className="mb-[5px] w-[220px]" />

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
            <div className="-mt-[8px] mb-3 flex items-center justify-between">
              <div className="">
                <label className="flex items-center">
                  <Field
                    type="checkbox"
                    name="rememberme"
                    className="form-checkbox h-4 w-4 border border-[#0077B6] accent-[#0077B6]"
                  />
                  <span className="ml-2 text-[13px] text-[#FFFFFF]">
                    Remember Me?
                  </span>
                </label>
                <ErrorMessage
                  name="rememberme"
                  component="div"
                  className="block text-sm"
                />
              </div>
              <div>
                <Link
                  to={ROUTES.FORGET_PASSWORD}
                  className={`text-[13px] text-link hover:underline`}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`h-[36px] w-[200px] rounded-[12px] border bg-buttonPrimary py-2 text-primaryText hover:bg-lime-600`}
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
        <div className="mt-[40px] flex w-full max-w-sm flex-col justify-center gap-1 text-[14px] md:max-w-md">
          <p className={`text-center text-[14px] text-primaryText`}>
            Don't have an account?{" "}
            <Link
              to={ROUTES.SIGNUP}
              className={`text-[14px] text-link hover:underline`}
            >
              Sign Up
            </Link>
          </p>
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
    </>
  );
};
export default Login;
