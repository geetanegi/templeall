import React, { useEffect, useState } from "react";
import OtpInput from "../components/OtpInput";
import { ROUTES } from "../utils/routesPath";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import { useDispatch } from "react-redux";
import { setLoading } from "../reducers/loader/loader";
import { ToastInfo, ToastSuccess } from "./Toast";
import { API_URL } from "../services/enums";
import { login, loginWithoutRemember } from "../reducers/login/login";

interface OTPScreenPropps {
  setShowSuccessScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOtpScreen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  url?: string;
  email?: string;
  maskEmail?: string;
  token?: string;
}

const OtpScreen: React.FC<OTPScreenPropps> = ({
  email,
  setShowSuccessScreen,
  setShowOtpScreen,
  url,
  username,
  maskEmail,
  token = "",
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
        tempUserId: token || localStorage.getItem("tokenRegisterPassword"),
      };
      const newData = { otp, username };
      const { data, status } = await apiService.post<any>(endPoint, {
        data: url ? dataForRegister : newData,
      });
      if (status === 200 && data?.data != null && !data?.error) {
        if (url) {
          localStorage.removeItem("tokenRegisterPassword");
          if (token) {
            dispatch(loginWithoutRemember({ token: data?.data?.token }));
            dispatch(
              login({
                token: data?.data?.token,
                userInfo: {
                  username: "",
                  password: "",
                  userId: data?.data?.userId,
                },
              }),
            );
          } else {
            ToastSuccess("Register successfully");
          }
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

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-2 md:justify-between">
        <h4 className="px-6 text-center text-xs text-[#ffffff] md:text-left md:text-sm">
          Enter the OTP sent to{" "}
          <span className={`text-[16px] font-bold text-yellowText`}>
            {email ? email : maskEmail}
          </span>
        </h4>
        <div className="w-[90%]">
          <p className="text-[14px] font-normal text-white">
            Enter OTP <span className="text-[#FFDE59]">*</span>
          </p>
        </div>
        <OtpInput otp={otp} length={6} onChangeOtp={handleOtpChange} />
        <span className="text-xs text-[#FFDE59]">{otpError}</span>

        <div className="flex text-center">
          <p className={`text-sm text-xs text-primaryText`}>
            Didn't you receive the OTP?{" "}
            <button
              className={`font-semibold text-link ${
                timeLeft > 0 && isRunning
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer text-link"
              }`}
              onClick={handleReset}
              disabled={timeLeft > 0 && isRunning}
            >
              Resend OTP
            </button>
            <p className="mb-4 mt-1 w-[100%] text-center text-xs font-normal text-[#ffffff]">
              OTP is valid for 5 minutes
            </p>
          </p>
        </div>

        <button
          onClick={handleOTP}
          className={`flex h-[36px] w-[200px] items-center justify-center rounded-[12px] border bg-buttonPrimary py-2 text-primaryText hover:bg-lime-600`}
        >
          Verify
        </button>

        <div className="flex w-full flex-col items-center justify-center pb-4">
          <p className={`text-[12px] text-xs text-primaryText`}>
            You can resend OTP in{" "}
            <span className={`text-yellowText`}>{timeLeft}</span> seconds
          </p>
          <Link
            to={ROUTES.LOGIN}
            className={`text-xs text-link hover:underline`}
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
