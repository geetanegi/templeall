import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import facebookIcon from "../../assets/images/Facebook.svg"; // Adjust the path as needed
import { useDispatch } from "react-redux";
import { setLoading } from "../../reducers/loader/loader";
import apiService from "../../services/apiService";
import { login } from "../../reducers/login/login";
import { useNavigate } from "react-router-dom";
import { ToastError } from "../../components/Toast";
import { API_URL } from "../../services/enums";

interface FacebookLoginComponentProps {
  appId: string;
  // appId: "1913723712385847";
  redirectUri: string;
}

const FacebookLoginComponent: React.FC<FacebookLoginComponentProps> = ({
  redirectUri,
  appId,
}) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const responseFacebook = async (response: any) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:9091/aceCam/identity/auth/verifyFacebookToken",
  //       {
  //         data: {
  //           userID: response.userID,
  //           accessToken: response.accessToken,
  //           email: response.email,
  //           userName: response.name,
  //           mode: "WEB",
  //         },
  //       },
  //     );
  //     // Store token or user data in local storage
  //     localStorage.setItem("token", res.data);
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };



  const responseFacebook = async (response: any) => {
    dispatch(setLoading(true));
    try {


      const newData = {
        userID: response.userID,
        accessToken: response.accessToken,
        email: response.email,
        userName: response.name,
        token: response.credential, mode: "WEB"
      };
      const { data, status } = await apiService.post<any>(
        API_URL.verifyFbToken,
        { data: newData },
      );
      if (status === 200 && data?.data != null && !data?.error) {
        dispatch(
          login({
            token: data?.data?.token,
            userInfo: { username: "", password: "", userId: data?.data?.userId },
          }),
        );
        navigate("/dashboard");

      } else if (status === 200 && data?.error && data?.description) {
        ToastError(data?.description);
      } else {
        ToastError(data?.description);
      }
    } catch (error) {
      ToastError("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const componentClicked = () => {
    console.log("Facebook login button clicked");
  };

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      redirectUri={redirectUri}
      render={({ onClick }: { onClick: () => void }) => (
        <img
          src={facebookIcon}
          alt="Login with Facebook"
          style={{ cursor: "pointer" }} // Adjust size as needed
          onClick={onClick}
          aria-label="Login with Facebook"
        />
      )}
    />
  );
};

export default FacebookLoginComponent;
