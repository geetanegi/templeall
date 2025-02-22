import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, loginWithoutRemember } from "../reducers/login/login";
import FormikControl from "../Formik/components/FormikControl";
import FocusError from "../Formik/components/FocusError";
// import GoogleLoginComponent from "../components/social-login/GoogleLoginComponent";
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
// import AppleSignInButton from "../components/social-login/AppleSignInButton";
import { validationConstant } from "../utils/validationEnums";

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
   * 
   * ***/

  const userData = localStorage.getItem('userData') 
  
  const initialValues: LoginFormValues = {
    username: userData ? JSON.parse(userData).username : '',
    password: userData ? decryptData(JSON.parse(userData).password, secretKey) : "",
    rememberme: userInfo !== null,
  };

  /***
   * Validation Schema of login Form
   * ***/
  const validationSchema = Yup.object({
    username: Yup.string()
      .required(validationConstant.usernameRequired)
      .matches(
        /^[a-zA-Z0-9]+$/,
        validationConstant.userNameContains,
      )
      .min(3, validationConstant.usernameMinWordLimit)
      .max(25, validationConstant.userNameMaxWordLimit),
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
          .add(3, "hours")
          .format("YYYY-MM-DD HH:mm:ss");
        localStorage.setItem("expirationTime", expirationTime);
        if (rememberme === true) {
          localStorage.setItem('userData', JSON.stringify({ ...loginObj, userId: data?.data?.userId } ))
          dispatch(
            login({
              token: data?.data?.token,
              userInfo: { ...loginObj, userId: data?.data?.userId },
            }),
          );
          navigate("/dashboard");
        } else {
          localStorage.removeItem('userData')
          dispatch(loginWithoutRemember({ token: data?.data?.token,
            userInfo: { ...loginObj, userId: data?.data?.userId },
           }));
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
console.log(userData, initialValues, "initialValues")
  return (
    <>
      <div className="flex w-full flex-col items-center gap-2 rounded-xl mt-5 md:w-full">

        <Formik
          initialValues={userData ? initialValues : {
            username: '',
            password: "",
            rememberme: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="w-full max-w-sm md:max-w-md">
            <FocusError />
            <div className="mb-4 md:w-full">
              <FormikControl
                label="Username"
                name="username"
                control="logIn"
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
                control="logIn"
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
                className={`h-[36px] w-[200px] rounded-[12px] border bg-buttonPrimary  text-primaryText hover:bg-lime-600`}
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};
export default Login;
