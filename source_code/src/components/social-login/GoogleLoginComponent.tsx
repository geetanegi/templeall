import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setLoading } from "../../reducers/loader/loader";
import apiService from "../../services/apiService";
import { login } from "../../reducers/login/login";
import { useNavigate } from "react-router-dom";
import { ToastInfo } from "../../components/Toast";
import { API_URL } from "../../services/enums";
import "../../App.css";

// import GoogleIcon from "../../assets/images/Google.svg";

const LoginButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleLoginSuccess = async (response: CredentialResponse) => {
  //   try {
  //     const res = await axios.post("http://localhost:9091/aceCam/identity/auth/verifyGoogleToken", {
  //       data: {
  //         token: response.credential,
  //         mode: "WEB"
  //       }
  //     });
  //     // Store token or user data in local storage
  //     localStorage.setItem("token", res.data);
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }

  // };

  const handleLoginSuccess = async (response: CredentialResponse) => {
    dispatch(setLoading(true));
    try {
      const newData = { token: response.credential, mode: "WEB" };
      const { data, status } = await apiService.post<any>(
        API_URL.verigyGoogleToken,
        { data: newData },
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
        navigate("/dashboard");
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

  return (
    <div className="google-login-button-check">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
        shape="circle"
        size="medium"
        type="icon"
      />
    </div>
  );
};

export default LoginButton;
