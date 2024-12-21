import React from "react";
import success from "../assets/images/Check.png";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routesPath";




const SuccessScreen: React.FC = () => {
  return (
    <div className="w-full flex flex-col my-auto">
        {/* <img src={aceCampLogo} alt="" className="mb-[60px]" /> */}
      <div className="flex h-full w-full flex-col items-center justify-center">
        <img src={success} alt="" className="-mt-10" />
        <h1 className="pt-4 text-2xl font-medium text-primaryText">Success</h1>
        <p className="text-sm font-normal text-primaryText">Password Changed</p>
        <p className="mt-5 text-center">
          <Link to={ROUTES.LOGIN} className="text-link hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SuccessScreen;
