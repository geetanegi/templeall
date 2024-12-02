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
        <span className="text-[#FFDE59] text-xs">{otpError}</span>

        <p className="mb-4 pl-6 text-xs font-normal text-[#ffffff] text-right w-[100%] mt-0">
          OTP is valid for 5 minutes
        </p>

        <div className="flex text-center">
          <p className={`text-xs text-primaryText text-sm`}>
            Didn't you receive the OTP?{" "}
            <button
              className={`font-semibold text-link ${timeLeft > 0 && isRunning
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer text-link"
                }`}
              onClick={handleReset}
              disabled={timeLeft > 0 && isRunning}
            >
              Resend OTP
            </button>
          </p>
        </div>



        <button
          onClick={handleOTP}
          className="w-48 rounded-md bg-lime-500 py-2 text-white hover:bg-lime-600 md:w-full"
        >
          Verify
        </button>

        <div className="flex w-full flex-col items-center justify-center pb-4 md:flex-row md:justify-between md:pb-0">
          <p className={`text-xs text-primaryText text-xs`}>
            You can resend OTP in{" "}
            <span className={`text-yellowText`}>{timeLeft}</span> seconds
          </p>
          <Link
            to={ROUTES.LOGIN}
            className={`text-xs text-link hover:underline text-xs`}
            onClick={handleOtpState}
          >
            Back to Login
          </Link>
        </div>

      </div>
    </>
  );
};
export default OtpScreen;
