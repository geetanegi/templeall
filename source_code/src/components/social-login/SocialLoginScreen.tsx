import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../../Formik/components/FormikControl";
import { viewPdf } from "../../utils/downloadUtils";
import TermsAndConditionsPdf from "../../assets/Pdf/AceCamGolfTermsandConditions.pdf";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import moment from "moment";
import { useDispatch } from "react-redux";
import { loginWithoutRemember } from "../../reducers/login/login";
import { ToastInfo } from "../Toast";
import OtpScreen from "../OtpScreen";
import { ROUTES } from "../../utils/routesPath";
import { setLoading } from "../../reducers/loader/loader";
import { validationConstant } from "../../utils/validationEnums";

interface SocialLoginInputsInterface {
  username: string;
  firstName: string;
  lastName: string;

  countryCode: string;
  phone: number | string;
  acceptTerms: boolean;
}

interface SocialLoginScreenProps {}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required(validationConstant.firstNameRequired)
    .matches(
      /^[A-Za-z]+$/,
      validationConstant.firstNameContains,
    )
    .max(25, validationConstant.firstNameMaxLength),
  lastName: Yup.string()
    .required(validationConstant.lastNameRequired)
    .matches(/^[A-Za-z]+$/, validationConstant.lastNameContains)
    .max(25, validationConstant.lastNameMaxLength),
  username: Yup.string()
    .required(validationConstant.usernameRequired)
    .matches(
      /^[a-zA-Z0-9]+$/,
      validationConstant.userNameContains,
    )
    .min(3, validationConstant.usernameMinWordLimit)
    .max(25, validationConstant.userNameMaxWordLimit),
  acceptTerms: Yup.bool().oneOf(
    [true],
    validationConstant.agreeTermsAndConditions,
  ),
  phone: Yup.string().required(validationConstant.phoneNumberIsRequired),
  countryCode: Yup.string().required(validationConstant.countryCodeRequired),
});

const SocialLoginScreen: React.FC<SocialLoginScreenProps> = () => {
  const initialValues: SocialLoginInputsInterface = {
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    countryCode: "+1",
    acceptTerms: false,
  };
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, maskEmail } = location.state || {};

  const downloadTermsAndConditionsFunc = () => {
    viewPdf(TermsAndConditionsPdf);
  };

  const OtpVerified = () => {
    setOtpVerified(true);
    const expirationTime = moment()
      .add(3, "hours")
      .format("YYYY-MM-DD HH:mm:ss");
    localStorage.setItem("expirationTime", expirationTime);
    dispatch(loginWithoutRemember({ token: token }));
    navigate(ROUTES.DASHBOARD);
  };

  const DisplayScreens = () => {
    if (showOtpScreen === true) {
      return (
        <div
          className={`"p-5 px-2" flex w-full flex-col items-center rounded-xl pb-10 mb-[-110px] md:w-full`}
        >
          {/* <img src={aceCampLogo1} alt="" className="-mt-24 h-32 w-32" /> */}
          <h1 className={`py-5 text-xl font-semibold text-primaryText`}>
            {showOtpScreen && "OTP Verification"}
          </h1>
          <OtpScreen
            email={maskEmail}
            setShowSuccessScreen={OtpVerified}
            setShowOtpScreen={setShowOtpScreen}
            url={API_URL.verifyRegisterOtp}
            username={usernameValue}
            token={token}
          />
        </div>
      );
    } else if (otpVerified) {
      navigate(ROUTES.DASHBOARD);
    }
  };

  const handleSubmit = async (values: SocialLoginInputsInterface) => {
    dispatch(setLoading(true));
    try {
      const payload = {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        emailId: email || "",
        mobile: values.phone,
        countryCode: values.countryCode,
        mode: "WEB",
      };

      const { data, status } = await apiService.post<any>(
        API_URL.socialLoginRegistration,
        {
          data: payload,
        },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        setToken(data?.data?.token || "");
        setUsernameValue(values.username);
        setShowOtpScreen(true);
      } else if (status === 200 && data?.error && data?.description) {
        ToastInfo(data?.description);
      } else {
        ToastInfo(data?.description);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      {showOtpScreen ? (
        <div>{DisplayScreens()}</div>
      ) : (
        <div className="bg-back-600 mb-[-80px] flex h-auto w-full flex-col items-center rounded-xl md:w-full md:p-0">
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="w-full max-w-sm md:max-w-md">
                <div className="mb-5">
                  <p className="text-center text-[16px] text-primaryText">
                    Please help us in getting to know you better.
                  </p>
                  <div className="flex items-center justify-center">
                  <p className="text-center w-full md:w-[220px] text-[12px] text-primaryText  overflow-hidden whitespace-nowrap text-[12px] text-ellipsis">
                    Email: <span className="text-loginValidationColor">{maskEmail || ""}</span>
                  </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mb-4 w-full">
                    <FormikControl
                      label=" First Name"
                      name="firstName"
                      control="logIn"
                      className="w-full"
                      placeholder=" Your First Name"
                      type="text"
                      required={true}
                      authFlow={true}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <FormikControl
                      label=" Last Name"
                      name="lastName"
                      control="logIn"
                      className="w-full"
                      placeholder=" Your Last Name"
                      type="text"
                      required={true}
                      authFlow={true}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <FormikControl
                    label="Username"
                    name="username"
                    control="logIn"
                    className="w-full"
                    placeholder="userName"
                    type="text"
                    required={true}
                    maxLength={25}
                    // validateRegex={ALPHANUMERIC_REGEX}
                    authFlow={true}
                  />
                </div>
                <div className="flex  mb-5 ">
                  <div className="w-28  pr-2">
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
                      label="Phone"
                      name="phone"
                      control="number"
                      className="w-full"
                      placeholder="Phone"
                      required={true}
                      authFlow={true}
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="mb-6 text-center flex flex-col">
                  <label className="inline-flex justify-center ">
                    <Field
                      type="checkbox"
                      name="acceptTerms"
                      className="form-checkbox md:-mt-[1rem] h-4 w-4 leading-tight text-blue-400"
                    />
                    <span className={`ml-1 text-[13px] text-primaryText`}>
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
                      color: "#FFFF00",
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
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className={`h-[36px] w-[200px] rounded-[12px] border bg-buttonPrimary text-primaryText hover:bg-lime-600`}
                  >
                    Create Account
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialLoginScreen;
