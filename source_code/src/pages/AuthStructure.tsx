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

import { viewPdf } from "../utils/downloadUtils";
import privacyPolicyPdf from "../assets/Pdf/AceCamGolfPrivacyPolicy.pdf";
import TermsAndConditionsPdf from "../assets/Pdf/AceCamGolfTermsandConditions.pdf";
import SocialLoginScreen from "../components/social-login/SocialLoginScreen";

const AuthStructure: React.FC = () => {
  const location = useLocation();
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  const downloadPrivacyPolicyFunc = () => {
    viewPdf(privacyPolicyPdf);
  };

  const downloadTermsAndConditionsFunc = () => {
    viewPdf(TermsAndConditionsPdf);
  };

  return (
    <PageLoader isActive={loader}>
      <div className="bg-backgroundDark">
        <div
          className={`align-center flex h-screen w-full flex-col bg-backgroundDark ${location.pathname === ROUTES.SIGNUP ? "" : "justify-center"} overflow-y-auto`}
        >
          {/* <AceCamUI /> */}
          <div
            className={`align-center flex h-screen w-full flex-col bg-backgroundDark ${location.pathname === ROUTES.SIGNUP ? "" : "justify-center"} overflow-y-auto`}
          >
            {location.pathname === ROUTES.LOGIN && (
              <div className="mx-auto flex w-full flex-col items-center justify-center px-5 py-12 md:w-[280px]">
                {location.pathname === ROUTES.LOGIN && <Login />}
              </div>
            )}
            {location.pathname === ROUTES.FORGET_PASSWORD && (
              <div className="mx-auto flex w-full flex-col items-center justify-center px-5 py-12 md:w-[280px]">
                {location.pathname === ROUTES.FORGET_PASSWORD && (
                  <ForgetPassword />
                )}
              </div>
            )}
            {location.pathname === ROUTES.RESET_PASSWORD && (
              <div className="mx-auto flex w-full flex-col items-center justify-center px-5 py-12 md:w-[280px]">
                {location.pathname === ROUTES.RESET_PASSWORD && (
                  <ResetPassword />
                )}
              </div>
            )}
            {location.pathname === ROUTES.SIGNUP && (
              <div className="mx-auto my-auto flex h-max-content w-full flex-col items-center justify-center px-5 py-12 md:w-[280px]">
                {location.pathname === ROUTES.SIGNUP && (
                  // <StripeIntegration>
                  <Register />
                  // </StripeIntegration>
                )}
              </div>
            )}

            {location.pathname === ROUTES.STRIPE && (
              <div className="mx-auto my-auto flex h-max-content w-full flex-col items-center justify-center px-5 py-12 md:w-[280px]">
                {location.pathname === ROUTES.STRIPE && (
                  // <StripeIntegration>
                  <SocialLoginScreen />
                  // </StripeIntegration>
                )}
              </div>
            )}

            <div className="-mt-10 flex items-center justify-center gap-2 ">
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
            <div className="-mt-0 mb-10 flex items-center justify-center gap-2 ">
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
