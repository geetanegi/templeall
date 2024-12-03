import React from "react";
import AppleLogin from "react-apple-login";
import { setLoading } from "../../reducers/loader/loader";
import AppleIcon from "../../assets/images/apple-1.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiService from "../../services/apiService";
import { API_URL } from "../../services/enums";
import { login } from "../../reducers/login/login";
import { ToastInfo } from "../Toast";
import { ROUTES } from "../../utils/routesPath";

const AppleSignInButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAppleResponse = async (response: any) => {

    if (response.error) {
      console.error("Apple login failed:", response.error);
      return;
    }

    if (response.authorization) {
      handleLoginSuccess(response);
    }
    debugger
    console.log("apple response", response)
  };

  const handleLoginSuccess = async (response: any) => {
    dispatch(setLoading(true));
    try {
      const { data, status } = await apiService.post<any>(
        API_URL.verifyAppleeToken,
        { data: { "code": response.authorization.code } },
      );
      if (status === 200 && data?.data != null && !data?.error) {
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
        console.log("socialLogin data ", data)
        if(data?.data?.isVerified){
          navigate(ROUTES.DASHBOARD);
          return
        }else{
          debugger

          navigate(ROUTES.USER_REGISTRATION, { state: { email: data?.data?.emailId} })
          return
        }
        debugger
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
  };  return (
    <AppleLogin clientId="com.acecamgolf.applelogin" // Your Service ID as Client ID
      redirectURI="https://dev.acecamgolf.com/" // Your redirect URL
      responseType="code id_token"
      responseMode="form_post"
      scope="name email"
      usePopup={true}
      callback={handleAppleResponse} // Handle both success and failure here
      render={(renderProps: any) => (
        <button onClick={renderProps.onClick} className="apple-signin-button">
          <img
            src={AppleIcon}
            alt="Sign in with Apple"
            className="h-10 w-10 rounded-full bg-white"
          />
          {/* <span>Sign in with Apple</span> */}
        </button>
      )}
    />
  );
};

export default AppleSignInButton;
