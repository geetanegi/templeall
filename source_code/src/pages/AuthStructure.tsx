import React from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";
// import StripeIntegration from "./StripeIntegration";
import ResetPassword from "./ResetPassword";
import { ROUTES } from "../utils/routesPath";
import PageLoader from "../components/PageLoader";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SocialLoginScreen from "../components/social-login/SocialLoginScreen";
import {
  PRIVACY_POLICY_URL,
  TERMS_AND_CONDITIONS_URL,
} from "../utils/constantEnums";
import aceCampLogo from "../assets/images/Logo_png with heading.png";
import { Link } from "react-router-dom";
import AppleSignInButton from "../components/social-login/AppleSignInButton";
import GoogleLoginComponent from "../components/social-login/GoogleLoginComponent";

const AuthStructure: React.FC = () => {
  const location = useLocation();
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const downloadPrivacyPolicyFunc = () => {
    window.open(PRIVACY_POLICY_URL, "_blank");
  };

  const downloadTermsAndConditionsFunc = () => {
    window.open(TERMS_AND_CONDITIONS_URL, "_blank");
  };

  return (
    <PageLoader isActive={loader}>
      <div className="bg-backgroundDark">
        <div
          className={`align-center flex h-screen w-full flex-col overflow-y-auto bg-backgroundDark ${location.pathname === ROUTES.SIGNUP ? "" : "justify-center"} overflow-y-auto`}
        >
          {/* <AceCamUI /> */}
          <div
            className={`align-center flex h-screen w-full flex-col overflow-y-auto bg-backgroundDark`}
          >
            <div className="my-auto">
              <img
                src={aceCampLogo}
                alt=""
                className="mx-auto mb-[20px] w-[220px]"
              />
              {location.pathname === ROUTES.LOGIN && (
                <div className="mx-auto mb-10 flex w-[80%] flex-col items-center justify-center px-[12px] md:w-[280px]">
                  {location.pathname === ROUTES.LOGIN && <Login />}
                </div>
              )}
              {location.pathname === ROUTES.FORGET_PASSWORD && (
                <div className="mx-auto mb-10 flex w-[80%] flex-col items-center justify-center px-[12px] md:w-[280px]">
                  {location.pathname === ROUTES.FORGET_PASSWORD && (
                    <ForgetPassword />
                  )}
                </div>
              )}
              {location.pathname === ROUTES.RESET_PASSWORD && (
                <div className="mx-auto mb-10 flex w-[80%] flex-col items-center justify-center px-[12px] md:w-[280px]">
                  {location.pathname === ROUTES.RESET_PASSWORD && (
                    <ResetPassword />
                  )}
                </div>
              )}
              {location.pathname === ROUTES.SIGNUP && (
                <div className="mx-auto my-auto mb-10 flex h-max-content w-[80%] flex-col items-center justify-center px-5 md:w-[280px]">
                  {location.pathname === ROUTES.SIGNUP && (
                    // <StripeIntegration>
                    <Register />
                    // </StripeIntegration>
                  )}
                </div>
              )}

              {location.pathname === ROUTES.USER_REGISTRATION && (
                <div className="mx-auto mb-10 flex w-[80%] flex-col items-center justify-center px-[12px] md:w-[280px]">
                  {location.pathname === ROUTES.USER_REGISTRATION && (
                    // <StripeIntegration>
                    <SocialLoginScreen />
                    // </StripeIntegration>
                  )}
                </div>
              )}

              <div
                className={`mx-auto flex w-full max-w-sm flex-col justify-center gap-1 text-[18px] md:max-w-md ${
                  location.pathname === ROUTES.LOGIN ||
                  location.pathname === ROUTES.SIGNUP
                    ? "visible mb-5"
                    : "invisible mb-[-40px]"
                }`}
              >
                {location.pathname === ROUTES.SIGNUP ? (
                  <p className={`text-center text-[14px] text-primaryText`}>
                    Already have an account?{" "}
                    <Link
                      to={ROUTES.LOGIN}
                      className={`text-[14px] text-link hover:underline`}
                    >
                      Login
                    </Link>
                  </p>
                ) : (
                  <p className={`text-center text-[14px] text-primaryText`}>
                    Don't have an account?{" "}
                    <Link
                      to={ROUTES.SIGNUP}
                      className={`text-[14px] text-link hover:underline`}
                    >
                      Sign Up
                    </Link>
                  </p>
                )}
                <p className="mt-[10px] text-center text-[14px] text-white">
                  - or sign in using -{" "}
                </p>
                <div className="mt-[10px] flex items-center justify-center gap-[36px]">
                  <AppleSignInButton />
                  <GoogleLoginComponent />
                </div>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-center gap-2">
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
            <div className="mb-10 mb-2 flex items-center justify-center gap-2 md:mb-0">
              <div className="right-1 top-[1px] flex">
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
    </PageLoader>
  );
};

export default AuthStructure;
