import React from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";
import StripeIntegration from "./StripeIntegration";
import ResetPassword from "./ResetPassword";
import { ROUTES } from "../utils/routesPath";
import PageLoader from "../components/PageLoader";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import AceCamUI from "../components/AceCamUI";

const AuthStructure: React.FC = () => {
  const location = useLocation();
  const loader = useSelector((state: RootState) => state.loader.isLoading);

  return (
    <PageLoader isActive={loader}>
      <div
      className="bg-backgroundDark"
      >
      <div
        className={`align-center bg-backgroundDark flex h-screen w-full ${location.pathname === ROUTES.SIGNUP ? "" : "justify-center"} overflow-y-auto`}
      >
        <AceCamUI />
        <div
          className={`align-center flex h-screen w-full bg-backgroundDark ${location.pathname === ROUTES.SIGNUP ? "" : "justify-center"} overflow-y-auto`}
        >
          {location.pathname === ROUTES.LOGIN && (
            <div 
            className="mx-auto flex w-full flex-col items-center justify-center  py-12 px-1  md:max-w-3xl md:p-16"
            >
              {location.pathname === ROUTES.LOGIN && <Login />}
            </div>
          )}
          {location.pathname === ROUTES.FORGET_PASSWORD && (
            <div className="mx-auto flex w-full flex-col items-center justify-center  py-12 px-5 md:max-w-3xl md:p-8">
              {location.pathname === ROUTES.FORGET_PASSWORD && (
                <ForgetPassword />
              )}
            </div>
          )}
          {location.pathname === ROUTES.RESET_PASSWORD && (
            <div className="mx-auto flex w-full flex-col items-center justify-center  py-12 px-5 md:max-w-2xl md:p-8">
              {location.pathname === ROUTES.RESET_PASSWORD && <ResetPassword />}
            </div>
          )}
          {location.pathname === ROUTES.SIGNUP && (
            <div className="mx-auto my-auto flex h-max-content w-full flex-col items-center justify-center py-12 px-5 md:max-w-3xl md:p-8">
              {location.pathname === ROUTES.SIGNUP && (
                <StripeIntegration>
                  <Register />
                </StripeIntegration>
              )}
            </div>
          )}

            {location.pathname === ROUTES.STRIPE && (
              <div className="flex w-full flex-col items-center justify-center p-6 pt-[100px] md:w-3/5 md:p-8">
                <StripeIntegration></StripeIntegration>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLoader>
  );
};

export default AuthStructure;
