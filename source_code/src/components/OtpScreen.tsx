import React, { useEffect, useState } from "react";
import OtpInput from "../components/OtpInput";
import { ROUTES } from "../utils/routesPath";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import { useDispatch } from "react-redux";
import { setLoading } from "../reducers/loader/loader";
import { ToastInfo, ToastSuccess } from "./Toast";
import { API_URL } from "../services/enums";
import { viewPdf } from "../utils/downloadUtils";

import TermsAndConditionsPdf from "../assets/Pdf/AceCamGolfTermsandConditions.pdf";
import privacyPolicyPdf from "../assets/Pdf/AceCamGolfPrivacyPolicy.pdf";

interface OTPScreenPropps {
  setShowSuccessScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOtpScreen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  url?: string;
  email?: string;
  maskEmail?: string;
}

const OtpScreen: React.FC<OTPScreenPropps> = ({
  email,
  setShowSuccessScreen,
  setShowOtpScreen,
  url,
  username,
  maskEmail,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const handleReset = async () => {
    try {
      setOtp("");
      dispatch(setLoading(true));
      let urlResend = url ? API_URL.reSendOtpRegister : API_URL.reSendOtpSignIn;
      let dataForRegister = {
        tempUserId: localStorage.getItem("tokenRegisterPassword"),
      };
      const newData = { username, mode: "WEB" };
      const { data, status } = await apiService.post<any>(urlResend, {
        data: url ? dataForRegister : newData,
      });
      if (status === 200 && data?.data != null && !data?.error) {
        // ToastSuccess("OTP sent. Please check your registered email!")
        ToastSuccess(data?.data?.message);
        setTimeLeft(60);
        setIsRunning(true);
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

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  const handleOTP = async () => {
    if (otp === "") {
      setOtpError("OTP is required");
      return;
    }
    try {
      dispatch(setLoading(true));
      const endPoint = url ? url : API_URL.verifySignInOtp;
      let dataForRegister = {
        otp,
        tempUserId: localStorage.getItem("tokenRegisterPassword"),
      };
      const newData = { otp, username };
      const { data, status } = await apiService.post<any>(endPoint, {
        data: url ? dataForRegister : newData,
      });
      if (status === 200 && data?.data != null && !data?.error) {
        if (url) {
          localStorage.removeItem("tokenRegisterPassword");
          ToastSuccess("Register successfully");
          navigate(ROUTES.DASHBOARD);
        } else {
          localStorage.setItem("tokenForgetPassword", data?.data?.token);
          navigate(ROUTES.RESET_PASSWORD);
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

  const handleOtpState = () => {
    setShowSuccessScreen(true);
    setShowOtpScreen(false);
  };

  const downloadTermsAndConditionsFunc = () => {
    viewPdf(TermsAndConditionsPdf);
  };

  const downloadPrivacyPolicyFunc = () => {
    viewPdf(privacyPolicyPdf);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-2 md:justify-between">
        <h4 className="px-6 text-center text-xs text-[#ffffff] md:text-left md:text-sm">
          Enter the OTP sent to{" "}
          <span className={`text-[16px] font-bold text-yellowText`}>
            {email ? email : maskEmail}
          </span>
        </h4>
        <OtpInput otp={otp} length={6} onChangeOtp={handleOtpChange} />
        <span className="text-[#FFDE59]">{otpError}</span>

        <div className="flex w-full flex-col-reverse items-center justify-center justify-between pb-2 md:flex-row md:justify-between md:pb-6">
          <div className="flex text-center">
            <p className={`text-xs text-primaryText md:text-sm`}>
              Didn't you receive the OTP?{" "}
              <button
                className={`font-semibold text-link ${timeLeft > 0 && isRunning
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer text-red-600"
                  }`}
                onClick={handleReset}
                disabled={timeLeft > 0 && isRunning}
              >
                Resend OTP
              </button>
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-center md:w-auto md:flex-row md:justify-between">
            <p className="mb-4 pl-6 text-xs font-semibold text-[#ffffff] sm:text-left md:px-0 md:text-center md:text-sm lg:text-right">
              OTP is valid for 5 minutes
            </p>
          </div>
        </div>

        <button
          onClick={handleOTP}
          className="w-48 rounded-md bg-lime-500 py-2 text-white hover:bg-lime-600 md:w-full"
        >
          Verify
        </button>

        <div className="flex w-full flex-col items-center justify-center pb-4 md:flex-row md:justify-between md:pb-0">
          <p className={`text-xs text-primaryText md:text-sm`}>
            You can resend OTP in{" "}
            <span className={`text-yellowText`}>{timeLeft}</span> seconds
          </p>
          <Link
            to={ROUTES.LOGIN}
            className={`text-xs text-link hover:underline md:text-sm`}
            onClick={handleOtpState}
          >
            Back to Login
          </Link>
        </div>
        <div>
          <div className="fixed bottom-14 right-[5px] hidden h-0.5 w-[17%] items-end md:flex">
            <div className="right-1 top-[1px] mt-2 flex gap-2 md:absolute">
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
            <div className="right-1 top-[1px] flex md:absolute">
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
export default OtpScreen;
