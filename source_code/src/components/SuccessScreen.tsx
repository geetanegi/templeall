import React from "react";
import success from "../assets/images/circle-check.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routesPath";

const SuccessScreen: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <img src={success} alt="" className="-mt-10" />
        <h1 className="pt-4 text-2xl font-medium text-green-700">Success</h1>
        <p className="text-sm font-normal text-green-700">Password Changed</p>
        <p className="mt-5 text-center">
          <Link to={ROUTES.LOGIN} className="text-link hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SuccessScreen;
