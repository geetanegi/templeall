import React from "react";
import AppleLogin from "react-apple-login";
import AppleIcon from "../../assets/images/apple-1.png";

const AppleSignInButton: React.FC = () => {
  const handleSuccess = (response: any) => {
    alert("yes");
    console.log("Apple login successful:", response);
    // Send the response to the backend for validation
    fetch("/api/apple-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.authorization.id_token }),
    });
  };

  return (
    <AppleLogin
      clientId="com.acecamgolf.services" // Your Service ID as Client ID
      redirectURI="https://dev.acecamgolf.com/dashboard" // Your redirect URL
      responseType="code id_token"
      responseMode="form_post"
      scope="name email"
      callback={handleSuccess}
      render={(renderProps: any) => (
        <button onClick={renderProps.onClick}>
          <img
            src={AppleIcon}
            alt=""
            className="h-10 w-10 rounded-full bg-white"
          />
        </button>
      )}
    />
  );
};
export default AppleSignInButton;
